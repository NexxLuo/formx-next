"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollapseItem = void 0;
var _react = _interopRequireWildcard(require("react"));
var _react2 = require("@formily/react");
var _designableReact = require("@platform/designable-react");
var _classnames = _interopRequireDefault(require("classnames"));
require("./styles.less");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const CollapseItem = exports.CollapseItem = (0, _react2.observer)(props => {
  const prefix = (0, _designableReact.usePrefix)('collapse-item');
  const field = (0, _react2.useField)();
  const [expand, setExpand] = (0, _react.useState)(props.defaultExpand ?? true);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: (0, _classnames.default)(prefix, props.className, {
      expand
    }),
    style: props.style,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: prefix + '-header',
      onClick: e => {
        e.stopPropagation();
        e.preventDefault();
        setExpand(!expand);
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: prefix + '-header-expand',
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_designableReact.IconWidget, {
          infer: "Expand",
          size: 10
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: prefix + '-header-content',
        children: field.title
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: prefix + '-content',
      children: props.children
    })]
  });
});