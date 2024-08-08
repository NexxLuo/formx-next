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

// src/hooks/useTreeNode.ts
var useTreeNode_exports = {};
__export(useTreeNode_exports, {
  useTreeNode: () => useTreeNode
});
module.exports = __toCommonJS(useTreeNode_exports);
var import_react = require("react");
var import_context = require("../context");
var useTreeNode = () => {
  return (0, import_react.useContext)(import_context.TreeNodeContext);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useTreeNode
});
