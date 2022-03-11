import React, { useState, useEffect } from "react";
import { RecursionField } from "@formily/react";
import { CheckOutlined } from "@platform/formx-antd/lib/icons";
import { clone } from "@formily/shared";
import { Tooltip, Skeleton, Icon } from "antd";
import message from "../../../extensions/message";
import { isResponsiveSizeSmall } from "../../../extensions/utils";
import {
    formatNumberComma,
    formatDateValue,
    transformCommaValuesToArray,
    getItemIndex,
    mapSchemaItems
} from "../../utils";

import { Evaluator } from "../../expression";
import { MathAdd, MathDivide } from "../../expression/functions";
import maxBy from "lodash/maxBy";
import minBy from "lodash/minBy";
import { ArrayField, Form, Field } from "@formily/core/esm/models";
import debounce from "lodash/debounce";
import { getValue } from "../../linkages/value";
import { TableProps } from "antd/lib/table";
import { ISchema } from "@formily/json-schema/esm/types";

const KEY_FIELD = "__KEY__";

export function focusInput(wrapper) {
    if (wrapper) {
        //如果自定义李编辑焦点控件，则优先其focus
        let editorEL = wrapper.getElementsByClassName(
            "table-editor-focusable"
        )[0];
        if (editorEL) {
            editorEL.focus();
            return;
        }
        //
        let selectEl = wrapper.getElementsByClassName("ant-select-enabled")[0];

        if (selectEl) {
            selectEl.click();
            return;
        }

        let inputEl = wrapper.getElementsByTagName("input")[0];

        if (inputEl) {
            inputEl.focus();
            return;
        }

        let buttonEL = wrapper.getElementsByTagName("button")[0];

        if (buttonEL) {
            buttonEL.focus();
            return;
        }
    }
}

export const renderHeaderTools = (columnSchema, isEditor, arrayField) => {
    let innerElements = [];
    let operationElement: any = null;
    let items = columnSchema.items;
    let basePath = arrayField.address.toString();
    let editable: boolean = !arrayField.component[1]?.disabled;

    if (items) {
        items.mapProperties((item_props, _key) => {
            let _props = item_props;
            let _componentProps = _props["x-component-props"] || {};
            let extraProps = _componentProps["x-extra-props"] || {};
            let renderInHeader = extraProps.renderInHeader || false;
            let itemActionType = extraProps?.actions?.type;

            let key = "toolbar_" + _key;

            if (isEditor) {
                innerElements.push(
                    <RecursionField
                        key={key}
                        basePath={basePath}
                        name={key}
                        schema={_props}
                    />
                );
            } else {
                if (
                    ["editRow", "cloneRow", "moveUp", "moveDown"].indexOf(
                        itemActionType
                    ) > -1
                ) {
                    return null;
                }
                if (!editable) {
                    if (
                        ["insertData", "deleteSelected", "importData"].indexOf(
                            itemActionType
                        ) > -1
                    ) {
                        return null;
                    }
                }

                if (
                    [
                        "insertData",
                        "deleteSelected",
                        "importData",
                        "exportData"
                    ].indexOf(itemActionType) > -1 ||
                    renderInHeader
                ) {
                    innerElements.push(
                        <RecursionField
                            key={key}
                            basePath={basePath}
                            name={key}
                            schema={_props}
                        />
                    );
                }
            }
        });
    }

    if (innerElements.length > 0) {
        operationElement = (
            <div className="table-head-cell-operation">{innerElements}</div>
        );
    } else if (isEditor) {
        operationElement = (
            <span style={{ color: "#c8c8c8" }}>可向此处拖入按钮</span>
        );
    } else {
        operationElement = <span>{columnSchema.title}</span>;
    }
    return operationElement;
};

//渲染操作列内容
export const renderOperationColumn = (
    column,
    index,
    row,
    arrayPath,
    rowPath,
    fieldActions,
    editable
) => {
    let items = column.items;
    let operationElement: any = null;

    if (items) {
        let basePath = rowPath;

        let innerElements = items.mapProperties((item_props, key) => {
            let _props = item_props;
            let componentProps = _props["x-component-props"] || {};
            let extraProps = componentProps?.["x-extra-props"] || {};
            let renderInHeader = extraProps.renderInHeader || false;
            let itemAction = extraProps?.actions;

            if (itemAction) {
                if (
                    ["insertData", "importData", "exportData"].indexOf(
                        itemAction.type
                    ) > -1
                ) {
                    return null;
                }

                if (!editable) {
                    if (
                        [
                            "editRow",
                            "cloneRow",
                            "deleteSelected",
                            "moveUp",
                            "moveDown"
                        ].indexOf(itemAction.type) > -1
                    ) {
                        return null;
                    }
                }

                if (row) {
                    if (itemAction.type === "editRow") {
                        if (fieldActions.isEditing(row[KEY_FIELD]))
                            return (
                                <CheckOutlined
                                    key={key}
                                    onClick={e => {
                                        e.stopPropagation();
                                        fieldActions.completeEdit();
                                    }}
                                ></CheckOutlined>
                            );
                    }
                }
            }

            if (renderInHeader) {
                return null;
            }
            return (
                <RecursionField
                    schema={{
                        ..._props,
                        "x-component-props": {
                            ...componentProps,
                            disabled: false,
                            "x-runtime": {
                                isOperationTool: true,
                                code: extraProps?.formItemCode,
                                arrayPath,
                                isTableCellField: true,
                                index,
                                rowKey: row[KEY_FIELD]
                            }
                        },
                        isTableCellField: true,
                        noneWrapper: true
                    }}
                    basePath={basePath}
                    key={key}
                    name={key}
                />
            );
        });

        if (innerElements.length > 0) {
            operationElement = (
                <div className="table-cell-operation">{innerElements}</div>
            );
        }
    }

    return operationElement;
};

const formatRenderValue = ({
    state,
    props,
    path,
    value,
    row,
    rowIndex,
    _evaluator,
    form,
    ignoreNumberComma = false
}) => {
    let v = value;

    if (props) {
        let componentProps = props["x-component-props"] || {};
        let extraProps = componentProps["x-extra-props"] || {};
        let ctype = props["x-component"]?.toLowerCase();
        let visibility = extraProps.visibility;

        //如果列已隐藏，则不渲染值
        if (typeof visibility === "object" && visibility) {
            let isHidden = false;
            if (visibility.type === "expression" && visibility.expression) {
                isHidden = _evaluator.evaluate(
                    visibility.expression,
                    { items: rowIndex },
                    {
                        ...row,
                        value: value
                    }
                );
            } else if (visibility.type === "hidden") {
                isHidden = true;
            }

            if (isHidden) {
                return null;
            }
        }
        //

        let nameFieldPath = "";
        if (extraProps.extraNameFieldKey) {
            nameFieldPath = path.replace(
                props.name,
                extraProps.extraNameFieldKey
            );

            if (row) {
                if (value !== null && value !== undefined) {
                    v = row[extraProps.extraNameFieldKey];
                } else {
                    v = "";
                }
            }
        }

        //表格中的单选、复选、开关，需要匹配出显示值
        let rowValue: any = null;
        let enumData: any = null;

        let isHidden = false;
        if (state) {
            isHidden = state.display !== "visible";
        }

        if (state && state.unmounted !== true) {
            rowValue = state.value;
            enumData = state.dataSource;
            if (nameFieldPath) {
                if (rowValue !== null && rowValue !== undefined) {
                    v = form.getFieldState(nameFieldPath)?.value;
                } else {
                    v = "";
                }
            } else {
                v = rowValue;
            }
        } else {
            //获取默认值时，必须排除隐藏字段
            if (isHidden) {
                value = "";
                v = "";
            }
            if (typeof value === "undefined") {
                let initialValue = extraProps.initialValue;
                if (initialValue && initialValue.type === "const") {
                    rowValue = transformCommaValuesToArray(initialValue.const);
                } else {
                    rowValue = value;
                }
            } else {
                rowValue = value;
            }
            enumData = props.enum;
        }

        if (enumData instanceof Array) {
            let labels: any = [];
            let labelMap: any = {};
            enumData.forEach(d => {
                if (
                    d.label !== null &&
                    d.value !== null &&
                    d.label !== undefined &&
                    d.value !== undefined
                ) {
                    labelMap[d.value] = d.label;
                }
            });

            if (rowValue instanceof Array) {
                rowValue.forEach(d => {
                    if (labelMap.hasOwnProperty(d)) {
                        labels.push(labelMap[d]);
                    }
                });
            } else {
                if (labelMap.hasOwnProperty(rowValue)) {
                    labels.push(labelMap[rowValue]);
                }
            }

            if (labels.length > 0) {
                v = labels.join(",");
            }
        } else if (ctype === "switch") {
            let labelMap = {
                true: componentProps.checkedChildren,
                false: componentProps.unCheckedChildren
            };
            v = labelMap[rowValue];
        } else if (ctype === "datepicker") {
            v = formatDateValue(
                rowValue,
                componentProps.format || "YYYY-MM-DD"
            );
        } else if (ctype === "monthpicker") {
            v = formatDateValue(rowValue, "YYYY-MM");
        }

        if (componentProps.fillZero) {
            let fillZeroValue = undefined;
            if (
                rowValue !== null &&
                rowValue !== undefined &&
                rowValue !== ""
            ) {
                let _rowValue = Number(rowValue);
                if (
                    !isNaN(_rowValue) &&
                    typeof componentProps.precision === "number"
                ) {
                    fillZeroValue = Number(_rowValue).toFixed(
                        componentProps.precision
                    );
                }

                if (typeof fillZeroValue !== "undefined") {
                    if (componentProps.commaSeparated === true) {
                        rowValue = fillZeroValue;
                    } else {
                        v = fillZeroValue;
                    }
                }
            }
        }

        if (
            ignoreNumberComma !== true &&
            componentProps.commaSeparated === true
        ) {
            v = formatNumberComma(rowValue);
        }

        if (extraProps.renderFormatter) {
            let _formatedValue = _evaluator.evaluate(
                extraProps.renderFormatter,
                { items: rowIndex },
                {
                    ...row,
                    value: rowValue
                }
            );

            if (typeof _formatedValue !== "undefined") {
                v = _formatedValue;
            }
        }
        //
    }
    return v;
};

const ColumnRenderField = ({
    form,
    props,
    path,
    rowIndex,
    row,
    value,
    _evaluator,
    columnKey,
    arrayField
}) => {
    let _path = path;

    if (
        typeof row.__LOADING__ === "object" &&
        row.__LOADING__ &&
        row.__LOADING__[columnKey] === true
    ) {
        return (
            <Skeleton
                active
                paragraph={{
                    rows: 1,
                    width: "100%",
                    style: { marginBottom: 0 }
                }}
                title={false}
            />
        );
    }

    let [_value, setValue]: [any, any] = useState(null);
    let [errors, setErrors]: [any, any] = useState([]);
    let [style, setStyles] = useState({});
    useEffect(() => {
        let state = form.getFieldState(_path);
        if (state) {
            let cprops = state.component?.[1] || {};

            let _style = cprops.style;
            if (_style) {
                setStyles(_style);
            }
        }

        let formattedValue = formatRenderValue({
            state,
            props,
            path,
            value,
            row,
            rowIndex,
            _evaluator,
            form
        });

        setValue(formattedValue);
        let timer = setTimeout(() => {
            let _errors = [];
            let _state = form.getFieldState(_path);
            let hasSelfErrors = false;
            let selfErrors = null;
            if (_state) {
                if (_state.display === "visible") {
                    let _selfErrors = _state.data?.selfErrors;
                    if (_selfErrors && _selfErrors instanceof Array) {
                        hasSelfErrors = true;
                        selfErrors = _selfErrors;
                    }
                }
            }
            if (hasSelfErrors) {
                _errors = [...selfErrors];
            } else {
                if (arrayField) {
                    let _childErrors = arrayField.data?.validateResult;
                    if (_childErrors instanceof Array) {
                        let childErrors = [];
                        _childErrors.forEach(d => {
                            if (d.path === _path) {
                                childErrors = childErrors.concat(d.messages);
                            }
                        });
                        _errors = _errors.concat(childErrors);
                    }
                }
            }

            setErrors(_errors);
        }, 0);

        return () => {
            clearTimeout(timer);
        };
    }, [value, arrayField?.data?.validateResult]);

    let textValue = _value;

    if (typeof _value === "object" && _value) {
        textValue = _value.toString();
    }

    if (errors.length > 0) {
        let errorsMsg = errors.join(";");
        return (
            <Tooltip title={errorsMsg}>
                <div className="table-cell-validate-error">
                    <label style={style} title={textValue}>
                        {textValue}
                    </label>
                </div>
            </Tooltip>
        );
    }

    return (
        <label style={style} title={textValue}>
            {textValue}
        </label>
    );
};

export const renderValue = (
    form,
    value,
    record,
    index,
    columnKey,
    schema,
    fieldActions,
    _evaluator,
    arrayField
) => {
    let componentProps = schema["x-component-props"] || {};
    let extraProps = componentProps["x-extra-props"] || {};
    let rowPath = arrayField.address.concat(index);
    let arrayPath = arrayField.path.toString();
    let editable: boolean = !arrayField.component[1]?.disabled;
    let row = clone(record);
    if (extraProps.isOperationColumn) {
        return renderOperationColumn(
            schema,
            index,
            row,
            arrayPath,
            rowPath,
            fieldActions,
            editable
        );
    } else if (extraProps.isRenderSchema === true) {
        return (
            <RecursionField
                schema={{
                    ...schema,
                    "x-component-props": {
                        ...componentProps,
                        disabled: false,
                        "x-runtime": {
                            isRenderSchema: true,
                            code: extraProps?.formItemCode,
                            arrayPath,
                            isTableCellField: true,
                            index,
                            row,
                            rowKey: row[KEY_FIELD],
                            value: value,
                            columnKey
                        }
                    },
                    isTableCellField: true,
                    noneWrapper: true
                }}
                basePath={rowPath}
                key={columnKey}
                name={columnKey}
            />
        );
    } else {
        return (
            <ColumnRenderField
                form={form}
                props={schema}
                path={rowPath.toString() + "." + columnKey}
                rowIndex={index}
                columnKey={columnKey}
                row={row}
                value={value}
                _evaluator={_evaluator}
                arrayField={arrayField}
            ></ColumnRenderField>
        );
    }
};

export const renderEditor = (
    value,
    record,
    index,
    { itemKey, props, arrayField }
) => {
    let basePath = arrayField.address.concat(index);
    let componentProps = props["x-component-props"] || {};
    //必须进行深拷贝，否则每次输入时都会导致整行渲染
    let row = clone(record);
    return (
        <RecursionField
            schema={{
                ...props,
                isTableCellField: true,
                "x-component-props": {
                    ...componentProps,
                    "x-runtime": {
                        isTableCellField: true,
                        arrayPath: arrayField.path.toString(),
                        index,
                        row: row,
                        rowKey: record[KEY_FIELD]
                    }
                }
            }}
            basePath={basePath}
            name={itemKey}
            key={itemKey}
        />
    );
};

const renderColumns = (
    items,
    form,
    fieldActions,
    field,
    isEditor,
    dataIndexStore,
    _evaluator,
    arrayIndexMap,
    options,
    parentKey = "",
    fixedOperationColumn = true
) => {
    let columns: any[] = [];
    let columnsProps = {};
    let _needResetHeaderCellWidth = false;
    3;
    let componentProps = field.component[1] || {};

    let operationColumns = [];
    let leftOperationColumns = [];
    let rightOperationColumns = [];

    items.mapProperties((props, key) => {
        let _componentProps = props["x-component-props"] || {};
        const itemExtraProps = _componentProps["x-extra-props"] || {};

        let isHidden = false;
        let isAlwaysHidden = false;
        let isHiddenWidth = false;

        //如果options已经控制了列不可见，则始终不可见
        if (options[key]?.visible === false) {
            isHidden = true;
            isHiddenWidth = true;
            //isAlwaysHidden = true;//经测试提出，options中的visible只控制视觉上的显示隐藏，不应隐藏数据
        } else {
            //计算列是否可见
            let visibility = itemExtraProps.columnVisibility;
            if (!isEditor && typeof visibility === "object" && visibility) {
                if (visibility.type === "hidden") {
                    isHidden = true;
                    isHiddenWidth = true;
                    //isAlwaysHidden = true;
                } else if (visibility.type === "expression") {
                    if (visibility.expression) {
                        let res = _evaluator.evaluate(visibility.expression);
                        if (res === true) {
                            isHidden = true;
                        }
                    }
                }
            }
        }

        if (
            typeof itemExtraProps.initialValue === "object" &&
            itemExtraProps.initialValue
        ) {
            if (columnsProps[key]) {
                columnsProps[key].initialValue = itemExtraProps.initialValue;
            } else {
                columnsProps[key] = {
                    initialValue: itemExtraProps.initialValue
                };
            }

            if (
                itemExtraProps.extraNameFieldKey ||
                itemExtraProps.extraIdFieldKey
            ) {
                mapSchemaItems(props, (_item, _key) => {
                    const _itemExtraProps =
                        _item["x-component-props"]?.["x-extra-props"] || {};

                    if (
                        typeof itemExtraProps.initialValue === "object" &&
                        itemExtraProps.initialValue
                    ) {
                        if (columnsProps[_key]) {
                            columnsProps[_key].initialValue =
                                _itemExtraProps.initialValue;
                        } else {
                            columnsProps[_key] = {
                                initialValue: _itemExtraProps.initialValue
                            };
                        }
                    }
                });
            }
        }

        if (isHidden) {
            if (columnsProps[key]) {
                columnsProps[key].visible = false;
            } else {
                columnsProps[key] = {
                    visible: false
                };
            }

            if (parentKey) {
                _needResetHeaderCellWidth = true;
            }
        }
        //

        //如果时操作列，则需要判断操作列内部按钮是否均为启用，否则需要隐藏操作列
        if (itemExtraProps.isOperationColumn === true) {
            if (options[key]?.visible === false) {
                isAlwaysHidden = true;
            } else if (options[key]?.disabled === true) {
                let itemIsValid = [];
                mapSchemaItems(props.items, (_item, _key) => {
                    let _o = options[_key];
                    if (_o) {
                        let bl = _o.visible !== false && _o.disabled !== true;
                        //临时处理，排除导出按钮
                        let _formItemCode =
                            _item["x-component-props"]?.["x-extra-props"]
                                ?.formItemCode;
                        if (_formItemCode === "Export") {
                            bl = true;
                        }
                        //
                        itemIsValid.push(bl);
                    }
                });
                if (
                    itemIsValid.length > 0 &&
                    itemIsValid.indexOf(true) === -1
                ) {
                    isAlwaysHidden = true;
                }
            }

            if (!isAlwaysHidden && !isEditor) {
                //如果模板中配置了操作列下的按钮始终隐藏
                //则不显示操作列
                let itemIsValid = [];
                mapSchemaItems(props.items, (_item, _key) => {
                    let bl = true;
                    let _extraProps =
                        _item["x-component-props"]?.["x-extra-props"];
                    if (_extraProps) {
                        if (
                            _extraProps.visibility &&
                            _extraProps.visibility.type === "hidden"
                        ) {
                            bl = false;
                        }
                        itemIsValid.push(bl);
                    }
                });
                if (
                    itemIsValid.length > 0 &&
                    itemIsValid.indexOf(true) === -1
                ) {
                    isAlwaysHidden = true;
                }
            }
        }
        //

        if (isAlwaysHidden === false) {
            let dataIndex = key;
            let itemKey = key;

            if (
                typeof dataIndexStore === "object" &&
                dataIndexStore &&
                dataIndexStore.hasOwnProperty(key)
            ) {
                dataIndex = dataIndexStore[key];
            }

            const itemLayoutProps = _componentProps["x-layout-props"] || {};
            let itemWidth = null;
            if (itemLayoutProps.width?.type === "const") {
                itemWidth = Number(itemLayoutProps.width?.const);
            }

            const itemProps: any = {};

            if (
                ["left", "center", "right"].indexOf(
                    itemLayoutProps.labelAlign
                ) > -1
            ) {
                itemProps.halign = itemLayoutProps.labelAlign;
            }

            if (
                ["left", "center", "right"].indexOf(itemLayoutProps.textAlign) >
                -1
            ) {
                itemProps.align = itemLayoutProps.textAlign;
            }

            if (["left", "right"].indexOf(itemLayoutProps.columnFixed) > -1) {
                itemProps.fixed = itemLayoutProps.columnFixed;
            }

            if (itemLayoutProps.columnFixed === "none") {
                itemProps.fixed = false;
            }

            itemProps.code = itemExtraProps.formItemCode;

            if (typeof itemWidth === "number" && !isNaN(itemWidth)) {
                itemProps.width = itemWidth;
            }

            if (itemExtraProps.isOperationColumn === true) {
                if (!itemProps.hasOwnProperty("width")) {
                    itemProps.width = 120;
                }
                if (!itemProps.hasOwnProperty("fixed")) {
                    itemProps.fixed = "right";
                }
                itemProps.isOperationColumn = true;
                itemProps.sortable = false;
                itemProps.dropMenu = false;
            }

            if (isHiddenWidth) {
                itemProps.width = 0;
            }

            const column = {
                title: props.title,
                ...itemProps,
                extra: { isHidden, parentKey },
                titleRender: ({ column }) => {
                    let title = column.title;
                    let title_element: any = null;
                    if (itemExtraProps.isOperationColumn) {
                        title_element = renderHeaderTools(
                            props,
                            isEditor,
                            field
                        );
                    } else {
                        if (typeof title === "function") {
                            title_element = title({ column });
                        } else {
                            title_element = title;
                        }

                        if (
                            props.required === true ||
                            column.required === true ||
                            options[itemKey]?.required === true
                        ) {
                            title_element = (
                                <>
                                    <span className="table-head-cell-tag-required"></span>
                                    {title_element}
                                </>
                            );
                        }
                    }

                    if (typeof componentProps.titleRender === "function") {
                        return componentProps.titleRender(
                            title_element,
                            props,
                            itemProps
                        );
                    }

                    return title_element;
                },
                onHeaderCell: cellProps => {
                    let cls = ["column_" + cellProps.key];
                    let extra = cellProps.extra;
                    if (extra?.isHidden) {
                        cls.push("tablex-table-column-hidden");
                    }
                    return {
                        className: cls.join(" "),
                        "data-parentkey": extra?.parentKey
                    };
                },
                onCell: (row, index, column, extra) => {
                    let cls = [
                        "column_" + column.columnKey,
                        "row-" + index + "-column-" + column.columnKey
                    ];
                    if (extra?.isHidden) {
                        cls.push("tablex-table-column-hidden");
                    }
                    return {
                        className: cls.join(" ")
                    };
                },
                key,
                dataIndex,
                renderText: (value, record, index) => {
                    return formatRenderValue({
                        state: null,
                        props,
                        path: field.address.toString(),
                        value,
                        row: record,
                        rowIndex: index,
                        _evaluator,
                        form,
                        ignoreNumberComma: true
                    });
                },
                render: (value, record, index) => {
                    return renderValue(
                        form,
                        value,
                        record,
                        arrayIndexMap[record[KEY_FIELD]],
                        itemKey,
                        props,
                        fieldActions,
                        _evaluator,
                        field
                    );
                },
                editor: (value, record) => {
                    return renderEditor(
                        value,
                        record,
                        arrayIndexMap[record[KEY_FIELD]],
                        {
                            props,
                            itemKey,
                            arrayField: field
                        }
                    );
                }
            };

            if (itemExtraProps.isOperationColumn) {
                column.editor = null;
            }

            if (typeof componentProps.resizable === "boolean") {
                column.resizable = componentProps.resizable;
            }

            if (itemExtraProps.isOperationColumn) {
                if (column.fixed === "left") {
                    leftOperationColumns.push(column);
                    operationColumns.push(column);
                } else if (column.fixed === "right") {
                    rightOperationColumns.push(column);
                    operationColumns.push(column);
                } else {
                    columns.push(column);
                }
                if (fixedOperationColumn === false) {
                    column.fixed = false;
                }
            } else {
                if (props.items) {
                    let { columns: childrens, needResetHeaderCellWidth } =
                        renderColumns(
                            props.items,
                            form,
                            fieldActions,
                            field,
                            isEditor,
                            dataIndexStore,
                            _evaluator,
                            arrayIndexMap,
                            options,
                            itemKey
                        );
                    if (childrens instanceof Array && childrens.length > 0) {
                        column.children = childrens;
                    }

                    if (_needResetHeaderCellWidth === false) {
                        _needResetHeaderCellWidth = needResetHeaderCellWidth;
                    }
                }
                columns.push(column);
            }
        }
    });

    return {
        columns: [
            ...leftOperationColumns,
            ...columns,
            ...rightOperationColumns
        ],
        columnsProps,
        fixedOperationColumns: operationColumns,
        needResetHeaderCellWidth: true
    };
};

export const useArrayTableColumns = (
    fieldActions: any,
    field: Field,
    form: Form,
    schema: ISchema,
    dataIndexStore: any,
    _evaluator: any,
    arrayIndexMap: any,
    fixedOperationColumn?: boolean
): {
    columns: TableProps<any>["columns"];
    columnsProps: any;
    needResetHeaderCellWidth: boolean;
    fixedOperationColumns: TableProps<any>["columns"];
} => {
    let _fixedOperationColumn = true;
    if (typeof fixedOperationColumn === "boolean") {
        _fixedOperationColumn = fixedOperationColumn;
    } else {
        if (isResponsiveSizeSmall(form)) {
            _fixedOperationColumn = false;
        }
    }

    let isEditor = false;
    isEditor = form.getValuesIn("__DATA__.__isEditor");
    let _props: any = form.props;
    let options = _props.context?.options || {};
    return renderColumns(
        schema.items,
        form,
        fieldActions,
        field,
        isEditor,
        dataIndexStore,
        _evaluator,
        arrayIndexMap,
        options,
        "",
        _fixedOperationColumn
    );
};
function createRowData() {
    let item = {};
    return item;
}

function getColumnInitialValue({
    column,
    index,
    _evaluator,
    instance,
    ignoreAsync
}) {
    let initialValue = column.initialValue;

    let expressionVar = { items: index };
    let _initialValue = undefined;

    if (typeof initialValue === "object" && initialValue) {
        _initialValue = getValue(
            initialValue,
            instance,
            expressionVar,
            _evaluator,
            ignoreAsync
        );
    }

    return _initialValue;
}

//给表格设置值时，需要执行默认值表达式，避免字段丢失默认值
function getEmptyRow({
    row,
    index,
    dataIndexStore,
    columnsProps,
    _evaluator,
    instance,
    callback = null,
    ignoreAsync,
    nullAsDefault = false
}) {
    let defaultValues = {};
    let _row = {};
    let columnLoading = {};

    if (typeof row === "object" && row) {
        for (const k in row) {
            let v = row[k];
            if (nullAsDefault) {
                if (v !== null && v !== undefined) {
                    _row[k] = v;
                }
            } else {
                _row[k] = v;
            }
        }

        //setValue如果对dataIndex赋值
        //则自动给对应的字段id赋值,dataIndex值优先
        let dataIndexField = {};
        if (typeof dataIndexStore === "object" && dataIndexStore) {
            Reflect.ownKeys(dataIndexStore).forEach(k => {
                let v = dataIndexStore[k];
                dataIndexField[v] = k;
            });
        }
        if (Reflect.ownKeys(dataIndexField).length > 0) {
            for (const k in row) {
                let v = row[k];
                let columnKey = dataIndexField[k];
                if (columnKey && columnKey !== k) {
                    if (nullAsDefault) {
                        if (v !== null && v !== undefined) {
                            _row[columnKey] = v;
                        }
                    } else {
                        _row[columnKey] = v;
                    }
                }
            }
        }
        //
    }

    //f3bfe10dfd70947e8b7b36fbee926f9e5
    if (typeof columnsProps === "object" && columnsProps) {
        Object.keys(columnsProps).forEach(k => {
            let column = columnsProps[k];
            let initialValue = getColumnInitialValue({
                column,
                index,
                _evaluator,
                instance,
                ignoreAsync
            });
            if (typeof initialValue !== "undefined") {
                if (initialValue?.constructor?.name === "Promise") {
                    callback(initialValue);
                } else {
                    defaultValues[k] = initialValue;
                }
            }
            let _initialValue = column.initialValue;
            if (
                ignoreAsync &&
                _initialValue?.type === "api" &&
                _initialValue?.api
            ) {
                columnLoading[k] = true;
            }
        });
    }

    let item = { ...defaultValues, ..._row };
    if (Object.keys(columnLoading).length > 0) {
        item["__LOADING__"] = columnLoading;
    }

    return item;
}

export const useFieldActions = ({
    field,
    schema,
    wrapperRef,
    stateStoredRef,
    dataIndexStore,
    form,
    tableRef,
    evaluator
}) => {
    const toggleColumnVisibility = function (columnKey, bl) {
        let wrapper = wrapperRef.current;
        if (columnKey && wrapper) {
            let isHidden = false;

            if (bl === true) {
                isHidden = true;
            } else {
                isHidden = false;
            }

            let columnClass = "column_" + columnKey;

            let headCellElements = wrapper.querySelectorAll(
                ".tablex-table-head-cell." + columnClass
            );

            let rowCellElements = wrapper.querySelectorAll(
                ".tablex-table-row-cell." + columnClass
            );

            for (let i = 0; i < headCellElements.length; i++) {
                const element = headCellElements[i];
                if (isHidden) {
                    element.classList.add("tablex-table-column-hidden");
                } else {
                    element.classList.remove("tablex-table-column-hidden");
                }
            }

            for (let i = 0; i < rowCellElements.length; i++) {
                const element = rowCellElements[i];
                if (isHidden) {
                    element.classList.add("tablex-table-column-hidden");
                } else {
                    element.classList.remove("tablex-table-column-hidden");
                }
            }
        }
        resetHeaderCellWidth(wrapperRef);
    };

    const mapItems = function (callback) {
        return mapSchemaItems(schema.items, callback);
    };

    return {
        getInstance: () => {
            return tableRef.current;
        },
        mapItems,
        toggleColumnVisibility,
        isEditing: (key = "") => {
            let editingKeys = field.componentProps.editKeys || [];
            if (key) {
                return editingKeys.indexOf(key) > -1;
            } else {
                return editingKeys.length > 0;
            }
        },
        completeEdit: () => {
            let editingKeys = field.componentProps.editKeys || [];
            if (editingKeys.length > 0) {
                //需验证完成后才能关闭编辑状态，否则会导致不显示验证错误提示
                field.setState(s => {
                    s.componentProps.editKeys = [];
                    if (s.componentProps.temporary_virtual === false) {
                        s.componentProps.temporary_virtual = true;
                    }
                });
                //触发onInput以响应联动
                let arr = clone(field.getState().value);
                field.onInput(arr);
            }
        },
        editRow: (index: number, rowKey = "") => {
            if (index > -1) {
                let k = field.getState().value[index]?.[KEY_FIELD];
                if (k) {
                    field.setState(s => {
                        s.componentProps.editKeys = [k];
                    });
                }
            } else if (rowKey) {
                field.setState(s => {
                    s.componentProps.editKeys = [rowKey];
                });
            }
        },
        deleteSelected: (index: number) => {
            let deleted: any[] = [];
            let deletedIndex = [];
            let arr = clone(field.value);
            let next = [];
            if (index > -1) {
                for (let i = 0; i < arr.length; i++) {
                    if (i == index) {
                        deleted.push(arr[i]);
                        deletedIndex.push(i);
                    } else {
                        next.push(arr[i]);
                    }
                }
            } else {
                let selections = stateStoredRef.current.selections || {};
                if (Object.keys(selections).length > 0) {
                    arr.forEach((d, i) => {
                        if (
                            selections.hasOwnProperty(i) &&
                            selections[i] === true
                        ) {
                            deleted.push(d);
                            deletedIndex.push(i);
                        } else {
                            next.push(d);
                        }
                    });
                    stateStoredRef.current.selections = {};
                } else {
                    message.warning("请选择需要删除的数据");
                }
            }

            if (deleted.length > 0) {
                for (let i = deletedIndex.length - 1; i >= 0; i--) {
                    let index = deletedIndex[i];
                    //field.remove(index);
                }
                //需要使用onInput更新表格数据，
                //使用remove会导致表格父级容器隐藏时,删除第一行数据暂存，再显示出容器时，
                //表格数据未清空，并且数据中丢失掉隐藏字段默认值
                field.onInput(next);
                //删除数据时重新验证表格数据，以刷新validateResult中的数据
                field.validate();
                form.notify("onListItemDelete", {
                    data: deleted,
                    key: field.path.toString()
                });
            }
        },
        cloneRow: debounce((index: number) => {
            if (index > -1) {
                let arr = field.value.slice();
                let row = arr[index];
                if (row) {
                    let o = { ...row };
                    delete o.Id;
                    delete o[KEY_FIELD];
                    delete o.value;
                    delete o.__PARENT__;
                    delete o.children;
                    field.push(o);
                }
            }
        }, 100),
        moveDown: index => {
            let _index = Number(index);
            if (index !== null && !isNaN(_index)) {
                field.moveDown(_index);
            }
        },
        moveUp: index => {
            let _index = Number(index);
            if (index !== null && !isNaN(_index)) {
                field.moveUp(_index);
            }
        },
        insertData: debounce(() => {
            let o = createRowData();
            o[KEY_FIELD] = new Date().getTime();
            field.push(o);
            field.setState(s => {
                s.componentProps.editKeys = [o[KEY_FIELD]];
            });
            stateStoredRef.current.isAdding = true;
        }, 100),
        getSelections: () => {
            //通过选中的行索引获取真实的行数据
            let rowsIndex = stateStoredRef.current.selections;
            let rows = [];
            if (Object.keys(rowsIndex).length > 0) {
                let _values = field.getState().value || [];
                _values.forEach((d, i) => {
                    if (rowsIndex.hasOwnProperty(i) && rowsIndex[i] === true) {
                        rows.push(d);
                    }
                });
            }
            return rows;
        },
        setData: (arr, callback, nullAsDefault = false) => {
            let data = [];
            if (arr instanceof Array) {
                let _dataIndexStore = dataIndexStore;
                //如果不进行reset,表格中存在下拉类控件时，且正处于编辑状态中时，会有如下bug：
                //setValue时会导致无法正确设置值，需要setValue两次，第一次完成编辑，第二次才设置到值
                //field.reset({ forceClear: true, validate: true });
                //reset会导致多次setData时，如果值较多会造成状态更新报错，故改用设置editKeys
                //bug fixed : 如果不进行editKeys置空,表格中存在下拉类控件时，setValue时会导致无法正确设置值，需要setValue两次，第一次完成编辑，第二次才设置到值
                field.setState(s => {
                    s.componentProps.editKeys = [];
                });
                //
                let fieldPath = field.path.toString();
                let promiseAll = [];
                arr.forEach((d, i) => {
                    if (typeof d === "object" && d) {
                        data.push(
                            getEmptyRow({
                                row: d,
                                index: i,
                                dataIndexStore: _dataIndexStore,
                                columnsProps: null,
                                _evaluator: evaluator,
                                instance: form,
                                ignoreAsync: true,
                                nullAsDefault
                            })
                        );
                    }
                });

                //始终初始值
                field.onInput(data);

                //设置联动值,如果存在联动值需要再次触发onInput，因为第一次无法拿到联动表单项的数据
                //场景：表格数据导入，某个字段值来自当前行数据并进行公式计算得出
                data = [];
                arr.forEach((d, i) => {
                    if (typeof d === "object" && d) {
                        data.push(
                            getEmptyRow({
                                row: d,
                                index: i,
                                dataIndexStore: _dataIndexStore,
                                columnsProps:
                                    stateStoredRef.current.columnsProps,
                                _evaluator: evaluator,
                                instance: form,
                                ignoreAsync: true,
                                nullAsDefault
                            })
                        );
                    }
                });
                field.onInput(data);
                //

                //设置异步值
                data = [];
                arr.forEach((d, i) => {
                    if (typeof d === "object" && d) {
                        data.push(
                            getEmptyRow({
                                row: d,
                                index: i,
                                dataIndexStore: _dataIndexStore,
                                columnsProps:
                                    stateStoredRef.current.columnsProps,
                                _evaluator: evaluator,
                                instance: form,
                                ignoreAsync: false,
                                nullAsDefault,
                                callback: task => {
                                    promiseAll.push(task);
                                }
                            })
                        );
                    }
                });

                if (data.length > 0 && promiseAll.length > 0) {
                    Promise.all(promiseAll).then(resArr => {
                        let arr = [];
                        let itemsMap = {};
                        if (resArr instanceof Array) {
                            resArr.forEach(d => {
                                for (const k in d) {
                                    let v = d[k];
                                    if (k.indexOf(fieldPath + ".") > -1) {
                                        let { index, key } = getItemIndex(k);
                                        if (index && key) {
                                            if (itemsMap[index]) {
                                                itemsMap[index][key] = v;
                                            } else {
                                                itemsMap[index] = {
                                                    [key]: v
                                                };
                                            }
                                        }
                                    }
                                }
                            });
                        }

                        data.forEach((d, i) => {
                            let _d = { ...d };
                            let item = itemsMap[i];
                            if (item) {
                                _d = {
                                    ...item,
                                    ...d
                                };
                            }
                            arr.push(_d);
                        });

                        field.onInput(arr);

                        if (typeof callback === "function") {
                            callback(arr, fieldPath);
                        }
                    });
                } else {
                    if (typeof callback === "function") {
                        callback(data, fieldPath);
                    }
                }
            }
        }
    };
};

export function getDataIndexStore(field) {
    let dataIndexStore = {};

    let extraProps: any = field.componentProps["x-extra-props"];
    //根据数据源中的绑定表单项设置表格的dataIndex
    if (extraProps.dataSource) {
        let dataSource: any = null;
        try {
            dataSource = JSON.parse(extraProps.dataSource);
        } catch (error) {}

        if (dataSource.data) {
            if (dataSource.type === "api") {
                if (
                    dataSource.data.api &&
                    dataSource.data.api.output instanceof Array
                ) {
                    dataSource.data.api.output.forEach(d => {
                        let fp = d.targetField;
                        let fk = "";
                        if (fp) {
                            fk = fp.split(".items.")[1];
                            if (fk) {
                                dataIndexStore[fk] = d.field;
                            }
                        }
                    });
                }
            } else if (dataSource.type === "const") {
                if (dataSource.data.fields instanceof Array) {
                    dataSource.data.fields.forEach(d => {
                        let fp = d.targetField;
                        let fk = "";
                        if (fp) {
                            fk = fp.split(".items.")[1];
                            if (fk) {
                                dataIndexStore[fk] = d.field;
                            }
                        }
                    });
                }
            }
        }
    }
    //
    return dataIndexStore;
}

export function useEvaluator(form, dataIndexStore) {
    //表格非编辑模式时的公式计算
    return new Evaluator({
        functions: {
            value: k => {
                let v = null;
                if (k) {
                    let {
                        index,
                        parentKey: listKey,
                        key: columnKey
                    } = getItemIndex(k);
                    let fieldKey = columnKey;
                    if (
                        typeof dataIndexStore === "object" &&
                        dataIndexStore &&
                        dataIndexStore.hasOwnProperty(columnKey)
                    ) {
                        fieldKey = dataIndexStore[columnKey];
                    }

                    if (index > -1) {
                        let values = form.getValuesIn(listKey) || [];
                        v = values[index]?.[fieldKey];
                    } else {
                        if (listKey) {
                            v = form.getValuesIn(listKey);
                            if (v instanceof Array) {
                                v = v.map(d => {
                                    return d[fieldKey];
                                });
                            }
                            if (typeof v === "undefined") {
                                v = [];
                            }
                        } else {
                            v = form.getValuesIn(k);
                        }
                    }
                }
                return v;
            }
        }
    });
}

function tryParseNumber(v) {
    let nv = Number(v);

    if (isNaN(nv)) {
        return v;
    }

    return nv;
}

export let summaryMath = {
    max: (items, key) => {
        let r =
            maxBy(items, function (o) {
                return tryParseNumber(o[key]);
            }) || {};

        return r[key];
    },
    min: (items, key) => {
        let r =
            minBy(items, function (o) {
                return tryParseNumber(o[key]);
            }) || {};

        return r[key];
    },
    average: (items, key) => {
        let sum = MathAdd.apply(
            null,
            items.map(o => o[key])
        );
        if (sum === undefined) {
            return "";
        } else {
            return MathDivide(sum, items.length);
        }
    },
    avg: (items, key) => {
        let sum = MathAdd.apply(
            null,
            items.map(o => o[key])
        );
        if (sum === undefined) {
            return "";
        } else {
            return MathDivide(sum, items.length);
        }
    },
    sum: (items, key) => {
        let r = MathAdd.apply(
            null,
            items.map(o => o[key])
        );
        return r;
    }
};

export function useSummary(
    field: ArrayField,
    dataIndexStore,
    _evaluator,
    columnsProps
) {
    let extraProps = field.componentProps["x-extra-props"];
    //数据汇总配置
    let summary = null;
    if (extraProps && extraProps.summary) {
        let _summary = extraProps.summary;

        if (_summary.enabled) {
            let _arr = _summary.data;
            if (_arr instanceof Array && _arr.length > 0) {
                let exprMap = {};
                let itemKeyMap = {};
                let obj = {};
                _arr.forEach(d => {
                    let _key = d.field;

                    if (_key) {
                        let temp = _key.split(".items.");
                        _key = temp[temp.length - 1];
                    }

                    if (
                        typeof dataIndexStore === "object" &&
                        dataIndexStore &&
                        dataIndexStore.hasOwnProperty(_key)
                    ) {
                        _key = dataIndexStore[_key];
                    }

                    obj[_key] = d.type;
                    exprMap[_key] = d.expression;
                    itemKeyMap[_key] = d.field;
                });

                let _titleWidth = undefined;
                if (typeof _summary.width === "number") {
                    _titleWidth = _summary.width;
                } else {
                    let len = _summary.title?.length;
                    if (len > 0) {
                        _titleWidth = len * 14 + 10;
                    }
                    if (_titleWidth < 60) {
                        _titleWidth = 60;
                    }
                }

                summary = {
                    title: {
                        column: "__ordernumber_column",
                        text: _summary.title
                    },
                    titleWidth: _titleWidth,
                    custom: true,
                    rowHeight: 30,
                    data: [obj],
                    onCell: (row, index, column) => {
                        let cls = [
                            "tablex-table-row-cell",
                            "column_" + column.columnKey
                        ];
                        let isHidden =
                            columnsProps?.[column.columnKey]?.visible === false;
                        if (isHidden) {
                            cls.push("tablex-table-column-hidden");
                        }
                        return {
                            className: cls.join(" ")
                        };
                    },
                    render: (value, k, type) => {
                        let expr = exprMap[k];
                        let fn = summaryMath[type];
                        let summaryValue = null;
                        if (typeof fn === "function") {
                            let flatData = field.getState().value || [];
                            let _itemKey = itemKeyMap[k];
                            let _itemDataIndex = k;
                            //编辑模式时，列表数据key为id，非编辑模式时为dataIndex
                            //如果修改过值，则将dataIndex对应的值进行同步
                            flatData.forEach(d => {
                                if (d.hasOwnProperty(_itemKey)) {
                                    d[_itemDataIndex] = d[_itemKey];
                                }
                            });
                            //
                            summaryValue = fn(flatData, k);
                            if (
                                isNaN(summaryValue) ||
                                typeof summaryValue === "undefined"
                            ) {
                                summaryValue = "";
                            }
                        }
                        if (expr) {
                            let res = _evaluator.evaluate(
                                expr,
                                {},
                                { value: summaryValue }
                            );
                            return res;
                        } else {
                            return summaryValue;
                        }
                    }
                };
            }
        }
    }

    return summary;
    //
}

export function transformToFlatData(treeData = [], removeChildren = false) {
    let treeList = treeData || [];

    //末级节点
    let leafs = [];
    //根
    let roots = [];
    //所有节点
    let list = [];

    for (let i = 0; i < treeList.length; i++) {
        const d = treeList[i];

        const childrens = d.children || [];

        list.push(d);
        roots.push(d);

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

            list.push(d);

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

    return { list, leafs, roots };
}

export function transformToTreeData(
    flatData = [],
    idField,
    pidField,
    rootKey = ""
) {
    function getKey(node) {
        return node[idField] || "";
    }

    function getParentKey(node) {
        return node[pidField] || "";
    }

    if (!flatData) {
        return [];
    }

    const childrenToParents = {};
    flatData.forEach(child => {
        const parentKey = getParentKey(child);

        if (parentKey in childrenToParents) {
            childrenToParents[parentKey].push(child);
        } else {
            childrenToParents[parentKey] = [child];
        }
    });

    if (!(rootKey in childrenToParents)) {
        return [];
    }

    const trav = parent => {
        const parentKey = getKey(parent);
        if (parentKey in childrenToParents) {
            parent.children = childrenToParents[parentKey].map(child =>
                trav(child)
            );
        }

        return parent;
    };

    return childrenToParents[rootKey].map(child => trav(child));
}

export const getSelectable = (extraProps, data, _evaluator) => {
    let arr = data || [];

    if (arr.length <= 0) {
        return [];
    }

    let selectable = extraProps?.itemSelectable;

    let selectableMap = {};

    if (selectable && typeof selectable === "object") {
        if (selectable.type === "expression" && selectable.expression) {
            let expr = selectable.expression;
            arr.forEach((d, i) => {
                let v = d[KEY_FIELD];
                let row = { ...d };
                //将当前行数据作为运行时变量传入公式计算
                let res = _evaluator.evaluate(
                    expr,
                    {
                        items: i
                    },
                    row
                );
                //返回值为true，则不可选择
                if (res === true) {
                    selectableMap[v] = false;
                }
            });
        } else if (selectable.type === "disableParent") {
            arr.forEach(d => {
                let v = d[KEY_FIELD];
                if (!d.__LEAF__) {
                    selectableMap[v] = false;
                }
            });
        }
    }

    return Object.keys(selectableMap);
};

export function resetHeaderCellWidth(wrapperRef) {
    let el: Element = wrapperRef.current;
    if (el) {
        let headers = el.getElementsByClassName("tablex-table-head");
        for (let i = 0; i < headers.length; i++) {
            const headEl = headers[i];
            const rows = headEl.getElementsByClassName("tablex-head-row");

            //先设置多级表头的占位列隐藏样式名
            for (let j = 0; j < rows.length; j++) {
                let row = rows[j];
                let cells = row.getElementsByClassName(
                    "tablex-table-head-cell-placeholder"
                );

                for (let k = 0; k < cells.length; k++) {
                    let cell = cells[k] as HTMLElement;
                    let ck = cell.dataset.columnkey;
                    if (ck) {
                        let c = el.getElementsByClassName("column_" + ck)[0];
                        if (c) {
                            let isHidden = c.classList.contains(
                                "tablex-table-column-hidden"
                            );
                            if (isHidden) {
                                cell.classList.add(
                                    "tablex-table-column-hidden"
                                );
                            } else {
                                cell.classList.remove(
                                    "tablex-table-column-hidden"
                                );
                            }
                        }
                    }
                }
            }
            //

            for (let j = rows.length - 1; j >= 0; j--) {
                let row = rows[j];
                let cells = row.getElementsByClassName(
                    "tablex-table-head-cell"
                );
                for (let k = 0; k < cells.length; k++) {
                    const cell = cells[k] as HTMLElement;
                    const isHidden = cell.classList.contains(
                        "tablex-table-column-hidden"
                    );

                    let parentKey = cell.dataset.parentkey;
                    if (parentKey) {
                        let cellWidth = parseInt(cell.style.width);
                        if (!isNaN(cellWidth)) {
                            let parentCell = headEl.getElementsByClassName(
                                "column_" + parentKey
                            )[0] as HTMLElement;

                            if (parentCell) {
                                let parentCellWidth = parseInt(
                                    parentCell.style.width
                                );

                                if (!isNaN(parentCellWidth)) {
                                    if (isHidden) {
                                        if (
                                            parentCell.classList.contains(
                                                "hasCalculated"
                                            ) === false
                                        ) {
                                            parentCell.classList.add(
                                                "hasCalculated"
                                            );
                                            parentCell.style.maxWidth =
                                                parentCellWidth -
                                                cellWidth +
                                                "px";
                                        }
                                    } else {
                                        parentCell.classList.remove(
                                            "hasCalculated"
                                        );
                                        parentCell.style.maxWidth = "initial";
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

export function OperationColumnTrigger({ form, onClick, operationColumns }) {
    if (!isResponsiveSizeSmall(form)) {
        return null;
    }

    if (operationColumns instanceof Array && operationColumns.length > 0) {
    } else {
        return null;
    }

    return (
        <span
            style={{
                position: "absolute",
                right: 1,
                top: 2,
                zIndex: 2,
                color: "#9c9fb2",
                cursor: "pointer",
                height: 30,
                width: 14,
                backgroundColor: "#ffffff",
                padding: "5px 0 0 0",
                lineHeight: "normal",
                textAlign: "center"
            }}
            onClick={onClick}
        >
            <Icon
                type="dash"
                style={{
                    transform: "rotate(90deg)"
                }}
            ></Icon>
        </span>
    );
}
