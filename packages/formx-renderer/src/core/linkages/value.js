import { getExpressionVar, getEnv, getNumberValueByUnit } from "./utils";
import { transformComponentValue, toFixed } from "../utils";
import { requestApiById, getRequestParams } from "../../extensions/utils";

import { useAsyncValue, getAsyncValue } from "../effects/useAsyncDataSource";

function formatState(field) {
    let componentProps = field.component[1] || {};
    let extraProps = componentProps["x-extra-props"];
    return {
        name: field.path.toString(),
        path: field.address.toString(),
        modified: field.modified,
        selfModified: field.selfModified,
        initialValue: field.initialValue,
        value: field.value,
        values: field.inputValues,
        required: field.required,
        extraProps,
        componentProps,
        componentName: extraProps?.name
    };
}

function setAsyncValue(name, initialValue, expressionVar, instance, isInit = false) {
    try {
        let apiData = JSON.parse(initialValue.api);
        useAsyncValue(instance, {
            name: name,
            isInit,
            service: requestApiById,
            pathVars: expressionVar,
            extra: {
                form: instance,
                id: apiData.dataSourceId,
                input: getRequestParams(apiData.input, instance, {}, getEnv, {
                    index: expressionVar?.items
                }),
                output: apiData.output
            }
        });
    } catch (e) {
        console.error("useAsyncValue error:", e);
    }
}

function _getAsyncValue(instance, name, expressionVar, apiData) {
    return getAsyncValue(instance, {
        service: requestApiById,
        pathVars: expressionVar,
        name: name,
        extra: {
            form: instance,
            id: apiData.dataSourceId,
            input: getRequestParams(apiData.input, instance, {}, getEnv, {
                index: expressionVar?.items
            }),
            output: apiData.output
        }
    });
}

export function getValue(
    initialValue,
    instance,
    expressionVar,
    _evaluator,
    ignoreAsync = false
) {
    let value = undefined;

    if (typeof initialValue === "object" && initialValue) {
        if (initialValue.type === "const") {
            if (initialValue.const !== "" && initialValue.const !== null) {
                value = initialValue.const;
            }
        } else if (initialValue.type === "expression") {
            //表达式求值
            let res = _evaluator.evaluate(
                initialValue.expression,
                expressionVar
            );

            value = res;
        } else if (initialValue.type === "env") {
            value = getEnv(instance, initialValue.env);
        } else if (
            !ignoreAsync &&
            initialValue.type === "api" &&
            initialValue.api
        ) {
            let apiData = JSON.parse(initialValue.api);
            if (apiData) {
                value = _getAsyncValue(instance, "", expressionVar, apiData);
            }
        }
    }

    return value;
}

const setAsyncApiValue = (name, instance, schema) => {

    let state = instance.getFieldState(name);
    if (state) {
        let _state = formatState(state);
        let initialValue = _state.extraProps?.initialValue;
        let expressionVar = getExpressionVar(_state.name, schema?.path);
        setAsyncValue(
            _state.name,
            initialValue,
            expressionVar,
            instance
        );
    }
}


const setExpressionValue = (name, expression, _evaluator, instance, sourcePath, ignoreInitValue) => {
    //值联动时items应该取目标控件的index，否则会明细表汇总到主表时，字段值为当前明细行数据
    let _expressionVar = getExpressionVar(name, sourcePath);
    //执行表达式
    let res = _evaluator.evaluate(expression, _expressionVar);
    //如果表达式返回undefined，则不进行值设置，可通过此方式避免死循环
    if (typeof res !== "undefined") {
        //当目标字段值需要保留小数位时，需进行处理
        let field = instance.query(name).take();

        let hasValue = false;;
        if (ignoreInitValue === false) {
            hasValue = typeof field.value !== "undefined"
        }

        if (field && !hasValue) {
            let precision = field.componentProps?.precision;
            let nextValue = res;
            if (
                typeof res == "number" &&
                typeof precision === "number"
            ) {
                nextValue = Number(res.toFixed(precision));
            }

            if (
                typeof res == "string" &&
                res &&
                typeof precision === "number"
            ) {
                nextValue = toFixed(res, precision);
            }

            let displayUnit = field.componentProps?.displayUnit;
            if (displayUnit) {
                let displayValue = getNumberValueByUnit({
                    type: "display",
                    precision: precision,
                    value: nextValue,
                    unit: displayUnit
                });

                nextValue = getNumberValueByUnit({
                    type: "real",
                    precision: precision,
                    value: displayValue,
                    unit: displayUnit
                });
            }

            //如果被隐藏值，则不再联动赋值,但要将值设置到caches中，以便显示出字段时拿到正确值
            if (field.selfDisplay === "none") {
                if (typeof field.caches === "object" && field.caches) {
                    field.caches.value = nextValue;
                } else {
                    field.caches = {
                        value: nextValue
                    }
                }
            } else {
                field.setValue(nextValue);
            }
        }

    }
}



export function linkageValue(linkageItem, instance, _evaluator, type, schema, ignoreInitValue) {
    //数据联动
    if (linkageItem.value instanceof Array) {
        linkageItem.value.forEach(d => {
            if (type) {
                if (d.type === "api") {
                    setAsyncApiValue(d.name, instance, schema);
                }
            } else {
                if (d.type === "api") {
                    setAsyncApiValue(d.name, instance, schema);
                } else if (d.expression) {
                    setExpressionValue(d.name, d.expression, _evaluator, instance, schema.path, ignoreInitValue);
                }
            }
        });
    }
}

export function setInitialValue(field, schema, instance, _loading, _evaluator) {
    let extraProps = schema.extraProps || {};

    //默认值，设置默认值必须在init中，否则可能导致后续组件无法获取到值
    //只有在数据加载完成(loading:false)且外部未传递值时才进行默认值设置，如：新增时取配置的默认值，编辑时直接取外部传递的值
    let initialValue = extraProps.initialValue;

    let name = schema.name;

    let hasValue = typeof schema.value !== "undefined";
    //如果开启了resetInitialValueWhenEmpty，则值为空时仍然重置值为初始值
    if (extraProps.resetInitialValueWhenEmpty === true) {
        if (schema.value === null || schema.value === "") {
            hasValue = false;
        }
    }

    let expressionVar = getExpressionVar(name);

    let loading = !!_loading;
    let _initialValue = undefined;

    if (
        loading === false
    ) {
        if (
            typeof initialValue === "object" && initialValue
        ) {
            if (initialValue.type === "api") {
                let { allowOverwriteValue = false } =
                    field.componentProps?.["x-extra-props"] || {};
                if (initialValue.api && field.form?.props?.context?.disabledAsyncValue !== true) {
                    if (hasValue) {
                        //字段存在值时，初始数据值如果为接口，应判断是否开启重写值，如果开启则应请求接口值
                        if (allowOverwriteValue === true) {
                            setAsyncValue(name, initialValue, expressionVar, instance, true);
                        }
                    } else {
                        setAsyncValue(name, initialValue, expressionVar, instance, true);
                    }
                }
                //
            } else {
                if (hasValue === false) {
                    if (initialValue.type === "const") {
                        if (initialValue.const !== "" && initialValue.const !== null) {
                            _initialValue = initialValue.const;
                        }
                    } else if (initialValue.type === "expression") {
                        //表达式求值
                        let res = _evaluator.evaluate(
                            initialValue.expression,
                            expressionVar
                        );
                        _initialValue = res;
                    } else if (initialValue.type === "env") {
                        _initialValue = getEnv(instance, initialValue.env);
                    }
                }
            }
        }

        //bool类型的默认设为false
        if (!hasValue && schema.extraProps?.dataType === "boolean" && typeof _initialValue === "undefined") {
            _initialValue = false;
        }

        if (typeof _initialValue !== "undefined") {
            _initialValue = transformComponentValue(
                schema,
                _initialValue,
                instance
            );
            field.setState(s => {
                //如果值已经被修改过，则不再设置默认值，比如表格复制行数据，此时数据已经被修改过，无需再设置默认值
                if (!s.selfModified) {
                    let precision = s.componentProps?.precision;
                    if (
                        typeof _initialValue == "number" &&
                        typeof precision === "number"
                    ) {
                        _initialValue = Number(_initialValue.toFixed(precision));
                    }

                    if (
                        typeof _initialValue == "string" &&
                        _initialValue &&
                        typeof precision === "number"
                    ) {
                        _initialValue = toFixed(_initialValue, precision);
                    }

                    let displayUnit = s.componentProps?.displayUnit;
                    if (displayUnit) {
                        //将真实值转换为显示值并进行小数位保留后，再转换为真实值，否则会导致显示值和真实值不一致；
                        //如：单位为千，控件设置保留两位小数，默认值设置为2.5，此时真实值为0.0025，但若保留两位小数，控件显示值将会为0
                        let displayValue = getNumberValueByUnit({
                            type: "display",
                            precision: precision,
                            value: _initialValue,
                            unit: displayUnit
                        });

                        _initialValue = getNumberValueByUnit({
                            type: "real",
                            precision: precision,
                            value: displayValue,
                            unit: displayUnit
                        });
                    }
                    s.value = _initialValue;
                }
            });
        }
    }
    return _initialValue;
}
