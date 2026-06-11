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
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-nocheck

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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_FoldItem.FoldItem, {
    className: (0, _classnames.default)(prefix, props.className),
    style: props.style,
    label: field.title,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_FoldItem.FoldItem.Base, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ColorInput.ColorInput, {
        ...createBoxShadowConnector(4)
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FoldItem.FoldItem.Extra, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_InputItems.InputItems, {
        width: "50%",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_InputItems.InputItems.Item, {
          icon: "AxisX",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SizeInput.SizeInput, {
            exclude: ['inherit', 'auto'],
            ...createBoxShadowConnector(0)
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputItems.InputItems.Item, {
          icon: "AxisY",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SizeInput.SizeInput, {
            exclude: ['inherit', 'auto'],
            ...createBoxShadowConnector(1)
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputItems.InputItems.Item, {
          icon: "Blur",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SizeInput.SizeInput, {
            exclude: ['inherit', 'auto'],
            ...createBoxShadowConnector(2)
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputItems.InputItems.Item, {
          icon: "Shadow",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SizeInput.SizeInput, {
            exclude: ['inherit', 'auto'],
            ...createBoxShadowConnector(3)
          })
        })]
      })
    })]
  });
});