"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Designer = void 0;
var _react = _interopRequireWildcard(require("react"));
var _core = require("@designable/core");
var _context = require("../context");
var _widgets = require("../widgets");
var _hooks = require("../hooks");
var _Layout = require("./Layout");
var icons = _interopRequireWildcard(require("../icons"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
_core.GlobalRegistry.registerDesignerIcons(icons);
const Designer = props => {
  const engine = (0, _hooks.useDesigner)();
  const ref = (0, _react.useRef)();
  (0, _react.useEffect)(() => {
    if (props.engine) {
      if (props.engine && ref.current) {
        if (props.engine !== ref.current) {
          ref.current.unmount();
        }
      }
      props.engine.mount();
      ref.current = props.engine;
    }
    return () => {
      if (props.engine) {
        props.engine.unmount();
      }
    };
  }, [props.engine]);
  if (engine) throw new Error('There can only be one Designable Engine Context in the React Tree');
  return /*#__PURE__*/_react.default.createElement(_Layout.Layout, props, /*#__PURE__*/_react.default.createElement(_context.DesignerEngineContext.Provider, {
    value: props.engine
  }, props.children, /*#__PURE__*/_react.default.createElement(_widgets.GhostWidget, null)));
};
exports.Designer = Designer;
Designer.defaultProps = {
  prefixCls: 'dn-',
  theme: 'light'
};