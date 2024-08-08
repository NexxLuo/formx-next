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

// src/icons/focus.tsx
var focus_exports = {};
__export(focus_exports, {
  Focus: () => Focus
});
module.exports = __toCommonJS(focus_exports);
var import_react = __toESM(require("react"));
var Focus = /* @__PURE__ */ import_react.default.createElement("path", { d: "M512 384c-70.592 0-128 57.408-128 128s57.408 128 128 128 128-57.408 128-128-57.408-128-128-128z m0 192c-35.296 0-64-28.704-64-64s28.704-64 64-64 64 28.704 64 64-28.704 64-64 64z m416-96h-0.928C911.424 275.776 748.224 112.576 544 96.928V96c0-17.664-14.336-32-32-32s-32 14.336-32 32v0.928C275.776 112.576 112.576 275.776 96.928 480H96c-17.664 0-32 14.336-32 32s14.336 32 32 32h0.928C112.576 748.224 275.776 911.424 480 927.072V928c0 17.696 14.336 32 32 32s32-14.304 32-32v-0.928C748.224 911.424 911.424 748.224 927.072 544H928c17.696 0 32-14.336 32-32s-14.304-32-32-32zM544 863.072V800c0-17.696-14.336-32-32-32s-32 14.304-32 32v63.072C311.04 847.776 176.224 712.928 160.928 544H224c17.664 0 32-14.336 32-32s-14.336-32-32-32h-63.072C176.224 311.04 311.04 176.224 480 160.928V224c0 17.664 14.336 32 32 32s32-14.336 32-32v-63.072C712.928 176.224 847.776 311.04 863.072 480H800c-17.696 0-32 14.336-32 32s14.304 32 32 32h63.072C847.776 712.928 712.928 847.776 544 863.072z" });
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Focus
});
