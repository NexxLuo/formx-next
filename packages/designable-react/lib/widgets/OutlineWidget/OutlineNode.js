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

// src/widgets/OutlineWidget/OutlineNode.tsx
var OutlineNode_exports = {};
__export(OutlineNode_exports, {
  OutlineTreeNode: () => OutlineTreeNode
});
module.exports = __toCommonJS(OutlineNode_exports);
var import_react = __toESM(require("react"));
var import_core = require("@designable/core");
var import_shared = require("@designable/shared");
var import_reactive = require("@formily/reactive");
var import_reactive_react = require("@formily/reactive-react");
var import_hooks = require("../../hooks");
var import_IconWidget = require("../IconWidget");
var import_NodeTitleWidget = require("../NodeTitleWidget");
var import_context = require("./context");
var import_classnames = __toESM(require("classnames"));
var import_styles = require("./styles.less");
var OutlineTreeNode = (0, import_reactive_react.observer)(
  ({ node, className, style, workspaceId }) => {
    var _a, _b;
    const prefix = (0, import_hooks.usePrefix)("outline-tree-node");
    const engine = (0, import_hooks.useDesigner)();
    const ref = (0, import_react.useRef)();
    const ctx = (0, import_react.useContext)(import_context.NodeContext);
    const request = (0, import_react.useRef)(null);
    const cursor = (0, import_hooks.useCursor)();
    const selection = (0, import_hooks.useSelection)(workspaceId);
    const outlineDragon = (0, import_hooks.useOutlineDragon)(workspaceId);
    (0, import_react.useEffect)(() => {
      return engine.subscribeTo(import_core.DragMoveEvent, () => {
        var _a2;
        const closestNodeId = (_a2 = outlineDragon == null ? void 0 : outlineDragon.closestNode) == null ? void 0 : _a2.id;
        const closestDirection = outlineDragon == null ? void 0 : outlineDragon.closestDirection;
        const id = node.id;
        if (!ref.current) return;
        if (closestNodeId === id && closestDirection === import_core.ClosestPosition.Inner) {
          if (!ref.current.classList.contains("droppable")) {
            ref.current.classList.add("droppable");
          }
          if (!ref.current.classList.contains("expanded")) {
            if (request.current) {
              clearTimeout(request.current);
              request.current = null;
            }
            request.current = setTimeout(() => {
              ref.current.classList.add("expanded");
            }, 600);
          }
        } else {
          if (request.current) {
            clearTimeout(request.current);
            request.current = null;
          }
          if (ref.current.classList.contains("droppable")) {
            ref.current.classList.remove("droppable");
          }
        }
      });
    }, [node, outlineDragon, cursor]);
    (0, import_react.useEffect)(() => {
      return (0, import_reactive.autorun)(() => {
        var _a2;
        const selectedIds = (selection == null ? void 0 : selection.selected) || [];
        const id = node.id;
        if (!ref.current) return;
        if (selectedIds.includes(id)) {
          if (!ref.current.classList.contains("selected")) {
            ref.current.classList.add("selected");
          }
        } else {
          if (ref.current.classList.contains("selected")) {
            ref.current.classList.remove("selected");
          }
        }
        if (cursor.status === import_core.CursorStatus.Dragging && ((_a2 = outlineDragon == null ? void 0 : outlineDragon.dragNodes) == null ? void 0 : _a2.length)) {
          if (ref.current.classList.contains("selected")) {
            ref.current.classList.remove("selected");
          }
        }
      });
    }, [node, selection, outlineDragon]);
    if (!node) return null;
    const renderIcon = (node2) => {
      var _a2;
      const icon = node2.designerProps.icon;
      if (icon) {
        return /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: icon, size: 12 });
      }
      if (node2 === (node2 == null ? void 0 : node2.root)) {
        return /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "Page", size: 12 });
      } else if ((_a2 = node2.designerProps) == null ? void 0 : _a2.droppable) {
        return /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "Container", size: 12 });
      }
      return /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "Component", size: 12 });
    };
    const renderTitle = (node2) => {
      if ((0, import_shared.isFn)(ctx.renderTitle)) return ctx.renderTitle(node2);
      return /* @__PURE__ */ import_react.default.createElement("span", null, /* @__PURE__ */ import_react.default.createElement(import_NodeTitleWidget.NodeTitleWidget, { node: node2 }));
    };
    const renderActions = (node2) => {
      if ((0, import_shared.isFn)(ctx.renderActions)) return ctx.renderActions(node2);
    };
    return /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        style,
        ref,
        className: (0, import_classnames.default)(prefix, className, "expanded"),
        "data-designer-outline-node-id": node.id
      },
      /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-header" }, /* @__PURE__ */ import_react.default.createElement(
        "div",
        {
          className: prefix + "-header-head",
          style: {
            left: -node.depth * 16,
            width: node.depth * 16
          }
        }
      ), /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-header-content" }, /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-header-base" }, (((_a = node == null ? void 0 : node.children) == null ? void 0 : _a.length) > 0 || node === node.root) && /* @__PURE__ */ import_react.default.createElement(
        "div",
        {
          className: prefix + "-expand",
          onClick: (e) => {
            var _a2, _b2, _c, _d;
            e.preventDefault();
            e.stopPropagation();
            if ((_b2 = (_a2 = ref.current) == null ? void 0 : _a2.classList) == null ? void 0 : _b2.contains("expanded")) {
              (_c = ref.current) == null ? void 0 : _c.classList.remove("expanded");
            } else {
              (_d = ref.current) == null ? void 0 : _d.classList.add("expanded");
            }
          }
        },
        /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "Expand", size: 10 })
      ), /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-icon" }, renderIcon(node)), /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-title" }, renderTitle(node))), /* @__PURE__ */ import_react.default.createElement(
        "div",
        {
          className: prefix + "-header-actions",
          "data-click-stop-propagation": true
        },
        renderActions(node),
        node !== node.root && /* @__PURE__ */ import_react.default.createElement(
          import_IconWidget.IconWidget,
          {
            className: (0, import_classnames.default)(prefix + "-hidden-icon", {
              hidden: node.hidden
            }),
            infer: node.hidden ? "EyeClose" : "Eye",
            size: 14,
            onClick: () => {
              node.hidden = !node.hidden;
            }
          }
        )
      ))),
      /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-children" }, (_b = node.children) == null ? void 0 : _b.map((child) => {
        return /* @__PURE__ */ import_react.default.createElement(
          OutlineTreeNode,
          {
            node: child,
            key: child.id,
            workspaceId
          }
        );
      }))
    );
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OutlineTreeNode
});
