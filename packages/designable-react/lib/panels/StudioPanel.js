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

// src/panels/StudioPanel.tsx
var StudioPanel_exports = {};
__export(StudioPanel_exports, {
  StudioPanel: () => StudioPanel
});
module.exports = __toCommonJS(StudioPanel_exports);
var import_react = __toESM(require("react"));
var import_hooks = require("../hooks");
var import_containers = require("../containers");
var import_classnames = __toESM(require("classnames"));
var StudioPanelInternal = ({
  logo,
  actions,
  ...props
}) => {
  const prefix = (0, import_hooks.usePrefix)("main-panel");
  const position = (0, import_hooks.usePosition)();
  const classNameBase = (0, import_classnames.default)("root", position, props.className);
  if (logo || actions) {
    return /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        ...props,
        className: (0, import_classnames.default)(`${prefix}-container`, classNameBase)
      },
      /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-header" }, /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-header-logo" }, logo), /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-header-actions" }, actions)),
      /* @__PURE__ */ import_react.default.createElement("div", { className: prefix }, props.children)
    );
  }
  return /* @__PURE__ */ import_react.default.createElement("div", { ...props, className: (0, import_classnames.default)(prefix, classNameBase) }, props.children);
};
var StudioPanel = (props) => {
  return /* @__PURE__ */ import_react.default.createElement(
    import_containers.Layout,
    {
      theme: props.theme,
      prefixCls: props.prefixCls,
      position: props.position
    },
    /* @__PURE__ */ import_react.default.createElement(StudioPanelInternal, { ...props })
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StudioPanel
});
