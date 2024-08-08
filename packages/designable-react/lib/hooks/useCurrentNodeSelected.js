"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCurrentNodeSelected = void 0;
var _useCurrentNode = require("./useCurrentNode");
var _useSelected = require("./useSelected");
const useCurrentNodeSelected = () => {
  const node = (0, _useCurrentNode.useCurrentNode)();
  const selected = (0, _useSelected.useSelected)();
  return selected.length === 1 && node.id === selected[0];
};
exports.useCurrentNodeSelected = useCurrentNodeSelected;