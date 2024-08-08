"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Workbench = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactiveReact = require("@formily/reactive-react");
var _hooks = require("../hooks");
var _Workspace = require("./Workspace");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Workbench = exports.Workbench = (0, _reactiveReact.observer)(props => {
  const workbench = (0, _hooks.useWorkbench)();
  return /*#__PURE__*/_react.default.createElement(_Workspace.Workspace, {
    id: workbench.currentWorkspace?.id
  }, props.children);
});