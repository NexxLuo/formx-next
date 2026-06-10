import { ISchema } from "@formily/json-schema";
import { AllSchemas } from "../../schemas";

type SchemaType = {
  component?: ISchema;
  layout?: ISchema;
  extra?: ISchema;
  attribute?: ISchema;
};

export const createComponentSchema = (
  _component,
  { component, layout, extra, attribute }: SchemaType
) => {
  return {
    "component-group": component && {
      type: "void",
      "x-component": "CollapseItem",
      "x-reactions": {
        fulfill: {
          state: {
            visible: '{{!!$form.values["x-component"]}}'
          }
        }
      },
      properties: {
        "x-component-props": { ..._component, ...component }
      }
    },
    "layout-group": layout && {
      type: "void",
      "x-component": "CollapseItem",
      "x-component-props": {
        defaultExpand: false
      },
      properties: {
        "x-component-props.x-layout-props": layout
      }
    },
    "extra-group": extra && {
      type: "void",
      "x-component": "CollapseItem",
      "x-component-props": {
        defaultExpand: false
      },
      properties: {
        "x-component-props.x-extra-props": extra
      }
    },
    "attribute-group": attribute && {
      type: "void",
      "x-component": "CollapseItem",
      "x-component-props": {
        defaultExpand: false
      },
      properties: {
        "x-component-props.attribute": attribute
      }
    }
  };
};

export const createFieldSchema = (
  component?: ISchema,
  others?: SchemaType
): ISchema => {
  return {
    type: "object",
    properties: {
      "field-group": {
        type: "void",
        "x-component": "CollapseItem",
        properties: {
          title: {
            type: "string",
            "x-decorator": "FormItem",
            "x-component": "Input"
          },
          description: {
            type: "string",
            "x-decorator": "FormItem",
            "x-component": "Input.TextArea"
          },
          required: {
            type: "boolean",
            "x-decorator": "FormItem",
            "x-component": "Switch"
          }
        }
      },
      ...createComponentSchema(component, {
        component: AllSchemas.ItemComponentProps,
        layout: AllSchemas.ItemLayout,
        extra: AllSchemas.ItemExtra,
        ...others
      })
    }
  };
};

export const createVoidFieldSchema = (
  component?: ISchema,
  others?: SchemaType
) => {
  return {
    type: "object",
    properties: {
      "field-group": {
        type: "void",
        "x-component": "CollapseItem",
        properties: {
          title: {
            type: "string",
            "x-decorator": "FormItem",
            "x-component": "Input"
          }
        }
      },
      ...createComponentSchema(component, {
        component: AllSchemas.ItemComponentProps,
        layout: AllSchemas.ItemLayout,
        extra: AllSchemas.ItemExtra,
        ...others
      })
    }
  };
};
