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

// src/icons/move.tsx
var move_exports = {};
__export(move_exports, {
  Move: () => Move
});
module.exports = __toCommonJS(move_exports);
var import_react = __toESM(require("react"));
var Move = /* @__PURE__ */ import_react.default.createElement("path", { d: "M664.576 792.533333l-124.416 124.16v-256.981333h-55.296v258.389333L360.533333 793.6l-36.096 36.138667 187.264 187.349333 189.013334-188.373333-36.138667-36.224zM483.84 107.306667v256.981333h55.296V105.898667L663.466667 230.4l36.096-36.138667L512.298667 6.869333l-189.013334 188.373334 36.138667 36.224 124.416-124.16zM230.272 360.533333l-36.096-36.138666-187.392 187.264 188.416 189.013333 36.224-36.138667-124.032-124.330666h256.853333v-55.253334H105.941333l124.330667-124.458666z m598.528-37.162666l-36.224 36.096 124.032 124.330666h-256.853333v55.253334h258.304l-124.330667 124.458666 36.096 36.096 187.392-187.264-188.416-189.013333z" });
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Move
});
