import React from "react";
import { TreeSelect as FormTreeSelect } from "@nvwa/formx-antd";
import { createBehavior, createResource } from "@designable/core";
import { DnFC } from "@nvwa/designable-react";
import { createFieldSchema } from "../Field";
import { AllSchemas } from "../../schemas";
import { AllLocales } from "../../locales";

export const TreeSelect: DnFC<React.ComponentProps<typeof FormTreeSelect>> =
  FormTreeSelect;

TreeSelect.Behavior = createBehavior({
  name: "TreeSelect",
  extends: ["Field"],
  selector: node => node.props["x-component"] === "TreeSelect",
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.TreeSelect)
  },
  designerLocales: AllLocales.TreeSelect
});

TreeSelect.Resource = createResource({
  icon: "TreeSelectSource",
  elements: [
    {
      componentName: "Field",
      props: {
        title: "TreeSelect",
        "x-decorator": "FormItem",
        "x-component": "TreeSelect"
      }
    }
  ]
});
