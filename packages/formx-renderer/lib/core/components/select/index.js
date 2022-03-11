"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Select = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@formily/react");

var _antd = require("antd");

var _formxAntd = require("@platform/formx-antd");

var _icons = require("@platform/formx-antd/lib/icons");

var _utils = require("../../utils");

var _expression = require("../../expression");

var _excluded = ["options", "autoSelectFirst"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var formatSelectable = function formatSelectable(itemSelectable, data, form) {
  if (data.length <= 0) {
    return {};
  }

  var selectable = itemSelectable;

  if (selectable && _typeof(selectable) === "object") {
    if (selectable.type === "expression" && selectable.expression) {
      var expr = selectable.expression;

      var _evaluator = new _expression.Evaluator({
        functions: {
          value: function value(k) {
            var v = null;

            if (k) {
              var _form$getFieldState;

              v = (_form$getFieldState = form.getFieldState(k)) === null || _form$getFieldState === void 0 ? void 0 : _form$getFieldState.value;
            }

            return v;
          }
        }
      });

      data.forEach(function (d) {
        var obj = _objectSpread({}, d); //将当前行数据作为运行时变量传入公式计算


        var res = _evaluator.evaluate(expr, {}, obj); //返回值为true，则不可选择


        if (res === true) {
          d.disabled = true;
        }
      });
    }
  }
};

var Select = (0, _react2.connect)(function (_props) {
  var field = (0, _react2.useField)();
  var schema = (0, _react2.useFieldSchema)();

  var _props$options = _props.options,
      options = _props$options === void 0 ? [] : _props$options,
      autoSelectFirst = _props.autoSelectFirst,
      props = _objectWithoutProperties(_props, _excluded);

  function getExtraData(value, extra) {
    var extraData = null;

    if (_typeof(value) === "object") {
      if (value instanceof Array) {
        extraData = [];
        extra.forEach(function (d) {
          var _d$props;

          var item = (_d$props = d.props) === null || _d$props === void 0 ? void 0 : _d$props.extra;
          var o = null;

          if (item) {
            o = _objectSpread({}, item);
            extraData.push(o);
          }
        });
      } else {
        if (extra && extra.props) {
          extraData = extra.props.extra;
        }
      }
    }

    return extraData;
  }

  function onChangeValue(value, label, extraData) {
    var formated = (0, _utils.formatNamedValueWhenChange)(value, label);

    _props.onChange(formated.value, formated.label, extraData);
  }

  function onChange(value, extra) {
    if (value) {
      var _extra$props;

      var extraData = getExtraData(value, extra);
      onChangeValue(value, extra === null || extra === void 0 ? void 0 : (_extra$props = extra.props) === null || _extra$props === void 0 ? void 0 : _extra$props.children, extraData);
    } else {
      onChangeValue("", "", null);
    }
  }

  var v = props.value;

  if (typeof v === "number") {
    v = v + "";
  }

  var extraProps = props["x-extra-props"] || {};
  var fieldProps = {};

  if (extraProps.selectMode === "multiple") {
    fieldProps.mode = "multiple";
  }

  var parentPath = field.address.parent().toString();
  var objectValue = (0, _utils.formatNamedValue)(v, field.inputValues, extraProps.selectMode === "multiple");
  (0, _react.useEffect)(function () {
    var bl = false;

    if (autoSelectFirst && !v && !props.disabled) {
      if (options.length === 1) {
        var first = options[0];

        if (first && first.value && !first.disabled) {
          bl = true;
          onChangeValue(first.value, first.label, first);
        }
      }
    }

    if (!bl) {
      (0, _utils.triggerOnChangeWhenDataLoaded)(objectValue, options, onChangeValue);
    }
  }, [options]);
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Select, _extends({}, props, fieldProps, {
    labelInValue: true,
    value: objectValue,
    onChange: onChange,
    optionFilterProp: "children"
  }), options.map(function (d) {
    return /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
      key: d.value,
      value: d.value,
      label: d.label,
      disabled: d.disabled,
      extra: d
    }, d.label);
  })), schema.mapProperties(function (item, key) {
    return /*#__PURE__*/_react.default.createElement(_react2.RecursionField, {
      key: key,
      basePath: [parentPath],
      schema: item,
      name: key,
      onlyRenderProperties: true
    });
  }));
}, (0, _react2.mapProps)({
  dataSource: "options",
  loading: true
}, function (props, field) {
  var resetProps = {};
  props.readOnly && (resetProps.open = false);
  var extraProps = props["x-extra-props"] || {};
  var data = [];

  var _data = props.options || [];

  if (_data instanceof Array) {
    data = _data;
  } else {
    console.error("Invalid prop type of `dataSource`:", _data, field.path);
  }

  formatSelectable(extraProps.itemSelectable, data, field.form);
  var dropdownStyle = {
    maxHeight: 400
  };
  var bl = props.dropdownMatchSelectWidth;

  if (typeof bl === "boolean") {
    bl = bl;
  } else {
    bl = true;
  }

  return _objectSpread(_objectSpread(_objectSpread({}, props), resetProps), {}, {
    options: data,
    allowClear: true,
    dropdownStyle: dropdownStyle,
    dropdownMatchSelectWidth: bl,
    suffixIcon: (field === null || field === void 0 ? void 0 : field["loading"]) || (field === null || field === void 0 ? void 0 : field["validating"]) ? /*#__PURE__*/_react.default.createElement(_icons.LoadingOutlined, null) : props.suffixIcon
  });
}), (0, _react2.mapReadPretty)(_formxAntd.PreviewText.Select));
exports.Select = Select;
var _default = Select;
exports.default = _default;