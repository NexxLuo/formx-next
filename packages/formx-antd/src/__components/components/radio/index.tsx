import React from "react";
import { connect, mapProps, mapReadPretty } from "@formily/react";
import { Radio as AntdRadio } from "antd";
import { RadioProps, RadioGroupProps } from "antd/lib/radio";
import { PreviewText } from "../../../";
import { CheckboxOptionType } from "antd/lib/checkbox/Group";

type ComposedRadio = React.FC<RadioProps> & {
    Group?: React.FC<RadioGroupProps>;
    __ANT_RADIO?: boolean;
};

export const Radio: ComposedRadio = connect(
    AntdRadio,
    mapProps({
        value: "checked",
        onInput: "onChange"
    })
);

Radio.__ANT_RADIO = true;

Radio.Group = connect(
    AntdRadio.Group,
    mapProps(
        {
            dataSource: "options"
        },
        (props: RadioGroupProps & { optionType: "default" | "button" }) => {
            if (props.optionType === "button") {
                let childrens = (props.options || []).map(
                    (d: CheckboxOptionType) => {
                        return React.createElement(
                            AntdRadio.Button,
                            { key: d.value.toString(), value: d.value },
                            d.label
                        );
                    }
                );
                return {
                    options: undefined,
                    children: childrens
                };
            }

            return {};
        }
    ),
    mapReadPretty(PreviewText.Select)
);

export default Radio;
