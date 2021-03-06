import { getExpressionVar, getEnv } from "./utils";
import { transformComponentValue } from "../utils";
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

function setAsyncValue(name, initialValue, expressionVar, instance) {
    try {
        let apiData = JSON.parse(initialValue.api);
        useAsyncValue(instance, {
            name: name,
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

function _getAsyncValue(instance, expressionVar, apiData) {
    return getAsyncValue(instance, {
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
            //???????????????
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
                value = _getAsyncValue(instance, expressionVar, apiData);
            }
        }
    }

    return value;
}

export function linkageValue(linkageItem, instance, _evaluator, type) {
    //????????????
    if (linkageItem.value instanceof Array) {
        linkageItem.value.forEach(d => {
            if (type === "api") {
                if (d.type === "api") {
                    let state = instance.getFieldState(d.name);
                    if (state) {
                        let _state = formatState(state);
                        let initialValue = _state.extraProps?.initialValue;
                        let expressionVar = getExpressionVar(_state.name);
                        setAsyncValue(
                            _state.name,
                            initialValue,
                            expressionVar,
                            instance
                        );
                    }
                }
            } else if (d.expression) {
                let _expressionVar = getExpressionVar(d.name);
                //???????????????
                let res = _evaluator.evaluate(d.expression, _expressionVar);
                //?????????????????????undefined????????????????????????????????????????????????????????????
                if (typeof res !== "undefined") {
                    //????????????????????????????????????????????????????????????
                    instance.setFieldState(d.name, s => {
                        let precision = s.componentProps?.precision;
                        if (
                            typeof res == "number" &&
                            typeof precision === "number"
                        ) {
                            s.value = res.toFixed(precision);
                        } else {
                            s.value = res;
                        }
                    });
                }
            }
        });
    }
}

export function setInitialValue(schema, instance, _loading, _evaluator) {
    let extraProps = schema.extraProps || {};

    //????????????????????????????????????init??????????????????????????????????????????????????????
    //???????????????????????????(loading:false)??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
    let initialValue = extraProps.initialValue;

    let name = schema.name;

    let hasValue = typeof schema.value !== "undefined";

    let expressionVar = getExpressionVar(name);

    let loading = !!_loading;
    let _initialValue = undefined;

    if (
        loading === false &&
        hasValue === false &&
        typeof initialValue === "object" &&
        initialValue
    ) {
        if (initialValue.type === "const") {
            if (initialValue.const !== "" && initialValue.const !== null) {
                _initialValue = initialValue.const;
            }
        } else if (initialValue.type === "expression") {
            //???????????????
            let res = _evaluator.evaluate(
                initialValue.expression,
                expressionVar
            );

            _initialValue = res;
        } else if (initialValue.type === "env") {
            _initialValue = getEnv(instance, initialValue.env);
        } else if (initialValue.type === "api" && initialValue.api) {
            setAsyncValue(name, initialValue, expressionVar, instance);
        }

        if (typeof _initialValue !== "undefined") {
            _initialValue = transformComponentValue(
                schema,
                _initialValue,
                instance
            );
            instance.setFieldState(name, s => {
                //????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                //visible???false?????????????????????????????????????????????????????????
                if (!s.selfModified && s.display !== "none") {
                    let precision = s.componentProps?.precision;
                    if (
                        typeof _initialValue == "number" &&
                        typeof precision === "number"
                    ) {
                        _initialValue = _initialValue.toFixed(precision);
                    }
                    s.value = _initialValue;
                }
            });
        }
    }
    return _initialValue;
}
