import React from "react";
import { FormPath } from "@formily/core";
import { toJS } from "@formily/reactive";
import {
  ArrayField,
  Field as InternalField,
  ObjectField,
  VoidField,
  observer,
  ISchema,
  Schema
} from "@formily/react";
import { FormItem } from "@platform/formx-antd";
import { each, reduce } from "@formily/shared";
import { createBehavior } from "@designable/core";
import {
  useDesigner,
  useTreeNode,
  useComponents,
  DnFC
} from "@platform/designable-react";
import { isArr, isStr } from "@designable/shared";
import { Container } from "../../common/Container";
import { AllLocales } from "../../locales";
import { withLayoutPane, markTableColumn, setExtraNameField } from "../shared";
import { createEnsureTypeItemsNode } from "../../shared";

Schema.silent(true);

const ensureObjectItemsNode = createEnsureTypeItemsNode("object");

const SchemaStateMap = {
  title: "title",
  description: "description",
  default: "value",
  enum: "dataSource",
  readOnly: "readOnly",
  writeOnly: "editable",
  required: "required",
  "x-content": "content",
  "x-value": "value",
  "x-editable": "editable",
  "x-disabled": "disabled",
  "x-read-pretty": "readPretty",
  "x-read-only": "readOnly",
  "x-visible": "visible",
  "x-hidden": "hidden",
  "x-display": "display",
  "x-pattern": "pattern"
};

const NeedShownExpression = {
  title: true,
  description: true,
  default: true,
  "x-content": true,
  "x-value": true
};

const isExpression = (val: any) => isStr(val) && /^\{\{.*\}\}$/.test(val);

const filterExpression = (val: any) => {
  if (typeof val === "object") {
    const isArray = isArr(val);
    const results = reduce(
      val,
      (buf: any, value, key) => {
        if (isExpression(value)) {
          return buf;
        } else {
          const results = filterExpression(value);
          if (results === undefined || results === null) return buf;
          if (isArray) {
            return buf.concat([results]);
          }
          buf[key] = results;
          return buf;
        }
      },
      isArray ? [] : {}
    );
    return results;
  }
  if (isExpression(val)) {
    return;
  }
  return val;
};

const toDesignableFieldProps = (
  schema: ISchema,
  components: any,
  nodeIdAttrName: string,
  id: string
) => {
  const results: any = {};
  each(SchemaStateMap, (fieldKey, schemaKey) => {
    const value = schema[schemaKey];
    if (isExpression(value)) {
      if (!NeedShownExpression[schemaKey]) return;
      if (value) {
        results[fieldKey] = value;
        return;
      }
    } else if (value) {
      results[fieldKey] = filterExpression(value);
    }
  });
  if (!components["FormItem"]) {
    components["FormItem"] = withLayoutPane(FormItem);
  }
  const decorator =
    schema["x-decorator"] && FormPath.getIn(components, schema["x-decorator"]);
  const component =
    schema["x-component"] && FormPath.getIn(components, schema["x-component"]);
  const decoratorProps = schema["x-decorator-props"] || {};
  const componentProps = schema["x-component-props"] || {};

  if (decorator) {
    results.decorator = [decorator, toJS(decoratorProps)];
  }
  if (component) {
    results.component = [component, toJS(componentProps)];
  }
  if (decorator) {
    FormPath.setIn(results["decorator"][1], nodeIdAttrName, id);
  } else if (component) {
    FormPath.setIn(results["component"][1], nodeIdAttrName, id);
  }
  results.title = results.title && (
    <span data-content-editable="title">{results.title}</span>
  );
  results.description = results.description && (
    <span data-content-editable="description">{results.description}</span>
  );
  return results;
};

export const Field: DnFC<ISchema> = observer((props: any) => {
  const designer = useDesigner();
  const components = useComponents();
  const node = useTreeNode();
  if (!node) return null;
  const fieldProps = toDesignableFieldProps(
    props,
    components,
    designer.props.nodeIdAttrName,
    node.id
  );
  if (props.type === "object") {
    return (
      <Container>
        <ObjectField {...fieldProps} name={node.id}>
          {props.children}
        </ObjectField>
      </Container>
    );
  } else if (props.type === "array") {
    return <ArrayField {...fieldProps} name={node.id} />;
  } else if (node.props.type === "void") {
    return (
      <VoidField {...fieldProps} name={node.id}>
        {props.children}
      </VoidField>
    );
  }
  return <InternalField {...fieldProps} name={node.id} />;
});

Field.Behavior = createBehavior({
  name: "Field",
  selector: "Field",
  designerLocales: AllLocales.Field,
  designerProps: {
    getDropNodes(node, parent) {
      let componentType = node.props["x-component"];
      let extraProps = node.props["x-component-props"]?.["x-extra-props"];

      let hasExtraNameField =
        ["Select", "TreeSelect"].includes(componentType) ||
        extraProps?.hasExtraNameField === true;

      if (hasExtraNameField) {
        setExtraNameField(node);
      }

      let parentIsTable = parent.props["x-component"] === "ArrayTable";

      let isTableColumn =
        parent.props["x-component-props"]?.["x-extra-props"]?.isTableColumn ===
        true;
      if (parentIsTable || isTableColumn) {
        markTableColumn(node);
        if (isTableColumn) {
          parent.setProps({ ...parent.props, type: "array" });
        }
        ensureObjectItemsNode(parent).append(node);
        return null;
      }

      return node;
    }
  }
});
