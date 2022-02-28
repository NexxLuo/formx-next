import React from "react";
import { registry } from "@nvwa/formx-renderer";
import { createBehavior, createResource } from "@designable/core";
import { createVoidFieldSchema, createFieldSchema } from "./Field";

export interface IDesignableTextProps {
  value?: string;
  content?: string;
  mode?: "normal" | "h1" | "h2" | "h3" | "p";
  style?: React.CSSProperties;
  className?: string;
}

type RegisteredComponentOptions = {
  group: string;
  title: string;
  attribute?: Array<{
    title: string;
    name: string;
    type:
      | "bool"
      | "string"
      | "text"
      | "number"
      | "enum"
      | "function"
      | "radio"
      | "range"
      | "formItem"
      | "custom";
    props?: {
      [key: string]: any;
    };
    defaultValue?: any;
  }>;
  defaultPropsValue?: {
    [key: string]: any;
  };
};

const createComponentPropsSchema = (props: RegisteredComponentOptions) => {
  let properties = {};
  let hasProperties = false;
  let attribute = props?.attribute ?? [];
  let propertiesLocales = {};

  if (attribute.length > 0) {
    attribute.forEach(d => {
      let name = d.name;
      properties[name] = {
        type: "string",
        "x-decorator": "FormItem",
        "x-component": "Input"
      };
      hasProperties = true;

      propertiesLocales[name] = d.title;
    });
  }

  let schema = null;
  let locales = null;
  if (hasProperties) {
    schema = {
      type: "object",
      properties
    };

    locales = {
      "zh-CN": {
        title: props.title,
        settings: {
          "x-component-props": {
            attribute: propertiesLocales
          }
        }
      }
    };
  }
  return {
    schema,
    locales
  };
};

export const getRegistryComponents = () => {
  let items = registry.getRegistry().fields;

  let components = {};

  Reflect.ownKeys(items).map((k: string) => {
    let item = items[k];
    let props: RegisteredComponentOptions = item.options || {};
    let type = item.type;

    let component = item.component;

    let propsSchema = null;

    let { schema: attributeSchema, locales } =
      createComponentPropsSchema(props);

    if (type === "virtual") {
      propsSchema = createVoidFieldSchema(null, {
        attribute: attributeSchema
      });
    } else {
      propsSchema = createFieldSchema(null, {
        attribute: attributeSchema
      });
    }

    component.Behavior = createBehavior({
      name: k,
      extends: ["Field"],
      selector: node => node.props["x-component"] === k,
      designerProps: {
        propsSchema: propsSchema
      },
      designerLocales: locales
    });

    component.Resource = createResource({
      icon: "TextSource",
      elements: [
        {
          componentName: "Field",
          props: {
            type: "string",
            "x-component": k,
            "x-decorator": "FormItem"
          }
        }
      ]
    });

    components[k] = component;
  });

  return components;
};
