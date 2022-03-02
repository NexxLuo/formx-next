import React, { useEffect } from "react";
import { Row, Col } from "antd";
import { useTreeNode } from "@nvwa/designable-react";
import { merge } from "@formily/shared";
import { TreeNode } from "@designable/core";

export const useParentNodeColumns = () => {
  const node = useTreeNode();
  let columns = 1;
  let parent = node?.parent;

  if (parent) {
    const layoutProps =
      parent?.props?.["x-component-props"]?.["x-layout-props"];
    if (typeof layoutProps?.columns === "number") {
      columns = layoutProps.columns;
    }
  }

  return columns;
};

export const useNodeSpan = () => {
  const node = useTreeNode();
  let span = 1;
  if (node) {
    const layoutProps = node?.props?.["x-component-props"]?.["x-layout-props"];
    if (typeof layoutProps?.span === "number") {
      span = layoutProps.span;
    }
  }
  return span;
};

export const withLayoutPane = FC => {
  return props => {
    const node = useTreeNode();
    if (!node) return null;
    let hasParent = node.parent !== null;
    let innerElement = <FC {...props}></FC>;
    if (hasParent) {
      let parentColumns = useParentNodeColumns();
      let nodeSpan = useNodeSpan();
      let span = (24 / parentColumns) * nodeSpan;
      if (span > 24 || isNaN(span)) {
        span = 24;
      }
      return <Col span={span}>{innerElement}</Col>;
    } else {
      return <Row type="flex">{innerElement}</Row>;
    }
  };
};

export const withLayoutField = FC => {
  return props => {
    const node = useTreeNode();
    if (!node) return null;
    let hasParent = node.parent !== null;
    let innerElement = <FC {...props}></FC>;

    let _noneWrapper = true;
    if (hasParent && !_noneWrapper) {
      let parentColumns = useParentNodeColumns();
      let nodeSpan = useNodeSpan();
      let span = (24 / parentColumns) * nodeSpan;
      if (span > 24 || isNaN(span)) {
        span = 24;
      }

      return (
        <Col span={span}>
          <div className="formx-item-virtual-field">{innerElement}</div>
        </Col>
      );
    } else {
      return <div className="formx-item-virtual-field">{innerElement}</div>;
    }
  };
};

export const withLayoutPaneContent = children => {
  return <Row type="flex">{children}</Row>;
};

export const setExtraNameField = node => {
  if (node && node.children.length === 0) {
    const extra = new TreeNode({
      componentName: "Field",
      props: {
        type: "string",
        "x-component": "Input",
        display: false,
        "x-component-props": {
          "x-extra-props": {
            hidden: true,
            relatedKey: node.id,
            relatedNameFieldKey: node.id
          }
        }
      }
    });
    node.append(extra);
    node.setProps(
      merge(node.props, {
        "x-component-props": {
          "x-extra-props": {
            extraNameFieldKey: extra.id
          }
        }
      })
    );
  }
};

export const setExtraIdField = node => {
  if (node && node.children.length === 0) {
    const extra = new TreeNode({
      componentName: "Field",
      props: {
        type: "string",
        "x-component": "Input",
        display: false,
        "x-component-props": {
          "x-extra-props": {
            hidden: true,
            relatedKey: node.id,
            relatedNameFieldKey: node.id
          }
        }
      }
    });
    node.append(extra);
    node.setProps(
      merge(node.props, {
        "x-component-props": {
          "x-extra-props": {
            extraIdFieldKey: extra.id
          }
        }
      })
    );
  }
};

export const markTableColumn = (node, isColumn = true) => {
  if (node) {
    node.setProps(
      merge(node.props, {
        "x-component-props": {
          "x-extra-props": {
            isTableColumn: isColumn
          }
        }
      })
    );
  }
};
