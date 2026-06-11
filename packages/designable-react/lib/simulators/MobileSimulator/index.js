"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MobileSimulator = void 0;
var _react = _interopRequireDefault(require("react"));
var _body = require("./body");
var _hooks = require("../../hooks");
var _classnames = _interopRequireDefault(require("classnames"));
require("./styles.less");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MobileSimulator = props => {
  const prefix = (0, _hooks.usePrefix)('mobile-simulator');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ...props,
    className: (0, _classnames.default)(prefix, props.className),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: prefix + '-content',
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_body.MobileBody, {
        children: props.children
      })
    })
  });
};
exports.MobileSimulator = MobileSimulator;