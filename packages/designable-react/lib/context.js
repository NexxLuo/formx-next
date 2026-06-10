"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkspaceContext = exports.TreeNodeContext = exports.DesignerLayoutContext = exports.DesignerEngineContext = exports.DesignerComponentsContext = void 0;
var _react = require("react");
const DesignerComponentsContext = exports.DesignerComponentsContext = /*#__PURE__*/(0, _react.createContext)({});
const DesignerLayoutContext = exports.DesignerLayoutContext = /*#__PURE__*/(0, _react.createContext)(null);
const DesignerEngineContext = exports.DesignerEngineContext = /*#__PURE__*/(0, _react.createContext)(null);
const TreeNodeContext = exports.TreeNodeContext = /*#__PURE__*/(0, _react.createContext)(null);
const WorkspaceContext = exports.WorkspaceContext = /*#__PURE__*/(0, _react.createContext)(null);