import React, { useMemo, useState, useEffect, useRef } from "react";
import { createSchemaField, Schema, FormProvider } from "@formily/react";
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
import { getRegistryComponents } from "./getRegistryComponents";
import "./validator/rule"

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

function getComponents(components) {
    let registryComponents = getRegistryComponents();
    return {
        ...registryComponents,
        ...components
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
    onMount,
    components,
    form
}) => {
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
                let _formSchema = new Schema(schema);
                let formSchemaMap = {};
                eachSchema(_formSchema, (_schema, key) => {
                    formSchemaMap[key] = _schema;
                });

                let _consumerData = {
                    formSchema: _formSchema,
                    formSchemaMap,
                    formGraphMap: {},
                    ...contextRef.current
                }

                const _consumer = () => {
                    return _consumerData;
                };

                onFormInit(form => {
                    onInit(form, $selector(), _consumer);
                });
                onFormMount(form => {
                    _consumerData.formGraphMap = form.getFormGraph();
                    onMount(form, $selector(), _consumer);
                });
                if (typeof effects === "function") {
                    effects($selector(), _form, _consumer);
                }
            }
        });
    }, [schema]);

    let SchemaField = useMemo(() => {
        return createSchemaField({
            components: getComponents(components),
            scope: {}
        });
    }, [schema]);

    let FormComponent = form;
    console.log("SchemaFieldRender")
    return (
        <FormProvider form={_form}>
            <FormComponent className="formx-form">
                <SchemaField size="small" schema={schema} basePath={[""]}>
                    {children}
                </SchemaField>
            </FormComponent>
        </FormProvider>
    );
};

export default FormRender;
