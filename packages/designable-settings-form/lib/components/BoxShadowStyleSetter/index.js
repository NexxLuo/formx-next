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

// src/components/BoxShadowStyleSetter/index.tsx
var BoxShadowStyleSetter_exports = {};
__export(BoxShadowStyleSetter_exports, {
  BoxShadowStyleSetter: () => BoxShadowStyleSetter
});
module.exports = __toCommonJS(BoxShadowStyleSetter_exports);
var import_react = __toESM(require("react"));
var import_designable_react = require("@platform/designable-react");
var import_react2 = require("@formily/react");
var import_FoldItem = require("../FoldItem");
var import_ColorInput = require("../ColorInput");
var import_SizeInput = require("../SizeInput");
var import_InputItems = require("../InputItems");
var import_classnames = __toESM(require("classnames"));
var BoxShadowStyleSetter = (0, import_react2.observer)((props) => {
  const field = (0, import_react2.useField)();
  const prefix = (0, import_designable_react.usePrefix)("shadow-style-setter");
  const createBoxShadowConnector = (position) => {
    const splited = String(props.value || "").trim().split(" ");
    return {
      value: splited[position],
      onChange: (value) => {
        var _a;
        splited[position] = value;
        (_a = props.onChange) == null ? void 0 : _a.call(
          props,
          `${splited[0] || ""} ${splited[1] || ""} ${splited[2] || ""} ${splited[3] || ""} ${splited[4] || ""}`
        );
      }
    };
  };
  return /* @__PURE__ */ import_react.default.createElement(
    import_FoldItem.FoldItem,
    {
      className: (0, import_classnames.default)(prefix, props.className),
      style: props.style,
      label: field.title
    },
    /* @__PURE__ */ import_react.default.createElement(import_FoldItem.FoldItem.Base, null, /* @__PURE__ */ import_react.default.createElement(import_ColorInput.ColorInput, { ...createBoxShadowConnector(4) })),
    /* @__PURE__ */ import_react.default.createElement(import_FoldItem.FoldItem.Extra, null, /* @__PURE__ */ import_react.default.createElement(import_InputItems.InputItems, { width: "50%" }, /* @__PURE__ */ import_react.default.createElement(import_InputItems.InputItems.Item, { icon: "AxisX" }, /* @__PURE__ */ import_react.default.createElement(
      import_SizeInput.SizeInput,
      {
        exclude: ["inherit", "auto"],
        ...createBoxShadowConnector(0)
      }
    )), /* @__PURE__ */ import_react.default.createElement(import_InputItems.InputItems.Item, { icon: "AxisY" }, /* @__PURE__ */ import_react.default.createElement(
      import_SizeInput.SizeInput,
      {
        exclude: ["inherit", "auto"],
        ...createBoxShadowConnector(1)
      }
    )), /* @__PURE__ */ import_react.default.createElement(import_InputItems.InputItems.Item, { icon: "Blur" }, /* @__PURE__ */ import_react.default.createElement(
      import_SizeInput.SizeInput,
      {
        exclude: ["inherit", "auto"],
        ...createBoxShadowConnector(2)
      }
    )), /* @__PURE__ */ import_react.default.createElement(import_InputItems.InputItems.Item, { icon: "Shadow" }, /* @__PURE__ */ import_react.default.createElement(
      import_SizeInput.SizeInput,
      {
        exclude: ["inherit", "auto"],
        ...createBoxShadowConnector(3)
      }
    ))))
  );
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BoxShadowStyleSetter
});
