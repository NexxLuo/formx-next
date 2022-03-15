"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTemplates = exports.getRegistryComponents = exports.getRegistry = exports.getFormFields = exports.cleanRegistry = void 0;
exports.registerField = registerField;
exports.registerTemplate = registerTemplate;
exports.registerVirtualBlock = registerVirtualBlock;
exports.registerVirtualField = registerVirtualField;

var _react = _interopRequireDefault(require("react"));

var _shared = require("@formily/shared");

var _utils = require("../core/utils");

var _react2 = require("@formily/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var registry = {
  fields: {},
  templates: {}
};
var log = {
  warn: function warn(str) {
    console.warn(str);
  }
};

var lowercase = function lowercase(str) {
  return str.toLowerCase();
};

var getRegistry = function getRegistry() {
  return {
    fields: registry.fields
  };
};

exports.getRegistry = getRegistry;

function copyProps(item, name) {
  if (item[name]) {
    if (item["x-component-props"]) {
      item["x-component-props"][name] = Object.assign({}, item[name]);
    } else {
      item["x-component-props"] = _defineProperty({}, name, Object.assign({}, item[name]));
    }
  }
}

var getRegistryComponents = function getRegistryComponents() {
  var fields = registry.fields;
  var components = {};
  var registedVoid = [];

  for (var k in fields) {
    var name = k; //.toLowerCase();

    if (fields[k].type === "virtual") {
      registedVoid.push(name);
    }

    components[name] = fields[k].component;
  }

  return components;

  _react2.Schema.registerPatches(function (schema) {
    var ctype = schema["x-component"];

    if (ctype) {
      ctype = ctype.toLowerCase();
      schema["x-component"] = ctype;

      if (registedVoid.indexOf(ctype.toLowerCase()) > -1) {
        schema.type = "void";
      } else {
        if (["arraytable"].indexOf(ctype.toLowerCase()) > -1) {
          schema.type = "array";
          schema["x-decorator"] = "formitem";
          schema["x-decorator-props"] = {
            displayLabel: false,
            className: "ant-formily-item-table"
          };
        } else if (["label", "card", "fieldset", "tab", "tabpane", "modal", "grid", "image", "divider"].indexOf(ctype.toLowerCase()) > -1) {
          schema.type = "void";
        } else if (["button"].indexOf(ctype.toLowerCase()) > -1) {
          schema.type = "void";
        } else {
          schema["x-decorator"] = "formitem";
        }
      }
    }

    copyProps(schema, "x-layout-props");
    copyProps(schema, "x-extra-props");
    copyProps(schema, "x-prepose-event");

    if ("visible" in schema) {
      schema["x-visible"] = schema["visible"];
    }

    if ("display" in schema) {
      schema["x-hidden"] = !schema["display"];
    }

    return schema;
  });

  return components;
};

exports.getRegistryComponents = getRegistryComponents;

var cleanRegistry = function cleanRegistry() {
  registry.fields = {};
};

exports.cleanRegistry = cleanRegistry;

function createCustomField(component) {
  return function (props) {
    var _formState$values$__D;

    var field = (0, _react2.useField)();
    var schema = (0, _react2.useFieldSchema)();
    var form = (0, _react2.useForm)();
    var formState = form.getFormState();
    var fieldState = field.getState();

    var componentProps = _objectSpread(_objectSpread({}, props), {}, {
      id: field.path.toString(),
      path: field.address.toString(),
      attribute: props.attribute || {},
      form: formState.formActions,
      isEditor: ((_formState$values$__D = formState.values.__DATA__) === null || _formState$values$__D === void 0 ? void 0 : _formState$values$__D.__isEditor) === true,
      state: fieldState
    });

    var extraProps = props["x-extra-props"] || {};
    var extraNameFieldKey = extraProps.extraNameFieldKey;
    var extraItems = null; //如果需要配置额外的label字段，则需要额外生成表单项

    if (extraNameFieldKey) {
      var parentPath = (0, _utils.getParentPath)(field.address.toString());

      if (typeof (schema === null || schema === void 0 ? void 0 : schema.mapProperties) === "function") {
        extraItems = schema.mapProperties(function (item, key) {
          var idPath = _shared.FormPath.parse(parentPath);

          return /*#__PURE__*/_react.default.createElement(_react2.RecursionField, {
            key: key,
            basePath: idPath.toString(),
            name: key,
            schema: item
          });
        });
      }
    }

    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {}, /*#__PURE__*/_react.default.createElement(component, componentProps), extraItems);
  };
}

function registerField(name, component, options) {
  var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

  if (name && (0, _shared.isFn)(component)) {
    name = lowercase(name);

    if (registry.fields[name]) {
      log.warn("Component name duplicate. Please change the name.");
      return;
    }

    var Cmp = (0, _react2.connect)(createCustomField(component), (0, _react2.mapProps)(function (props, field) {
      //以下属性都应该响应组件render，否则可能导致业务组件动态设置状态后无法触发渲染
      return _objectSpread(_objectSpread({}, props), {}, {
        disabled: field.disabled || props.disabled,
        readOnly: field.readOnly || props.readOnly,
        loading: field.loading || props.loading,
        value: field.value,
        values: field.inputValues
      });
    }));

    if (type === "virtualField") {
      registry.fields[name] = {
        name: name,
        options: options,
        original: component,
        type: "virtual",
        component: Cmp
      };
    } else if (type === "virtualBlock") {
      registry.fields[name] = {
        name: name,
        options: options,
        type: "virtual",
        original: component,
        component: Cmp
      };
    } else {
      registry.fields[name] = {
        name: name,
        options: options,
        type: type,
        original: component,
        component: Cmp
      };
    }
  }
}

var getFormFields = function getFormFields() {
  var items = [];
  var reg = registry.fields;

  for (var k in reg) {
    var item = reg[k];
    items.push({
      name: item.name,
      type: item.type,
      options: item.options
    });
  }

  return items;
};

exports.getFormFields = getFormFields;

function registerVirtualField(name, component, options) {
  registerField(name, component, options, "virtualField");
}

function registerVirtualBlock(name, component, options) {
  registerField(name, component, options, "virtualBlock");
}

function registerTemplate(name, schema, options) {
  if (name && (0, _shared.isPlainObj)(schema)) {
    name = lowercase(name);

    if (registry.templates[name]) {
      log.warn("Template name duplicate. Please change the name.");
      return;
    }

    registry.templates[name] = {
      name: name,
      schema: schema,
      options: options
    };
  }
}

var getTemplates = function getTemplates() {
  var items = [];
  var reg = registry.templates;

  for (var k in reg) {
    var item = reg[k];
    items.push({
      name: item.name,
      schema: item.schema,
      options: item.options
    });
  }

  return items;
};

exports.getTemplates = getTemplates;