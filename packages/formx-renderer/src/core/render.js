import React, { useMemo, useState, useEffect, useRef } from "react";
import { createSchemaField, Schema } from "@formily/react";
import {
    createForm,
    createEffectHook,
    onFormInit,
    onFormMount,
    onFieldReact,
    onFieldInit,
    onFieldMount,
    onFieldChange,
    onFieldValueChange,
    onFieldInputValueChange,
    onFieldValidateEnd
} from "@formily/core";
import {
    Form,
    Checkbox,
    DatePicker,
    TimePicker,
    Upload,
    Switch,
    Transfer,
    FormItem
} from "@nvwa/formx-antd";
import {
    FieldSet,
    Grid,
    Card,
    Tab,
    Label,
    Button,
    AutoComplete,
    ArrayTable,
    Modal,
    Input,
    NumberPicker,
    Select,
    TreeSelect,
    Image,
    Radio,
    Divider
} from "./components";

import { withLayoutPane } from "./components/shared";

import "antd/dist/antd.css";
import "./style.css";
import { getRegistryComponents } from "./registry";

let eachSchema = (schema, fn) => {
    if (schema) {
        if (schema.properties) {
            for (const key in schema.properties) {
                let _schema = schema.properties[key];
                if (typeof fn === "function") {
                    fn(_schema, key);
                }
                eachSchema(_schema, fn);
            }
        }

        if (schema.items) {
            eachSchema(schema.items, (_schema, key) => {
                if (typeof fn === "function") {
                    fn(_schema, key);
                }
                eachSchema(_schema, fn);
            });
        }
    }
};

function getComponents() {
    let registryComponents = getRegistryComponents();
    return {
        ...registryComponents,
        FormItem: withLayoutPane(FormItem),
        Select,
        TreeSelect,
        ArrayTable,
        Input,
        Radio: Radio,
        Checkbox: Checkbox,
        TextArea: Input.TextArea,
        NumberPicker: NumberPicker,
        Search: Input.Search,
        AutoComplete: AutoComplete,
        Switch: Switch,
        DatePicker: DatePicker,
        DateRangePicker: DatePicker.RangePicker,
        YearPicker: DatePicker.YearPicker,
        MonthPicker: DatePicker.MonthPicker,
        WeekPicker: DatePicker.WeekPicker,
        TimePicker: TimePicker,
        TimeRangePicker: TimePicker.RangePicker,
        Upload: Upload,
        Transfer: Transfer,
        Tab: Tab,
        FormTab: Tab,
        TabPane: Tab.TabPane,
        FieldSet: FieldSet,
        Grid: Grid,
        Card: Card,
        Label: Label,
        Text: Label,
        Button: Button,
        Modal: Modal,
        Image: Image,
        Divider: Divider
    };
}

const $selector = () => {
    return (type, path = "*", watches) => {
        return {
            subscribe: listener => {
                let fn = {
                    onFieldInit,
                    onFieldMount,
                    onFieldChange,
                    onFieldValueChange,
                    onFieldInputValueChange,
                    onFieldReact,
                    onFieldValidateEnd
                }[type];
                if (typeof fn === "function") {
                    if (type === "onFieldChange") {
                        fn(path, watches, listener);
                    } else {
                        fn(path, listener);
                    }
                } else {
                    const customFn = createEffectHook(
                        type,
                        (payload, form) => _listener => {
                            _listener(payload, form);
                        }
                    );
                    customFn(listener);
                }
            }
        };
    };
};

const FormRender = ({
    children,
    effects,
    context = {},
    getContext,
    setContext,
    initialValues,
    schema,
    disabled = false,
    readOnly = false,
    onInit,
    onMount
}) => {
    const [current, setCurrent] = useState(schema);
    const contextRef = useRef(context);
    contextRef.current = context;
    const _form = useMemo(() => {
        return createForm({
            initialValues: initialValues,
            disabled,
            readOnly,
            context: context,
            getContext,
            setContext,
            effects(_form) {
                //用到formSchemaMap的地方必须要使用Schema创建的对象，以使用Schema对象中的特定属性
                let _formSchema = new Schema(current);
                let formSchemaMap = {};
                eachSchema(_formSchema, (_schema, key) => {
                    formSchemaMap[key] = _schema;
                });

                const _consumer = () => {
                    return {
                        formSchema: _formSchema,
                        formSchemaMap,
                        ...contextRef.current
                    };
                };

                onFormInit(form => {
                    onInit(form, $selector(), _consumer);
                });
                onFormMount(form => {
                    onMount(form, $selector(), _consumer);
                });
                if (typeof effects === "function") {
                    effects($selector(), _form, _consumer);
                }
            }
        });
    }, [current]);

    let SchemaField = useMemo(() => {
        return createSchemaField({
            components: getComponents(),
            scope: {}
        });
    }, [current]);

    useEffect(() => {
        setCurrent(schema);
    }, [schema]);

    return (
        <Form form={_form} labelCol={6} wrapperCol={12} className="formx-form">
            <SchemaField size="small" schema={current} basePath={[""]}>
                {children}
            </SchemaField>
        </Form>
    );
};

export default FormRender;
