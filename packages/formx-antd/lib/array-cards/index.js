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

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrayCards = void 0;

var react_1 = __importDefault(require("react"));

var antd_1 = require("antd");

var react_2 = require("@formily/react");

var classnames_1 = __importDefault(require("classnames"));

var __builtins__1 = require("../__builtins__");

var array_base_1 = require("../array-base");

var isAdditionComponent = function isAdditionComponent(schema) {
  var _a;

  return ((_a = schema['x-component']) === null || _a === void 0 ? void 0 : _a.indexOf('Addition')) > -1;
};

var isIndexComponent = function isIndexComponent(schema) {
  var _a;

  return ((_a = schema['x-component']) === null || _a === void 0 ? void 0 : _a.indexOf('Index')) > -1;
};

var isRemoveComponent = function isRemoveComponent(schema) {
  var _a;

  return ((_a = schema['x-component']) === null || _a === void 0 ? void 0 : _a.indexOf('Remove')) > -1;
};

var isMoveUpComponent = function isMoveUpComponent(schema) {
  var _a;

  return ((_a = schema['x-component']) === null || _a === void 0 ? void 0 : _a.indexOf('MoveUp')) > -1;
};

var isMoveDownComponent = function isMoveDownComponent(schema) {
  var _a;

  return ((_a = schema['x-component']) === null || _a === void 0 ? void 0 : _a.indexOf('MoveDown')) > -1;
};

var isOperationComponent = function isOperationComponent(schema) {
  return isAdditionComponent(schema) || isRemoveComponent(schema) || isMoveDownComponent(schema) || isMoveUpComponent(schema);
};

exports.ArrayCards = (0, react_2.observer)(function (props) {
  var field = (0, react_2.useField)();
  var schema = (0, react_2.useFieldSchema)();
  var dataSource = Array.isArray(field.value) ? field.value : [];
  var prefixCls = (0, __builtins__1.usePrefixCls)('formily-array-cards', props);
  if (!schema) throw new Error('can not found schema object');

  var renderItems = function renderItems() {
    return dataSource === null || dataSource === void 0 ? void 0 : dataSource.map(function (item, index) {
      var items = Array.isArray(schema.items) ? schema.items[index] || schema.items[0] : schema.items;
      var title = react_1.default.createElement("span", null, react_1.default.createElement(react_2.RecursionField, {
        schema: items,
        name: index,
        filterProperties: function filterProperties(schema) {
          if (!isIndexComponent(schema)) return false;
          return true;
        },
        onlyRenderProperties: true
      }), props.title || field.title);
      var extra = react_1.default.createElement("span", null, react_1.default.createElement(react_2.RecursionField, {
        schema: items,
        name: index,
        filterProperties: function filterProperties(schema) {
          if (!isOperationComponent(schema)) return false;
          return true;
        },
        onlyRenderProperties: true
      }), props.extra);
      var content = react_1.default.createElement(react_2.RecursionField, {
        schema: items,
        name: index,
        filterProperties: function filterProperties(schema) {
          if (isIndexComponent(schema)) return false;
          if (isOperationComponent(schema)) return false;
          return true;
        }
      });
      return react_1.default.createElement(array_base_1.ArrayBase.Item, {
        key: index,
        index: index,
        record: item
      }, react_1.default.createElement(antd_1.Card, __assign({}, props, {
        onChange: function onChange() {},
        className: (0, classnames_1.default)("".concat(prefixCls, "-item"), props.className),
        title: title,
        extra: extra
      }), content));
    });
  };

  var renderAddition = function renderAddition() {
    return schema.reduceProperties(function (addition, schema, key) {
      if (isAdditionComponent(schema)) {
        return react_1.default.createElement(react_2.RecursionField, {
          schema: schema,
          name: key
        });
      }

      return addition;
    }, null);
  };

  var renderEmpty = function renderEmpty() {
    if (dataSource === null || dataSource === void 0 ? void 0 : dataSource.length) return;
    return react_1.default.createElement(antd_1.Card, __assign({}, props, {
      onChange: function onChange() {},
      className: (0, classnames_1.default)("".concat(prefixCls, "-item"), props.className),
      title: props.title || field.title
    }), react_1.default.createElement(antd_1.Empty, null));
  };

  return react_1.default.createElement(array_base_1.ArrayBase, null, renderEmpty(), renderItems(), renderAddition());
});
exports.ArrayCards.displayName = 'ArrayCards';
array_base_1.ArrayBase.mixin(exports.ArrayCards);
exports.default = exports.ArrayCards;