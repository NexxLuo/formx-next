"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Viewport = void 0;
var _react = _interopRequireWildcard(require("react"));
var _hooks = require("../hooks");
var _widgets = require("../widgets");
var _shared = require("@designable/shared");
var _classnames = _interopRequireDefault(require("classnames"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Viewport = ({
  placeholder,
  dragTipsDirection,
  extraHelperTools,
  ...props
}) => {
  const [loaded, setLoaded] = (0, _react.useState)(false);
  const prefix = (0, _hooks.usePrefix)('viewport');
  const viewport = (0, _hooks.useViewport)();
  const ref = (0, _react.useRef)(null);
  const viewportRef = (0, _react.useRef)(null);
  const isFrameRef = (0, _react.useRef)(false);
  (0, _react.useLayoutEffect)(() => {
    const frameElement = ref.current.querySelector('iframe');
    if (!viewport) return;
    if (viewportRef.current && viewportRef.current !== viewport) {
      viewportRef.current.onUnmount();
    }
    if (frameElement) {
      frameElement.addEventListener('load', () => {
        viewport.onMount(frameElement, frameElement.contentWindow);
        (0, _shared.requestIdle)(() => {
          isFrameRef.current = true;
          setLoaded(true);
        });
      });
    } else {
      viewport.onMount(ref.current, _shared.globalThisPolyfill);
      (0, _shared.requestIdle)(() => {
        isFrameRef.current = false;
        setLoaded(true);
      });
    }
    viewportRef.current = viewport;
    return () => {
      viewport.onUnmount();
    };
  }, [viewport]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    ...props,
    ref: ref,
    className: (0, _classnames.default)(prefix, props.className),
    style: {
      opacity: !loaded ? 0 : 1,
      overflow: isFrameRef.current ? 'hidden' : 'overlay',
      ...props.style
    },
    children: [props.children, /*#__PURE__*/(0, _jsxRuntime.jsx)(_widgets.AuxToolWidget, {
      extraHelperTools: extraHelperTools
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_widgets.EmptyWidget, {
      dragTipsDirection: dragTipsDirection,
      children: placeholder
    })]
  });
};
exports.Viewport = Viewport;