import React, { createContext } from "react";
import PropTypes from "prop-types";
import FormRender from "../core/render";
import FormActions from "./FormActions";
import { getItems as getExtenedEnvs } from "../extensions/env";
import { getItems as getExtenedFuncs } from "../extensions/func";
import { transformArrayValuesToComma } from "../core/utils";
import {
    requestValidateApiById,
    getRequestParams,
    createEvaluator,
    transformCardToTab,
    isResponsiveSizeSmall
} from "../extensions/utils";
import message from "../extensions/message";
import { createEffects } from "./effects";

export const FormContext = createContext(null);

function formatGraph(item) {
    let componentProps = { ...(item.component?.[1] || {}) };
    let extraProps = { ...(componentProps?.["x-extra-props"] || {}) };
    let ctype = extraProps.name?.toLowerCase();
    let o = {
        name: item.path,
        path: item.address,
        extraProps,
        componentProps,
        componentName: ctype,
        title: item.title,
        isTableCellField: extraProps.isTableCellField,
        fieldActions: item.fieldActions,
        displayName: item.displayName,
        isGroup: extraProps.isGroup,
        isList: extraProps.isList,
        isModal: ctype === "modal",
        entity: extraProps.entity,
        entityField: extraProps.field,
        isEntityField: extraProps.isEntityField,
        visible: item.visible
    };

    if (item.hasOwnProperty("value")) {
        o.value = item.value;
    }

    return o;
}

function getTitlePath(g, path, k, t) {
    let title = [];

    let parentPath = path.split("." + k)[0];

    if (parentPath && parentPath !== path) {
        let parentGraph = g[parentPath];

        let parentTitle = "";

        if (parentGraph) {
            if (parentGraph.componentName === "tabpane") {
                parentTitle = parentGraph.componentProps?.tab;
            } else if (
                ["tab", "grid"].indexOf(parentGraph.componentName) === -1
            ) {
                parentTitle = parentGraph.title;
            }

            if (parentPath.split(".").length > 1) {
                let prevParentTitle = getTitlePath(
                    g,
                    parentPath,
                    parentGraph.name,
                    parentTitle
                );

                if (prevParentTitle) {
                    title.push(prevParentTitle);
                }
            } else {
                if (parentTitle) {
                    title.push(parentTitle);
                }
            }
        }
    }

    if (t) {
        title.push(t);
    }

    return title.join(".");
}

function getRoot(graphMap, k) {
    let root = null;

    let item = graphMap[k];

    let itemKey = "";
    let itemPath = "";

    if (item) {
        itemKey = item.name;
        itemPath = item.path || "";
    }

    let rootPath = "";
    let rootGraph = null;
    let pathArr = itemPath.split(".");
    if (pathArr.length > 1) {
        rootPath = pathArr[0];
        rootGraph = graphMap[rootPath];
    }

    if (rootGraph) {
        let extraProps = rootGraph.extraProps || {};
        root = {
            isGroup: rootGraph.isGroup,
            isList: rootGraph.isList,
            isModal: rootGraph.isModal,
            name: rootGraph.name,
            key: rootGraph.name,
            path: rootGraph.path,
            title: extraProps.title
        };
    }

    return root;
}

function getFormItems(ins) {
    if (ins) {
        let g = ins.getFormGraph();
        let gMap = {};
        Object.keys(g).forEach(k => {
            gMap[k] = formatGraph(g[k]);
        });

        let items = [];

        delete g.__DATA__;

        Object.keys(g).forEach(k => {
            let d = formatGraph(g[k]);

            let matched = false;

            let currTitle = "";

            let root = getRoot(gMap, k);

            let extraprops = d.extraProps || {};
            currTitle = d.title || extraprops.title;
            let ctype = d.componentName;

            if (currTitle) {
                if (
                    extraprops.extraNameFieldKey ||
                    extraprops.relatedNameFieldKey
                ) {
                    currTitle = currTitle + "_id";
                }
                if (currTitle.endsWith("_name")) {
                    currTitle = currTitle.substring(0, currTitle.length - 5);
                }
            }

            matched = d.unmounted !== true && ctype !== "grid";

            let isTable = ctype === "arraytable";

            if (d.unmounted !== true && isTable) {
                let fn = d.fieldActions?.mapItems;
                if (typeof fn === "function") {
                    let t = getTitlePath(g, d.path, d.name, currTitle);
                    fn((_props, k, o) => {
                        let isInOperationColumn = false;
                        let _componentProps = _props["x-component-props"] || {};
                        let _extraProps =
                            _componentProps["x-extra-props"] || {};

                        if (o) {
                            let _parentExtraProps =
                                o.parent?.["x-extra-props"] || {};
                            if (_parentExtraProps.isOperationColumn === true) {
                                isInOperationColumn = true;
                            }
                        }

                        if (o && o.leaf === true && !isInOperationColumn) {
                            let ct = o.title.join(".");
                            if (t && ct) {
                                ct = t + "." + ct;
                            }

                            let clabel = "";

                            if (_componentProps.hasOwnProperty("title")) {
                                clabel = _componentProps.title;
                            } else {
                                clabel = _props.title;
                            }

                            items.push({
                                root,
                                label: clabel,
                                title: ct,
                                key: d.name + ".items." + _props.name,
                                name: d.name + ".items." + _props.name,
                                path: d.path + ".items." + _props.name,
                                type: _props["x-component"],
                                isGroup: _extraProps.isGroup,
                                isList: _extraProps.isList,
                                entity: extraprops.entity,
                                entityField: extraprops.field
                            });

                            //继续循环下级properties，表格列可能为下拉等存在隐藏字段的控件
                            _props.mapProperties(__props => {
                                let __componentProps =
                                    __props["x-component-props"] || {};
                                let __extraProps =
                                    __componentProps["x-extra-props"] || {};

                                let _label = __extraProps.title;
                                if (_label && _label.endsWith("_name")) {
                                    _label = _label.substring(
                                        0,
                                        _label.length - 5
                                    );
                                }
                                let _ct = _label;
                                if (t && _ct) {
                                    _ct = t + "." + _ct;
                                }

                                items.push({
                                    root,
                                    label: _label,
                                    title: _ct,
                                    key: d.name + ".items." + __props.name,
                                    name: d.name + ".items." + __props.name,
                                    path: d.path + ".items." + __props.name,
                                    type: __props["x-component"],
                                    isGroup: __extraProps.isGroup,
                                    isList: __extraProps.isList,
                                    entity: extraprops.entity,
                                    entityField: extraprops.field
                                });
                            });
                            //
                        }
                    });
                }
            }

            if (k && matched) {
                let t = getTitlePath(g, d.path, d.name, currTitle);
                items.push({
                    root,
                    label: currTitle,
                    title: t,
                    key: d.name,
                    name: d.name,
                    path: d.path,
                    type: d.componentName,
                    isGroup: d.isGroup,
                    isModal: d.isModal,
                    isList: d.isList,
                    entity: d.entity,
                    entityField: d.field
                });
            }
        });
        return items;
    }
}

/**
 * 从表单中获取的为平级数据，传递给外部的数据需要进行嵌套处理
 * @param {*} graph
 * @param {*} stateValues
 * @param {*} bindEntity 是否将表单项值绑定到实体字段，默认情况下会将表单项值绑定到父级容器
 */
function getValuesFromGraph(graph, stateValues, bindEntity = true) {
    let values = {};

    let keyPath = {};

    let listKeys = [];

    function getParentKey(item) {
        if (!item) {
            return "";
        }

        let path = item.path;
        let parentKey = "";

        //结构上的父级
        let schemaParentKey = "";
        let pathArr = (path || "").split(".");
        if (pathArr.length > 0) {
            schemaParentKey = pathArr[pathArr.length - 2] || "";
        }
        let parent = keyPath[schemaParentKey];
        //

        let entityParentKey = "";
        if (bindEntity === true) {
            //查找绑定了实体的父级
            if (parent) {
                if (parent.entity) {
                    entityParentKey = parent.name;
                } else {
                    entityParentKey = getParentKey(parent);
                }
            }
            //

            //如果父级存在实体，则嵌套一层直系父级
            if (entityParentKey) {
                parentKey = schemaParentKey;
            }
            //
        } else {
            parentKey = schemaParentKey;
        }

        return parentKey;
    }

    for (const k in graph) {
        if (k && graph.hasOwnProperty(k)) {
            let _g = graph[k];
            let item = formatGraph(_g);
            let extraProps = item.extraProps || {};

            let itemName = item.name;
            let tempArr = item.path.split(".");
            itemName = tempArr[tempArr.length - 1];

            keyPath[itemName] = {
                name: itemName,
                path: item.path,
                entity: extraProps.entity,
                entityField: extraProps.field,
                hiddenValue: extraProps.visibility?.hiddenValue ?? true,
                ctype: item.componentName,
                isField:
                    item.hasOwnProperty("value") || item.isEntityField === true, //容错处理：组件isEntityField为true时也视为输入控件
                relatedKey: extraProps.relatedKey,
                visible: item.visible,
                hidden: _g.hidden,
                selfDisplay: _g.selfDisplay
            };

            if (bindEntity && extraProps.isEntity && extraProps.entity) {
                //bug fixed : 表格不应该设置{}值，否则会导致数据错误
                if (["arraytable"].indexOf(item.componentName) > -1) {
                    values[itemName] = [];
                    listKeys.push(itemName);
                } else {
                    values[itemName] = {};
                }
            }
        }
    }

    for (const sk in stateValues) {
        if (stateValues.hasOwnProperty(sk) && keyPath.hasOwnProperty(sk)) {
            let dataValue = stateValues[sk];

            if (typeof dataValue === "object" && dataValue) {
                if (dataValue instanceof Array) {
                    dataValue = [...dataValue];
                } else {
                    dataValue = { ...dataValue };
                }
            }

            const dataKey = sk;
            let item = keyPath[dataKey];
            let relatedItem = keyPath[item?.relatedKey];

            if (
                ["checkbox", "select", "treeselect"].indexOf(item.ctype) > -1 ||
                ["checkbox", "select", "treeselect"].indexOf(
                    relatedItem?.ctype
                ) > -1
            ) {
                dataValue = transformArrayValuesToComma(dataValue);
            }

            if (["arraytable"].indexOf(item.ctype) > -1) {
                //bug fixed : 表格父级隐藏后，表格本身的数据并未清空，导致传递给了后端
                if (item.hidden === true && item.selfDisplay === "visible") {
                    if (item.hiddenValue === true) {
                        dataValue = [];
                    }
                }
                //
                dataValue = (dataValue || []).map(row => {
                    let _d = {};
                    for (const columnKey in row) {
                        if (Object.hasOwnProperty.call(row, columnKey)) {
                            let column_item = keyPath[columnKey];
                            let column_relatedItem =
                                keyPath[column_item?.relatedKey];
                            let column_value = row[columnKey];
                            if (
                                ["checkbox", "select", "treeselect"].indexOf(
                                    column_item?.ctype
                                ) > -1 ||
                                ["checkbox", "select", "treeselect"].indexOf(
                                    column_relatedItem?.ctype
                                ) > -1
                            ) {
                                column_value =
                                    transformArrayValuesToComma(column_value);
                            }

                            _d[columnKey] = column_value;
                        }
                    }
                    return _d;
                });
            }

            if (dataValue instanceof Array) {
                if (bindEntity === true) {
                    let listEntityGroupKey = "";
                    if (item.entity) {
                        listEntityGroupKey = item.name;
                    }
                    if (listEntityGroupKey) {
                        values[listEntityGroupKey] = dataValue;
                    }
                } else {
                    values[dataKey] = dataValue;
                }
            } else {
                let parentKey = "";

                let isField = true;

                if (item) {
                    isField = item.isField;
                }

                //如果是表单输入项，数据则进行父级嵌套
                if (isField) {
                    parentKey = getParentKey(item);

                    if (parentKey) {
                        if (values[parentKey]) {
                            values[parentKey][dataKey] = dataValue;
                        } else {
                            values[parentKey] = {
                                [dataKey]: dataValue
                            };
                        }
                    } else {
                        //如果不是绑定到实体，才将无父级的字段绑定到根级
                        if (bindEntity !== true) {
                            values[dataKey] = dataValue;
                        }
                    }
                } else {
                    //传递的values格式可能为{gxxxx:{Id:""}}
                    //此时应该合并值
                    let prev = values[dataKey];
                    if (typeof prev === "object" && prev) {
                        if (typeof dataValue === "object") {
                            values[dataKey] = { ...prev, ...dataValue };
                        }
                    } else {
                        values[dataKey] = dataValue;
                    }
                }
            }
        }
    }

    return {
        values,
        listKeys
    };
}

/**
 * 此处为外部传递的嵌套数据，但是表单需接收平级数据，顾需要进行展平处理
 * @param {*} obj
 */
function getValuesFromJson(obj) {
    let values = {};

    for (const k in obj) {
        if (obj.hasOwnProperty(k)) {
            let value = obj[k];

            //DATA为预置属性用于存取特殊数据,不进行展平处理
            if (k === "__DATA__") {
                values[k] = value;
            } else {
                if (value instanceof Array) {
                    values[k] = value;
                } else if (typeof value === "object" && value) {
                    //数据如果为object，则进行数据展平
                    for (const sk in value) {
                        if (value.hasOwnProperty(sk)) {
                            //如果设置的值不在schema中，则数据不进行展平处理，比如 id
                            let notExistInSchema = false;
                            let arr = ["id"];
                            if (arr.indexOf(sk.toLowerCase()) > -1) {
                                notExistInSchema = true;
                            }
                            //

                            if (notExistInSchema) {
                                if (values[k]) {
                                    values[k][sk] = value[sk];
                                } else {
                                    values[k] = { [sk]: value[sk] };
                                }
                            } else {
                                values[sk] = value[sk];
                            }
                        }
                    }
                } else {
                    values[k] = value;
                }
            }
        }
    }
    return values;
}

/**
 * 合并错误信息，第二个参数优先级更高
 * @param {*} a
 * @param {*} b
 */
function mergeErrors(a, b, formGraph) {
    let errors = [];
    let warnings = [];

    let e_a = a.errors || [];
    let w_a = a.warnings || [];

    let e_b = b.errors || [];
    let w_b = b.warnings || [];

    let errorsMap = {};

    const getTitle = d => {
        let t = "";
        if (formGraph && d) {
            let g = formGraph[d.address];
            t = g?.title || g?.component?.[1]?.["x-extra-props"]?.title;
        }
        return t;
    };

    const mergeExtra = d => {
        let msgArr = d?.messages;

        if (msgArr instanceof Array) {
            msgArr.forEach(item => {
                if ((!Reflect.has(errorsMap), item.path)) {
                    errorsMap[item.path] = {
                        ...item,
                        title: item.title
                    };
                }
            });
        }
    };

    e_a.forEach(d => {
        if (d.path === "__DATA__") {
            mergeExtra(d);
        } else {
            errorsMap[d.path] = {
                ...d,
                title: getTitle(d)
            };
        }
    });

    e_b.forEach(d => {
        if (d.path === "__DATA__") {
            mergeExtra(d);
        } else {
            errorsMap[d.path] = {
                ...d,
                title: getTitle(d)
            };
        }
    });

    for (const k in errorsMap) {
        errors.push(errorsMap[k]);
    }

    let warningsMap = {};

    w_a.forEach(d => {
        if (d.path === "__DATA__") {
            mergeExtra(d);
        } else {
            warningsMap[d.path] = {
                ...d,
                title: getTitle(d)
            };
        }
    });

    w_b.forEach(d => {
        if (d.path === "__DATA__") {
            mergeExtra(d);
        } else {
            warningsMap[d.path] = {
                ...d,
                title: getTitle(d)
            };
        }
    });

    for (const k in warningsMap) {
        warnings.push(warningsMap[k]);
    }

    return {
        errors,
        warnings
    };
}

/**
 * 获取删除掉的数据值
 * @param {*} currentValues 当前表单值
 * @param {*} initialValues 初始表单值
 * @param {*} listKeys 所有列表的key
 * @param {*} deleted 已记录的删除掉的数据值
 * @returns
 */
function getDeleted(currentValues, initialValues, listKeys, deleted) {
    let deletedListItem = deleted;
    let keyField = "Id";
    if (listKeys instanceof Array) {
        listKeys.forEach(k => {
            let initial = initialValues[k];
            let current = currentValues[k];

            let deletedItems = [];
            let currentMap = {};

            if (current instanceof Array) {
                current.forEach(d => {
                    if (d.hasOwnProperty(keyField)) {
                        currentMap[d[keyField]] = d;
                    }
                });
            }

            if (initial instanceof Array) {
                initial.forEach(d => {
                    if (
                        d.hasOwnProperty(keyField) &&
                        !currentMap.hasOwnProperty(d[keyField])
                    ) {
                        deletedItems.push(d);
                    }
                });
            }

            if (deletedItems.length > 0) {
                if (!deletedListItem) {
                    deletedListItem = {};
                }
                if (deletedListItem[k] instanceof Array) {
                    let obj = {};

                    //去重
                    let combineArr = [
                        ...deletedListItem[k],
                        ...deletedItems
                    ].reduce((cur, next) => {
                        obj[next[keyField]]
                            ? ""
                            : (obj[next[keyField]] = true && cur.push(next));
                        return cur;
                    }, []);
                    //

                    deletedListItem[k] = combineArr;
                } else {
                    deletedListItem[k] = deletedItems;
                }
            }
        });
    }

    return deletedListItem;
}

class Renderer extends React.Component {
    constructor(props) {
        super(props);
        this.formInstance = null;
        this.containerRef = React.createRef(null);
        this.navRef = React.createRef(null);
        this.stateRef = React.createRef(null);
        this.stateRef.current = { deleted: null };
        this.state = {
            values: null,
            sourceValues: null,
            sourceSchema: null,
            schema: null,
            prevProps: null,
            schemaKey: "form"
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps !== prevState.prevProps) {
            let _schema = nextProps.schema;

            let nextState = {
                values: getValuesFromJson(nextProps.values, nextProps.schema)
            };

            if (_schema !== prevState.sourceSchema) {
                let schema = {
                    type: "object",
                    properties: {
                        __DATA__: {
                            key: "__DATA__",
                            path: "__DATA__",
                            type: "object",
                            visible: false,
                            display: false
                        }
                    }
                };

                if (_schema) {
                    if (_schema.properties) {
                        schema.properties = {
                            ...schema.properties,
                            ..._schema.properties
                        };
                    }
                    if (_schema.additionalProperties) {
                        schema.additionalProperties = {
                            ..._schema.additionalProperties
                        };
                        if (
                            _schema.additionalProperties
                                .transformToTabWhenScreenSmall === true &&
                            (isResponsiveSizeSmall() ||
                                nextProps.enabledSmallLayoutSize)
                        ) {
                            schema = transformCardToTab(schema);
                        }
                    }
                }

                nextState.schema = schema;
                nextState.sourceSchema = _schema;
            }

            if (nextProps.values !== prevState.sourceValues) {
                nextState.sourceValues = nextProps.values;
            }

            nextState.prevProps = nextProps;

            return nextState;
        }
        return null;
    }

    getFormItems = () => {
        let ins = this.formInstance;
        return getFormItems(ins);
    };

    getData = bindEntity => {
        let ins = this.formInstance;
        if (ins) {
            let { values, listKeys } = ins.getFormState(state => {
                return getValuesFromGraph(
                    ins.getFormGraph(),
                    { ...state.values },
                    bindEntity
                );
            });
            return {
                data: values,
                deleted: getDeleted(
                    values,
                    this.state.values,
                    listKeys,
                    this.stateRef.current.deleted
                )
            };
        }
    };

    validate = callback => {
        let ins = this.formInstance;
        if (ins) {
            ins.validate()
                .then(res => {
                    if (typeof callback === "function") {
                        let { errors, warnings } = mergeErrors(
                            ins.getFormState(),
                            res,
                            ins.getFormGraph()
                        );

                        callback(errors, warnings);
                    }
                })
                .catch(res => {
                    if (typeof callback === "function") {
                        let { errors, warnings } = mergeErrors(
                            ins.getFormState(),
                            res,
                            ins.getFormGraph()
                        );
                        callback(errors, warnings);
                    }
                });
        }
    };

    callTask = taskType => {
        return this.formActions.callTask(taskType);
    };

    onSubmitError = (errors, onError) => {
        if (typeof onError === "function") {
            onError(errors);
        }

        let fn = this.props.onSubmitError;
        if (typeof fn === "function") {
            fn(errors);
        }
    };

    submitValidate = () => {
        let schema = this.state.schema;
        let additional = schema?.additionalProperties || {};
        let formInstance = this.formInstance;

        let validate = additional.validate;
        let validateAsync = additional.validateAsync;

        function getEnv(k, injectEnvs) {
            try {
                if (
                    typeof injectEnvs === "object" &&
                    injectEnvs &&
                    injectEnvs.hasOwnProperty(k)
                ) {
                    return injectEnvs[k];
                }
                let formActions = formInstance.getFormState().formActions;
                return formActions.formEnvs.getItemValue(k);
            } catch (error) {
                console.error("get environment value error :", error);
                return null;
            }
        }

        return new Promise((resolve, reject) => {
            if (
                typeof validate === "object" &&
                validate &&
                validate.expression
            ) {
                let _evaluator = createEvaluator(formInstance);

                let res = _evaluator.evaluate(validate.expression, {});
                if (res === false) {
                    message.error(validate.message || "提交验证未通过");
                    reject(validate.message);
                    return;
                }
            }

            if (
                typeof validateAsync === "object" &&
                validateAsync &&
                validateAsync.api
            ) {
                let validateAsyncApi = null;
                try {
                    validateAsyncApi = JSON.parse(validateAsync.api);
                } catch (error) {}

                let validateAsyncMessage = validateAsync.message;

                requestValidateApiById({
                    form: formInstance,
                    id: validateAsyncApi.dataSourceId,
                    input: getRequestParams(
                        validateAsyncApi.input,
                        formInstance,
                        {},
                        getEnv
                    ),
                    output: validateAsyncApi.output
                })
                    .then(({ valid, message: _message }) => {
                        let msg = "";
                        if (valid === false) {
                            msg =
                                validateAsyncMessage ||
                                _message ||
                                "提交验证未通过";

                            message.error(msg);
                            reject(msg);
                        } else {
                            resolve(true);
                        }
                    })
                    .catch(e => {
                        reject(e);
                    });
            } else {
                resolve(true);
            }
        });
    };

    submit = (callback, onError, bindEntity) => {
        let ins = this.formInstance;
        if (ins) {
            const _submit = () => {
                if (typeof callback === "function") {
                    let formState = ins.getFormState();
                    let { values, listKeys } = getValuesFromGraph(
                        ins.getFormGraph(),
                        { ...formState.values },
                        bindEntity
                    );
                    callback(
                        values,
                        getDeleted(
                            values,
                            this.state.values,
                            listKeys,
                            this.stateRef.current.deleted
                        ),
                        () => {
                            return this.callTask("after");
                        }
                    );
                } else {
                    this.callTask("after");
                }
            };

            this.validate(errors => {
                this.callTask("validate")
                    .then(() => {
                        if (errors.length > 0) {
                            this.onSubmitError(errors, onError);
                        } else {
                            this.callTask("beforeSubmit")
                                .then(() => {
                                    _submit();
                                })
                                .catch(e => {
                                    console.error(
                                        "beforeSubmit task error:",
                                        e
                                    );
                                    this.onSubmitError([e], onError);
                                });
                        }
                    })
                    .catch(e => {
                        let _errors = [...errors, e];
                        this.onSubmitError(_errors, onError);
                    });
            });
        }
    };

    registeEnvItems = () => {
        //将外部扩展的环境变量、表单配置的环境变量注入到当前表单中
        if (typeof this.formActions?.formEnvs?.setItems === "function") {
            let extendEnvs = getExtenedEnvs();

            let schema = this.state.schema;
            let additional = schema?.additionalProperties || {};
            let envs = additional.formEnvVariables || [];
            let arr = [];
            extendEnvs.forEach(d => {
                if (d.name) {
                    arr.push({
                        name: d.name,
                        value: d.value,
                        title: d.title
                    });
                }
            });

            envs.forEach(d => {
                if (d.name) {
                    arr.push({
                        name: d.name,
                        value: d.value,
                        title: d.title
                    });
                }
            });

            this.formActions.formEnvs.setItems(arr, true);
        }

        //将外部扩展的函数注入到当前表单中
        if (typeof this.formActions?.formFunction?.setItems === "function") {
            let extendFuncs = getExtenedFuncs();

            let arr = [];
            extendFuncs.forEach(d => {
                if (d.name) {
                    arr.push({
                        name: d.name,
                        value: d.value,
                        title: d.title
                    });
                }
            });
            this.formActions.formFunction.setItems(arr, true);
        }
    };

    onResize = () => {
        let cw = window.document.body.clientWidth;
        if (cw <= 450) {
            document.body.classList.add("responsive-size-small");
        } else {
            document.body.classList.remove("responsive-size-small");
        }
    };

    componentDidMount() {
        window._FormRender = this;
        let actions = this.props.actions;
        if (typeof actions === "function") {
            actions({
                getData: this.getData,
                validate: this.validate,
                submit: this.submit,
                getFormItems: this.getFormItems
            });
        } else {
            if (typeof actions === "object" && actions !== null) {
                actions.getData = this.getData.bind(this);
                actions.validate = this.validate.bind(this);
                actions.submit = this.submit.bind(this);
                actions.getFormItems = this.getFormItems.bind(this);
            }
        }

        window.addEventListener("resize", this.onResize);
        this.onResize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.sourceSchema !== this.state.sourceSchema) {
            this.registeEnvItems();
            if (typeof this.props.onSchemaChange === "function") {
                this.props.onSchemaChange(this.formActions, this.formInstance);
            }
        }

        if (prevState.sourceValues !== this.state.sourceValues) {
            this.setData(this.state.sourceValues);
        }
    }

    transformValues = (data, schema) => {
        return getValuesFromJson(data, schema);
    };

    setData = data => {
        let ins = this.formInstance;
        if (ins) {
            let values = getValuesFromJson(data, this.state.sourceSchema);
            //如果不清除缓存，会导致获取到之前缓存的数据，如：
            //表格显示隐藏，隐藏后暂存，再次让表格显示，表格获取到了之前的数据，实际上此条数据已经被删除
            //清除caches也可以，但是暂存时表格数据超过2000行可能导致Reaction报错 RangeError: Maximum call stack size exceeded
            //直接更改key会导致所有组件都重新mount，不可取
            ins.query("*").forEach(_field => {
                if (_field) {
                    _field.caches = {};
                }
            });
            //不可reset，否则会导致未绑定实体的字段控件，如何默认值来自于接口，暂存reset后会被清空值，
            //因为暂存后的getData接口无法返回该字段值。
            //ins.reset("*", { forceClear: true, validate: false });
            ins.setValues(values, "merge");
        }
    };

    onInit = (formInstance, formEffect, _consumer) => {
        this.formInstance = formInstance;
        this.formActions = new FormActions(formInstance, formEffect, _consumer);
        this.registeEnvItems();
        this.formInstance.setFormState(state => {
            state.formActions = this.formActions;
        });
        if (typeof this.props.onInit === "function") {
            this.props.onInit(this, formInstance);
        }
    };

    onMount = () => {
        if (typeof this.props.onSchemaChange === "function") {
            this.props.onSchemaChange(this.formActions, this.formInstance);
        }

        let navRef = this.navRef.current;
        if (navRef) {
            navRef.init();
        }
    };

    onListItemDelete = item => {
        let nextDeleted = this.stateRef.current.deleted || {};

        let existData = nextDeleted[item.key];

        if (item) {
            if (existData instanceof Array) {
                nextDeleted[item.key] = []
                    .concat(existData)
                    .concat(item.data || []);
            } else {
                nextDeleted[item.key] = item.data;
            }
        }

        this.stateRef.current.deleted = nextDeleted;
    };

    toTabLayout = () => {
        let next = transformCardToTab(this.state.schema);
        this.setState({ schema: next });
    };

    getContainer = () => {
        return this.containerRef.current;
    };

    render() {
        let { schema, values } = this.state;

        let _effects = createEffects;
        if (typeof this.props.effects === "function") {
            _effects = this.props.effects;
        }

        let { readOnly, disabled, getContext, setContext, className } =
            this.props;

        return (
            <FormContext.Provider
                value={{
                    loading: this.props.loading,
                    options: this.props.options
                }}
            >
                <FormRender
                    initialValues={values}
                    schema={schema}
                    components={this.props.components}
                    form={this.props.form}
                    effects={_effects}
                    onInit={this.onInit}
                    onMount={this.onMount}
                    readOnly={readOnly}
                    disabled={disabled}
                    getContext={getContext}
                    setContext={setContext}
                    context={{
                        loading: this.props.loading,
                        options: this.props.options || {},
                        onListItemDelete: this.onListItemDelete,
                        enabledSmallLayoutSize:
                            this.props.enabledSmallLayoutSize
                    }}
                    className={className}
                >
                    {this.props.children}
                </FormRender>
            </FormContext.Provider>
        );
    }
}

Renderer.defaultProps = {
    disabled: false,
    readOnly: false,
    enabledSmallLayoutSize: false
};
Renderer.propTypes = {
    components: PropTypes.object.isRequired,
    actions: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    /** 模板数据 */
    schema: PropTypes.object,
    /** 表单数据 */
    values: PropTypes.object,

    /** 表单数据是否加载中 */
    loading: PropTypes.bool,

    /**
     * 表单项权限配置,禁用、只读、可见、必填
     * {key:{disabled:boolean,readonly:boolean,visible:boolean,required:boolean}}
     */
    options: PropTypes.object,
    /** 提交失败的回调 */
    onSubmitError: PropTypes.func,
    getContext: PropTypes.func,
    effects: PropTypes.func,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    className: PropTypes.string,
    enabledSmallLayoutSize: PropTypes.bool
};

export default Renderer;
