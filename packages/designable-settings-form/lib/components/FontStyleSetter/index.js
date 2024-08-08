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

// src/components/FontStyleSetter/index.tsx
var FontStyleSetter_exports = {};
__export(FontStyleSetter_exports, {
  FontStyleSetter: () => FontStyleSetter
});
module.exports = __toCommonJS(FontStyleSetter_exports);
var import_react = __toESM(require("react"));
var import_designable_react = require("@platform/designable-react");
var import_react2 = require("@formily/react");
var import_formx_antd = require("@platform/formx-antd");
var import_FoldItem = require("../FoldItem");
var import_InputItems = require("../InputItems");
var import_SizeInput = require("../SizeInput");
var import_ColorInput = require("../ColorInput");
var import_classnames = __toESM(require("classnames"));
var createFontFamilyOptions = (fonts) => {
  return fonts.map((font) => {
    const splited = font.split("=");
    const label = splited == null ? void 0 : splited[0];
    const value = splited == null ? void 0 : splited[1];
    return {
      label: /* @__PURE__ */ import_react.default.createElement("span", { style: { fontFamily: value } }, label),
      value
    };
  });
};
var FontFamilyOptions = createFontFamilyOptions([
  "宋体=SimSun",
  "微软雅黑=Microsoft Yahei",
  "苹方=PingFang SC",
  "Andale Mono=andale mono,monospace",
  "Arial=arial,helvetica,sans-serif",
  "Arial Black=arial black,sans-serif",
  "Book Antiqua=book antiqua,palatino,serif",
  "Comic Sans MS=comic sans ms,sans-serif",
  "Courier New=courier new,courier,monospace",
  "Georgia=georgia,palatino,serif",
  "Helvetica Neue=Helvetica Neue",
  "Helvetica=helvetica,arial,sans-serif",
  "Impact=impact,sans-serif",
  "Symbol=symbol",
  "Tahoma=tahoma,arial,helvetica,sans-serif",
  "Terminal=terminal,monaco,monospace",
  "Times New Roman=times new roman,times,serif",
  "Trebuchet MS=trebuchet ms,geneva,sans-serif",
  "Verdana=verdana,geneva,sans-serif"
]);
var FontStyleSetter = (0, import_react2.observer)(
  (props) => {
    const field = (0, import_react2.useField)();
    const prefix = (0, import_designable_react.usePrefix)("font-style-setter");
    return /* @__PURE__ */ import_react.default.createElement(
      import_FoldItem.FoldItem,
      {
        label: field.title,
        className: (0, import_classnames.default)(prefix, props.className),
        style: props.style
      },
      /* @__PURE__ */ import_react.default.createElement(import_FoldItem.FoldItem.Base, null, /* @__PURE__ */ import_react.default.createElement(
        import_react2.Field,
        {
          name: "fontFamily",
          basePath: field.address.parent(),
          component: [
            import_formx_antd.Select,
            { style: { width: "100%" }, placeholder: "Helvetica Neue" }
          ],
          dataSource: FontFamilyOptions
        }
      )),
      /* @__PURE__ */ import_react.default.createElement(import_FoldItem.FoldItem.Extra, null, /* @__PURE__ */ import_react.default.createElement(import_InputItems.InputItems, null, /* @__PURE__ */ import_react.default.createElement(import_InputItems.InputItems.Item, { icon: "FontWeight", width: "50%" }, /* @__PURE__ */ import_react.default.createElement(
        import_react2.Field,
        {
          name: "fontWeight",
          basePath: field.address.parent(),
          component: [import_formx_antd.NumberPicker, { placeholder: "400" }]
        }
      )), /* @__PURE__ */ import_react.default.createElement(import_InputItems.InputItems.Item, { icon: "FontStyle", width: "50%" }, /* @__PURE__ */ import_react.default.createElement(
        import_react2.Field,
        {
          name: "fontStyle",
          basePath: field.address.parent(),
          dataSource: [
            {
              label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "NormalFontStyle" }),
              value: "normal"
            },
            {
              label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "ItalicFontStyle" }),
              value: "italic"
            }
          ],
          component: [import_formx_antd.Radio.Group, { optionType: "button" }]
        }
      )), /* @__PURE__ */ import_react.default.createElement(import_InputItems.InputItems.Item, { icon: "FontColor", width: "100%" }, /* @__PURE__ */ import_react.default.createElement(
        import_react2.Field,
        {
          name: "color",
          basePath: field.address.parent(),
          component: [import_ColorInput.ColorInput]
        }
      )), /* @__PURE__ */ import_react.default.createElement(import_InputItems.InputItems.Item, { icon: "FontSize", width: "50%" }, /* @__PURE__ */ import_react.default.createElement(
        import_react2.Field,
        {
          name: "fontSize",
          basePath: field.address.parent(),
          component: [import_SizeInput.SizeInput, { exclude: ["auto"] }]
        }
      )), /* @__PURE__ */ import_react.default.createElement(import_InputItems.InputItems.Item, { icon: "LineHeight", width: "50%" }, /* @__PURE__ */ import_react.default.createElement(
        import_react2.Field,
        {
          name: "lineHeight",
          basePath: field.address.parent(),
          component: [import_SizeInput.SizeInput, { exclude: ["auto"] }]
        }
      )), /* @__PURE__ */ import_react.default.createElement(import_InputItems.InputItems.Item, { icon: "TextAlign" }, /* @__PURE__ */ import_react.default.createElement(
        import_react2.Field,
        {
          name: "textAlign",
          basePath: field.address.parent(),
          dataSource: [
            {
              label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "TextAlignLeft" }),
              value: "left"
            },
            {
              label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "TextAlignCenter" }),
              value: "center"
            },
            {
              label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "TextAlignRight" }),
              value: "right"
            },
            {
              label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "TextAlignJustify" }),
              value: "justify"
            }
          ],
          component: [import_formx_antd.Radio.Group, { optionType: "button" }]
        }
      )), /* @__PURE__ */ import_react.default.createElement(import_InputItems.InputItems.Item, { icon: "TextDecoration" }, /* @__PURE__ */ import_react.default.createElement(
        import_react2.Field,
        {
          name: "textDecoration",
          basePath: field.address.parent(),
          dataSource: [
            {
              label: "--",
              value: "none"
            },
            {
              label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "TextUnderline" }),
              value: "underline"
            },
            {
              label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "TextLineThrough" }),
              value: "line-through"
            }
          ],
          component: [import_formx_antd.Radio.Group, { optionType: "button" }]
        }
      ))))
    );
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FontStyleSetter
});
