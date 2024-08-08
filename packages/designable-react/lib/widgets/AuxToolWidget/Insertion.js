"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Insertion = void 0;
var _react = _interopRequireDefault(require("react"));
var _hooks = require("../../hooks");
var _core = require("@designable/core");
var _reactiveReact = require("@formily/reactive-react");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Insertion = exports.Insertion = (0, _reactiveReact.observer)(() => {
  const viewportDragon = (0, _hooks.useDragon)();
  const prefix = (0, _hooks.usePrefix)('aux-insertion');
  const createInsertionStyle = () => {
    const closestDirection = viewportDragon.closestDirection;
    const closestRect = viewportDragon.closestOffsetRect;
    const isInlineLayout = viewportDragon.getClosestLayout() === 'horizontal';
    const baseStyle = {
      position: 'absolute',
      transform: 'perspective(1px) translate3d(0,0,0)',
      top: 0,
      left: 0
    };
    if (!closestRect) return baseStyle;
    if (closestDirection === _core.ClosestPosition.Before || closestDirection === _core.ClosestPosition.ForbidBefore) {
      baseStyle.width = 2;
      baseStyle.height = closestRect.height;
      baseStyle.transform = `perspective(1px) translate3d(${closestRect.x}px,${closestRect.y}px,0)`;
    } else if (closestDirection === _core.ClosestPosition.After || closestDirection === _core.ClosestPosition.ForbidAfter) {
      baseStyle.width = 2;
      baseStyle.height = closestRect.height;
      baseStyle.transform = `perspective(1px) translate3d(${closestRect.x + closestRect.width - 2}px,${closestRect.y}px,0)`;
    } else if (closestDirection === _core.ClosestPosition.InnerAfter || closestDirection === _core.ClosestPosition.Under || closestDirection === _core.ClosestPosition.ForbidInnerAfter || closestDirection === _core.ClosestPosition.ForbidUnder) {
      if (isInlineLayout) {
        baseStyle.width = 2;
        baseStyle.height = closestRect.height;
        baseStyle.transform = `perspective(1px) translate3d(${closestRect.x + closestRect.width - 2}px,${closestRect.y}px,0)`;
      } else {
        baseStyle.width = closestRect.width;
        baseStyle.height = 2;
        baseStyle.transform = `perspective(1px) translate3d(${closestRect.x}px,${closestRect.y + closestRect.height - 2}px,0)`;
      }
    } else if (closestDirection === _core.ClosestPosition.InnerBefore || closestDirection === _core.ClosestPosition.Upper || closestDirection === _core.ClosestPosition.ForbidInnerBefore || closestDirection === _core.ClosestPosition.ForbidUpper) {
      if (isInlineLayout) {
        baseStyle.width = 2;
        baseStyle.height = closestRect.height;
        baseStyle.transform = `perspective(1px) translate3d(${closestRect.x}px,${closestRect.y}px,0)`;
      } else {
        baseStyle.width = closestRect.width;
        baseStyle.height = 2;
        baseStyle.transform = `perspective(1px) translate3d(${closestRect.x}px,${closestRect.y}px,0)`;
      }
    }
    if (closestDirection.includes('FORBID')) {
      baseStyle.backgroundColor = 'red';
    }
    return baseStyle;
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: prefix,
    style: createInsertionStyle()
  });
});
Insertion.displayName = 'Insertion';