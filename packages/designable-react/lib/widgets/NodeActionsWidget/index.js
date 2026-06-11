"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeActionsWidget = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _observer = require("../../observer");
var _hooks = require("../../hooks");
var _IconWidget = require("../IconWidget");
var _TextWidget = require("../TextWidget");
var _classnames = _interopRequireDefault(require("classnames"));
require("./styles.less");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-nocheck

const Space = props => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ...props
  });
};
const Typography = props => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ...props
  });
};
Typography.Link = props => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ...props
  });
};
const NodeActionsWidget = exports.NodeActionsWidget = (0, _observer.observer)(props => {
  const node = (0, _hooks.useTreeNode)();
  const prefix = (0, _hooks.usePrefix)('node-actions');
  const selected = (0, _hooks.useSelected)();
  if (selected.indexOf(node.id) === -1 && props.activeShown) return null;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: (0, _classnames.default)(prefix, props.className),
    style: props.style,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: prefix + '-content',
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Space, {
        split: /*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Divider, {
          type: "vertical"
        }),
        children: props.children
      })
    })
  });
});
NodeActionsWidget.Action = ({
  icon,
  title,
  ...props
}) => {
  const prefix = (0, _hooks.usePrefix)('node-actions-item');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Typography.Link, {
    ...props,
    className: (0, _classnames.default)(props.className, prefix),
    "data-click-stop-propagation": "true",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      className: prefix + '-text',
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_IconWidget.IconWidget, {
        infer: icon
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TextWidget.TextWidget, {
        children: title
      })]
    })
  });
};