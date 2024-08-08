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

// src/effects/useSnapshot.tsx
var useSnapshot_exports = {};
__export(useSnapshot_exports, {
  useSnapshot: () => useSnapshot
});
module.exports = __toCommonJS(useSnapshot_exports);
var import_core = require("@formily/core");
var timeRequest = null;
var useSnapshot = (operation) => {
  (0, import_core.onFieldInputValueChange)("*", () => {
    clearTimeout(timeRequest);
    timeRequest = setTimeout(() => {
      operation.snapshot("update:node:props");
    }, 1e3);
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useSnapshot
});
