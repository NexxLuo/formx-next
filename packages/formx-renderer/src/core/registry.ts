import { FunctionComponent } from "react";
import { isFn, isPlainObj } from "@formily/shared";

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

export const cleanRegistry = () => {
    registry.fields = {};
};

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

        if (type === "virtualField") {
            registry.fields[name] = {
                name: name,
                options,
                original: component,
                type: "virtual"
            };
        } else if (type === "virtualBlock") {
            registry.fields[name] = {
                name: name,
                options,
                type: "virtual",
                original: component
            };
        } else {
            registry.fields[name] = {
                name: name,
                options,
                type,
                original: component
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
