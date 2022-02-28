import React from "react";
import { ButtonProps } from "antd/lib/button";
import { IconProps as AntdIconProps } from "antd/lib/icon";
import { ArrayField } from "@formily/core";
import { Schema, JSXComponent } from "@formily/react";
export interface IArrayBaseAdditionProps extends ButtonProps {
    title?: string;
    method?: "push" | "unshift";
    defaultValue?: any;
}
export interface IArrayBaseContext {
    props: IArrayBaseProps;
    field: ArrayField;
    schema: Schema;
}
export interface IArrayBaseItemProps {
    index: number;
    record: any;
}
export declare type ArrayBaseMixins = {
    Addition?: React.FC<IArrayBaseAdditionProps>;
    Remove?: React.FC<AntdIconProps & {
        index?: number;
    }>;
    MoveUp?: React.FC<AntdIconProps & {
        index?: number;
    }>;
    MoveDown?: React.FC<AntdIconProps & {
        index?: number;
    }>;
    Index?: React.FC;
    useArray?: () => IArrayBaseContext;
    useIndex?: () => number;
    useRecord?: () => any;
};
export interface IArrayBaseProps {
    disabled?: boolean;
    onAdd?: (index: number) => void;
    onRemove?: (index: number) => void;
    onMoveDown?: (index: number) => void;
    onMoveUp?: (index: number) => void;
}
declare type ComposedArrayBase = React.FC<IArrayBaseProps> & ArrayBaseMixins & {
    Item?: React.FC<IArrayBaseItemProps>;
    mixin?: <T extends JSXComponent>(target: T) => T & ArrayBaseMixins;
};
export declare const ArrayBase: ComposedArrayBase;
export default ArrayBase;
