import React from "react";
import { connect, mapReadPretty } from "@formily/react";
import { PreviewText } from "../../../";

import { InputNumber } from "antd";
import { formatNumberComma } from "../../shared/utils";

export const NumberPicker: React.FC<any> = connect(function (props) {
  let {
    addonBefore = "",
    addonAfter = "",
    commaSeparated,
    precision = 0,
    fillZero = false,
    stepHandler = false,
    ...componentProps
  } = props;

  if (typeof precision === "string" && !precision) {
    precision = 0;
  }

  if (precision === null || precision === undefined) {
    precision = 0;
  }

  let formatProps = {
    formatter: value => {
      let formattedValue = value;
      if (fillZero === false) {
        if (typeof precision === "number") {
          let sv = String(value);
          let c = sv.split(".")[1]?.length || 0;
          if (c > 0 && c <= precision) {
            formattedValue = Number(sv);
          }
        }
      }
      if (commaSeparated) {
        formattedValue = formatNumberComma(formattedValue);
      }
      return formattedValue;
    }
  };

  let otherProps: any = {};

  if (commaSeparated || fillZero === false) {
    otherProps = { ...formatProps };
    if (commaSeparated) {
      otherProps.parser = value => value.replace(/(,*)/g, "");
    }
  }

  let cls = [];

  if (componentProps.className) {
    cls.push(componentProps.className);
  }

  if (!stepHandler) {
    otherProps.step = 0;
    cls.push("input-number-nonehandler");
  }

  let innerInput = (
    <InputNumber
      {...componentProps}
      className={cls}
      precision={precision}
      {...otherProps}
      maxLength={undefined}
      autoComplete="off"
      onChange={e => {
        let v: number = Number(e);
        if (
          typeof v === "number" &&
          !isNaN(v) &&
          typeof precision === "number"
        ) {
          v = Number(v.toFixed(precision));
        }
        props.onChange(v);
      }}
    ></InputNumber>
  );

  if (addonBefore || addonAfter) {
    return (
      <span className="ant-input-group-wrapper">
        <span className="ant-input-wrapper ant-input-group">
          {addonBefore ? (
            <span className="ant-input-group-addon">{addonBefore}</span>
          ) : null}
          {innerInput}
          {addonAfter ? (
            <span className="ant-input-group-addon">{addonAfter}</span>
          ) : null}
        </span>
      </span>
    );
  }

  return innerInput;
}, mapReadPretty(PreviewText.Input));

export default NumberPicker;
