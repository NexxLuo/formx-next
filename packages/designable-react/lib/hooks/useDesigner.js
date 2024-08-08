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

// src/hooks/useDesigner.ts
var useDesigner_exports = {};
__export(useDesigner_exports, {
  useDesigner: () => useDesigner
});
module.exports = __toCommonJS(useDesigner_exports);
var import_react = require("react");
var import_context = require("../context");
var import_shared = require("@designable/shared");
var useDesigner = (effects) => {
  const designer = import_shared.globalThisPolyfill["__DESIGNABLE_ENGINE__"] || (0, import_react.useContext)(import_context.DesignerEngineContext);
  console.log("designer:", designer == null ? void 0 : designer.id);
  (0, import_react.useEffect)(() => {
    if ((0, import_shared.isFn)(effects)) {
      return effects(designer);
    }
  }, []);
  return designer;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useDesigner
});
