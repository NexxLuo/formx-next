import React from 'react';
import { InputProps, TextAreaProps } from 'antd/lib/input';
declare type ComposedInput = React.FC<InputProps> & {
    TextArea?: React.FC<TextAreaProps>;
};
export declare const Input: ComposedInput;
export default Input;
