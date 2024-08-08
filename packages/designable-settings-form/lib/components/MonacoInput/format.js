var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/components/MonacoInput/format.ts
var format_exports = {};
__export(format_exports, {
  format: () => format
});
module.exports = __toCommonJS(format_exports);
var import_parser = require("@babel/parser");
var import_registry = require("../../registry");
var cache = {
  prettier: null
};
var format = async (language, source) => {
  cache.prettier = cache.prettier || new Function(
    `return import("${(0, import_registry.getNpmCDNRegistry)()}/prettier@2.x/esm/standalone.mjs")`
  )();
  return cache.prettier.then((module2) => {
    if (language === "javascript.expression" || language === "typescript.expression") {
      return source;
    }
    if (/(?:javascript|typescript)/gi.test(language)) {
      return module2.default.format(source, {
        semi: false,
        parser(text) {
          return (0, import_parser.parse)(text, {
            sourceType: "module",
            plugins: ["typescript", "jsx"]
          });
        }
      });
    }
    if (language === "json") {
      return JSON.stringify(JSON.parse(source), null, 2);
    }
    return source;
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  format
});
