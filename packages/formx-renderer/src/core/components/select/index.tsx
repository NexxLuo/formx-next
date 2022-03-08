import React, { Fragment, useEffect } from "react";
import {
    connect,
    mapReadPretty,
    mapProps,
    useField,
    useFieldSchema,
    RecursionField
} from "@formily/react";
import { Select as AntdSelect } from "antd";
import { PreviewText } from "@nvwa/formx-antd";
import { LoadingOutlined } from "@nvwa/formx-antd/lib/icons";

import {
    formatNamedValueWhenChange,
    formatNamedValue,
    triggerOnChangeWhenDataLoaded
} from "../../utils";
import { Field } from "@formily/core/esm/models";
import { Evaluator } from "../../expression";

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
        }
    }
};

export const Select = connect(
    _props => {
        let field: Field = useField();
        let schema = useFieldSchema();
        let { options = [], autoSelectFirst, ...props } = _props;

        function getExtraData(value, extra) {
            let extraData: any = null;
            if (typeof value === "object") {
                if (value instanceof Array) {
                    extraData = [];

                    extra.forEach(d => {
                        let item = d.props?.extra;
                        let o = null;
                        if (item) {
                            o = { ...item };
                            extraData.push(o);
                        }
                    });
                } else {
                    if (extra && extra.props) {
                        extraData = extra.props.extra;
                    }
                }
            }
            return extraData;
        }

        function onChangeValue(value, label, extraData) {
            let formated = formatNamedValueWhenChange(value, label);
            _props.onChange(formated.value, formated.label, extraData);
        }

        function onChange(value, extra) {
            if (value) {
                let extraData = getExtraData(value, extra);
                onChangeValue(value, extra?.props?.children, extraData);
            } else {
                onChangeValue("", "", null);
            }
        }

        let v = props.value;
        if (typeof v === "number") {
            v = v + "";
        }

        let extraProps = props["x-extra-props"] || {};
        let fieldProps: any = {};

        if (extraProps.selectMode === "multiple") {
            fieldProps.mode = "multiple";
        }

        let parentPath = field.address.parent().toString();
        let objectValue = formatNamedValue(
            v,
            field.inputValues,
            extraProps.selectMode === "multiple"
        );

        useEffect(() => {
            let bl = false;
            let allowOverwriteValue = extraProps.allowOverwriteValue === true;
            let allowSetValue = false;
            if (allowOverwriteValue) {
                allowSetValue = true;
            } else {
                allowSetValue = !v;
            }

            if (autoSelectFirst && allowSetValue && !props.disabled) {
                if (options.length === 1) {
                    let first = options[0];
                    if (first && first.value && !first.disabled) {
                        bl = true;
                        onChangeValue(first.value, first.label, first);
                    }
                }
            }

            if (!bl) {
                triggerOnChangeWhenDataLoaded(
                    objectValue,
                    options,
                    onChangeValue
                );
            }
        }, [options]);
        return (
            <Fragment>
                <AntdSelect
                    {...props}
                    {...fieldProps}
                    labelInValue={true}
                    value={objectValue}
                    onChange={onChange}
                    optionFilterProp="children"
                >
                    {options.map(d => {
                        return (
                            <AntdSelect.Option
                                key={d.value}
                                value={d.value}
                                label={d.label}
                                disabled={d.disabled}
                                extra={d}
                            >
                                {d.label}
                            </AntdSelect.Option>
                        );
                    })}
                </AntdSelect>
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
            dataSource: "options",
            loading: true
        },
        (props, field) => {
            let resetProps: any = {};
            props.readOnly && (resetProps.open = false);

            let extraProps = props["x-extra-props"] || {};

            let data = [];
            let _data = props.options || [];
            if (_data instanceof Array) {
                data = _data;
            } else {
                console.error(
                    "Invalid prop type of `dataSource`:",
                    _data,
                    field.path
                );
            }

            formatSelectable(extraProps.itemSelectable, data, field.form);

            let dropdownStyle: any = {
                maxHeight: 400
            };
            let bl = props.dropdownMatchSelectWidth;
            if (typeof bl === "boolean") {
                bl = bl;
            } else {
                bl = true;
            }

            return {
                ...props,
                ...resetProps,
                options: data,
                allowClear: true,
                dropdownStyle,
                dropdownMatchSelectWidth: bl,
                suffixIcon:
                    field?.["loading"] || field?.["validating"] ? (
                        <LoadingOutlined />
                    ) : (
                        props.suffixIcon
                    )
            };
        }
    ),
    mapReadPretty(PreviewText.Select)
);

export default Select;
