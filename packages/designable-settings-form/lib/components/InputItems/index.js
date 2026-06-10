"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputItems = void 0;
var _react = _interopRequireWildcard(require("react"));
var _designableReact = require("@platform/designable-react");
var _classnames = _interopRequireDefault(require("classnames"));
require("./styles.less");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const InputItemsContext = /*#__PURE__*/_react.default.createContext(null);
const InputItems = props => {
  const prefix = (0, _designableReact.usePrefix)('input-items');
  return /*#__PURE__*/_react.default.createElement(InputItemsContext.Provider, {
    value: props
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(prefix, props.className),
    style: props.style
  }, props.children));
};
exports.InputItems = InputItems;
InputItems.defaultProps = {
  width: '100%'
};
InputItems.Item = props => {
  const prefix = (0, _designableReact.usePrefix)('input-items-item');
  const ctx = (0, _react.useContext)(InputItemsContext);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(prefix, props.className, {
      vertical: props.vertical || ctx.vertical
    }),
    style: {
      width: props.width || ctx.width,
      ...props.style
    }
  }, props.icon && /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-icon'
  }, /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
    infer: props.icon,
    size: 16
  })), props.title && /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-title'
  }, props.title), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-controller'
  }, props.children));
};