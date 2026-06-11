"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OutlineTreeWidget = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _hooks = require("../../hooks");
var _observer = require("../../observer");
var _OutlineNode = require("./OutlineNode");
var _Insertion = require("./Insertion");
var _context = require("./context");
var _shared = require("@designable/shared");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// @ts-nocheck

const OutlineTreeWidget = exports.OutlineTreeWidget = (0, _observer.observer)(({
  onClose,
  style,
  renderActions,
  renderTitle,
  className,
  ...props
}) => {
  const ref = (0, _react.useRef)(null);
  const prefix = (0, _hooks.usePrefix)('outline-tree');
  const workbench = (0, _hooks.useWorkbench)();
  const current = workbench?.activeWorkspace || workbench?.currentWorkspace;
  const workspaceId = current?.id;
  const tree = (0, _hooks.useTree)(workspaceId);
  const outline = (0, _hooks.useOutline)(workspaceId);
  const outlineRef = (0, _react.useRef)(null);
  (0, _react.useLayoutEffect)(() => {
    if (!workspaceId) return;
    if (outlineRef.current && outlineRef.current !== outline) {
      outlineRef.current.onUnmount();
    }
    if (ref.current && outline) {
      outline.onMount(ref.current, _shared.globalThisPolyfill);
    }
    outlineRef.current = outline;
    return () => {
      outline.onUnmount();
    };
  }, [workspaceId, outline]);
  if (!outline || !workspaceId) return null;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_context.NodeContext.Provider, {
    value: {
      renderActions,
      renderTitle
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      ...props,
      className: (0, _classnames.default)(prefix + '-container', className),
      style: style,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: prefix + '-content',
        ref: ref,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_OutlineNode.OutlineTreeNode, {
          node: tree,
          workspaceId: workspaceId
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: prefix + '-aux',
          style: {
            pointerEvents: 'none'
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Insertion.Insertion, {
            workspaceId: workspaceId
          })
        })]
      })
    })
  });
});