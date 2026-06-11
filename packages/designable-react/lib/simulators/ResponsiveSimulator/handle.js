"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResizeHandleType = exports.ResizeHandle = void 0;
var _react = _interopRequireDefault(require("react"));
var _hooks = require("../../hooks");
var _classnames = _interopRequireDefault(require("classnames"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let ResizeHandleType = exports.ResizeHandleType = /*#__PURE__*/function (ResizeHandleType) {
  ResizeHandleType["Resize"] = "RESIZE";
  ResizeHandleType["ResizeWidth"] = "RESIZE_WIDTH";
  ResizeHandleType["ResizeHeight"] = "RESIZE_HEIGHT";
  return ResizeHandleType;
}({});
const ResizeHandle = props => {
  const prefix = (0, _hooks.usePrefix)('resize-handle');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ...props,
    "data-designer-resize-handle": props.type,
    className: (0, _classnames.default)(prefix, {
      [`${prefix}-${props.type}`]: !!props.type
    }),
    children: props.children
  });
};
exports.ResizeHandle = ResizeHandle;