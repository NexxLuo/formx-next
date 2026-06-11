"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorInput = void 0;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _designableReact = require("@platform/designable-react");
var _reactColor = require("react-color");
require("./styles.less");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ColorInput = props => {
  const container = (0, _react.useRef)(null);
  const prefix = (0, _designableReact.usePrefix)('color-input');
  const color = props.value;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ref: container,
    className: prefix,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Input, {
      value: props.value,
      onChange: e => {
        props.onChange?.(e.target.value);
      },
      placeholder: "Color",
      prefix: /*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Popover, {
        trigger: "click",
        getPopupContainer: () => container.current,
        content: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactColor.SketchPicker, {
          color: color,
          onChange: ({
            rgb
          }) => {
            props.onChange?.(`rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`);
          }
        }),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: prefix + '-color-tips',
          style: {
            backgroundColor: color
          }
        })
      })
    })
  });
};
exports.ColorInput = ColorInput;