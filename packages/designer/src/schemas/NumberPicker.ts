import { ISchema } from "@formily/react";

export const NumberPicker: ISchema = {
  type: "object",
  properties: {
    precision: {
      type: "number",
      "x-decorator": "FormItem",
      "x-component": "NumberPicker"
    },
    max: {
      type: "number",
      "x-decorator": "FormItem",
      "x-component": "NumberPicker"
    },
    min: {
      type: "number",
      "x-decorator": "FormItem",
      "x-component": "NumberPicker"
    },
    step: {
      type: "number",
      "x-decorator": "FormItem",
      "x-component": "NumberPicker"
    },
    placeholder: {
      type: "string",
      "x-decorator": "FormItem",
      "x-component": "Input"
    }
  }
};
