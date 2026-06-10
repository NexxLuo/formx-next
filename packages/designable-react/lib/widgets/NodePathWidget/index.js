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
var _reactiveReact = require("@formily/reactive-react");
require("./styles.less");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const NodePathWidget = exports.NodePathWidget = (0, _reactiveReact.observer)(props => {
  const selected = (0, _hooks.useCurrentNode)(props.workspaceId);
  const selection = (0, _hooks.useSelection)(props.workspaceId);
  const hover = (0, _hooks.useHover)(props.workspaceId);
  const prefix = (0, _hooks.usePrefix)('node-path');
  if (!selected) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
  const maxItems = props.maxItems ?? 3;
  const nodes = selected.getParents().slice(0, maxItems - 1).reverse().concat(selected);
  return /*#__PURE__*/_react.default.createElement(_antd.Breadcrumb, {
    className: prefix
  }, nodes.map((node, key) => {
    return /*#__PURE__*/_react.default.createElement(_antd.Breadcrumb.Item, {
      key: key
    }, key === 0 && /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
      infer: "Position",
      style: {
        marginRight: 3
      }
    }), /*#__PURE__*/_react.default.createElement("a", {
      href: "",
      onMouseEnter: () => {
        hover.setHover(node);
      },
      onClick: e => {
        e.stopPropagation();
        e.preventDefault();
        selection.select(node);
      }
    }, /*#__PURE__*/_react.default.createElement(_NodeTitleWidget.NodeTitleWidget, {
      node: node
    })));
  }));
});