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

// src/widgets/OutlineWidget/index.tsx
var OutlineWidget_exports = {};
__export(OutlineWidget_exports, {
  OutlineTreeWidget: () => OutlineTreeWidget
});
module.exports = __toCommonJS(OutlineWidget_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_hooks = require("../../hooks");
var import_reactive_react = require("@formily/reactive-react");
var import_OutlineNode = require("./OutlineNode");
var import_Insertion = require("./Insertion");
var import_context = require("./context");
var import_shared = require("@designable/shared");
var OutlineTreeWidget = (0, import_reactive_react.observer)(
  ({ onClose, style, renderActions, renderTitle, className, ...props }) => {
    const ref = (0, import_react.useRef)();
    const prefix = (0, import_hooks.usePrefix)("outline-tree");
    const workbench = (0, import_hooks.useWorkbench)();
    const current = (workbench == null ? void 0 : workbench.activeWorkspace) || (workbench == null ? void 0 : workbench.currentWorkspace);
    const workspaceId = current == null ? void 0 : current.id;
    const tree = (0, import_hooks.useTree)(workspaceId);
    const outline = (0, import_hooks.useOutline)(workspaceId);
    const outlineRef = (0, import_react.useRef)();
    (0, import_react.useLayoutEffect)(() => {
      if (!workspaceId) return;
      if (outlineRef.current && outlineRef.current !== outline) {
        outlineRef.current.onUnmount();
      }
      if (ref.current && outline) {
        outline.onMount(ref.current, import_shared.globalThisPolyfill);
      }
      outlineRef.current = outline;
      return () => {
        outline.onUnmount();
      };
    }, [workspaceId, outline]);
    if (!outline || !workspaceId) return null;
    return /* @__PURE__ */ import_react.default.createElement(import_context.NodeContext.Provider, { value: { renderActions, renderTitle } }, /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        ...props,
        className: (0, import_classnames.default)(prefix + "-container", className),
        style
      },
      /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-content", ref }, /* @__PURE__ */ import_react.default.createElement(import_OutlineNode.OutlineTreeNode, { node: tree, workspaceId }), /* @__PURE__ */ import_react.default.createElement(
        "div",
        {
          className: prefix + "-aux",
          style: {
            pointerEvents: "none"
          }
        },
        /* @__PURE__ */ import_react.default.createElement(import_Insertion.Insertion, { workspaceId })
      ))
    ));
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OutlineTreeWidget
});
