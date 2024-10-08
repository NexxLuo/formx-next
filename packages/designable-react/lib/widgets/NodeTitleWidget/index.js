"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeTitleWidget = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactiveReact = require("@formily/reactive-react");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const NodeTitleWidget = exports.NodeTitleWidget = (0, _reactiveReact.observer)(props => {
  const takeNode = () => {
    const node = props.node;
    if (node.componentName === '$$ResourceNode$$') {
      return node.children[0];
    }
    return node;
  };
  const node = takeNode();
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, node.getMessage('title') || node.componentName);
});