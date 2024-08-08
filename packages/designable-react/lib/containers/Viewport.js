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

// src/containers/Viewport.tsx
var Viewport_exports = {};
__export(Viewport_exports, {
  Viewport: () => Viewport
});
module.exports = __toCommonJS(Viewport_exports);
var import_react = __toESM(require("react"));
var import_hooks = require("../hooks");
var import_widgets = require("../widgets");
var import_shared = require("@designable/shared");
var import_classnames = __toESM(require("classnames"));
var Viewport = ({
  placeholder,
  dragTipsDirection,
  ...props
}) => {
  const [loaded, setLoaded] = (0, import_react.useState)(false);
  const prefix = (0, import_hooks.usePrefix)("viewport");
  const viewport = (0, import_hooks.useViewport)();
  const ref = (0, import_react.useRef)();
  const viewportRef = (0, import_react.useRef)();
  const isFrameRef = (0, import_react.useRef)(false);
  (0, import_react.useLayoutEffect)(() => {
    const frameElement = ref.current.querySelector("iframe");
    if (!viewport) return;
    if (viewportRef.current && viewportRef.current !== viewport) {
      viewportRef.current.onUnmount();
    }
    if (frameElement) {
      frameElement.addEventListener("load", () => {
        viewport.onMount(frameElement, frameElement.contentWindow);
        (0, import_shared.requestIdle)(() => {
          isFrameRef.current = true;
          setLoaded(true);
        });
      });
    } else {
      viewport.onMount(ref.current, import_shared.globalThisPolyfill);
      (0, import_shared.requestIdle)(() => {
        isFrameRef.current = false;
        setLoaded(true);
      });
    }
    viewportRef.current = viewport;
    return () => {
      viewport.onUnmount();
    };
  }, [viewport]);
  return /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      ...props,
      ref,
      className: (0, import_classnames.default)(prefix, props.className),
      style: {
        opacity: !loaded ? 0 : 1,
        overflow: isFrameRef.current ? "hidden" : "overlay",
        ...props.style
      }
    },
    props.children,
    /* @__PURE__ */ import_react.default.createElement(import_widgets.AuxToolWidget, null),
    /* @__PURE__ */ import_react.default.createElement(import_widgets.EmptyWidget, { dragTipsDirection }, placeholder)
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Viewport
});
