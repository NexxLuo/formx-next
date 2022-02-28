import React from "react";
import { Slider } from "antd";
import { useParentNodeColumns } from "./hooks";

export const SpanSetter = props => {
  const max = useParentNodeColumns();

  let spanMarks = {};

  for (let i = 1; i < max + 1; i++) {
    spanMarks[i] = i;
  }

  const spanTipFormatter = v => {
    let parentColumns = max || 1;
    return v + "/" + parentColumns;
  };

  return (
    <Slider
      {...props}
      min={1}
      max={max}
      marks={spanMarks}
      step={null}
      tipFormatter={spanTipFormatter}
    ></Slider>
  );
};

export default SpanSetter;
