"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWorkspace = void 0;
var _react = require("react");
var _useDesigner = require("./useDesigner");
var _context = require("../context");
var _shared = require("@designable/shared");
const useWorkspace = id => {
  const designer = (0, _useDesigner.useDesigner)();
  const workspaceId = id || (0, _react.useContext)(_context.WorkspaceContext)?.id;
  if (workspaceId) {
    return designer.workbench.findWorkspaceById(workspaceId);
  }
  if (_shared.globalThisPolyfill['__DESIGNABLE_WORKSPACE__']) return _shared.globalThisPolyfill['__DESIGNABLE_WORKSPACE__'];
  return designer.workbench.currentWorkspace;
};
exports.useWorkspace = useWorkspace;