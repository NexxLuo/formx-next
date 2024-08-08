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

// src/widgets/ResourceWidget/index.tsx
var ResourceWidget_exports = {};
__export(ResourceWidget_exports, {
  ResourceWidget: () => ResourceWidget
});
module.exports = __toCommonJS(ResourceWidget_exports);
var import_react = __toESM(require("react"));
var import_core = require("@designable/core");
var import_shared = require("@designable/shared");
var import_reactive_react = require("@formily/reactive-react");
var import_hooks = require("../../hooks");
var import_IconWidget = require("../IconWidget");
var import_TextWidget = require("../TextWidget");
var import_classnames = __toESM(require("classnames"));
var import_styles = require("./styles.less");
var ResourceWidget = (0, import_reactive_react.observer)(
  (props) => {
    const prefix = (0, import_hooks.usePrefix)("resource");
    const [expand, setExpand] = (0, import_react.useState)(props.defaultExpand);
    const renderNode = (source) => {
      var _a;
      const { node, icon, title, thumb, span } = source;
      return /* @__PURE__ */ import_react.default.createElement(
        "div",
        {
          className: prefix + "-item",
          style: { gridColumnStart: `span ${span || 1}` },
          key: node.id,
          "data-designer-source-id": node.id
        },
        thumb && /* @__PURE__ */ import_react.default.createElement("img", { className: prefix + "-item-thumb", src: thumb }),
        icon && import_react.default.isValidElement(icon) ? /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, icon) : /* @__PURE__ */ import_react.default.createElement(
          import_IconWidget.IconWidget,
          {
            className: prefix + "-item-icon",
            infer: icon,
            style: { width: 150, height: 40 }
          }
        ),
        /* @__PURE__ */ import_react.default.createElement("span", { className: prefix + "-item-text" }, /* @__PURE__ */ import_react.default.createElement(import_TextWidget.TextWidget, null, title || ((_a = node.children[0]) == null ? void 0 : _a.getMessage("title"))))
      );
    };
    const sources = props.sources.reduce((buf, source) => {
      if ((0, import_core.isResourceList)(source)) {
        return buf.concat(source);
      } else if ((0, import_core.isResourceHost)(source)) {
        return buf.concat(source.Resource);
      }
      return buf;
    }, []);
    const remainItems = sources.reduce((length, source) => {
      return length + (source.span ?? 1);
    }, 0) % 3;
    return /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        className: (0, import_classnames.default)(prefix, props.className, {
          expand
        })
      },
      /* @__PURE__ */ import_react.default.createElement(
        "div",
        {
          className: prefix + "-header",
          onClick: (e) => {
            e.stopPropagation();
            e.preventDefault();
            setExpand(!expand);
          }
        },
        /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-header-expand" }, /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "Expand", size: 10 })),
        /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-header-content" }, /* @__PURE__ */ import_react.default.createElement(import_TextWidget.TextWidget, null, props.title))
      ),
      /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-content-wrapper" }, /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-content" }, sources.map((0, import_shared.isFn)(props.children) ? props.children : renderNode), remainItems ? /* @__PURE__ */ import_react.default.createElement(
        "div",
        {
          className: prefix + "-item-remain",
          style: { gridColumnStart: `span ${3 - remainItems}` }
        }
      ) : null))
    );
  }
);
ResourceWidget.defaultProps = {
  defaultExpand: true
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ResourceWidget
});
