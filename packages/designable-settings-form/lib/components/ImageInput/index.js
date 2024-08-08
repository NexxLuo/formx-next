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

// src/components/ImageInput/index.tsx
var ImageInput_exports = {};
__export(ImageInput_exports, {
  BackgroundImageInput: () => BackgroundImageInput,
  ImageInput: () => ImageInput
});
module.exports = __toCommonJS(ImageInput_exports);
var import_react = __toESM(require("react"));
var import_antd = require("antd");
var import_designable_react = require("@platform/designable-react");
var import_context = require("../../shared/context");
var import_classnames = __toESM(require("classnames"));
var import_styles = require("./styles.less");
var ImageInput = ({
  className,
  style,
  ...props
}) => {
  const prefix = (0, import_designable_react.usePrefix)("image-input");
  const context = (0, import_react.useContext)(import_context.SettingsFormContext);
  return /* @__PURE__ */ import_react.default.createElement("div", { className: (0, import_classnames.default)(prefix, className), style }, /* @__PURE__ */ import_react.default.createElement(
    import_antd.Input,
    {
      ...props,
      onChange: (e) => {
        var _a, _b;
        (_b = props.onChange) == null ? void 0 : _b.call(props, (_a = e == null ? void 0 : e.target) == null ? void 0 : _a["value"]);
      },
      prefix: /* @__PURE__ */ import_react.default.createElement(
        import_antd.Upload,
        {
          action: context.uploadAction,
          onChange: (params) => {
            var _a, _b;
            const response = (_a = params.file) == null ? void 0 : _a.response;
            const url = (response == null ? void 0 : response.url) || (response == null ? void 0 : response.downloadURL) || (response == null ? void 0 : response.imageURL) || (response == null ? void 0 : response.thumbUrl);
            if (!url) return;
            (_b = props.onChange) == null ? void 0 : _b.call(props, url);
          }
        },
        /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "CloudUpload", style: { cursor: "pointer" } })
      )
    }
  ));
};
var BackgroundImageInput = (props) => {
  const addBgValue = (value) => {
    if (/url\([^)]+\)/.test(value)) {
      return value;
    }
    return `url(${value})`;
  };
  const removeBgValue = (value) => {
    const matched = String(value).match(/url\(\s*([^)]+)\s*\)/);
    if (matched == null ? void 0 : matched[1]) {
      return matched == null ? void 0 : matched[1];
    }
    return value;
  };
  return /* @__PURE__ */ import_react.default.createElement(
    ImageInput,
    {
      value: removeBgValue(props.value),
      onChange: (url) => {
        var _a;
        (_a = props.onChange) == null ? void 0 : _a.call(props, addBgValue(url));
      }
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BackgroundImageInput,
  ImageInput
});
