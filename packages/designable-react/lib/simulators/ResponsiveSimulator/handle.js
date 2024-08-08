"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResizeHandleType = exports.ResizeHandle = void 0;
var _react = _interopRequireDefault(require("react"));
var _hooks = require("../../hooks");
var _classnames = _interopRequireDefault(require("classnames"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
let ResizeHandleType = exports.ResizeHandleType = /*#__PURE__*/function (ResizeHandleType) {
  ResizeHandleType["Resize"] = "RESIZE";
  ResizeHandleType["ResizeWidth"] = "RESIZE_WIDTH";
  ResizeHandleType["ResizeHeight"] = "RESIZE_HEIGHT";
  return ResizeHandleType;
}({});
const ResizeHandle = props => {
  const prefix = (0, _hooks.usePrefix)('resize-handle');
  return /*#__PURE__*/_react.default.createElement("div", _extends({}, props, {
    "data-designer-resize-handle": props.type,
    className: (0, _classnames.default)(prefix, {
      [`${prefix}-${props.type}`]: !!props.type
    })
  }), props.children);
};
exports.ResizeHandle = ResizeHandle;