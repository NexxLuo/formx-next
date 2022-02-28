import React from "react";
import { Table } from "tablex";
import { TableProps } from "antd/lib/table/interface";
import { TreeNode, createBehavior, createResource } from "@designable/core";
import {
  useTreeNode,
  DroppableWidget,
  useNodeIdProps,
  DnFC
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
  let items =
    node.children.find(d => d.props.type === "object")?.children || [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    let props = item.props;

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
              justifyContent: "center"
            }}
            data-designer-node-id={column.key}
            data-content-editable="title"
          >
            {column.title ?? null}
          </div>
        );
      }
    };

    let children = item.children;
    if (children instanceof Array && children.length > 0) {
      column.children = createTableColumns(item);
    }

    columns.push(column);
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
