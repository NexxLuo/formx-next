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

const setAsyncApiValue = (name, instance) => {

    let state = instance.getFieldState(name);
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


const setExpressionValue = (name, expression, _evaluator, instance, sourcePath) => {
    //值联动时items应该取目标控件的index，否则会明细表汇总到主表时，字段值为当前明细行数据
    let _expressionVar = getExpressionVar(name);
    //执行表达式
    let res = _evaluator.evaluate(expression, _expressionVar);
    //如果表达式返回undefined，则不进行值设置，可通过此方式避免死循环
    if (typeof res !== "undefined") {
        //当目标字段值需要保留小数位时，需进行处理
        let field = instance.query(name).take();

        if (field) {
            let precision = field.componentProps?.precision;
            let nextValue = res;
            if (
                typeof res == "number" &&
                typeof precision === "number"
            ) {
                nextValue = res.toFixed(precision);
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



export function linkageValue(linkageItem, instance, _evaluator, type, schema) {
    //数据联动
    if (linkageItem.value instanceof Array) {
        linkageItem.value.forEach(d => {
            if (type) {
                if (d.type === "api") {
                    setAsyncApiValue(d.name, instance);
                }
            } else {
                if (d.type === "api") {
                    setAsyncApiValue(d.name, instance);
                } else if (d.expression) {
                    setExpressionValue(d.name, d.expression, _evaluator, instance, schema.path);
                }
            }
        });
    }
}

export function setInitialValue(schema, instance, _loading, _evaluator) {
    let extraProps = schema.extraProps || {};

    //默认值，设置默认值必须在init中，否则可能导致后续组件无法获取到值
    //只有在数据加载完成(loading:false)且外部未传递值时才进行默认值设置，如：新增时取配置的默认值，编辑时直接取外部传递的值
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
            //表达式求值
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
                //如果值已经被修改过，则不再设置默认值，比如表格复制行数据，此时数据已经被修改过，无需再设置默认值
                //visible为false时证明需要隐藏值，也就不应该设置默认值
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
