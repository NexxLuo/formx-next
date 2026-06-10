import React, { useState } from "react";
import cls from "classnames";
import { usePrefixCls } from "../../__builtins__";
import { isVoidField } from "@formily/core";
import { connect, mapProps, useField, useFieldSchema } from "@formily/react";
import { reduce } from "@formily/shared";
import {
  useFormLayout,
  useFormShallowLayout,
  FormLayoutShallowContext,
  useGridSpan
} from "../../";
import { Tooltip, Row, Col } from "antd";
import { QuestionCircleOutlined } from "../../icons";
import { GeneralField } from "@formily/core/esm/types";

export interface IFormItemProps {
  className?: string;
  style?: React.CSSProperties;
  prefixCls?: string;
  label?: React.ReactNode;
  colon?: boolean;
  tooltip?: boolean;
  labelStyle?: React.CSSProperties;
  labelAlign?: "left" | "right" | "center";
  labelWrap?: boolean;
  labelWidth?: number;
  wrapperWidth?: number;
  labelCol?: number;
  wrapperCol?: number;
  wrapperAlign?: "left" | "right";
  wrapperWrap?: boolean;
  wrapperStyle?: React.CSSProperties;
  fullness?: boolean;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  size?: "small" | "default" | "large";
  inset?: boolean;
  extra?: React.ReactNode;
  feedbackText?: React.ReactNode;
  feedbackLayout?: "loose" | "terse" | "popover" | "none" | (string & {});
  feedbackStatus?: "error" | "warning" | "success" | "pending" | (string & {});
  feedbackIcon?: React.ReactNode;
  asterisk?: boolean;
  gridSpan?: number;
  bordered?: boolean;
  layout?: "vertical" | "horizontal" | "inline";
}

type ComposeFormItem = React.FC<IFormItemProps> & {
  BaseItem?: React.FC<IFormItemProps>;
};

const useFormItemLayout = (props: IFormItemProps) => {
  const shallowFormLayout = useFormShallowLayout();
  const formLayout = useFormLayout();
  const layout = { ...shallowFormLayout, ...formLayout };
  let itemLayout = props.layout ?? layout.layout ?? "horizontal";
  return {
    ...props,
    layout: itemLayout,
    colon: props.colon ?? layout.colon,
    labelAlign:
      itemLayout === "vertical"
        ? props.labelAlign ?? layout.labelAlign ?? "left"
        : props.labelAlign ?? layout.labelAlign ?? "right",
    labelWrap: props.labelWrap ?? layout.labelWrap,
    labelWidth: props.labelWidth ?? layout.labelWidth,
    wrapperWidth: props.wrapperWidth ?? layout.wrapperWidth,
    labelCol: props.labelCol ?? layout.labelCol,
    wrapperCol: props.wrapperCol ?? layout.wrapperCol,
    wrapperAlign: props.wrapperAlign ?? layout.wrapperAlign,
    wrapperWrap: props.wrapperWrap ?? layout.wrapperWrap,
    fullness: props.fullness ?? layout.fullness,
    size: props.size ?? layout.size,
    inset: props.inset ?? layout.inset,
    asterisk: props.asterisk,
    bordered: props.bordered ?? layout.bordered,
    feedbackIcon: props.feedbackIcon,
    feedbackLayout: props.feedbackLayout ?? layout.feedbackLayout ?? "loose"
  };
};

export const BaseItem: React.FC<IFormItemProps> = props => {
  const { children, ...others } = props;
  const [active, setActice] = useState(false);
  const formLayout = useFormItemLayout(others);
  const shallowFormLayout = useFormShallowLayout();

  const {
    label,
    style,
    layout,
    colon = true,
    addonBefore,
    addonAfter,
    asterisk,
    feedbackStatus,
    extra,
    feedbackText,
    fullness,
    feedbackLayout,
    feedbackIcon,
    inset,
    bordered = true,
    labelWidth,
    wrapperWidth,
    labelCol,
    wrapperCol,
    labelAlign,
    wrapperAlign = "left",
    size,
    labelWrap,
    wrapperWrap,
    tooltip
  } = formLayout;
  const labelStyle: any = formLayout.labelStyle || {};
  const wrapperStyle: any = formLayout.wrapperStyle || {};
  // 固定宽度
  let enableCol = false;
  if (labelWidth || wrapperWidth) {
    if (labelWidth) {
      labelStyle.width = `${labelWidth}px`;
      labelStyle.maxWidth = `${labelWidth}px`;
    }
    if (wrapperWidth) {
      wrapperStyle.width = `${wrapperWidth}px`;
      wrapperStyle.maxWidth = `${wrapperWidth}px`;
    }
    // 栅格模式
  } else if (labelCol || wrapperCol) {
    enableCol = true;
  }

  const prefixCls = usePrefixCls("formily-item", props);
  const formatChildren =
    feedbackLayout === "popover" ? (
      <Tooltip
        align={{
          offset: [0, 4]
        }}
        placement="topLeft"
        mouseEnterDelay={0.3}
        title={!!feedbackText ? <span>{feedbackText}</span> : null}
      >
        <div className="ant-formily-item-control-content-component-inner">
          {children}
        </div>
      </Tooltip>
    ) : (
      children
    );

  return (
    <div
      style={{
        ...style,
        gridColumnStart: `span ${useGridSpan(props.gridSpan)}`
      }}
      className={cls({
        [`${prefixCls}`]: true,
        [`${prefixCls}-layout-${layout}`]: true,
        [`${prefixCls}-${feedbackStatus}`]: !!feedbackStatus,
        [`${prefixCls}-feedback-has-text`]: !!feedbackText,
        [`${prefixCls}-size-${size}`]: !!size,
        [`${prefixCls}-feedback-layout-${feedbackLayout}`]: !!feedbackLayout,
        [`${prefixCls}-fullness`]: !!fullness || !!inset || !!feedbackIcon,
        [`${prefixCls}-inset`]: !!inset,
        [`${prefixCls}-active`]: active,
        [`${prefixCls}-inset-active`]: !!inset && active,
        [`${prefixCls}-label-align-${labelAlign}`]: true,
        [`${prefixCls}-control-align-${wrapperAlign}`]: true,
        [`${prefixCls}-label-wrap`]: !!labelWrap,
        [`${prefixCls}-control-wrap`]: !!wrapperWrap,
        [`${prefixCls}-bordered-none`]:
          bordered === false || !!inset || !!feedbackIcon,
        [props.className]: !!props.className
      })}
      onFocus={() => {
        if (feedbackIcon || inset) {
          setActice(true);
        }
      }}
      onBlur={() => {
        if (feedbackIcon || inset) {
          setActice(false);
        }
      }}
    >
      {label !== undefined && (
        <div
          className={cls({
            [`${prefixCls}-label`]: true,
            [`${prefixCls}-item-col-${labelCol}`]: enableCol && !!labelCol
          })}
          style={labelStyle}
        >
          <div className={cls(`${prefixCls}-label-content`)}>
            {asterisk && (
              <span className={cls(`${prefixCls}-asterisk`)}>{"*"}</span>
            )}
            <label title={props.label?.toString()}>{label}</label>
          </div>
          {tooltip && (
            <span className={cls(`${prefixCls}-label-tooltip`)}>
              <Tooltip placement="top" title={tooltip}>
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          )}
          {label && (
            <span className={cls(`${prefixCls}-colon`)}>
              {colon ? ":" : ""}
            </span>
          )}
        </div>
      )}

      <div
        className={cls({
          [`${prefixCls}-control`]: true,
          [`${prefixCls}-item-col-${wrapperCol}`]: enableCol && !!wrapperCol
        })}
      >
        <div className={cls(`${prefixCls}-control-content`)}>
          {addonBefore && (
            <div className={cls(`${prefixCls}-addon-before`)}>
              {addonBefore}
            </div>
          )}
          <div
            style={wrapperStyle}
            className={cls({
              [`${prefixCls}-control-content-component`]: true,
              [`${prefixCls}-control-content-component-has-feedback-icon`]:
                !!feedbackIcon
            })}
          >
            <FormLayoutShallowContext.Provider
              value={reduce(
                shallowFormLayout,
                (buf: any, _, key) => {
                  if (key === "size") {
                    buf.size = size;
                  } else {
                    buf[key] = undefined;
                  }
                  return buf;
                },
                {
                  size
                }
              )}
            >
              {formatChildren}
            </FormLayoutShallowContext.Provider>
            {feedbackIcon && (
              <div className={cls(`${prefixCls}-feedback-icon`)}>
                {feedbackIcon}
              </div>
            )}
          </div>
          {addonAfter && (
            <div className={cls(`${prefixCls}-addon-after`)}>{addonAfter}</div>
          )}
        </div>
        {!!feedbackText &&
          feedbackLayout !== "popover" &&
          feedbackLayout !== "none" && (
            <div
              className={cls({
                [`${prefixCls}-${feedbackStatus}-help`]: !!feedbackStatus,
                [`${prefixCls}-help`]: true,
                [`${prefixCls}-help-enter`]: true,
                [`${prefixCls}-help-enter-active`]: true
              })}
            >
              {feedbackText}
            </div>
          )}
        {extra && <div className={cls(`${prefixCls}-extra`)}>{extra}</div>}
      </div>
    </div>
  );
};

function getLayoutStyle(layoutProps: any = {}) {
  let layoutStyle: any = {};

  let layoutHeight = layoutProps.height ?? { type: "auto" };
  let layoutWidth = layoutProps.width;

  if (typeof layoutHeight === "object" && layoutHeight) {
    if (layoutHeight.type === "const") {
      let _constHeight = Number(layoutHeight.const);
      if (!isNaN(_constHeight)) {
        layoutStyle.height = _constHeight;
      } else {
        layoutStyle.height = "auto";
      }
    } else if (layoutHeight.type === "percent") {
      let _percentHeight = Number(layoutHeight.percent);
      if (!isNaN(_percentHeight)) {
        layoutStyle.height = _percentHeight + "%";
      } else {
        layoutStyle.height = "auto";
      }
    }
  }

  if (typeof layoutWidth === "object" && layoutWidth) {
    if (layoutWidth.type === "const") {
      let _constWidth = Number(layoutWidth.const);
      if (!isNaN(_constWidth)) {
        layoutStyle.width = _constWidth;
        layoutStyle.flexGrow = 0;
        layoutStyle.flexShrink = 0;
        layoutStyle.flexBasis = layoutStyle.width;
      }
    } else if (layoutWidth.type === "percent") {
      let _percentWidth = Number(layoutWidth.percent);
      if (!isNaN(_percentWidth)) {
        layoutStyle.width = _percentWidth + "%";
        layoutStyle.flexGrow = 0;
        layoutStyle.flexShrink = 0;
        layoutStyle.flexBasis = layoutStyle.width;
      }
    } else if (layoutWidth.type === "auto") {
      layoutStyle.width = "auto";
    }
  }
  return layoutStyle;
}

function getParentLayout(item: GeneralField) {
  let layout = null;

  let parent = item.parent;
  if (parent) {
    let _layout = parent.componentProps["x-layout-props"];

    if (_layout) {
      layout = _layout;
    } else {
      if (parent.parent) {
        layout = getParentLayout(parent);
      }
    }
  }

  if (layout) {
    return {
      columns: layout.columns ?? 1,
      hasParent: true,
      labelWidth: layout.labelWidth ?? 60,
      labelLayout: layout.labelLayout ?? "horizontal"
    };
  }

  return {
    columns: 1,
    hasParent: false,
    labelWidth: 60
  };
}

export const LayoutBaseItem: React.FC<IFormItemProps | any> = _props => {
  let { wrapper, displayTitle, ...props } = _props;
  let field = useField();
  let schema: any = useFieldSchema();

  let componentProps = field.componentProps;
  let layoutProps = componentProps["x-layout-props"] || {};

  let layoutClass: string[] | string = ["formx-item-wrapper"];
  let layoutStyle = getLayoutStyle(layoutProps);

  let wrapperClass = [""];
  if (schema["x-component"]?.toLowerCase() === "arraytable") {
    wrapperClass.push("formx-item-table-wrapper");
  }

  let textAlign = layoutProps.textAlign;

  let {
    columns: columnsCount,
    labelWidth,
    hasParent,
    labelLayout
  } = getParentLayout(field);

  let fillHeight = false;
  let layoutHeight = layoutProps.height || {};

  if (layoutHeight.type == "percent") {
    let _percentHeight = Number(layoutHeight.percent);
    if (!isNaN(_percentHeight) && _percentHeight > 0) {
      fillHeight = true;
    }
  }

  if (layoutHeight.type == "const") {
    let _constHeight = Number(layoutHeight.const);
    if (!isNaN(_constHeight)) {
      fillHeight = true;
    }
  }

  if (fillHeight === true) {
    layoutClass.push("formx-item-fill-height");
  }

  if (labelLayout === "vertical") {
    labelWidth = undefined;
    layoutClass.push("formx-item-layout-vertical");
  }

  let formItemClass = [];

  if (props.className) {
    formItemClass.push(props.className);
  }

  if (textAlign === "center") {
    formItemClass.push("formx-item-text-align-center");
  } else if (textAlign === "right") {
    formItemClass.push("formx-item-text-align-right");
  } else if (textAlign === "left") {
    formItemClass.push("formx-item-text-align-left");
  }

  layoutClass = layoutClass.join(" ");

  let span = (24 / columnsCount) * layoutProps.span;

  if (span > 24 || isNaN(span)) {
    span = 24;
  }

  let _resetProps: any = {};
  if (schema?.isTableCellField === true) {
    _resetProps.label = undefined;
    _resetProps.style = { marginBottom: 0 };
  }

  let innerElement: any = null;

  if (schema?.noneWrapper === true) {
    innerElement = props.children;
    return innerElement;
  } else {
    innerElement = (
      <BaseItem
        {...props}
        labelWidth={labelWidth}
        {..._resetProps}
        layout={labelLayout}
        feedbackLayout="popover"
        className={formItemClass.join(" ")}
      />
    );
  }

  if (schema?.isTableCellField === true) {
    return innerElement;
  }

  let _element: any = null;

  if (typeof wrapper === "function") {
    innerElement = wrapper(innerElement);
  }

  if (hasParent) {
    _element = (
      <Col
        span={span}
        style={layoutStyle}
        className={layoutClass + wrapperClass.join(" ")}
      >
        {innerElement}
      </Col>
    );
  } else {
    _element = (
      <Row
        type="flex"
        className={layoutClass + wrapperClass.join(" ")}
        style={layoutStyle}
      >
        <Col span={span} className={layoutClass}>
          {innerElement}
        </Col>
      </Row>
    );
  }

  return _element;
};

// 适配
export const FormItem: ComposeFormItem = connect(
  LayoutBaseItem,
  mapProps(
    { validateStatus: true, title: "label", required: true },
    (props, field) => {
      if (isVoidField(field)) return props;
      if (!field) return props;
      const takeMessage = () => {
        const split = (messages: any[]) => {
          return messages.reduce((buf, text, index) => {
            if (!text) return buf;
            return index < messages.length - 1
              ? buf.concat([text, ", "])
              : buf.concat([text]);
          }, []);
        };
        if (field.validating) return;
        if (props.feedbackText) return props.feedbackText;
        if (field.selfErrors.length) return split(field.selfErrors);
        if (field.selfWarnings.length) return split(field.selfWarnings);
        if (field.selfSuccesses.length) return split(field.selfSuccesses);
      };

      return {
        feedbackText: takeMessage(),
        extra: props.extra || field.description
      };
    },
    (props, field) => {
      if (isVoidField(field)) return props;
      if (!field) return props;
      return {
        feedbackStatus:
          field.validateStatus === "validating"
            ? "pending"
            : field.decorator[1]?.feedbackStatus || field.validateStatus
      };
    },
    (props, field) => {
      if (isVoidField(field)) return props;
      if (!field) return props;
      let asterisk = false;
      if (field.required && field.pattern !== "readPretty") {
        asterisk = true;
      }
      if ("asterisk" in props) {
        asterisk = props.asterisk;
      }
      return {
        asterisk
      };
    },
    (props, field) => {
      let componentProps = field.componentProps;
      let layoutProps = componentProps["x-layout-props"] || {};
      let label = componentProps.title;
      if (
        componentProps.displayTitle === false ||
        props.displayLabel === false
      ) {
        label = undefined;
      }
      return {
        labelAlign:
          layoutProps.labelAlign === "default"
            ? undefined
            : layoutProps.labelAlign,
        label
      };
    }
  )
);

FormItem.BaseItem = BaseItem;

export default FormItem;
