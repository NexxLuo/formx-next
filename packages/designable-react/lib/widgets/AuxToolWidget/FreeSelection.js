"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FreeSelection = void 0;
var _react = _interopRequireDefault(require("react"));
var _hooks = require("../../hooks");
var _reactiveReact = require("@formily/reactive-react");
var _core = require("@designable/core");
var _shared = require("@designable/shared");
var _classnames = _interopRequireDefault(require("classnames"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const FreeSelection = exports.FreeSelection = (0, _reactiveReact.observer)(() => {
  const cursor = (0, _hooks.useCursor)();
  const viewport = (0, _hooks.useViewport)();
  const prefix = (0, _hooks.usePrefix)('aux-free-selection');
  const createSelectionStyle = () => {
    const startDragPoint = viewport.getOffsetPoint({
      x: cursor.dragStartPosition.topClientX,
      y: cursor.dragStartPosition.topClientY
    });
    const currentPoint = viewport.getOffsetPoint({
      x: cursor.position.topClientX,
      y: cursor.position.topClientY
    });
    const rect = (0, _shared.calcRectByStartEndPoint)(startDragPoint, currentPoint, viewport.scrollX - cursor.dragStartScrollOffset.scrollX, viewport.scrollY - cursor.dragStartScrollOffset.scrollY);
    const baseStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      opacity: 0.2,
      borderWidth: 1,
      borderStyle: 'solid',
      transform: `perspective(1px) translate3d(${rect.x}px,${rect.y}px,0)`,
      height: rect.height,
      width: rect.width,
      pointerEvents: 'none',
      boxSizing: 'border-box',
      zIndex: 1
    };
    return baseStyle;
  };
  if (cursor.status !== _core.CursorStatus.Dragging || cursor.type !== _core.CursorType.Selection) return null;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(prefix),
    style: createSelectionStyle()
  });
});