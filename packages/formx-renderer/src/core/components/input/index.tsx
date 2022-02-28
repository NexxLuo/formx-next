import React, { Fragment } from "react";
import {
    connect,
    mapProps,
    mapReadPretty,
    useField,
    useFieldSchema,
    RecursionField
} from "@formily/react";
import { Input as AntdInput } from "antd";
import { InputProps, TextAreaProps, SearchProps } from "antd/lib/input";
import { PreviewText } from "@nvwa/formx-antd";
import { LoadingOutlined } from "@nvwa/formx-antd/lib/icons";
import { Field } from "@formily/core/esm/models";

type ComposedInput = React.FC<InputProps> & {
    TextArea?: React.FC<TextAreaProps>;
    Search?: React.FC<SearchProps> & {
        displayTitle?: string;
    };
};

export const Input: ComposedInput = connect(
    AntdInput,
    mapProps((props: any, field) => {
        delete props.displayTitle;
        return {
            ...props,
            autoComplete: "off",
            suffix: (
                <span>
                    {field?.["loading"] || field?.["validating"] ? (
                        <LoadingOutlined />
                    ) : (
                        props.suffix
                    )}
                </span>
            )
        };
    }),
    mapReadPretty(PreviewText.Input)
);

export const Search = (props: SearchProps | any) => {
    let field: Field = useField();
    let schema = useFieldSchema();
    let parentPath = field.address.parent().toString();

    let { displayTitle, initialValue, ..._props } = props;
    return (
        <Fragment>
            <AntdInput.Search {..._props} autoComplete="off"></AntdInput.Search>
            {schema.mapProperties((item, key) => {
                return (
                    <RecursionField
                        key={key}
                        basePath={[parentPath]}
                        schema={item}
                        name={key}
                        onlyRenderProperties
                    />
                );
            })}
        </Fragment>
    );
};

Input.TextArea = connect(AntdInput.TextArea, mapReadPretty(PreviewText.Input));
Input.Search = connect(Search, mapReadPretty(PreviewText.Input));

export default Input;
