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

// src/hooks/usePosition.ts
var usePosition_exports = {};
__export(usePosition_exports, {
  usePosition: () => usePosition
});
module.exports = __toCommonJS(usePosition_exports);
var import_useLayout = require("./useLayout");
var usePosition = () => {
  var _a;
  return (_a = (0, import_useLayout.useLayout)()) == null ? void 0 : _a.position;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  usePosition
});
