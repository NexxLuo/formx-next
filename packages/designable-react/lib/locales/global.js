var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/locales/global.ts
var global_exports = {};
__export(global_exports, {
  default: () => global_default
});
module.exports = __toCommonJS(global_exports);
var global_default = {
  "zh-CN": {
    save: "保存",
    submit: "提交",
    cancel: "取消",
    reset: "重置",
    publish: "发布"
  },
  "en-US": {
    save: "Save",
    submit: "Submit",
    cancel: "Cancel",
    reset: "Reset",
    publish: "Publish"
  }
};
