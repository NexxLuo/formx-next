"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkspacePanel = void 0;
var _react = _interopRequireDefault(require("react"));
var _hooks = require("../hooks");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const WorkspacePanel = props => {
  const prefix = (0, _hooks.usePrefix)('workspace-panel');
  return /*#__PURE__*/_react.default.createElement("div", {
    className: prefix
  }, props.children);
};
exports.WorkspacePanel = WorkspacePanel;
WorkspacePanel.Item = props => {
  const prefix = (0, _hooks.usePrefix)('workspace-panel-item');
  return /*#__PURE__*/_react.default.createElement("div", {
    className: prefix,
    style: {
      ...props.style,
      flexGrow: props.flexable ? 1 : 0,
      flexShrink: props.flexable ? 1 : 0
    }
  }, props.children);
};