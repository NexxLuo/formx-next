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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const BackgroundStyleSetter = exports.BackgroundStyleSetter = (0, _react2.observer)(props => {
  const field = (0, _react2.useField)();
  const prefix = (0, _designableReact.usePrefix)('background-style-setter');
  return /*#__PURE__*/_react.default.createElement(_FoldItem.FoldItem, {
    className: (0, _classnames.default)(prefix, props.className),
    label: field.title
  }, /*#__PURE__*/_react.default.createElement(_FoldItem.FoldItem.Base, null, /*#__PURE__*/_react.default.createElement(_react2.Field, {
    name: "backgroundColor",
    basePath: field.address.parent(),
    component: [_ColorInput.ColorInput]
  })), /*#__PURE__*/_react.default.createElement(_FoldItem.FoldItem.Extra, null, /*#__PURE__*/_react.default.createElement(_InputItems.InputItems, null, /*#__PURE__*/_react.default.createElement(_InputItems.InputItems.Item, {
    icon: "Image"
  }, /*#__PURE__*/_react.default.createElement(_react2.Field, {
    name: "backgroundImage",
    basePath: field.address.parent(),
    component: [_ImageInput.BackgroundImageInput]
  })), /*#__PURE__*/_react.default.createElement(_InputItems.InputItems.Item, {
    icon: "ImageSize",
    width: "50%"
  }, /*#__PURE__*/_react.default.createElement(_react2.Field, {
    name: "backgroundSize",
    basePath: field.address.parent(),
    component: [_SizeInput.BackgroundSizeInput]
  })), /*#__PURE__*/_react.default.createElement(_InputItems.InputItems.Item, {
    icon: "Repeat",
    width: "50%"
  }, /*#__PURE__*/_react.default.createElement(_react2.Field, {
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
  })), /*#__PURE__*/_react.default.createElement(_InputItems.InputItems.Item, {
    icon: "Position"
  }, /*#__PURE__*/_react.default.createElement(_react2.Field, {
    name: "backgroundPosition",
    basePath: field.address.parent(),
    component: [_formxAntd.Input, {
      placeholder: 'center center'
    }]
  })))));
});