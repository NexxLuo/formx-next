"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOperation = void 0;
var _useWorkspace = require("./useWorkspace");
const useOperation = workspaceId => {
  const workspace = (0, _useWorkspace.useWorkspace)(workspaceId);
  return workspace?.operation;
};
exports.useOperation = useOperation;