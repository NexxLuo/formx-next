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

// src/widgets/HistoryWidget/index.tsx
var HistoryWidget_exports = {};
__export(HistoryWidget_exports, {
  HistoryWidget: () => HistoryWidget
});
module.exports = __toCommonJS(HistoryWidget_exports);
var import_react = __toESM(require("react"));
var import_dateformat = __toESM(require("dateformat"));
var import_reactive_react = require("@formily/reactive-react");
var import_hooks = require("../../hooks");
var import_TextWidget = require("../TextWidget");
var import_classnames = __toESM(require("classnames"));
var import_styles = require("./styles.less");
var HistoryWidget = (0, import_reactive_react.observer)(() => {
  const workbench = (0, import_hooks.useWorkbench)();
  const currentWorkspace = (workbench == null ? void 0 : workbench.activeWorkspace) || (workbench == null ? void 0 : workbench.currentWorkspace);
  const prefix = (0, import_hooks.usePrefix)("history");
  if (!currentWorkspace) return null;
  return /* @__PURE__ */ import_react.default.createElement("div", { className: prefix }, currentWorkspace.history.list().map((item, index) => {
    const type = item.type || "default_state";
    const token = type.replace(/\:/g, "_");
    return /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        className: (0, import_classnames.default)(prefix + "-item", {
          active: currentWorkspace.history.current === index
        }),
        key: item.timestamp,
        onClick: () => {
          currentWorkspace.history.goTo(index);
        }
      },
      /* @__PURE__ */ import_react.default.createElement("span", { className: prefix + "-item-title" }, /* @__PURE__ */ import_react.default.createElement(import_TextWidget.TextWidget, { token: `operations.${token}` })),
      /* @__PURE__ */ import_react.default.createElement("span", { className: prefix + "-item-timestamp" }, " ", (0, import_dateformat.default)(item.timestamp, "yy/mm/dd HH:MM:ss"))
    );
  }));
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HistoryWidget
});
