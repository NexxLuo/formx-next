"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValueInput = void 0;
var _react = _interopRequireDefault(require("react"));
var _PolyInput = require("../PolyInput");
var _antd = require("antd");
var _MonacoInput = require("../MonacoInput");
var _designableReact = require("@platform/designable-react");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } /*
 * 支持文本、数字、布尔、表达式
 * Todo: JSON、富文本，公式
 */
const STARTTAG_REX = /<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
const EXPRESSION_REX = /^\{\{([\s\S]*)\}\}$/;
const isNumber = value => typeof value === 'number';
const isBoolean = value => typeof value === 'boolean';
const isExpression = value => {
  return typeof value === 'string' && EXPRESSION_REX.test(value);
};
const isRichText = value => {
  return typeof value === 'string' && STARTTAG_REX.test(value);
};
const isNormalText = value => {
  return typeof value === 'string' && !isExpression(value) && !isRichText(value);
};
const takeNumber = value => {
  const num = String(value).replace(/[^\d\.]+/, '');
  if (num === '') return;
  return Number(num);
};
const ValueInput = exports.ValueInput = (0, _PolyInput.createPolyInput)([{
  type: 'TEXT',
  icon: 'Text',
  component: _antd.Input,
  checker: isNormalText
}, {
  type: 'EXPRESSION',
  icon: 'Expression',
  component: props => {
    return /*#__PURE__*/_react.default.createElement(_antd.Popover, {
      content: /*#__PURE__*/_react.default.createElement("div", {
        style: {
          width: 400,
          height: 200,
          marginLeft: -16,
          marginRight: -16,
          marginBottom: -12
        }
      }, /*#__PURE__*/_react.default.createElement(_MonacoInput.MonacoInput, _extends({}, props, {
        language: "javascript.expression"
      }))),
      trigger: "click"
    }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      block: true
    }, /*#__PURE__*/_react.default.createElement(_designableReact.TextWidget, {
      token: "SettingComponents.ValueInput.expression"
    })));
  },
  checker: isExpression,
  toInputValue: value => {
    if (!value || value === '{{}}') return;
    const matched = String(value).match(EXPRESSION_REX);
    return matched?.[1] || value || '';
  },
  toChangeValue: value => {
    if (!value || value === '{{}}') return;
    const matched = String(value).match(EXPRESSION_REX);
    return `{{${matched?.[1] || value || ''}}}`;
  }
}, {
  type: 'BOOLEAN',
  icon: 'Boolean',
  component: props => /*#__PURE__*/_react.default.createElement(_antd.Select, _extends({}, props, {
    options: [{
      label: 'True',
      value: true
    }, {
      label: 'False',
      value: false
    }]
  })),
  checker: isBoolean,
  toInputValue: value => {
    return !!value;
  },
  toChangeValue: value => {
    return !!value;
  }
}, {
  type: 'NUMBER',
  icon: 'Number',
  component: _antd.InputNumber,
  checker: isNumber,
  toInputValue: takeNumber,
  toChangeValue: takeNumber
}]);