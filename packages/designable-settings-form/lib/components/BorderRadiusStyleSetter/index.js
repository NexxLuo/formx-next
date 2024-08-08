"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BorderRadiusStyleSetter = void 0;
var _react = _interopRequireDefault(require("react"));
var _designableReact = require("@platform/designable-react");
var _BoxStyleSetter = require("../BoxStyleSetter");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const BorderRadiusStyleSetter = props => {
  return /*#__PURE__*/_react.default.createElement(_BoxStyleSetter.BoxStyleSetter, _extends({}, props, {
    labels: [/*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
      infer: "TopLeft",
      size: 16,
      key: "1"
    }), /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
      infer: "TopRight",
      size: 16,
      key: "2"
    }), /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
      infer: "BottomRight",
      size: 16,
      key: "3"
    }), /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
      infer: "BottomLeft",
      size: 16,
      key: "4"
    })]
  }));
};
exports.BorderRadiusStyleSetter = BorderRadiusStyleSetter;