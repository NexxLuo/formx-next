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

var __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = void 0 && (void 0).__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = void 0 && (void 0).__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
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
exports.BackgroundImageInput = exports.ImageInput = void 0;

var react_1 = __importStar(require("react"));

var antd_1 = require("antd");

var designable_react_1 = require("@platform/designable-react");

var context_1 = require("../../shared/context");

var classnames_1 = __importDefault(require("classnames"));

require("./styles.less");

var ImageInput = function ImageInput(_a) {
  var className = _a.className,
      style = _a.style,
      props = __rest(_a, ["className", "style"]);

  var prefix = (0, designable_react_1.usePrefix)('image-input');
  var context = (0, react_1.useContext)(context_1.SettingsFormContext);
  return react_1.default.createElement("div", {
    className: (0, classnames_1.default)(prefix, className),
    style: style
  }, react_1.default.createElement(antd_1.Input, __assign({}, props, {
    onChange: function onChange(e) {
      var _a, _b;

      (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, (_b = e === null || e === void 0 ? void 0 : e.target) === null || _b === void 0 ? void 0 : _b['value']);
    },
    prefix: react_1.default.createElement(antd_1.Upload, {
      action: context.uploadAction,
      onChange: function onChange(params) {
        var _a, _b;

        var response = (_a = params.file) === null || _a === void 0 ? void 0 : _a.response;
        var url = (response === null || response === void 0 ? void 0 : response.url) || (response === null || response === void 0 ? void 0 : response.downloadURL) || (response === null || response === void 0 ? void 0 : response.imageURL) || (response === null || response === void 0 ? void 0 : response.thumbUrl);
        if (!url) return;
        (_b = props.onChange) === null || _b === void 0 ? void 0 : _b.call(props, url);
      }
    }, react_1.default.createElement(designable_react_1.IconWidget, {
      infer: "CloudUpload",
      style: {
        cursor: 'pointer'
      }
    }))
  })));
};

exports.ImageInput = ImageInput;

var BackgroundImageInput = function BackgroundImageInput(props) {
  var addBgValue = function addBgValue(value) {
    if (/url\([^)]+\)/.test(value)) {
      return value;
    }

    return "url(".concat(value, ")");
  };

  var removeBgValue = function removeBgValue(value) {
    var matched = String(value).match(/url\(\s*([^)]+)\s*\)/);

    if (matched === null || matched === void 0 ? void 0 : matched[1]) {
      return matched === null || matched === void 0 ? void 0 : matched[1];
    }

    return value;
  };

  return react_1.default.createElement(exports.ImageInput, {
    value: removeBgValue(props.value),
    onChange: function onChange(url) {
      var _a;

      (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, addBgValue(url));
    }
  });
};

exports.BackgroundImageInput = BackgroundImageInput;