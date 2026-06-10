import React from "react";
import { Slider } from "antd";

export const ColumnsSetter = props => {
  return (
    <Slider
      {...props}
      min={1}
      max={6}
      marks={{ 1: 1, 2: 2, 3: 3, 4: 4, 6: 6 }}
      step={null}
    ></Slider>
  );
};

export default ColumnsSetter;
