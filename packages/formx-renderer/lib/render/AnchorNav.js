"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _classnames = _interopRequireDefault(require("classnames"));

var _configProvider = require("antd/es/config-provider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var AnchorLink = /*#__PURE__*/function (_React$Component) {
  _inherits(AnchorLink, _React$Component);

  var _super = _createSuper(AnchorLink);

  function AnchorLink() {
    var _this;

    _classCallCheck(this, AnchorLink);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.handleClick = function (e) {
      var _this$context$antAnch = _this.context.antAnchor,
          scrollTo = _this$context$antAnch.scrollTo,
          onClick = _this$context$antAnch.onClick;
      var _this$props = _this.props,
          href = _this$props.href,
          title = _this$props.title;

      if (onClick) {
        onClick(e, {
          title: title,
          href: href
        });
      }

      scrollTo(href);
    };

    _this.renderAnchorLink = function (_ref) {
      var getPrefixCls = _ref.getPrefixCls;
      var _this$props2 = _this.props,
          customizePrefixCls = _this$props2.prefixCls,
          href = _this$props2.href,
          title = _this$props2.title,
          children = _this$props2.children,
          className = _this$props2.className,
          target = _this$props2.target;
      var prefixCls = getPrefixCls("anchor", customizePrefixCls);
      var active = _this.context.antAnchor.activeLink === href;
      var wrapperClassName = (0, _classnames.default)(className, "".concat(prefixCls, "-link"), _defineProperty({}, "".concat(prefixCls, "-link-active"), active));
      var titleClassName = (0, _classnames.default)("".concat(prefixCls, "-link-title"), _defineProperty({}, "".concat(prefixCls, "-link-title-active"), active));
      return /*#__PURE__*/_react.default.createElement("div", {
        className: wrapperClassName
      }, /*#__PURE__*/_react.default.createElement("a", {
        className: titleClassName,
        title: typeof title === "string" ? title : "",
        target: target,
        onClick: _this.handleClick
      }, children));
    };

    return _this;
  }

  _createClass(AnchorLink, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.context.antAnchor.registerLink(this.props.href);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_ref2) {
      var prevHref = _ref2.href;
      var href = this.props.href;

      if (prevHref !== href) {
        this.context.antAnchor.unregisterLink(prevHref);
        this.context.antAnchor.registerLink(href);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.context.antAnchor.unregisterLink(this.props.href);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement(_configProvider.ConfigConsumer, null, this.renderAnchorLink);
    }
  }]);

  return AnchorLink;
}(_react.default.Component);

AnchorLink.defaultProps = {
  href: "#"
};
AnchorLink.contextTypes = {
  antAnchor: _propTypes.default.object
};
(0, _reactLifecyclesCompat.polyfill)(AnchorLink);

var AnchorNav = /*#__PURE__*/function (_React$Component2) {
  _inherits(AnchorNav, _React$Component2);

  var _super2 = _createSuper(AnchorNav);

  function AnchorNav(props) {
    var _this2;

    _classCallCheck(this, AnchorNav);

    _this2 = _super2.call(this, props);

    _this2.init = function () {
      var _form$props, _form$props$context;

      var form = _this2.props.getForm();

      var isEditor = form.getValuesIn("__DATA__.__isEditor");

      if (isEditor) {
        return;
      }

      var graph = form.getFormGraph();
      var items = [];
      var formId = form.id;
      var options = ((_form$props = form.props) === null || _form$props === void 0 ? void 0 : (_form$props$context = _form$props.context) === null || _form$props$context === void 0 ? void 0 : _form$props$context.options) || {};
      Reflect.ownKeys(graph).forEach(function (k) {
        if (k.split(".").length === 1) {
          var _item$component, _item$component$, _item$component2, _item$component2$;

          var item = graph[k];
          var componentType = (_item$component = item.component) === null || _item$component === void 0 ? void 0 : (_item$component$ = _item$component[0]) === null || _item$component$ === void 0 ? void 0 : _item$component$.toLowerCase();
          var isGroup = ["fieldset", "card", "tab", "arraytable"].indexOf(componentType) > -1;
          var extra = (_item$component2 = item.component) === null || _item$component2 === void 0 ? void 0 : (_item$component2$ = _item$component2[1]) === null || _item$component2$ === void 0 ? void 0 : _item$component2$["x-extra-props"];

          if (extra && extra.isGroup === true) {
            isGroup = true;
          }

          if (["modal", "grid"].indexOf(componentType) > -1) {
            isGroup = false;
          }

          var isHidden = false;

          if (options.visible === false) {
            isHidden = true;
          }

          if (extra && extra.visibility && extra.visibility.type === "hidden") {
            isHidden = true;
          }

          if (isGroup && !isHidden) {
            items.push({
              id: k + "_" + formId,
              name: k,
              title: extra.title
            });
          }
        }
      });

      _this2.setState({
        list: items
      });
    };

    _this2.getContainer = function () {
      var fn = _this2.props.getContainer;
      var el = null;

      if (typeof fn === "function") {
        el = fn();
      }

      return el || window;
    };

    _this2.toggleExpand = function () {
      var form = _this2.props.getForm();

      var _this2$state = _this2.state,
          expanded = _this2$state.expanded,
          list = _this2$state.list;
      list.forEach(function (d) {
        var field = form.query(d.name).take();

        if (field) {
          var collapsible = field.componentProps.collapsible;

          if (collapsible) {
            if (expanded) {
              field.setComponentProps({
                activeKey: []
              });
            } else {
              field.setComponentProps({
                activeKey: ["pane"]
              });
            }
          }
        }
      });

      _this2.setState({
        expanded: !expanded
      });
    };

    _this2.state = {
      list: [],
      expanded: true
    };
    return _this2;
  }

  _createClass(AnchorNav, [{
    key: "render",
    value: function render() {
      if (this.props.disabled) {
        return null;
      }

      if (this.state.list.length < 2) {
        return null;
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "formx-anchor"
      }, /*#__PURE__*/_react.default.createElement(_antd.Anchor, {
        affix: false,
        getContainer: this.getContainer,
        offsetTop: 6
      }, this.state.list.map(function (d, i) {
        return /*#__PURE__*/_react.default.createElement(AnchorLink, {
          className: "formx-anchor-link",
          href: "#" + d.id,
          key: d.id
        }, /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
          placement: "left",
          title: d.title
        }, i + 1));
      })), /*#__PURE__*/_react.default.createElement("span", {
        className: "formx-anchor-expand-icon",
        onClick: this.toggleExpand
      }, /*#__PURE__*/_react.default.createElement(_antd.Icon, {
        type: this.state.expanded ? "pic-center" : "menu"
      })));
    }
  }]);

  return AnchorNav;
}(_react.default.Component);

AnchorNav.defaultProps = {
  disabled: false
};
AnchorNav.propTypes = {
  getContainer: _propTypes.default.func,
  getForm: _propTypes.default.func,
  disabled: _propTypes.default.bool
};
var _default = AnchorNav;
exports.default = _default;