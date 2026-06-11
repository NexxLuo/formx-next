"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyWidget = void 0;
var _react = _interopRequireDefault(require("react"));
var _hooks = require("../../hooks");
var _observer = require("../../observer");
var _IconWidget = require("../IconWidget");
require("./styles.less");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-nocheck

const EmptyWidget = exports.EmptyWidget = (0, _observer.observer)(props => {
  const tree = (0, _hooks.useTree)();
  const prefix = (0, _hooks.usePrefix)('empty');
  const renderEmpty = () => {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        display: 'flex',
        flexDirection: 'column'
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "animations",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_IconWidget.IconWidget, {
          infer: props.dragTipsDirection === 'left' ? 'DragLeftSourceAnimation' : 'DragRightSourceAnimation',
          size: 240
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconWidget.IconWidget, {
          infer: "BatchDragAnimation",
          size: 240
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "hotkeys-list",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: ["Selection ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconWidget.IconWidget, {
            infer: "Command"
          }), " + Click /", ' ', /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconWidget.IconWidget, {
            infer: "Shift"
          }), " + Click /", ' ', /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconWidget.IconWidget, {
            infer: "Command"
          }), " + A"]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: ["Copy ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconWidget.IconWidget, {
            infer: "Command"
          }), " + C / Paste", ' ', /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconWidget.IconWidget, {
            infer: "Command"
          }), " + V"]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: ["Delete ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconWidget.IconWidget, {
            infer: "Delete"
          })]
        })]
      })]
    });
  };
  if (!tree?.children?.length) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: prefix,
      children: props.children ? props.children : renderEmpty()
    });
  }
  return null;
})(EmptyWidget).defaultProps = {
  dragTipsDirection: 'left'
};