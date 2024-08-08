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

// src/components/FoldItem/index.tsx
var FoldItem_exports = {};
__export(FoldItem_exports, {
  FoldItem: () => FoldItem
});
module.exports = __toCommonJS(FoldItem_exports);
var import_react = __toESM(require("react"));
var import_formx_antd = require("@platform/formx-antd");
var import_react2 = require("@formily/react");
var import_reactive = require("@formily/reactive");
var import_designable_react = require("@platform/designable-react");
var import_classnames = __toESM(require("classnames"));
var import_styles = require("./styles.less");
var ExpandedMap = /* @__PURE__ */ new Map();
var FoldItem = (0, import_react2.observer)(({ className, style, children, ...props }) => {
  const prefix = (0, import_designable_react.usePrefix)("fold-item");
  const field = (0, import_react2.useField)();
  const expand = (0, import_react.useMemo)(
    () => import_reactive.observable.ref(ExpandedMap.get(field.address.toString())),
    []
  );
  const slots = (0, import_react.useRef)({ base: null, extra: null });
  import_react.default.Children.forEach(children, (node) => {
    var _a, _b;
    if (import_react.default.isValidElement(node)) {
      let _node = node;
      if (((_a = _node == null ? void 0 : _node["type"]) == null ? void 0 : _a["displayName"]) === "FoldItem.Base") {
        slots.current.base = _node["props"].children;
      }
      if (((_b = _node == null ? void 0 : _node["type"]) == null ? void 0 : _b["displayName"]) === "FoldItem.Extra") {
        slots.current.extra = _node["props"].children;
      }
    }
  });
  return /* @__PURE__ */ import_react.default.createElement("div", { className: (0, import_classnames.default)(prefix, className) }, /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      className: prefix + "-base",
      onClick: () => {
        expand.value = !expand.value;
        ExpandedMap.set(field.address.toString(), expand.value);
      }
    },
    /* @__PURE__ */ import_react.default.createElement(
      import_formx_antd.FormItem.BaseItem,
      {
        ...props,
        label: /* @__PURE__ */ import_react.default.createElement(
          "span",
          {
            className: (0, import_classnames.default)(prefix + "-title", {
              expand: expand.value
            })
          },
          slots.current.extra && /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "Expand", size: 10 }),
          props.label
        )
      },
      /* @__PURE__ */ import_react.default.createElement(
        "div",
        {
          style: { width: "100%" },
          onClick: (e) => {
            e.stopPropagation();
          }
        },
        slots.current.base
      )
    )
  ), expand.value && slots.current.extra && /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-extra" }, slots.current.extra));
});
var Base = () => {
  return /* @__PURE__ */ import_react.default.createElement(import_react.Fragment, null);
};
Base.displayName = "FoldItem.Base";
var Extra = () => {
  return /* @__PURE__ */ import_react.default.createElement(import_react.Fragment, null);
};
Extra.displayName = "FoldItem.Extra";
FoldItem.Base = Base;
FoldItem.Extra = Extra;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FoldItem
});
