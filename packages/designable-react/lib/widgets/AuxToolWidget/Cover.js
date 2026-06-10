"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cover = void 0;
var _react = _interopRequireWildcard(require("react"));
var _hooks = require("../../hooks");
var _reactiveReact = require("@formily/reactive-react");
var _core = require("@designable/core");
var _classnames = _interopRequireDefault(require("classnames"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const CoverRect = props => {
  const prefix = (0, _hooks.usePrefix)('aux-cover-rect');
  const rect = (0, _hooks.useValidNodeOffsetRect)(props.node);
  const createCoverStyle = () => {
    const baseStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      pointerEvents: 'none'
    };
    if (rect) {
      baseStyle.transform = `perspective(1px) translate3d(${rect.x}px,${rect.y}px,0)`;
      baseStyle.height = rect.height;
      baseStyle.width = rect.width;
    }
    return baseStyle;
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(prefix, {
      dragging: props.dragging,
      dropping: props.dropping
    }),
    style: createCoverStyle()
  });
};
const Cover = exports.Cover = (0, _reactiveReact.observer)(() => {
  const viewportDragon = (0, _hooks.useDragon)();
  const viewport = (0, _hooks.useViewport)();
  const cursor = (0, _hooks.useCursor)();
  const renderDropCover = () => {
    if (!viewportDragon.closestNode || !viewportDragon.closestNode?.allowAppend(viewportDragon.dragNodes) || viewportDragon.closestDirection !== _core.ClosestPosition.Inner) return null;
    return /*#__PURE__*/_react.default.createElement(CoverRect, {
      node: viewportDragon.closestNode,
      dropping: true
    });
  };
  if (cursor.status !== _core.CursorStatus.Dragging) return null;
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, viewportDragon.dragNodes.map(node => {
    if (!node) return;
    if (!viewport.findElementById(node.id)) return;
    return /*#__PURE__*/_react.default.createElement(CoverRect, {
      key: node.id,
      node: node,
      dragging: true
    });
  }), renderDropCover());
});
Cover.displayName = 'Cover';