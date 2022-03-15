import React, { Fragment, useEffect } from "react";
import {
    connect,
    mapReadPretty,
    mapProps,
    useField,
    useFieldSchema,
    RecursionField
} from "@formily/react";
import { TreeSelect as AntdTreeSelect } from "antd";
import { PreviewText } from "../../../";
import { LoadingOutlined } from "../../../icons";
import {
    formatNamedValueWhenChange,
    formatNamedValue,
    triggerOnChangeWhenDataLoaded
} from "../../shared/utils";
import { Field } from "@formily/core/esm/models";
import { Evaluator } from "@platform/formx-renderer/lib/core/expression";

const getNodePath = (list, key, paths = [], titles = []) => {
    let node = list?.[key];

    if (node) {
        paths.unshift(node.value);
        titles.unshift(node.label);
        let parent = list[node.parent];
        if (parent) {
            getNodePath(list, parent.value, paths, titles);
        }
    }

    return {
        paths,
        titles
    };
};

const transformTreeData = arr => {
    let data = [];

    let listMap = {};

    const childrenToParents = {};

    arr.forEach(d => {
        listMap[d.value] = d;

        const parentKey = d.parent;

        if (parentKey) {
            if (parentKey in childrenToParents) {
                childrenToParents[parentKey].push(d);
            } else {
                childrenToParents[parentKey] = [d];
            }
        }
    });

    data = arr.map(item => {
        let d = { ...item };

        //parent为空或者parent不在当前数据中，则为根级
        if (!d.parent || !listMap.hasOwnProperty(d.parent)) {
            d.parent = "";
        }

        d.title = d.label;

        //是否存在子级
        let childrens = childrenToParents[d.value] || [];
        if (childrens.length <= 0) {
            d.__LEAF__ = true;
        }

        return d;
    });

    return { data, list: listMap };
};

const formatSelectable = (itemSelectable, data, form) => {
    if (data.length <= 0) {
        return {};
    }

    let selectable = itemSelectable;

    if (selectable && typeof selectable === "object") {
        if (selectable.type === "expression" && selectable.expression) {
            let expr = selectable.expression;

            let _evaluator = new Evaluator({
                functions: {
                    value: k => {
                        let v = null;
                        if (k) {
                            v = form.getFieldState(k)?.value;
                        }
                        return v;
                    }
                }
            });

            data.forEach(d => {
                let obj = { ...d };

                //将当前行数据作为运行时变量传入公式计算
                let res = _evaluator.evaluate(expr, {}, obj);

                //返回值为true，则不可选择
                if (res === true) {
                    d.disabled = true;
                }
            });
        } else if (selectable.type === "disableParent") {
            data.forEach(d => {
                if (!d.__LEAF__) {
                    d.disabled = true;
                }
            });
        }
    }
};

export const TreeSelect:React.FC<any> = connect(
    _props => {
        let { showLabelStrategy, listMap, ...props } = _props;
        let field: Field = useField();
        let schema = useFieldSchema();
        let v = props.value;
        if (typeof v === "number") {
            v = v + "";
        }

        let arr = props.treeData;

        function getExtraData(value, extra) {
            let extraData: any = null;
            if (typeof value === "object" && value) {
                if (value instanceof Array) {
                    extraData = [];
                    extra?.allCheckedNodes?.forEach(d => {
                        let item = d.node?.props;
                        let o: any = null;
                        if (item) {
                            o = { ...item };
                            if (o) {
                                delete o.children;
                                extraData.push(o);
                            }
                        }
                    });
                } else {
                    if (value) {
                        extraData = arr.find(d => d.value === value.value);
                    }
                }
            } else {
                if (value) {
                    extraData = arr.find(d => d.value === value);
                }
            }

            return extraData;
        }

        function onChangeValue(value, label, extraData) {
            let formated: any = {};
            if (value instanceof Array) {
                let _value = [];
                //多选时，可显示父级label
                if (showLabelStrategy) {
                    value.forEach(d => {
                        let { titles } = getNodePath(listMap, d.value);
                        let _label = titles.join("-");
                        _value.push({
                            value: d.value,
                            label: _label
                        });
                    });
                } else {
                    _value = value;
                }
                formated = formatNamedValueWhenChange(_value, label, "value");
            } else {
                let _value = value?.value;
                let _label = value?.label;
                //单选时，可显示父级label
                if (showLabelStrategy) {
                    let { titles } = getNodePath(listMap, _value);
                    _label = titles.join("-");
                }
                formated = formatNamedValueWhenChange(_value, _label);
            }
            props.onChange(formated.value, formated.label, extraData);
        }

        function onChange(value, label, extra) {
            if (value) {
                let extraData = getExtraData(value, extra);
                onChangeValue(value, label, extraData);
            } else {
                onChangeValue("", "", null);
            }
        }

        let parentPath = field.address.parent().toString();

        let objectValue = formatNamedValue(
            v,
            field.inputValues,
            props.treeCheckable === true
        );

        useEffect(() => {
            triggerOnChangeWhenDataLoaded(
                objectValue,
                props.treeData,
                (value, label, extra) => {
                    if (value instanceof Array) {
                        onChangeValue(value, null, extra);
                    } else {
                        onChangeValue({ value, label }, null, extra);
                    }
                }
            );
        }, [props.sourceData]);

        return (
            <Fragment>
                <AntdTreeSelect
                    {...props}
                    onChange={onChange}
                    labelInValue={true}
                    value={objectValue}
                ></AntdTreeSelect>
                {schema.mapProperties((item, key) => {
                    return (
                        <RecursionField
                            key={key}
                            basePath={[parentPath]}
                            schema={item}
                            name={key}
                            onlyRenderProperties
                        />
                    );
                })}
            </Fragment>
        );
    },
    mapProps(
        {
            dataSource: "treeData"
        },
        (props, field) => {
            let resetProps: any = {};
            props.readOnly && (resetProps.open = false);

            let extraProps = props["x-extra-props"] || {};

            if (extraProps.selectMode === "multiple") {
                resetProps.treeCheckable = true;
            }

            let treeData = [];
            let listMap = {};
            let _treeData = props.treeData || [];
            if (_treeData instanceof Array) {
                let { data, list } = transformTreeData(_treeData);
                treeData = data;
                listMap = list;
            } else {
                console.error(
                    "Invalid prop type of `dataSource`:",
                    _treeData,
                    field.path
                );
            }

            formatSelectable(extraProps.itemSelectable, treeData, field.form);

            let dropdownStyle: any = {
                maxHeight: 400
            };
            let bl = props.dropdownMatchSelectWidth;
            if (typeof bl === "boolean") {
                bl = bl;
            } else {
                bl = true;
            }

            if (bl === false) {
                //dropdownMatchSelectWidth为undefined时，最小宽度为选择器宽度，且会被自动撑宽
                bl = undefined;
            }

            return {
                treeCheckStrictly: true,
                ...props,
                ...resetProps,
                treeDataSimpleMode: { id: "value", pId: "parent", rootPId: "" },
                dropdownStyle: dropdownStyle,
                dropdownMatchSelectWidth: bl,
                treeNodeFilterProp: "title",
                treeData: treeData,
                listMap: listMap,
                sourceData: props.treeData,
                allowClear: true,
                suffixIcon:
                    field?.["loading"] || field?.["validating"] ? (
                        <LoadingOutlined />
                    ) : (
                        props.suffixIcon
                    )
            };
        }
    ),
    mapReadPretty(PreviewText.TreeSelect)
);

export default TreeSelect;
