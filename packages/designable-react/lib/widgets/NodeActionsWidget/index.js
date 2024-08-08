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

// src/widgets/NodeActionsWidget/index.tsx
var NodeActionsWidget_exports = {};
__export(NodeActionsWidget_exports, {
  NodeActionsWidget: () => NodeActionsWidget
});
module.exports = __toCommonJS(NodeActionsWidget_exports);
var import_react = __toESM(require("react"));
var import_antd = require("antd");
var import_reactive_react = require("@formily/reactive-react");
var import_hooks = require("../../hooks");
var import_IconWidget = require("../IconWidget");
var import_TextWidget = require("../TextWidget");
var import_classnames = __toESM(require("classnames"));
var import_styles = require("./styles.less");
var Space = (props) => {
  return /* @__PURE__ */ import_react.default.createElement("div", { ...props });
};
var Typography = (props) => {
  return /* @__PURE__ */ import_react.default.createElement("div", { ...props });
};
Typography.Link = (props) => {
  return /* @__PURE__ */ import_react.default.createElement("div", { ...props });
};
var NodeActionsWidget = (0, import_reactive_react.observer)((props) => {
  const node = (0, import_hooks.useTreeNode)();
  const prefix = (0, import_hooks.usePrefix)("node-actions");
  const selected = (0, import_hooks.useSelected)();
  if (selected.indexOf(node.id) === -1 && props.activeShown) return null;
  return /* @__PURE__ */ import_react.default.createElement("div", { className: (0, import_classnames.default)(prefix, props.className), style: props.style }, /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-content" }, /* @__PURE__ */ import_react.default.createElement(Space, { split: /* @__PURE__ */ import_react.default.createElement(import_antd.Divider, { type: "vertical" }) }, props.children)));
});
NodeActionsWidget.Action = ({ icon, title, ...props }) => {
  const prefix = (0, import_hooks.usePrefix)("node-actions-item");
  return /* @__PURE__ */ import_react.default.createElement(
    Typography.Link,
    {
      ...props,
      className: (0, import_classnames.default)(props.className, prefix),
      "data-click-stop-propagation": "true"
    },
    /* @__PURE__ */ import_react.default.createElement("span", { className: prefix + "-text" }, /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: icon }), /* @__PURE__ */ import_react.default.createElement(import_TextWidget.TextWidget, null, title))
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NodeActionsWidget
});
