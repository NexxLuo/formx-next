import React from 'react';
import { TreeNode } from '@designable/core';
import { INodeActionsWidgetActionProps } from '../NodeActionsWidget';
import './styles.less';
export interface IDroppableWidgetProps {
    node?: TreeNode;
    actions?: INodeActionsWidgetActionProps[];
    placeholder?: boolean;
    height?: number;
    style?: React.CSSProperties;
    className?: string;
}
export declare const DroppableWidget: React.FC<IDroppableWidgetProps>;
