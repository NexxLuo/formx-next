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

// src/components/DrawerSetter/index.tsx
var DrawerSetter_exports = {};
__export(DrawerSetter_exports, {
  DrawerSetter: () => DrawerSetter
});
module.exports = __toCommonJS(DrawerSetter_exports);
var import_react = __toESM(require("react"));
var import_react_dom = require("react-dom");
var import_react2 = require("@formily/react");
var import_formx_antd = require("@platform/formx-antd");
var import_designable_react = require("@platform/designable-react");
var import_antd = require("antd");
var import_classnames = __toESM(require("classnames"));
var import_styles = require("./styles.less");
var DrawerSetter = (0, import_react2.observer)((props) => {
  const node = (0, import_designable_react.useTreeNode)();
  const field = (0, import_react2.useField)();
  const [visible, setVisible] = (0, import_react.useState)(false);
  const [remove, setRemove] = (0, import_react.useState)(false);
  const [root, setRoot] = (0, import_react.useState)();
  const prefix = (0, import_designable_react.usePrefix)("drawer-setter");
  const formWrapperCls = (0, import_designable_react.usePrefix)("settings-form-wrapper");
  (0, import_react.useLayoutEffect)(() => {
    const wrapper = document.querySelector("." + formWrapperCls);
    if (wrapper) {
      setRoot(wrapper);
    }
  }, [node]);
  const renderDrawer = () => {
    if (root && visible) {
      return (0, import_react_dom.createPortal)(
        /* @__PURE__ */ import_react.default.createElement(
          "div",
          {
            className: (0, import_classnames.default)(prefix, "animate__animated animate__slideInRight", {
              animate__slideOutRight: remove
            })
          },
          /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-header", onClick: handleClose }, /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "Return", size: 18 }), /* @__PURE__ */ import_react.default.createElement("span", { className: prefix + "-header-text" }, props.text || field.title)),
          /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-body" }, /* @__PURE__ */ import_react.default.createElement(
            import_formx_antd.FormLayout,
            {
              colon: false,
              labelWidth: 120,
              labelAlign: "left",
              wrapperAlign: "right",
              feedbackLayout: "none",
              tooltipLayout: "text"
            },
            props.children
          ))
        ),
        root
      );
    }
    return null;
  };
  const handleOpen = () => {
    setVisible(true);
  };
  const handleClose = () => {
    setRemove(true);
    setTimeout(() => {
      setVisible(false);
      setRemove(false);
    }, 150);
  };
  return /* @__PURE__ */ import_react.default.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_antd.Button, { block: true, onClick: handleOpen, ...props.triggerProps }, props.text || field.title), renderDrawer());
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DrawerSetter
});
