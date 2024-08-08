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

// src/widgets/AuxToolWidget/FreeSelection.tsx
var FreeSelection_exports = {};
__export(FreeSelection_exports, {
  FreeSelection: () => FreeSelection
});
module.exports = __toCommonJS(FreeSelection_exports);
var import_react = __toESM(require("react"));
var import_hooks = require("../../hooks");
var import_reactive_react = require("@formily/reactive-react");
var import_core = require("@designable/core");
var import_shared = require("@designable/shared");
var import_classnames = __toESM(require("classnames"));
var FreeSelection = (0, import_reactive_react.observer)(() => {
  const cursor = (0, import_hooks.useCursor)();
  const viewport = (0, import_hooks.useViewport)();
  const prefix = (0, import_hooks.usePrefix)("aux-free-selection");
  const createSelectionStyle = () => {
    const startDragPoint = viewport.getOffsetPoint({
      x: cursor.dragStartPosition.topClientX,
      y: cursor.dragStartPosition.topClientY
    });
    const currentPoint = viewport.getOffsetPoint({
      x: cursor.position.topClientX,
      y: cursor.position.topClientY
    });
    const rect = (0, import_shared.calcRectByStartEndPoint)(
      startDragPoint,
      currentPoint,
      viewport.scrollX - cursor.dragStartScrollOffset.scrollX,
      viewport.scrollY - cursor.dragStartScrollOffset.scrollY
    );
    const baseStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      opacity: 0.2,
      borderWidth: 1,
      borderStyle: "solid",
      transform: `perspective(1px) translate3d(${rect.x}px,${rect.y}px,0)`,
      height: rect.height,
      width: rect.width,
      pointerEvents: "none",
      boxSizing: "border-box",
      zIndex: 1
    };
    return baseStyle;
  };
  if (cursor.status !== import_core.CursorStatus.Dragging || cursor.type !== import_core.CursorType.Selection)
    return null;
  return /* @__PURE__ */ import_react.default.createElement("div", { className: (0, import_classnames.default)(prefix), style: createSelectionStyle() });
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FreeSelection
});
