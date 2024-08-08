"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOutlineDragon = void 0;
var _useOperation = require("./useOperation");
const useOutlineDragon = workspaceId => {
  const operation = (0, _useOperation.useOperation)(workspaceId);
  return operation?.outlineDragon;
};
exports.useOutlineDragon = useOutlineDragon;