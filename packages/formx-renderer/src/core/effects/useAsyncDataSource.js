import { useLinkageUtilsSync } from "./useLinkageUtils";
import { createEvaluator } from "../../extensions/utils";
import { getItemIndex, getListDataFieldMap } from "../utils";

function getExpressionVar(name, form) {
    let expressionVar = {};
    if (name && form) {
        let { index } = getItemIndex(name);
        if (index > -1) {
            expressionVar.items = index;
        }
    }
    return expressionVar;
}

/**
 * 根据输出参数配置的formater格式化表达式，格式化数据
 * @param {*} data
 * @param {*} output
 * @param {*} form
 * @param {*} name 表单项路径
 * @param {*} pathVars items代表的索引
 * @returns
 */
function formatter(data, output, form, name, pathVars) {
    let _data = [];

    let { needTransform, formatMap, transformer } = getListDataFieldMap(output);

    if (!needTransform) {
        return data;
    }

    let expressionVar = pathVars || getExpressionVar(name, form);
    let evaluator = createEvaluator(form);

    if (typeof data === "object" && data !== null) {
        if (data instanceof Array) {
            data.forEach(d => {
                let item = { ...d };

                for (const k in d) {
                    let formatter = formatMap[k];
                    if (formatter) {
                        let _value = item[k];
                        let formatted = evaluator.evaluate(
                            formatter,
                            expressionVar,
                            { ...d, value: _value }
                        );

                        if (typeof formatted !== "undefined") {
                            item[k] = formatted;
                        } else {
                            //进行表达式格式化时，如果返回值为undefined，直接删除此字段，以此实现字段是否保留的功能
                            Reflect.deleteProperty(item, k)
                        }
                    }
                    transformer(item, k);
                }
                _data.push(item);
            });
        } else {
            let item = { ...data };
            for (const k in data) {
                let formatter = formatMap[k];
                if (formatter) {
                    let _value = item[k];
                    let formatted = evaluator.evaluate(
                        formatter,
                        expressionVar,
                        { ...data, value: _value }
                    );
                    if (typeof formatted !== "undefined") {
                        item[k] = formatted;
                    } else {
                        //进行表达式格式化时，如果返回值为undefined，直接删除此字段，以此实现字段是否保留的功能
                        Reflect.deleteProperty(item, k)
                    }
                }
                transformer(item, k);
            }
            _data = item;
        }
    } else {
        _data = data;
    }

    return _data;
}

let datasource_timer = {};
let datasource_aborter = {};

export const useAsyncData = (form, { name, service, extra }, filter) => {
    const { notify, setFieldState } = form;
    let timer = datasource_timer[name];
    let aborter = datasource_aborter[name];
    if (timer) {
        clearTimeout(timer);
    }
    if (aborter) {
        aborter.abort();
    }

    datasource_timer[name] = setTimeout(() => {
        setFieldState(name, state => {
            state.loading = true;
            state.dataSource = [];
            state.componentProps = { ...state.componentProps };

            var ac = new AbortController();
            datasource_aborter[name] = ac;

            service(extra, {}, ac.signal).then(res => {
                state.loading = false;
                state.loaded = true;
                let data = res.data;
                if (typeof filter === "function") {
                    data = filter(res.data);
                }
                data = formatter(data, extra.output, form, name);

                state.dataSource = data;
                //异步请求结束吼触发组件渲染，某些自定义组件如果未直接使用props.dataSource属性而是直接传入到内层组件，会导致组件无法进行依赖更新，
                //故修改componentProps强制刷新组件
                //注意不要覆盖componentProps
                state.componentProps = { ...state.componentProps };
                //请求结束可以dispatch一个自定义事件收尾，方便后续针对该事件做联动
                notify("onAsyncDataSourceComplete", {
                    name,
                    payload: res
                });
            });

        });

    }, 100);

};


let listvalue_timer = {};
let listvalue_aborter = {};

export const useAsyncListData = (
    form,
    { name, service, extra, pagination }
) => {
    const { notify, setFieldState } = form;
    const linkage = useLinkageUtilsSync(form);

    let timer = listvalue_timer[name];
    let aborter = listvalue_aborter[name];
    if (timer) {
        clearTimeout(timer);
    }
    if (aborter) {
        aborter.abort();
    }

    listvalue_timer[name] = setTimeout(() => {
        setFieldState(name, state => {
            state.loading = true;
            state.componentProps.loading = true;
        });

        var ac = new AbortController();
        listvalue_aborter[name] = ac;

        service(extra, pagination, ac.signal).then(res => {
            let targetField = form.query(name).take();
            if (targetField) {
                let _data = res.data;
                _data = formatter(_data, extra.output, form, name);
                targetField.setState((state) => {
                    state.loading = false;
                    state.componentProps.loading = false;
                    linkage.requestInfo(name, res?.requestInfo);
                    if (pagination && res.isServerSidePagination) {
                        linkage.pagination(name, {
                            total: res.total,
                            isServerSidePagination: res.isServerSidePagination,
                            pageIndex: pagination.pageIndex,
                            pageSize: pagination.pageSize
                        });
                    }
                })
                targetField.onInput(_data)
            }


            //请求结束可以dispatch一个自定义事件收尾，方便后续针对该事件做联动
            notify("onAsyncDataSourceComplete", {
                name,
                payload: res
            });
        });
    }, 100);
};

const getOutputTargetValues = ({ output, pathVars, item, form, isInit }) => {
    let items = {};

    let hasTargetField = false;

    output.forEach(d => {
        let k = d.targetField;
        let o = pathVars || {};
        if (k) {
            for (const _k in o) {
                k = k.replace("." + _k + ".", "." + o[_k] + ".");
            }
            hasTargetField = true;

            let field = form.query(k).take();
            //如果目标表单项没有值方进行设置，否则会导致被覆盖
            let hasValue = false;
            if (field) {
                let extraProps = field.componentProps?.["x-extra-props"] || {};

                if (extraProps.relatedKey) {
                    let extraField = form.query(extraProps.relatedKey).take()
                    if (extraField) {
                        extraProps = extraField.componentProps?.["x-extra-props"] || {};
                    }
                }

                let { allowOverwriteValue = false } = extraProps;
                if (!allowOverwriteValue && isInit) {
                    hasValue = typeof field.value !== "undefined";
                }
                if (extraProps.resetInitialValueWhenEmpty === true) {
                    if (field.value === null || field.value === "") {
                        hasValue = false;
                    }
                }
            }
            if (!hasValue) {
                if (typeof item === "object") {
                    items[k] = item[d.field];
                } else {
                    items[k] = item;
                }
            }
        }
    });

    return {
        values: items,
        hasTargetField
    };
};

let value_timer = {};
let value_aborter = {};

export const useAsyncValue = (form, { pathVars, name, service, extra, isInit }) => {
    const { notify, setFieldState } = form;
    const linkage = useLinkageUtilsSync(form);

    let timer = value_timer[name];
    let aborter = value_aborter[name];
    if (timer) {
        clearTimeout(timer);
    }
    if (aborter) {
        aborter.abort();
    }

    value_timer[name] = setTimeout(() => {
        setFieldState(name, state => {
            state.loading = true;

            var ac = new AbortController();
            value_aborter[name] = ac;

            service(extra, {}, ac.signal).then(res => {
                state.loading = false;

                //设置值
                let data = res.data;
                data = formatter(data, extra.output, form, name);
                let item = data;
                let output = extra.output;

                if (data instanceof Array) {
                    item = data[0];
                }

                if (item && output instanceof Array) {
                    let { values: items, hasTargetField } = getOutputTargetValues({
                        pathVars,
                        output,
                        item,
                        form,
                        isInit
                    });
                    if (hasTargetField) {
                        for (const k in items) {
                            linkage.value(k, items[k]);
                        }
                    }
                }
                //

                //请求结束可以dispatch一个自定义事件收尾，方便后续针对该事件做联动
                notify("onAsyncValueComplete", {
                    name,
                    payload: res
                });
            });
        });
    }, 100);
};

export const getAsyncValue = (form, { pathVars, name, service, extra }) => {
    return new Promise(resolve => {
        let _data = null;
        service(extra).then(res => {
            //设置值
            let data = res.data;
            data = formatter(data, extra.output, form, name, pathVars);
            let item = data;
            let output = extra.output;

            if (data instanceof Array) {
                item = data[0];
            }

            if (item && output instanceof Array) {
                let { values: items, hasTargetField } = getOutputTargetValues({
                    pathVars,
                    output,
                    item,
                    form
                });
                if (hasTargetField) {
                    let arr = [];
                    if (item instanceof Array) {
                        arr = item;
                    } else {
                        arr.push(item);
                    }

                    arr.forEach(d => {
                        for (const k in items) {
                            d[k] = items[k];
                        }
                    });
                }
                _data = item;
            }
            //
            resolve(_data);
        });
    });
};

export const useAsyncRequest = ({
    service,
    extra,
    resolving,
    resolve,
    reject,
    callback
}) => {
    if (typeof resolving === "function") {
        resolving();
    }
    service(extra).then(res => {
        if (typeof callback === "function") {
            callback(res);
        }
        if (res.succeed) {
            if (typeof resolve === "function") {
                resolve();
            }
        } else {
            if (typeof reject === "function") {
                reject();
            }
        }
    });
};
