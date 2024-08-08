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

// src/icons/menu.tsx
var menu_exports = {};
__export(menu_exports, {
  Menu: () => Menu
});
module.exports = __toCommonJS(menu_exports);
var import_react = __toESM(require("react"));
var Menu = /* @__PURE__ */ import_react.default.createElement("svg", { viewBox: "0 0 48 48" }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M42.5,33 C43.3284271,33 44,33.6715729 44,34.5 C44,35.3284271 43.3284271,36 42.5,36 L5.5,36 C4.67157288,36 4,35.3284271 4,34.5 C4,33.6715729 4.67157288,33 5.5,33 L42.5,33 Z M42.5,22 C43.3284271,22 44,22.6715729 44,23.5 C44,24.3284271 43.3284271,25 42.5,25 L5.5,25 C4.67157288,25 4,24.3284271 4,23.5 C4,22.6715729 4.67157288,22 5.5,22 L42.5,22 Z M42.5,11 C43.3284271,11 44,11.6715729 44,12.5 C44,13.3284271 43.3284271,14 42.5,14 L5.5,14 C4.67157288,14 4,13.3284271 4,12.5 C4,11.6715729 4.67157288,11 5.5,11 L42.5,11 Z" }));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Menu
});
