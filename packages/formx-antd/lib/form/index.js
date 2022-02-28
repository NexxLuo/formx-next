"use strict";

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = void 0;

var react_1 = __importDefault(require("react"));

var react_2 = require("@formily/react");

var form_layout_1 = require("../form-layout");

var preview_text_1 = require("../preview-text");

var Form = function Form(_a) {
  var form = _a.form,
      component = _a.component,
      onAutoSubmit = _a.onAutoSubmit,
      onAutoSubmitFailed = _a.onAutoSubmitFailed,
      previewTextPlaceholder = _a.previewTextPlaceholder,
      props = __rest(_a, ["form", "component", "onAutoSubmit", "onAutoSubmitFailed", "previewTextPlaceholder"]);

  var top = (0, react_2.useForm)();

  var renderContent = function renderContent(form) {
    return react_1.default.createElement(preview_text_1.PreviewText.Placeholder, {
      value: previewTextPlaceholder
    }, react_1.default.createElement(form_layout_1.FormLayout, __assign({}, props), react_1.default.createElement(component, {
      onSubmit: function onSubmit(e) {
        var _a, _b;

        (_a = e === null || e === void 0 ? void 0 : e.stopPropagation) === null || _a === void 0 ? void 0 : _a.call(e);
        (_b = e === null || e === void 0 ? void 0 : e.preventDefault) === null || _b === void 0 ? void 0 : _b.call(e);
        form.submit(onAutoSubmit).catch(onAutoSubmitFailed);
      }
    }, props.children)));
  };

  if (form) return react_1.default.createElement(react_2.FormProvider, {
    form: form
  }, renderContent(form));
  if (!top) throw new Error('must pass form instance by createForm');
  return renderContent(top);
};

exports.Form = Form;
exports.Form.defaultProps = {
  component: 'form'
};
exports.default = exports.Form;