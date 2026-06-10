"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useHover = void 0;
var _useOperation = require("./useOperation");
const useHover = workspaceId => {
  const operation = (0, _useOperation.useOperation)(workspaceId);
  return operation?.hover;
};
exports.useHover = useHover;