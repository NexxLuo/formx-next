import React from "react";
import ReactDOM from "react-dom";
import { registry } from "@platform/formx-renderer";

import { FormRender } from "@platform/formx-renderer";
import * as AllComponents from "@platform/formx-antd/lib/all";
import "antd/dist/antd.css";

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

const PreviewWidget: React.FC<any> = () => {
  let schema = {
    type: "object",
    properties: {
      yfyofczizs6: {
        type: "string",
        title: "Input",
        "x-decorator": "FormItem",
        "x-component": "Input",
        "x-component-props": {
          "x-layout-props": {},
          "x-extra-props": {}
        },
        "x-designable-id": "yfyofczizs6",
        "x-index": 0
      }
    },
    "x-designable-id": "nl6elp3oxv0"
  };

  return (
    <FormRender
      schema={schema}
      components={AllComponents}
      form={AllComponents.Form}
    />
  );
};

ReactDOM.render(<PreviewWidget />, document.getElementById("root"));
