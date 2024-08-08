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

// src/components/DisplayStyleSetter/index.tsx
var DisplayStyleSetter_exports = {};
__export(DisplayStyleSetter_exports, {
  DisplayStyleSetter: () => DisplayStyleSetter
});
module.exports = __toCommonJS(DisplayStyleSetter_exports);
var import_react = __toESM(require("react"));
var import_react2 = require("@formily/react");
var import_formx_antd = require("@platform/formx-antd");
var import_antd = require("antd");
var import_designable_react = require("@platform/designable-react");
var import_FlexStyleSetter = require("../FlexStyleSetter");
var import_classnames = __toESM(require("classnames"));
var import_styles = require("./styles.less");
var DisplayStyleSetter = (0, import_react2.observer)(
  (props) => {
    const field = (0, import_react2.useField)();
    const prefix = (0, import_designable_react.usePrefix)("display-style-setter");
    return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(
      import_formx_antd.FormItem.BaseItem,
      {
        label: field.title,
        className: (0, import_classnames.default)(prefix, props.className),
        style: props.style
      },
      /* @__PURE__ */ import_react.default.createElement(
        import_antd.Radio.Group,
        {
          className: prefix + "-radio",
          options: [
            {
              label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "DisplayBlock", size: 16 }),
              value: "block"
            },
            {
              label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "DisplayInlineBlock", size: 16 }),
              value: "inline-block"
            },
            {
              label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "DisplayInline", size: 16 }),
              value: "inline"
            },
            {
              label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "DisplayFlex", size: 16 }),
              value: "flex"
            }
          ],
          value: props.value,
          onChange: (e) => {
            var _a;
            (_a = props.onChange) == null ? void 0 : _a.call(props, e.target.value);
          }
        }
      )
    ), /* @__PURE__ */ import_react.default.createElement(
      import_react2.Field,
      {
        name: "flex",
        basePath: field.address.parent(),
        visible: false,
        reactions: (flexField) => {
          flexField.visible = field.value === "flex";
        },
        component: [import_FlexStyleSetter.FlexStyleSetter]
      }
    ));
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DisplayStyleSetter
});
