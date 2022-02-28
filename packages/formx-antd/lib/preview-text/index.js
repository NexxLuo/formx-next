"use strict";

var __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
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

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreviewText = void 0;

var react_1 = __importStar(require("react"));

var shared_1 = require("@formily/shared");

var react_2 = require("@formily/react");

var antd_1 = require("antd");

var classnames_1 = __importDefault(require("classnames"));

var __builtins__1 = require("../__builtins__");

var PlaceholderContext = (0, react_1.createContext)("N/A");
var Placeholder = PlaceholderContext.Provider;

var usePlaceholder = function usePlaceholder(value) {
  var placeholder = (0, react_1.useContext)(PlaceholderContext) || "N/A";
  return (0, shared_1.isValid)(value) && value !== "" ? value : placeholder;
};

var Input = function Input(props) {
  var prefixCls = (0, __builtins__1.usePrefixCls)("form-text", props);
  return react_1.default.createElement("div", {
    className: (0, classnames_1.default)(prefixCls, props.className),
    style: props.style
  }, props.addonBefore, props.prefix, usePlaceholder(props.value), props.suffix, props.addonAfter);
};

var Select = (0, react_2.observer)(function (props) {
  var _a, _b;

  var field = (0, react_2.useField)();
  var prefixCls = (0, __builtins__1.usePrefixCls)("form-text", props);
  var dataSource = ((_a = field === null || field === void 0 ? void 0 : field.dataSource) === null || _a === void 0 ? void 0 : _a.length) ? field.dataSource : ((_b = props === null || props === void 0 ? void 0 : props.options) === null || _b === void 0 ? void 0 : _b.length) ? props.options : [];
  var placeholder = usePlaceholder();

  var getSelected = function getSelected() {
    var value = props.value;

    if (props.mode === "multiple" || props.mode === "tags") {
      if (props.labelInValue) {
        return (0, shared_1.isArr)(value) ? value : [];
      } else {
        return (0, shared_1.isArr)(value) ? value.map(function (val) {
          return {
            label: val,
            value: val
          };
        }) : [];
      }
    } else {
      if (props.labelInValue) {
        return (0, shared_1.isValid)(value) ? [value] : [];
      } else {
        return (0, shared_1.isValid)(value) ? [{
          label: value,
          value: value
        }] : [];
      }
    }
  };

  var getLabel = function getLabel(target) {
    var _a;

    return ((_a = dataSource === null || dataSource === void 0 ? void 0 : dataSource.find(function (item) {
      return item.value == (target === null || target === void 0 ? void 0 : target.value);
    })) === null || _a === void 0 ? void 0 : _a.label) || target.label || placeholder;
  };

  var getLabels = function getLabels() {
    var selected = getSelected();
    if (!selected.length) return placeholder;
    if (selected.length === 1) return getLabel(selected[0]);
    return selected.map(function (item, key) {
      return react_1.default.createElement(antd_1.Tag, {
        key: key
      }, getLabel(item));
    });
  };

  return react_1.default.createElement("div", {
    className: (0, classnames_1.default)(prefixCls, props.className),
    style: props.style
  }, getLabels());
});
var TreeSelect = (0, react_2.observer)(function (props) {
  var _a, _b;

  var field = (0, react_2.useField)();
  var placeholder = usePlaceholder();
  var prefixCls = (0, __builtins__1.usePrefixCls)("form-text", props);
  var dataSource = ((_a = field === null || field === void 0 ? void 0 : field.dataSource) === null || _a === void 0 ? void 0 : _a.length) ? field.dataSource : ((_b = props === null || props === void 0 ? void 0 : props.options) === null || _b === void 0 ? void 0 : _b.length) ? props.options : [];

  var getSelected = function getSelected() {
    var value = props.value;

    if (props.multiple) {
      if (props.labelInValue) {
        return (0, shared_1.isArr)(value) ? value : [];
      } else {
        return (0, shared_1.isArr)(value) ? value.map(function (val) {
          return {
            label: val,
            value: val
          };
        }) : [];
      }
    } else {
      if (props.labelInValue) {
        return value ? [value] : [];
      } else {
        return value ? [{
          label: value,
          value: value
        }] : [];
      }
    }
  };

  var findLabel = function findLabel(value, dataSource) {
    for (var i = 0; i < (dataSource === null || dataSource === void 0 ? void 0 : dataSource.length); i++) {
      var item = dataSource[i];

      if ((item === null || item === void 0 ? void 0 : item.value) === value) {
        return item === null || item === void 0 ? void 0 : item.label;
      } else {
        var childLabel = findLabel(value, item === null || item === void 0 ? void 0 : item.children);
        if (childLabel) return childLabel;
      }
    }
  };

  var getLabels = function getLabels() {
    var selected = getSelected();
    if (!(selected === null || selected === void 0 ? void 0 : selected.length)) return react_1.default.createElement(antd_1.Tag, null, placeholder);
    return selected.map(function (_a, key) {
      var value = _a.value,
          label = _a.label;
      return react_1.default.createElement(antd_1.Tag, {
        key: key
      }, findLabel(value, dataSource) || label || placeholder);
    });
  };

  return react_1.default.createElement("div", {
    className: (0, classnames_1.default)(prefixCls, props.className),
    style: props.style
  }, getLabels());
});
var Cascader = (0, react_2.observer)(function (props) {
  var _a, _b;

  var field = (0, react_2.useField)();
  var placeholder = usePlaceholder();
  var prefixCls = (0, __builtins__1.usePrefixCls)("form-text", props);
  var dataSource = ((_a = field === null || field === void 0 ? void 0 : field.dataSource) === null || _a === void 0 ? void 0 : _a.length) ? field.dataSource : ((_b = props === null || props === void 0 ? void 0 : props.options) === null || _b === void 0 ? void 0 : _b.length) ? props.options : [];

  var getSelected = function getSelected() {
    return (0, shared_1.isArr)(props.value) ? props.value : [];
  };

  var findLabel = function findLabel(value, dataSource) {
    for (var i = 0; i < (dataSource === null || dataSource === void 0 ? void 0 : dataSource.length); i++) {
      var item = dataSource[i];

      if ((item === null || item === void 0 ? void 0 : item.value) === value) {
        return item === null || item === void 0 ? void 0 : item.label;
      } else {
        var childLabel = findLabel(value, item === null || item === void 0 ? void 0 : item.children);
        if (childLabel) return childLabel;
      }
    }
  };

  var getLabels = function getLabels() {
    var selected = getSelected();

    if (!(selected === null || selected === void 0 ? void 0 : selected.length)) {
      return placeholder;
    }

    return selected.map(function (value) {
      return findLabel(value, dataSource) || placeholder;
    }).join("/");
  };

  return react_1.default.createElement("div", {
    className: (0, classnames_1.default)(prefixCls, props.className),
    style: props.style
  }, getLabels());
});

var DatePicker = function DatePicker(props) {
  var placeholder = usePlaceholder();
  var prefixCls = (0, __builtins__1.usePrefixCls)("form-text", props);

  var getLabels = function getLabels() {
    var labels = (0, __builtins__1.formatMomentValue)(props.value, props.format, placeholder);
    return (0, shared_1.isArr)(labels) ? labels.join("~") : labels;
  };

  return react_1.default.createElement("div", {
    className: (0, classnames_1.default)(prefixCls, props.className)
  }, getLabels());
};

var DateRangePicker = function DateRangePicker(props) {
  var placeholder = usePlaceholder();
  var prefixCls = (0, __builtins__1.usePrefixCls)("form-text", props);

  var getLabels = function getLabels() {
    var labels = (0, __builtins__1.formatMomentValue)(props.value, props.format, placeholder);
    return (0, shared_1.isArr)(labels) ? labels.join("~") : labels;
  };

  return react_1.default.createElement("div", {
    className: (0, classnames_1.default)(prefixCls, props.className),
    style: props.style
  }, getLabels());
};

var TimePicker = function TimePicker(props) {
  var placeholder = usePlaceholder();
  var prefixCls = (0, __builtins__1.usePrefixCls)("form-text", props);

  var getLabels = function getLabels() {
    var labels = (0, __builtins__1.formatMomentValue)(props.value, props.format, placeholder);
    return (0, shared_1.isArr)(labels) ? labels.join("~") : labels;
  };

  return react_1.default.createElement("div", {
    className: (0, classnames_1.default)(prefixCls, props.className),
    style: props.style
  }, getLabels());
};

var TimeRangePicker = function TimeRangePicker(props) {
  var placeholder = usePlaceholder();
  var prefixCls = (0, __builtins__1.usePrefixCls)("form-text", props);

  var getLabels = function getLabels() {
    var labels = (0, __builtins__1.formatMomentValue)(props.value, props.format, placeholder);
    return (0, shared_1.isArr)(labels) ? labels.join("~") : labels;
  };

  return react_1.default.createElement("div", {
    className: (0, classnames_1.default)(prefixCls, props.className),
    style: props.style
  }, getLabels());
};

var Text = function Text(props) {
  var prefixCls = (0, __builtins__1.usePrefixCls)("form-text", props);
  return react_1.default.createElement("div", {
    className: (0, classnames_1.default)(prefixCls, props.className),
    style: props.style
  }, usePlaceholder(props.value));
};

Text.Input = Input;
Text.Select = Select;
Text.TreeSelect = TreeSelect;
Text.Cascader = Cascader;
Text.DatePicker = DatePicker;
Text.DateRangePicker = DateRangePicker;
Text.TimePicker = TimePicker;
Text.TimeRangePicker = TimeRangePicker;
Text.Placeholder = Placeholder;
Text.usePlaceholder = usePlaceholder;
exports.PreviewText = Text;
exports.default = exports.PreviewText;