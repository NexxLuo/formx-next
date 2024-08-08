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

// src/components/FlexStyleSetter/index.tsx
var FlexStyleSetter_exports = {};
__export(FlexStyleSetter_exports, {
  FlexStyleSetter: () => FlexStyleSetter
});
module.exports = __toCommonJS(FlexStyleSetter_exports);
var import_react = __toESM(require("react"));
var import_react2 = require("@formily/react");
var import_formx_antd = require("@platform/formx-antd");
var import_designable_react = require("@platform/designable-react");
var import_InputItems = require("../InputItems");
var import_classnames = __toESM(require("classnames"));
var import_styles = require("./styles.less");
var FlexStyleSetter = (0, import_react2.observer)(
  (props) => {
    const field = (0, import_react2.useField)();
    const prefix = (0, import_designable_react.usePrefix)("flex-style-setter");
    return /* @__PURE__ */ import_react.default.createElement("div", { className: (0, import_classnames.default)(prefix, props.className), style: props.style }, /* @__PURE__ */ import_react.default.createElement(import_InputItems.InputItems, { vertical: true }, /* @__PURE__ */ import_react.default.createElement(
      import_react2.Field,
      {
        name: "flexDirection",
        basePath: field.address.parent(),
        dataSource: [
          {
            label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "FlexDirectionRow" }),
            value: "row"
          },
          {
            label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "FlexDirectionColumn" }),
            value: "column"
          }
        ],
        reactions: (field2) => {
          field2.decorator[1].title = `Flex Direction : ${field2.value || ""}`;
        },
        decorator: [import_InputItems.InputItems.Item],
        component: [import_formx_antd.Radio.Group, { optionType: "button" }]
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      import_react2.Field,
      {
        name: "flexWrap",
        basePath: field.address.parent(),
        dataSource: [
          {
            label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "FlexNoWrap" }),
            value: "nowrap"
          },
          {
            label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "FlexWrap" }),
            value: "wrap"
          }
        ],
        reactions: (field2) => {
          field2.decorator[1].title = `Flex Wrap : ${field2.value || ""}`;
        },
        decorator: [import_InputItems.InputItems.Item],
        component: [import_formx_antd.Radio.Group, { optionType: "button" }]
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      import_react2.Field,
      {
        name: "alignContent",
        basePath: field.address.parent(),
        dataSource: [
          {
            label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "FlexAlignContentCenter" }),
            value: "center"
          },
          {
            label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "FlexAlignContentStart" }),
            value: "flex-start"
          },
          {
            label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "FlexAlignContentEnd" }),
            value: "flex-end"
          },
          {
            label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "FlexAlignContentSpaceAround" }),
            value: "space-around"
          },
          {
            label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "FlexAlignContentSpaceBetween" }),
            value: "space-between"
          },
          {
            label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "FlexAlignContentStretch" }),
            value: "stretch"
          }
        ],
        reactions: (field2) => {
          field2.decorator[1].title = `Align Content : ${field2.value || ""}`;
        },
        decorator: [import_InputItems.InputItems.Item],
        component: [import_formx_antd.Radio.Group, { optionType: "button" }]
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      import_react2.Field,
      {
        name: "justifyContent",
        basePath: field.address.parent(),
        dataSource: [
          {
            label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "FlexJustifyCenter" }),
            value: "center"
          },
          {
            label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "FlexJustifyStart" }),
            value: "flex-start"
          },
          {
            label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "FlexJustifyEnd" }),
            value: "flex-end"
          },
          {
            label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "FlexJustifySpaceAround" }),
            value: "space-around"
          },
          {
            label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "FlexJustifySpaceBetween" }),
            value: "space-between"
          },
          {
            label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "FlexJustifySpaceEvenly" }),
            value: "space-evenly"
          }
        ],
        reactions: (field2) => {
          field2.decorator[1].title = `Justify Content : ${field2.value || ""}`;
        },
        decorator: [import_InputItems.InputItems.Item],
        component: [import_formx_antd.Radio.Group, { optionType: "button" }]
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      import_react2.Field,
      {
        name: "alignItems",
        basePath: field.address.parent(),
        dataSource: [
          {
            label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "FlexAlignItemsCenter" }),
            value: "center"
          },
          {
            label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "FlexAlignItemsStart" }),
            value: "flex-start"
          },
          {
            label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "FlexAlignItemsEnd" }),
            value: "flex-end"
          },
          {
            label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "FlexAlignItemsStretch" }),
            value: "stretch"
          },
          {
            label: /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "FlexAlignItemsBaseline" }),
            value: "baseline"
          }
        ],
        reactions: (field2) => {
          field2.decorator[1].title = `Align Items : ${field2.value || ""}`;
        },
        decorator: [import_InputItems.InputItems.Item],
        component: [import_formx_antd.Radio.Group, { optionType: "button" }]
      }
    )));
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FlexStyleSetter
});
