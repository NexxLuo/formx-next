import { ISchema } from "@formily/react";

export const Select: ISchema = {
  type: "object",
  properties: {
    allowClear: {
      type: "boolean",
      "x-decorator": "FormItem",
      "x-component": "Switch"
    },
    placeholder: {
      type: "string",
      "x-decorator": "FormItem",
      "x-component": "Input"
    }
  }
};
