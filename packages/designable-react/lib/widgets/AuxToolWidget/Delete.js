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

// src/widgets/AuxToolWidget/Delete.tsx
var Delete_exports = {};
__export(Delete_exports, {
  Delete: () => Delete
});
module.exports = __toCommonJS(Delete_exports);
var import_react = __toESM(require("react"));
var import_IconWidget = require("../IconWidget");
var import_hooks = require("../../hooks");
var import_antd = require("antd");
var Delete = ({ node, style }) => {
  const operation = (0, import_hooks.useOperation)();
  const prefix = (0, import_hooks.usePrefix)("aux-copy");
  if (node === node.root) return null;
  return /* @__PURE__ */ import_react.default.createElement(
    import_antd.Button,
    {
      className: prefix,
      style,
      type: "primary",
      onClick: () => {
        operation.removeNodes([node]);
      }
    },
    /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "Remove" })
  );
};
Delete.displayName = "Delete";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Delete
});
