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

// src/components/BoxStyleSetter/index.tsx
var BoxStyleSetter_exports = {};
__export(BoxStyleSetter_exports, {
  BoxStyleSetter: () => BoxStyleSetter
});
module.exports = __toCommonJS(BoxStyleSetter_exports);
var import_react = __toESM(require("react"));
var import_react2 = require("@formily/react");
var import_designable_react = require("@platform/designable-react");
var import_FoldItem = require("../FoldItem");
var import_SizeInput = require("../SizeInput");
var import_InputItems = require("../InputItems");
var import_classnames = __toESM(require("classnames"));
var PositionMap = {
  top: 1,
  right: 2,
  bottom: 3,
  left: 4,
  all: 1
};
var BoxRex = /([\d\.]+[^\d\s\.+-]+)(?:\s+([\d\.]+[^\d\s\.+-]+)(?:\s+([\d\.]+[^\d\s\.+-]+)(?:\s+([\d\.]+[^\d\s\.+-]+))?)?)?/;
var BoxStyleSetter = (0, import_react2.observer)(
  (props) => {
    const field = (0, import_react2.useField)();
    const prefix = (0, import_designable_react.usePrefix)("box-style-setter");
    const createPositionHandler = (position, props2) => {
      const matched = String(props2.value).match(BoxRex) || [];
      const value = matched[PositionMap[position]];
      const v1 = matched[1];
      const v2 = matched[2];
      const v3 = matched[3];
      const v4 = matched[4];
      const allEqualls = v1 === v2 && v2 === v3 && v3 === v4;
      return {
        ...props2,
        value: position === "all" ? allEqualls ? v1 : void 0 : value,
        onChange(value2) {
          var _a, _b;
          if (position === "all") {
            (_a = props2.onChange) == null ? void 0 : _a.call(
              props2,
              `${value2 || "0px"} ${value2 || "0px"} ${value2 || "0px"} ${value2 || "0px"}`
            );
          } else {
            matched[PositionMap[position]] = value2;
            (_b = props2.onChange) == null ? void 0 : _b.call(
              props2,
              `${matched[1] || "0px"} ${matched[2] || "0px"} ${matched[3] || "0px"} ${matched[4] || "0px"}`
            );
          }
        }
      };
    };
    return /* @__PURE__ */ import_react.default.createElement(import_FoldItem.FoldItem, { className: (0, import_classnames.default)(prefix, props.className), label: field.title }, /* @__PURE__ */ import_react.default.createElement(import_FoldItem.FoldItem.Base, null, /* @__PURE__ */ import_react.default.createElement(
      import_SizeInput.SizeInput,
      {
        ...createPositionHandler("all", props),
        exclude: ["inherit", "auto"]
      }
    )), /* @__PURE__ */ import_react.default.createElement(import_FoldItem.FoldItem.Extra, null, /* @__PURE__ */ import_react.default.createElement(import_InputItems.InputItems, { width: "50%" }, /* @__PURE__ */ import_react.default.createElement(import_InputItems.InputItems.Item, { icon: props.labels[0] }, /* @__PURE__ */ import_react.default.createElement(
      import_SizeInput.SizeInput,
      {
        ...createPositionHandler("top", props),
        exclude: ["inherit", "auto"]
      }
    )), /* @__PURE__ */ import_react.default.createElement(import_InputItems.InputItems.Item, { icon: props.labels[1] }, /* @__PURE__ */ import_react.default.createElement(
      import_SizeInput.SizeInput,
      {
        ...createPositionHandler("right", props),
        exclude: ["inherit", "auto"]
      }
    )), /* @__PURE__ */ import_react.default.createElement(import_InputItems.InputItems.Item, { icon: props.labels[2] }, /* @__PURE__ */ import_react.default.createElement(
      import_SizeInput.SizeInput,
      {
        ...createPositionHandler("bottom", props),
        exclude: ["inherit", "auto"]
      }
    )), /* @__PURE__ */ import_react.default.createElement(import_InputItems.InputItems.Item, { icon: props.labels[3] }, /* @__PURE__ */ import_react.default.createElement(
      import_SizeInput.SizeInput,
      {
        ...createPositionHandler("left", props),
        exclude: ["inherit", "auto"]
      }
    )))));
  }
);
BoxStyleSetter.defaultProps = {
  labels: [
    /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "Top", size: 16, key: "1" }),
    /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "Right", size: 16, key: "2" }),
    /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "Bottom", size: 16, key: "3" }),
    /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "Left", size: 16, key: "4" })
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BoxStyleSetter
});
