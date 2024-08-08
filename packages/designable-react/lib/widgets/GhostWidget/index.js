"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GhostWidget = void 0;
var _react = _interopRequireWildcard(require("react"));
var _hooks = require("../../hooks");
var _core = require("@designable/core");
var _reactive = require("@formily/reactive");
var _reactiveReact = require("@formily/reactive-react");
var _NodeTitleWidget = require("../NodeTitleWidget");
require("./styles.less");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const GhostWidget = exports.GhostWidget = (0, _reactiveReact.observer)(() => {
  const designer = (0, _hooks.useDesigner)();
  const cursor = (0, _hooks.useCursor)();
  const ref = (0, _react.useRef)();
  const prefix = (0, _hooks.usePrefix)('ghost');
  const draggingNodes = designer.findDraggingNodes();
  const firstNode = draggingNodes[0];
  (0, _react.useEffect)(() => (0, _reactive.autorun)(() => {
    const transform = `perspective(1px) translate3d(${cursor.position?.topClientX - 18}px,${cursor.position?.topClientY - 12}px,0) scale(0.8)`;
    if (!ref.current) return;
    ref.current.style.transform = transform;
  }), [designer, cursor]);
  const renderNodes = () => {
    return /*#__PURE__*/_react.default.createElement("span", {
      style: {
        whiteSpace: 'nowrap'
      }
    }, /*#__PURE__*/_react.default.createElement(_NodeTitleWidget.NodeTitleWidget, {
      node: firstNode
    }), draggingNodes.length > 1 ? '...' : '');
  };
  if (!firstNode) return null;
  return cursor.status === _core.CursorStatus.Dragging ? /*#__PURE__*/_react.default.createElement("div", {
    ref: ref,
    className: prefix
  }, renderNodes()) : null;
});
GhostWidget.displayName = 'GhostWidget';