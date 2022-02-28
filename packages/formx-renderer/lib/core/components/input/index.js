"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Search = exports.Input = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@formily/react");

var _antd = require("antd");

var _formxAntd = require("@nvwa/formx-antd");

var _icons = require("@nvwa/formx-antd/lib/icons");

var _excluded = ["displayTitle", "initialValue"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Input = (0, _react2.connect)(_antd.Input, (0, _react2.mapProps)(function (props, field) {
  delete props.displayTitle;
  return _objectSpread(_objectSpread({}, props), {}, {
    autoComplete: "off",
    suffix: /*#__PURE__*/_react.default.createElement("span", null, (field === null || field === void 0 ? void 0 : field["loading"]) || (field === null || field === void 0 ? void 0 : field["validating"]) ? /*#__PURE__*/_react.default.createElement(_icons.LoadingOutlined, null) : props.suffix)
  });
}), (0, _react2.mapReadPretty)(_formxAntd.PreviewText.Input));
exports.Input = Input;

var Search = function Search(props) {
  var field = (0, _react2.useField)();
  var schema = (0, _react2.useFieldSchema)();
  var parentPath = field.address.parent().toString();

  var displayTitle = props.displayTitle,
      initialValue = props.initialValue,
      _props = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Input.Search, _extends({}, _props, {
    autoComplete: "off"
  })), schema.mapProperties(function (item, key) {
    return /*#__PURE__*/_react.default.createElement(_react2.RecursionField, {
      key: key,
      basePath: [parentPath],
      schema: item,
      name: key,
      onlyRenderProperties: true
    });
  }));
};

exports.Search = Search;
Input.TextArea = (0, _react2.connect)(_antd.Input.TextArea, (0, _react2.mapReadPretty)(_formxAntd.PreviewText.Input));
Input.Search = (0, _react2.connect)(Search, (0, _react2.mapReadPretty)(_formxAntd.PreviewText.Input));
var _default = Input;
exports.default = _default;