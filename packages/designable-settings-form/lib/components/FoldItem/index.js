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
exports.FoldItem = void 0;

var react_1 = __importStar(require("react"));

var formx_antd_1 = require("@nvwa/formx-antd");

var react_2 = require("@formily/react");

var reactive_1 = require("@formily/reactive");

var designable_react_1 = require("@nvwa/designable-react");

var classnames_1 = __importDefault(require("classnames"));

require("./styles.less");

var ExpandedMap = new Map();
exports.FoldItem = (0, react_2.observer)(function (_a) {
  var className = _a.className,
      style = _a.style,
      children = _a.children,
      props = __rest(_a, ["className", "style", "children"]);

  var prefix = (0, designable_react_1.usePrefix)('fold-item');
  var field = (0, react_2.useField)();
  var expand = (0, react_1.useMemo)(function () {
    return reactive_1.observable.ref(ExpandedMap.get(field.address.toString()));
  }, []);
  var slots = (0, react_1.useRef)({
    base: null,
    extra: null
  });
  react_1.default.Children.forEach(children, function (node) {
    var _a, _b;

    if (react_1.default.isValidElement(node)) {
      var _node = node;

      if (((_a = _node === null || _node === void 0 ? void 0 : _node['type']) === null || _a === void 0 ? void 0 : _a['displayName']) === 'FoldItem.Base') {
        slots.current.base = _node['props'].children;
      }

      if (((_b = _node === null || _node === void 0 ? void 0 : _node['type']) === null || _b === void 0 ? void 0 : _b['displayName']) === 'FoldItem.Extra') {
        slots.current.extra = _node['props'].children;
      }
    }
  });
  return react_1.default.createElement("div", {
    className: (0, classnames_1.default)(prefix, className)
  }, react_1.default.createElement("div", {
    className: prefix + '-base',
    onClick: function onClick() {
      expand.value = !expand.value;
      ExpandedMap.set(field.address.toString(), expand.value);
    }
  }, react_1.default.createElement(formx_antd_1.FormItem.BaseItem, __assign({}, props, {
    label: react_1.default.createElement("span", {
      className: (0, classnames_1.default)(prefix + '-title', {
        expand: expand.value
      })
    }, slots.current.extra && react_1.default.createElement(designable_react_1.IconWidget, {
      infer: "Expand",
      size: 10
    }), props.label)
  }), react_1.default.createElement("div", {
    style: {
      width: '100%'
    },
    onClick: function onClick(e) {
      e.stopPropagation();
    }
  }, slots.current.base))), expand.value && slots.current.extra && react_1.default.createElement("div", {
    className: prefix + '-extra'
  }, slots.current.extra));
});

var Base = function Base() {
  return react_1.default.createElement(react_1.Fragment, null);
};

Base.displayName = 'FoldItem.Base';

var Extra = function Extra() {
  return react_1.default.createElement(react_1.Fragment, null);
};

Extra.displayName = 'FoldItem.Extra';
exports.FoldItem.Base = Base;
exports.FoldItem.Extra = Extra;