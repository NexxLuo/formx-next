"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTree = void 0;
var _useOperation = require("./useOperation");
const useTree = workspaceId => {
  const operation = (0, _useOperation.useOperation)(workspaceId);
  return operation?.tree;
};
exports.useTree = useTree;