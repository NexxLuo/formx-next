import React from "react";
import { Collapse, Row, Divider as AntdDivider } from "antd";
import { useField } from "@formily/react";
import BaseModal from "./modal";
import BaseButton from "./button";

import { withLayoutGrid, withLayoutPane, withLayoutField } from "./shared";

import "@platform/formx-antd/lib/style.css";
import "./style.css";

export { default as FormItem } from "./FormItem";
export { default as AutoComplete } from "./auto-complete";

export { NumberPicker } from "./number-picker";
export { Input } from "./input";

export { TreeSelect } from "./tree-select";
export { Select } from "./select";
export { default as Tab } from "./form-tab";
export { default as Radio } from "./radio";
export { default as ArrayTable } from "./ArrayTable";

export const Button = withLayoutField(BaseButton);

export const Modal = withLayoutPane(BaseModal, true);

export const FieldSet = withLayoutPane(props => {
    let field = useField();
    let panelProps = {};
    if (props.displayTitle === false) {
        panelProps.header = null;
    } else {
        panelProps.header = props.title;
    }

    if (props.readOnly === true || props.readonly === true) {
        panelProps.disabled = true;
    }

    if (props.collapsible === false) {
        panelProps.showArrow = false;
        panelProps.disabled = true;
    }

    let componentProps = {};
    if (props.collapsible && props.activeKey) {
        componentProps.activeKey = props.activeKey;
        componentProps.onChange = keys => {
            field.setComponentProps({ activeKey: keys });
        };
    }

    let clsArr = ["formx-fieldset"];

    if (typeof props.className === "string") {
        clsArr.push(props.className);
    }

    return (
        <Collapse
            expandIconPosition="right"
            defaultActiveKey="pane"
            bordered={true}
            {...componentProps}
            className={clsArr.join(" ")}
        >
            <Collapse.Panel {...panelProps} key="pane">
                <Row type="flex">{props.children}</Row>
            </Collapse.Panel>
        </Collapse>
    );
});

export const Card = withLayoutPane(props => {
    let field = useField();

    let panelProps = {};

    if (props.displayTitle === false) {
        panelProps.header = null;
    } else {
        panelProps.header = props.title;
    }

    let cls = ["formx-card"];

    if (!panelProps.header) {
        panelProps.showArrow = false;
        cls.push("formx-card-without-header");
    }

    if (typeof props.className === "string") {
        cls.push(props.className);
    }

    if (props.collapsible !== true) {
        panelProps.showArrow = false;
        panelProps.disabled = true;
    }

    let componentProps = {};
    if (props.collapsible && props.activeKey) {
        componentProps.activeKey = props.activeKey;
        componentProps.onChange = keys => {
            field.setComponentProps({ activeKey: keys });
        };
    }

    return (
        <Collapse
            expandIconPosition="right"
            defaultActiveKey="pane"
            bordered={true}
            {...componentProps}
            className={cls.join(" ")}
        >
            <Collapse.Panel {...panelProps} key="pane">
                <Row type="flex">{props.children}</Row>
            </Collapse.Panel>
        </Collapse>
    );
});

export const Label = withLayoutField(props => {
    let { content, title, displayTitle, ..._props } = props;
    let text = content ?? title;
    return (
        <span {..._props} title={text} className="formx-label">
            {text}
        </span>
    );
});

export const Grid = withLayoutGrid(props => {
    let { title, displayTitle, className, ...nextProps } = props;
    let cls = ["layout-grid"];
    className && cls.push(className);

    return (
        <div {...nextProps} className={cls.join(" ")}>
            {props.children}
        </div>
    );
});

export const Image = withLayoutField(props => {
    let styles = { maxHeight: "100%", maxWidth: "100%" };
    let layoutStyle = props["layout-style"];
    if (layoutStyle.width) {
        styles.width = layoutStyle.width;
    }
    if (layoutStyle.height) {
        styles.height = layoutStyle.height;
    }
    return (
        <img
            className="formx-image"
            style={styles}
            src={props.src}
            alt={props.title}
        />
    );
}, true);

export const Divider = withLayoutPane(
    props => {
        let text = null;

        if (props.displayTitle === false) {
            text = null;
        } else {
            text = props.title;
        }

        let cls = ["formx-divider"];

        let _type = "horizontal";

        if (props.direction === "vertical") {
            _type = "vertical";
            text = null;
        }

        let componentProps = {
            dashed: false,
            orientation: "left",
            type: _type
        };

        return (
            <AntdDivider {...componentProps} className={cls.join(" ")}>
                {text}
            </AntdDivider>
        );
    },
    true,
    "formx-form-pane-divider"
);
