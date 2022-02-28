"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FormTab = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _react2 = require("@formily/react");

var _classnames = _interopRequireDefault(require("classnames"));

var _builtins__ = require("@nvwa/formx-antd/lib/__builtins__");

var _shared = require("../shared");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useTabs = function useTabs() {
  var tabsField = (0, _react2.useField)();
  var schema = (0, _react2.useFieldSchema)();
  var tabs = [];
  schema.mapProperties(function (schema, name) {
    var field = tabsField.query(tabsField.address.concat(name)).take();
    if ((field === null || field === void 0 ? void 0 : field.display) === "none" || (field === null || field === void 0 ? void 0 : field.display) === "hidden") return;
    var ctype = schema["x-component"] || "";
    ctype = ctype.toLowerCase();

    if (ctype.indexOf("tabpane") > -1) {
      var _schema$xComponentP;

      tabs.push({
        name: name,
        props: _objectSpread(_objectSpread(_objectSpread({}, schema === null || schema === void 0 ? void 0 : schema["x-component-props"]), field === null || field === void 0 ? void 0 : field.componentProps), {}, {
          key: (schema === null || schema === void 0 ? void 0 : (_schema$xComponentP = schema["x-component-props"]) === null || _schema$xComponentP === void 0 ? void 0 : _schema$xComponentP.key) || name
        }),
        schema: schema
      });
    }
  });
  return tabs;
};

var TabPane = function TabPane(_props) {
  var children = _props.children,
      wrapper = _props.wrapper,
      schema = _props.schema;

  var _children = /*#__PURE__*/_react.default.createElement(_antd.Row, {
    type: "flex"
  }, children);

  var innerElement = null;

  if (typeof wrapper === "function") {
    innerElement = wrapper(_children, schema);
  } else {
    innerElement = _children;
  }

  return innerElement;
};

var FormTab = (0, _shared.withLayoutPane)((0, _react2.observer)(function (_props) {
  var _formContext, _tabs$, _tabs$$name;

  var props = _props;
  var hiddenKeys = props.hiddenKeys || [];
  var field = (0, _react2.useField)();
  var tabs = useTabs();
  var name = field.path.toString();
  var formProps = field.form.props;
  var formContext = null;

  if (typeof formProps.getContext === "function") {
    formContext = formProps.getContext();
  }

  var _context = (_formContext = formContext) === null || _formContext === void 0 ? void 0 : _formContext.selectedTabItem;

  var __activeKey = "";

  if (_context) {
    var _context$name;

    __activeKey = (_context$name = _context[name]) === null || _context$name === void 0 ? void 0 : _context$name.activeKey;
  }

  var _activeKey = props.activeKey || __activeKey || ((_tabs$ = tabs[0]) === null || _tabs$ === void 0 ? void 0 : (_tabs$$name = _tabs$.name) === null || _tabs$$name === void 0 ? void 0 : _tabs$$name.toString());

  var _formTab = {
    activeKey: _activeKey,
    setActiveKey: function setActiveKey(key) {
      field.setComponentProps({
        activeKey: key
      });
      var name = field.path.toString();
      var context = formContext || {};
      var setContext = formProps.setContext;

      if (typeof setContext === "function" && context) {
        if (context.selectedTabItem) {
          context.selectedTabItem[name] = {
            activeKey: key
          };
        } else {
          context.selectedTabItem = _defineProperty({}, name, {
            activeKey: key
          });
        }

        setContext(context);
      }
    }
  };
  var prefixCls = (0, _builtins__.usePrefixCls)("formily-tab", props);
  var activeKey = _formTab.activeKey;

  var badgedTab = function badgedTab(key, props) {
    var errors = field.form.queryFeedbacks({
      type: "error",
      address: "".concat(field.address.concat(key), ".*")
    });

    if (errors.length) {
      return /*#__PURE__*/_react.default.createElement(_antd.Badge, {
        className: "errors-badge",
        count: errors.length
      }, props.tab);
    }

    return props.tab;
  };

  return /*#__PURE__*/_react.default.createElement(_antd.Tabs, _extends({}, props, {
    className: (0, _classnames.default)(prefixCls, props.className),
    activeKey: activeKey,
    onChange: function onChange(key) {
      var _props$onChange, _formTab$setActiveKey;

      (_props$onChange = props.onChange) === null || _props$onChange === void 0 ? void 0 : _props$onChange.call(props, key);
      _formTab === null || _formTab === void 0 ? void 0 : (_formTab$setActiveKey = _formTab.setActiveKey) === null || _formTab$setActiveKey === void 0 ? void 0 : _formTab$setActiveKey.call(_formTab, key);
    },
    onTabClick: function onTabClick(k, e) {
      e.stopPropagation();
    }
  }), tabs.map(function (_ref) {
    var props = _ref.props,
        schema = _ref.schema,
        name = _ref.name;

    if (hiddenKeys.indexOf(name) > -1) {
      return null;
    }

    var tab = null;

    var _tab = badgedTab(name, props);

    var tabItemWrapper = props.tabItemWrapper;

    if (typeof tabItemWrapper === "function") {
      tab = tabItemWrapper(_tab, schema);
    } else {
      tab = _tab;
    }

    return /*#__PURE__*/_react.default.createElement(_antd.Tabs.TabPane, _extends({}, props, {
      tab: tab,
      forceRender: true
    }), /*#__PURE__*/_react.default.createElement(_react2.RecursionField, {
      schema: schema,
      name: name
    }));
  }));
}));
exports.FormTab = FormTab;
FormTab.TabPane = TabPane;
var _default = FormTab;
exports.default = _default;