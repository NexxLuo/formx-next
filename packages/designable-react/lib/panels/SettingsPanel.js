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

// src/panels/SettingsPanel.tsx
var SettingsPanel_exports = {};
__export(SettingsPanel_exports, {
  SettingsPanel: () => SettingsPanel
});
module.exports = __toCommonJS(SettingsPanel_exports);
var import_react = __toESM(require("react"));
var import_shared = require("@designable/shared");
var import_reactive_react = require("@formily/reactive-react");
var import_widgets = require("../widgets");
var import_hooks = require("../hooks");
var import_classnames = __toESM(require("classnames"));
var SettingsPanel = (0, import_reactive_react.observer)((props) => {
  const prefix = (0, import_hooks.usePrefix)("settings-panel");
  const workbench = (0, import_hooks.useWorkbench)();
  const [innerVisible, setInnerVisible] = (0, import_react.useState)(true);
  const [pinning, setPinning] = (0, import_react.useState)(false);
  const [visible, setVisible] = (0, import_react.useState)(true);
  (0, import_react.useEffect)(() => {
    if (visible || workbench.type === "DESIGNABLE") {
      if (!innerVisible) {
        (0, import_shared.requestIdle)(() => {
          requestAnimationFrame(() => {
            setInnerVisible(true);
          });
        });
      }
    }
  }, [visible, workbench.type]);
  if (workbench.type !== "DESIGNABLE") {
    if (innerVisible) setInnerVisible(false);
    return null;
  }
  if (!visible) {
    if (innerVisible) setInnerVisible(false);
    return /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        className: prefix + "-opener",
        onClick: () => {
          setVisible(true);
        }
      },
      /* @__PURE__ */ import_react.default.createElement(import_widgets.IconWidget, { infer: "Setting", size: 20 })
    );
  }
  return /* @__PURE__ */ import_react.default.createElement("div", { className: (0, import_classnames.default)(prefix, { pinning }) }, /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-header" }, /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-header-title" }, /* @__PURE__ */ import_react.default.createElement(import_widgets.TextWidget, null, props.title)), /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-header-actions" }, /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-header-extra" }, props.extra), !pinning && /* @__PURE__ */ import_react.default.createElement(
    import_widgets.IconWidget,
    {
      infer: "PushPinOutlined",
      className: prefix + "-header-pin",
      onClick: () => {
        setPinning(!pinning);
      }
    }
  ), pinning && /* @__PURE__ */ import_react.default.createElement(
    import_widgets.IconWidget,
    {
      infer: "PushPinFilled",
      className: prefix + "-pin-filled",
      onClick: () => {
        setPinning(!pinning);
      }
    }
  ), /* @__PURE__ */ import_react.default.createElement(
    import_widgets.IconWidget,
    {
      infer: "Close",
      className: prefix + "-header-close",
      onClick: () => {
        setVisible(false);
      }
    }
  ))), /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-body" }, innerVisible && props.children));
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SettingsPanel
});
