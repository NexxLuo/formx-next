"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDragon = void 0;
var _useOperation = require("./useOperation");
const useDragon = workspaceId => {
  const operation = (0, _useOperation.useOperation)(workspaceId);
  return operation?.viewportDragon;
};
exports.useDragon = useDragon;