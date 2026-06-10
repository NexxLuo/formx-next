"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useViewport = void 0;
var _useWorkspace = require("./useWorkspace");
const useViewport = workspaceId => {
  const workspace = (0, _useWorkspace.useWorkspace)(workspaceId);
  return workspace?.viewport;
};
exports.useViewport = useViewport;