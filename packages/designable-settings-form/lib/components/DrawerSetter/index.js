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
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// @ts-nocheck

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
      return /*#__PURE__*/(0, _reactDom.createPortal)( /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: (0, _classnames.default)(prefix, 'animate__animated animate__slideInRight', {
          animate__slideOutRight: remove
        }),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: prefix + '-header',
          onClick: handleClose,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designableReact.IconWidget, {
            infer: "Return",
            size: 18
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: prefix + '-header-text',
            children: props.text || field.title
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: prefix + '-body',
          children: [_formxAntd.FormLayout, /*#__PURE__*/(0, _jsxRuntime.jsx)(_formxAntd.FormLayout, {
            colon: false,
            labelWidth: 120,
            labelAlign: "left",
            wrapperAlign: "right",
            feedbackLayout: "none",
            tooltipLayout: "text",
            children: props.children
          })]
        })]
      }), root);
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Button, {
      block: true,
      onClick: handleOpen,
      ...props.triggerProps,
      children: props.text || field.title
    }), renderDrawer()]
  });
});