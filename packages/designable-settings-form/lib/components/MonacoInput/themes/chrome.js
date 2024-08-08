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

// src/components/MonacoInput/themes/chrome.ts
var chrome_exports = {};
__export(chrome_exports, {
  default: () => chrome_default
});
module.exports = __toCommonJS(chrome_exports);
var chrome_default = {
  base: "vs",
  inherit: true,
  rules: [
    {
      foreground: "c41a16",
      token: "string"
    },
    {
      foreground: "1c00cf",
      token: "constant.numeric"
    },
    {
      foreground: "aa0d91",
      token: "keyword"
    },
    {
      foreground: "000000",
      token: "keyword.operator"
    },
    {
      foreground: "aa0d91",
      token: "constant.language"
    },
    {
      foreground: "990000",
      token: "support.class.exception"
    },
    {
      foreground: "000000",
      token: "entity.name.function"
    },
    {
      fontStyle: "bold underline",
      token: "entity.name.type"
    },
    {
      fontStyle: "italic",
      token: "variable.parameter"
    },
    {
      foreground: "007400",
      token: "comment"
    },
    {
      foreground: "ff0000",
      token: "invalid"
    },
    {
      background: "e71a1100",
      token: "invalid.deprecated.trailing-whitespace"
    },
    {
      foreground: "000000",
      background: "fafafafc",
      token: "text source"
    },
    {
      foreground: "aa0d91",
      token: "meta.tag"
    },
    {
      foreground: "aa0d91",
      token: "declaration.tag"
    },
    {
      foreground: "000000",
      fontStyle: "bold",
      token: "support"
    },
    {
      foreground: "aa0d91",
      token: "storage"
    },
    {
      fontStyle: "bold underline",
      token: "entity.name.section"
    },
    {
      foreground: "000000",
      fontStyle: "bold",
      token: "entity.name.function.frame"
    },
    {
      foreground: "333333",
      token: "meta.tag.preprocessor.xml"
    },
    {
      foreground: "994500",
      fontStyle: "italic",
      token: "entity.other.attribute-name"
    },
    {
      foreground: "881280",
      token: "entity.name.tag"
    }
  ],
  colors: {
    "editor.foreground": "#000000",
    "editor.background": "#FFFFFF",
    "editor.selectionBackground": "#BAD6FD",
    "editor.lineHighlightBackground": "#EFEFFF",
    "editorCursor.foreground": "#000000",
    "editorWhitespace.foreground": "#B3B3B3F4"
  }
};
