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

// src/components/SizeInput/index.tsx
var SizeInput_exports = {};
__export(SizeInput_exports, {
  BackgroundSizeInput: () => BackgroundSizeInput,
  SizeInput: () => SizeInput
});
module.exports = __toCommonJS(SizeInput_exports);
var import_antd = require("antd");
var import_PolyInput = require("../PolyInput");
var takeNumber = (value) => {
  const num = String(value).trim().replace(/[^\d\.]+/, "");
  if (num === "") return;
  return Number(num);
};
var createUnitType = (type) => {
  return {
    type,
    component: import_antd.InputNumber,
    checker(value) {
      return String(value).includes(type);
    },
    toInputValue(value) {
      return takeNumber(value);
    },
    toChangeValue(value) {
      return `${value || 0}${type}`;
    }
  };
};
var createSpecialSizeOption = (type) => ({
  type,
  checker(value) {
    if (value === type) return true;
    return false;
  },
  toChangeValue() {
    return type;
  }
});
var NormalSizeOptions = [
  createSpecialSizeOption("inherit"),
  createSpecialSizeOption("auto"),
  createUnitType("px"),
  createUnitType("%"),
  createUnitType("vh"),
  createUnitType("em")
];
var SizeInput = (0, import_PolyInput.createPolyInput)(NormalSizeOptions);
var BackgroundSizeInput = (0, import_PolyInput.createPolyInput)([
  createSpecialSizeOption("cover"),
  createSpecialSizeOption("contain"),
  createUnitType("px"),
  createUnitType("%"),
  createUnitType("vh"),
  createUnitType("em")
]);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BackgroundSizeInput,
  SizeInput
});
