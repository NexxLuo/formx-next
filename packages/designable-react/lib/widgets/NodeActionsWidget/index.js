"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeActionsWidget = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _reactiveReact = require("@formily/reactive-react");
var _hooks = require("../../hooks");
var _IconWidget = require("../IconWidget");
var _TextWidget = require("../TextWidget");
var _classnames = _interopRequireDefault(require("classnames"));
require("./styles.less");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const Space = props => {
  return /*#__PURE__*/_react.default.createElement("div", props);
};
const Typography = props => {
  return /*#__PURE__*/_react.default.createElement("div", props);
};
Typography.Link = props => {
  return /*#__PURE__*/_react.default.createElement("div", props);
};
const NodeActionsWidget = exports.NodeActionsWidget = (0, _reactiveReact.observer)(props => {
  const node = (0, _hooks.useTreeNode)();
  const prefix = (0, _hooks.usePrefix)('node-actions');
  const selected = (0, _hooks.useSelected)();
  if (selected.indexOf(node.id) === -1 && props.activeShown) return null;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(prefix, props.className),
    style: props.style
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-content'
  }, /*#__PURE__*/_react.default.createElement(Space, {
    split: /*#__PURE__*/_react.default.createElement(_antd.Divider, {
      type: "vertical"
    })
  }, props.children)));
});
NodeActionsWidget.Action = ({
  icon,
  title,
  ...props
}) => {
  const prefix = (0, _hooks.usePrefix)('node-actions-item');
  return /*#__PURE__*/_react.default.createElement(Typography.Link, _extends({}, props, {
    className: (0, _classnames.default)(props.className, prefix),
    "data-click-stop-propagation": "true"
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: prefix + '-text'
  }, /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
    infer: icon
  }), /*#__PURE__*/_react.default.createElement(_TextWidget.TextWidget, null, title)));
};