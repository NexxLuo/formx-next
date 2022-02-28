"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCurrentNodeSelected = void 0;

var useCurrentNode_1 = require("./useCurrentNode");

var useSelected_1 = require("./useSelected");

var useCurrentNodeSelected = function useCurrentNodeSelected() {
  var node = (0, useCurrentNode_1.useCurrentNode)();
  var selected = (0, useSelected_1.useSelected)();
  return selected.length === 1 && node.id === selected[0];
};

exports.useCurrentNodeSelected = useCurrentNodeSelected;