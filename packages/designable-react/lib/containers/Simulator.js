"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Simulator = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@designable/core");
var _shared = require("@designable/shared");
var _reactiveReact = require("@formily/reactive-react");
var _hooks = require("../hooks");
var _simulators = require("../simulators");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Simulator = exports.Simulator = (0, _reactiveReact.observer)(props => {
  const screen = (0, _hooks.useScreen)();
  if (screen.type === _core.ScreenType.PC) return /*#__PURE__*/_react.default.createElement(_simulators.PCSimulator, props, props.children);
  if (screen.type === _core.ScreenType.Mobile) return /*#__PURE__*/_react.default.createElement(_simulators.MobileSimulator, props, props.children);
  if (screen.type === _core.ScreenType.Responsive) return /*#__PURE__*/_react.default.createElement(_simulators.ResponsiveSimulator, props, props.children);
  return /*#__PURE__*/_react.default.createElement(_simulators.PCSimulator, props, props.children);
}, {
  scheduler: _shared.requestIdle
});