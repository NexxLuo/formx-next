import React, { createContext } from "react";
import ReactDOM from "react-dom"
import PropTypes from "prop-types";
import FormRender from "../core/render";
import FormActions from "./FormActions";
import { getItems as getExtenedEnvs } from "../extensions/env";
import { getItems as getExtenedFuncs } from "../extensions/func";
import {
    transformArrayValuesToComma, encryptString, decryptString, eachSchemaItems,
    transformToTreeData
} from "../core/utils";
import {
    requestValidateApiById,
    getRequestParams,
    createEvaluator,
    transformCardToTab,
    isResponsiveSizeSmall
} from "../extensions/utils";
import message from "../extensions/message";
import { createEffects } from "./effects";
import { clone } from "@formily/shared";
import { DateTimeFormat } from "../core/expression/functions"
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

const getTitleSuffixByGraph = (graph, graphMap = {}) => {
    let d = graph;

    let name = d.path;
    let path = d.address;
    let ctype = d.component[0]?.toLowerCase();
    let componentProps = d.component[1];
    let extraprops = componentProps?.["x-extra-props"] || {};

    let title_suffix = "";
    let nameFieldKey = extraprops.extraNameFieldKey ||
        extraprops.relatedNameFieldKey;
    let idFieldKey = extraprops.relatedIdFieldKey ||
        extraprops.relatedKey;
    if (
        nameFieldKey
    ) {
        title_suffix = "_id";
        if (ctype === "datepicker.rangepicker") {
            title_suffix = "_开始";
        }
    }

    let idFieldGraph = graphMap[path.replace(name, idFieldKey)];
    if (idFieldKey && idFieldGraph && idFieldGraph.component[0] === "DatePicker.RangePicker") {
        title_suffix = "_结束";
    }

    return title_suffix;
}

const getTitleSuffixBySchema = (schema, parentSchema, t) => {
    let extraprops = schema["x-component-props"]?.["x-extra-props"] || {};
    let ctype = schema["x-component"]?.toLowerCase();

    let title_suffix = "";
    let nameFieldKey = extraprops.extraNameFieldKey ||
        extraprops.relatedNameFieldKey;
    let idFieldKey = extraprops.relatedIdFieldKey ||
        extraprops.relatedKey;
    if (
        nameFieldKey
    ) {
        title_suffix = "_id";
        if (ctype === "datepicker.rangepicker") {
            title_suffix = "_开始";
        }
    }

    if (idFieldKey && parentSchema?.["x-component"] === "DatePicker.RangePicker") {
        title_suffix = "_结束";
    }
    return title_suffix;
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
                let title_suffix = getTitleSuffixByGraph(g[k], g);
                currTitle = currTitle + title_suffix;
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
                            let title_suffix = getTitleSuffixBySchema(_props, null);
                            ct = ct + title_suffix;

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
                                let title_suffix = getTitleSuffixBySchema(__props, _props, _label);
                                _label = _label + title_suffix;
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
 * @param {*} includeUndefined 未输入的表单项值为undefined，获取值时将无此字段，以此参数控制是否包含字段
 */
function getValuesFromGraph(graph, stateValues, bindEntity = true, formActions, getContainer, includeUndefined) {
    let values = {};

    let listValues = {};

    let keyPath = {};

    let listKeys = [];

    let formSchemaMap = formActions.getFormSchemaMap();

    let containerEl = null;

    if (typeof getContainer === "function") {
        containerEl = getContainer()
    }

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

            let allowValues = true;
            let _dataHandleMode = extraProps.dataHandleMode ?? "default";
            if (bindEntity && extraProps.entity && ["onlyLoad", "none"].indexOf(_dataHandleMode) > -1) {
                allowValues = false;
            }

            if (includeUndefined === true) {
                if (item.displayName === "Field" && typeof stateValues[itemName] === "undefined") {
                    stateValues[itemName] = null;
                }
            }

            if (allowValues) {
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
                        //增量更新时，不进行差异对比查找出删除的数据，直接使用onListItemDelete事件记录的删除数据
                        if (extraProps.incrementalUpdate !== true) {
                            listKeys.push(itemName);
                        }
                    } else {
                        values[itemName] = {};
                    }
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
                ["checkbox", "select", "treeselect", "tree"].indexOf(item.ctype) > -1 ||
                ["checkbox", "select", "treeselect", "tree"].indexOf(
                    relatedItem?.ctype
                ) > -1
            ) {
                dataValue = transformArrayValuesToComma(dataValue);
            }

            if (item.ctype === "sensitiveinput") {
                dataValue = encryptString(dataValue)
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

                            let column_schema = formSchemaMap?.[columnKey];
                            let extraProps = column_schema?.["x-component-props"]?.["x-extra-props"] || {};
                            let column_related_schema = formSchemaMap?.[extraProps.relatedKey];

                            let column_value = row[columnKey];
                            if (
                                ["checkbox", "select", "treeselect", "tree"].indexOf(
                                    column_schema?.["x-component"]?.toLowerCase()
                                ) > -1 ||
                                ["checkbox", "select", "treeselect", "tree"].indexOf(
                                    column_related_schema?.["x-component"]?.toLowerCase()
                                ) > -1
                            ) {
                                column_value =
                                    transformArrayValuesToComma(column_value);
                            }

                            if (column_schema?.["x-component"] === "SensitiveInput") {
                                column_value = encryptString(column_value)
                            }

                            let columnHiddenValue = extraProps.visibility?.hiddenValue === true;
                            let hiddenValue = false;

                            if (columnHiddenValue && containerEl) {
                                let columnEl = containerEl.getElementsByClassName("column_" + columnKey)[0];
                                if (columnEl && columnEl.classList.contains("tablex-table-column-hidden")) {
                                    hiddenValue = true;
                                }
                            }

                            if (!hiddenValue) {
                                _d[columnKey] = column_value;
                            }

                        }
                    }
                    return _d;
                });
                listValues[dataKey] = dataValue;
                dataValue = transformToTreeData(dataValue, "__KEY__", "__PARENT__",
                    "__ROOT__");
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
        listValues,
        listKeys
    };
}

/** 在表单mount完成后再进行明细表数据加载，明细表数据较影响初始化mout效率 */
const ArrayValues_Defer_Load = true;

function deleteEmptyValue(values, k, bl) {
    if (bl === true && values[k] === null) {
        Reflect.deleteProperty(values, k)
    }
}

/**
 * 此处为外部传递的嵌套数据，但是表单需接收平级数据，顾需要进行展平处理
 * @param {*} obj
 * @param {boolean} ignoreSetEmptyValue 是否忽略空(null)值
 */
function getValuesFromJson(obj, ignoreSetEmptyValue = false) {
    //需要深拷贝，否则第二次设置表单数据后，修改表单数据时会导致外部的源数据发生变化
    let _obj = clone(obj);
    let values = {};
    let arrayValues = {};

    for (const k in _obj) {
        if (obj.hasOwnProperty(k)) {
            let value = obj[k];

            //DATA为预置属性用于存取特殊数据,不进行展平处理
            if (k === "__DATA__") {
                values[k] = value;
            } else {
                if (value instanceof Array) {
                    if (ArrayValues_Defer_Load) {
                        values[k] = [];
                        arrayValues[k] = value;
                    } else {
                        values[k] = value;
                    }
                    deleteEmptyValue(values, k, ignoreSetEmptyValue);
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
                                deleteEmptyValue(values, sk, ignoreSetEmptyValue)
                            }
                        }
                    }
                } else {
                    values[k] = value;
                    deleteEmptyValue(values, k, ignoreSetEmptyValue)
                }
            }
        }
    }

    return {
        values,
        arrayValues,
        allValues: {
            ...values,
            ...arrayValues
        }
    };
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

    let e_b = b?.errors || [];
    let w_b = b?.warnings || [];

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
                    let g = formGraph[item.address];
                    if (g) {
                        //明细表非编辑列错误信息中过滤掉已卸载和隐藏的字段
                        if (
                            g.mounted === true &&
                            g.display !== "hidden" &&
                            g.display !== "none"
                        ) {
                            errorsMap[item.path] = {
                                ...item,
                                title: item.title
                            };
                        } else {
                            //如果是批量验证，不排除掉卸载的字段，否则会被过滤掉错误信息
                            if (item.triggerType === "onBatchValidate" &&
                                g.display !== "hidden" &&
                                g.display !== "none") {
                                errorsMap[item.path] = {
                                    ...item,
                                    title: item.title
                                };
                            }
                        }
                    } else {
                        errorsMap[item.path] = {
                            ...item,
                            title: item.title
                        };
                    }
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

const decryptStringInArray = (_schema, value) => {
    let sensitiveInputKeys = [];
    let _arrayValue = value;
    let _value = value;
    eachSchemaItems(_schema, (k, _columnSchema) => {
        if (_columnSchema?.["x-component"] === "SensitiveInput") {
            sensitiveInputKeys.push(k)
        }
    })
    if (sensitiveInputKeys.length > 0 && _arrayValue instanceof Array) {
        _value = _arrayValue.map(d => {
            let _d = { ...d };
            sensitiveInputKeys.forEach(_k => {
                _d[_k] = decryptString(_d[_k])
            })
            return _d;
        })
    }
    return _value;
}

class Renderer extends React.Component {
    constructor(props) {
        super(props);
        this.formInstance = null;
        this.containerRef = React.createRef(null);
        this.stateRef = React.createRef(null);
        this.stateRef.current = { deleted: null };
        this.formSchemaMap = null;
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
                values: getValuesFromJson(nextProps.values, nextProps.ignoreSetEmptyValue)
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



    shouldComponentUpdate(newProps, newState) {
        let bl = false;
        if (this.state.sourceSchema !== newState.sourceSchema || this.state.sourceValues !== newState.sourceValues) {
            bl = true;
        }
        if (this.props.loading !== newProps.loading || this.props.options !== newProps.options) {
            bl = true;
        }
        return bl;
    }


    getFormItems = () => {
        let ins = this.formInstance;
        return getFormItems(ins);
    };

    getData = (bindEntity, includeUndefined = false) => {
        let ins = this.formInstance;
        if (ins) {
            let { values, listValues, listKeys } = ins.getFormState(state => {
                return getValuesFromGraph(
                    ins.getFormGraph(),
                    { ...state.values },
                    bindEntity,
                    state.formActions,
                    this.getContainer,
                    includeUndefined
                );
            });
            return {
                data: values,
                deleted: getDeleted(
                    listValues,
                    this.state.values?.allValues,
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

        function getEnv(instance, k, injectEnvs) {
            try {
                if (
                    typeof injectEnvs === "object" &&
                    injectEnvs &&
                    injectEnvs.hasOwnProperty(k)
                ) {
                    return injectEnvs[k];
                }
                let formActions = instance.getFormState().formActions;
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
                } catch (error) { }

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

    submit = (callback, onError, bindEntity, includeUndefined = false) => {
        let ins = this.formInstance;
        if (ins) {
            const _submit = () => {
                if (typeof callback === "function") {
                    let formState = ins.getFormState();
                    let { values, listKeys } = getValuesFromGraph(
                        ins.getFormGraph(),
                        { ...formState.values },
                        bindEntity,
                        state.formActions,
                        this.getContainer,
                        includeUndefined
                    );
                    callback(
                        values,
                        getDeleted(
                            values,
                            this.state.values?.allValues,
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
        if (cw <= 450 || this.props.enabledSmallLayoutSize) {
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

    transformValues = (data) => {
        return getValuesFromJson(data);
    };

    setData = data => {
        let ins = this.formInstance;
        if (ins) {
            let { allValues: values } = getValuesFromJson(data);
            //如果不清除缓存，会导致获取到之前缓存的数据，如：
            //表格显示隐藏，隐藏后暂存，再次让表格显示，表格获取到了之前的数据，实际上此条数据已经被删除
            //清除caches也可以，但是暂存时表格数据超过2000行可能导致Reaction报错 RangeError: Maximum call stack size exceeded
            //直接更改key会导致所有组件都重新mount，不可取
            let formSchemaMap = this.formSchemaMap;
            ins.query("*").forEach(_field => {
                if (_field) {
                    if (_field.displayName === "Field") {
                        let fk = _field.path.toString();

                        _field.caches = {};

                        //将值设置为null，因为暂存后再次设值，未修改的字段都为null，而表单值为undefined，会导致触发联动
                        //从而，联动的值覆盖了暂存的值
                        //将字段值与外部传递的值进行一次简单值比较(表单内部使用的是严格相等比较)，如果相同则依然使用字段本身的值，避免不必要的触发onFieldValueChange
                        if (_field.value == values[fk]) {
                            values[fk] = _field.value;
                        }

                        //日期控件需要进行格式化后再进行比较，否则也会导致不必要的触发onFieldValueChange
                        //因为传递进来的值为时分秒格式，而表单值为年月日，如：2020-01-01、2020-01-01 00:00:00,实际两者相等
                        if (_field.componentType === "DatePicker") {
                            let df = "YYYY-MM-DD HH:mm:ss";
                            if (DateTimeFormat(_field.value, df) === DateTimeFormat(values[fk], df)) {
                                values[fk] = _field.value;
                            }
                        }

                        //脱敏文本存储的值都为加密后的值，再次设置到表单时，需要进行解密赋值
                        if (_field.componentType === "SensitiveInput") {
                            values[fk] = decryptString(values[fk]);
                        }

                    } else if (_field.displayName === "ArrayField") {
                        //脱敏文本存储的值都为加密后的值，再次设置到表单时，需要进行解密赋值
                        let fk = _field.path.toString();
                        values[fk] = decryptStringInArray(formSchemaMap?.[fk], values[fk])
                    }
                }
            });
            //不可reset，否则会导致未绑定实体的字段控件，如何默认值来自于接口，暂存reset后会被清空值，
            //因为暂存后的getData接口无法返回该字段值。
            //ins.reset("*", { forceClear: true, validate: false });
            ins.setValues(values, "merge");

            if (typeof this.props.onDataChange === "function") {
                this.props.onDataChange(this.formActions);
            }
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

    onMount = (form, $, _consumer) => {
        let arrayValues = this.state.values.arrayValues;

        let { formSchemaMap } = _consumer();
        let _arrayValues = {};
        let bl = false;
        this.formSchemaMap = formSchemaMap;
        Reflect.ownKeys(arrayValues).forEach(k => {
            let _schema = formSchemaMap[k];
            let _dataHandleMode = _schema?.extraProps?.dataHandleMode ?? "default";
            if (["onlySave", "none"].indexOf(_dataHandleMode) === -1) {
                bl = true;
                // 如果表格中存在脱敏文本，需对脱敏文本值进行解密
                let _value = decryptStringInArray(_schema, arrayValues[k])
                //
                _arrayValues[k] = _value;
            }
        })

        if (bl) {
            let formInstance = this.formInstance;
            if (this.props.ignoreSetEmptyValue === true) {
                let formActions = this.formActions;
                Reflect.ownKeys(_arrayValues).forEach(k => {
                    formActions.setValue(k, _arrayValues[k], null, true);
                })
            } else {
                formInstance.setValues(_arrayValues, "merge");
                Reflect.ownKeys(_arrayValues).forEach(k => {
                    let field = formInstance.query(k).take();
                    if (field != null) {
                        formInstance.notify("onFieldValueDeferLoad", field, formInstance)
                    }
                })
            }
        }

        if (typeof this.props.onDataInit === "function") {
            this.props.onDataInit(this.formActions);
        }

        if (typeof this.props.onSchemaChange === "function") {
            this.props.onSchemaChange(this.formActions, this.formInstance);
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
        this.setState({ sourceSchema: { ...this.state.sourceSchema }, schema: next });
    };

    getContainer = () => {
        return ReactDOM.findDOMNode(this);
    };

    render() {
        let { schema, values } = this.state;

        let _effects = createEffects;
        if (typeof this.props.effects === "function") {
            _effects = this.props.effects;
        }
        let { readOnly, disabled, getContext, setContext, className, globalComponents = {} } =
            this.props;
        console.log("FormRenderRender")
        return (
            <FormContext.Provider
                value={{
                    loading: this.props.loading,
                    options: this.props.options
                }}
            >
                <FormRender
                    initialValues={values?.values}
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
                        disabledAsyncValue: this.props.disabledAsyncValue,
                        onListItemDelete: this.onListItemDelete,
                        sourceValues: this.state.sourceValues,
                        enabledSmallLayoutSize:
                            this.props.enabledSmallLayoutSize
                    }}
                    className={className}
                >
                    {this.props.children}
                </FormRender>
                {
                    Object.keys(globalComponents).map(k => {
                        let Cmp = globalComponents[k]
                        return <Cmp key={k} getForm={() => { return this.formActions }} />
                    })
                }
            </FormContext.Provider>
        );
    }
}

Renderer.defaultProps = {
    disabled: false,
    readOnly: false,
    enabledSmallLayoutSize: false,
    ignoreSetEmptyValue: false,
    disabledAsyncValue: false
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
    enabledSmallLayoutSize: PropTypes.bool,
    onSchemaChange: PropTypes.func,
    onInit: PropTypes.func,
    onDataInit: PropTypes.func,
    onDataChange: PropTypes.func,
    /** 是否忽略设置空值(null)数据，忽略后此字段会正常响应公式联动 */
    ignoreSetEmptyValue: PropTypes.bool,
    /** 是否禁用异步数据接口请求，一般流程结束后应不再请求异步数据值 */
    disabledAsyncValue: PropTypes.bool
};

export default Renderer;
