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

// src/widgets/DroppableWidget/index.tsx
var DroppableWidget_exports = {};
__export(DroppableWidget_exports, {
  DroppableWidget: () => DroppableWidget
});
module.exports = __toCommonJS(DroppableWidget_exports);
var import_react = __toESM(require("react"));
var import_reactive_react = require("@formily/reactive-react");
var import_hooks = require("../../hooks");
var import_NodeTitleWidget = require("../NodeTitleWidget");
var import_NodeActionsWidget = require("../NodeActionsWidget");
var import_styles = require("./styles.less");
var DroppableWidget = (0, import_reactive_react.observer)(
  ({
    node,
    actions,
    height,
    placeholder,
    style,
    className,
    hasChildren: hasChildrenProp,
    ...props
  }) => {
    var _a;
    const currentNode = (0, import_hooks.useTreeNode)();
    const nodeId = (0, import_hooks.useNodeIdProps)(node);
    const target = node ?? currentNode;
    const hasChildren = hasChildrenProp ?? ((_a = target.children) == null ? void 0 : _a.length) > 0;
    return /* @__PURE__ */ import_react.default.createElement("div", { ...nodeId, className, style }, hasChildren ? props.children : placeholder ? /* @__PURE__ */ import_react.default.createElement("div", { style: { height }, className: "dn-droppable-placeholder" }, /* @__PURE__ */ import_react.default.createElement(import_NodeTitleWidget.NodeTitleWidget, { node: target })) : props.children, (actions == null ? void 0 : actions.length) ? /* @__PURE__ */ import_react.default.createElement(import_NodeActionsWidget.NodeActionsWidget, null, actions.map((action, key) => /* @__PURE__ */ import_react.default.createElement(import_NodeActionsWidget.NodeActionsWidget.Action, { ...action, key }))) : null);
  }
);
DroppableWidget.defaultProps = {
  placeholder: true
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DroppableWidget
});
