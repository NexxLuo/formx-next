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

// src/components/CollapseItem/index.tsx
var CollapseItem_exports = {};
__export(CollapseItem_exports, {
  CollapseItem: () => CollapseItem
});
module.exports = __toCommonJS(CollapseItem_exports);
var import_react = __toESM(require("react"));
var import_react2 = require("@formily/react");
var import_designable_react = require("@platform/designable-react");
var import_classnames = __toESM(require("classnames"));
var import_styles = require("./styles.less");
var CollapseItem = (0, import_react2.observer)((props) => {
  const prefix = (0, import_designable_react.usePrefix)("collapse-item");
  const field = (0, import_react2.useField)();
  const [expand, setExpand] = (0, import_react.useState)(props.defaultExpand ?? true);
  return /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      className: (0, import_classnames.default)(prefix, props.className, { expand }),
      style: props.style
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
      /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-header-expand" }, /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "Expand", size: 10 })),
      /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-header-content" }, field.title)
    ),
    /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-content" }, props.children)
  );
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CollapseItem
});
