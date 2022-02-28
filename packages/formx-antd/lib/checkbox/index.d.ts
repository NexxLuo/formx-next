/// <reference types="react" />
import { CheckboxProps, CheckboxGroupProps } from 'antd/lib/checkbox';
declare type ComposedCheckbox = React.FC<CheckboxProps> & {
    Group?: React.FC<CheckboxGroupProps>;
    __ANT_CHECKBOX?: boolean;
};
export declare const Checkbox: ComposedCheckbox;
export default Checkbox;
