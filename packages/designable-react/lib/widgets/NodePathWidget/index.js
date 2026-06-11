"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodePathWidget = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _hooks = require("../../hooks");
var _IconWidget = require("../IconWidget");
var _NodeTitleWidget = require("../NodeTitleWidget");
var _observer = require("../../observer");
require("./styles.less");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-nocheck

const NodePathWidget = exports.NodePathWidget = (0, _observer.observer)(props => {
  const selected = (0, _hooks.useCurrentNode)(props.workspaceId);
  const selection = (0, _hooks.useSelection)(props.workspaceId);
  const hover = (0, _hooks.useHover)(props.workspaceId);
  const prefix = (0, _hooks.usePrefix)('node-path');
  if (!selected) return /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.default.Fragment, {});
  const maxItems = props.maxItems ?? 3;
  const nodes = selected.getParents().slice(0, maxItems - 1).reverse().concat(selected);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Breadcrumb, {
    className: prefix,
    children: nodes.map((node, key) => {
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_antd.Breadcrumb.Item, {
        children: [key === 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconWidget.IconWidget, {
          infer: "Position",
          style: {
            marginRight: 3
          }
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
          href: "",
          onMouseEnter: () => {
            hover.setHover(node);
          },
          onClick: e => {
            e.stopPropagation();
            e.preventDefault();
            selection.select(node);
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_NodeTitleWidget.NodeTitleWidget, {
            node: node
          })
        })]
      }, key);
    })
  });
});