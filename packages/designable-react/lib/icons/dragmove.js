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

// src/icons/dragmove.tsx
var dragmove_exports = {};
__export(dragmove_exports, {
  DragMove: () => DragMove
});
module.exports = __toCommonJS(dragmove_exports);
var import_react = __toESM(require("react"));
var DragMove = /* @__PURE__ */ import_react.default.createElement("svg", { viewBox: "0 0 48 48" }, /* @__PURE__ */ import_react.default.createElement(
  "path",
  {
    d: "M33.4696754,34.5190296 C34.2981025,34.5190296 34.9696754,35.1906025 34.9696754,36.0190296 C34.9696754,36.8474567 34.2981025,37.5190296 33.4696754,37.5190296 L16.4696754,37.5190296 C15.6412482,37.5190296 14.9696754,36.8474567 14.9696754,36.0190296 C14.9696754,35.1906025 15.6412482,34.5190296 16.4696754,34.5190296 L33.4696754,34.5190296 Z M38.4696754,23.5190296 C39.2981025,23.5190296 39.9696754,24.1906025 39.9696754,25.0190296 C39.9696754,25.8474567 39.2981025,26.5190296 38.4696754,26.5190296 L11.4696754,26.5190296 C10.6412482,26.5190296 9.96967536,25.8474567 9.96967536,25.0190296 C9.96967536,24.1906025 10.6412482,23.5190296 11.4696754,23.5190296 L38.4696754,23.5190296 Z M43.4696754,12.5190296 C44.2981025,12.5190296 44.9696754,13.1906025 44.9696754,14.0190296 C44.9696754,14.8474567 44.2981025,15.5190296 43.4696754,15.5190296 L6.46967536,15.5190296 C5.64124824,15.5190296 4.96967536,14.8474567 4.96967536,14.0190296 C4.96967536,13.1906025 5.64124824,12.5190296 6.46967536,12.5190296 L43.4696754,12.5190296 Z",
    transform: "translate(24.969675, 25.019030) rotate(-45.000000) translate(-24.969675, -25.019030) "
  }
));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DragMove
});
