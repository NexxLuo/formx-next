"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ArrayTable", {
  enumerable: true,
  get: function get() {
    return _ArrayTable.default;
  }
});
Object.defineProperty(exports, "AutoComplete", {
  enumerable: true,
  get: function get() {
    return _autoComplete.default;
  }
});
exports.FieldSet = exports.Divider = exports.Card = exports.Button = void 0;
Object.defineProperty(exports, "FormItem", {
  enumerable: true,
  get: function get() {
    return _FormItem.default;
  }
});
exports.Image = exports.Grid = void 0;
Object.defineProperty(exports, "Input", {
  enumerable: true,
  get: function get() {
    return _input.Input;
  }
});
exports.Modal = exports.Label = void 0;
Object.defineProperty(exports, "NumberPicker", {
  enumerable: true,
  get: function get() {
    return _numberPicker.NumberPicker;
  }
});
Object.defineProperty(exports, "Radio", {
  enumerable: true,
  get: function get() {
    return _radio.default;
  }
});
Object.defineProperty(exports, "Select", {
  enumerable: true,
  get: function get() {
    return _select.Select;
  }
});
Object.defineProperty(exports, "Tab", {
  enumerable: true,
  get: function get() {
    return _formTab.default;
  }
});
Object.defineProperty(exports, "TreeSelect", {
  enumerable: true,
  get: function get() {
    return _treeSelect.TreeSelect;
  }
});

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _react2 = require("@formily/react");

var _modal = _interopRequireDefault(require("./modal"));

var _button = _interopRequireDefault(require("./button"));

var _shared = require("./shared");

require("@platform/formx-antd/lib/style.css");

require("./style.css");

var _FormItem = _interopRequireDefault(require("./FormItem"));

var _autoComplete = _interopRequireDefault(require("./auto-complete"));

var _numberPicker = require("./number-picker");

var _input = require("./input");

var _treeSelect = require("./tree-select");

var _select = require("./select");

var _formTab = _interopRequireDefault(require("./form-tab"));

var _radio = _interopRequireDefault(require("./radio"));

var _ArrayTable = _interopRequireDefault(require("./ArrayTable"));

var _excluded = ["content", "title", "displayTitle"],
    _excluded2 = ["title", "displayTitle", "className"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Button = (0, _shared.withLayoutField)(_button.default);
exports.Button = Button;
var Modal = (0, _shared.withLayoutPane)(_modal.default, true);
exports.Modal = Modal;
var FieldSet = (0, _shared.withLayoutPane)(function (props) {
  var field = (0, _react2.useField)();
  var panelProps = {};

  if (props.displayTitle === false) {
    panelProps.header = null;
  } else {
    panelProps.header = props.title;
  }

  if (props.readOnly === true || props.readonly === true) {
    panelProps.disabled = true;
  }

  if (props.collapsible === false) {
    panelProps.showArrow = false;
    panelProps.disabled = true;
  }

  var componentProps = {};

  if (props.collapsible && props.activeKey) {
    componentProps.activeKey = props.activeKey;

    componentProps.onChange = function (keys) {
      field.setComponentProps({
        activeKey: keys
      });
    };
  }

  return /*#__PURE__*/_react.default.createElement(_antd.Collapse, _extends({
    expandIconPosition: "right",
    defaultActiveKey: "pane",
    bordered: true
  }, componentProps, {
    className: "formx-fieldset"
  }), /*#__PURE__*/_react.default.createElement(_antd.Collapse.Panel, _extends({}, panelProps, {
    key: "pane"
  }), /*#__PURE__*/_react.default.createElement(_antd.Row, {
    type: "flex"
  }, props.children)));
});
exports.FieldSet = FieldSet;
var Card = (0, _shared.withLayoutPane)(function (props) {
  var field = (0, _react2.useField)();
  var panelProps = {};

  if (props.displayTitle === false) {
    panelProps.header = null;
  } else {
    panelProps.header = props.title;
  }

  var cls = ["formx-card"];

  if (!panelProps.header) {
    panelProps.showArrow = false;
    cls.push("formx-card-without-header");
  }

  if (props.collapsible !== true) {
    panelProps.showArrow = false;
    panelProps.disabled = true;
  }

  var componentProps = {};

  if (props.collapsible && props.activeKey) {
    componentProps.activeKey = props.activeKey;

    componentProps.onChange = function (keys) {
      field.setComponentProps({
        activeKey: keys
      });
    };
  }

  return /*#__PURE__*/_react.default.createElement(_antd.Collapse, _extends({
    expandIconPosition: "right",
    defaultActiveKey: "pane",
    bordered: true
  }, componentProps, {
    className: cls.join(" ")
  }), /*#__PURE__*/_react.default.createElement(_antd.Collapse.Panel, _extends({}, panelProps, {
    key: "pane"
  }), /*#__PURE__*/_react.default.createElement(_antd.Row, {
    type: "flex"
  }, props.children)));
});
exports.Card = Card;
var Label = (0, _shared.withLayoutField)(function (props) {
  var content = props.content,
      title = props.title,
      displayTitle = props.displayTitle,
      _props = _objectWithoutProperties(props, _excluded);

  var text = content !== null && content !== void 0 ? content : title;
  return /*#__PURE__*/_react.default.createElement("span", _extends({}, _props, {
    title: text,
    className: "formx-label"
  }), text);
});
exports.Label = Label;
var Grid = (0, _shared.withLayoutGrid)(function (props) {
  var title = props.title,
      displayTitle = props.displayTitle,
      className = props.className,
      nextProps = _objectWithoutProperties(props, _excluded2);

  var cls = ["layout-grid"];
  className && cls.push(className);
  return /*#__PURE__*/_react.default.createElement("div", _extends({}, nextProps, {
    className: cls.join(" ")
  }), props.children);
});
exports.Grid = Grid;
var Image = (0, _shared.withLayoutField)(function (props) {
  var styles = {
    maxHeight: "100%",
    maxWidth: "100%"
  };
  var layoutStyle = props["layout-style"];

  if (layoutStyle.width) {
    styles.width = layoutStyle.width;
  }

  if (layoutStyle.height) {
    styles.height = layoutStyle.height;
  }

  return /*#__PURE__*/_react.default.createElement("img", {
    className: "formx-image",
    style: styles,
    src: props.src,
    alt: props.title
  });
}, true);
exports.Image = Image;
var Divider = (0, _shared.withLayoutPane)(function (props) {
  var text = null;

  if (props.displayTitle === false) {
    text = null;
  } else {
    text = props.title;
  }

  var cls = ["formx-divider"];
  var _type = "horizontal";

  if (props.direction === "vertical") {
    _type = "vertical";
    text = null;
  }

  var componentProps = {
    dashed: false,
    orientation: "left",
    type: _type
  };
  return /*#__PURE__*/_react.default.createElement(_antd.Divider, _extends({}, componentProps, {
    className: cls.join(" ")
  }), text);
}, true, "formx-form-pane-divider");
exports.Divider = Divider;