import React from "react";
import { TabPaneProps, TabsProps } from "antd/lib/tabs";
export interface IFormTab {
    activeKey: string;
    setActiveKey(key: string): void;
}
export interface IFormTabProps extends TabsProps {
    formTab?: IFormTab;
}
export interface IFormTabPaneProps extends TabPaneProps {
    key: string;
}
declare type ComposedFormTab = React.FC<IFormTabProps> & {
    TabPane?: React.FC<IFormTabPaneProps>;
    createFormTab?: (defaultActiveKey?: string) => IFormTab;
};
export declare const FormTab: ComposedFormTab;
export default FormTab;
