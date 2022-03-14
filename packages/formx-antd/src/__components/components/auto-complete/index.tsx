import { AutoComplete as AntdAutoComplete } from "antd";
import { connect, mapProps } from "@formily/react";
import { Field } from "@formily/core/esm/models";
import { AutoCompleteProps } from "antd/lib/auto-complete";

const AutoComplete = connect(
    AntdAutoComplete,
    mapProps(
        {
            dataSource: "dataSource"
        },
        (props: any, field: Field) => {
            return {
                ...props,
                autoComplete: "off",
                dataSource: (props.dataSource || []).map((d: any) => {
                    return { ...d, text: d.label };
                }),
                filterOption: (inputValue, option: any) => {
                    return (
                        option.props.children
                            .toUpperCase()
                            .indexOf(inputValue.toUpperCase()) !== -1
                    );
                },
                loading: field.loading
            };
        }
    )
);

export default AutoComplete;
