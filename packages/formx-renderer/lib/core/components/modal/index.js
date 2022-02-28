"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Modal = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _react2 = require("@formily/react");

var _excluded = ["onCancel", "footerRender", "onClose", "onBeforeClose", "isEditor"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function callPrepose(fn, preFn, payload, _ref) {
  var resolving = _ref.resolving,
      resolve = _ref.resolve,
      reject = _ref.reject;

  if (typeof fn === "function") {
    if (typeof preFn === "function") {
      var res = preFn(payload);

      if (res instanceof Promise) {
        resolving();
        res.then(function (d) {
          if (d !== false) {
            resolve();
            fn(payload);
          } else {
            reject();
          }
        });
      } else if (res !== false) {
        fn(payload);
      }
    } else {
      fn(payload);
    }
  }
}

function getChildrenGraph(graph, name) {
  var items = [];

  for (var k in graph) {
    if (graph.hasOwnProperty(k)) {
      var g = graph[k];

      if (g.address && g.path !== name && g.address.indexOf(name) > -1) {
        items.push(g);
      }
    }
  }

  return items;
}

function getChildrenState(form, name) {
  var graph = form.getFormGraph();
  var items = getChildrenGraph(graph, name);
  var state = {};
  items.forEach(function (g) {
    var _componentProps$xExt, _componentProps$xExt$;

    var componentProps = g.component[1] || {};
    var _name = g.path;
    var ctype = (_componentProps$xExt = componentProps["x-extra-props"]) === null || _componentProps$xExt === void 0 ? void 0 : (_componentProps$xExt$ = _componentProps$xExt.name) === null || _componentProps$xExt$ === void 0 ? void 0 : _componentProps$xExt$.toLowerCase();

    if (!state[_name]) {
      if (ctype === "arraytable") {
        var _g$fieldActions;

        var _values = [g.value];
        var fn = (_g$fieldActions = g.fieldActions) === null || _g$fieldActions === void 0 ? void 0 : _g$fieldActions.getSelections;

        if (typeof fn === "function") {
          var selections = fn();

          _values.push({
            selections: selections
          });
        }

        state[_name] = _values;
      } else {
        var _inputValues = [];

        if (g.inputValues instanceof Array && g.inputValues.length > 0) {
          _inputValues = g.inputValues;
        } else {
          if (typeof g.value !== "undefined") {
            _inputValues = [g.value];
          }
        }

        state[_name] = _inputValues;
      }
    }
  });
  return state;
}

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
      }
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

var BaseModal = function BaseModal(props) {
  var form = (0, _react2.useForm)();
  var field = (0, _react2.useField)();
  var name = field.path.toString();
  var schema = (0, _react2.useFieldSchema)();

  var onCancel = props.onCancel,
      footerRender = props.footerRender,
      onClose = props.onClose,
      onBeforeClose = props.onBeforeClose,
      isEditor = props.isEditor,
      componentProps = _objectWithoutProperties(props, _excluded);

  var storeRef = (0, _react.useRef)({
    isOkClose: false
  });

  var _useState = (0, _react.useState)({
    visible: props.visible,
    okLoading: false
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      _setState = _useState2[1];

  function setState(o) {
    _setState(_objectSpread(_objectSpread({}, state), o));
  }

  var show = function show() {
    setState({
      visible: true
    });
  };

  var hide = function hide() {
    if (!isEditor) {
      setState({
        visible: false,
        okLoading: false
      });
    }
  };

  var renderFooter = function renderFooter() {
    var items = schema.additionalProperties;

    if (!items) {
      return null;
    }

    var path = field.address.toString();
    var elements = items.mapProperties(function (props, _key) {
      var basePath = path;
      var key = "additionalProperties_" + _key;
      return /*#__PURE__*/_react.default.createElement(_react2.RecursionField, {
        key: key,
        basePath: basePath,
        name: key,
        schema: _objectSpread(_objectSpread({}, props), {}, {
          noneWrapper: true
        })
      });
    });

    if (isEditor) {
      elements = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
        style: {
          color: "#c8c8c8",
          paddingRight: 4,
          display: "inline-flex",
          alignItems: "center"
        }
      }, "\u53EF\u5411\u6B64\u5904\u62D6\u5165\u6309\u94AE\u8868\u5355\u9879"), elements);
    }

    return elements;
  };

  var afterClose = function afterClose() {
    var isOkClose = storeRef.current.isOkClose;

    if (isOkClose) {// let state = getChildrenState(form, schema.key);
      // form.notify(props.name + "_onClose", {
      //     name: props.name,
      //     data: state
      // });
    } else {
      form.notify(name + "_onCancel", {
        name: name
      });
    }

    storeRef.current.isOkClose = false;
  };

  var _onOk = function onOk() {
    var _state = getChildrenState(form, schema.name);

    function resolve() {
      hide();
      storeRef.current.isOkClose = true;
      form.notify("onModalChange", {
        name: name,
        payload: {
          data: _state
        }
      });
    }

    function reject() {
      setState({
        okLoading: false
      });
    }

    function resolving() {
      setState({
        okLoading: true
      });
    }

    callPrepose(function () {
      var _form$getFieldState, _form$getFieldState$c, _form$getFieldState$c2;

      //先执行本身的close将弹窗关闭，再触发onClose事件，否则会导致弹窗无法关闭
      resolve(); //
      //此处onClose传递resolve事件主要是为了onClose时调用异步接口后再关闭弹窗

      var _onClose = (_form$getFieldState = form.getFieldState(name)) === null || _form$getFieldState === void 0 ? void 0 : (_form$getFieldState$c = _form$getFieldState.component) === null || _form$getFieldState$c === void 0 ? void 0 : (_form$getFieldState$c2 = _form$getFieldState$c[1]) === null || _form$getFieldState$c2 === void 0 ? void 0 : _form$getFieldState$c2.onClose;

      if (typeof _onClose === "function") {
        _onClose({
          data: _state,
          resolving: resolving,
          resolve: resolve,
          reject: reject
        });
      }
    }, onBeforeClose, _state, {
      resolving: resolving,
      resolve: resolve,
      reject: reject
    });
  }; //必须每次render时都更新fieldActions，否则会导致方法内部的state不同步


  (0, _react.useEffect)(function () {
    field.setState(function (s) {
      s.fieldActions = {
        show: show,
        hide: hide,
        confirm: _onOk
      };
    });
  }, [schema]);
  var footer = renderFooter();

  if (typeof footerRender === "function") {
    footer = footerRender(footer, schema);
  }

  return /*#__PURE__*/_react.default.createElement(_antd.Modal, _extends({}, componentProps, {
    destroyOnClose: true,
    visible: state.visible,
    confirmLoading: state.okLoading,
    onCancel: function onCancel() {
      return hide();
    },
    afterClose: afterClose,
    onOk: function onOk() {
      return _onOk();
    },
    footer: footer
  }), /*#__PURE__*/_react.default.createElement(_antd.Row, {
    type: "flex"
  }, props.children));
};

var Modal = (0, _react2.connect)(function (props) {
  var wrapperRef = (0, _react.useRef)(null);
  return /*#__PURE__*/_react.default.createElement(_antd.ConfigProvider, {
    getPopupContainer: function getPopupContainer() {
      return document.body;
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    ref: wrapperRef
  }), /*#__PURE__*/_react.default.createElement(BaseModal, _extends({}, props, {
    getContainer: function getContainer() {
      return props.isEditor ? wrapperRef.current : document.body;
    }
  }), props.children));
}, (0, _react2.mapProps)(function (props, field) {
  var _layoutStyle$height, _layoutStyle$width;

  var layoutProps = props["x-layout-props"] || {};
  var layoutStyle = getLayoutStyle(layoutProps);
  var isEditor = field.form.getValuesIn("__DATA__.__isEditor") === true ? true : false;
  var resetProps = {
    isEditor: isEditor,
    transitionName: isEditor ? "" : undefined,
    mask: isEditor ? false : true,
    maskClosable: false,
    style: {
      height: "auto",
      maxWidth: "100%",
      maxHeight: "100%"
    },
    bodyStyle: {
      height: (_layoutStyle$height = layoutStyle.height) !== null && _layoutStyle$height !== void 0 ? _layoutStyle$height : "auto",
      overflow: "auto"
    },
    width: (_layoutStyle$width = layoutStyle.width) !== null && _layoutStyle$width !== void 0 ? _layoutStyle$width : "auto",
    wrapClassName: "formx-container formx-modal-wrapper",
    size: "small"
  };

  if (isEditor) {
    resetProps.visible = true;
  }

  return _objectSpread({}, resetProps);
}));
exports.Modal = Modal;
var _default = Modal;
exports.default = _default;