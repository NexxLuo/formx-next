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

// src/icons/delete.tsx
var delete_exports = {};
__export(delete_exports, {
  Delete: () => Delete
});
module.exports = __toCommonJS(delete_exports);
var import_react = __toESM(require("react"));
var Delete = /* @__PURE__ */ import_react.default.createElement("svg", null, /* @__PURE__ */ import_react.default.createElement(
  "path",
  {
    d: "M897.066667 896H342.4c-12.8 0-25.6-4.266667-34.133333-12.8l-298.666667-341.333333c-12.8-17.066667-12.8-38.4 0-55.466667l298.666667-341.333333c8.533333-12.8 21.333333-17.066667 34.133333-17.066667h554.666667c72.533333 0 128 55.466667 128 128v512c0 72.533333-55.466667 128-128 128zM363.733333 810.666667H897.066667c25.6 0 42.666667-17.066667 42.666666-42.666667V256c0-25.6-17.066667-42.666667-42.666666-42.666667H363.733333l-260.266666 298.666667 260.266666 298.666667z",
    "p-id": "4636"
  }
), /* @__PURE__ */ import_react.default.createElement(
  "path",
  {
    d: "M513.066667 682.666667c-12.8 0-21.333333-4.266667-29.866667-12.8-17.066667-17.066667-17.066667-42.666667 0-59.733334l256-256c17.066667-17.066667 42.666667-17.066667 59.733333 0s17.066667 42.666667 0 59.733334l-256 256c-8.533333 8.533333-17.066667 12.8-29.866666 12.8z",
    "p-id": "4637"
  }
), /* @__PURE__ */ import_react.default.createElement(
  "path",
  {
    d: "M769.066667 682.666667c-12.8 0-21.333333-4.266667-29.866667-12.8l-256-256c-17.066667-17.066667-17.066667-42.666667 0-59.733334s42.666667-17.066667 59.733333 0l256 256c17.066667 17.066667 17.066667 42.666667 0 59.733334-8.533333 8.533333-17.066667 12.8-29.866666 12.8z",
    "p-id": "4638"
  }
));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Delete
});
