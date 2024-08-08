"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyWidget = void 0;
var _react = _interopRequireDefault(require("react"));
var _hooks = require("../../hooks");
var _reactiveReact = require("@formily/reactive-react");
var _IconWidget = require("../IconWidget");
require("./styles.less");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const EmptyWidget = exports.EmptyWidget = (0, _reactiveReact.observer)(props => {
  const tree = (0, _hooks.useTree)();
  const prefix = (0, _hooks.usePrefix)('empty');
  const renderEmpty = () => {
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "animations"
    }, /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
      infer: props.dragTipsDirection === 'left' ? 'DragLeftSourceAnimation' : 'DragRightSourceAnimation',
      size: 240
    }), /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
      infer: "BatchDragAnimation",
      size: 240
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "hotkeys-list"
    }, /*#__PURE__*/_react.default.createElement("div", null, "Selection ", /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
      infer: "Command"
    }), " + Click /", ' ', /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
      infer: "Shift"
    }), " + Click /", ' ', /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
      infer: "Command"
    }), " + A"), /*#__PURE__*/_react.default.createElement("div", null, "Copy ", /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
      infer: "Command"
    }), " + C / Paste", ' ', /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
      infer: "Command"
    }), " + V"), /*#__PURE__*/_react.default.createElement("div", null, "Delete ", /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
      infer: "Delete"
    }))));
  };
  if (!tree?.children?.length) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: prefix
    }, props.children ? props.children : renderEmpty());
  }
  return null;
});
EmptyWidget.defaultProps = {
  dragTipsDirection: 'left'
};