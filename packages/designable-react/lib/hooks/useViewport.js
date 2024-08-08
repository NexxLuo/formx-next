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

// src/hooks/useViewport.ts
var useViewport_exports = {};
__export(useViewport_exports, {
  useViewport: () => useViewport
});
module.exports = __toCommonJS(useViewport_exports);
var import_useWorkspace = require("./useWorkspace");
var useViewport = (workspaceId) => {
  const workspace = (0, import_useWorkspace.useWorkspace)(workspaceId);
  return workspace == null ? void 0 : workspace.viewport;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useViewport
});
