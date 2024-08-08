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

// src/widgets/TextWidget/index.tsx
var TextWidget_exports = {};
__export(TextWidget_exports, {
  TextWidget: () => TextWidget
});
module.exports = __toCommonJS(TextWidget_exports);
var import_react = __toESM(require("react"));
var import_shared = require("@designable/shared");
var import_core = require("@designable/core");
var import_reactive_react = require("@formily/reactive-react");
var TextWidget = (0, import_reactive_react.observer)((props) => {
  const takeLocale = (message) => {
    if ((0, import_shared.isStr)(message)) return message;
    if ((0, import_shared.isPlainObj)(message)) {
      const lang = import_core.GlobalRegistry.getDesignerLanguage();
      for (let key in message) {
        if (key.toLocaleLowerCase() === lang) return message[key];
      }
      return;
    }
    return message;
  };
  const takeMessage = (token) => {
    if (!token) return;
    const message = (0, import_shared.isStr)(token) ? import_core.GlobalRegistry.getDesignerMessage(token) : token;
    if (message) return takeLocale(message);
    return token;
  };
  return /* @__PURE__ */ import_react.default.createElement(import_react.Fragment, null, takeMessage(props.children) || takeMessage(props.token) || takeMessage(props.defaultMessage));
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TextWidget
});
