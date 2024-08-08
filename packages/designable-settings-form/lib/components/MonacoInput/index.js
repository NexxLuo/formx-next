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

// src/components/MonacoInput/index.tsx
var MonacoInput_exports = {};
__export(MonacoInput_exports, {
  MonacoInput: () => MonacoInput
});
module.exports = __toCommonJS(MonacoInput_exports);
var import_react = __toESM(require("react"));
var import_react2 = __toESM(require("@monaco-editor/react"));
var import_designable_react = require("@platform/designable-react");
var import_antd = require("antd");
var import_parser = require("@babel/parser");
var import_shared = require("@designable/shared");
var import_format = require("./format");
var import_classnames = __toESM(require("classnames"));
var import_styles = require("./styles.less");
var import_config = require("./config");
var import_config2 = require("./config");
var MonacoInput = ({
  className,
  language,
  defaultLanguage,
  width,
  helpLink,
  helpCode,
  helpCodeViewWidth,
  height,
  onMount,
  onChange,
  ...props
}) => {
  const [loaded, setLoaded] = (0, import_react.useState)(false);
  const theme = (0, import_designable_react.useTheme)();
  const valueRef = (0, import_react.useRef)("");
  const validateRef = (0, import_react.useRef)(null);
  const submitRef = (0, import_react.useRef)(null);
  const declarationRef = (0, import_react.useRef)([]);
  const extraLibRef = (0, import_react.useRef)(null);
  const monacoRef = (0, import_react.useRef)();
  const editorRef = (0, import_react.useRef)();
  const computedLanguage = (0, import_react.useRef)(language || defaultLanguage);
  const realLanguage = (0, import_react.useRef)("");
  const unmountedRef = (0, import_react.useRef)(false);
  const changedRef = (0, import_react.useRef)(false);
  const uidRef = (0, import_react.useRef)((0, import_shared.uid)());
  const prefix = (0, import_designable_react.usePrefix)("monaco-input");
  const input = props.value || props.defaultValue;
  (0, import_react.useEffect)(() => {
    unmountedRef.current = false;
    (0, import_config2.initMonaco)();
    return () => {
      if (extraLibRef.current) {
        extraLibRef.current.dispose();
      }
      unmountedRef.current = true;
    };
  }, []);
  (0, import_react.useEffect)(() => {
    if (monacoRef.current && props.extraLib) {
      updateExtraLib();
    }
  }, [props.extraLib]);
  const updateExtraLib = () => {
    if (extraLibRef.current) {
      extraLibRef.current.dispose();
    }
    extraLibRef.current = monacoRef.current.languages.typescript.typescriptDefaults.addExtraLib(
      props.extraLib,
      `${uidRef.current}.d.ts`
    );
  };
  const isFileLanguage = () => {
    const lang = computedLanguage.current;
    return lang === "javascript" || lang === "typescript";
  };
  const isExpLanguage = () => {
    const lang = computedLanguage.current;
    return lang === "javascript.expression" || lang === "typescript.expression";
  };
  const renderHelper = () => {
    const getHref = () => {
      if (typeof helpLink === "string") return helpLink;
      if (isFileLanguage()) {
        return "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript";
      }
      if (isExpLanguage()) {
        return "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators";
      }
    };
    if (helpLink === false) return null;
    const href = getHref();
    return href && /* @__PURE__ */ import_react.default.createElement(
      import_antd.Tooltip,
      {
        title: /* @__PURE__ */ import_react.default.createElement(import_designable_react.TextWidget, { token: "SettingComponents.MonacoInput.helpDocument" })
      },
      /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-helper" }, /* @__PURE__ */ import_react.default.createElement("a", { target: "_blank", href, rel: "noreferrer" }, /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: "Help" })))
    );
  };
  const onMountHandler = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    onMount == null ? void 0 : onMount(editor, monaco);
    const model = editor.getModel();
    const currentValue = editor.getValue();
    model["getDesignerLanguage"] = () => computedLanguage.current;
    if (currentValue) {
      (0, import_format.format)(computedLanguage.current, currentValue).then((content) => {
        editor.setValue(content);
        setLoaded(true);
      }).catch(() => {
        setLoaded(true);
      });
    } else {
      setLoaded(true);
    }
    if (props.extraLib) {
      updateExtraLib();
    }
    editor.onDidChangeModelContent(() => {
      onChangeHandler(editor.getValue());
    });
  };
  const submit = () => {
    clearTimeout(submitRef.current);
    submitRef.current = setTimeout(() => {
      onChange == null ? void 0 : onChange(valueRef.current);
    }, 1e3);
  };
  const validate = () => {
    if (realLanguage.current === "typescript") {
      clearTimeout(validateRef.current);
      validateRef.current = setTimeout(() => {
        try {
          if (valueRef.current) {
            if (isFileLanguage()) {
              (0, import_parser.parse)(valueRef.current, {
                sourceType: "module",
                plugins: ["typescript", "jsx"]
              });
            } else if (isExpLanguage()) {
              (0, import_parser.parseExpression)(valueRef.current, {
                plugins: ["typescript", "jsx"]
              });
            }
          }
          monacoRef.current.editor.setModelMarkers(
            editorRef.current.getModel(),
            computedLanguage.current,
            []
          );
          declarationRef.current = editorRef.current.deltaDecorations(
            declarationRef.current,
            [
              {
                range: new monacoRef.current.Range(1, 1, 1, 1),
                options: {}
              }
            ]
          );
          submit();
        } catch (e) {
          declarationRef.current = editorRef.current.deltaDecorations(
            declarationRef.current,
            [
              {
                range: new monacoRef.current.Range(
                  e.loc.line,
                  e.loc.column,
                  e.loc.line,
                  e.loc.column
                ),
                options: {
                  isWholeLine: true,
                  glyphMarginClassName: "monaco-error-highline"
                }
              }
            ]
          );
          monacoRef.current.editor.setModelMarkers(
            editorRef.current.getModel(),
            computedLanguage.current,
            [
              {
                code: "1003",
                severity: 8,
                startLineNumber: e.loc.line,
                startColumn: e.loc.column,
                endLineNumber: e.loc.line,
                endColumn: e.loc.column,
                message: e.message
              }
            ]
          );
        }
      }, 240);
    } else {
      submit();
      declarationRef.current = editorRef.current.deltaDecorations(
        declarationRef.current,
        [
          {
            range: new monacoRef.current.Range(1, 1, 1, 1),
            options: {}
          }
        ]
      );
    }
  };
  const onChangeHandler = (value) => {
    changedRef.current = true;
    valueRef.current = value;
    validate();
  };
  computedLanguage.current = language || defaultLanguage;
  realLanguage.current = /(?:javascript|typescript)/gi.test(
    computedLanguage.current
  ) ? "typescript" : computedLanguage.current;
  const renderHelpCode = () => {
    if (!helpCode) return null;
    return /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        className: prefix + "-view",
        style: { width: helpCodeViewWidth || "50%" }
      },
      /* @__PURE__ */ import_react.default.createElement(
        import_react2.default,
        {
          value: helpCode,
          theme: theme === "dark" ? "monokai" : "chrome-devtools",
          defaultLanguage: realLanguage.current,
          language: realLanguage.current,
          options: {
            ...props.options,
            lineNumbers: "off",
            readOnly: true,
            glyphMargin: false,
            folding: false,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0,
            minimap: {
              enabled: false
            },
            tabSize: 2,
            smoothScrolling: true,
            scrollbar: {
              verticalScrollbarSize: 5,
              horizontalScrollbarSize: 5,
              alwaysConsumeMouseWheel: false
            }
          },
          width: "100%",
          height: "100%"
        }
      )
    );
  };
  return /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      className: (0, import_classnames.default)(prefix, className, {
        loaded
      }),
      style: { width, height }
    },
    renderHelper(),
    /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-view" }, /* @__PURE__ */ import_react.default.createElement(
      import_react2.default,
      {
        ...props,
        theme: theme === "dark" ? "monokai" : "chrome-devtools",
        defaultLanguage: realLanguage.current,
        language: realLanguage.current,
        options: {
          glyphMargin: true,
          ...props.options,
          tabSize: 2,
          smoothScrolling: true,
          scrollbar: {
            verticalScrollbarSize: 5,
            horizontalScrollbarSize: 5,
            alwaysConsumeMouseWheel: false
          }
        },
        value: input,
        width: "100%",
        height: "100%",
        onMount: onMountHandler
      }
    )),
    renderHelpCode()
  );
};
MonacoInput.loader = import_react2.loader;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MonacoInput
});
