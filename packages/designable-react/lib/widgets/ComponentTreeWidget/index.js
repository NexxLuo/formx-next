"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeNodeWidget = exports.ComponentTreeWidget = void 0;
var _react = _interopRequireWildcard(require("react"));
var _hooks = require("../../hooks");
var _context = require("../../context");
var _core = require("@designable/core");
var _reactiveReact = require("@formily/reactive-react");
var _classnames = _interopRequireDefault(require("classnames"));
require("./styles.less");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const TreeNodeWidget = exports.TreeNodeWidget = (0, _reactiveReact.observer)(props => {
  const designer = (0, _hooks.useDesigner)(props.node?.designerProps?.effects);
  const components = (0, _hooks.useComponents)();
  const node = props.node;
  const renderChildren = () => {
    if (node?.designerProps?.selfRenderChildren) return [];
    return node?.children?.map(child => {
      return /*#__PURE__*/_react.default.createElement(TreeNodeWidget, {
        key: child.id,
        node: child
      });
    });
  };
  const renderProps = (extendsProps = {}) => {
    const props = {
      ...node.designerProps?.defaultProps,
      ...extendsProps,
      ...node.props,
      ...node.designerProps?.getComponentProps?.(node)
    };
    if (node.depth === 0) {
      delete props.style;
    }
    return props;
  };
  const renderComponent = () => {
    const componentName = node.componentName;
    const Component = components[componentName];
    const dataId = {};
    if (Component) {
      if (designer) {
        dataId[designer?.props?.nodeIdAttrName] = node.id;
      }
      return /*#__PURE__*/_react.default.createElement(Component, renderProps(dataId), ...renderChildren());
    } else {
      if (node?.children?.length) {
        return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, renderChildren());
      }
    }
  };
  if (!node) return null;
  if (node.hidden) return null;
  return /*#__PURE__*/_react.default.createElement(_context.TreeNodeContext.Provider, {
    value: node
  }, renderComponent());
});
const ComponentTreeWidget = exports.ComponentTreeWidget = (0, _reactiveReact.observer)(props => {
  const tree = (0, _hooks.useTree)();
  const prefix = (0, _hooks.usePrefix)('component-tree');
  const designer = (0, _hooks.useDesigner)();
  const dataId = {};
  if (designer && tree) {
    dataId[designer?.props?.nodeIdAttrName] = tree.id;
  }
  (0, _react.useEffect)(() => {
    _core.GlobalRegistry.registerDesignerBehaviors(props.components);
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    style: {
      ...props.style,
      ...tree?.props?.style
    },
    className: (0, _classnames.default)(prefix, props.className)
  }, dataId), /*#__PURE__*/_react.default.createElement(_context.DesignerComponentsContext.Provider, {
    value: props.components
  }, /*#__PURE__*/_react.default.createElement(TreeNodeWidget, {
    node: tree
  })));
});
ComponentTreeWidget.displayName = 'ComponentTreeWidget';