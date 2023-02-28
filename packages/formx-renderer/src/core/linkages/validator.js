import { getExpressionVar, getEnv } from "./utils";
import {
    requestValidateApiById,
    getRequestParams,
    setTableErrorsToExtraField
} from "../../extensions/utils";
import { SchemaValidatorKeys } from "@formily/json-schema/esm/shared"
import {
    validate as validateBuiltIn,
} from '@formily/validator'

async function validateInternal(_value, context) {
    let rule = context?.validatorContext?.rule;
    if (!rule) {
        return "";
    }
    let res = await validateBuiltIn(_value, [rule], {});
    let msg = "";
    if (res?.error instanceof Array) {
        msg = res.error.join(",");
    }
    return msg;
}


async function validateArrayTable(value, rule, context) {
    let validatorContext = rule.validatorContext;
    let schemaMap = validatorContext?.formSchemaMap || {};
    let _evaluator = validatorContext?.evaluator;
    let _options = validatorContext?.options;

    let field = context.field;
    let instance = context.form;
    let listAddress = field.address.toString();
    let listPath = field.path.toString();

    let arr = value;

    let tasks = [];

    function validate(
        _value,
        _title,
        _validator,
        _address,
        context,
        _instance,
        _path
    ) {
        return new Promise(resolve => {
            let res = _validator(
                _value,
                { validatorContext: context },
                {
                    form: _instance
                }
            );
            if (res) {
                if (res.constructor?.name === "Promise") {
                    res.then(_res => {
                        if (_res) {
                            resolve({
                                address: _address,
                                messages: [_res],
                                path: _path,
                                type: "error",
                                title: _title,
                                triggerType: "onInput",
                                code: "ValidateError"
                            });
                        } else {
                            resolve(null);
                        }
                    });
                } else {
                    if (res) {
                        resolve({
                            address: _address,
                            messages: [res],
                            path: _path,
                            title: _title,
                            type: "error",
                            triggerType: "onInput",
                            code: "ValidateError"
                        });
                    } else {
                        resolve(null);
                    }
                }
            } else {
                resolve(null);
            }
        });
    }

    function isVisible(
        row,
        rowIndex,
        columnKey,
        _options,
        _schema,
        _evaluator
    ) {
        let bl = true;
        if (_options?.[columnKey]?.visible === false) {
            bl = false;
            return bl;
        }

        if (_schema) {
            let extraProps = _schema["x-component-props"]?.["x-extra-props"];
            let columnHidden = false;

            if (extraProps) {
                let columnVisibility = extraProps.columnVisibility;
                if (
                    typeof columnVisibility === "object" &&
                    columnVisibility &&
                    columnVisibility.type === "expression" &&
                    columnVisibility.expression
                ) {
                    columnHidden = _evaluator.evaluate(
                        columnVisibility.expression,
                        {}
                    );
                }
                let hidden = false;

                if (columnHidden !== true) {
                    let visibility = extraProps.visibility;
                    if (
                        typeof visibility === "object" &&
                        visibility &&
                        visibility.type === "expression" &&
                        visibility.expression
                    ) {
                        hidden = _evaluator.evaluate(visibility.expression, {
                            items: rowIndex
                        });
                    }
                }

                if (columnHidden === true || hidden === true) {
                    bl = false;
                }
            }
        }

        return bl;
    }

    if (arr instanceof Array && arr.length > 0) {
        let arrayItemKeys = [];
        field.fieldActions?.mapItems((_, key, o) => {
            if (o.leaf === true) {
                arrayItemKeys.push(key);
            }
        });

        arr.forEach((d, i) => {
            arrayItemKeys.forEach(k => {
                let _value = d[k];
                let _schema = schemaMap[k];
                if (_schema) {
                    let extraProps =
                        _schema["x-component-props"]?.["x-extra-props"];

                    let _address = listAddress + "." + i + "." + k;
                    let _path = listPath + "." + i + "." + k;
                    let fieldState = instance.query(_address).take();

                    let existFieldState = false;

                    if (fieldState) {
                        existFieldState = fieldState.mounted === true;
                    }

                    let title = _schema.title || extraProps?.title;

                    if (
                        _schema.type !== "void" &&
                        !existFieldState &&
                        isVisible(d, i, k, _options, _schema, _evaluator)
                    ) {
                        let schema = {
                            name: _address,
                            extraProps,
                            required:
                                _schema.required === true ||
                                _options?.[k]?.required === true
                        };

                        SchemaValidatorKeys.forEach(key => {
                            let value = _schema[key];
                            if (key === "required") {
                                value = schema.required;
                            }
                            const isValidatorKey = value !== undefined && value !== null;
                            if (isValidatorKey) {
                                tasks.push({
                                    validator: validateInternal,
                                    value: _value,
                                    address: _address,
                                    path: _path,
                                    title,
                                    context: { rule: { [key]: value } }
                                });
                            }
                        })

                        let rules = getValidateRules(
                            schema,
                            instance,
                            _evaluator,
                            context
                        );

                        rules.forEach(rule => {
                            tasks.push({
                                validator: rule.validator,
                                title,
                                value: _value,
                                address: _address,
                                path: _path,
                                context: rule.validatorContext
                            });
                        });
                    }
                }
            });
        });
    }

    let res = [];

    let resultMap = {};

    for (let i = 0; i < tasks.length; i++) {
        let { validator, value, address, context, title, path } = tasks[i];
        if (!resultMap.hasOwnProperty(address)) {
            const result = await validate(
                value,
                title,
                validator,
                address,
                context,
                instance,
                path
            );
            if (result != null) {
                resultMap[address] = result;
                res.push(result);
            }
        }
    }

    let arrayPath = field.address.toString();
    instance.query(arrayPath).take().data = {
        validateResult: res
    };
    setTableErrorsToExtraField(arrayPath, instance, res);
    return "";
}

function regExpValidator(value, rule) {
    let { message: _message, expression: _expression } = rule.validatorContext;
    let res = false;
    try {
        let reg = new RegExp(_expression);
        res = reg.test(value);
    } catch (error) {
        console.error("validate RegExp error:", error, _expression);
    }
    return res === true ? "" : _message;
}

function expressionValidator(value, rule) {
    let {
        message: _message,
        expression: _expression,
        evaluator: _evaluator,
        expressionVar: _expressionVar
    } = rule.validatorContext;

    let res = _evaluator.evaluate(_expression, _expressionVar, {
        value
    });
    return res === true ? "" : _message;
}

async function asyncValidator(value, rule, context) {
    let {
        message: _message,
        api: _api,
        expressionVar: _expressionVar
    } = rule.validatorContext;

    let _instance = context.form;

    let { valid, message: returnedMsg } = await requestValidateApiById({
        form: _instance,
        id: _api.dataSourceId,
        input: getRequestParams(_api.input, _instance, {}, getEnv, {
            index: _expressionVar?.items
        }),
        output: _api.output
    });

    let msg = "";
    if (valid === false) {
        msg = _message || returnedMsg || "验证未通过";
    }

    return msg;
}

function getValidateRules(schema, instance, _evaluator, context) {
    let rules = [];

    let extraProps = schema.extraProps || {};
    let name = schema.name;

    let expressionVar = getExpressionVar(name);

    if (schema.componentName?.toLowerCase() === "arraytable") {
        rules.push({
            validator: validateArrayTable,
            triggerType: "onSubmit", //只有提交或手动验证时方验证表格内数据
            validatorContext: {
                formSchemaMap: context?.formSchemaMap,
                evaluator: _evaluator,
                options: context?.options
            }
        });
    }

    if (
        typeof extraProps.validateRegExp === "object" &&
        extraProps.validateRegExp
    ) {
        let validateExpression = extraProps.validateRegExp.expression;
        let validateMessage = extraProps.validateRegExp.message || "验证未通过";
        if (validateExpression && validateExpression.length > 0) {
            rules.push({
                validator: regExpValidator,
                validatorContext: {
                    expression: validateExpression,
                    message: validateMessage
                }
            });
        }
    }

    if (typeof extraProps.validate === "object" && extraProps.validate) {
        let validateExpression = extraProps.validate.expression;
        let validateMessage = extraProps.validate.message || "验证未通过";
        if (validateExpression && validateExpression.length > 0) {
            rules.push({
                validator: expressionValidator,
                validatorContext: {
                    expression: validateExpression,
                    message: validateMessage,
                    evaluator: _evaluator,
                    expressionVar
                }
            });
        }
    }

    if (
        typeof extraProps.validateAsync === "object" &&
        extraProps.validateAsync
    ) {
        let validateAsyncApi = null;

        try {
            validateAsyncApi = JSON.parse(extraProps.validateAsync.api);
        } catch (error) { }

        let validateAsyncMessage = extraProps.validateAsync.message;
        if (validateAsyncApi) {
            rules.push({
                validator: asyncValidator,
                validatorContext: {
                    api: validateAsyncApi,
                    message: validateAsyncMessage,
                    expressionVar
                }
            });
        }
    }

    return rules;
}

export function initValidator(schema, _evaluator, instance, context) {
    let extraRules = getValidateRules(schema, instance, _evaluator, context);
    let name = schema.name;
    if (extraRules.length > 0) {
        instance.setFieldState(name, state => {
            let prev = state.validator;
            let next = extraRules;
            if (prev instanceof Array) {
                next = [...prev, ...extraRules];
            }
            state.validator = next;
        });
    }
}
