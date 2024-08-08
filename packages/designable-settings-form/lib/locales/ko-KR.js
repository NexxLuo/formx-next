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

// src/locales/ko-KR.ts
var ko_KR_exports = {};
__export(ko_KR_exports, {
  default: () => ko_KR_default
});
module.exports = __toCommonJS(ko_KR_exports);
var ko_KR_default = {
  "ko-KR": {
    SettingComponents: {
      ValueInput: {
        expression: "표현식"
      },
      MonacoInput: {
        helpDocument: "도움말 문서"
      }
    }
  }
};
