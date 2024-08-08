"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DroppableWidget = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactiveReact = require("@formily/reactive-react");
var _hooks = require("../../hooks");
var _NodeTitleWidget = require("../NodeTitleWidget");
var _NodeActionsWidget = require("../NodeActionsWidget");
require("./styles.less");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const DroppableWidget = exports.DroppableWidget = (0, _reactiveReact.observer)(({
  node,
  actions,
  height,
  placeholder,
  style,
  className,
  hasChildren: hasChildrenProp,
  ...props
}) => {
  const currentNode = (0, _hooks.useTreeNode)();
  const nodeId = (0, _hooks.useNodeIdProps)(node);
  const target = node ?? currentNode;
  const hasChildren = hasChildrenProp ?? target.children?.length > 0;
  return /*#__PURE__*/_react.default.createElement("div", _extends({}, nodeId, {
    className: className,
    style: style
  }), hasChildren ? props.children : placeholder ? /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height
    },
    className: "dn-droppable-placeholder"
  }, /*#__PURE__*/_react.default.createElement(_NodeTitleWidget.NodeTitleWidget, {
    node: target
  })) : props.children, actions?.length ? /*#__PURE__*/_react.default.createElement(_NodeActionsWidget.NodeActionsWidget, null, actions.map((action, key) => /*#__PURE__*/_react.default.createElement(_NodeActionsWidget.NodeActionsWidget.Action, _extends({}, action, {
    key: key
  })))) : null);
});
DroppableWidget.defaultProps = {
  placeholder: true
};