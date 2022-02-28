import React from 'react';
import { IFormItemProps } from '../form-item';
import { PopoverProps } from 'antd/lib/popover';
/**
 * 默认Inline展示
 */
declare type IPopoverProps = PopoverProps;
declare type ComposedEditable = React.FC<IFormItemProps> & {
    Popover?: React.FC<IPopoverProps & {
        title?: React.ReactNode;
    }>;
};
export declare const Editable: ComposedEditable;
export default Editable;
