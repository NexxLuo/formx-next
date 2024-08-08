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

// src/widgets/index.ts
var widgets_exports = {};
module.exports = __toCommonJS(widgets_exports);
__reExport(widgets_exports, require("./AuxToolWidget"), module.exports);
__reExport(widgets_exports, require("./ComponentTreeWidget"), module.exports);
__reExport(widgets_exports, require("./DesignerToolsWidget"), module.exports);
__reExport(widgets_exports, require("./ViewToolsWidget"), module.exports);
__reExport(widgets_exports, require("./ResourceWidget"), module.exports);
__reExport(widgets_exports, require("./GhostWidget"), module.exports);
__reExport(widgets_exports, require("./EmptyWidget"), module.exports);
__reExport(widgets_exports, require("./OutlineWidget"), module.exports);
__reExport(widgets_exports, require("./IconWidget"), module.exports);
__reExport(widgets_exports, require("./TextWidget"), module.exports);
__reExport(widgets_exports, require("./HistoryWidget"), module.exports);
__reExport(widgets_exports, require("./NodePathWidget"), module.exports);
__reExport(widgets_exports, require("./NodeTitleWidget"), module.exports);
__reExport(widgets_exports, require("./DroppableWidget"), module.exports);
__reExport(widgets_exports, require("./NodeActionsWidget"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./AuxToolWidget"),
  ...require("./ComponentTreeWidget"),
  ...require("./DesignerToolsWidget"),
  ...require("./ViewToolsWidget"),
  ...require("./ResourceWidget"),
  ...require("./GhostWidget"),
  ...require("./EmptyWidget"),
  ...require("./OutlineWidget"),
  ...require("./IconWidget"),
  ...require("./TextWidget"),
  ...require("./HistoryWidget"),
  ...require("./NodePathWidget"),
  ...require("./NodeTitleWidget"),
  ...require("./DroppableWidget"),
  ...require("./NodeActionsWidget")
});
