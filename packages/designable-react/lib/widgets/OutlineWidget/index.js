"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OutlineTreeWidget = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _hooks = require("../../hooks");
var _reactiveReact = require("@formily/reactive-react");
var _OutlineNode = require("./OutlineNode");
var _Insertion = require("./Insertion");
var _context = require("./context");
var _shared = require("@designable/shared");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const OutlineTreeWidget = exports.OutlineTreeWidget = (0, _reactiveReact.observer)(({
  onClose,
  style,
  renderActions,
  renderTitle,
  className,
  ...props
}) => {
  const ref = (0, _react.useRef)();
  const prefix = (0, _hooks.usePrefix)('outline-tree');
  const workbench = (0, _hooks.useWorkbench)();
  const current = workbench?.activeWorkspace || workbench?.currentWorkspace;
  const workspaceId = current?.id;
  const tree = (0, _hooks.useTree)(workspaceId);
  const outline = (0, _hooks.useOutline)(workspaceId);
  const outlineRef = (0, _react.useRef)();
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
  return /*#__PURE__*/_react.default.createElement(_context.NodeContext.Provider, {
    value: {
      renderActions,
      renderTitle
    }
  }, /*#__PURE__*/_react.default.createElement("div", _extends({}, props, {
    className: (0, _classnames.default)(prefix + '-container', className),
    style: style
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-content',
    ref: ref
  }, /*#__PURE__*/_react.default.createElement(_OutlineNode.OutlineTreeNode, {
    node: tree,
    workspaceId: workspaceId
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-aux',
    style: {
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/_react.default.createElement(_Insertion.Insertion, {
    workspaceId: workspaceId
  })))));
});