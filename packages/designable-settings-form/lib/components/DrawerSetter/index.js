"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawerSetter = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactDom = require("react-dom");
var _react2 = require("@formily/react");
var _formxAntd = require("@platform/formx-antd");
var _designableReact = require("@platform/designable-react");
var _antd = require("antd");
var _classnames = _interopRequireDefault(require("classnames"));
require("./styles.less");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const DrawerSetter = exports.DrawerSetter = (0, _react2.observer)(props => {
  const node = (0, _designableReact.useTreeNode)();
  const field = (0, _react2.useField)();
  const [visible, setVisible] = (0, _react.useState)(false);
  const [remove, setRemove] = (0, _react.useState)(false);
  const [root, setRoot] = (0, _react.useState)();
  const prefix = (0, _designableReact.usePrefix)('drawer-setter');
  const formWrapperCls = (0, _designableReact.usePrefix)('settings-form-wrapper');
  (0, _react.useLayoutEffect)(() => {
    const wrapper = document.querySelector('.' + formWrapperCls);
    if (wrapper) {
      setRoot(wrapper);
    }
  }, [node]);
  const renderDrawer = () => {
    if (root && visible) {
      return /*#__PURE__*/(0, _reactDom.createPortal)( /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)(prefix, 'animate__animated animate__slideInRight', {
          animate__slideOutRight: remove
        })
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: prefix + '-header',
        onClick: handleClose
      }, /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "Return",
        size: 18
      }), /*#__PURE__*/_react.default.createElement("span", {
        className: prefix + '-header-text'
      }, props.text || field.title)), /*#__PURE__*/_react.default.createElement("div", {
        className: prefix + '-body'
      }, /*#__PURE__*/_react.default.createElement(_formxAntd.FormLayout, {
        colon: false,
        labelWidth: 120,
        labelAlign: "left",
        wrapperAlign: "right",
        feedbackLayout: "none",
        tooltipLayout: "text"
      }, props.children))), root);
    }
    return null;
  };
  const handleOpen = () => {
    setVisible(true);
  };
  const handleClose = () => {
    setRemove(true);
    setTimeout(() => {
      setVisible(false);
      setRemove(false);
    }, 150);
  };
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Button, _extends({
    block: true,
    onClick: handleOpen
  }, props.triggerProps), props.text || field.title), renderDrawer());
});