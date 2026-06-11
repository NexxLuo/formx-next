"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BorderRadiusStyleSetter = void 0;
var _react = _interopRequireDefault(require("react"));
var _designableReact = require("@platform/designable-react");
var _BoxStyleSetter = require("../BoxStyleSetter");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const BorderRadiusStyleSetter = props => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_BoxStyleSetter.BoxStyleSetter, {
    ...props,
    labels: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designableReact.IconWidget, {
      infer: "TopLeft",
      size: 16
    }, "1"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designableReact.IconWidget, {
      infer: "TopRight",
      size: 16
    }, "2"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designableReact.IconWidget, {
      infer: "BottomRight",
      size: 16
    }, "3"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designableReact.IconWidget, {
      infer: "BottomLeft",
      size: 16
    }, "4")]
  });
};
exports.BorderRadiusStyleSetter = BorderRadiusStyleSetter;