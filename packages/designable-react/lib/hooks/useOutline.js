"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOutline = void 0;
var _useWorkspace = require("./useWorkspace");
const useOutline = workspaceId => {
  const workspace = (0, _useWorkspace.useWorkspace)(workspaceId);
  return workspace?.outline;
};
exports.useOutline = useOutline;