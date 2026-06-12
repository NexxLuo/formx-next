"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DroppableWidget = void 0;
var _react = _interopRequireWildcard(require("react"));
var _observer = require("../../observer");
var _hooks = require("../../hooks");
var _NodeTitleWidget = require("../NodeTitleWidget");
var _NodeActionsWidget = require("../NodeActionsWidget");
require("./styles.less");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// @ts-nocheck

const DroppableWidget = exports.DroppableWidget = (0, _observer.observer)(({
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    ...nodeId,
    className: className,
    style: style,
    children: [hasChildren ? props.children : placeholder ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        height
      },
      className: "dn-droppable-placeholder",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_NodeTitleWidget.NodeTitleWidget, {
        node: target
      })
    }) : props.children, actions?.length ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_NodeActionsWidget.NodeActionsWidget, {
      children: actions.map((action, key) => /*#__PURE__*/(0, _react.createElement)(_NodeActionsWidget.NodeActionsWidget.Action, {
        ...action,
        key: key
      }))
    }) : null]
  });
});
DroppableWidget.defaultProps = {
  placeholder: true
};