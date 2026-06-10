"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragHandler = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactiveReact = require("@formily/reactive-react");
var _IconWidget = require("../IconWidget");
var _hooks = require("../../hooks");
var _antd = require("antd");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const DragHandler = exports.DragHandler = (0, _reactiveReact.observer)(({
  node,
  style
}) => {
  const designer = (0, _hooks.useDesigner)();
  const prefix = (0, _hooks.usePrefix)('aux-drag-handler');
  if (node === node.root || !node.allowDrag()) return null;
  const handlerProps = {
    [designer.props.nodeDragHandlerAttrName]: 'true'
  };
  return /*#__PURE__*/_react.default.createElement(_antd.Button, _extends({}, handlerProps, {
    className: prefix,
    style: style,
    type: "primary"
  }), /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
    infer: "Move"
  }));
});
DragHandler.displayName = 'DragHandler';