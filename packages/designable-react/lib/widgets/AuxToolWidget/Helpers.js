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

// src/widgets/AuxToolWidget/Helpers.tsx
var Helpers_exports = {};
__export(Helpers_exports, {
  Helpers: () => Helpers
});
module.exports = __toCommonJS(Helpers_exports);
var import_react = __toESM(require("react"));
var import_reactive = require("@formily/reactive");
var import_classnames = __toESM(require("classnames"));
var import_hooks = require("../../hooks");
var import_Selector = require("./Selector");
var import_Copy = require("./Copy");
var import_Delete = require("./Delete");
var import_DragHandler = require("./DragHandler");
var HELPER_DEBOUNCE_TIMEOUT = 100;
var Helpers = ({ node, nodeRect }) => {
  const prefix = (0, import_hooks.usePrefix)("aux-helpers");
  const designer = (0, import_hooks.useDesigner)();
  const viewport = (0, import_hooks.useViewport)();
  const unmountRef = (0, import_react.useRef)(false);
  const ref = (0, import_react.useRef)();
  const [position, setPosition] = (0, import_react.useState)("top-right");
  (0, import_react.useLayoutEffect)(() => {
    let request = null;
    const getYInViewport = (nodeRect2, helpersRect) => {
      if (nodeRect2.top - viewport.scrollY > helpersRect.height) {
        return "top";
      } else if (viewport.isScrollTop && nodeRect2.height + helpersRect.height > viewport.height) {
        return "inner-top";
      } else if (viewport.isScrollBottom && nodeRect2.height + helpersRect.height > viewport.height) {
        return "inner-bottom";
      }
      return "bottom";
    };
    const getXInViewport = (nodeRect2, helpersRect) => {
      const widthDelta = helpersRect.width - nodeRect2.width;
      if (widthDelta >= 0) {
        if (nodeRect2.x < widthDelta) {
          return "left";
        } else if (nodeRect2.right + widthDelta > viewport.width) {
          return "right";
        } else {
          return "center";
        }
      }
      return "right";
    };
    const update = () => {
      var _a;
      const helpersRect = (_a = ref.current) == null ? void 0 : _a.getBoundingClientRect();
      if (!helpersRect || !nodeRect) return;
      if (unmountRef.current) return;
      setPosition(
        getYInViewport(nodeRect, helpersRect) + "-" + getXInViewport(nodeRect, helpersRect)
      );
    };
    update();
    return (0, import_reactive.reaction)(
      () => [
        viewport.width,
        viewport.height,
        viewport.scrollX,
        viewport.scrollY,
        viewport.isScrollBottom,
        viewport.isScrollTop
      ],
      () => {
        clearTimeout(request);
        request = setTimeout(update, HELPER_DEBOUNCE_TIMEOUT);
      }
    );
  }, [viewport, nodeRect]);
  if (!nodeRect || !node) return null;
  return /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      className: (0, import_classnames.default)(prefix, {
        [position]: true
      }),
      ref
    },
    /* @__PURE__ */ import_react.default.createElement("div", { className: (0, import_classnames.default)(prefix + "-content") }, /* @__PURE__ */ import_react.default.createElement(import_Selector.Selector, { node }), (node == null ? void 0 : node.allowClone()) === false ? null : /* @__PURE__ */ import_react.default.createElement(import_Copy.Copy, { node }), (node == null ? void 0 : node.allowDrag()) === false ? null : /* @__PURE__ */ import_react.default.createElement(import_DragHandler.DragHandler, { node }), (node == null ? void 0 : node.allowDelete()) === false ? null : /* @__PURE__ */ import_react.default.createElement(import_Delete.Delete, { node }))
  );
};
Helpers.displayName = "Helpers";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Helpers
});
