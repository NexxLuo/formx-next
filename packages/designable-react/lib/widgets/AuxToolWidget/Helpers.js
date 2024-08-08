"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Helpers = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactive = require("@formily/reactive");
var _classnames = _interopRequireDefault(require("classnames"));
var _hooks = require("../../hooks");
var _Selector = require("./Selector");
var _Copy = require("./Copy");
var _Delete = require("./Delete");
var _DragHandler = require("./DragHandler");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const HELPER_DEBOUNCE_TIMEOUT = 100;
const Helpers = ({
  node,
  nodeRect
}) => {
  const prefix = (0, _hooks.usePrefix)('aux-helpers');
  const designer = (0, _hooks.useDesigner)();
  const viewport = (0, _hooks.useViewport)();
  const unmountRef = (0, _react.useRef)(false);
  const ref = (0, _react.useRef)();
  const [position, setPosition] = (0, _react.useState)('top-right');
  (0, _react.useLayoutEffect)(() => {
    let request = null;
    const getYInViewport = (nodeRect, helpersRect) => {
      if (nodeRect.top - viewport.scrollY > helpersRect.height) {
        return 'top';
      } else if (viewport.isScrollTop && nodeRect.height + helpersRect.height > viewport.height) {
        return 'inner-top';
      } else if (viewport.isScrollBottom && nodeRect.height + helpersRect.height > viewport.height) {
        return 'inner-bottom';
      }
      return 'bottom';
    };
    const getXInViewport = (nodeRect, helpersRect) => {
      const widthDelta = helpersRect.width - nodeRect.width;
      if (widthDelta >= 0) {
        if (nodeRect.x < widthDelta) {
          return 'left';
        } else if (nodeRect.right + widthDelta > viewport.width) {
          return 'right';
        } else {
          return 'center';
        }
      }
      return 'right';
    };
    const update = () => {
      const helpersRect = ref.current?.getBoundingClientRect();
      if (!helpersRect || !nodeRect) return;
      if (unmountRef.current) return;
      setPosition(getYInViewport(nodeRect, helpersRect) + '-' + getXInViewport(nodeRect, helpersRect));
    };
    update();
    return (0, _reactive.reaction)(() => [viewport.width, viewport.height, viewport.scrollX, viewport.scrollY, viewport.isScrollBottom, viewport.isScrollTop], () => {
      clearTimeout(request);
      request = setTimeout(update, HELPER_DEBOUNCE_TIMEOUT);
    });
  }, [viewport, nodeRect]);
  if (!nodeRect || !node) return null;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(prefix, {
      [position]: true
    }),
    ref: ref
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(prefix + '-content')
  }, /*#__PURE__*/_react.default.createElement(_Selector.Selector, {
    node: node
  }), node?.allowClone() === false ? null : /*#__PURE__*/_react.default.createElement(_Copy.Copy, {
    node: node
  }), node?.allowDrag() === false ? null : /*#__PURE__*/_react.default.createElement(_DragHandler.DragHandler, {
    node: node
  }), node?.allowDelete() === false ? null : /*#__PURE__*/_react.default.createElement(_Delete.Delete, {
    node: node
  })));
};
exports.Helpers = Helpers;
Helpers.displayName = 'Helpers';