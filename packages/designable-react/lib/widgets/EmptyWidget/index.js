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

// src/widgets/EmptyWidget/index.tsx
var EmptyWidget_exports = {};
__export(EmptyWidget_exports, {
  EmptyWidget: () => EmptyWidget
});
module.exports = __toCommonJS(EmptyWidget_exports);
var import_react = __toESM(require("react"));
var import_hooks = require("../../hooks");
var import_reactive_react = require("@formily/reactive-react");
var import_IconWidget = require("../IconWidget");
var import_styles = require("./styles.less");
var EmptyWidget = (0, import_reactive_react.observer)((props) => {
  var _a;
  const tree = (0, import_hooks.useTree)();
  const prefix = (0, import_hooks.usePrefix)("empty");
  const renderEmpty = () => {
    return /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", flexDirection: "column" } }, /* @__PURE__ */ import_react.default.createElement("div", { className: "animations" }, /* @__PURE__ */ import_react.default.createElement(
      import_IconWidget.IconWidget,
      {
        infer: props.dragTipsDirection === "left" ? "DragLeftSourceAnimation" : "DragRightSourceAnimation",
        size: 240
      }
    ), /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "BatchDragAnimation", size: 240 })), /* @__PURE__ */ import_react.default.createElement("div", { className: "hotkeys-list" }, /* @__PURE__ */ import_react.default.createElement("div", null, "Selection ", /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "Command" }), " + Click /", " ", /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "Shift" }), " + Click /", " ", /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "Command" }), " + A"), /* @__PURE__ */ import_react.default.createElement("div", null, "Copy ", /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "Command" }), " + C / Paste", " ", /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "Command" }), " + V"), /* @__PURE__ */ import_react.default.createElement("div", null, "Delete ", /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "Delete" }))));
  };
  if (!((_a = tree == null ? void 0 : tree.children) == null ? void 0 : _a.length)) {
    return /* @__PURE__ */ import_react.default.createElement("div", { className: prefix }, props.children ? props.children : renderEmpty());
  }
  return null;
});
EmptyWidget.defaultProps = {
  dragTipsDirection: "left"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmptyWidget
});
