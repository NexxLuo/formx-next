"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NumberPicker = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@formily/react");

var _formxAntd = require("@nvwa/formx-antd");

var _antd = require("antd");

var _utils = require("../../utils");

var _excluded = ["addonBefore", "addonAfter", "commaSeparated", "precision", "fillZero", "stepHandler"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var NumberPicker = (0, _react2.connect)(function (props) {
  var _props$addonBefore = props.addonBefore,
      addonBefore = _props$addonBefore === void 0 ? "" : _props$addonBefore,
      _props$addonAfter = props.addonAfter,
      addonAfter = _props$addonAfter === void 0 ? "" : _props$addonAfter,
      commaSeparated = props.commaSeparated,
      _props$precision = props.precision,
      precision = _props$precision === void 0 ? 0 : _props$precision,
      _props$fillZero = props.fillZero,
      fillZero = _props$fillZero === void 0 ? false : _props$fillZero,
      _props$stepHandler = props.stepHandler,
      stepHandler = _props$stepHandler === void 0 ? false : _props$stepHandler,
      componentProps = _objectWithoutProperties(props, _excluded);

  if (typeof precision === "string" && !precision) {
    precision = 0;
  }

  if (precision === null || precision === undefined) {
    precision = 0;
  }

  var formatProps = {
    formatter: function formatter(value) {
      var formattedValue = value;

      if (fillZero === false) {
        if (typeof precision === "number") {
          var _sv$split$;

          var sv = String(value);
          var c = ((_sv$split$ = sv.split(".")[1]) === null || _sv$split$ === void 0 ? void 0 : _sv$split$.length) || 0;

          if (c > 0 && c <= precision) {
            formattedValue = Number(sv);
          }
        }
      }

      if (commaSeparated) {
        formattedValue = (0, _utils.formatNumberComma)(formattedValue);
      }

      return formattedValue;
    }
  };
  var otherProps = {};

  if (commaSeparated || fillZero === false) {
    otherProps = _objectSpread({}, formatProps);

    if (commaSeparated) {
      otherProps.parser = function (value) {
        return value.replace(/(,*)/g, "");
      };
    }
  }

  var cls = [];

  if (componentProps.className) {
    cls.push(componentProps.className);
  }

  if (!stepHandler) {
    otherProps.step = 0;
    cls.push("input-number-nonehandler");
  }

  var innerInput = /*#__PURE__*/_react.default.createElement(_antd.InputNumber, _extends({}, componentProps, {
    className: cls,
    precision: precision
  }, otherProps, {
    maxLength: undefined,
    autoComplete: "off",
    onChange: function onChange(e) {
      var v = Number(e);

      if (typeof v === "number" && !isNaN(v) && typeof precision === "number") {
        v = Number(v.toFixed(precision));
      }

      props.onChange(v);
    }
  }));

  if (addonBefore || addonAfter) {
    return /*#__PURE__*/_react.default.createElement("span", {
      className: "ant-input-group-wrapper"
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "ant-input-wrapper ant-input-group"
    }, addonBefore ? /*#__PURE__*/_react.default.createElement("span", {
      className: "ant-input-group-addon"
    }, addonBefore) : null, innerInput, addonAfter ? /*#__PURE__*/_react.default.createElement("span", {
      className: "ant-input-group-addon"
    }, addonAfter) : null));
  }

  return innerInput;
}, (0, _react2.mapReadPretty)(_formxAntd.PreviewText.Input));
exports.NumberPicker = NumberPicker;
var _default = NumberPicker;
exports.default = _default;