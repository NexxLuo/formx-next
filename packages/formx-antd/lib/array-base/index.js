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
exports.ArrayBase = void 0;

var react_1 = __importStar(require("react"));

var antd_1 = require("antd");

var react_2 = require("@formily/react");

var shared_1 = require("@formily/shared");

var __builtins__1 = require("../__builtins__");

var classnames_1 = __importDefault(require("classnames"));

var icons_1 = require("../icons");

var ArrayBaseContext = (0, react_1.createContext)(null);
var ItemContext = (0, react_1.createContext)(null);

var useArray = function useArray() {
  return (0, react_1.useContext)(ArrayBaseContext);
};

var useIndex = function useIndex(index) {
  var ctx = (0, react_1.useContext)(ItemContext);
  return ctx ? ctx.index : index;
};

var useRecord = function useRecord(record) {
  var ctx = (0, react_1.useContext)(ItemContext);
  return ctx ? ctx.record : record;
};

var getDefaultValue = function getDefaultValue(defaultValue, schema) {
  var _a, _b, _c, _d, _e, _f, _g;

  if ((0, shared_1.isValid)(defaultValue)) return (0, shared_1.clone)(defaultValue);
  if (Array.isArray(schema === null || schema === void 0 ? void 0 : schema.items)) return getDefaultValue(defaultValue, schema.items[0]);
  if (((_a = schema === null || schema === void 0 ? void 0 : schema.items) === null || _a === void 0 ? void 0 : _a.type) === "array") return [];
  if (((_b = schema === null || schema === void 0 ? void 0 : schema.items) === null || _b === void 0 ? void 0 : _b.type) === "boolean") return true;
  if (((_c = schema === null || schema === void 0 ? void 0 : schema.items) === null || _c === void 0 ? void 0 : _c.type) === "date") return "";
  if (((_d = schema === null || schema === void 0 ? void 0 : schema.items) === null || _d === void 0 ? void 0 : _d.type) === "datetime") return "";
  if (((_e = schema === null || schema === void 0 ? void 0 : schema.items) === null || _e === void 0 ? void 0 : _e.type) === "number") return 0;
  if (((_f = schema === null || schema === void 0 ? void 0 : schema.items) === null || _f === void 0 ? void 0 : _f.type) === "object") return {};
  if (((_g = schema === null || schema === void 0 ? void 0 : schema.items) === null || _g === void 0 ? void 0 : _g.type) === "string") return "";
  return null;
};

var ArrayBase = function ArrayBase(props) {
  var field = (0, react_2.useField)();
  var schema = (0, react_2.useFieldSchema)();
  return react_1.default.createElement(ArrayBaseContext.Provider, {
    value: {
      field: field,
      schema: schema,
      props: props
    }
  }, props.children);
};

exports.ArrayBase = ArrayBase;

exports.ArrayBase.Item = function (_a) {
  var children = _a.children,
      props = __rest(_a, ["children"]);

  return react_1.default.createElement(ItemContext.Provider, {
    value: props
  }, children);
};

exports.ArrayBase.Index = function (props) {
  var index = useIndex();
  var prefixCls = (0, __builtins__1.usePrefixCls)("formily-array-base");
  return react_1.default.createElement("span", __assign({}, props, {
    className: "".concat(prefixCls, "-index")
  }), "#", index + 1, ".");
};

exports.ArrayBase.Addition = function (props) {
  var _a, _b, _c;

  var self = (0, react_2.useField)();
  var array = useArray();
  var prefixCls = (0, __builtins__1.usePrefixCls)("formily-array-base");
  if (!array) return null;
  if (((_a = array.field) === null || _a === void 0 ? void 0 : _a.pattern) !== "editable" && ((_b = array.field) === null || _b === void 0 ? void 0 : _b.pattern) !== "disabled") return null;
  return react_1.default.createElement(antd_1.Button, __assign({
    type: "dashed",
    block: true
  }, props, {
    disabled: (_c = array.field) === null || _c === void 0 ? void 0 : _c.disabled,
    className: (0, classnames_1.default)("".concat(prefixCls, "-addition"), props.className),
    onClick: function onClick(e) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;

      if ((_a = array.props) === null || _a === void 0 ? void 0 : _a.disabled) return;
      var defaultValue = getDefaultValue(props.defaultValue, array.schema);

      if (props.method === "unshift") {
        (_c = (_b = array.field) === null || _b === void 0 ? void 0 : _b.unshift) === null || _c === void 0 ? void 0 : _c.call(_b, defaultValue);
        (_e = (_d = array.props) === null || _d === void 0 ? void 0 : _d.onAdd) === null || _e === void 0 ? void 0 : _e.call(_d, 0);
      } else {
        (_g = (_f = array.field) === null || _f === void 0 ? void 0 : _f.push) === null || _g === void 0 ? void 0 : _g.call(_f, defaultValue);
        (_j = (_h = array.props) === null || _h === void 0 ? void 0 : _h.onAdd) === null || _j === void 0 ? void 0 : _j.call(_h, ((_l = (_k = array === null || array === void 0 ? void 0 : array.field) === null || _k === void 0 ? void 0 : _k.value) === null || _l === void 0 ? void 0 : _l.length) - 1);
      }

      if (props.onClick) {
        props.onClick(e);
      }
    },
    icon: icons_1.PlusOutlined.type
  }), props.title || self.title);
};

exports.ArrayBase.Remove = react_1.default.forwardRef(function (props, ref) {
  var _a;

  var index = useIndex(props.index);
  var array = useArray();
  var prefixCls = (0, __builtins__1.usePrefixCls)("formily-array-base");
  if (!array) return null;
  if (((_a = array.field) === null || _a === void 0 ? void 0 : _a.pattern) !== "editable") return null;
  return react_1.default.createElement(icons_1.DeleteOutlined, __assign({}, props, {
    className: (0, classnames_1.default)("".concat(prefixCls, "-remove"), props.className),
    ref: ref,
    onClick: function onClick(e) {
      var _a, _b, _c, _d, _e;

      if ((_a = array.props) === null || _a === void 0 ? void 0 : _a.disabled) return;
      e.stopPropagation();
      (_c = (_b = array.field) === null || _b === void 0 ? void 0 : _b.remove) === null || _c === void 0 ? void 0 : _c.call(_b, index);
      (_e = (_d = array.props) === null || _d === void 0 ? void 0 : _d.onRemove) === null || _e === void 0 ? void 0 : _e.call(_d, index);

      if (props.onClick) {
        props.onClick(e);
      }
    }
  }));
});
exports.ArrayBase.MoveDown = react_1.default.forwardRef(function (props, ref) {
  var _a;

  var index = useIndex(props.index);
  var array = useArray();
  var prefixCls = (0, __builtins__1.usePrefixCls)("formily-array-base");
  if (!array) return null;
  if (((_a = array.field) === null || _a === void 0 ? void 0 : _a.pattern) !== "editable") return null;
  return react_1.default.createElement(icons_1.DownOutlined, __assign({}, props, {
    className: (0, classnames_1.default)("".concat(prefixCls, "-move-down"), props.className),
    ref: ref,
    onClick: function onClick(e) {
      var _a, _b, _c, _d, _e;

      if ((_a = array.props) === null || _a === void 0 ? void 0 : _a.disabled) return;
      e.stopPropagation();
      (_c = (_b = array.field) === null || _b === void 0 ? void 0 : _b.moveDown) === null || _c === void 0 ? void 0 : _c.call(_b, index);
      (_e = (_d = array.props) === null || _d === void 0 ? void 0 : _d.onMoveDown) === null || _e === void 0 ? void 0 : _e.call(_d, index);

      if (props.onClick) {
        props.onClick(e);
      }
    }
  }));
});
exports.ArrayBase.MoveUp = react_1.default.forwardRef(function (props, ref) {
  var _a;

  var index = useIndex(props.index);
  var array = useArray();
  var prefixCls = (0, __builtins__1.usePrefixCls)("formily-array-base");
  if (!array) return null;
  if (((_a = array.field) === null || _a === void 0 ? void 0 : _a.pattern) !== "editable") return null;
  return react_1.default.createElement(icons_1.UpOutlined, __assign({}, props, {
    className: (0, classnames_1.default)("".concat(prefixCls, "-move-up"), props.className),
    ref: ref,
    onClick: function onClick(e) {
      var _a, _b, _c, _d;

      if ((_a = array.props) === null || _a === void 0 ? void 0 : _a.disabled) return;
      e.stopPropagation();
      (_b = array === null || array === void 0 ? void 0 : array.field) === null || _b === void 0 ? void 0 : _b.moveUp(index);
      (_d = (_c = array === null || array === void 0 ? void 0 : array.props) === null || _c === void 0 ? void 0 : _c.onMoveUp) === null || _d === void 0 ? void 0 : _d.call(_c, index);

      if (props.onClick) {
        props.onClick(e);
      }
    }
  }));
});
exports.ArrayBase.useArray = useArray;
exports.ArrayBase.useIndex = useIndex;
exports.ArrayBase.useRecord = useRecord;

exports.ArrayBase.mixin = function (target) {
  target.Index = exports.ArrayBase.Index;
  target.Addition = exports.ArrayBase.Addition;
  target.Remove = exports.ArrayBase.Remove;
  target.MoveDown = exports.ArrayBase.MoveDown;
  target.MoveUp = exports.ArrayBase.MoveUp;
  target.useArray = exports.ArrayBase.useArray;
  target.useIndex = exports.ArrayBase.useIndex;
  target.useRecord = exports.ArrayBase.useRecord;
  return target;
};

exports.default = exports.ArrayBase;