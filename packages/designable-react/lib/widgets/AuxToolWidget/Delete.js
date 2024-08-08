"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Delete = void 0;
var _react = _interopRequireDefault(require("react"));
var _IconWidget = require("../IconWidget");
var _hooks = require("../../hooks");
var _antd = require("antd");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Delete = ({
  node,
  style
}) => {
  const operation = (0, _hooks.useOperation)();
  const prefix = (0, _hooks.usePrefix)('aux-copy');
  if (node === node.root) return null;
  return /*#__PURE__*/_react.default.createElement(_antd.Button, {
    className: prefix,
    style: style,
    type: "primary",
    onClick: () => {
      operation.removeNodes([node]);
    }
  }, /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
    infer: "Remove"
  }));
};
exports.Delete = Delete;
Delete.displayName = 'Delete';