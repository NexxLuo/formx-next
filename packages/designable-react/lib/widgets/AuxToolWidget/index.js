"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuxToolWidget = void 0;
var _react = _interopRequireWildcard(require("react"));
var _hooks = require("../../hooks");
var _Insertion = require("./Insertion");
var _Selection = require("./Selection");
var _FreeSelection = require("./FreeSelection");
var _Cover = require("./Cover");
var _DashedBox = require("./DashedBox");
require("./styles.less");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const AuxToolWidget = () => {
  const engine = (0, _hooks.useDesigner)();
  const viewport = (0, _hooks.useViewport)();
  const prefix = (0, _hooks.usePrefix)('auxtool');
  const ref = (0, _react.useRef)();
  (0, _react.useEffect)(() => {
    return engine.subscribeWith('viewport:scroll', () => {
      if (viewport.isIframe && ref.current) {
        ref.current.style.transform = `perspective(1px) translate3d(${-viewport.scrollX}px,${-viewport.scrollY}px,0)`;
      }
    });
  }, [engine, viewport]);
  if (!viewport) return null;
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: ref,
    className: prefix
  }, /*#__PURE__*/_react.default.createElement(_Insertion.Insertion, null), /*#__PURE__*/_react.default.createElement(_DashedBox.DashedBox, null), /*#__PURE__*/_react.default.createElement(_Selection.Selection, null), /*#__PURE__*/_react.default.createElement(_Cover.Cover, null), /*#__PURE__*/_react.default.createElement(_FreeSelection.FreeSelection, null));
};
exports.AuxToolWidget = AuxToolWidget;
AuxToolWidget.displayName = 'AuxToolWidget';