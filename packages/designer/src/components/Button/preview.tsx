import React from "react";
import { createBehavior, createResource } from "@designable/core";
import { DnFC } from "@nvwa/designable-react";
import { createFieldSchema } from "../Field";
import { AllSchemas } from "../../schemas";
import { AllLocales } from "../../locales";
import { Button as AntdButton } from "antd";
import { withLayoutField } from "../shared";
export const Button: DnFC<React.ComponentProps<typeof AntdButton>> =
  withLayoutField(props => {
    const { iconOnly, displayTitle = true, ...restProps } = props;
    return (
      <AntdButton {...restProps}>
        {iconOnly || !displayTitle ? null : (
          <div
            style={{
              display: "inline-block"
            }}
            data-content-editable="title"
          >
            {props.title}
          </div>
        )}
      </AntdButton>
    );
  });

Button.Behavior = createBehavior({
  name: "Button",
  extends: ["Field"],
  selector: node => node.props["x-component"] === "Button",
  designerProps: {
    droppable: true,
    propsSchema: createFieldSchema(AllSchemas.Button)
  },
  designerLocales: AllLocales.Button
});

Button.Resource = createResource({
  icon: "ButtonSource",
  elements: [
    {
      componentName: "Field",
      props: {
        type: "void",
        title: "Button",
        "x-component": "Button",
        "x-component-props": {
          title: "Button",
          name: "Button",
          "x-extra-props": {
            name: "Button"
          },
          "x-layout-props": {}
        }
      }
    }
  ]
});
