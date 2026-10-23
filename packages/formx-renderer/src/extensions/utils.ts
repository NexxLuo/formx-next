import { FormPath } from "@formily/shared";
import { Evaluator } from "../core/expression";
import { getItemIndex, guid } from "../core/utils";

export function getFormEnvValue(form, k, injectEnvs?) {
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

export function createEvaluator(form, options?) {
    function callFunc() {
        let formActions = form.getFormState().formActions;
        try {
            return formActions.formFunction.call.apply(null, arguments);
        } catch (error) {
            console.error("call custom function error:", error);
            return null;
        }
    }

    function getFormItemCode() {
        let formActions = form.formActions;
        try {
            return formActions.getFormItemCode.apply(null, arguments);
        } catch (error) {
            console.error("call getFormItemCode error:", error);
            return null;
        }
    }

    function transformIdValuesToCode() {
        let formActions = form.getFormState().formActions;
        try {
            return formActions.transformIdValuesToCode.apply(null, arguments);
        } catch (error) {
            console.error("call transformIdValuesToCode error:", error);
            return null;
        }
    }

    function GetModalArgs(modalKey: string, valuePath: string, root: string = "show") {
        const field = form.query(modalKey).take();
        if (field) {
            const fn = field.fieldActions?.getActionArgs;
            if (typeof fn === "function") {
                const data = fn();
                let paths = [];

                if (root) {
                    paths.push(root);
                }
                if (valuePath) {
                    paths.push(valuePath);
                }

                if (paths.length > 0) {
                    const _res = FormPath.getIn(data, paths.join("."));
                    return _res;
                }

            }
        }
        return null;
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
                return getFormEnvValue(form, k);
            },
            GetModalArgs: GetModalArgs,
            CallFunc: callFunc,
            GetFormItemCode: getFormItemCode,
            TransformIdValuesToCode: transformIdValuesToCode
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
                        let rowIndex = injectVar?.arrayIndex ?? injectVar?.index;
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
            } else if (k.indexOf(".toolbar_") > -1) {
                let temp = k.split(".toolbar_");
                let listKey = temp[0],
                    fieldKey = temp[1];
                let state = form.getFieldState(listKey);
                let objectValue = null;

                if (state) {
                    let values = state.value;
                    if (values instanceof Array) {
                        let rowIndex = injectVar?.arrayIndex ?? injectVar?.index;
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

//候选值与行数据字段值的匹配：空值不参与匹配；先严格相等，再按字符串形式宽松匹配，避免数字/字符串类型差异导致过滤失效
function matchFilterValue(fieldValue, filterValue) {
    if (
        fieldValue === null ||
        fieldValue === undefined ||
        filterValue === null ||
        filterValue === undefined
    ) {
        return false;
    }
    if (fieldValue === filterValue) {
        return true;
    }
    return String(fieldValue) === String(filterValue);
}

/**
 * 按指定字段的值对行数据进行过滤，树形数据的children层级递归过滤
 * @param {*} data 行数据（数组或树形数组）
 * @param {*} field 过滤依据字段
 * @param {*} values 已选值列表
 * @param {*} isWhitelist true=仅保留命中的行，false=剔除命中的行
 */
function filterRowsByFieldValues(data, field, values, isWhitelist) {
    function matchRow(d) {
        let hit = values.some(v => matchFilterValue(d?.[field], v));
        return isWhitelist ? hit : !hit;
    }

    function walk(value) {
        if (value instanceof Array) {
            return value
                .filter(d => matchRow(d))
                .map(d => {
                    if (d && d.children instanceof Array) {
                        return { ...d, children: walk(d.children) };
                    }
                    return d;
                });
        }
        return value;
    }

    return walk(data);
}

/**
 * 平铺树数据（按父级标识组织）的孤儿行处理：
 * 源孤儿（接口数据中父级引用本就不存在）展示到根级，保留；
 * 过滤孤儿（父级行被黑白名单过滤掉造成）级联移除，避免展示层把子级挂到根级
 */
function removeFilteredOrphanRows(rows, sourceRows, idField, parentField) {
    if (!(rows instanceof Array) || !idField || !parentField) {
        return rows;
    }
    function collectIds(list) {
        let ids = new Set();
        list.forEach(r => {
            let id = r ? r[idField] : null;
            if (id !== undefined && id !== null && id !== "") {
                ids.add(String(id));
            }
        });
        return ids;
    }
    //源数据中存在的父级id（仅当这些父级被过滤掉时，其子级才算过滤孤儿）
    let sourceIds = collectIds(sourceRows);
    let result = rows;
    let changed = true;
    while (changed) {
        changed = false;
        let currentIds = collectIds(result);
        result = result.filter(r => {
            let p = r ? r[parentField] : null;
            //无父级引用或源数据即孤儿：视为根级展示
            if (
                p === undefined ||
                p === null ||
                p === "" ||
                !sourceIds.has(String(p))
            ) {
                return true;
            }
            //父级仍在过滤结果中
            if (currentIds.has(String(p))) {
                return true;
            }
            //父级被过滤造成孤儿：级联移除
            changed = true;
            return false;
        });
    }
    return result;
}

/**
 * 按数据过滤配置对接口返回数据进行过滤
 * 白名单/黑名单按指定字段的值过滤行（仅保留/剔除所选值的行），自定义公式按行过滤（表达式逐行求值，为假的行被剔除）
 * 各模式配置独立存储，切换模式互不丢失
 * @param {*} data 接口返回数据
 * @param {*} dataFilter { mode: "whitelist"|"blacklist"|"expression", whitelist: {field, values}, blacklist: {field, values}, expression: "" }
 * @param {*} form 表单实例，自定义公式求值上下文
 * @param {*} output 输出参数配置，用于识别平铺树数据的标识/父级字段
 * @returns
 */
export function applyDataFilter(data, dataFilter, form, output) {
    if (!dataFilter || !dataFilter.mode) {
        return data;
    }

    let { mode, whitelist, blacklist, expression } = dataFilter;

    if (mode === "whitelist" || mode === "blacklist") {
        let modeConfig = mode === "whitelist" ? whitelist : blacklist;
        let field = modeConfig?.field;
        let values = modeConfig?.values;
        if (!field || !(values instanceof Array) || values.length === 0) {
            return data;
        }
        let filtered = filterRowsByFieldValues(
            data,
            field,
            values,
            mode === "whitelist"
        );
        //平铺树数据：父级行被过滤后级联移除子级行（源孤儿除外，展示到根级）
        let idField;
        let parentField;
        if (output instanceof Array) {
            output.forEach(d => {
                if (d.fieldMap === "value") {
                    idField = d.field;
                }
                if (d.fieldMap === "parent") {
                    parentField = d.field;
                }
            });
        }
        return removeFilteredOrphanRows(
            filtered,
            data,
            idField,
            parentField
        );
    }

    if (mode === "expression" && expression && data instanceof Array) {
        let evaluator = createEvaluator(form);
        return data.filter(d => evaluator.evaluate(expression, {}, d));
    }

    return data;
}

export const requestApiById = async (params, pagination, signal?) => {
    let { id, input, output, runtime, dataFilter, form } = params;

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

    let queryOptions = (window as any)._Formx_Global_Options.get(
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

    let res = await fetch(url, { ...options, signal }).then(async response => {
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
    }).catch((e) => {
        return {
            State: 0,
            Message: e?.message,
            Data: null,
            requestInfo
        };
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

    //在label/value等字段映射之前按接口原始字段进行过滤
    arr = applyDataFilter(arr, dataFilter, form, output);

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
    let leafField = outputMap["isLeaf"];

    if (hasFieldMap && arr instanceof Array) {
        let _arr = [];
        treeForEach(arr, d => {
            if (typeof d === "object" && d) {
                let _value = d[valueField];
                let _parent = d[parentField];
                let _label = d[labelField];
                let _leaf = d[leafField];

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

                if (typeof _leaf === "boolean") {
                    d.isLeaf = _leaf;
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
    let { id, input } = params;

    if (!id) {
        return {
            data: []
        };
    }

    let queryString = `?id=${id}`;
    let reqParams = input;
    let queryOptions = (window as any)._Formx_Global_Options.get(
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
    }).catch((e) => {
        return {
            State: 0,
            Message: e?.message,
            Data: null
        };
    });

    let msg = "";
    let bl = true;

    if (res && res.State === 0) {
        bl = false;
        msg = res.Message;
    }

    if (res && res.Data instanceof Array) {
        return res.Data.map(d => {
            return {
                rowKey: d.RowKey,
                message: d.Message,
                failed: d.Error,
                column: d.Target
            };
        });
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
            _value = _evaluator.evaluate(item.expression, {}, { ...injectVars || {}, value });
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
    let { id, input } = params;

    if (!id) {
        return {
            data: []
        };
    }

    let queryString = `?id=${id}`;

    let reqParams = input;

    let queryOptions = (window as any)._Formx_Global_Options.get(
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
    }).catch((e) => {
        return {
            State: 0,
            Message: e?.message,
            Data: null
        };
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

export const requestApiByType = ({
    apiType,
    params
}: {
    apiType?: 0 | 1 | 2,
    params: {
        id: string, input: any, output?: any, runtime?: any, pagination?: any
    }
}) => {
    if (apiType == 1) {
        return requestValidateApiById(params)
    }

    if (apiType == 2) {
        return requestPostApiById(params)
    }

    return requestApiById(params, params.pagination)
}

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

export function setTableErrorsToExtraField(arrayPath, instance, errors, isBatchApi = false) {
    let extraField = instance.query("__DATA__").take();

    let arrayTable = instance.query(arrayPath).take();
    let arrayValue = arrayTable?.value;

    //表格列批量验证时应和常规的错误合并
    if (isBatchApi) {
        errors = [...errors, ...extraField.selfErrors];
    }

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
                if (["__DATA__", "additionalProperties"].includes(k as string)) {
                    extraProperties[k] = item;
                } else {
                    let componentType = item["x-component"].toLowerCase();
                    if (["arraytable"].includes(componentType)) {
                        bl = true;
                        let tabpaneId = guid("g");
                        let tabpane: any = {
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
