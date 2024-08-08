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

// src/panels/index.ts
var panels_exports = {};
module.exports = __toCommonJS(panels_exports);
var import_styles = require("./styles.less");
__reExport(panels_exports, require("./StudioPanel"), module.exports);
__reExport(panels_exports, require("./CompositePanel"), module.exports);
__reExport(panels_exports, require("./SettingsPanel"), module.exports);
__reExport(panels_exports, require("./WorkspacePanel"), module.exports);
__reExport(panels_exports, require("./ToolbarPanel"), module.exports);
__reExport(panels_exports, require("./ViewportPanel"), module.exports);
__reExport(panels_exports, require("./ViewPanel"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./StudioPanel"),
  ...require("./CompositePanel"),
  ...require("./SettingsPanel"),
  ...require("./WorkspacePanel"),
  ...require("./ToolbarPanel"),
  ...require("./ViewportPanel"),
  ...require("./ViewPanel")
});
