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

// src/hooks/useWorkspace.ts
var useWorkspace_exports = {};
__export(useWorkspace_exports, {
  useWorkspace: () => useWorkspace
});
module.exports = __toCommonJS(useWorkspace_exports);
var import_react = require("react");
var import_useDesigner = require("./useDesigner");
var import_context = require("../context");
var import_shared = require("@designable/shared");
var useWorkspace = (id) => {
  var _a;
  const designer = (0, import_useDesigner.useDesigner)();
  const workspaceId = id || ((_a = (0, import_react.useContext)(import_context.WorkspaceContext)) == null ? void 0 : _a.id);
  if (workspaceId) {
    return designer.workbench.findWorkspaceById(workspaceId);
  }
  if (import_shared.globalThisPolyfill["__DESIGNABLE_WORKSPACE__"])
    return import_shared.globalThisPolyfill["__DESIGNABLE_WORKSPACE__"];
  return designer.workbench.currentWorkspace;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useWorkspace
});
