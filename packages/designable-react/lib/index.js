var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
module.exports = __toCommonJS(src_exports);
var import_locales = require("./locales");
var import_theme = require("./theme.less");
__reExport(src_exports, require("./panels"), module.exports);
__reExport(src_exports, require("./widgets"), module.exports);
__reExport(src_exports, require("./context"), module.exports);
__reExport(src_exports, require("./hooks"), module.exports);
__reExport(src_exports, require("./containers"), module.exports);
__reExport(src_exports, require("./simulators"), module.exports);
__reExport(src_exports, require("./types"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./panels"),
  ...require("./widgets"),
  ...require("./context"),
  ...require("./hooks"),
  ...require("./containers"),
  ...require("./simulators"),
  ...require("./types")
});
