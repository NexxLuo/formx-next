"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSelection = void 0;
var _useOperation = require("./useOperation");
const useSelection = workspaceId => {
  const operation = (0, _useOperation.useOperation)(workspaceId);
  return operation?.selection;
};
exports.useSelection = useSelection;