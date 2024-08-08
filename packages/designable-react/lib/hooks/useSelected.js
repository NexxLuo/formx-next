"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSelected = void 0;
var _useSelection = require("./useSelection");
const useSelected = workspaceId => {
  const selection = (0, _useSelection.useSelection)(workspaceId);
  return selection?.selected || [];
};
exports.useSelected = useSelected;