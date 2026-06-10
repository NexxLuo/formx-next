"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonacoInput = void 0;
var _react = _interopRequireWildcard(require("react"));
var _react2 = _interopRequireWildcard(require("@monaco-editor/react"));
var _designableReact = require("@platform/designable-react");
var _antd = require("antd");
var _parser = require("@babel/parser");
var _shared = require("@designable/shared");
var _format = require("./format");
var _classnames = _interopRequireDefault(require("classnames"));
require("./styles.less");
var _config = require("./config");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const MonacoInput = ({
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
  const [loaded, setLoaded] = (0, _react.useState)(false);
  const theme = (0, _designableReact.useTheme)();
  const valueRef = (0, _react.useRef)('');
  const validateRef = (0, _react.useRef)(null);
  const submitRef = (0, _react.useRef)(null);
  const declarationRef = (0, _react.useRef)([]);
  const extraLibRef = (0, _react.useRef)(null);
  const monacoRef = (0, _react.useRef)();
  const editorRef = (0, _react.useRef)();
  const computedLanguage = (0, _react.useRef)(language || defaultLanguage);
  const realLanguage = (0, _react.useRef)('');
  const unmountedRef = (0, _react.useRef)(false);
  const changedRef = (0, _react.useRef)(false);
  const uidRef = (0, _react.useRef)((0, _shared.uid)());
  const prefix = (0, _designableReact.usePrefix)('monaco-input');
  const input = props.value || props.defaultValue;
  (0, _react.useEffect)(() => {
    unmountedRef.current = false;
    (0, _config.initMonaco)();
    return () => {
      if (extraLibRef.current) {
        extraLibRef.current.dispose();
      }
      unmountedRef.current = true;
    };
  }, []);
  (0, _react.useEffect)(() => {
    if (monacoRef.current && props.extraLib) {
      updateExtraLib();
    }
  }, [props.extraLib]);
  const updateExtraLib = () => {
    if (extraLibRef.current) {
      extraLibRef.current.dispose();
    }
    extraLibRef.current = monacoRef.current.languages.typescript.typescriptDefaults.addExtraLib(props.extraLib, `${uidRef.current}.d.ts`);
  };
  const isFileLanguage = () => {
    const lang = computedLanguage.current;
    return lang === 'javascript' || lang === 'typescript';
  };
  const isExpLanguage = () => {
    const lang = computedLanguage.current;
    return lang === 'javascript.expression' || lang === 'typescript.expression';
  };
  const renderHelper = () => {
    const getHref = () => {
      if (typeof helpLink === 'string') return helpLink;
      if (isFileLanguage()) {
        return 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript';
      }
      if (isExpLanguage()) {
        return 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators';
      }
    };
    if (helpLink === false) return null;
    const href = getHref();
    return href && /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      title: /*#__PURE__*/_react.default.createElement(_designableReact.TextWidget, {
        token: "SettingComponents.MonacoInput.helpDocument"
      })
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: prefix + '-helper'
    }, /*#__PURE__*/_react.default.createElement("a", {
      target: "_blank",
      href: href,
      rel: "noreferrer"
    }, /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
      infer: "Help"
    }))));
  };
  const onMountHandler = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    onMount?.(editor, monaco);
    const model = editor.getModel();
    const currentValue = editor.getValue();
    model['getDesignerLanguage'] = () => computedLanguage.current;
    if (currentValue) {
      (0, _format.format)(computedLanguage.current, currentValue).then(content => {
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
      onChange?.(valueRef.current);
    }, 1000);
  };
  const validate = () => {
    if (realLanguage.current === 'typescript') {
      clearTimeout(validateRef.current);
      validateRef.current = setTimeout(() => {
        try {
          if (valueRef.current) {
            if (isFileLanguage()) {
              (0, _parser.parse)(valueRef.current, {
                sourceType: 'module',
                plugins: ['typescript', 'jsx']
              });
            } else if (isExpLanguage()) {
              (0, _parser.parseExpression)(valueRef.current, {
                plugins: ['typescript', 'jsx']
              });
            }
          }
          monacoRef.current.editor.setModelMarkers(editorRef.current.getModel(), computedLanguage.current, []);
          declarationRef.current = editorRef.current.deltaDecorations(declarationRef.current, [{
            range: new monacoRef.current.Range(1, 1, 1, 1),
            options: {}
          }]);
          submit();
        } catch (e) {
          declarationRef.current = editorRef.current.deltaDecorations(declarationRef.current, [{
            range: new monacoRef.current.Range(e.loc.line, e.loc.column, e.loc.line, e.loc.column),
            options: {
              isWholeLine: true,
              glyphMarginClassName: 'monaco-error-highline'
            }
          }]);
          monacoRef.current.editor.setModelMarkers(editorRef.current.getModel(), computedLanguage.current, [{
            code: '1003',
            severity: 8,
            startLineNumber: e.loc.line,
            startColumn: e.loc.column,
            endLineNumber: e.loc.line,
            endColumn: e.loc.column,
            message: e.message
          }]);
        }
      }, 240);
    } else {
      submit();
      declarationRef.current = editorRef.current.deltaDecorations(declarationRef.current, [{
        range: new monacoRef.current.Range(1, 1, 1, 1),
        options: {}
      }]);
    }
  };
  const onChangeHandler = value => {
    changedRef.current = true;
    valueRef.current = value;
    validate();
  };
  computedLanguage.current = language || defaultLanguage;
  realLanguage.current = /(?:javascript|typescript)/gi.test(computedLanguage.current) ? 'typescript' : computedLanguage.current;
  const renderHelpCode = () => {
    if (!helpCode) return null;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: prefix + '-view',
      style: {
        width: helpCodeViewWidth || '50%'
      }
    }, /*#__PURE__*/_react.default.createElement(_react2.default, {
      value: helpCode,
      theme: theme === 'dark' ? 'monokai' : 'chrome-devtools',
      defaultLanguage: realLanguage.current,
      language: realLanguage.current,
      options: {
        ...props.options,
        lineNumbers: 'off',
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
    }));
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(prefix, className, {
      loaded
    }),
    style: {
      width,
      height
    }
  }, renderHelper(), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-view'
  }, /*#__PURE__*/_react.default.createElement(_react2.default, _extends({}, props, {
    theme: theme === 'dark' ? 'monokai' : 'chrome-devtools',
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
  }))), renderHelpCode());
};
exports.MonacoInput = MonacoInput;
MonacoInput.loader = _react2.loader;