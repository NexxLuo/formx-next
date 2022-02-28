import { Switch as AntdSwitch } from "antd";
import { connect, mapProps } from "@formily/react";

export const Switch = connect(
    AntdSwitch,
    mapProps(
        {
            value: "checked"
        },
        props => {
            const onChange = props.onChange;
            delete props["value"];

            let checked = false;

            if (typeof props.checked !== "boolean") {
                checked =
                    {
                        0: false,
                        1: true
                    }[props.checked] ?? false;
            } else {
                checked = props.checked;
            }

            return {
                ...props,
                checked,
                onChange(checked) {
                    onChange?.(checked, null);
                }
            };
        }
    )
);

export default Switch;
