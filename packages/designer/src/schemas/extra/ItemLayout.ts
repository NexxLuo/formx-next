
export const ItemLayout = {
    type: "object",
    properties: {
      span: {
        type: "number",
        "x-decorator": "FormItem",
        "x-component": "SpanSetter",
        "x-reactions": {
          fulfill: {
            state: {
              visible:
                '{{($node.parent===null||$node.parent?.componentName==="Form")?false:true}}'
            }
          }
        }
      },
      columns: {
        type: "number",
        "x-decorator": "FormItem",
        "x-component": "ColumnsSetter",
        "x-reactions": {
          fulfill: {
            state: {
              visible: '{{!$form.values["x-decorator"]}}'
            }
          }
        }
      }
    }
  };
  