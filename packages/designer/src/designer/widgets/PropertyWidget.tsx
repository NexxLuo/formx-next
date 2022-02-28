import React from "react";
import {
  DataField,
  onFieldInputValueChange,
  onFieldInit,
  GeneralField,
  Form
} from "@formily/core";
import { SettingsForm } from "@nvwa/designable-settings-form";
import { useOperation } from "@nvwa/designable-react";
import { TreeNode } from "@designable/core";
import { merge } from "@formily/shared";
import * as setters from "../setters";

type PropertyOnChangeEventType = {
  name: string;
  path: string;
  fullpath: string;
  field: DataField;
  form: Form;
  node: TreeNode;
  setNodeProps: (path: string, values: any) => void;
};

type PropertyonFieldInit = {
  selectedNode: TreeNode;
  field: GeneralField;
  name: string;
  path: string;
  fullpath: string;
  form: Form;
  setNodeProps: (props: any) => void;
};

export interface IPropertyFormProps {
  components?: Record<string, React.FC<any>>;
  onChange?: (props: PropertyOnChangeEventType) => void;
  onChangeFormProperty?: (props: PropertyOnChangeEventType) => void;
  onFieldInit?: (props: PropertyonFieldInit) => void;
}

const transformFieldPath = (field: GeneralField | { address: string }) => {
  let addrStr = field.address.toString();
  let addressArr = addrStr.split(".");
  let pathArr = [];
  let name = "";

  if (addressArr.length > 1) {
    addressArr.forEach((p, i) => {
      if (i > 0) {
        pathArr.push(p);
        name = p;
      }
    });
  } else {
    pathArr.push(addressArr[0]);
    name = addressArr[0];
  }

  let path = pathArr.join(".");

  return {
    name,
    fullpath: addrStr,
    path
  };
};

export const PropertyForm: React.FC<IPropertyFormProps> = props => {
  const operation = useOperation();

  return (
    <SettingsForm
      components={setters}
      effects={() => {
        let selections = operation.getSelectedNodes();
        let node: TreeNode = null;
        if (selections.length === 1) {
          node = selections[0];
        }

        const setNodeProps = values => {
          node.setProps(merge(node.props, values));
        };

        const onChange = (e: PropertyOnChangeEventType) => {
          let _node = e.node;
          if (_node) {
            if (_node.componentName === "Form") {
              if (typeof props.onChangeFormProperty === "function") {
                props.onChangeFormProperty(e);
              }
            } else {
              if (typeof props.onChange === "function") {
                props.onChange(e);
              }
            }
          }
        };

        onFieldInputValueChange("*", (field, form) => {
          let { name, path, fullpath } = transformFieldPath(field);
          onChange({
            name,
            path,
            fullpath,
            field,
            form,
            node,
            setNodeProps
          });
        });

        onFieldInit("*", (field, form) => {
          if (typeof props.onFieldInit === "function") {
            let { name, path, fullpath } = transformFieldPath(field);
            props.onFieldInit({
              selectedNode: node,
              name,
              path,
              fullpath,
              field,
              form,
              setNodeProps
            });
          }
        });
      }}
    />
  );
};

export default PropertyForm;
