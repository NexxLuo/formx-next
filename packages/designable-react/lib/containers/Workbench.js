"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Workbench = void 0;
var _react = _interopRequireDefault(require("react"));
var _observer = require("../observer");
var _hooks = require("../hooks");
var _Workspace = require("./Workspace");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Workbench = exports.Workbench = (0, _observer.observer)(props => {
  const workbench = (0, _hooks.useWorkbench)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Workspace.Workspace, {
    id: workbench.currentWorkspace?.id,
    children: props.children
  });
});