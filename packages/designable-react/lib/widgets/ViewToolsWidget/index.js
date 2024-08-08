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

// src/widgets/ViewToolsWidget/index.tsx
var ViewToolsWidget_exports = {};
__export(ViewToolsWidget_exports, {
  ViewToolsWidget: () => ViewToolsWidget
});
module.exports = __toCommonJS(ViewToolsWidget_exports);
var import_react = __toESM(require("react"));
var import_antd = require("antd");
var import_reactive_react = require("@formily/reactive-react");
var import_IconWidget = require("../IconWidget");
var import_hooks = require("../../hooks");
var import_classnames = __toESM(require("classnames"));
var ViewToolsWidget = (0, import_reactive_react.observer)(
  ({ use, style, className }) => {
    const workbench = (0, import_hooks.useWorkbench)();
    const prefix = (0, import_hooks.usePrefix)("view-tools");
    return /* @__PURE__ */ import_react.default.createElement(import_antd.Button.Group, { style, className: (0, import_classnames.default)(prefix, className) }, use.includes("DESIGNABLE") && /* @__PURE__ */ import_react.default.createElement(
      import_antd.Button,
      {
        disabled: workbench.type === "DESIGNABLE",
        onClick: () => {
          workbench.type = "DESIGNABLE";
        },
        size: "small"
      },
      /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "Design" })
    ), use.includes("JSONTREE") && /* @__PURE__ */ import_react.default.createElement(
      import_antd.Button,
      {
        disabled: workbench.type === "JSONTREE",
        onClick: () => {
          workbench.type = "JSONTREE";
        },
        size: "small"
      },
      /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "JSON" })
    ), use.includes("MARKUP") && /* @__PURE__ */ import_react.default.createElement(
      import_antd.Button,
      {
        disabled: workbench.type === "MARKUP",
        onClick: () => {
          workbench.type = "MARKUP";
        },
        size: "small"
      },
      /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "Code" })
    ), use.includes("PREVIEW") && /* @__PURE__ */ import_react.default.createElement(
      import_antd.Button,
      {
        disabled: workbench.type === "PREVIEW",
        onClick: () => {
          workbench.type = "PREVIEW";
        },
        size: "small"
      },
      /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "Play" })
    ));
  }
);
ViewToolsWidget.defaultProps = {
  use: ["DESIGNABLE", "JSONTREE", "PREVIEW"]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ViewToolsWidget
});
