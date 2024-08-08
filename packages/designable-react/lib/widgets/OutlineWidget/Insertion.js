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

// src/widgets/OutlineWidget/Insertion.tsx
var Insertion_exports = {};
__export(Insertion_exports, {
  Insertion: () => Insertion
});
module.exports = __toCommonJS(Insertion_exports);
var import_react = __toESM(require("react"));
var import_hooks = require("../../hooks");
var import_core = require("@designable/core");
var import_reactive_react = require("@formily/reactive-react");
var Insertion = (0, import_reactive_react.observer)(
  ({ workspaceId }) => {
    const outlineDragon = (0, import_hooks.useOutlineDragon)(workspaceId);
    const prefix = (0, import_hooks.usePrefix)("outline-tree-insertion");
    const createInsertionStyle = () => {
      const closestDirection = outlineDragon.closestDirection;
      const closestRect = outlineDragon.closestOffsetRect;
      const baseStyle = {
        position: "absolute",
        transform: "perspective(1px) translate3d(0,0,0)",
        top: 0,
        left: 0
      };
      if (!closestRect) return baseStyle;
      if (closestDirection === import_core.ClosestPosition.After || closestDirection === import_core.ClosestPosition.InnerAfter || closestDirection === import_core.ClosestPosition.Under || closestDirection === import_core.ClosestPosition.ForbidAfter || closestDirection === import_core.ClosestPosition.ForbidInnerAfter || closestDirection === import_core.ClosestPosition.ForbidUnder) {
        baseStyle.width = closestRect.width;
        baseStyle.height = 2;
        baseStyle.transform = `perspective(1px) translate3d(${closestRect.x}px,${closestRect.y + closestRect.height - 2}px,0)`;
      } else if (closestDirection === import_core.ClosestPosition.Before || closestDirection === import_core.ClosestPosition.InnerBefore || closestDirection === import_core.ClosestPosition.Upper || closestDirection === import_core.ClosestPosition.ForbidBefore || closestDirection === import_core.ClosestPosition.ForbidInnerBefore || closestDirection === import_core.ClosestPosition.ForbidUpper) {
        baseStyle.width = closestRect.width;
        baseStyle.height = 2;
        baseStyle.transform = `perspective(1px) translate3d(${closestRect.x}px,${closestRect.y}px,0)`;
      }
      if (closestDirection.includes("FORBID")) {
        baseStyle.backgroundColor = "red";
      } else {
        baseStyle.backgroundColor = "";
      }
      return baseStyle;
    };
    if (!(outlineDragon == null ? void 0 : outlineDragon.closestNode)) return null;
    return /* @__PURE__ */ import_react.default.createElement("div", { className: prefix, style: createInsertionStyle() });
  }
);
Insertion.displayName = "Insertion";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Insertion
});
