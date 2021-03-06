import React from "react";
import { Select as FormSelect } from "@platform/formx-antd";
import { createBehavior, createResource } from "@designable/core";
import { DnFC } from "@platform/designable-react";
import { createFieldSchema } from "../Field";
import { AllSchemas } from "../../schemas";
import { AllLocales } from "../../locales";

export const Select: DnFC<React.ComponentProps<typeof FormSelect>> = FormSelect;

Select.Behavior = createBehavior({
  name: "Select",
  extends: ["Field"],
  selector: node => node.props["x-component"] === "Select",
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.Select)
  },
  designerLocales: AllLocales.Select
});

Select.Resource = createResource({
  icon: "SelectSource",
  elements: [
    {
      componentName: "Field",
      props: {
        title: "Select",
        "x-decorator": "FormItem",
        "x-component": "Select"
      }
    }
  ]
});
