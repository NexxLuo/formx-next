export const ItemExtra = {
  type: "object",
  properties: {
    initialValue: {
      type: "number",
      "x-decorator": "FormItem",
      "x-component": "Input"
    },
    isEntity: {
      type: "number",
      "x-decorator": "FormItem",
      "x-component": "Switch"
    }
  }
};
