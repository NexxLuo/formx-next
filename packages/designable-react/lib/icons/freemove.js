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

// src/icons/freemove.tsx
var freemove_exports = {};
__export(freemove_exports, {
  FreeMove: () => FreeMove
});
module.exports = __toCommonJS(freemove_exports);
var import_react = __toESM(require("react"));
var FreeMove = /* @__PURE__ */ import_react.default.createElement("svg", { viewBox: "0 0 1024 1024" }, /* @__PURE__ */ import_react.default.createElement(
  "path",
  {
    d: "M469.333333 938.666667c-17.066667 0-29.866667-8.533333-42.666666-17.066667l-209.066667-179.2 29.866667-34.133333c8.533333-8.533333 21.333333-12.8 29.866666-12.8h8.533334L426.666667 768V341.333333c0-25.6 17.066667-42.666667 42.666666-42.666666s42.666667 17.066667 42.666667 42.666666v192l51.2 4.266667 209.066667 93.866667c21.333333 8.533333 38.4 34.133333 38.4 55.466666v187.733334c0 34.133333-29.866667 64-64 64H469.333333z m128-640V42.666667l128 128-128 128z m0-85.333334H341.333333v85.333334L213.333333 170.666667l128-128v85.333333h256v85.333333z",
    "p-id": "13294",
    fill: "#ffffff"
  }
));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FreeMove
});
