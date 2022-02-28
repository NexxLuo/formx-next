"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _rcNotification = _interopRequireDefault(require("rc-notification"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixCls = "ant-message";
var transitionName = "move-up";
var defaultTop;
var notice = null;

_rcNotification.default.newInstance({
  prefixCls: prefixCls,
  transitionName: transitionName,
  style: {
    top: defaultTop
  },
  maxCount: 3
}, function (notification) {
  notice = {
    warn: function warn(msg) {
      notification.notice({
        content: /*#__PURE__*/_react.default.createElement("div", {
          className: "ant-message-custom-content ant-message-warning"
        }, /*#__PURE__*/_react.default.createElement(_antd.Icon, {
          type: "exclamation-circle",
          theme: "filled"
        }), /*#__PURE__*/_react.default.createElement("span", null, msg))
      });
    },
    error: function error(msg) {
      notification.notice({
        content: /*#__PURE__*/_react.default.createElement("div", {
          className: "ant-message-custom-content ant-message-error"
        }, /*#__PURE__*/_react.default.createElement(_antd.Icon, {
          type: "close-circle",
          theme: "filled"
        }), /*#__PURE__*/_react.default.createElement("span", null, msg))
      });
    }
  };
});

var api = {
  warn: notice.warn,
  warning: notice.warn,
  error: notice.error
};
var _default = api;
exports.default = _default;