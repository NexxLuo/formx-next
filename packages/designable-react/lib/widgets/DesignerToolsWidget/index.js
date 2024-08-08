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

// src/widgets/DesignerToolsWidget/index.tsx
var DesignerToolsWidget_exports = {};
__export(DesignerToolsWidget_exports, {
  DesignerToolsWidget: () => DesignerToolsWidget
});
module.exports = __toCommonJS(DesignerToolsWidget_exports);
var import_react = __toESM(require("react"));
var import_antd = require("antd");
var import_reactive_react = require("@formily/reactive-react");
var import_core = require("@designable/core");
var import_hooks = require("../../hooks");
var import_IconWidget = require("../IconWidget");
var import_classnames = __toESM(require("classnames"));
var import_styles = require("./styles.less");
var DesignerToolsWidget = (0, import_reactive_react.observer)((props) => {
  const screen = (0, import_hooks.useScreen)();
  const cursor = (0, import_hooks.useCursor)();
  const workbench = (0, import_hooks.useWorkbench)();
  const history = (0, import_hooks.useHistory)();
  const sizeRef = (0, import_react.useRef)({});
  const prefix = (0, import_hooks.usePrefix)("designer-tools");
  const renderHistoryController = () => {
    if (!props.use.includes("HISTORY")) return null;
    return /* @__PURE__ */ import_react.default.createElement(import_antd.Button.Group, { size: "small", style: { marginRight: 20 } }, /* @__PURE__ */ import_react.default.createElement(
      import_antd.Button,
      {
        size: "small",
        disabled: !(history == null ? void 0 : history.allowUndo),
        onClick: () => {
          history.undo();
        }
      },
      /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "Undo" })
    ), /* @__PURE__ */ import_react.default.createElement(
      import_antd.Button,
      {
        size: "small",
        disabled: !(history == null ? void 0 : history.allowRedo),
        onClick: () => {
          history.redo();
        }
      },
      /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "Redo" })
    ));
  };
  const renderCursorController = () => {
    if (workbench.type !== "DESIGNABLE") return null;
    if (!props.use.includes("CURSOR")) return null;
    return /* @__PURE__ */ import_react.default.createElement(import_antd.Button.Group, { size: "small", style: { marginRight: 20 } }, /* @__PURE__ */ import_react.default.createElement(
      import_antd.Button,
      {
        size: "small",
        disabled: cursor.type === import_core.CursorType.Move,
        onClick: () => {
          cursor.setType(import_core.CursorType.Move);
        }
      },
      /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "Move" })
    ), /* @__PURE__ */ import_react.default.createElement(
      import_antd.Button,
      {
        size: "small",
        disabled: cursor.type === import_core.CursorType.Selection,
        onClick: () => {
          cursor.setType(import_core.CursorType.Selection);
        }
      },
      /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "Selection" })
    ));
  };
  const renderResponsiveController = () => {
    if (!props.use.includes("SCREEN_TYPE")) return null;
    if (screen.type !== import_core.ScreenType.Responsive) return null;
    return /* @__PURE__ */ import_react.default.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.default.createElement(
      import_antd.InputNumber,
      {
        size: "small",
        value: screen.width,
        style: { width: 70, textAlign: "center" },
        onChange: (value) => {
          sizeRef.current.width = value;
        },
        onPressEnter: () => {
          screen.setSize(sizeRef.current.width, screen.height);
        }
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      import_IconWidget.IconWidget,
      {
        size: 10,
        infer: "Close",
        style: { padding: "0 3px", color: "#999" }
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      import_antd.InputNumber,
      {
        value: screen.height,
        size: "small",
        style: {
          width: 70,
          textAlign: "center",
          marginRight: 10
        },
        onChange: (value) => {
          sizeRef.current.height = value;
        },
        onPressEnter: () => {
          screen.setSize(screen.width, sizeRef.current.height);
        }
      }
    ), (screen.width !== "100%" || screen.height !== "100%") && /* @__PURE__ */ import_react.default.createElement(
      import_antd.Button,
      {
        size: "small",
        style: { marginRight: 20 },
        onClick: () => {
          screen.resetSize();
        }
      },
      /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "Recover" })
    ));
  };
  const renderScreenTypeController = () => {
    if (!props.use.includes("SCREEN_TYPE")) return null;
    return /* @__PURE__ */ import_react.default.createElement(import_antd.Button.Group, { size: "small", style: { marginRight: 20 } }, /* @__PURE__ */ import_react.default.createElement(
      import_antd.Button,
      {
        size: "small",
        disabled: screen.type === import_core.ScreenType.PC,
        onClick: () => {
          screen.setType(import_core.ScreenType.PC);
        }
      },
      /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "PC" })
    ), /* @__PURE__ */ import_react.default.createElement(
      import_antd.Button,
      {
        size: "small",
        disabled: screen.type === import_core.ScreenType.Mobile,
        onClick: () => {
          screen.setType(import_core.ScreenType.Mobile);
        }
      },
      /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "Mobile" })
    ), /* @__PURE__ */ import_react.default.createElement(
      import_antd.Button,
      {
        size: "small",
        disabled: screen.type === import_core.ScreenType.Responsive,
        onClick: () => {
          screen.setType(import_core.ScreenType.Responsive);
        }
      },
      /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "Responsive" })
    ));
  };
  const renderMobileController = () => {
    if (!props.use.includes("SCREEN_TYPE")) return null;
    if (screen.type !== import_core.ScreenType.Mobile) return;
    return /* @__PURE__ */ import_react.default.createElement(
      import_antd.Button,
      {
        size: "small",
        style: { marginRight: 20 },
        onClick: () => {
          screen.setFlip(!screen.flip);
        }
      },
      /* @__PURE__ */ import_react.default.createElement(
        import_IconWidget.IconWidget,
        {
          infer: "Flip",
          style: {
            transition: "all .15s ease-in",
            transform: screen.flip ? "rotate(-90deg)" : ""
          }
        }
      )
    );
  };
  return /* @__PURE__ */ import_react.default.createElement("div", { style: props.style, className: (0, import_classnames.default)(prefix, props.className) }, renderHistoryController(), renderCursorController(), renderScreenTypeController(), renderMobileController(), renderResponsiveController());
});
DesignerToolsWidget.defaultProps = {
  use: ["HISTORY", "CURSOR", "SCREEN_TYPE"]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DesignerToolsWidget
});
