import React from 'react';
import './styles.less';
declare type TypographyProps = {
    Link: any;
};
export interface INodeActionsWidgetProps {
    className?: string;
    style?: React.CSSProperties;
    activeShown?: boolean;
}
export interface INodeActionsWidgetActionProps extends Omit<React.ComponentProps<'a'>, 'title' | 'type' | 'ref'>, Partial<TypographyProps['Link']> {
    className?: string;
    style?: React.CSSProperties;
    title: React.ReactNode;
    icon?: React.ReactNode;
}
export declare const NodeActionsWidget: React.FC<INodeActionsWidgetProps> & {
    Action?: React.FC<INodeActionsWidgetActionProps>;
};
export {};
