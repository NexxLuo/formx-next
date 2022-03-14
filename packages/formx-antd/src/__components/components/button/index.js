import React from "react";
import { Button as AntdButton, Icon, Popconfirm } from "antd";

const Button = props => {
    let text = props.title;
    let tooltip = props.tooltip || props.title;
    let {
        displayTitle,
        iconOnly,
        title,
        icon,
        onClick,
        confirmTooltip = "",
        ...otherprops
    } = props;
    if (displayTitle === false) {
        text = null;
    }

    let buttonProps = {};
    if (!confirmTooltip) {
        buttonProps.onClick = onClick;
    }

    let innerElement = null;
    if (iconOnly === true) {
        let iconProps = {};
        if (otherprops.disabled === true) {
            iconProps.style = {
                opacity: 0.6,
                cursor: "not-allowed"
            };
            iconProps.onClick = function () {};
        }

        innerElement = (
            <Icon
                type={icon || "question"}
                {...otherprops}
                {...buttonProps}
                title={tooltip}
                {...iconProps}
            >
                {null}
            </Icon>
        );
    } else {
        innerElement = (
            <AntdButton
                {...otherprops}
                icon={icon}
                {...buttonProps}
                title={tooltip}
            >
                {text}
            </AntdButton>
        );
    }

    if (confirmTooltip) {
        return (
            <Popconfirm
                title={confirmTooltip}
                okText="确定"
                cancelText="取消"
                onConfirm={onClick}
            >
                {innerElement}
            </Popconfirm>
        );
    } else {
        return innerElement;
    }
};

export default Button;
