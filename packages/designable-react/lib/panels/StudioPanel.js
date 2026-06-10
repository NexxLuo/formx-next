"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StudioPanel = void 0;
var _react = _interopRequireDefault(require("react"));
var _hooks = require("../hooks");
var _containers = require("../containers");
var _classnames = _interopRequireDefault(require("classnames"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const StudioPanelInternal = ({
  logo,
  actions,
  ...props
}) => {
  const prefix = (0, _hooks.usePrefix)('main-panel');
  const position = (0, _hooks.usePosition)();
  const classNameBase = (0, _classnames.default)('root', position, props.className);
  if (logo || actions) {
    return /*#__PURE__*/_react.default.createElement("div", _extends({}, props, {
      className: (0, _classnames.default)(`${prefix}-container`, classNameBase)
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: prefix + '-header'
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: prefix + '-header-logo'
    }, logo), /*#__PURE__*/_react.default.createElement("div", {
      className: prefix + '-header-actions'
    }, actions)), /*#__PURE__*/_react.default.createElement("div", {
      className: prefix
    }, props.children));
  }
  return /*#__PURE__*/_react.default.createElement("div", _extends({}, props, {
    className: (0, _classnames.default)(prefix, classNameBase)
  }), props.children);
};
const StudioPanel = props => {
  return /*#__PURE__*/_react.default.createElement(_containers.Layout, {
    theme: props.theme,
    prefixCls: props.prefixCls,
    position: props.position
  }, /*#__PURE__*/_react.default.createElement(StudioPanelInternal, props));
};
exports.StudioPanel = StudioPanel;