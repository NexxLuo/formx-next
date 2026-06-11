"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewportPanel = void 0;
var _react = _interopRequireDefault(require("react"));
var _WorkspacePanel = require("./WorkspacePanel");
var _containers = require("../containers");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ViewportPanel = props => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_WorkspacePanel.WorkspacePanel.Item, {
    ...props,
    flexable: true,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_containers.Simulator, {
      children: props.children
    })
  });
};
exports.ViewportPanel = ViewportPanel;