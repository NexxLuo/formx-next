import { Evaluator } from "../core/expression";
import { getItemIndex, guid } from "../core/utils";

export function createEvaluator(form, options) {
    function getEnv(k, injectEnvs) {
        try {
            if (
                typeof injectEnvs === "object" &&
                injectEnvs &&
                injectEnvs.hasOwnProperty(k)
            ) {
                return injectEnvs[k];
            }
            let formActions = form.getFormState().formActions;
            return formActions.formEnvs.getItemValue(k);
        } catch (error) {
            console.error("get environment value error :", error);
            return null;
        }
    }

    function callFunc() {
        let formActions = form.getFormState().formActions;
        try {
            return formActions.formFunction.call.apply(null, arguments);
        } catch (error) {
            console.error("call custom function error:", error);
            return null;
        }
    }

    //创建表达式计算实例，并传递上下文
    return new Evaluator({
        functions: {
            value: (k, type) => {
                let v = null;
                if (k) {
                    if (type === "selections") {
                        let state = form.getFieldState(k);
                        if (
                            state &&
                            state.fieldActions &&
                            typeof state.fieldActions.getSelections ===
                            "function"
                        ) {
                            return state.fieldActions.getSelections();
                        }
                        return [];
                    } else {
                        let {
                            index,
                            parentKey: listKey,
                            dataIndex: fieldKey
                        } = getItemIndex(k);

                        if (index > -1) {
                            v = form.getValuesIn(
                                listKey + "." + index + "." + fieldKey
                            );
                        } else {
                            if (listKey) {
                                v = form.getValuesIn(listKey);
                                if (v instanceof Array) {
                                    v = v.map(d => {
                                        return d[fieldKey];
                                    });
                                }
                            } else {
                                v = form.getValuesIn(k);
                            }
                        }
                    }
                }
                return v;
            },
            env: k => {
                return getEnv(k);
            },
            CallFunc: callFunc
        },
        onError: options?.onError
    });
    //
}

/**
 * 请求接口时获取表单项输入参数
 * @param {*} form
 * @param {*} id
 * @param {*} injectVar
 */
export const getApiFieldValue = (form, id, injectVar) => {
    try {
        let k = id;

        let v = null;
        if (k) {
            //如果表单项为表格，则根据行索引获取值
            if (k.indexOf(".items.") > -1) {
                let temp = k.split(".items.");
                let listKey = temp[0],
                    fieldKey = temp[1];
                let state = form.getFieldState(listKey);
                let objectValue = null;

                if (state) {
                    let values = state.value;
                    if (values instanceof Array) {
                        let rowIndex = injectVar?.index;
                        if (rowIndex) {
                            objectValue = values[rowIndex];
                        } else {
                            objectValue = values[0];
                        }
                    }
                }
                if (fieldKey) {
                    v = objectValue?.[fieldKey];
                }
            } else if (k.indexOf(".selections") > -1) {
                let temp = k.split(".selections");
                let listKey = temp[0];
                let state = form.getFieldState(listKey);
                let values = [];
                if (
                    state &&
                    state.fieldActions &&
                    typeof state.fieldActions.getSelections === "function"
                ) {
                    values = state.fieldActions.getSelections();
                }

                v = values;
            } else {
                v = form.getValuesIn(k);
            }
        }

        return v;
    } catch (error) {
        console.error("get field value error by request api:", error);
        return null;
    }
};

function treeForEach(arr, fn) {
    if (arr instanceof Array) {
        arr.forEach((d, i) => {
            let { children, ...item } = d;
            fn(item, i);
            treeForEach(children, fn);
        });
    }
}

function getParams(queryString, bodyParams) {
    return {
        urlQuery: queryString,
        body: bodyParams
    };
}

export const requestApiById = async (params, pagination) => {
    let { id, input, output, runtime } = params;

    if (!id) {
        return {
            data: []
        };
    }

    let queryString = `?id=${id}`;

    let reqParams = {
        ...input,
        ...runtime,
        ...pagination
    };

    let queryOptions = window._Formx_Global_Options.get(
        "dataSourceDetailQuery",
        getParams(queryString, reqParams)
    );
    let url = queryOptions.url + queryString;

    let options = {
        ...queryOptions.options,
        body: JSON.stringify(reqParams)
    };

    let requestInfo = {
        dataSourceId: id,
        url: url,
        method: options.method,
        body: options.body
    };

    let res = await fetch(url, options).then(async response => {
        if (response.status >= 200 && response.status < 300) {
            try {
                let jsonData = await response.json();
                return jsonData;
            } catch (e) {
                return {
                    State: 1,
                    Message: e.message,
                    Data: null,
                    Code: response.status,
                    requestInfo
                };
            }
        } else {
            return {
                State: 0,
                Message: null,
                Data: null,
                Code: response.status,
                requestInfo
            };
        }
    });

    let arr = res.Data || [];
    let total = null;

    let isPagination = false;

    //通过解析数据结构判定是否为分页数据，
    //通过控件是否启用分页判定并不可靠，因为数据接口可能不是分页接口而导致数据无法显示
    if (
        typeof res.Data === "object" &&
        res.Data &&
        res.Data.hasOwnProperty("TotalCount") &&
        res.Data.hasOwnProperty("Data")
    ) {
        isPagination = true;
    }

    if (isPagination === true) {
        arr = res.Data.Data;
        total = res.Data.TotalCount;
    } else {
        arr = res.Data;
    }

    let outputMap = {};

    let hasFieldMap = false;
    if (output instanceof Array) {
        output.forEach(d => {
            if (d.fieldMap) {
                outputMap[d.fieldMap] = d.field;
                hasFieldMap = true;
            }
        });
    }

    let labelField = outputMap["label"];
    let valueField = outputMap["value"];
    let parentField = outputMap["parent"];

    if (hasFieldMap && arr instanceof Array) {
        let _arr = [];
        treeForEach(arr, d => {
            if (typeof d === "object" && d) {
                let _value = d[valueField];
                let _parent = d[parentField];
                let _label = d[labelField];

                //数据源返回数字时转为字符串，避免下拉控件匹配不到值
                if (typeof _value === "number") {
                    _value = _value.toString();
                }
                //

                if (valueField) {
                    d.value = _value ?? null;
                }

                if (parentField) {
                    d.parent = _parent ?? "";
                }

                if (labelField) {
                    d.label = _label ?? "";
                }
            }
            _arr.push(d);
        });
        arr = _arr;
    }

    return {
        data: arr,
        total,
        state: res.State,
        message: res.Message,
        isServerSidePagination: isPagination,
        requestInfo
    };
};

export const requestValidateApiById = async params => {
    let { id, input, form } = params;

    if (!id) {
        return {
            data: []
        };
    }

    let queryString = `?id=${id}`;
    let reqParams = input;
    let queryOptions = window._Formx_Global_Options.get(
        "dataSourceValidateQuery",
        getParams(queryString, reqParams)
    );
    let url = queryOptions.url + queryString;

    let options = {
        ...queryOptions.options,
        body: JSON.stringify(reqParams)
    };

    let res = await fetch(url, options).then(async response => {
        if (response.status >= 200 && response.status < 300) {
            let jsonData = await response.json();
            return jsonData;
        } else {
            return {
                State: 0,
                Message: null,
                Data: null,
                Code: response.status
            };
        }
    });

    let msg = "";
    let bl = true;

    if (res && res.State === 0) {
        bl = false;
        msg = res.Message;
    }

    return {
        valid: bl,
        message: msg
    };
};

export function getRequestParams(input, form, injectEnvs, getEnv, injectVars) {
    let params = {};
    const childrenToParents = {};
    let _evaluator = createEvaluator(form);

    function getExpressionValue(item, value) {
        let _value = value;
        if (item && item.expression) {
            _value = _evaluator.evaluate(item.expression, {}, { value });
        }

        if (typeof _value === "undefined") {
            _value = null;
        }

        return _value;
    }

    function getChildrenValue(data, _injectVar, _injectEnvs) {
        let values = null;
        let children = childrenToParents[data.id] || [];
        children.forEach(item => {
            let inputValue = getParamValue(item, _injectVar, _injectEnvs);

            if (typeof inputValue === "undefined") {
                inputValue = null;
            }

            if (values) {
                values[item.field] = inputValue;
            } else {
                values = {
                    [item.field]: inputValue
                };
            }
        });

        return values;
    }

    function getItemValue(item, injectVar, _injectEnvs) {
        let value = null;

        if (item.type === "env") {
            value = getEnv(form, item.value, _injectEnvs);
        } else if (item.type === "formItem") {
            value = getApiFieldValue(form, item.value, injectVar);
        } else {
            value = item.value;
        }
        if (typeof value === "undefined") {
            value = null;
        }
        return value;
    }

    function formatListValue(list, fields, _injectEnvs) {
        if (fields instanceof Array && fields.length > 0) {
            return list.map((_d, i) => {
                let o = {};
                fields.forEach(d => {
                    let v = getParamValue(d, { index: i }, _injectEnvs);
                    o[d.field] = v;
                });
                return o;
            });
        } else {
            return list;
        }
    }

    function getParamValue(item, injectVar, _injectEnvs) {
        let value = null;

        if (item.dataType === "array") {
            let itemValue = getItemValue(item, injectVar, _injectEnvs) || [];
            if (itemValue instanceof Array) {
                let children = childrenToParents[item.id] || [];
                value = formatListValue(itemValue, children, _injectEnvs);
            } else {
                value = [];
            }
        } else if (item.dataType === "object") {
            let children = childrenToParents[item.id] || [];
            if (children.length > 0) {
                let itemValue =
                    getChildrenValue(item, injectVar, _injectEnvs) || null;
                value = itemValue;
            } else {
                value = getItemValue(item, injectVar, _injectEnvs);
            }
        } else if (item.dataType === "boolean") {
            let _value = getItemValue(item, injectVar, _injectEnvs);
            let _valueMap = {
                0: false,
                1: true,
                false: false,
                true: true
            };
            //将指定字符串值转换为对应的布尔值
            value = _valueMap[_value] ?? _value;
        } else {
            value = getItemValue(item, injectVar, _injectEnvs);
        }

        value = getExpressionValue(item, value);

        if (typeof value === "undefined") {
            value = null;
        }

        return value;
    }

    if (input instanceof Array) {
        input.forEach(d => {
            const parentKey = d.parentId;
            if (parentKey) {
                if (parentKey in childrenToParents) {
                    childrenToParents[parentKey].push(d);
                } else {
                    childrenToParents[parentKey] = [d];
                }
            }
        });

        input.forEach(d => {
            let hasParent = !!d.parentId;
            if (!hasParent) {
                params[d.field] = getParamValue(
                    d,
                    injectVars || {},
                    injectEnvs
                );
            }
        });
    }

    return params;
}

export const requestPostApiById = async params => {
    let { id, input, form } = params;

    if (!id) {
        return {
            data: []
        };
    }

    let queryString = `?id=${id}`;

    let reqParams = input;

    let queryOptions = window._Formx_Global_Options.get(
        "dataSourceMaintain",
        getParams(queryString, reqParams)
    );

    let url = queryOptions.url + queryString;

    let options = {
        ...queryOptions.options,
        body: JSON.stringify(reqParams)
    };

    let requestInfo = {
        dataSourceId: id,
        url: url,
        method: options.method,
        body: options.body
    };

    let res = await fetch(url, options).then(async response => {
        if (response.status >= 200 && response.status < 300) {
            let jsonData = await response.json();
            return jsonData;
        } else {
            return {
                State: 0,
                Message: null,
                Data: null,
                Code: response.status
            };
        }
    });

    let msg = "";
    let data = null;
    let succeed = false;

    if (res) {
        if (res.State === 1) {
            data = res.Data;
            succeed = true;
        } else {
            msg = res.Message;
            succeed = false;
        }
    }

    return {
        succeed,
        data,
        message: msg,
        requestInfo
    };
};

function flatData(arr, removeChildren = true) {
    let treeList = arr || [];

    //末级节点
    let leafs = [];
    //根
    let roots = [];

    //所有节点
    let list = [];

    let listMap = {};

    for (let i = 0; i < treeList.length; i++) {
        const d = treeList[i];

        const childrens = d.children || [];

        d.titles = [d.label];
        list.push(d);
        roots.push(d);

        if (!listMap.hasOwnProperty(d.value)) {
            listMap[d.value] = d;
        }

        if (childrens.length > 0) {
            getChildren(d, 0);
        } else {
            leafs.push(d);
        }

        if (removeChildren === true) {
            delete d.children;
        }
    }

    function getChildren(item, depth) {
        const tempArr = item.children || [];

        for (let i = 0; i < tempArr.length; i++) {
            const d = tempArr[i];
            const childrens = d.children || [];

            d.titles = [...item.titles, d.label];
            d.parent = item.value;
            list.push(d);

            if (!listMap.hasOwnProperty(d.value)) {
                listMap[d.value] = d;
            }

            if (childrens.length > 0) {
                getChildren(d, depth + 1);
            } else {
                leafs.push(d);
            }

            if (removeChildren === true) {
                delete d.children;
            }
        }
    }

    return { list: listMap, data: list };
}

const getNodeTitle = (list, key) => {
    let node = list?.[key];

    let titles = [];

    if (node) {
        if (node.titles instanceof Array) {
            titles = node.titles;
        }
    }
    return titles.join("-");
};

export function getLabelMap(dataSource) {
    let labelMap = {};

    if (dataSource) {
        let { data, list } = flatData(JSON.parse(JSON.stringify(dataSource)));

        if (data instanceof Array) {
            data.forEach(d => {
                let formattedLabel = getNodeTitle(list, d.value);
                labelMap[d.value] = formattedLabel;
            });
        }
    }

    return labelMap;
}

export function setTableErrorsToExtraField(arrayPath, instance, errors) {
    let extraField = instance.query("__DATA__").take();

    let arrayTable = instance.query(arrayPath).take();
    let arrayValue = arrayTable?.value;

    if (arrayTable) {
        let errorsMap = {};
        if (errors instanceof Array) {
            errors.forEach(d => {
                let { index: i } = getItemIndex(d.path);
                if (errorsMap[i] instanceof Array) {
                    errorsMap[i].push(d);
                } else {
                    errorsMap[i] = [d];
                }
            })
        }
        if (arrayValue instanceof Array && arrayValue.length > 0) {
            arrayValue.forEach((d, i) => {
                let e = errorsMap[i];
                let item = d;
                let nextErrors = [];
                let prevErrors = item.__ERRORS__;
                if (e instanceof Array && e.length > 0) {
                    if (prevErrors instanceof Array) {
                        prevErrors.forEach(_d => {
                            //自定义注入的表格错误，始终保留
                            if (_d.type === "custom") {
                                nextErrors.push(_d);
                            }
                        })
                    }
                    e.forEach(_d => {
                        nextErrors.push(_d);
                    })
                } else {
                    if (prevErrors instanceof Array) {
                        prevErrors.forEach(_d => {
                            let columnField = instance.query(_d.path).take();
                            //如果表格行进入过编辑状态，则删除自定义错误
                            if (!columnField) {
                                nextErrors.push(_d);
                            }
                        })
                    }
                }
                if (nextErrors.length > 0) {
                    item.__ERRORS__ = nextErrors;
                } else {
                    Reflect.deleteProperty(item, "__ERRORS__")
                }
            })
            arrayTable.setState(s => {
                s.componentProps = { ...s.componentProps }
            });
        }
    }

    if (extraField) {
        let prevErrors = extraField.selfErrors;
        let nextErrors = [];

        let currentTableErrors = [];
        let otherTableErrors = [];

        if (prevErrors instanceof Array) {
            prevErrors.forEach(d => {
                let isCurrentTableError = d.address.indexOf(arrayPath) > -1;
                if (isCurrentTableError) {
                } else {
                    otherTableErrors.push(d);
                }
            });

            if (arrayValue instanceof Array) {
                if (arrayValue.length > 0) {
                    arrayValue.forEach(d => {
                        if (d.__ERRORS__ instanceof Array) {
                            d.__ERRORS__.forEach(_d => {
                                currentTableErrors.push(_d);
                            })
                        }
                    });
                } else {
                    currentTableErrors = [];
                }
            }
        }
        nextErrors = otherTableErrors.concat(currentTableErrors);
        extraField.setSelfErrors(nextErrors);
    }
}

export function transformCardToTab(schema) {
    if (typeof schema === "object" && schema) {
        let _schema = JSON.parse(JSON.stringify(schema));
        let extraProperties = {};
        let firstChildren = _schema.properties;
        if (firstChildren) {
            let next = null;
            let bl = false;
            let children = {};
            Reflect.ownKeys(firstChildren).forEach(k => {
                let item = firstChildren[k];
                if (["__DATA__", "additionalProperties"].includes(k)) {
                    extraProperties[k] = item;
                } else {
                    let componentType = item["x-component"].toLowerCase();
                    if (["arraytable"].includes(componentType)) {
                        bl = true;
                        let tabpaneId = guid("g");
                        let tabpane = {
                            properties: {},
                            "type": "void",
                            "x-component": "Tab.TabPane",
                            "x-component-props": {
                                "x-layout-props": {
                                    span: 24
                                },
                                "x-extra-props": {
                                    name: "tabpane"
                                }
                            }
                        };
                        tabpane["x-component-props"].tab =
                            item["x-component-props"].title;
                        tabpane.properties = {
                            [k]: item
                        };
                        children[tabpaneId] = tabpane;
                    } else if (
                        ["card", "fieldset", "grid"].includes(componentType)
                    ) {
                        bl = true;
                        item["x-component"] = "Tab.TabPane";
                        item.type = "void";
                        let cmp = item["x-component-props"] || {};
                        let extra = cmp["x-extra-props"] || {};
                        extra.name = "tabpane";
                        cmp.name = "tabpane";
                        item["x-component-props"] = {
                            ...cmp,
                            tab: cmp.title
                        };
                        children[k] = item;
                    } else {
                        children[k] = item;
                    }
                }
            });

            if (bl) {
                let tabId = guid("g");
                next = {
                    type: "object",
                    properties: {
                        [tabId]: {
                            title: "选项卡",
                            "type": "void",
                            "x-component": "Tab",
                            "x-component-props": {
                                "x-extra-props": {
                                    name: "Tab"
                                },
                                "x-layout-props": {
                                    span: 24
                                }
                            },
                            properties: children
                        },
                        ...extraProperties
                    }
                };
                return next;
            }
        }
    }
    return schema;
}

export function isMobile() {
    let info = window.navigator.userAgent;
    let agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPod",
        "iPad"
    ];
    for (let i = 0; i < agents.length; i++) {
        if (info.indexOf(agents[i]) >= 0) return true;
    }
    return false;
}

export function isResponsiveSizeSmall(form) {
    let bl = window.document.body.classList.contains("responsive-size-small");

    if (bl === true) {
        return true;
    }

    if (form) {
        let enabledSmallLayoutSize =
            form.props?.context?.enabledSmallLayoutSize;
        if (enabledSmallLayoutSize === true) {
            return true;
        }
    }

    let _isMobile = isMobile();
    if (_isMobile === true) {
        return true;
    }

    let cw = window.document.body.clientWidth;
    if (cw <= 450) {
        bl = true;
    } else {
        bl = false;
    }
    return bl;
}
