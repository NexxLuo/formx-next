"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DashedBox = void 0;
var _react = _interopRequireDefault(require("react"));
var _hooks = require("../../hooks");
var _observer = require("../../observer");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const DashedBox = exports.DashedBox = (0, _observer.observer)(() => {
  const hover = (0, _hooks.useHover)();
  const prefix = (0, _hooks.usePrefix)('aux-dashed-box');
  const selection = (0, _hooks.useSelection)();
  const rect = (0, _hooks.useValidNodeOffsetRect)(hover?.node);
  const createTipsStyle = () => {
    const baseStyle = {
      top: 0,
      left: 0,
      pointerEvents: 'none',
      boxSizing: 'border-box',
      visibility: 'hidden',
      zIndex: 2
    };
    if (rect) {
      baseStyle.transform = `perspective(1px) translate3d(${rect.x}px,${rect.y}px,0)`;
      baseStyle.height = rect.height;
      baseStyle.width = rect.width;
      baseStyle.visibility = 'visible';
    }
    return baseStyle;
  };
  if (!hover.node) return null;
  if (hover.node.hidden) return null;
  if (selection.selected.includes(hover.node.id)) return null;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: prefix,
    style: createTipsStyle(),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: prefix + '-title',
      style: {
        position: 'absolute',
        bottom: '100%',
        left: 0,
        fontSize: 12,
        userSelect: 'none',
        fontWeight: 'lighter',
        whiteSpace: 'nowrap'
      },
      children: hover?.node.getMessage('title')
    })
  });
});
DashedBox.displayName = 'DashedBox';