"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OutlineTreeNode = void 0;
var _react = _interopRequireWildcard(require("react"));
var _core = require("@designable/core");
var _shared = require("@designable/shared");
var _reactive = require("@formily/reactive");
var _reactiveReact = require("@formily/reactive-react");
var _hooks = require("../../hooks");
var _IconWidget = require("../IconWidget");
var _NodeTitleWidget = require("../NodeTitleWidget");
var _context = require("./context");
var _classnames = _interopRequireDefault(require("classnames"));
require("./styles.less");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const OutlineTreeNode = exports.OutlineTreeNode = (0, _reactiveReact.observer)(({
  node,
  className,
  style,
  workspaceId
}) => {
  const prefix = (0, _hooks.usePrefix)('outline-tree-node');
  const engine = (0, _hooks.useDesigner)();
  const ref = (0, _react.useRef)();
  const ctx = (0, _react.useContext)(_context.NodeContext);
  const request = (0, _react.useRef)(null);
  const cursor = (0, _hooks.useCursor)();
  const selection = (0, _hooks.useSelection)(workspaceId);
  const outlineDragon = (0, _hooks.useOutlineDragon)(workspaceId);
  (0, _react.useEffect)(() => {
    return engine.subscribeTo(_core.DragMoveEvent, () => {
      const closestNodeId = outlineDragon?.closestNode?.id;
      const closestDirection = outlineDragon?.closestDirection;
      const id = node.id;
      if (!ref.current) return;
      if (closestNodeId === id && closestDirection === _core.ClosestPosition.Inner) {
        if (!ref.current.classList.contains('droppable')) {
          ref.current.classList.add('droppable');
        }
        if (!ref.current.classList.contains('expanded')) {
          if (request.current) {
            clearTimeout(request.current);
            request.current = null;
          }
          request.current = setTimeout(() => {
            ref.current.classList.add('expanded');
          }, 600);
        }
      } else {
        if (request.current) {
          clearTimeout(request.current);
          request.current = null;
        }
        if (ref.current.classList.contains('droppable')) {
          ref.current.classList.remove('droppable');
        }
      }
    });
  }, [node, outlineDragon, cursor]);
  (0, _react.useEffect)(() => {
    return (0, _reactive.autorun)(() => {
      const selectedIds = selection?.selected || [];
      const id = node.id;
      if (!ref.current) return;
      if (selectedIds.includes(id)) {
        if (!ref.current.classList.contains('selected')) {
          ref.current.classList.add('selected');
        }
      } else {
        if (ref.current.classList.contains('selected')) {
          ref.current.classList.remove('selected');
        }
      }
      if (cursor.status === _core.CursorStatus.Dragging && outlineDragon?.dragNodes?.length) {
        if (ref.current.classList.contains('selected')) {
          ref.current.classList.remove('selected');
        }
      }
    });
  }, [node, selection, outlineDragon]);
  if (!node) return null;
  const renderIcon = node => {
    const icon = node.designerProps.icon;
    if (icon) {
      return /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
        infer: icon,
        size: 12
      });
    }
    if (node === node?.root) {
      return /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
        infer: "Page",
        size: 12
      });
    } else if (node.designerProps?.droppable) {
      return /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
        infer: "Container",
        size: 12
      });
    }
    return /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
      infer: "Component",
      size: 12
    });
  };
  const renderTitle = node => {
    if ((0, _shared.isFn)(ctx.renderTitle)) return ctx.renderTitle(node);
    return /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_NodeTitleWidget.NodeTitleWidget, {
      node: node
    }));
  };
  const renderActions = node => {
    if ((0, _shared.isFn)(ctx.renderActions)) return ctx.renderActions(node);
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    style: style,
    ref: ref,
    className: (0, _classnames.default)(prefix, className, 'expanded'),
    "data-designer-outline-node-id": node.id
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-header'
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-header-head',
    style: {
      left: -node.depth * 16,
      width: node.depth * 16
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-header-content'
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-header-base'
  }, (node?.children?.length > 0 || node === node.root) && /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-expand',
    onClick: e => {
      e.preventDefault();
      e.stopPropagation();
      if (ref.current?.classList?.contains('expanded')) {
        ref.current?.classList.remove('expanded');
      } else {
        ref.current?.classList.add('expanded');
      }
    }
  }, /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
    infer: "Expand",
    size: 10
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-icon'
  }, renderIcon(node)), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-title'
  }, renderTitle(node))), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-header-actions',
    "data-click-stop-propagation": true
  }, renderActions(node), node !== node.root && /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
    className: (0, _classnames.default)(prefix + '-hidden-icon', {
      hidden: node.hidden
    }),
    infer: node.hidden ? 'EyeClose' : 'Eye',
    size: 14,
    onClick: () => {
      node.hidden = !node.hidden;
    }
  })))), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-children'
  }, node.children?.map(child => {
    return /*#__PURE__*/_react.default.createElement(OutlineTreeNode, {
      node: child,
      key: child.id,
      workspaceId: workspaceId
    });
  })));
});