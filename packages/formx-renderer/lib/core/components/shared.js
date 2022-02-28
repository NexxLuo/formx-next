"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withLayoutField = withLayoutField;
exports.withLayoutGrid = withLayoutGrid;
exports.withLayoutPane = withLayoutPane;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _react2 = require("@formily/react");

var _excluded = ["wrapper", "className"],
    _excluded2 = ["wrapper"],
    _excluded3 = ["wrapper"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function getLayoutStyle() {
  var _layoutProps$height;

  var layoutProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var layoutStyle = {};
  var layoutHeight = (_layoutProps$height = layoutProps.height) !== null && _layoutProps$height !== void 0 ? _layoutProps$height : {
    type: "auto"
  };
  var layoutWidth = layoutProps.width;

  if (_typeof(layoutHeight) === "object" && layoutHeight) {
    if (layoutHeight.type === "const") {
      var _consHeight = Number(layoutHeight.const);

      if (!isNaN(_consHeight)) {
        layoutStyle.height = _consHeight;
      } else {
        layoutStyle.height = "auto";
      }
    } else if (layoutHeight.type === "percent") {
      var _percentHeight = Number(layoutHeight.percent);

      if (!isNaN(_percentHeight)) {
        layoutStyle.height = _percentHeight + "%";
      } else {
        layoutStyle.height = "auto";
      }
    }
  }

  if (_typeof(layoutWidth) === "object" && layoutWidth) {
    if (layoutWidth.type === "const") {
      var _w = Number(layoutWidth.const);

      layoutStyle.width = isNaN(_w) ? "auto" : _w;
    } else if (layoutWidth.type === "percent") {
      var _percentWidth = Number(layoutWidth.percent);

      if (!isNaN(_percentWidth)) {
        layoutStyle.width = _percentWidth + "%";
      }
    } else if (layoutWidth.type === "auto") {
      layoutStyle.width = "auto";
    }
  }

  return layoutStyle;
}

function withLayoutGrid(FC) {
  return function (_props) {
    var _layoutProps$flexDire, _layoutProps$justifyC, _componentProps$style;

    var field = (0, _react2.useField)();

    var wrapper = _props.wrapper,
        className = _props.className,
        props = _objectWithoutProperties(_props, _excluded);

    var innerElement = null;
    var componentProps = field.componentProps || {};
    var layoutProps = componentProps["x-layout-props"] || {};
    var columnsCount = 1;
    var parent = field.parent;
    var hasParent = false;

    if (parent && parent.componentProps["x-layout-props"]) {
      var parentLayout = parent.componentProps["x-layout-props"];
      columnsCount = parentLayout.columns;
      hasParent = true;
    }

    var span = 24 / columnsCount * layoutProps.span;

    if (span > 24) {
      span = 24;
    }

    var defaultDirection = hasParent ? "row" : "column";
    var flexDirection = (_layoutProps$flexDire = layoutProps.flexDirection) !== null && _layoutProps$flexDire !== void 0 ? _layoutProps$flexDire : "row";
    var justifyContent = (_layoutProps$justifyC = layoutProps.justifyContent) !== null && _layoutProps$justifyC !== void 0 ? _layoutProps$justifyC : "flex-start";
    var layoutStyle = getLayoutStyle(layoutProps);
    var innerLayoutstyle = {};

    if (flexDirection === "column") {
      innerLayoutstyle.flexDirection = flexDirection;
      innerLayoutstyle.flexWrap = "nowrap";
    } else {
      innerLayoutstyle.flexDirection = flexDirection; //水平模式允许自动换行

      innerLayoutstyle.flexWrap = "wrap";
    }

    if (justifyContent) {
      innerLayoutstyle.justifyContent = justifyContent;
    }

    var paneClass = "layout-grid-pane";
    var prevStyles = (_componentProps$style = componentProps.style) !== null && _componentProps$style !== void 0 ? _componentProps$style : {};
    var colStyle = {};

    if (layoutStyle.width) {
      colStyle.width = layoutStyle.width;

      if (layoutStyle.width === "100%") {
        colStyle.flex = "auto";
      }
    }

    if (layoutStyle.height) {
      colStyle.height = layoutStyle.height;

      if (layoutStyle.height === "100%") {
        colStyle.flex = "auto";
      }
    }

    var newStyle = _objectSpread(_objectSpread(_objectSpread({}, prevStyles), innerLayoutstyle), colStyle);

    innerElement = /*#__PURE__*/_react.default.createElement("div", {
      className: paneClass
    }, /*#__PURE__*/_react.default.createElement(FC, _extends({}, props, {
      style: newStyle
    }), props.children));

    if (typeof wrapper === "function") {
      innerElement = wrapper(innerElement);
    }

    if (defaultDirection === "row") {
      var cls = ["layout-grid-col"];
      className && cls.push(className);
      return /*#__PURE__*/_react.default.createElement(_antd.Col, {
        span: span,
        className: cls.join(" "),
        style: colStyle
      }, innerElement);
    } else {
      var _cls = ["layout-grid-row"];
      className && _cls.push(className);
      return /*#__PURE__*/_react.default.createElement(_antd.Row, {
        type: "flex",
        className: _cls.join(" "),
        style: colStyle
      }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
        span: span,
        className: "layout-grid-col",
        style: colStyle
      }, innerElement));
    }
  };
}

function withLayoutPane(FC) {
  var noneLayout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  return function (_props) {
    var _layoutProps$height2;

    var field = (0, _react2.useField)();

    var wrapper = _props.wrapper,
        props = _objectWithoutProperties(_props, _excluded2);

    var layoutProps = field.componentProps["x-layout-props"] || {};
    var layoutHeight = (_layoutProps$height2 = layoutProps.height) !== null && _layoutProps$height2 !== void 0 ? _layoutProps$height2 : {
      type: "auto"
    };
    var layoutStyle = {};
    layoutStyle = getLayoutStyle(layoutProps);
    var columnsCount = 1;
    var parent = field.parent;
    var hasParent = false;

    if (parent && parent.componentProps["x-layout-props"]) {
      var parentLayout = parent.componentProps["x-layout-props"];
      columnsCount = parentLayout.columns;
      hasParent = true;
    }

    var span = 24 / columnsCount * (layoutProps.span || 1);

    if (isNaN(span) || span > 24) {
      span = 24;
    }

    var clsArr = [];

    if (className) {
      clsArr.push(className);
    }

    if (hasParent) {
      clsArr.push("formx-form-pane");
      clsArr.push("formx-form-pane-nested");
      clsArr.push("formx-item-fill-height");
    } else {
      clsArr.push("formx-form-pane");

      if (layoutHeight.type === "percent") {
        clsArr.push("formx-item-fill-height");
      }
    }

    var paneClass = clsArr.join(" ");

    var innerElement = /*#__PURE__*/_react.default.createElement(FC, props);

    if (typeof wrapper === "function") {
      innerElement = wrapper(innerElement);
    }

    if (noneLayout === true) {
      layoutStyle = {};
    }

    var id = field.path.toString() + "_" + field.form.id;

    if (hasParent) {
      return /*#__PURE__*/_react.default.createElement(_antd.Col, {
        span: span,
        style: layoutStyle
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: paneClass,
        id: id
      }, innerElement));
    } else {
      return /*#__PURE__*/_react.default.createElement(_antd.Row, {
        type: "flex"
      }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
        span: span,
        style: layoutStyle
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: paneClass,
        id: id
      }, innerElement)));
    }
  };
}

function withLayoutField(FC) {
  var noneWrapper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return function (_props) {
    var _parent$displayName;

    var field = (0, _react2.useField)();
    var schema = (0, _react2.useFieldSchema)();

    var _noneWrapper = schema.noneWrapper || noneWrapper;

    var wrapper = _props.wrapper,
        props = _objectWithoutProperties(_props, _excluded3);

    var layoutProps = field.componentProps["x-layout-props"] || {};
    var layoutStyle = {};
    layoutStyle = getLayoutStyle(layoutProps);
    var columnsCount = 1;
    var parent = field.parent;
    var hasParent = false;

    if (parent && parent.componentProps["x-layout-props"]) {
      var parentLayout = parent.componentProps["x-layout-props"];
      columnsCount = parentLayout.columns;
      hasParent = true;
    }

    var span = 24 / columnsCount * layoutProps.span;
    var hasSpan = true;

    if (isNaN(span)) {
      hasSpan = false;
    }

    if (span > 24) {
      span = 24;
    }

    var innerElement = /*#__PURE__*/_react.default.createElement(FC, _extends({}, props, {
      "layout-style": layoutStyle
    }));

    if (typeof wrapper === "function") {
      innerElement = wrapper(innerElement);
    }

    layoutStyle.alignSelf = "center";

    if (!_noneWrapper && hasParent && hasSpan && ((_parent$displayName = parent.displayName) === null || _parent$displayName === void 0 ? void 0 : _parent$displayName.toLowerCase()) !== "arrayfield") {
      return /*#__PURE__*/_react.default.createElement(_antd.Col, {
        span: span,
        style: layoutStyle
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "formx-item-virtual-field"
      }, innerElement));
    } else {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "formx-item-virtual-field"
      }, innerElement);
    }
  };
}