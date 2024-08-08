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

// src/containers/Layout.tsx
var Layout_exports = {};
__export(Layout_exports, {
  Layout: () => Layout
});
module.exports = __toCommonJS(Layout_exports);
var import_react = __toESM(require("react"));
var import_shared = require("@designable/shared");
var import_context = require("../context");
var import_classnames = __toESM(require("classnames"));
var Layout = (props) => {
  const layout = (0, import_react.useContext)(import_context.DesignerLayoutContext);
  const ref = (0, import_react.useRef)();
  (0, import_react.useLayoutEffect)(() => {
    if (ref.current) {
      (0, import_shared.each)(props.variables, (value, key) => {
        ref.current.style.setProperty(`--${key}`, value);
      });
    }
  }, []);
  if (layout) {
    return /* @__PURE__ */ import_react.default.createElement(import_react.Fragment, null, props.children);
  }
  return /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      ref,
      className: (0, import_classnames.default)({
        [`${props.prefixCls}app`]: true,
        [`${props.prefixCls}${props.theme}`]: props.theme
      })
    },
    /* @__PURE__ */ import_react.default.createElement(
      import_context.DesignerLayoutContext.Provider,
      {
        value: {
          theme: props.theme,
          prefixCls: props.prefixCls,
          position: props.position
        }
      },
      props.children
    )
  );
};
Layout.defaultProps = {
  theme: "light",
  prefixCls: "dn-",
  position: "fixed"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Layout
});
