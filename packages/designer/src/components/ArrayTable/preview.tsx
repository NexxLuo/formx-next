import React, { Children } from "react";
//@ts-ignore
import { Table } from "tablex";
import { TableProps } from "antd/lib/table/interface";
import { TreeNode, createBehavior, createResource } from "@designable/core";
import {
  useTreeNode,
  DroppableWidget,
  useNodeIdProps,
  DnFC,
  TreeNodeWidget
} from "@nvwa/designable-react";
import { observer } from "@formily/react";
import { LoadTemplate } from "../../common/LoadTemplate";
import cls from "classnames";
import { createEnsureTypeItemsNode } from "../../shared";
import { createArrayBehavior } from "../ArrayBase";
import "./styles.less";
import { createVoidFieldSchema } from "../Field";
import { AllSchemas } from "../../schemas";
import { AllLocales } from "../../locales";

const ensureObjectItemsNode = createEnsureTypeItemsNode("object");

const createTableColumns = (node: TreeNode) => {
  let columns = [];
  let items = node.children || [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    let props = item.props;

    let extraProps = props?.["x-component-props"]?.["x-extra-props"];
    let isColumn = props.type !== "object";

    let isOperationColumn = extraProps?.isOperationColumn === true;

    if (isOperationColumn) {
      let operationNode = item.children?.[0]?.children || [];
      let column: any = {
        title: "操作列",
        key: item.id,
        dataIndex: item.id,
        resizable: false,
        sortable: false,
        dropMenu: false,
        titleRender: ({ column }) => {
          return (
            <div
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                left: 0,
                top: 0
              }}
              data-designer-node-id={column.key}
              data-content-editable="title"
            >
              {operationNode.map(d => {
                let el = d.clone();
                el.props.noneWrapper = true;
                return <TreeNodeWidget key={el.id} node={el} />;
              })}
            </div>
          );
        }
      };

      columns.push(column);
    } else {
      let column: any = {
        title: props.title,
        key: item.id,
        dataIndex: item.id,
        resizable: false,
        sortable: false,
        dropMenu: false,
        titleRender: ({ column }) => {
          return (
            <div
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                left: 0,
                top: 0
              }}
              data-designer-node-id={column.key}
              data-content-editable="title"
            >
              {column.title ?? null}
            </div>
          );
        }
      };
      if (isColumn) {
        let children = item.children;
        if (children instanceof Array && children.length > 0) {
          column.children = createTableColumns(item);
        }
        columns.push(column);
      } else {
        let children = item.children;
        let _children = [];
        if (children instanceof Array && children.length > 0) {
          _children = createTableColumns(item);
        }

        columns = columns.concat(_children);
      }
    }
  }
  return columns;
};

export const ArrayTable: DnFC<TableProps<any>> = observer((props: any) => {
  const node = useTreeNode();
  const nodeId = useNodeIdProps();
  const columns = createTableColumns(node);

  const renderTable = () => {
    if (node.children.length === 0) return <DroppableWidget />;
    return (
      <div style={{ height: 200 }}>
        <Table
          size="small"
          bordered
          {...props}
          columns={columns}
          className={cls("ant-formily-array-table", props.className)}
          style={{ marginBottom: 10, ...props.style }}
          rowKey="rowKey"
          dataSource={[]}
          pagination={false}
        ></Table>
      </div>
    );
  };

  return (
    <div {...nodeId} className="dn-array-table">
      {renderTable()}
      <LoadTemplate
        actions={[
          {
            title: node.getMessage("addColumn"),
            icon: "AddColumn",
            onClick: () => {
              const tableColumn = new TreeNode({
                componentName: "Field",
                props: {
                  type: "string",
                  "x-component": "Input",
                  title: `Title`,
                  "x-component-props": {
                    "x-extra-props": {
                      isTableColumn: true
                    }
                  }
                }
              });
              ensureObjectItemsNode(node).append(tableColumn);
            }
          },
          {
            title: node.getMessage("addOperation"),
            icon: "AddOperation",
            onClick: () => {
              const operationNode = new TreeNode({
                componentName: "Field",
                props: {
                  type: "array",
                  "x-component-props": {
                    "x-extra-props": {
                      isTableColumn: true,
                      isOperationColumn: true
                    }
                  }
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
                          type: "void",
                          "x-component": "Button",
                          title: "Button",
                          "x-component-props": {
                            title: "Button"
                          }
                        }
                      },
                      {
                        componentName: "Field",
                        props: {
                          type: "void",
                          "x-component": "Button",
                          "x-component-props": {
                            title: "Button"
                          }
                        }
                      }
                    ]
                  }
                ]
              });
              ensureObjectItemsNode(node).append(operationNode);
            }
          }
        ]}
      />
    </div>
  );
});

ArrayTable.Behavior = createBehavior(createArrayBehavior("ArrayTable"), {
  name: "ArrayTable.Column",
  extends: ["Field"],
  selector: node => {
    return (
      node.props["x-component-props"]?.["x-extra-props"]?.isTableColumn === true
    );
  },
  designerProps: {
    droppable: true,
    cloneable: true,
    allowDrop: node => {
      return (
        node.props["type"] === "object" &&
        node.parent?.props?.["x-component"] === "ArrayTable"
      );
    },
    propsSchema: createVoidFieldSchema(AllSchemas.ArrayTable.Column)
  },
  designerLocales: AllLocales.ArrayTableColumn
});

ArrayTable.Resource = createResource({
  icon: "ArrayTableSource",
  elements: [
    {
      componentName: "Field",
      props: {
        type: "array",
        "x-decorator": "FormItem",
        "x-component": "ArrayTable",
        "x-component-props": {
          "x-extra-props": {
            isGroup: false
          }
        }
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
                type: "void",
                "x-component": "Input",
                "x-component-props": {
                  "x-extra-props": {
                    isTableColumn: true
                  }
                },
                title: "column-1"
              }
            },
            {
              componentName: "Field",
              props: {
                type: "void",
                "x-component": "Input",
                "x-component-props": {
                  "x-extra-props": {
                    isTableColumn: true
                  }
                },
                title: "column-2"
              }
            }
          ]
        }
      ]
    }
  ]
});
