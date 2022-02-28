import React from "react";
import { TreeNode } from "@designable/core";
import { transformToSchema } from "@designable/formily-transformer";
import { FormRender } from "@nvwa/formx-renderer";

export interface IPreviewWidgetProps {
  tree: TreeNode;
}

export const PreviewWidget: React.FC<IPreviewWidgetProps> = props => {
  const { schema } = transformToSchema(props.tree);
  return (
    <div>
      <FormRender schema={schema} />
    </div>
  );
};
