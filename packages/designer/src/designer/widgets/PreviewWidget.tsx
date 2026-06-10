import React from "react";
import { TreeNode } from "@designable/core";
import { transformToSchema } from "@designable/formily-transformer";
import { FormRender } from "@platform/formx-renderer"; 
import * as AllComponents from "@platform/formx-antd/lib/all";

export interface IPreviewWidgetProps {
  tree: TreeNode;
}

export const PreviewWidget: React.FC<IPreviewWidgetProps> = props => {
  const { schema } = transformToSchema(props.tree);

  return <FormRender schema={schema} components={AllComponents} form={AllComponents.Form} />;
};
