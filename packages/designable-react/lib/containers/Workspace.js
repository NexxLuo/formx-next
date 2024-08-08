"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Workspace = void 0;
var _react = _interopRequireWildcard(require("react"));
var _hooks = require("../hooks");
var _context = require("../context");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Workspace = ({
  id,
  title,
  description,
  ...props
}) => {
  const oldId = (0, _react.useRef)();
  const designer = (0, _hooks.useDesigner)();
  const workspace = (0, _react.useMemo)(() => {
    if (!designer) return;
    if (oldId.current && oldId.current !== id) {
      const old = designer.workbench.findWorkspaceById(oldId.current);
      if (old) old.viewport.detachEvents();
    }
    const workspace = {
      id: id || 'index',
      title,
      description
    };
    designer.workbench.ensureWorkspace(workspace);
    oldId.current = workspace.id;
    return workspace;
  }, [id, designer]);
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_context.WorkspaceContext.Provider, {
    value: workspace
  }, props.children));
};
exports.Workspace = Workspace;