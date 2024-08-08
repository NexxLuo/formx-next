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

// src/widgets/GhostWidget/index.tsx
var GhostWidget_exports = {};
__export(GhostWidget_exports, {
  GhostWidget: () => GhostWidget
});
module.exports = __toCommonJS(GhostWidget_exports);
var import_react = __toESM(require("react"));
var import_hooks = require("../../hooks");
var import_core = require("@designable/core");
var import_reactive = require("@formily/reactive");
var import_reactive_react = require("@formily/reactive-react");
var import_NodeTitleWidget = require("../NodeTitleWidget");
var import_styles = require("./styles.less");
var GhostWidget = (0, import_reactive_react.observer)(() => {
  const designer = (0, import_hooks.useDesigner)();
  const cursor = (0, import_hooks.useCursor)();
  const ref = (0, import_react.useRef)();
  const prefix = (0, import_hooks.usePrefix)("ghost");
  const draggingNodes = designer.findDraggingNodes();
  const firstNode = draggingNodes[0];
  (0, import_react.useEffect)(
    () => (0, import_reactive.autorun)(() => {
      var _a, _b;
      const transform = `perspective(1px) translate3d(${((_a = cursor.position) == null ? void 0 : _a.topClientX) - 18}px,${((_b = cursor.position) == null ? void 0 : _b.topClientY) - 12}px,0) scale(0.8)`;
      if (!ref.current) return;
      ref.current.style.transform = transform;
    }),
    [designer, cursor]
  );
  const renderNodes = () => {
    return /* @__PURE__ */ import_react.default.createElement(
      "span",
      {
        style: {
          whiteSpace: "nowrap"
        }
      },
      /* @__PURE__ */ import_react.default.createElement(import_NodeTitleWidget.NodeTitleWidget, { node: firstNode }),
      draggingNodes.length > 1 ? "..." : ""
    );
  };
  if (!firstNode) return null;
  return cursor.status === import_core.CursorStatus.Dragging ? /* @__PURE__ */ import_react.default.createElement("div", { ref, className: prefix }, renderNodes()) : null;
});
GhostWidget.displayName = "GhostWidget";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GhostWidget
});
