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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const MobileSimulator = props => {
  const prefix = (0, _hooks.usePrefix)('mobile-simulator');
  return /*#__PURE__*/_react.default.createElement("div", _extends({}, props, {
    className: (0, _classnames.default)(prefix, props.className)
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-content'
  }, /*#__PURE__*/_react.default.createElement(_body.MobileBody, null, props.children)));
};
exports.MobileSimulator = MobileSimulator;