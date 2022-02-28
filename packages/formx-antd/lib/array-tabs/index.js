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

var __read = void 0 && (void 0).__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrayTabs = void 0;

var react_1 = __importStar(require("react"));

var antd_1 = require("antd");

var react_2 = require("@formily/react");

exports.ArrayTabs = (0, react_2.observer)(function (props) {
  var field = (0, react_2.useField)();
  var schema = (0, react_2.useFieldSchema)();

  var _a = __read((0, react_1.useState)('tab-0'), 2),
      activeKey = _a[0],
      setActiveKey = _a[1];

  var value = Array.isArray(field.value) ? field.value : [];
  var dataSource = (value === null || value === void 0 ? void 0 : value.length) ? value : [{}];

  var onEdit = function onEdit(targetKey, type) {
    var _a, _b;

    if (type == 'add') {
      var id = dataSource.length;

      if ((_a = field === null || field === void 0 ? void 0 : field.value) === null || _a === void 0 ? void 0 : _a.length) {
        field.push(null);
      } else {
        field.push(null, null);
      }

      setActiveKey("tab-".concat(id));
    } else if (type == 'remove') {
      var index = (_b = targetKey.match(/-(\d+)/)) === null || _b === void 0 ? void 0 : _b[1];
      field.remove(Number(index));

      if (activeKey === targetKey) {
        setActiveKey("tab-".concat(index - 1));
      }
    }
  };

  var badgedTab = function badgedTab(index) {
    var tab = "".concat(field.title || 'Untitled', " ").concat(index + 1);
    var path = field.address.concat(index);
    var errors = field.form.queryFeedbacks({
      type: 'error',
      address: "".concat(path, ".**")
    });

    if (errors.length) {
      return react_1.default.createElement(antd_1.Badge, {
        className: "errors-badge",
        count: errors.length
      }, tab);
    }

    return tab;
  };

  return react_1.default.createElement(antd_1.Tabs, __assign({}, props, {
    activeKey: activeKey,
    onChange: function onChange(key) {
      setActiveKey(key);
    },
    type: "editable-card",
    onEdit: onEdit
  }), dataSource === null || dataSource === void 0 ? void 0 : dataSource.map(function (item, index) {
    var items = Array.isArray(schema.items) ? schema.items[index] : schema.items;
    var key = "tab-".concat(index);
    return react_1.default.createElement(antd_1.Tabs.TabPane, {
      key: key,
      closable: index !== 0,
      tab: badgedTab(index)
    }, react_1.default.createElement(react_2.RecursionField, {
      schema: items,
      name: index
    }));
  }));
});
exports.default = exports.ArrayTabs;