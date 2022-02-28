import { useCurrentNode } from "@nvwa/designable-react";

export const useParentNode = () => {
  const node = useCurrentNode();
  return node?.parent;
};

export const useParentNodeColumns = () => {
  const node = useCurrentNode();
  let columns = 3;
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
