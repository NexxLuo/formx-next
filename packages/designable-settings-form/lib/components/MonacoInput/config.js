"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initMonaco = void 0;
var _react = require("@monaco-editor/react");
var _chrome = _interopRequireDefault(require("./themes/chrome"));
var _monokai = _interopRequireDefault(require("./themes/monokai"));
var _format = require("./format");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let initialized = false;
const initMonaco = () => {
  if (initialized) return;
  _react.loader.init().then(monaco => {
    monaco.editor.defineTheme('monokai', _monokai.default);
    monaco.editor.defineTheme('chrome-devtools', _chrome.default);
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: 'React',
      allowJs: true
    });
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: true
    });
    monaco.languages.registerDocumentFormattingEditProvider('typescript', {
      async provideDocumentFormattingEdits(model) {
        return [{
          text: await (0, _format.format)(model['getDesignerLanguage']?.() || 'typescript', model.getValue()),
          range: model.getFullModelRange()
        }];
      }
    });
    initialized = true;
  });
};
exports.initMonaco = initMonaco;