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

// src/components/ColorInput/index.tsx
var ColorInput_exports = {};
__export(ColorInput_exports, {
  ColorInput: () => ColorInput
});
module.exports = __toCommonJS(ColorInput_exports);
var import_react = __toESM(require("react"));
var import_antd = require("antd");
var import_designable_react = require("@platform/designable-react");
var import_react_color = require("react-color");
var import_styles = require("./styles.less");
var ColorInput = (props) => {
  const container = (0, import_react.useRef)();
  const prefix = (0, import_designable_react.usePrefix)("color-input");
  const color = props.value;
  return /* @__PURE__ */ import_react.default.createElement("div", { ref: container, className: prefix }, /* @__PURE__ */ import_react.default.createElement(
    import_antd.Input,
    {
      value: props.value,
      onChange: (e) => {
        var _a;
        (_a = props.onChange) == null ? void 0 : _a.call(props, e.target.value);
      },
      placeholder: "Color",
      prefix: /* @__PURE__ */ import_react.default.createElement(
        import_antd.Popover,
        {
          autoAdjustOverflow: true,
          trigger: "click",
          getPopupContainer: () => container.current,
          content: /* @__PURE__ */ import_react.default.createElement(
            import_react_color.SketchPicker,
            {
              color,
              onChange: ({ rgb }) => {
                var _a;
                (_a = props.onChange) == null ? void 0 : _a.call(props, `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`);
              }
            }
          )
        },
        /* @__PURE__ */ import_react.default.createElement(
          "div",
          {
            className: prefix + "-color-tips",
            style: {
              backgroundColor: color
            }
          }
        )
      )
    }
  ));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ColorInput
});
