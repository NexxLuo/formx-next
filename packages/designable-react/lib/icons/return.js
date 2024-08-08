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

// src/icons/return.tsx
var return_exports = {};
__export(return_exports, {
  Return: () => Return
});
module.exports = __toCommonJS(return_exports);
var import_react = __toESM(require("react"));
var Return = /* @__PURE__ */ import_react.default.createElement("path", { d: "M648 307.2H217.6l128-128c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0L118.4 315.2c-6.4 6.4-9.6 14.4-9.6 22.4s3.2 16 9.6 22.4l180.8 180.8c12.8 12.8 32 12.8 44.8 0 12.8-12.8 12.8-32 0-44.8L219.2 371.2H648c120 0 216 96 216 216s-96 216-216 216H320c-17.6 0-32 14.4-32 32s14.4 32 32 32h328c155.2 0 280-124.8 280-280s-124.8-280-280-280z" });
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Return
});
