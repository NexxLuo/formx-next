"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TranslateHandler = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _hooks = require("../../hooks");
var _IconWidget = require("../IconWidget");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const TranslateHandler = props => {
  const designer = (0, _hooks.useDesigner)();
  const prefix = (0, _hooks.usePrefix)('aux-node-translate-handler');
  const createHandler = value => {
    return {
      [designer.props.nodeTranslateAttrName]: value,
      className: (0, _classnames.default)(prefix, value)
    };
  };
  const allowTranslate = props.node.allowTranslate();
  if (!allowTranslate) return null;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", createHandler('translate'), /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
    infer: "FreeMove"
  })));
};
exports.TranslateHandler = TranslateHandler;