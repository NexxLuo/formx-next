"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StudioPanel = void 0;
var _react = _interopRequireDefault(require("react"));
var _hooks = require("../hooks");
var _containers = require("../containers");
var _classnames = _interopRequireDefault(require("classnames"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const StudioPanelInternal = ({
  logo,
  actions,
  ...props
}) => {
  const prefix = (0, _hooks.usePrefix)('main-panel');
  const position = (0, _hooks.usePosition)();
  const classNameBase = (0, _classnames.default)('root', position, props.className);
  if (logo || actions) {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      ...props,
      className: (0, _classnames.default)(`${prefix}-container`, classNameBase),
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: prefix + '-header',
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: prefix + '-header-logo',
          children: logo
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: prefix + '-header-actions',
          children: actions
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: prefix,
        children: props.children
      })]
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ...props,
    className: (0, _classnames.default)(prefix, classNameBase),
    children: props.children
  });
};
const StudioPanel = props => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_containers.Layout, {
    theme: props.theme,
    prefixCls: props.prefixCls,
    position: props.position,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(StudioPanelInternal, {
      ...props
    })
  });
};
exports.StudioPanel = StudioPanel;