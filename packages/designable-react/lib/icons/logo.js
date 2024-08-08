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

// src/icons/logo.tsx
var logo_exports = {};
__export(logo_exports, {
  Logo: () => Logo
});
module.exports = __toCommonJS(logo_exports);
var Logo = {
  light: "//img.alicdn.com/imgextra/i3/O1CN01Eib3GC1c7JthHYQnI_!!6000000003553-55-tps-1783-385.svg",
  dark: "//img.alicdn.com/imgextra/i1/O1CN018hbWup1QhhyhiElX0_!!6000000002008-55-tps-1783-385.svg"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Logo
});
