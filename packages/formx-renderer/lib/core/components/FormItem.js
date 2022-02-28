"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LayoutBaseItem = exports.FormItem = exports.BaseItem = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _builtins__ = require("@nvwa/formx-antd/lib/__builtins__");

var _core = require("@formily/core");

var _react2 = require("@formily/react");

var _shared = require("@formily/shared");

var _formxAntd = require("@nvwa/formx-antd");

var _antd = require("antd");

var _icons = require("@nvwa/formx-antd/lib/icons");

var _excluded = ["children"],
    _excluded2 = ["wrapper", "displayTitle"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useFormItemLayout = function useFormItemLayout(props) {
  var _ref, _props$layout, _props$colon, _ref2, _props$labelAlign, _ref3, _props$labelAlign2, _props$labelWrap, _props$labelWidth, _props$wrapperWidth, _props$labelCol, _props$wrapperCol, _props$wrapperAlign, _props$wrapperWrap, _props$fullness, _props$size, _props$inset, _props$bordered, _ref4, _props$feedbackLayout;

  var shallowFormLayout = (0, _formxAntd.useFormShallowLayout)();
  var formLayout = (0, _formxAntd.useFormLayout)();

  var layout = _objectSpread(_objectSpread({}, shallowFormLayout), formLayout);

  var itemLayout = (_ref = (_props$layout = props.layout) !== null && _props$layout !== void 0 ? _props$layout : layout.layout) !== null && _ref !== void 0 ? _ref : "horizontal";
  return _objectSpread(_objectSpread({}, props), {}, {
    layout: itemLayout,
    colon: (_props$colon = props.colon) !== null && _props$colon !== void 0 ? _props$colon : layout.colon,
    labelAlign: itemLayout === "vertical" ? (_ref2 = (_props$labelAlign = props.labelAlign) !== null && _props$labelAlign !== void 0 ? _props$labelAlign : layout.labelAlign) !== null && _ref2 !== void 0 ? _ref2 : "left" : (_ref3 = (_props$labelAlign2 = props.labelAlign) !== null && _props$labelAlign2 !== void 0 ? _props$labelAlign2 : layout.labelAlign) !== null && _ref3 !== void 0 ? _ref3 : "right",
    labelWrap: (_props$labelWrap = props.labelWrap) !== null && _props$labelWrap !== void 0 ? _props$labelWrap : layout.labelWrap,
    labelWidth: (_props$labelWidth = props.labelWidth) !== null && _props$labelWidth !== void 0 ? _props$labelWidth : layout.labelWidth,
    wrapperWidth: (_props$wrapperWidth = props.wrapperWidth) !== null && _props$wrapperWidth !== void 0 ? _props$wrapperWidth : layout.wrapperWidth,
    labelCol: (_props$labelCol = props.labelCol) !== null && _props$labelCol !== void 0 ? _props$labelCol : layout.labelCol,
    wrapperCol: (_props$wrapperCol = props.wrapperCol) !== null && _props$wrapperCol !== void 0 ? _props$wrapperCol : layout.wrapperCol,
    wrapperAlign: (_props$wrapperAlign = props.wrapperAlign) !== null && _props$wrapperAlign !== void 0 ? _props$wrapperAlign : layout.wrapperAlign,
    wrapperWrap: (_props$wrapperWrap = props.wrapperWrap) !== null && _props$wrapperWrap !== void 0 ? _props$wrapperWrap : layout.wrapperWrap,
    fullness: (_props$fullness = props.fullness) !== null && _props$fullness !== void 0 ? _props$fullness : layout.fullness,
    size: (_props$size = props.size) !== null && _props$size !== void 0 ? _props$size : layout.size,
    inset: (_props$inset = props.inset) !== null && _props$inset !== void 0 ? _props$inset : layout.inset,
    asterisk: props.asterisk,
    bordered: (_props$bordered = props.bordered) !== null && _props$bordered !== void 0 ? _props$bordered : layout.bordered,
    feedbackIcon: props.feedbackIcon,
    feedbackLayout: (_ref4 = (_props$feedbackLayout = props.feedbackLayout) !== null && _props$feedbackLayout !== void 0 ? _props$feedbackLayout : layout.feedbackLayout) !== null && _ref4 !== void 0 ? _ref4 : "loose"
  });
};

var BaseItem = function BaseItem(props) {
  var _cls, _cls2, _props$label, _cls3, _cls4, _cls5;

  var children = props.children,
      others = _objectWithoutProperties(props, _excluded);

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      active = _useState2[0],
      setActice = _useState2[1];

  var formLayout = useFormItemLayout(others);
  var shallowFormLayout = (0, _formxAntd.useFormShallowLayout)();
  var label = formLayout.label,
      style = formLayout.style,
      layout = formLayout.layout,
      _formLayout$colon = formLayout.colon,
      colon = _formLayout$colon === void 0 ? true : _formLayout$colon,
      addonBefore = formLayout.addonBefore,
      addonAfter = formLayout.addonAfter,
      asterisk = formLayout.asterisk,
      feedbackStatus = formLayout.feedbackStatus,
      extra = formLayout.extra,
      feedbackText = formLayout.feedbackText,
      fullness = formLayout.fullness,
      feedbackLayout = formLayout.feedbackLayout,
      feedbackIcon = formLayout.feedbackIcon,
      inset = formLayout.inset,
      _formLayout$bordered = formLayout.bordered,
      bordered = _formLayout$bordered === void 0 ? true : _formLayout$bordered,
      labelWidth = formLayout.labelWidth,
      wrapperWidth = formLayout.wrapperWidth,
      labelCol = formLayout.labelCol,
      wrapperCol = formLayout.wrapperCol,
      labelAlign = formLayout.labelAlign,
      _formLayout$wrapperAl = formLayout.wrapperAlign,
      wrapperAlign = _formLayout$wrapperAl === void 0 ? "left" : _formLayout$wrapperAl,
      size = formLayout.size,
      labelWrap = formLayout.labelWrap,
      wrapperWrap = formLayout.wrapperWrap,
      tooltip = formLayout.tooltip;
  var labelStyle = formLayout.labelStyle || {};
  var wrapperStyle = formLayout.wrapperStyle || {}; // 固定宽度

  var enableCol = false;

  if (labelWidth || wrapperWidth) {
    if (labelWidth) {
      labelStyle.width = "".concat(labelWidth, "px");
      labelStyle.maxWidth = "".concat(labelWidth, "px");
    }

    if (wrapperWidth) {
      wrapperStyle.width = "".concat(wrapperWidth, "px");
      wrapperStyle.maxWidth = "".concat(wrapperWidth, "px");
    } // 栅格模式

  } else if (labelCol || wrapperCol) {
    enableCol = true;
  }

  var prefixCls = (0, _builtins__.usePrefixCls)("formily-item", props);
  var formatChildren = feedbackLayout === "popover" ? /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    align: {
      offset: [0, 4]
    },
    placement: "topLeft",
    mouseEnterDelay: 0.3,
    title: !!feedbackText ? /*#__PURE__*/_react.default.createElement("span", null, feedbackText) : null
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ant-formily-item-control-content-component-inner"
  }, children)) : children;
  return /*#__PURE__*/_react.default.createElement("div", {
    style: _objectSpread(_objectSpread({}, style), {}, {
      gridColumnStart: "span ".concat((0, _formxAntd.useGridSpan)(props.gridSpan))
    }),
    className: (0, _classnames.default)((_cls = {}, _defineProperty(_cls, "".concat(prefixCls), true), _defineProperty(_cls, "".concat(prefixCls, "-layout-").concat(layout), true), _defineProperty(_cls, "".concat(prefixCls, "-").concat(feedbackStatus), !!feedbackStatus), _defineProperty(_cls, "".concat(prefixCls, "-feedback-has-text"), !!feedbackText), _defineProperty(_cls, "".concat(prefixCls, "-size-").concat(size), !!size), _defineProperty(_cls, "".concat(prefixCls, "-feedback-layout-").concat(feedbackLayout), !!feedbackLayout), _defineProperty(_cls, "".concat(prefixCls, "-fullness"), !!fullness || !!inset || !!feedbackIcon), _defineProperty(_cls, "".concat(prefixCls, "-inset"), !!inset), _defineProperty(_cls, "".concat(prefixCls, "-active"), active), _defineProperty(_cls, "".concat(prefixCls, "-inset-active"), !!inset && active), _defineProperty(_cls, "".concat(prefixCls, "-label-align-").concat(labelAlign), true), _defineProperty(_cls, "".concat(prefixCls, "-control-align-").concat(wrapperAlign), true), _defineProperty(_cls, "".concat(prefixCls, "-label-wrap"), !!labelWrap), _defineProperty(_cls, "".concat(prefixCls, "-control-wrap"), !!wrapperWrap), _defineProperty(_cls, "".concat(prefixCls, "-bordered-none"), bordered === false || !!inset || !!feedbackIcon), _defineProperty(_cls, props.className, !!props.className), _cls)),
    onFocus: function onFocus() {
      if (feedbackIcon || inset) {
        setActice(true);
      }
    },
    onBlur: function onBlur() {
      if (feedbackIcon || inset) {
        setActice(false);
      }
    }
  }, label !== undefined && /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)((_cls2 = {}, _defineProperty(_cls2, "".concat(prefixCls, "-label"), true), _defineProperty(_cls2, "".concat(prefixCls, "-item-col-").concat(labelCol), enableCol && !!labelCol), _cls2)),
    style: labelStyle
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)("".concat(prefixCls, "-label-content"))
  }, asterisk && /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _classnames.default)("".concat(prefixCls, "-asterisk"))
  }, "*"), /*#__PURE__*/_react.default.createElement("label", {
    title: (_props$label = props.label) === null || _props$label === void 0 ? void 0 : _props$label.toString()
  }, label)), tooltip && /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _classnames.default)("".concat(prefixCls, "-label-tooltip"))
  }, /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    placement: "top",
    title: tooltip
  }, /*#__PURE__*/_react.default.createElement(_icons.QuestionCircleOutlined, null))), label && /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _classnames.default)("".concat(prefixCls, "-colon"))
  }, colon ? ":" : "")), /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)((_cls3 = {}, _defineProperty(_cls3, "".concat(prefixCls, "-control"), true), _defineProperty(_cls3, "".concat(prefixCls, "-item-col-").concat(wrapperCol), enableCol && !!wrapperCol), _cls3))
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)("".concat(prefixCls, "-control-content"))
  }, addonBefore && /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)("".concat(prefixCls, "-addon-before"))
  }, addonBefore), /*#__PURE__*/_react.default.createElement("div", {
    style: wrapperStyle,
    className: (0, _classnames.default)((_cls4 = {}, _defineProperty(_cls4, "".concat(prefixCls, "-control-content-component"), true), _defineProperty(_cls4, "".concat(prefixCls, "-control-content-component-has-feedback-icon"), !!feedbackIcon), _cls4))
  }, /*#__PURE__*/_react.default.createElement(_formxAntd.FormLayoutShallowContext.Provider, {
    value: (0, _shared.reduce)(shallowFormLayout, function (buf, _, key) {
      if (key === "size") {
        buf.size = size;
      } else {
        buf[key] = undefined;
      }

      return buf;
    }, {
      size: size
    })
  }, formatChildren), feedbackIcon && /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)("".concat(prefixCls, "-feedback-icon"))
  }, feedbackIcon)), addonAfter && /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)("".concat(prefixCls, "-addon-after"))
  }, addonAfter)), !!feedbackText && feedbackLayout !== "popover" && feedbackLayout !== "none" && /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)((_cls5 = {}, _defineProperty(_cls5, "".concat(prefixCls, "-").concat(feedbackStatus, "-help"), !!feedbackStatus), _defineProperty(_cls5, "".concat(prefixCls, "-help"), true), _defineProperty(_cls5, "".concat(prefixCls, "-help-enter"), true), _defineProperty(_cls5, "".concat(prefixCls, "-help-enter-active"), true), _cls5))
  }, feedbackText), extra && /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)("".concat(prefixCls, "-extra"))
  }, extra)));
};

exports.BaseItem = BaseItem;

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
      var _constHeight = Number(layoutHeight.const);

      if (!isNaN(_constHeight)) {
        layoutStyle.height = _constHeight;
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
      var _constWidth = Number(layoutWidth.const);

      if (!isNaN(_constWidth)) {
        layoutStyle.width = _constWidth;
        layoutStyle.flexGrow = 0;
        layoutStyle.flexShrink = 0;
        layoutStyle.flexBasis = layoutStyle.width;
      }
    } else if (layoutWidth.type === "percent") {
      var _percentWidth = Number(layoutWidth.percent);

      if (!isNaN(_percentWidth)) {
        layoutStyle.width = _percentWidth + "%";
        layoutStyle.flexGrow = 0;
        layoutStyle.flexShrink = 0;
        layoutStyle.flexBasis = layoutStyle.width;
      }
    } else if (layoutWidth.type === "auto") {
      layoutStyle.width = "auto";
    }
  }

  return layoutStyle;
}

function getParentLayout(item) {
  var layout = null;
  var parent = item.parent;

  if (parent) {
    var _layout = parent.componentProps["x-layout-props"];

    if (_layout) {
      layout = _layout;
    } else {
      if (parent.parent) {
        layout = getParentLayout(parent);
      }
    }
  }

  if (layout) {
    var _layout$columns, _layout$labelWidth, _layout$labelLayout;

    return {
      columns: (_layout$columns = layout.columns) !== null && _layout$columns !== void 0 ? _layout$columns : 1,
      hasParent: true,
      labelWidth: (_layout$labelWidth = layout.labelWidth) !== null && _layout$labelWidth !== void 0 ? _layout$labelWidth : 60,
      labelLayout: (_layout$labelLayout = layout.labelLayout) !== null && _layout$labelLayout !== void 0 ? _layout$labelLayout : "horizontal"
    };
  }

  return {
    columns: 1,
    hasParent: false,
    labelWidth: 60
  };
}

var LayoutBaseItem = function LayoutBaseItem(_props) {
  var _schema$xComponent;

  var wrapper = _props.wrapper,
      displayTitle = _props.displayTitle,
      props = _objectWithoutProperties(_props, _excluded2);

  var field = (0, _react2.useField)();
  var schema = (0, _react2.useFieldSchema)();
  var componentProps = field.componentProps;
  var layoutProps = componentProps["x-layout-props"] || {};
  var layoutClass = ["formx-item-wrapper"];
  var layoutStyle = getLayoutStyle(layoutProps);
  var wrapperClass = [""];

  if (((_schema$xComponent = schema["x-component"]) === null || _schema$xComponent === void 0 ? void 0 : _schema$xComponent.toLowerCase()) === "arraytable") {
    wrapperClass.push("formx-item-table-wrapper");
  }

  var textAlign = layoutProps.textAlign;

  var _getParentLayout = getParentLayout(field),
      columnsCount = _getParentLayout.columns,
      labelWidth = _getParentLayout.labelWidth,
      hasParent = _getParentLayout.hasParent,
      labelLayout = _getParentLayout.labelLayout;

  var fillHeight = false;
  var layoutHeight = layoutProps.height || {};

  if (layoutHeight.type == "percent") {
    var _percentHeight = Number(layoutHeight.percent);

    if (!isNaN(_percentHeight) && _percentHeight > 0) {
      fillHeight = true;
    }
  }

  if (layoutHeight.type == "const") {
    var _constHeight = Number(layoutHeight.const);

    if (!isNaN(_constHeight)) {
      fillHeight = true;
    }
  }

  if (fillHeight === true) {
    layoutClass.push("formx-item-fill-height");
  }

  if (labelLayout === "vertical") {
    labelWidth = undefined;
    layoutClass.push("formx-item-layout-vertical");
  }

  var formItemClass = [];

  if (props.className) {
    formItemClass.push(props.className);
  }

  if (textAlign === "center") {
    formItemClass.push("formx-item-text-align-center");
  } else if (textAlign === "right") {
    formItemClass.push("formx-item-text-align-right");
  } else if (textAlign === "left") {
    formItemClass.push("formx-item-text-align-left");
  }

  layoutClass = layoutClass.join(" ");
  var span = 24 / columnsCount * layoutProps.span;

  if (span > 24 || isNaN(span)) {
    span = 24;
  }

  var _resetProps = {};

  if ((schema === null || schema === void 0 ? void 0 : schema.isTableCellField) === true) {
    _resetProps.label = undefined;
    _resetProps.style = {
      marginBottom: 0
    };
  }

  var innerElement = null;

  if ((schema === null || schema === void 0 ? void 0 : schema.noneWrapper) === true) {
    innerElement = props.children;
    return innerElement;
  } else {
    innerElement = /*#__PURE__*/_react.default.createElement(BaseItem, _extends({}, props, {
      labelWidth: labelWidth
    }, _resetProps, {
      layout: labelLayout,
      feedbackLayout: "popover",
      className: formItemClass.join(" ")
    }));
  }

  if ((schema === null || schema === void 0 ? void 0 : schema.isTableCellField) === true) {
    return innerElement;
  }

  var _element = null;

  if (typeof wrapper === "function") {
    innerElement = wrapper(innerElement);
  }

  if (hasParent) {
    _element = /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: span,
      style: layoutStyle,
      className: layoutClass + wrapperClass.join(" ")
    }, innerElement);
  } else {
    _element = /*#__PURE__*/_react.default.createElement(_antd.Row, {
      type: "flex",
      className: layoutClass + wrapperClass.join(" "),
      style: layoutStyle
    }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: span,
      className: layoutClass
    }, innerElement));
  }

  return _element;
}; // 适配


exports.LayoutBaseItem = LayoutBaseItem;
var FormItem = (0, _react2.connect)(LayoutBaseItem, (0, _react2.mapProps)({
  validateStatus: true,
  title: "label",
  required: true
}, function (props, field) {
  if ((0, _core.isVoidField)(field)) return props;
  if (!field) return props;

  var takeMessage = function takeMessage() {
    var split = function split(messages) {
      return messages.reduce(function (buf, text, index) {
        if (!text) return buf;
        return index < messages.length - 1 ? buf.concat([text, ", "]) : buf.concat([text]);
      }, []);
    };

    if (field.validating) return;
    if (props.feedbackText) return props.feedbackText;
    if (field.selfErrors.length) return split(field.selfErrors);
    if (field.selfWarnings.length) return split(field.selfWarnings);
    if (field.selfSuccesses.length) return split(field.selfSuccesses);
  };

  return {
    feedbackText: takeMessage(),
    extra: props.extra || field.description
  };
}, function (props, field) {
  var _field$decorator$;

  if ((0, _core.isVoidField)(field)) return props;
  if (!field) return props;
  return {
    feedbackStatus: field.validateStatus === "validating" ? "pending" : ((_field$decorator$ = field.decorator[1]) === null || _field$decorator$ === void 0 ? void 0 : _field$decorator$.feedbackStatus) || field.validateStatus
  };
}, function (props, field) {
  if ((0, _core.isVoidField)(field)) return props;
  if (!field) return props;
  var asterisk = false;

  if (field.required && field.pattern !== "readPretty") {
    asterisk = true;
  }

  if ("asterisk" in props) {
    asterisk = props.asterisk;
  }

  return {
    asterisk: asterisk
  };
}, function (props, field) {
  var componentProps = field.componentProps;
  var layoutProps = componentProps["x-layout-props"] || {};
  var label = componentProps.title;

  if (componentProps.displayTitle === false || props.displayLabel === false) {
    label = undefined;
  }

  return {
    labelAlign: layoutProps.labelAlign === "default" ? undefined : layoutProps.labelAlign,
    label: label
  };
}));
exports.FormItem = FormItem;
FormItem.BaseItem = BaseItem;
var _default = FormItem;
exports.default = _default;