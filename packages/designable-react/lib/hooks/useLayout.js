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

// src/hooks/useLayout.ts
var useLayout_exports = {};
__export(useLayout_exports, {
  useLayout: () => useLayout
});
module.exports = __toCommonJS(useLayout_exports);
var import_react = require("react");
var import_context = require("../context");
var import_shared = require("@designable/shared");
var useLayout = () => {
  return import_shared.globalThisPolyfill["__DESIGNABLE_LAYOUT__"] || (0, import_react.useContext)(import_context.DesignerLayoutContext);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useLayout
});
