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
const Insertion = exports.Insertion = (0, _reactiveReact.observer)(({
  workspaceId
}) => {
  const outlineDragon = (0, _hooks.useOutlineDragon)(workspaceId);
  const prefix = (0, _hooks.usePrefix)('outline-tree-insertion');
  const createInsertionStyle = () => {
    const closestDirection = outlineDragon.closestDirection;
    const closestRect = outlineDragon.closestOffsetRect;
    const baseStyle = {
      position: 'absolute',
      transform: 'perspective(1px) translate3d(0,0,0)',
      top: 0,
      left: 0
    };
    if (!closestRect) return baseStyle;
    if (closestDirection === _core.ClosestPosition.After || closestDirection === _core.ClosestPosition.InnerAfter || closestDirection === _core.ClosestPosition.Under || closestDirection === _core.ClosestPosition.ForbidAfter || closestDirection === _core.ClosestPosition.ForbidInnerAfter || closestDirection === _core.ClosestPosition.ForbidUnder) {
      baseStyle.width = closestRect.width;
      baseStyle.height = 2;
      baseStyle.transform = `perspective(1px) translate3d(${closestRect.x}px,${closestRect.y + closestRect.height - 2}px,0)`;
    } else if (closestDirection === _core.ClosestPosition.Before || closestDirection === _core.ClosestPosition.InnerBefore || closestDirection === _core.ClosestPosition.Upper || closestDirection === _core.ClosestPosition.ForbidBefore || closestDirection === _core.ClosestPosition.ForbidInnerBefore || closestDirection === _core.ClosestPosition.ForbidUpper) {
      baseStyle.width = closestRect.width;
      baseStyle.height = 2;
      baseStyle.transform = `perspective(1px) translate3d(${closestRect.x}px,${closestRect.y}px,0)`;
    }
    if (closestDirection.includes('FORBID')) {
      baseStyle.backgroundColor = 'red';
    } else {
      baseStyle.backgroundColor = '';
    }
    return baseStyle;
  };
  if (!outlineDragon?.closestNode) return null;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: prefix,
    style: createInsertionStyle()
  });
});
Insertion.displayName = 'Insertion';