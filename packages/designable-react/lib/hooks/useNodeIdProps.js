"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useNodeIdProps = void 0;
var _useDesigner = require("./useDesigner");
var _useTreeNode = require("./useTreeNode");
const useNodeIdProps = node => {
  const target = (0, _useTreeNode.useTreeNode)();
  const designer = (0, _useDesigner.useDesigner)();
  return {
    [designer.props.nodeIdAttrName]: node ? node.id : target.id
  };
};
exports.useNodeIdProps = useNodeIdProps;