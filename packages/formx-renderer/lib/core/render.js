"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@formily/react");

var _core = require("@formily/core");

var _formxAntd = require("@platform/formx-antd");

var _components = require("./components");

var _shared = require("./components/shared");

require("antd/dist/antd.css");

require("./style.css");

var _registry = require("./registry");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var eachSchema = function eachSchema(schema, fn) {
  if (schema) {
    if (schema.properties) {
      for (var key in schema.properties) {
        var _schema = schema.properties[key];

        if (typeof fn === "function") {
          fn(_schema, key);
        }

        eachSchema(_schema, fn);
      }
    }

    if (schema.items) {
      eachSchema(schema.items, function (_schema, key) {
        if (typeof fn === "function") {
          fn(_schema, key);
        }

        eachSchema(_schema, fn);
      });
    }
  }
};

function getComponents() {
  var registryComponents = (0, _registry.getRegistryComponents)();
  return _objectSpread(_objectSpread({}, registryComponents), {}, {
    FormItem: (0, _shared.withLayoutPane)(_components.FormItem),
    Select: _components.Select,
    TreeSelect: _components.TreeSelect,
    ArrayTable: _components.ArrayTable,
    Input: _components.Input,
    Radio: _components.Radio,
    Checkbox: _formxAntd.Checkbox,
    TextArea: _components.Input.TextArea,
    NumberPicker: _components.NumberPicker,
    Search: _components.Input.Search,
    AutoComplete: _components.AutoComplete,
    Switch: _formxAntd.Switch,
    DatePicker: _formxAntd.DatePicker,
    DateRangePicker: _formxAntd.DatePicker.RangePicker,
    YearPicker: _formxAntd.DatePicker.YearPicker,
    MonthPicker: _formxAntd.DatePicker.MonthPicker,
    WeekPicker: _formxAntd.DatePicker.WeekPicker,
    TimePicker: _formxAntd.TimePicker,
    TimeRangePicker: _formxAntd.TimePicker.RangePicker,
    Upload: _formxAntd.Upload,
    Transfer: _formxAntd.Transfer,
    Tab: _components.Tab,
    FormTab: _components.Tab,
    TabPane: _components.Tab.TabPane,
    FieldSet: _components.FieldSet,
    Grid: _components.Grid,
    Card: _components.Card,
    Label: _components.Label,
    Text: _components.Label,
    Button: _components.Button,
    Modal: _components.Modal,
    Image: _components.Image,
    Divider: _components.Divider
  });
}

var $selector = function $selector() {
  return function (type) {
    var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "*";
    var watches = arguments.length > 2 ? arguments[2] : undefined;
    return {
      subscribe: function subscribe(listener) {
        var fn = {
          onFieldInit: _core.onFieldInit,
          onFieldMount: _core.onFieldMount,
          onFieldChange: _core.onFieldChange,
          onFieldValueChange: _core.onFieldValueChange,
          onFieldInputValueChange: _core.onFieldInputValueChange,
          onFieldReact: _core.onFieldReact,
          onFieldValidateEnd: _core.onFieldValidateEnd
        }[type];

        if (typeof fn === "function") {
          if (type === "onFieldChange") {
            fn(path, watches, listener);
          } else {
            fn(path, listener);
          }
        } else {
          var customFn = (0, _core.createEffectHook)(type, function (payload, form) {
            return function (_listener) {
              _listener(payload, form);
            };
          });
          customFn(listener);
        }
      }
    };
  };
};

var FormRender = function FormRender(_ref) {
  var children = _ref.children,
      _effects = _ref.effects,
      _ref$context = _ref.context,
      context = _ref$context === void 0 ? {} : _ref$context,
      getContext = _ref.getContext,
      setContext = _ref.setContext,
      initialValues = _ref.initialValues,
      schema = _ref.schema,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      _ref$readOnly = _ref.readOnly,
      readOnly = _ref$readOnly === void 0 ? false : _ref$readOnly,
      onInit = _ref.onInit,
      onMount = _ref.onMount;

  var _useState = (0, _react.useState)(schema),
      _useState2 = _slicedToArray(_useState, 2),
      current = _useState2[0],
      setCurrent = _useState2[1];

  var contextRef = (0, _react.useRef)(context);
  contextRef.current = context;

  var _form = (0, _react.useMemo)(function () {
    return (0, _core.createForm)({
      initialValues: initialValues,
      disabled: disabled,
      readOnly: readOnly,
      context: context,
      getContext: getContext,
      setContext: setContext,
      effects: function effects(_form) {
        //用到formSchemaMap的地方必须要使用Schema创建的对象，以使用Schema对象中的特定属性
        var _formSchema = new _react2.Schema(current);

        var formSchemaMap = {};
        eachSchema(_formSchema, function (_schema, key) {
          formSchemaMap[key] = _schema;
        });

        var _consumer = function _consumer() {
          return _objectSpread({
            formSchema: _formSchema,
            formSchemaMap: formSchemaMap
          }, contextRef.current);
        };

        (0, _core.onFormInit)(function (form) {
          onInit(form, $selector(), _consumer);
        });
        (0, _core.onFormMount)(function (form) {
          onMount(form, $selector(), _consumer);
        });

        if (typeof _effects === "function") {
          _effects($selector(), _form, _consumer);
        }
      }
    });
  }, [current]);

  var SchemaField = (0, _react.useMemo)(function () {
    return (0, _react2.createSchemaField)({
      components: getComponents(),
      scope: {}
    });
  }, [current]);
  (0, _react.useEffect)(function () {
    setCurrent(schema);
  }, [schema]);
  return /*#__PURE__*/_react.default.createElement(_formxAntd.Form, {
    form: _form,
    labelCol: 6,
    wrapperCol: 12,
    className: "formx-form"
  }, /*#__PURE__*/_react.default.createElement(SchemaField, {
    size: "small",
    schema: current,
    basePath: [""]
  }, children));
};

var _default = FormRender;
exports.default = _default;