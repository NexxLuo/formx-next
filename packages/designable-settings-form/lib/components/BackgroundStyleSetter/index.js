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

// src/components/BackgroundStyleSetter/index.tsx
var BackgroundStyleSetter_exports = {};
__export(BackgroundStyleSetter_exports, {
  BackgroundStyleSetter: () => BackgroundStyleSetter
});
module.exports = __toCommonJS(BackgroundStyleSetter_exports);
var import_react = __toESM(require("react"));
var import_react2 = require("@formily/react");
var import_designable_react = require("@platform/designable-react");
var import_formx_antd = require("@platform/formx-antd");
var import_FoldItem = require("../FoldItem");
var import_ColorInput = require("../ColorInput");
var import_SizeInput = require("../SizeInput");
var import_ImageInput = require("../ImageInput");
var import_InputItems = require("../InputItems");
var import_classnames = __toESM(require("classnames"));
var BackgroundStyleSetter = (0, import_react2.observer)((props) => {
  const field = (0, import_react2.useField)();
  const prefix = (0, import_designable_react.usePrefix)("background-style-setter");
  return /* @__PURE__ */ import_react.default.createElement(import_FoldItem.FoldItem, { className: (0, import_classnames.default)(prefix, props.className), label: field.title }, /* @__PURE__ */ import_react.default.createElement(import_FoldItem.FoldItem.Base, null, /* @__PURE__ */ import_react.default.createElement(
    import_react2.Field,
    {
      name: "backgroundColor",
      basePath: field.address.parent(),
      component: [import_ColorInput.ColorInput]
    }
  )), /* @__PURE__ */ import_react.default.createElement(import_FoldItem.FoldItem.Extra, null, /* @__PURE__ */ import_react.default.createElement(import_InputItems.InputItems, null, /* @__PURE__ */ import_react.default.createElement(import_InputItems.InputItems.Item, { icon: "Image" }, /* @__PURE__ */ import_react.default.createElement(
    import_react2.Field,
    {
      name: "backgroundImage",
      basePath: field.address.parent(),
      component: [import_ImageInput.BackgroundImageInput]
    }
  )), /* @__PURE__ */ import_react.default.createElement(import_InputItems.InputItems.Item, { icon: "ImageSize", width: "50%" }, /* @__PURE__ */ import_react.default.createElement(
    import_react2.Field,
    {
      name: "backgroundSize",
      basePath: field.address.parent(),
      component: [import_SizeInput.BackgroundSizeInput]
    }
  )), /* @__PURE__ */ import_react.default.createElement(import_InputItems.InputItems.Item, { icon: "Repeat", width: "50%" }, /* @__PURE__ */ import_react.default.createElement(
    import_react2.Field,
    {
      name: "backgroundRepeat",
      basePath: field.address.parent(),
      component: [
        import_formx_antd.Select,
        { style: { width: "100%" }, placeholder: "Repeat" }
      ],
      dataSource: [
        {
          label: "No Repeat",
          value: "no-repeat"
        },
        {
          label: "Repeat",
          value: "repeat"
        },
        {
          label: "Repeat X",
          value: "repeat-x"
        },
        {
          label: "Repeat Y",
          value: "repeat-y"
        },
        {
          label: "Space",
          value: "space"
        },
        {
          label: "Round",
          value: "round"
        }
      ]
    }
  )), /* @__PURE__ */ import_react.default.createElement(import_InputItems.InputItems.Item, { icon: "Position" }, /* @__PURE__ */ import_react.default.createElement(
    import_react2.Field,
    {
      name: "backgroundPosition",
      basePath: field.address.parent(),
      component: [import_formx_antd.Input, { placeholder: "center center" }]
    }
  )))));
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BackgroundStyleSetter
});
