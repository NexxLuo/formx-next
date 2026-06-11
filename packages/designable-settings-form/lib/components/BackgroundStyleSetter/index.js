"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackgroundStyleSetter = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@formily/react");
var _designableReact = require("@platform/designable-react");
var _formxAntd = require("@platform/formx-antd");
var _FoldItem = require("../FoldItem");
var _ColorInput = require("../ColorInput");
var _SizeInput = require("../SizeInput");
var _ImageInput = require("../ImageInput");
var _InputItems = require("../InputItems");
var _classnames = _interopRequireDefault(require("classnames"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-nocheck

const BackgroundStyleSetter = exports.BackgroundStyleSetter = (0, _react2.observer)(props => {
  const field = (0, _react2.useField)();
  const prefix = (0, _designableReact.usePrefix)('background-style-setter');
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_FoldItem.FoldItem, {
    className: (0, _classnames.default)(prefix, props.className),
    label: field.title,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_FoldItem.FoldItem.Base, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.Field, {
        name: "backgroundColor",
        basePath: field.address.parent(),
        component: [_ColorInput.ColorInput]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FoldItem.FoldItem.Extra, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_InputItems.InputItems, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_InputItems.InputItems.Item, {
          icon: "Image",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.Field, {
            name: "backgroundImage",
            basePath: field.address.parent(),
            component: [_ImageInput.BackgroundImageInput]
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputItems.InputItems.Item, {
          icon: "ImageSize",
          width: "50%",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.Field, {
            name: "backgroundSize",
            basePath: field.address.parent(),
            component: [_SizeInput.BackgroundSizeInput]
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputItems.InputItems.Item, {
          icon: "Repeat",
          width: "50%",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.Field, {
            name: "backgroundRepeat",
            basePath: field.address.parent(),
            component: [_formxAntd.Select, {
              style: {
                width: '100%'
              },
              placeholder: 'Repeat'
            }],
            dataSource: [{
              label: 'No Repeat',
              value: 'no-repeat'
            }, {
              label: 'Repeat',
              value: 'repeat'
            }, {
              label: 'Repeat X',
              value: 'repeat-x'
            }, {
              label: 'Repeat Y',
              value: 'repeat-y'
            }, {
              label: 'Space',
              value: 'space'
            }, {
              label: 'Round',
              value: 'round'
            }]
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputItems.InputItems.Item, {
          icon: "Position",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.Field, {
            name: "backgroundPosition",
            basePath: field.address.parent(),
            component: [_formxAntd.Input, {
              placeholder: 'center center'
            }]
          })
        })]
      })
    })]
  });
});