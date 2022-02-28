export const usePrefixCls = (
  tag?: string,
  props?: {
    prefixCls?: string;
  }
) => {
  return (props?.prefixCls || "ant-") + tag;
};
