"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTreeNode = void 0;
var _react = require("react");
var _context = require("../context");
const useTreeNode = () => {
  return (0, _react.useContext)(_context.TreeNodeContext);
};
exports.useTreeNode = useTreeNode;