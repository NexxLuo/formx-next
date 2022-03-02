import { ISchema } from "@formily/react";

export const Button: ISchema & { Addition?: ISchema } = {
    type: "object",
    properties: {
        // title: {
        //     type: "string",
        //     "x-decorator": "FormItem",
        //     "x-component": "Input"
        // },
        icon: {
            type: "string",
            'x-decorator': 'FormItem',
            'x-component': 'IconSetter',
        },
        iconOnly: {
            type: "boolean",
            "x-decorator": "FormItem",
            "x-component": "Switch"
        },
    }
};
