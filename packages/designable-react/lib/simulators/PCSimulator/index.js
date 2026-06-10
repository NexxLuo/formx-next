"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PCSimulator = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _hooks = require("../../hooks");
require("./styles.less");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const PCSimulator = props => {
  const prefix = (0, _hooks.usePrefix)('pc-simulator');
  return /*#__PURE__*/_react.default.createElement("div", _extends({}, props, {
    className: (0, _classnames.default)(prefix, props.className)
  }), props.children);
};
exports.PCSimulator = PCSimulator;