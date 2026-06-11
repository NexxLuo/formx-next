"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragHandler = void 0;
var _react = _interopRequireDefault(require("react"));
var _observer = require("../../observer");
var _IconWidget = require("../IconWidget");
var _hooks = require("../../hooks");
var _antd = require("antd");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-nocheck

const DragHandler = exports.DragHandler = (0, _observer.observer)(({
  node,
  style
}) => {
  const designer = (0, _hooks.useDesigner)();
  const prefix = (0, _hooks.usePrefix)('aux-drag-handler');
  if (node === node.root || !node.allowDrag()) return null;
  const handlerProps = {
    [designer.props.nodeDragHandlerAttrName]: 'true'
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Button, {
    ...handlerProps,
    className: prefix,
    style: style,
    type: "primary",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconWidget.IconWidget, {
      infer: "Move"
    })
  });
});
DragHandler.displayName = 'DragHandler';