"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOutlineDragon = void 0;

var useOperation_1 = require("./useOperation");

var useOutlineDragon = function useOutlineDragon(workspaceId) {
  var operation = (0, useOperation_1.useOperation)(workspaceId);
  return operation === null || operation === void 0 ? void 0 : operation.outlineDragon;
};

exports.useOutlineDragon = useOutlineDragon;