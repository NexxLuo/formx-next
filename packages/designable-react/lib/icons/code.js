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

// src/icons/code.tsx
var code_exports = {};
__export(code_exports, {
  Code: () => Code
});
module.exports = __toCommonJS(code_exports);
var import_react = __toESM(require("react"));
var Code = /* @__PURE__ */ import_react.default.createElement(
  "path",
  {
    d: "M612.266667 130.133333c-17.066667-4.266667-34.133333 6.4-38.4 23.466667L390.4 832c-4.266667 17.066667 6.4 34.133333 23.466667 38.4 2.133333 0 6.4 2.133333 8.533333 2.133333 14.933333 0 27.733333-8.533333 29.866667-23.466666l181.333333-680.533334c6.4-17.066667-4.266667-34.133333-21.333333-38.4zM1015.466667 477.866667L744.533333 206.933333c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l247.466667 247.466667-249.6 249.6c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333l270.933334-270.933333c6.4-6.4 8.533333-14.933333 8.533333-23.466667s-4.266667-14.933333-8.533333-21.333333zM326.4 206.933333c-12.8-12.8-32-12.8-44.8 0L8.533333 477.866667c-4.266667 6.4-8.533333 12.8-8.533333 21.333333s4.266667 17.066667 8.533333 23.466667l270.933334 270.933333c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c12.8-12.8 12.8-32 0-44.8L76.8 499.2l247.466667-247.466667c12.8-12.8 12.8-32 2.133333-44.8z",
    "p-id": "4084"
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Code
});
