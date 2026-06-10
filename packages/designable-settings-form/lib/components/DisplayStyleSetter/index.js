"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DisplayStyleSetter = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@formily/react");
var _formxAntd = require("@platform/formx-antd");
var _antd = require("antd");
var _designableReact = require("@platform/designable-react");
var _FlexStyleSetter = require("../FlexStyleSetter");
var _classnames = _interopRequireDefault(require("classnames"));
require("./styles.less");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const DisplayStyleSetter = exports.DisplayStyleSetter = (0, _react2.observer)(props => {
  const field = (0, _react2.useField)();
  const prefix = (0, _designableReact.usePrefix)('display-style-setter');
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_formxAntd.FormItem.BaseItem, {
    label: field.title,
    className: (0, _classnames.default)(prefix, props.className),
    style: props.style
  }, /*#__PURE__*/_react.default.createElement(_antd.Radio.Group, {
    className: prefix + '-radio',
    options: [{
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "DisplayBlock",
        size: 16
      }),
      value: 'block'
    }, {
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "DisplayInlineBlock",
        size: 16
      }),
      value: 'inline-block'
    }, {
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "DisplayInline",
        size: 16
      }),
      value: 'inline'
    }, {
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "DisplayFlex",
        size: 16
      }),
      value: 'flex'
    }],
    value: props.value,
    onChange: e => {
      props.onChange?.(e.target.value);
    }
  })), /*#__PURE__*/_react.default.createElement(_react2.Field, {
    name: "flex",
    basePath: field.address.parent(),
    visible: false,
    reactions: flexField => {
      flexField.visible = field.value === 'flex';
    },
    component: [_FlexStyleSetter.FlexStyleSetter]
  }));
});