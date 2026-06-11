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
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
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
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Popover, {
      content: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          width: 400,
          height: 200,
          marginLeft: -16,
          marginRight: -16,
          marginBottom: -12
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_MonacoInput.MonacoInput, {
          ...props,
          language: "javascript.expression"
        })
      }),
      trigger: "click",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Button, {
        block: true,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_designableReact.TextWidget, {
          token: "SettingComponents.ValueInput.expression"
        })
      })
    });
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
  component: props => /*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Select, {
    ...props,
    options: [{
      label: 'True',
      value: true
    }, {
      label: 'False',
      value: false
    }]
  }),
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