import React, { FunctionComponent } from "react";
import { isFn, isPlainObj } from "@formily/shared";
import { FormPath } from "@formily/shared";
import { getParentPath } from "../core/utils";
import {
    RecursionField,
    useForm,
    useField,
    useFieldSchema,
    connect,
    mapProps
} from "@formily/react";
import { Schema } from "@formily/react";
import { withLayoutField, withLayoutPane } from "./components/shared";
import { GeneralField, IFieldState, IGeneralFieldState } from "@formily/core";

const registry = {
    fields: {},
    templates: {}
};

const log = {
    warn: (str: string) => {
        console.warn(str);
    }
};

const lowercase = (str: string) => {
    return str.toLowerCase();
};

export const getRegistry = () => {
    return {
        fields: registry.fields
    };
};

function copyProps(item, name) {
    if (item[name]) {
        if (item["x-component-props"]) {
            item["x-component-props"][name] = Object.assign({}, item[name]);
        } else {
            item["x-component-props"] = {
                [name]: Object.assign({}, item[name])
            };
        }
    }
}

export const getRegistryComponents = () => {
    let fields = registry.fields;
    let components = {};
    let registedVoid: string[] = [];
    for (const k in fields) {
        let name = k;//.toLowerCase();
        if (fields[k].type === "virtual") {
            registedVoid.push(name);
        }
        components[name] = fields[k].component;
    }

    return components;

    Schema.registerPatches(schema => {
        let ctype: string = schema["x-component"];

        if (ctype) {
            ctype = ctype.toLowerCase();
            schema["x-component"] = ctype;
            if (registedVoid.indexOf(ctype.toLowerCase()) > -1) {
                schema.type = "void";
            } else {
                if (["arraytable"].indexOf(ctype.toLowerCase()) > -1) {
                    schema.type = "array";
                    schema["x-decorator"] = "formitem";
                    schema["x-decorator-props"] = {
                        displayLabel: false,
                        className: "ant-formily-item-table"
                    };
                } else if (
                    [
                        "label",
                        "card",
                        "fieldset",
                        "tab",
                        "tabpane",
                        "modal",
                        "grid",
                        "image",
                        "divider"
                    ].indexOf(ctype.toLowerCase()) > -1
                ) {
                    schema.type = "void";
                } else if (["button"].indexOf(ctype.toLowerCase()) > -1) {
                    schema.type = "void";
                } else {
                    schema["x-decorator"] = "formitem";
                }
            }
        }
        copyProps(schema, "x-layout-props");
        copyProps(schema, "x-extra-props");
        copyProps(schema, "x-prepose-event");

        if ("visible" in schema) {
            schema["x-visible"] = schema["visible"];
        }

        if ("display" in schema) {
            schema["x-hidden"] = !schema["display"];
        }

        return schema;
    });
    return components;
};

export const cleanRegistry = () => {
    registry.fields = {};
};

function createCustomField(component) {
    return (props: any) => {
        let field: GeneralField = useField();
        let schema = useFieldSchema();
        let form = useForm();
        let formState: any = form.getFormState();
        let fieldState: IGeneralFieldState = field.getState();

        let componentProps = {
            ...props,
            id: field.path.toString(),
            path: field.address.toString(),
            attribute: props.attribute || {},
            form: formState.formActions,
            isEditor: formState.values.__DATA__?.__isEditor === true,
            state: fieldState
        };
        let extraProps = props["x-extra-props"] || {};

        let extraNameFieldKey = extraProps.extraNameFieldKey;

        let extraItems: any = null;
        //如果需要配置额外的label字段，则需要额外生成表单项
        if (extraNameFieldKey) {
            let parentPath = getParentPath(field.address.toString());
            if (typeof schema?.mapProperties === "function") {
                extraItems = schema.mapProperties((item, key) => {
                    const idPath = FormPath.parse(parentPath);
                    return React.createElement(RecursionField, {
                        key: key,
                        basePath: idPath.toString(),
                        name: key,
                        schema: item
                    });
                });
            }
        }

        return React.createElement(
            React.Fragment,
            {},
            React.createElement(component, componentProps),
            extraItems
        );
    };
}

export function registerField(
    name: string,
    component: FunctionComponent,
    options: Object,
    type: any = ""
) {
    if (name && isFn(component)) {
        name = lowercase(name);
        if (registry.fields[name]) {
            log.warn("Component name duplicate. Please change the name.");
            return;
        }

        let Cmp = connect(
            createCustomField(component),
            mapProps((props, field: IFieldState & GeneralField) => {
                //以下属性都应该响应组件render，否则可能导致业务组件动态设置状态后无法触发渲染
                return {
                    ...props,
                    disabled: field.disabled || props.disabled,
                    readOnly: field.readOnly || props.readOnly,
                    loading: field.loading || props.loading,
                    value: field.value,
                    values: field.inputValues
                };
            })
        );

        if (type === "virtualField") {
            registry.fields[name] = {
                name: name,
                options,
                original: component,
                type: "virtual",
                component: withLayoutField(Cmp)
            };
        } else if (type === "virtualBlock") {
            registry.fields[name] = {
                name: name,
                options,
                type: "virtual",
                original: component,
                component: withLayoutPane(Cmp)
            };
        } else {
            registry.fields[name] = {
                name: name,
                options,
                type,
                original: component,
                component: Cmp
            };
        }
    }
}

export const getFormFields = () => {
    let items: any[] = [];

    let reg = registry.fields;

    for (const k in reg) {
        let item = reg[k];
        items.push({
            name: item.name,
            type: item.type,
            options: item.options
        });
    }

    return items;
};

export function registerVirtualField(
    name: string,
    component: FunctionComponent,
    options: Object
) {
    registerField(name, component, options, "virtualField");
}

export function registerVirtualBlock(
    name: string,
    component: FunctionComponent,
    options: Object
) {
    registerField(name, component, options, "virtualBlock");
}

export function registerTemplate(
    name: string,
    schema: Object,
    options: Object
) {
    if (name && isPlainObj(schema)) {
        name = lowercase(name);
        if (registry.templates[name]) {
            log.warn("Template name duplicate. Please change the name.");
            return;
        }
        registry.templates[name] = {
            name: name,
            schema: schema,
            options
        };
    }
}

export const getTemplates = () => {
    let items: any[] = [];

    let reg = registry.templates;

    for (const k in reg) {
        let item = reg[k];
        items.push({
            name: item.name,
            schema: item.schema,
            options: item.options
        });
    }

    return items;
};
