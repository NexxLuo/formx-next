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

// src/icons/undo.tsx
var undo_exports = {};
__export(undo_exports, {
  Undo: () => Undo
});
module.exports = __toCommonJS(undo_exports);
var import_react = __toESM(require("react"));
var Undo = /* @__PURE__ */ import_react.default.createElement("svg", { viewBox: "0 0 1024 1024" }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M629.44 291.712V0S0 394.56 0 458.24c0 63.744 629.44 416.64 629.44 416.64V625.088s289.344 4.672 370.304 374.976c84.48-279.104-54.912-693.824-370.304-708.352z m176.768 337.92c-91.392-52.544-172.736-54.464-176.064-54.592l-47.232-0.704V792.192c-229.76-131.2-461.568-275.584-525.44-334.72 62.848-62.912 294.656-222.848 525.44-369.984v252.096l44.544 2.048c132.352 6.144 214.144 90.944 259.52 161.024 55.488 85.952 86.912 195.52 90.432 303.232-51.584-91.328-116.8-144.96-171.2-176.256z" }));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Undo
});
