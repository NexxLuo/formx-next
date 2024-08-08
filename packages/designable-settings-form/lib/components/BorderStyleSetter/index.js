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

// src/components/BorderStyleSetter/index.tsx
var BorderStyleSetter_exports = {};
__export(BorderStyleSetter_exports, {
  BorderStyleSetter: () => BorderStyleSetter
});
module.exports = __toCommonJS(BorderStyleSetter_exports);
var import_react = __toESM(require("react"));
var import_designable_react = require("@platform/designable-react");
var import_shared = require("@formily/shared");
var import_formx_antd = require("@platform/formx-antd");
var import_reactive = require("@formily/reactive");
var import_react2 = require("@formily/react");
var import_FoldItem = require("../FoldItem");
var import_ColorInput = require("../ColorInput");
var import_SizeInput = require("../SizeInput");
var import_PositionInput = require("../PositionInput");
var import_classnames = __toESM(require("classnames"));
var import_styles = require("./styles.less");
var Positions = ["center", "top", "right", "bottom", "left"];
var BorderStyleOptions = [
  {
    label: "None",
    value: "none"
  },
  {
    label: /* @__PURE__ */ import_react.default.createElement("span", { className: "border-style-solid-line" }),
    value: "solid"
  },
  {
    label: /* @__PURE__ */ import_react.default.createElement("span", { className: "border-style-dashed-line" }),
    value: "dashed"
  },
  {
    label: /* @__PURE__ */ import_react.default.createElement("span", { className: "border-style-dotted-line" }),
    value: "dotted"
  }
];
var createBorderProp = (position, key) => {
  const insert = position === "center" ? "" : `-${position}`;
  return (0, import_shared.camelCase)(`border${insert}-${key}`);
};
var parseInitPosition = (field) => {
  const basePath = field.address.parent();
  for (let i = 0; i < Positions.length; i++) {
    const position = Positions[i];
    const stylePath = `${basePath}.${createBorderProp(position, "style")}`;
    const widthPath = `${basePath}.${createBorderProp(position, "width")}`;
    const colorPath = `${basePath}.${createBorderProp(position, "color")}`;
    if (field.query(stylePath).value() || field.query(widthPath).value() || field.query(colorPath).value()) {
      return position;
    }
  }
  return "center";
};
var BorderStyleSetter = (0, import_react2.observer)(
  ({ className, style }) => {
    const field = (0, import_react2.useField)();
    const currentPosition = (0, import_react.useMemo)(
      () => (0, import_reactive.observable)({
        value: parseInitPosition(field)
      }),
      [field.value]
    );
    const prefix = (0, import_designable_react.usePrefix)("border-style-setter");
    const createReaction = (position) => (field2) => {
      field2.display = currentPosition.value === position ? "visible" : "hidden";
      if (position !== "center") {
        const borderStyle = field2.query(".borderStyle").value();
        const borderWidth = field2.query(".borderWidth").value();
        const borderColor = field2.query(".borderColor").value();
        if (borderStyle || borderWidth || borderColor) {
          field2.value = void 0;
        }
      }
    };
    return /* @__PURE__ */ import_react.default.createElement(import_FoldItem.FoldItem, { label: field.title }, /* @__PURE__ */ import_react.default.createElement(import_FoldItem.FoldItem.Extra, null, /* @__PURE__ */ import_react.default.createElement("div", { className: (0, import_classnames.default)(prefix, className), style }, /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-position" }, /* @__PURE__ */ import_react.default.createElement(
      import_PositionInput.PositionInput,
      {
        value: currentPosition.value,
        onChange: (value) => {
          currentPosition.value = value;
        }
      }
    )), /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-input" }, Positions.map((position, key) => {
      return /* @__PURE__ */ import_react.default.createElement(import_react.Fragment, { key }, /* @__PURE__ */ import_react.default.createElement(
        import_react2.Field,
        {
          name: createBorderProp(position, "style"),
          basePath: field.address.parent(),
          dataSource: BorderStyleOptions,
          reactions: createReaction(position),
          component: [import_formx_antd.Select, { placeholder: "Please Select" }]
        }
      ), /* @__PURE__ */ import_react.default.createElement(
        import_react2.Field,
        {
          name: createBorderProp(position, "width"),
          basePath: field.address.parent(),
          reactions: createReaction(position),
          component: [import_SizeInput.SizeInput, { exclude: ["auto"] }]
        }
      ), /* @__PURE__ */ import_react.default.createElement(
        import_react2.Field,
        {
          name: createBorderProp(position, "color"),
          basePath: field.address.parent(),
          reactions: createReaction(position),
          component: [import_ColorInput.ColorInput]
        }
      ));
    })))));
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BorderStyleSetter
});
