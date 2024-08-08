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

// src/widgets/AuxToolWidget/ResizeHandler.tsx
var ResizeHandler_exports = {};
__export(ResizeHandler_exports, {
  ResizeHandler: () => ResizeHandler
});
module.exports = __toCommonJS(ResizeHandler_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_hooks = require("../../hooks");
var ResizeHandler = (props) => {
  const designer = (0, import_hooks.useDesigner)();
  const prefix = (0, import_hooks.usePrefix)("aux-node-resize-handler");
  const createHandler = (value) => {
    return {
      [designer.props.nodeResizeHandlerAttrName]: value,
      className: (0, import_classnames.default)(prefix, value)
    };
  };
  const allowResize = props.node.allowResize();
  if (!allowResize) return null;
  const allowX = allowResize.includes("x");
  const allowY = allowResize.includes("y");
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, allowX && /* @__PURE__ */ import_react.default.createElement("div", { ...createHandler("x-start") }), allowX && /* @__PURE__ */ import_react.default.createElement("div", { ...createHandler("x-end") }), allowY && /* @__PURE__ */ import_react.default.createElement("div", { ...createHandler("y-start") }), allowY && /* @__PURE__ */ import_react.default.createElement("div", { ...createHandler("y-end") }));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ResizeHandler
});
