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

// src/icons/pc.tsx
var pc_exports = {};
__export(pc_exports, {
  PC: () => PC
});
module.exports = __toCommonJS(pc_exports);
var import_react = __toESM(require("react"));
var PC = /* @__PURE__ */ import_react.default.createElement("svg", { viewBox: "0 0 1224 1024" }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M1151.216941 978.462118H33.370353c-26.021647 0-26.021647-14.697412-26.021647-29.394824s0-29.394824 26.021647-29.394823h1117.846588c26.021647 0 52.043294 14.697412 52.043294 29.394823s-26.021647 29.394824-52.043294 29.394824zM58.789647 749.266824c0 29.394824 14.697412 44.092235 44.032 44.092235h999.062588c29.334588 0 44.032-14.697412 44.032-44.092235V102.821647c0-29.334588-14.697412-44.032-44.032-44.032H102.821647c-29.334588 0-44.032 14.697412-44.032 44.032V749.327059z m1145.916235 0c0 58.789647-44.092235 102.821647-102.821647 102.821647H102.821647C44.092235 852.088471 0 808.056471 0 749.327059V102.821647C0 44.092235 44.092235 0 102.821647 0h999.062588C1160.613647 0 1204.705882 44.092235 1204.705882 102.821647V749.327059z" }));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PC
});
