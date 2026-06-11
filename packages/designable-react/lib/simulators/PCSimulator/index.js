"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PCSimulator = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _hooks = require("../../hooks");
require("./styles.less");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const PCSimulator = props => {
  const prefix = (0, _hooks.usePrefix)('pc-simulator');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ...props,
    className: (0, _classnames.default)(prefix, props.className),
    children: props.children
  });
};
exports.PCSimulator = PCSimulator;