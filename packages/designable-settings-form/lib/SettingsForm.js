"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsForm = void 0;
var _react = _interopRequireWildcard(require("react"));
var _core = require("@formily/core");
var _formxAntd = require("@platform/formx-antd");
var _react2 = require("@formily/react");
var _shared = require("@designable/shared");
var _designableReact = require("@platform/designable-react");
var _SchemaField = require("./SchemaField");
var _context = require("./shared/context");
var _effects = require("./effects");
var _antd = require("antd");
var _classnames = _interopRequireDefault(require("classnames"));
require("./styles.less");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const GlobalState = {
  idleRequest: null
};
const SettingsForm = exports.SettingsForm = (0, _react2.observer)(props => {
  const workbench = (0, _designableReact.useWorkbench)();
  const currentWorkspace = workbench?.activeWorkspace || workbench?.currentWorkspace;
  const currentWorkspaceId = currentWorkspace?.id;
  const operation = (0, _designableReact.useOperation)(currentWorkspaceId);
  const node = (0, _designableReact.useCurrentNode)(currentWorkspaceId);
  const selected = (0, _designableReact.useSelected)(currentWorkspaceId);
  const prefix = (0, _designableReact.usePrefix)('settings-form');
  const schema = node?.designerProps?.propsSchema;
  const isEmpty = !(node && node.designerProps?.propsSchema && selected.length === 1);
  const form = (0, _react.useMemo)(() => {
    return (0, _core.createForm)({
      initialValues: node?.designerProps?.defaultProps,
      values: node?.props,
      effects(form) {
        (0, _effects.useLocales)(node);
        (0, _effects.useSnapshot)(operation);
        props.effects?.(form);
      }
    });
  }, [node, node?.props, schema, operation, isEmpty]);
  const render = () => {
    if (!isEmpty) {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)(prefix, props.className),
        style: props.style,
        key: node.id
      }, /*#__PURE__*/_react.default.createElement(_context.SettingsFormContext.Provider, {
        value: props
      }, /*#__PURE__*/_react.default.createElement(_formxAntd.Form, {
        form: form,
        colon: false,
        labelWidth: 120,
        labelAlign: "left",
        wrapperAlign: "right",
        feedbackLayout: "none",
        tooltipLayout: "text"
      }, /*#__PURE__*/_react.default.createElement(_SchemaField.SchemaField, {
        schema: schema,
        components: props.components,
        scope: {
          $node: node,
          ...props.scope
        }
      }))));
    }
    return /*#__PURE__*/_react.default.createElement("div", {
      className: prefix + '-empty'
    }, /*#__PURE__*/_react.default.createElement(_antd.Empty, null));
  };
  return /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget.Provider, {
    tooltip: true
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-wrapper'
  }, !isEmpty && /*#__PURE__*/_react.default.createElement(_designableReact.NodePathWidget, {
    workspaceId: currentWorkspaceId
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-content'
  }, render())));
}, {
  scheduler: update => {
    (0, _shared.cancelIdle)(GlobalState.idleRequest);
    GlobalState.idleRequest = (0, _shared.requestIdle)(update, {
      timeout: 500
    });
  }
});