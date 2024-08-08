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

// src/icons/command.tsx
var command_exports = {};
__export(command_exports, {
  Command: () => Command
});
module.exports = __toCommonJS(command_exports);
var import_react = __toESM(require("react"));
var Command = /* @__PURE__ */ import_react.default.createElement("svg", null, /* @__PURE__ */ import_react.default.createElement(
  "path",
  {
    d: "M652.714667 699.904H371.285333c-26.752 0-47.189333-20.48-47.189333-47.189333V371.285333c0-26.752 20.48-47.189333 47.189333-47.189333h281.429334c26.752 0 47.189333 20.48 47.189333 47.189333v281.429334c0 26.752-20.48 47.189333-47.189333 47.189333z m-234.24-94.336h187.093333V418.432H418.432v187.136z",
    "p-id": "5442"
  }
), /* @__PURE__ */ import_react.default.createElement(
  "path",
  {
    d: "M794.24 418.432h-141.525333c-26.709333 0-47.146667-20.437333-47.146667-47.146667V229.76A189.226667 189.226667 0 0 1 794.24 41.088a189.226667 189.226667 0 0 1 188.672 188.672C981.333333 333.525333 896.426667 418.432 794.24 418.432z m-94.336-94.293333h94.293333a94.634667 94.634667 0 0 0 94.378667-94.378667 94.634667 94.634667 0 0 0-94.336-94.293333 94.592 94.592 0 0 0-94.336 94.293333v94.336zM371.285333 418.432H229.76A189.226667 189.226667 0 0 1 41.088 229.76C42.666667 127.573333 127.573333 42.666667 231.381333 42.666667a189.226667 189.226667 0 0 1 188.629334 188.672V372.906667a48.426667 48.426667 0 0 1-48.725334 45.568z m-139.946666-281.429333a94.634667 94.634667 0 0 0-94.336 94.336c0 51.882667 42.453333 94.336 94.336 94.336h94.336v-94.293334C324.096 179.413333 281.642667 136.96 231.381333 136.96zM794.24 981.333333a189.226667 189.226667 0 0 1-188.672-188.672V651.093333c0-26.709333 20.437333-47.146667 47.146667-47.146666h141.525333a189.226667 189.226667 0 0 1 188.672 188.672C981.333333 896.426667 896.426667 981.333333 794.24 981.333333z m-94.336-281.429333v94.293333c0 51.925333 42.453333 94.378667 94.293333 94.378667a94.634667 94.634667 0 0 0 94.378667-94.336 94.634667 94.634667 0 0 0-94.336-94.336h-94.336zM231.338667 981.333333A189.226667 189.226667 0 0 1 42.666667 792.661333a189.226667 189.226667 0 0 1 188.672-188.672H372.906667c26.709333 0 47.146667 20.437333 47.146666 47.146667v141.525333C418.432 896.426667 333.525333 981.333333 231.338667 981.333333z m0-281.429333a94.592 94.592 0 0 0-94.293334 94.293333c0 51.925333 42.410667 94.378667 94.293334 94.378667a94.634667 94.634667 0 0 0 94.336-94.336v-94.336h-94.293334z",
    "p-id": "5443"
  }
));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Command
});
