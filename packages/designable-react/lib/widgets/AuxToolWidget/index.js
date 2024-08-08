var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/widgets/AuxToolWidget/index.tsx
var AuxToolWidget_exports = {};
__export(AuxToolWidget_exports, {
  AuxToolWidget: () => AuxToolWidget
});
module.exports = __toCommonJS(AuxToolWidget_exports);
var import_react = __toESM(require("react"));
var import_hooks = require("../../hooks");
var import_Insertion = require("./Insertion");
var import_Selection = require("./Selection");
var import_FreeSelection = require("./FreeSelection");
var import_Cover = require("./Cover");
var import_DashedBox = require("./DashedBox");
var import_styles = require("./styles.less");
var AuxToolWidget = () => {
  const engine = (0, import_hooks.useDesigner)();
  const viewport = (0, import_hooks.useViewport)();
  const prefix = (0, import_hooks.usePrefix)("auxtool");
  const ref = (0, import_react.useRef)();
  (0, import_react.useEffect)(() => {
    return engine.subscribeWith("viewport:scroll", () => {
      if (viewport.isIframe && ref.current) {
        ref.current.style.transform = `perspective(1px) translate3d(${-viewport.scrollX}px,${-viewport.scrollY}px,0)`;
      }
    });
  }, [engine, viewport]);
  if (!viewport) return null;
  return /* @__PURE__ */ import_react.default.createElement("div", { ref, className: prefix }, /* @__PURE__ */ import_react.default.createElement(import_Insertion.Insertion, null), /* @__PURE__ */ import_react.default.createElement(import_DashedBox.DashedBox, null), /* @__PURE__ */ import_react.default.createElement(import_Selection.Selection, null), /* @__PURE__ */ import_react.default.createElement(import_Cover.Cover, null), /* @__PURE__ */ import_react.default.createElement(import_FreeSelection.FreeSelection, null));
};
AuxToolWidget.displayName = "AuxToolWidget";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuxToolWidget
});
