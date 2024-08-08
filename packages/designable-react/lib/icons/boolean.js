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

// src/icons/boolean.tsx
var boolean_exports = {};
__export(boolean_exports, {
  Boolean: () => Boolean
});
module.exports = __toCommonJS(boolean_exports);
var import_react = __toESM(require("react"));
var Boolean = /* @__PURE__ */ import_react.default.createElement("svg", null, /* @__PURE__ */ import_react.default.createElement("path", { d: "M684,172 C729.9,172 774.4,181 816.4,198.7 C856.9,215.8 893.2,240.3 924.5,271.5 C955.7,302.7 980.2,339.1 997.3,379.6 C1015,421.5 1024,466.1 1024,512 C1024,557.9 1015,602.4 997.3,644.4 C980.2,684.9 955.7,721.2 924.5,752.5 C893.3,783.7 856.9,808.2 816.4,825.3 C774.4,843 729.9,852 684,852 L340,852 C294.1,852 249.6,843 207.6,825.3 C167.1,808.2 130.8,783.7 99.5,752.5 C68.3,721.3 43.8,684.9 26.7,644.4 C9,602.4 0,557.9 0,512 C0,466.1 9,421.6 26.7,379.6 C43.8,339.1 68.3,302.8 99.5,271.5 C130.7,240.3 167.1,215.8 207.6,198.7 C249.6,181 294.1,172 340,172 L684,172 Z M684,252 L340,252 C270.6,252 205.3,279 156.2,328.2 C107.1,377.4 80,442.6 80,512 C80,581.4 107,646.7 156.2,695.8 C205.4,744.9 270.6,772 340,772 L684,772 C753.4,772 818.7,745 867.8,695.8 C916.9,646.6 944,581.4 944,512 C944,442.6 917,377.3 867.8,328.2 C818.6,279.1 753.4,252 684,252 Z M320,392 C386.27417,392 440,445.72583 440,512 C440,578.27417 386.27417,632 320,632 C253.72583,632 200,578.27417 200,512 C200,445.72583 253.72583,392 320,392 Z" }));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Boolean
});
