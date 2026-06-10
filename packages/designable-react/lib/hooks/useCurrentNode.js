"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCurrentNode = void 0;
var _useSelected = require("./useSelected");
var _useTree = require("./useTree");
const useCurrentNode = workspaceId => {
  const selected = (0, _useSelected.useSelected)(workspaceId);
  const tree = (0, _useTree.useTree)(workspaceId);
  return tree?.findById?.(selected[0]);
};
exports.useCurrentNode = useCurrentNode;