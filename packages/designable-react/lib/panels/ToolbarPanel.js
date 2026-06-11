"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolbarPanel = void 0;
var _react = _interopRequireDefault(require("react"));
var _WorkspacePanel = require("./WorkspacePanel");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ToolbarPanel = props => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_WorkspacePanel.WorkspacePanel.Item, {
    ...props,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 4,
      padding: '0 4px',
      ...props.style
    },
    children: props.children
  });
};
exports.ToolbarPanel = ToolbarPanel;