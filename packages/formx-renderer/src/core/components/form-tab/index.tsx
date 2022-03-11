import React from "react";
import { Tabs, Badge, Row } from "antd";
import { TabPaneProps, TabsProps } from "antd/lib/tabs";
import {
    useField,
    observer,
    useFieldSchema,
    RecursionField
} from "@formily/react";
import { Schema, SchemaKey } from "@formily/json-schema";
import cls from "classnames";
import { usePrefixCls } from "@platform/formx-antd/lib/__builtins__";
import { withLayoutPane } from "../shared";

interface IFormTab {
    activeKey: string;
    setActiveKey(key: string): void;
}

interface IFormTabProps extends TabsProps {
    formTab?: IFormTab;
}

interface IFormTabPaneProps extends TabPaneProps {
    key: string | number;
}

type ComposedFormTab = React.FC<IFormTabProps> & {
    TabPane?: React.FC<IFormTabPaneProps>;
    createFormTab?: (defaultActiveKey?: string) => IFormTab;
};

const useTabs = () => {
    const tabsField = useField();
    const schema = useFieldSchema();
    const tabs: { name: SchemaKey; props: any; schema: Schema }[] = [];
    schema.mapProperties((schema, name) => {
        const field = tabsField.query(tabsField.address.concat(name)).take();
        if (field?.display === "none" || field?.display === "hidden") return;
        let ctype: string = schema["x-component"] || "";
        ctype = ctype.toLowerCase();
        if (ctype.indexOf("tabpane") > -1) {
            tabs.push({
                name,
                props: {
                    ...schema?.["x-component-props"],
                    ...field?.componentProps,
                    key: schema?.["x-component-props"]?.key || name
                },
                schema
            });
        }
    });
    return tabs;
};

const TabPane: React.FC<any> = _props => {
    let { children, wrapper, schema } = _props;
    let _children = <Row type="flex">{children}</Row>;
    let innerElement = null;
    if (typeof wrapper === "function") {
        innerElement = wrapper(_children, schema);
    } else {
        innerElement = _children;
    }

    return innerElement;
};

export const FormTab: ComposedFormTab = withLayoutPane(
    observer(_props => {
        let props: any = _props;
        let hiddenKeys = props.hiddenKeys || [];
        const field = useField();
        const tabs = useTabs();
        let name = field.path.toString();

        let formProps: any = field.form.props;
        let formContext = null;

        if (typeof formProps.getContext === "function") {
            formContext = formProps.getContext();
        }
        let _context = formContext?.selectedTabItem;

        let __activeKey = "";
        if (_context) {
            __activeKey = _context[name]?.activeKey;
        }

        let _activeKey =
            props.activeKey || __activeKey || tabs[0]?.name?.toString();

        const _formTab = {
            activeKey: _activeKey,
            setActiveKey: key => {
                field.setComponentProps({ activeKey: key });
                let name = field.path.toString();
                let context = formContext || {};
                let setContext = formProps.setContext;
                if (typeof setContext === "function" && context) {
                    if (context.selectedTabItem) {
                        context.selectedTabItem[name] = {
                            activeKey: key
                        };
                    } else {
                        context.selectedTabItem = {
                            [name]: {
                                activeKey: key
                            }
                        };
                    }
                    setContext(context);
                }
            }
        };

        const prefixCls = usePrefixCls("formily-tab", props);
        const activeKey = _formTab.activeKey;

        const badgedTab = (key: SchemaKey, props: any) => {
            const errors = field.form.queryFeedbacks({
                type: "error",
                address: `${field.address.concat(key)}.*`
            });
            if (errors.length) {
                return (
                    <Badge className="errors-badge" count={errors.length}>
                        {props.tab}
                    </Badge>
                );
            }
            return props.tab;
        };

        return (
            <Tabs
                {...props}
                className={cls(prefixCls, props.className)}
                activeKey={activeKey}
                onChange={key => {
                    props.onChange?.(key);
                    _formTab?.setActiveKey?.(key);
                }}
                onTabClick={(k, e) => {
                    e.stopPropagation();
                }}
            >
                {tabs.map(({ props, schema, name }) => {
                    if (hiddenKeys.indexOf(name) > -1) {
                        return null;
                    }
                    let tab = null;
                    let _tab = badgedTab(name, props);
                    let { tabItemWrapper } = props;

                    if (typeof tabItemWrapper === "function") {
                        tab = tabItemWrapper(_tab, schema);
                    } else {
                        tab = _tab;
                    }
                    return (
                        <Tabs.TabPane
                            {...props}
                            tab={tab}
                            forceRender
                        >
                            <RecursionField schema={schema} name={name} />
                        </Tabs.TabPane>
                    );
                })}
            </Tabs>
        );
    })
);

FormTab.TabPane = TabPane;

export default FormTab;
