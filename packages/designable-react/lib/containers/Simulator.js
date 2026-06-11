"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Simulator = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@designable/core");
var _shared = require("@designable/shared");
var _observer = require("../observer");
var _hooks = require("../hooks");
var _simulators = require("../simulators");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Simulator = exports.Simulator = (0, _observer.observer)(props => {
  const screen = (0, _hooks.useScreen)();
  if (screen.type === _core.ScreenType.PC) return /*#__PURE__*/(0, _jsxRuntime.jsx)(_simulators.PCSimulator, {
    ...props,
    children: props.children
  });
  if (screen.type === _core.ScreenType.Mobile) return /*#__PURE__*/(0, _jsxRuntime.jsx)(_simulators.MobileSimulator, {
    ...props,
    children: props.children
  });
  if (screen.type === _core.ScreenType.Responsive) return /*#__PURE__*/(0, _jsxRuntime.jsx)(_simulators.ResponsiveSimulator, {
    ...props,
    children: props.children
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_simulators.PCSimulator, {
    ...props,
    children: props.children
  });
}, {
  scheduler: _shared.requestIdle
});