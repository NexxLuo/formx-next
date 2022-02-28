import React from "react";
import ReactDOM from "react-dom";
import Designer from "../src/designer";
import { registry } from "@nvwa/formx-renderer";

registry.registerField(
  "TestInput",
  () => {
    return "TestInput";
  },
  {
    title: "测试",
    attribute: [
      {
        title: "测试属性1",
        name: "test1"
      }
    ]
  }
);

ReactDOM.render(<Designer />, document.getElementById("root"));
