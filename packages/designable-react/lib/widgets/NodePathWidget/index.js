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

// src/widgets/NodePathWidget/index.tsx
var NodePathWidget_exports = {};
__export(NodePathWidget_exports, {
  NodePathWidget: () => NodePathWidget
});
module.exports = __toCommonJS(NodePathWidget_exports);
var import_react = __toESM(require("react"));
var import_antd = require("antd");
var import_hooks = require("../../hooks");
var import_IconWidget = require("../IconWidget");
var import_NodeTitleWidget = require("../NodeTitleWidget");
var import_reactive_react = require("@formily/reactive-react");
var import_styles = require("./styles.less");
var NodePathWidget = (0, import_reactive_react.observer)(
  (props) => {
    const selected = (0, import_hooks.useCurrentNode)(props.workspaceId);
    const selection = (0, import_hooks.useSelection)(props.workspaceId);
    const hover = (0, import_hooks.useHover)(props.workspaceId);
    const prefix = (0, import_hooks.usePrefix)("node-path");
    if (!selected) return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null);
    const maxItems = props.maxItems ?? 3;
    const nodes = selected.getParents().slice(0, maxItems - 1).reverse().concat(selected);
    return /* @__PURE__ */ import_react.default.createElement(import_antd.Breadcrumb, { className: prefix }, nodes.map((node, key) => {
      return /* @__PURE__ */ import_react.default.createElement(import_antd.Breadcrumb.Item, { key }, key === 0 && /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "Position", style: { marginRight: 3 } }), /* @__PURE__ */ import_react.default.createElement(
        "a",
        {
          href: "",
          onMouseEnter: () => {
            hover.setHover(node);
          },
          onClick: (e) => {
            e.stopPropagation();
            e.preventDefault();
            selection.select(node);
          }
        },
        /* @__PURE__ */ import_react.default.createElement(import_NodeTitleWidget.NodeTitleWidget, { node })
      ));
    }));
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NodePathWidget
});
