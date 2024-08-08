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

// src/widgets/AuxToolWidget/DashedBox.tsx
var DashedBox_exports = {};
__export(DashedBox_exports, {
  DashedBox: () => DashedBox
});
module.exports = __toCommonJS(DashedBox_exports);
var import_react = __toESM(require("react"));
var import_hooks = require("../../hooks");
var import_reactive_react = require("@formily/reactive-react");
var DashedBox = (0, import_reactive_react.observer)(() => {
  const hover = (0, import_hooks.useHover)();
  const prefix = (0, import_hooks.usePrefix)("aux-dashed-box");
  const selection = (0, import_hooks.useSelection)();
  const rect = (0, import_hooks.useValidNodeOffsetRect)(hover == null ? void 0 : hover.node);
  const createTipsStyle = () => {
    const baseStyle = {
      top: 0,
      left: 0,
      pointerEvents: "none",
      boxSizing: "border-box",
      visibility: "hidden",
      zIndex: 2
    };
    if (rect) {
      baseStyle.transform = `perspective(1px) translate3d(${rect.x}px,${rect.y}px,0)`;
      baseStyle.height = rect.height;
      baseStyle.width = rect.width;
      baseStyle.visibility = "visible";
    }
    return baseStyle;
  };
  if (!hover.node) return null;
  if (hover.node.hidden) return null;
  if (selection.selected.includes(hover.node.id)) return null;
  return /* @__PURE__ */ import_react.default.createElement("div", { className: prefix, style: createTipsStyle() }, /* @__PURE__ */ import_react.default.createElement(
    "span",
    {
      className: prefix + "-title",
      style: {
        position: "absolute",
        bottom: "100%",
        left: 0,
        fontSize: 12,
        userSelect: "none",
        fontWeight: "lighter",
        whiteSpace: "nowrap"
      }
    },
    hover == null ? void 0 : hover.node.getMessage("title")
  ));
});
DashedBox.displayName = "DashedBox";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DashedBox
});
