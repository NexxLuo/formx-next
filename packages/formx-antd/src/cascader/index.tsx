import React from "react";
import { connect, mapReadPretty, mapProps } from "@formily/react";
import { Cascader as AntdCascader } from "antd";
import { CascaderProps } from "antd/lib/cascader";
import { PreviewText } from "../preview-text";
import { LoadingOutlined } from "../icons";

interface CascaderRef {
  focus: () => void;
  blur: () => void;
}

type FixAntdCascaderType = React.ForwardRefExoticComponent<
  CascaderProps &
    React.RefAttributes<CascaderRef> & {
      suffixIcon?: React.ReactNode;
    }
>;

export const Cascader:React.FC<any> = connect(
  AntdCascader,
  mapProps(
    {
      dataSource: "options"
    },
    (props, field) => {
      return {
        ...props,
        suffixIcon:
          field?.["loading"] || field?.["validating"] ? (
            <LoadingOutlined />
          ) : (
            props.suffixIcon
          )
      };
    }
  ),
  mapReadPretty(PreviewText.Cascader)
);

export default Cascader;
