var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/hooks/useNodeIdProps.ts
var useNodeIdProps_exports = {};
__export(useNodeIdProps_exports, {
  useNodeIdProps: () => useNodeIdProps
});
module.exports = __toCommonJS(useNodeIdProps_exports);
var import_useDesigner = require("./useDesigner");
var import_useTreeNode = require("./useTreeNode");
var useNodeIdProps = (node) => {
  const target = (0, import_useTreeNode.useTreeNode)();
  const designer = (0, import_useDesigner.useDesigner)();
  return {
    [designer.props.nodeIdAttrName]: node ? node.id : target.id
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useNodeIdProps
});
