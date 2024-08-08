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

// src/components/ValueInput/index.tsx
var ValueInput_exports = {};
__export(ValueInput_exports, {
  ValueInput: () => ValueInput
});
module.exports = __toCommonJS(ValueInput_exports);
var import_react = __toESM(require("react"));
var import_PolyInput = require("../PolyInput");
var import_antd = require("antd");
var import_MonacoInput = require("../MonacoInput");
var import_designable_react = require("@platform/designable-react");
var STARTTAG_REX = /<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
var EXPRESSION_REX = /^\{\{([\s\S]*)\}\}$/;
var isNumber = (value) => typeof value === "number";
var isBoolean = (value) => typeof value === "boolean";
var isExpression = (value) => {
  return typeof value === "string" && EXPRESSION_REX.test(value);
};
var isRichText = (value) => {
  return typeof value === "string" && STARTTAG_REX.test(value);
};
var isNormalText = (value) => {
  return typeof value === "string" && !isExpression(value) && !isRichText(value);
};
var takeNumber = (value) => {
  const num = String(value).replace(/[^\d\.]+/, "");
  if (num === "") return;
  return Number(num);
};
var ValueInput = (0, import_PolyInput.createPolyInput)([
  {
    type: "TEXT",
    icon: "Text",
    component: import_antd.Input,
    checker: isNormalText
  },
  {
    type: "EXPRESSION",
    icon: "Expression",
    component: (props) => {
      return /* @__PURE__ */ import_react.default.createElement(
        import_antd.Popover,
        {
          content: /* @__PURE__ */ import_react.default.createElement(
            "div",
            {
              style: {
                width: 400,
                height: 200,
                marginLeft: -16,
                marginRight: -16,
                marginBottom: -12
              }
            },
            /* @__PURE__ */ import_react.default.createElement(import_MonacoInput.MonacoInput, { ...props, language: "javascript.expression" })
          ),
          trigger: "click"
        },
        /* @__PURE__ */ import_react.default.createElement(import_antd.Button, { block: true }, /* @__PURE__ */ import_react.default.createElement(import_designable_react.TextWidget, { token: "SettingComponents.ValueInput.expression" }))
      );
    },
    checker: isExpression,
    toInputValue: (value) => {
      if (!value || value === "{{}}") return;
      const matched = String(value).match(EXPRESSION_REX);
      return (matched == null ? void 0 : matched[1]) || value || "";
    },
    toChangeValue: (value) => {
      if (!value || value === "{{}}") return;
      const matched = String(value).match(EXPRESSION_REX);
      return `{{${(matched == null ? void 0 : matched[1]) || value || ""}}}`;
    }
  },
  {
    type: "BOOLEAN",
    icon: "Boolean",
    component: (props) => /* @__PURE__ */ import_react.default.createElement(
      import_antd.Select,
      {
        ...props,
        options: [
          { label: "True", value: true },
          { label: "False", value: false }
        ]
      }
    ),
    checker: isBoolean,
    toInputValue: (value) => {
      return !!value;
    },
    toChangeValue: (value) => {
      return !!value;
    }
  },
  {
    type: "NUMBER",
    icon: "Number",
    component: import_antd.InputNumber,
    checker: isNumber,
    toInputValue: takeNumber,
    toChangeValue: takeNumber
  }
]);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ValueInput
});
