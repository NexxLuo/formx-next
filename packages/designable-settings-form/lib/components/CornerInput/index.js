"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CornerInput = void 0;
var _react = _interopRequireWildcard(require("react"));
var _designableReact = require("@platform/designable-react");
var _classnames = _interopRequireDefault(require("classnames"));
require("./styles.less");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const CornerInput = props => {
  const prefix = (0, _designableReact.usePrefix)('corner-input');
  const [current, setCurrent] = (0, _react.useState)(props.value);
  (0, _react.useEffect)(() => {
    if (!props.value) {
      setCurrent('all');
    }
  }, [props.value]);
  const createCellProps = type => ({
    className: (0, _classnames.default)(prefix + '-cell', {
      active: current === type
    }),
    onClick() {
      setCurrent(type);
      props.onChange?.(type);
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: (0, _classnames.default)(prefix, props.className),
    style: props.style,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: prefix + '-column',
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        ...createCellProps('topLeft'),
        children: "\u250F"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        ...createCellProps('bottomLeft'),
        children: "\u2517"
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: prefix + '-column',
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        ...createCellProps('all'),
        children: "\u254B"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: prefix + '-column',
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        ...createCellProps('topRight'),
        children: "\u2513"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        ...createCellProps('bottomRight'),
        children: "\u251B"
      })]
    })]
  });
};
exports.CornerInput = CornerInput;