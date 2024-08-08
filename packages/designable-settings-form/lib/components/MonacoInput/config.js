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

// src/components/MonacoInput/config.ts
var config_exports = {};
__export(config_exports, {
  initMonaco: () => initMonaco
});
module.exports = __toCommonJS(config_exports);
var import_react = require("@monaco-editor/react");
var import_chrome = __toESM(require("./themes/chrome"));
var import_monokai = __toESM(require("./themes/monokai"));
var import_format = require("./format");
var initialized = false;
var initMonaco = () => {
  if (initialized) return;
  import_react.loader.init().then((monaco) => {
    monaco.editor.defineTheme("monokai", import_monokai.default);
    monaco.editor.defineTheme("chrome-devtools", import_chrome.default);
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: "React",
      allowJs: true
    });
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: true
    });
    monaco.languages.registerDocumentFormattingEditProvider("typescript", {
      async provideDocumentFormattingEdits(model) {
        var _a;
        return [
          {
            text: await (0, import_format.format)(
              ((_a = model["getDesignerLanguage"]) == null ? void 0 : _a.call(model)) || "typescript",
              model.getValue()
            ),
            range: model.getFullModelRange()
          }
        ];
      }
    });
    initialized = true;
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  initMonaco
});
