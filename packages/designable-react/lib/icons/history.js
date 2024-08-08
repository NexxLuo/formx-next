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

// src/icons/history.tsx
var history_exports = {};
__export(history_exports, {
  History: () => History
});
module.exports = __toCommonJS(history_exports);
var import_react = __toESM(require("react"));
var History = /* @__PURE__ */ import_react.default.createElement("svg", { viewBox: "0 0 1056 1024" }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M144.050432 311.120128C150.72016 298.14528 159.483744 281.657568 165.972256 271.480736 245.506592 146.735712 385.091328 64 544 64 791.423552 64 992 264.576448 992 512 992 759.423552 791.423552 960 544 960 383.12528 960 242.055648 875.204416 163.047904 747.870016 152.260384 730.484064 148.608608 721.877024 148.608608 721.877024 140.526912 706.07824 121.00352 698.887232 104.646144 705.605952 88.174688 712.371488 81.331744 730.490304 89.107264 746.180064 89.107264 746.180064 94.27984 757.936064 105.745536 776.866816 195.465184 925.000928 358.17136 1024 544 1024 826.769792 1024 1056 794.769792 1056 512 1056 229.230208 826.769792 0 544 0 360.797344 0 200.068256 96.220896 109.592672 240.882816 105.015264 248.201632 99.386304 258.44688 94.010208 268.65776L76.719904 159.49104C73.980704 142.19648 57.73136 130.398432 40.154144 133.182368 22.698592 135.947072 10.815968 152.506944 13.539136 169.700448L38.593024 327.884448C44.117152 362.762368 76.620576 386.597728 111.74736 381.034208L269.931392 355.98032C287.335072 353.22384 299.2216 336.96048 296.437632 319.383232 293.67296 301.927712 277.178208 290.034752 260.117184 292.73696L144.050432 311.120128 144.050432 311.120128 144.050432 311.120128ZM544 223.852736C544 206.26096 529.79632 192 512 192 494.32688 192 480 206.584352 480 224.079136L480 511.72704C480 547.224 508.8624 576 544.27296 576L831.920864 576C849.637664 576 864 561.79632 864 544 864 526.32688 849.418752 512 832.147264 512L575.852736 512C558.26096 512 544 497.418752 544 480.147264L544 223.852736 544 223.852736 544 223.852736Z" }));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  History
});
