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

// src/containers/index.ts
var containers_exports = {};
module.exports = __toCommonJS(containers_exports);
var import_styles = require("./styles.less");
__reExport(containers_exports, require("./Layout"), module.exports);
__reExport(containers_exports, require("./Designer"), module.exports);
__reExport(containers_exports, require("./Workspace"), module.exports);
__reExport(containers_exports, require("./Simulator"), module.exports);
__reExport(containers_exports, require("./Viewport"), module.exports);
__reExport(containers_exports, require("./Workbench"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./Layout"),
  ...require("./Designer"),
  ...require("./Workspace"),
  ...require("./Simulator"),
  ...require("./Viewport"),
  ...require("./Workbench")
});
