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

// src/icons/shift.tsx
var shift_exports = {};
__export(shift_exports, {
  Shift: () => Shift
});
module.exports = __toCommonJS(shift_exports);
var import_react = __toESM(require("react"));
var Shift = /* @__PURE__ */ import_react.default.createElement(
  "path",
  {
    d: "M464.213333 105.301333a74.496 74.496 0 0 0-9.6 9.557334L119.04 517.546667a74.666667 74.666667 0 0 0 9.557333 105.130666l5.973334 4.48c12.330667 8.362667 26.88 12.842667 41.813333 12.842667H298.666667v224c0 41.216 33.450667 74.666667 74.666666 74.666667h277.333334l6.144-0.256A74.666667 74.666667 0 0 0 725.333333 864L725.290667 640h122.282666a74.666667 74.666667 0 0 0 57.344-122.453333l-335.573333-402.688a74.666667 74.666667 0 0 0-99.754667-13.653334l-5.418666 4.096z m55.978667 50.517334l335.573333 402.688a10.666667 10.666667 0 0 1-8.192 17.493333H693.333333a32 32 0 0 0-32 32v256a10.666667 10.666667 0 0 1-10.666666 10.666667h-277.333334a10.666667 10.666667 0 0 1-10.666666-10.666667v-256a32 32 0 0 0-32-32H176.426667a10.666667 10.666667 0 0 1-8.192-17.493333l335.573333-402.688a10.666667 10.666667 0 0 1 16.384 0z",
    "p-id": "6245"
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Shift
});
