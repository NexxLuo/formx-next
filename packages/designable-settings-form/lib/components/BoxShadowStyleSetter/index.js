"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoxShadowStyleSetter = void 0;
var _react = _interopRequireDefault(require("react"));
var _designableReact = require("@platform/designable-react");
var _react2 = require("@formily/react");
var _FoldItem = require("../FoldItem");
var _ColorInput = require("../ColorInput");
var _SizeInput = require("../SizeInput");
var _InputItems = require("../InputItems");
var _classnames = _interopRequireDefault(require("classnames"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const BoxShadowStyleSetter = exports.BoxShadowStyleSetter = (0, _react2.observer)(props => {
  const field = (0, _react2.useField)();
  const prefix = (0, _designableReact.usePrefix)('shadow-style-setter');
  const createBoxShadowConnector = position => {
    const splited = String(props.value || '').trim().split(' ');
    return {
      value: splited[position],
      onChange: value => {
        splited[position] = value;
        props.onChange?.(`${splited[0] || ''} ${splited[1] || ''} ${splited[2] || ''} ${splited[3] || ''} ${splited[4] || ''}`);
      }
    };
  };
  return /*#__PURE__*/_react.default.createElement(_FoldItem.FoldItem, {
    className: (0, _classnames.default)(prefix, props.className),
    style: props.style,
    label: field.title
  }, /*#__PURE__*/_react.default.createElement(_FoldItem.FoldItem.Base, null, /*#__PURE__*/_react.default.createElement(_ColorInput.ColorInput, createBoxShadowConnector(4))), /*#__PURE__*/_react.default.createElement(_FoldItem.FoldItem.Extra, null, /*#__PURE__*/_react.default.createElement(_InputItems.InputItems, {
    width: "50%"
  }, /*#__PURE__*/_react.default.createElement(_InputItems.InputItems.Item, {
    icon: "AxisX"
  }, /*#__PURE__*/_react.default.createElement(_SizeInput.SizeInput, _extends({
    exclude: ['inherit', 'auto']
  }, createBoxShadowConnector(0)))), /*#__PURE__*/_react.default.createElement(_InputItems.InputItems.Item, {
    icon: "AxisY"
  }, /*#__PURE__*/_react.default.createElement(_SizeInput.SizeInput, _extends({
    exclude: ['inherit', 'auto']
  }, createBoxShadowConnector(1)))), /*#__PURE__*/_react.default.createElement(_InputItems.InputItems.Item, {
    icon: "Blur"
  }, /*#__PURE__*/_react.default.createElement(_SizeInput.SizeInput, _extends({
    exclude: ['inherit', 'auto']
  }, createBoxShadowConnector(2)))), /*#__PURE__*/_react.default.createElement(_InputItems.InputItems.Item, {
    icon: "Shadow"
  }, /*#__PURE__*/_react.default.createElement(_SizeInput.SizeInput, _extends({
    exclude: ['inherit', 'auto']
  }, createBoxShadowConnector(3)))))));
});