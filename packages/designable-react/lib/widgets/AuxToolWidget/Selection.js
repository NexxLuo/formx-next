"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectionBox = exports.Selection = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Helpers = require("./Helpers");
var _ResizeHandler = require("./ResizeHandler");
var _hooks = require("../../hooks");
var _observer = require("../../observer");
var _TranslateHandler = require("./TranslateHandler");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const SelectionBox = props => {
  const designer = (0, _hooks.useDesigner)();
  const prefix = (0, _hooks.usePrefix)('aux-selection-box');
  const innerPrefix = (0, _hooks.usePrefix)('aux-selection-box-inner');
  const nodeRect = (0, _hooks.useValidNodeOffsetRect)(props.node);
  const createSelectionStyle = () => {
    const baseStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      boxSizing: 'border-box'
    };
    if (nodeRect) {
      baseStyle.transform = `perspective(1px) translate3d(${nodeRect.x}px,${nodeRect.y}px,0)`;
      baseStyle.height = nodeRect.height;
      baseStyle.width = nodeRect.width;
    }
    return baseStyle;
  };
  if (!nodeRect) return null;
  if (!nodeRect.width || !nodeRect.height) return null;
  const selectionId = {
    [designer.props?.nodeSelectionIdAttrName]: props.node.id
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    ...selectionId,
    className: prefix,
    style: createSelectionStyle(),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: innerPrefix
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ResizeHandler.ResizeHandler, {
      node: props.node
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TranslateHandler.TranslateHandler, {
      node: props.node
    }), props.showHelpers && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Helpers.Helpers, {
      ...props,
      node: props.node,
      nodeRect: nodeRect
    })]
  });
};
exports.SelectionBox = SelectionBox;
const Selection = exports.Selection = (0, _observer.observer)(({
  extraHelperTools
}) => {
  const selection = (0, _hooks.useSelection)();
  const tree = (0, _hooks.useTree)();
  const cursor = (0, _hooks.useCursor)();
  const viewportDragon = (0, _hooks.useDragon)();
  if (cursor.status !== 'NORMAL' && viewportDragon.touchNode) return null;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.Fragment, {
    children: selection.selected.map(id => {
      const node = tree.findById(id);
      if (!node) return;
      if (node.hidden) return;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(SelectionBox, {
        node: node,
        extraHelperTools: extraHelperTools,
        showHelpers: selection.selected.length === 1
      }, id);
    })
  });
});
Selection.displayName = 'Selection';