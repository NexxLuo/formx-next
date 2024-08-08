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

// src/icons/container.tsx
var container_exports = {};
__export(container_exports, {
  Container: () => Container
});
module.exports = __toCommonJS(container_exports);
var import_react = __toESM(require("react"));
var Container = /* @__PURE__ */ import_react.default.createElement("svg", null, /* @__PURE__ */ import_react.default.createElement("path", { d: "M800 800h64v64h-64v-64z m-128 0h64v64h-64v-64z m-128 0h64v64h-64v-64z m-128 0h64v64h-64v-64z m-256 0h64v64h-64v-64z m0-640h64v64h-64v-64z m128 640h64v64h-64v-64zM160 672h64v64h-64v-64z m0-128h64v64h-64v-64z m0-128h64v64h-64v-64z m0-128h64v64h-64v-64z m640 384h64v64h-64v-64z m0-128h64v64h-64v-64z m0-128h64v64h-64v-64z m0-128h64v64h-64v-64z m0-128h64v64h-64v-64z m-128 0h64v64h-64v-64z m-128 0h64v64h-64v-64z m-128 0h64v64h-64v-64z m-128 0h64v64h-64v-64z" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M896 64H128c-35.2 0-64 28.8-64 64v768c0 35.2 28.8 64 64 64h768c35.2 0 64-28.8 64-64V128c0-35.2-28.8-64-64-64z m0 800c0 19.2-12.8 32-32 32H160c-19.2 0-32-12.8-32-32V160c0-19.2 12.8-32 32-32h704c19.2 0 32 12.8 32 32v704z" }));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Container
});
