"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _excluded = ["displayTitle", "iconOnly", "title", "icon", "onClick", "confirmTooltip"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Button = function Button(props) {
  var text = props.title;
  var tooltip = props.tooltip || props.title;

  var displayTitle = props.displayTitle,
      iconOnly = props.iconOnly,
      title = props.title,
      icon = props.icon,
      onClick = props.onClick,
      _props$confirmTooltip = props.confirmTooltip,
      confirmTooltip = _props$confirmTooltip === void 0 ? "" : _props$confirmTooltip,
      otherprops = _objectWithoutProperties(props, _excluded);

  if (displayTitle === false) {
    text = null;
  }

  var buttonProps = {};

  if (!confirmTooltip) {
    buttonProps.onClick = onClick;
  }

  var innerElement = null;

  if (iconOnly === true) {
    var iconProps = {};

    if (otherprops.disabled === true) {
      iconProps.style = {
        opacity: 0.6,
        cursor: "not-allowed"
      };

      iconProps.onClick = function () {};
    }

    innerElement = /*#__PURE__*/_react.default.createElement(_antd.Icon, _extends({
      type: icon || "question"
    }, otherprops, buttonProps, {
      title: tooltip
    }, iconProps), null);
  } else {
    innerElement = /*#__PURE__*/_react.default.createElement(_antd.Button, _extends({}, otherprops, {
      icon: icon
    }, buttonProps, {
      title: tooltip
    }), text);
  }

  if (confirmTooltip) {
    return /*#__PURE__*/_react.default.createElement(_antd.Popconfirm, {
      title: confirmTooltip,
      okText: "\u786E\u5B9A",
      cancelText: "\u53D6\u6D88",
      onConfirm: onClick
    }, innerElement);
  } else {
    return innerElement;
  }
};

var _default = Button;
exports.default = _default;