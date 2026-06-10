import React, { Fragment } from "react";
import { createBehavior, createResource, TreeNode } from "@designable/core";
import { DnFC, useTreeNode, TreeNodeWidget } from "@platform/designable-react";
import { createVoidFieldSchema } from "../Field";
import { AllSchemas } from "../../schemas";
import { AllLocales } from "../../locales";
import { Row, Button } from "antd";
import { withLayoutPane, withLayoutPaneContent } from "../shared";
import "./style.css";

const renderFooter = (node: TreeNode) => {
  const footerNode = node.find(
    el => el.props["x-component"] === "Modal.Footer"
  );

  if (footerNode) {
    return footerNode.children.map(item => {
      return <TreeNodeWidget key={item.id} node={item}></TreeNodeWidget>;
    });
  }

  return null;
};

export const Modal: DnFC<React.ComponentProps<any>> & {
  Footer?: React.FC<React.ComponentProps<any>>;
} = withLayoutPane(props => {
  const { title, displayTitle, className, ...nextProps } = props;
  const node = useTreeNode();

  return (
    <div
      className="designer-modal"
      data-designer-node-id={props["data-designer-node-id"]}
    >
      <div className="designer-modal-header">
        <div className="title" data-content-editable="title">
          {props.title}
        </div>
        <Button type="link" icon="close" size="large" />
      </div>
      <div className="designer-modal-content">
        {withLayoutPaneContent(props.children)}
      </div>
      <div className="designer-modal-footer">
        {renderFooter(node)}
        <span className="modal-footer-tip">可向此处拖入按钮表单项</span>
      </div>
    </div>
  );
});

Modal.Footer = props => {
  return <Fragment>{props.children}</Fragment>;
};

Modal.Behavior = createBehavior(
  {
    name: "Modal",
    extends: ["Field"],
    selector: node => node.props["x-component"] === "Modal",
    designerProps: {
      droppable: true,
      allowDrop: target => {
        return target.componentName === "Form";
      },
      propsSchema: createVoidFieldSchema(AllSchemas.Modal)
    },
    designerLocales: AllLocales.Modal
  },
  {
    name: "Modal.Footer",
    extends: ["Field"],
    selector: node => node.props["x-component"] === "Modal.Footer",
    designerProps: {
      droppable: true,
      allowDrop: node => {
        return node.parent?.props?.["x-component"] === "Modal";
      },
      propsSchema: createVoidFieldSchema(AllSchemas.ModalFooter)
    },
    designerLocales: AllLocales.ModalFooter
  }
);

Modal.Resource = createResource({
  icon: "ObjectSource",
  elements: [
    {
      componentName: "Field",
      props: {
        type: "void",
        title: "弹窗",
        // 'x-decorator': 'FormItem',
        "x-component": "Modal",
        "x-component-props": {
          title: "弹窗",
          "x-extra-props": {
            isGroup: true,
            name: "Modal",
            title: "弹窗"
          },
          "x-layout-props": {
            autoRow: true,
            columns: 3,
            full: true,
            grid: true,
            labelLayout: "horizontal",
            labelWidth: 120,
            span: 1
          }
        }
      },
      children: [
        {
          componentName: "Field",
          props: {
            type: "array",
            "x-component": "Modal.Footer",
            "x-component-props": {
              "x-extra-props": {
                isTableColumn: true
              }
            },
            title: "footer"
          },

          children: [
            {
              componentName: "Field",
              props: {
                type: "object"
              },
              children: [
                {
                  componentName: "Field",
                  props: {
                    type: "string",
                    "x-component": "Button",
                    "x-component-props": {
                      title: "取消",
                      "x-extra-props": {
                        isTableColumn: true
                      }
                    },
                    title: "取消"
                  }
                },
                {
                  componentName: "Field",
                  props: {
                    type: "string",
                    "x-component": "Button",
                    "x-component-props": {
                      title: "确定",
                      "x-extra-props": {
                        isTableColumn: true
                      }
                    },
                    title: "确定"
                  }
                }
              ]
            }
          ]
        },
        {
          componentName: "Field",
          props: {
            type: "string",
            "x-component": "Button",
            "x-component-props": {
              title: "按钮",
              "x-extra-props": {
                isTableColumn: true
              }
            },
            title: "按钮"
          }
        }
      ]
    }
  ]
});
