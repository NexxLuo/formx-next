import React from "react";
import {
    RecursionField,
    useForm,
    useField,
    useFieldSchema,
    connect,
    mapProps
} from "@formily/react";
import {
    FormPath,
    GeneralField,
    IFieldState,
    IGeneralFieldState
} from "@formily/core";
import { getParentPath } from "../core/utils";
import { getRegistry } from "./registry";

const CustomWrapper = props => {
    return <div {...props}>{props.children}</div>;
};

function createCustomField(component, cls: string) {
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

        if (cls) {
            return React.createElement(
                CustomWrapper,
                { className: cls },
                React.createElement(component, componentProps),
                extraItems
            );
        }

        return React.createElement(
            React.Fragment,
            {},
            React.createElement(component, componentProps),
            extraItems
        );
    };
}

export const getRegistryComponents = () => {
    let fields = getRegistry().fields;

    let components = {};

    for (const k in fields) {
        let item = fields[k];

        let cls =
            {
                virtualField: "formx-item-virtual-field",
                virtualBlock: "formx-form-pane"
            }[item.originalType] || "";

        let Cmp = connect(
            createCustomField(item.original, cls),
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

        components[k] = Cmp;
    }
    return components;
};
