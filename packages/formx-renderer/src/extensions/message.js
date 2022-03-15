import React from "react";
import Notification from "rc-notification";

var prefixCls = "ant-message";
var transitionName = "move-up";
var defaultTop;

let notice = null;

Notification.newInstance(
    {
        prefixCls: prefixCls,
        transitionName: transitionName,
        style: {
            top: defaultTop
        },
        maxCount: 3
    },
    notification => {
        notice = {
            warn: msg => {
                notification.notice({
                    content: (
                        <div className="ant-message-custom-content ant-message-warning">
                            <Icon
                                type="exclamation-circle"
                                theme="filled"
                            ></Icon>
                            <span>{msg}</span>
                        </div>
                    )
                });
            },
            error: msg => {
                notification.notice({
                    content: (
                        <div className="ant-message-custom-content ant-message-error">
                            <Icon type="close-circle" theme="filled"></Icon>
                            <span>{msg}</span>
                        </div>
                    )
                });
            }
        };
    }
);

let api = {
    warn: notice.warn,
    warning: notice.warn,
    error: notice.error
};

export default api;
