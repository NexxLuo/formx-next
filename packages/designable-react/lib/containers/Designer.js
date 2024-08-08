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

// src/containers/Designer.tsx
var Designer_exports = {};
__export(Designer_exports, {
  Designer: () => Designer
});
module.exports = __toCommonJS(Designer_exports);
var import_react = __toESM(require("react"));
var import_core = require("@designable/core");
var import_context = require("../context");
var import_widgets = require("../widgets");
var import_hooks = require("../hooks");
var import_Layout = require("./Layout");
var icons = __toESM(require("../icons"));
import_core.GlobalRegistry.registerDesignerIcons(icons);
var Designer = (props) => {
  const engine = (0, import_hooks.useDesigner)();
  const ref = (0, import_react.useRef)();
  (0, import_react.useEffect)(() => {
    if (props.engine) {
      if (props.engine && ref.current) {
        if (props.engine !== ref.current) {
          ref.current.unmount();
        }
      }
      props.engine.mount();
      ref.current = props.engine;
    }
    return () => {
      if (props.engine) {
        props.engine.unmount();
      }
    };
  }, [props.engine]);
  if (engine)
    throw new Error(
      "There can only be one Designable Engine Context in the React Tree"
    );
  return /* @__PURE__ */ import_react.default.createElement(import_Layout.Layout, { ...props }, /* @__PURE__ */ import_react.default.createElement(import_context.DesignerEngineContext.Provider, { value: props.engine }, props.children, /* @__PURE__ */ import_react.default.createElement(import_widgets.GhostWidget, null)));
};
Designer.defaultProps = {
  prefixCls: "dn-",
  theme: "light"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Designer
});
