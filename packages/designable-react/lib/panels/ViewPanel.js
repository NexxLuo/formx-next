"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewPanel = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactiveReact = require("@formily/reactive-react");
var _hooks = require("../hooks");
var _containers = require("../containers");
var _shared = require("@designable/shared");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ViewPanel = exports.ViewPanel = (0, _reactiveReact.observer)(props => {
  const [visible, setVisible] = (0, _react.useState)(true);
  const workbench = (0, _hooks.useWorkbench)();
  const tree = (0, _hooks.useTree)();
  (0, _react.useEffect)(() => {
    if (workbench.type === props.type) {
      (0, _shared.requestIdle)(() => {
        requestAnimationFrame(() => {
          setVisible(true);
        });
      });
    } else {
      setVisible(false);
    }
  }, [workbench.type]);
  if (workbench.type !== props.type) return null;
  const render = () => {
    return props.children(tree, payload => {
      tree.from(payload);
      tree.takeSnapshot();
    });
  };
  if (workbench.type === 'DESIGNABLE') return /*#__PURE__*/_react.default.createElement(_containers.Viewport, {
    dragTipsDirection: props.dragTipsDirection
  }, render());
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      overflow: props.scrollable ? 'overlay' : 'hidden',
      height: '100%',
      cursor: 'auto',
      userSelect: 'text'
    }
  }, visible && render());
});
ViewPanel.defaultProps = {
  scrollable: true
};