import { ISchema } from "@formily/react";

export const Input: ISchema & { TextArea?: ISchema } = {
  type: "object",
  properties: {
    addonBefore: {
      type: "string",
      "x-decorator": "FormItem",
      "x-component": "Input"
    },
    addonAfter: {
      type: "string",
      "x-decorator": "FormItem",
      "x-component": "Input"
    },
    prefix: {
      type: "string",
      "x-decorator": "FormItem",
      "x-component": "Input"
    },
    suffix: {
      type: "string",
      "x-decorator": "FormItem",
      "x-component": "Input"
    },
    allowClear: {
      type: "boolean",
      "x-decorator": "FormItem",
      "x-component": "Switch"
    },

    maxLength: {
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

Input.TextArea = {
  type: "object",
  properties: {
    maxLength: {
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
