"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewToolsWidget = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _observer = require("../../observer");
var _IconWidget = require("../IconWidget");
var _hooks = require("../../hooks");
var _classnames = _interopRequireDefault(require("classnames"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-nocheck

const ViewToolsWidget = exports.ViewToolsWidget = (0, _observer.observer)(({
  use,
  style,
  className
}) => {
  const workbench = (0, _hooks.useWorkbench)();
  const prefix = (0, _hooks.usePrefix)('view-tools');
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_antd.Space.Compact, {
    style: style,
    className: (0, _classnames.default)(prefix, className),
    children: [use.includes('DESIGNABLE') && /*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Button, {
      disabled: workbench.type === 'DESIGNABLE',
      onClick: () => {
        workbench.type = 'DESIGNABLE';
      },
      size: "small",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconWidget.IconWidget, {
        infer: "Design"
      })
    }), use.includes('JSONTREE') && /*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Button, {
      disabled: workbench.type === 'JSONTREE',
      onClick: () => {
        workbench.type = 'JSONTREE';
      },
      size: "small",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconWidget.IconWidget, {
        infer: "JSON"
      })
    }), use.includes('MARKUP') && /*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Button, {
      disabled: workbench.type === 'MARKUP',
      onClick: () => {
        workbench.type = 'MARKUP';
      },
      size: "small",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconWidget.IconWidget, {
        infer: "Code"
      })
    }), use.includes('PREVIEW') && /*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Button, {
      disabled: workbench.type === 'PREVIEW',
      onClick: () => {
        workbench.type = 'PREVIEW';
      },
      size: "small",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconWidget.IconWidget, {
        infer: "Play"
      })
    })]
  });
});
ViewToolsWidget.defaultProps = {
  use: ['DESIGNABLE', 'JSONTREE', 'PREVIEW']
};