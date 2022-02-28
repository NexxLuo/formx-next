import React from "react";
import { Row, Col } from "antd";
import { useField, useFieldSchema } from "@formily/react";

function getLayoutStyle(layoutProps: any = {}) {
    let layoutStyle: any = {};

    let layoutHeight = layoutProps.height ?? { type: "auto" };
    let layoutWidth = layoutProps.width;

    if (typeof layoutHeight === "object" && layoutHeight) {
        if (layoutHeight.type === "const") {
            let _consHeight = Number(layoutHeight.const);
            if (!isNaN(_consHeight)) {
                layoutStyle.height = _consHeight;
            } else {
                layoutStyle.height = "auto";
            }
        } else if (layoutHeight.type === "percent") {
            let _percentHeight = Number(layoutHeight.percent);
            if (!isNaN(_percentHeight)) {
                layoutStyle.height = _percentHeight + "%";
            } else {
                layoutStyle.height = "auto";
            }
        }
    }

    if (typeof layoutWidth === "object" && layoutWidth) {
        if (layoutWidth.type === "const") {
            let _w = Number(layoutWidth.const);
            layoutStyle.width = isNaN(_w) ? "auto" : _w;
        } else if (layoutWidth.type === "percent") {
            let _percentWidth = Number(layoutWidth.percent);
            if (!isNaN(_percentWidth)) {
                layoutStyle.width = _percentWidth + "%";
            }
        } else if (layoutWidth.type === "auto") {
            layoutStyle.width = "auto";
        }
    }
    return layoutStyle;
}

export function withLayoutGrid(FC) {
    return _props => {
        let field = useField();

        let { wrapper, className, ...props } = _props;

        let innerElement: any = null;

        let componentProps = field.componentProps || {};
        let layoutProps = componentProps["x-layout-props"] || {};

        let columnsCount = 1;

        let parent = field.parent;
        let hasParent = false;

        if (parent && parent.componentProps["x-layout-props"]) {
            let parentLayout = parent.componentProps["x-layout-props"];
            columnsCount = parentLayout.columns;
            hasParent = true;
        }

        let span = (24 / columnsCount) * layoutProps.span;

        if (span > 24) {
            span = 24;
        }

        let defaultDirection = hasParent ? "row" : "column";

        let flexDirection = layoutProps.flexDirection ?? "row";
        let justifyContent = layoutProps.justifyContent ?? "flex-start";
        let layoutStyle = getLayoutStyle(layoutProps);
        let innerLayoutstyle: any = {};

        if (flexDirection === "column") {
            innerLayoutstyle.flexDirection = flexDirection;
            innerLayoutstyle.flexWrap = "nowrap";
        } else {
            innerLayoutstyle.flexDirection = flexDirection;
            //水平模式允许自动换行
            innerLayoutstyle.flexWrap = "wrap";
        }

        if (justifyContent) {
            innerLayoutstyle.justifyContent = justifyContent;
        }

        let paneClass = "layout-grid-pane";
        let prevStyles = componentProps.style ?? {};

        let colStyle: any = {};

        if (layoutStyle.width) {
            colStyle.width = layoutStyle.width;
            if (layoutStyle.width === "100%") {
                colStyle.flex = "auto";
            }
        }

        if (layoutStyle.height) {
            colStyle.height = layoutStyle.height;

            if (layoutStyle.height === "100%") {
                colStyle.flex = "auto";
            }
        }

        let newStyle = {
            ...prevStyles,
            ...innerLayoutstyle,
            ...colStyle
        };

        innerElement = (
            <div className={paneClass}>
                <FC {...props} style={newStyle}>
                    {props.children}
                </FC>
            </div>
        );

        if (typeof wrapper === "function") {
            innerElement = wrapper(innerElement);
        }

        if (defaultDirection === "row") {
            let cls = ["layout-grid-col"];
            className && cls.push(className);
            return (
                <Col span={span} className={cls.join(" ")} style={colStyle}>
                    {innerElement}
                </Col>
            );
        } else {
            let cls = ["layout-grid-row"];
            className && cls.push(className);
            return (
                <Row type="flex" className={cls.join(" ")} style={colStyle}>
                    <Col
                        span={span}
                        className="layout-grid-col"
                        style={colStyle}
                    >
                        {innerElement}
                    </Col>
                </Row>
            );
        }
    };
}

export function withLayoutPane(FC, noneLayout = false, className = "") {
    return _props => {
        let field = useField();

        let { wrapper, ...props } = _props;

        let layoutProps = field.componentProps["x-layout-props"] || {};
        let layoutHeight = layoutProps.height ?? { type: "auto" };
        let layoutStyle = {};

        layoutStyle = getLayoutStyle(layoutProps);

        let columnsCount = 1;

        let parent = field.parent;
        let hasParent = false;

        if (parent && parent.componentProps["x-layout-props"]) {
            let parentLayout = parent.componentProps["x-layout-props"];
            columnsCount = parentLayout.columns;
            hasParent = true;
        }

        let span = (24 / columnsCount) * (layoutProps.span || 1);

        if (isNaN(span) || span > 24) {
            span = 24;
        }

        let clsArr: string[] = [];

        if (className) {
            clsArr.push(className);
        }

        if (hasParent) {
            clsArr.push("formx-form-pane");
            clsArr.push("formx-form-pane-nested");
            clsArr.push("formx-item-fill-height");
        } else {
            clsArr.push("formx-form-pane");
            if (layoutHeight.type === "percent") {
                clsArr.push("formx-item-fill-height");
            }
        }

        let paneClass = clsArr.join(" ");

        let innerElement = <FC {...props} />;

        if (typeof wrapper === "function") {
            innerElement = wrapper(innerElement);
        }

        if (noneLayout === true) {
            layoutStyle = {};
        }

        let id = field.path.toString() + "_" + field.form.id;
        if (hasParent) {
            return (
                <Col span={span} style={layoutStyle}>
                    <div className={paneClass} id={id}>
                        {innerElement}
                    </div>
                </Col>
            );
        } else {
            return (
                <Row type="flex">
                    <Col span={span} style={layoutStyle}>
                        <div className={paneClass} id={id}>
                            {innerElement}
                        </div>
                    </Col>
                </Row>
            );
        }
    };
}

export function withLayoutField(FC, noneWrapper = false) {
    return _props => {
        let field = useField();
        let schema: any = useFieldSchema();
        let _noneWrapper = schema.noneWrapper || noneWrapper;
        let { wrapper, ...props } = _props;

        let layoutProps = field.componentProps["x-layout-props"] || {};
        let layoutStyle: React.CSSProperties = {};

        layoutStyle = getLayoutStyle(layoutProps);

        let columnsCount = 1;

        let parent = field.parent;
        let hasParent = false;

        if (parent && parent.componentProps["x-layout-props"]) {
            let parentLayout = parent.componentProps["x-layout-props"];
            columnsCount = parentLayout.columns;
            hasParent = true;
        }

        let span = (24 / columnsCount) * layoutProps.span;
        let hasSpan = true;

        if (isNaN(span)) {
            hasSpan = false;
        }

        if (span > 24) {
            span = 24;
        }

        let innerElement = <FC {...props} layout-style={layoutStyle} />;

        if (typeof wrapper === "function") {
            innerElement = wrapper(innerElement);
        }

        layoutStyle.alignSelf = "center";

        if (
            !_noneWrapper &&
            hasParent &&
            hasSpan &&
            parent.displayName?.toLowerCase() !== "arrayfield"
        ) {
            return (
                <Col span={span} style={layoutStyle}>
                    <div className="formx-item-virtual-field">
                        {innerElement}
                    </div>
                </Col>
            );
        } else {
            return (
                <div className="formx-item-virtual-field">{innerElement}</div>
            );
        }
    };
}
