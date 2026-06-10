"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResizeHandler = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _hooks = require("../../hooks");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ResizeHandler = props => {
  const designer = (0, _hooks.useDesigner)();
  const prefix = (0, _hooks.usePrefix)('aux-node-resize-handler');
  const createHandler = value => {
    return {
      [designer.props.nodeResizeHandlerAttrName]: value,
      className: (0, _classnames.default)(prefix, value)
    };
  };
  const allowResize = props.node.allowResize();
  if (!allowResize) return null;
  const allowX = allowResize.includes('x');
  const allowY = allowResize.includes('y');
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, allowX && /*#__PURE__*/_react.default.createElement("div", createHandler('x-start')), allowX && /*#__PURE__*/_react.default.createElement("div", createHandler('x-end')), allowY && /*#__PURE__*/_react.default.createElement("div", createHandler('y-start')), allowY && /*#__PURE__*/_react.default.createElement("div", createHandler('y-end')));
};
exports.ResizeHandler = ResizeHandler;