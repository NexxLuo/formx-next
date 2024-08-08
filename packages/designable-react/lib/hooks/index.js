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

// src/hooks/index.ts
var hooks_exports = {};
module.exports = __toCommonJS(hooks_exports);
__reExport(hooks_exports, require("./useDesigner"), module.exports);
__reExport(hooks_exports, require("./useCursor"), module.exports);
__reExport(hooks_exports, require("./useScreen"), module.exports);
__reExport(hooks_exports, require("./useTree"), module.exports);
__reExport(hooks_exports, require("./useTheme"), module.exports);
__reExport(hooks_exports, require("./usePosition"), module.exports);
__reExport(hooks_exports, require("./useTreeNode"), module.exports);
__reExport(hooks_exports, require("./useHover"), module.exports);
__reExport(hooks_exports, require("./useViewport"), module.exports);
__reExport(hooks_exports, require("./useOutline"), module.exports);
__reExport(hooks_exports, require("./useSelection"), module.exports);
__reExport(hooks_exports, require("./useOperation"), module.exports);
__reExport(hooks_exports, require("./useWorkbench"), module.exports);
__reExport(hooks_exports, require("./useWorkspace"), module.exports);
__reExport(hooks_exports, require("./useLayout"), module.exports);
__reExport(hooks_exports, require("./useHistory"), module.exports);
__reExport(hooks_exports, require("./usePrefix"), module.exports);
__reExport(hooks_exports, require("./useRegistry"), module.exports);
__reExport(hooks_exports, require("./useValidNodeOffsetRect"), module.exports);
__reExport(hooks_exports, require("./useCurrentNodeSelected"), module.exports);
__reExport(hooks_exports, require("./useViewportDragon"), module.exports);
__reExport(hooks_exports, require("./useOutlineDragon"), module.exports);
__reExport(hooks_exports, require("./useNodeIdProps"), module.exports);
__reExport(hooks_exports, require("./useCurrentNode"), module.exports);
__reExport(hooks_exports, require("./useSelected"), module.exports);
__reExport(hooks_exports, require("./useComponents"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./useDesigner"),
  ...require("./useCursor"),
  ...require("./useScreen"),
  ...require("./useTree"),
  ...require("./useTheme"),
  ...require("./usePosition"),
  ...require("./useTreeNode"),
  ...require("./useHover"),
  ...require("./useViewport"),
  ...require("./useOutline"),
  ...require("./useSelection"),
  ...require("./useOperation"),
  ...require("./useWorkbench"),
  ...require("./useWorkspace"),
  ...require("./useLayout"),
  ...require("./useHistory"),
  ...require("./usePrefix"),
  ...require("./useRegistry"),
  ...require("./useValidNodeOffsetRect"),
  ...require("./useCurrentNodeSelected"),
  ...require("./useViewportDragon"),
  ...require("./useOutlineDragon"),
  ...require("./useNodeIdProps"),
  ...require("./useCurrentNode"),
  ...require("./useSelected"),
  ...require("./useComponents")
});
