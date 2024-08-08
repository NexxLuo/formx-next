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

// src/icons/mobile.tsx
var mobile_exports = {};
__export(mobile_exports, {
  Mobile: () => Mobile
});
module.exports = __toCommonJS(mobile_exports);
var import_react = __toESM(require("react"));
var Mobile = /* @__PURE__ */ import_react.default.createElement("svg", { viewBox: "0 0 1024 1024" }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M505.685333 816.64c-28.586667 0-51.882667 23.253333-51.882666 51.882667 0 28.586667 23.253333 51.882667 51.882666 51.882666 28.586667 0 51.882667-23.253333 51.882667-51.882666 0-28.586667-23.296-51.882667-51.882667-51.882667z" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M762.368 0H249.002667A78.421333 78.421333 0 0 0 170.666667 78.336v861.525333c0 43.178667 35.114667 78.336 78.336 78.336h513.365333a78.421333 78.421333 0 0 0 78.293333-78.336V78.336A78.421333 78.421333 0 0 0 762.368 0zM249.002667 52.224h513.365333c14.378667 0 26.112 11.690667 26.112 26.112v645.461333H222.890667V78.336c0-14.421333 11.690667-26.112 26.112-26.112zM762.368 965.973333H249.002667a26.154667 26.154667 0 0 1-26.112-26.112v-159.402666H788.48v159.402666a26.154667 26.154667 0 0 1-26.112 26.112z" }));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Mobile
});
