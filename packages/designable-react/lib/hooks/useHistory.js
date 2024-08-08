"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useHistory = void 0;
var _useWorkspace = require("./useWorkspace");
const useHistory = workspaceId => {
  const workspace = (0, _useWorkspace.useWorkspace)(workspaceId);
  return workspace?.history;
};
exports.useHistory = useHistory;