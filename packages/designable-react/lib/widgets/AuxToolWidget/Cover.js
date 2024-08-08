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

// src/widgets/AuxToolWidget/Cover.tsx
var Cover_exports = {};
__export(Cover_exports, {
  Cover: () => Cover
});
module.exports = __toCommonJS(Cover_exports);
var import_react = __toESM(require("react"));
var import_hooks = require("../../hooks");
var import_reactive_react = require("@formily/reactive-react");
var import_core = require("@designable/core");
var import_classnames = __toESM(require("classnames"));
var CoverRect = (props) => {
  const prefix = (0, import_hooks.usePrefix)("aux-cover-rect");
  const rect = (0, import_hooks.useValidNodeOffsetRect)(props.node);
  const createCoverStyle = () => {
    const baseStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      pointerEvents: "none"
    };
    if (rect) {
      baseStyle.transform = `perspective(1px) translate3d(${rect.x}px,${rect.y}px,0)`;
      baseStyle.height = rect.height;
      baseStyle.width = rect.width;
    }
    return baseStyle;
  };
  return /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      className: (0, import_classnames.default)(prefix, {
        dragging: props.dragging,
        dropping: props.dropping
      }),
      style: createCoverStyle()
    }
  );
};
var Cover = (0, import_reactive_react.observer)(() => {
  const viewportDragon = (0, import_hooks.useDragon)();
  const viewport = (0, import_hooks.useViewport)();
  const cursor = (0, import_hooks.useCursor)();
  const renderDropCover = () => {
    var _a;
    if (!viewportDragon.closestNode || !((_a = viewportDragon.closestNode) == null ? void 0 : _a.allowAppend(viewportDragon.dragNodes)) || viewportDragon.closestDirection !== import_core.ClosestPosition.Inner)
      return null;
    return /* @__PURE__ */ import_react.default.createElement(CoverRect, { node: viewportDragon.closestNode, dropping: true });
  };
  if (cursor.status !== import_core.CursorStatus.Dragging) return null;
  return /* @__PURE__ */ import_react.default.createElement(import_react.Fragment, null, viewportDragon.dragNodes.map((node) => {
    if (!node) return;
    if (!viewport.findElementById(node.id)) return;
    return /* @__PURE__ */ import_react.default.createElement(CoverRect, { key: node.id, node, dragging: true });
  }), renderDropCover());
});
Cover.displayName = "Cover";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Cover
});
