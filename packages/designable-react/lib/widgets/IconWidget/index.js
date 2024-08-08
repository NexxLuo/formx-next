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

// src/widgets/IconWidget/index.tsx
var IconWidget_exports = {};
__export(IconWidget_exports, {
  IconWidget: () => IconWidget
});
module.exports = __toCommonJS(IconWidget_exports);
var import_react = __toESM(require("react"));
var import_shared = require("@designable/shared");
var import_reactive_react = require("@formily/reactive-react");
var import_antd = require("antd");
var import_hooks = require("../../hooks");
var import_classnames = __toESM(require("classnames"));
var import_styles = require("./styles.less");
var IconContext = (0, import_react.createContext)(null);
var isNumSize = (val) => /^[\d.]+$/.test(val);
var IconWidget = (0, import_reactive_react.observer)((props) => {
  var _a, _b, _c;
  const theme = (0, import_hooks.useTheme)();
  const context = (0, import_react.useContext)(IconContext);
  const registry = (0, import_hooks.useRegistry)();
  const prefix = (0, import_hooks.usePrefix)("icon");
  const size = props.size || "1em";
  const height = ((_a = props.style) == null ? void 0 : _a.height) || size;
  const width = ((_b = props.style) == null ? void 0 : _b.width) || size;
  const takeIcon = (infer) => {
    if ((0, import_shared.isStr)(infer)) {
      const finded = registry.getDesignerIcon(infer);
      if (finded) {
        return takeIcon(finded);
      }
      return /* @__PURE__ */ import_react.default.createElement("img", { src: infer, height, width });
    } else if ((0, import_shared.isFn)(infer)) {
      return import_react.default.createElement(infer, {
        height,
        width,
        fill: "currentColor"
      });
    } else if (import_react.default.isValidElement(infer)) {
      if (infer.type === "svg") {
        return import_react.default.cloneElement(infer, {
          height,
          width,
          fill: "currentColor",
          viewBox: infer.props.viewBox || "0 0 1024 1024",
          focusable: "false",
          "aria-hidden": "true"
        });
      } else if (infer.type === "path" || infer.type === "g") {
        return /* @__PURE__ */ import_react.default.createElement(
          "svg",
          {
            viewBox: "0 0 1024 1024",
            height,
            width,
            fill: "currentColor",
            focusable: "false",
            "aria-hidden": "true"
          },
          infer
        );
      }
      return infer;
    } else if ((0, import_shared.isPlainObj)(infer)) {
      if (infer[theme]) {
        return takeIcon(infer[theme]);
      } else if (infer["shadow"]) {
        return /* @__PURE__ */ import_react.default.createElement(
          IconWidget.ShadowSVG,
          {
            width,
            height,
            content: infer["shadow"]
          }
        );
      }
      return null;
    }
  };
  const renderTooltips = (children) => {
    if (!(0, import_shared.isStr)(props.infer) && (context == null ? void 0 : context.tooltip)) return children;
    const tooltip = props.tooltip || registry.getDesignerMessage(`icons.${props.infer}`);
    if (tooltip) {
      const title = import_react.default.isValidElement(tooltip) || (0, import_shared.isStr)(tooltip) ? tooltip : tooltip.title;
      const props2 = import_react.default.isValidElement(tooltip) || (0, import_shared.isStr)(tooltip) ? {} : (0, import_shared.isObj)(tooltip) ? tooltip : {};
      return /* @__PURE__ */ import_react.default.createElement(import_antd.Tooltip, { ...props2, title }, children);
    }
    return children;
  };
  if (!props.infer) return null;
  return renderTooltips(
    /* @__PURE__ */ import_react.default.createElement(
      "span",
      {
        ...props,
        className: (0, import_classnames.default)(prefix, props.className),
        style: {
          ...props.style,
          cursor: props.onClick ? "pointer" : (_c = props.style) == null ? void 0 : _c.cursor
        }
      },
      takeIcon(props.infer)
    )
  );
});
IconWidget.ShadowSVG = (props) => {
  const ref = (0, import_react.useRef)();
  const width = isNumSize(props.width) ? `${props.width}px` : props.width;
  const height = isNumSize(props.height) ? `${props.height}px` : props.height;
  (0, import_react.useEffect)(() => {
    if (ref.current) {
      const root = ref.current.attachShadow({
        mode: "open"
      });
      root.innerHTML = `<svg viewBox="0 0 1024 1024" style="width:${width};height:${height}">${props.content}</svg>`;
    }
  }, []);
  return /* @__PURE__ */ import_react.default.createElement("div", { ref });
};
IconWidget.Provider = (props) => {
  return /* @__PURE__ */ import_react.default.createElement(IconContext.Provider, { value: props }, props.children);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IconWidget
});
