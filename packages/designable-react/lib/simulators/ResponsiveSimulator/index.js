"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResponsiveSimulator = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactiveReact = require("@formily/reactive-react");
var _core = require("@designable/core");
var _shared = require("@designable/shared");
var _hooks = require("../../hooks");
var _widgets = require("../../widgets");
var _handle = require("./handle");
var _classnames = _interopRequireDefault(require("classnames"));
require("./styles.less");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const useResizeEffect = (container, content, engine) => {
  let status = null;
  let startX = 0;
  let startY = 0;
  let startWidth = 0;
  let startHeight = 0;
  let animationX = null;
  let animationY = null;
  const getStyle = status => {
    if (status === _handle.ResizeHandleType.Resize) return 'nwse-resize';
    if (status === _handle.ResizeHandleType.ResizeHeight) return 'ns-resize';
    if (status === _handle.ResizeHandleType.ResizeWidth) return 'ew-resize';
  };
  const updateSize = (deltaX, deltaY) => {
    const containerRect = container.current?.getBoundingClientRect();
    if (status === _handle.ResizeHandleType.Resize) {
      engine.screen.setSize(startWidth + deltaX, startHeight + deltaY);
      container.current.scrollBy(containerRect.width + deltaX, containerRect.height + deltaY);
    } else if (status === _handle.ResizeHandleType.ResizeHeight) {
      engine.screen.setSize(startWidth, startHeight + deltaY);
      container.current.scrollBy(container.current.scrollLeft, containerRect.height + deltaY);
    } else if (status === _handle.ResizeHandleType.ResizeWidth) {
      engine.screen.setSize(startWidth + deltaX, startHeight);
      container.current.scrollBy(containerRect.width + deltaX, container.current.scrollTop);
    }
  };
  engine.subscribeTo(_core.DragStartEvent, e => {
    if (!engine.workbench.currentWorkspace?.viewport) return;
    const target = e.data.target;
    if (target?.closest('*[data-designer-resize-handle]')) {
      const rect = content.current?.getBoundingClientRect();
      if (!rect) return;
      status = target.getAttribute('data-designer-resize-handle');
      engine.cursor.setStyle(getStyle(status));
      startX = e.data.topClientX;
      startY = e.data.topClientY;
      startWidth = rect.width;
      startHeight = rect.height;
      engine.screen.setStatus(_core.ScreenStatus.Resizing);
    }
  });
  engine.subscribeTo(_core.DragMoveEvent, e => {
    if (!engine.workbench.currentWorkspace?.viewport) return;
    if (!status) return;
    const deltaX = e.data.topClientX - startX;
    const deltaY = e.data.topClientY - startY;
    const containerRect = container.current?.getBoundingClientRect();
    const distanceX = Math.floor(containerRect.right - e.data.topClientX);
    const distanceY = Math.floor(containerRect.bottom - e.data.topClientY);
    const factorX = (0, _shared.calcSpeedFactor)(distanceX, 10);
    const factorY = (0, _shared.calcSpeedFactor)(distanceY, 10);
    updateSize(deltaX, deltaY);
    if (distanceX <= 10) {
      if (!animationX) {
        animationX = (0, _shared.createUniformSpeedAnimation)(1000 * factorX, delta => {
          updateSize(deltaX + delta, deltaY);
        });
      }
    } else {
      if (animationX) {
        animationX = animationX();
      }
    }
    if (distanceY <= 10) {
      if (!animationY) {
        animationY = (0, _shared.createUniformSpeedAnimation)(300 * factorY, delta => {
          updateSize(deltaX, deltaY + delta);
        });
      }
    } else {
      if (animationY) {
        animationY = animationY();
      }
    }
  });
  engine.subscribeTo(_core.DragStopEvent, () => {
    if (!status) return;
    status = null;
    engine.cursor.setStyle('');
    engine.screen.setStatus(_core.ScreenStatus.Normal);
    if (animationX) {
      animationX = animationX();
    }
    if (animationY) {
      animationY = animationY();
    }
  });
};
const ResponsiveSimulator = exports.ResponsiveSimulator = (0, _reactiveReact.observer)(props => {
  const container = (0, _react.useRef)();
  const content = (0, _react.useRef)();
  const prefix = (0, _hooks.usePrefix)('responsive-simulator');
  const screen = (0, _hooks.useScreen)();
  (0, _hooks.useDesigner)(engine => {
    useResizeEffect(container, content, engine);
  });
  return /*#__PURE__*/_react.default.createElement("div", _extends({}, props, {
    className: (0, _classnames.default)(prefix, props.className),
    style: {
      height: '100%',
      width: '100%',
      minHeight: 100,
      position: 'relative',
      ...props.style
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    ref: container,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      overflow: 'overlay'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    ref: content,
    style: {
      width: screen.width,
      height: screen.height,
      paddingRight: 15,
      paddingBottom: 15,
      position: 'relative',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }
  }, props.children, /*#__PURE__*/_react.default.createElement(_handle.ResizeHandle, {
    type: _handle.ResizeHandleType.Resize
  }, /*#__PURE__*/_react.default.createElement(_widgets.IconWidget, {
    infer: "DragMove",
    style: {
      pointerEvents: 'none'
    }
  })), /*#__PURE__*/_react.default.createElement(_handle.ResizeHandle, {
    type: _handle.ResizeHandleType.ResizeHeight
  }, /*#__PURE__*/_react.default.createElement(_widgets.IconWidget, {
    infer: "Menu",
    style: {
      pointerEvents: 'none'
    }
  })), /*#__PURE__*/_react.default.createElement(_handle.ResizeHandle, {
    type: _handle.ResizeHandleType.ResizeWidth
  }, /*#__PURE__*/_react.default.createElement(_widgets.IconWidget, {
    infer: "Menu",
    style: {
      pointerEvents: 'none'
    }
  })))));
});