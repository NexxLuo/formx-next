import React, { useMemo } from "react";
import { createBehavior, createResource } from "@designable/core";
import { createForm } from "@formily/core";
import { observer } from "@formily/react";
import { Form as FormxForm } from "@platform/formx-antd";
import { usePrefix, DnFC } from "@platform/designable-react";
import { AllSchemas } from "../../schemas";
import { AllLocales } from "../../locales";
import "./styles.less";

export const Form: DnFC<React.ComponentProps<typeof FormxForm>> = observer(
  (props: any) => {
    const prefix = usePrefix("designable-form");
    const form = useMemo(
      () =>
        createForm({
          designable: true
        }),
      []
    );
    return (
      <FormxForm
        {...props}
        style={{ ...props.style }}
        className={prefix}
        form={form}
      >
        {props.children}
      </FormxForm>
    );
  }
);

Form.Behavior = createBehavior({
  name: "Form",
  selector: node => node.componentName === "Form",
  designerProps(node) {
    return {
      draggable: !node.isRoot,
      cloneable: !node.isRoot,
      deletable: !node.isRoot,
      droppable: true,
      propsSchema: AllSchemas.Form,
      defaultProps: {
        labelCol: 6,
        wrapperCol: 12
      }
    };
  },
  designerLocales: AllLocales.Form
});

Form.Resource = createResource({
  title: { "zh-CN": "表单", "en-US": "Form" },
  icon: "FormLayoutSource",
  elements: [
    {
      componentName: "Field",
      props: {
        type: "object",
        "x-component": "Form"
      }
    }
  ]
});
