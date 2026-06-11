"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = void 0;
var _react = _interopRequireWildcard(require("react"));
var _shared = require("@designable/shared");
var _context = require("../context");
var _classnames = _interopRequireDefault(require("classnames"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Layout = props => {
  const layout = (0, _react.useContext)(_context.DesignerLayoutContext);
  const ref = (0, _react.useRef)(null);
  (0, _react.useLayoutEffect)(() => {
    if (ref.current) {
      (0, _shared.each)(props.variables, (value, key) => {
        ref.current.style.setProperty(`--${key}`, value);
      });
    }
  }, []);
  if (layout) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.Fragment, {
      children: props.children
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ref: ref,
    className: (0, _classnames.default)({
      [`${props.prefixCls}app`]: true,
      [`${props.prefixCls}${props.theme}`]: props.theme
    }),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_context.DesignerLayoutContext.Provider, {
      value: {
        theme: props.theme,
        prefixCls: props.prefixCls,
        position: props.position
      },
      children: props.children
    })
  });
};
exports.Layout = Layout;
Layout.defaultProps = {
  theme: 'light',
  prefixCls: 'dn-',
  position: 'fixed'
};