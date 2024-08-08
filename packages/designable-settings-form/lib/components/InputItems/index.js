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

// src/components/InputItems/index.tsx
var InputItems_exports = {};
__export(InputItems_exports, {
  InputItems: () => InputItems
});
module.exports = __toCommonJS(InputItems_exports);
var import_react = __toESM(require("react"));
var import_designable_react = require("@platform/designable-react");
var import_classnames = __toESM(require("classnames"));
var import_styles = require("./styles.less");
var InputItemsContext = import_react.default.createContext(null);
var InputItems = (props) => {
  const prefix = (0, import_designable_react.usePrefix)("input-items");
  return /* @__PURE__ */ import_react.default.createElement(InputItemsContext.Provider, { value: props }, /* @__PURE__ */ import_react.default.createElement("div", { className: (0, import_classnames.default)(prefix, props.className), style: props.style }, props.children));
};
InputItems.defaultProps = {
  width: "100%"
};
InputItems.Item = (props) => {
  const prefix = (0, import_designable_react.usePrefix)("input-items-item");
  const ctx = (0, import_react.useContext)(InputItemsContext);
  return /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      className: (0, import_classnames.default)(prefix, props.className, {
        vertical: props.vertical || ctx.vertical
      }),
      style: { width: props.width || ctx.width, ...props.style }
    },
    props.icon && /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-icon" }, /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: props.icon, size: 16 })),
    props.title && /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-title" }, props.title),
    /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-controller" }, props.children)
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InputItems
});
