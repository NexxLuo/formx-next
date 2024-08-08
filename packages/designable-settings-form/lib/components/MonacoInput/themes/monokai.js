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

// src/components/MonacoInput/themes/monokai.ts
var monokai_exports = {};
__export(monokai_exports, {
  default: () => monokai_default
});
module.exports = __toCommonJS(monokai_exports);
var monokai_default = {
  base: "vs-dark",
  inherit: true,
  rules: [
    {
      foreground: "75715e",
      token: "comment"
    },
    {
      foreground: "e6db74",
      token: "string"
    },
    {
      foreground: "ae81ff",
      token: "constant.numeric"
    },
    {
      foreground: "ae81ff",
      token: "constant.language"
    },
    {
      foreground: "ae81ff",
      token: "constant.character"
    },
    {
      foreground: "ae81ff",
      token: "constant.other"
    },
    {
      foreground: "f92672",
      token: "keyword"
    },
    {
      foreground: "f92672",
      token: "storage"
    },
    {
      foreground: "66d9ef",
      fontStyle: "italic",
      token: "storage.type"
    },
    {
      foreground: "a6e22e",
      fontStyle: "underline",
      token: "entity.name.class"
    },
    {
      foreground: "a6e22e",
      fontStyle: "italic underline",
      token: "entity.other.inherited-class"
    },
    {
      foreground: "a6e22e",
      token: "entity.name.function"
    },
    {
      foreground: "fd971f",
      fontStyle: "italic",
      token: "variable.parameter"
    },
    {
      foreground: "f92672",
      token: "entity.name.tag"
    },
    {
      foreground: "a6e22e",
      token: "entity.other.attribute-name"
    },
    {
      foreground: "66d9ef",
      token: "support.function"
    },
    {
      foreground: "66d9ef",
      token: "support.constant"
    },
    {
      foreground: "66d9ef",
      fontStyle: "italic",
      token: "support.type"
    },
    {
      foreground: "66d9ef",
      fontStyle: "italic",
      token: "support.class"
    },
    {
      foreground: "f8f8f0",
      background: "f92672",
      token: "invalid"
    },
    {
      foreground: "f8f8f0",
      background: "ae81ff",
      token: "invalid.deprecated"
    },
    {
      foreground: "cfcfc2",
      token: "meta.structure.dictionary.json string.quoted.double.json"
    },
    {
      foreground: "75715e",
      token: "meta.diff"
    },
    {
      foreground: "75715e",
      token: "meta.diff.header"
    },
    {
      foreground: "f92672",
      token: "markup.deleted"
    },
    {
      foreground: "a6e22e",
      token: "markup.inserted"
    },
    {
      foreground: "e6db74",
      token: "markup.changed"
    },
    {
      foreground: "ae81ffa0",
      token: "constant.numeric.line-number.find-in-files - match"
    },
    {
      foreground: "e6db74",
      token: "entity.name.filename.find-in-files"
    }
  ],
  colors: {
    "editor.foreground": "#F8F8F2",
    "editor.background": "#222222",
    "editor.selectionBackground": "#49483E",
    "editor.lineHighlightBackground": "#3E3D32",
    "editorCursor.foreground": "#F8F8F0",
    "editorWhitespace.foreground": "#3B3A32",
    "editorIndentGuide.activeBackground": "#9D550FB0",
    "editor.selectionHighlightBorder": "#222218"
  }
};
