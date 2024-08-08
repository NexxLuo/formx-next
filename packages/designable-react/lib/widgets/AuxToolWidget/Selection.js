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

// src/widgets/AuxToolWidget/Selection.tsx
var Selection_exports = {};
__export(Selection_exports, {
  Selection: () => Selection,
  SelectionBox: () => SelectionBox
});
module.exports = __toCommonJS(Selection_exports);
var import_react = __toESM(require("react"));
var import_Helpers = require("./Helpers");
var import_ResizeHandler = require("./ResizeHandler");
var import_hooks = require("../../hooks");
var import_reactive_react = require("@formily/reactive-react");
var import_TranslateHandler = require("./TranslateHandler");
var SelectionBox = (props) => {
  var _a;
  const designer = (0, import_hooks.useDesigner)();
  const prefix = (0, import_hooks.usePrefix)("aux-selection-box");
  const innerPrefix = (0, import_hooks.usePrefix)("aux-selection-box-inner");
  const nodeRect = (0, import_hooks.useValidNodeOffsetRect)(props.node);
  const createSelectionStyle = () => {
    const baseStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      boxSizing: "border-box"
    };
    if (nodeRect) {
      baseStyle.transform = `perspective(1px) translate3d(${nodeRect.x}px,${nodeRect.y}px,0)`;
      baseStyle.height = nodeRect.height;
      baseStyle.width = nodeRect.width;
    }
    return baseStyle;
  };
  if (!nodeRect) return null;
  if (!nodeRect.width || !nodeRect.height) return null;
  const selectionId = {
    [(_a = designer.props) == null ? void 0 : _a.nodeSelectionIdAttrName]: props.node.id
  };
  return /* @__PURE__ */ import_react.default.createElement("div", { ...selectionId, className: prefix, style: createSelectionStyle() }, /* @__PURE__ */ import_react.default.createElement("div", { className: innerPrefix }), /* @__PURE__ */ import_react.default.createElement(import_ResizeHandler.ResizeHandler, { node: props.node }), /* @__PURE__ */ import_react.default.createElement(import_TranslateHandler.TranslateHandler, { node: props.node }), props.showHelpers && /* @__PURE__ */ import_react.default.createElement(import_Helpers.Helpers, { ...props, node: props.node, nodeRect }));
};
var Selection = (0, import_reactive_react.observer)(() => {
  const selection = (0, import_hooks.useSelection)();
  const tree = (0, import_hooks.useTree)();
  const cursor = (0, import_hooks.useCursor)();
  const viewportDragon = (0, import_hooks.useDragon)();
  if (cursor.status !== "NORMAL" && viewportDragon.touchNode) return null;
  return /* @__PURE__ */ import_react.default.createElement(import_react.Fragment, null, selection.selected.map((id) => {
    const node = tree.findById(id);
    if (!node) return;
    if (node.hidden) return;
    return /* @__PURE__ */ import_react.default.createElement(
      SelectionBox,
      {
        key: id,
        node,
        showHelpers: selection.selected.length === 1
      }
    );
  }));
});
Selection.displayName = "Selection";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Selection,
  SelectionBox
});
