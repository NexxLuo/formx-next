var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/widgets/ComponentTreeWidget/index.tsx
var ComponentTreeWidget_exports = {};
__export(ComponentTreeWidget_exports, {
  ComponentTreeWidget: () => ComponentTreeWidget,
  TreeNodeWidget: () => TreeNodeWidget
});
module.exports = __toCommonJS(ComponentTreeWidget_exports);
var import_react = __toESM(require("react"));
var import_hooks = require("../../hooks");
var import_context = require("../../context");
var import_core = require("@designable/core");
var import_reactive_react = require("@formily/reactive-react");
var import_classnames = __toESM(require("classnames"));
var import_styles = require("./styles.less");
var TreeNodeWidget = (0, import_reactive_react.observer)(
  (props) => {
    var _a, _b;
    const designer = (0, import_hooks.useDesigner)((_b = (_a = props.node) == null ? void 0 : _a.designerProps) == null ? void 0 : _b.effects);
    const components = (0, import_hooks.useComponents)();
    const node = props.node;
    const renderChildren = () => {
      var _a2, _b2;
      if ((_a2 = node == null ? void 0 : node.designerProps) == null ? void 0 : _a2.selfRenderChildren) return [];
      return (_b2 = node == null ? void 0 : node.children) == null ? void 0 : _b2.map((child) => {
        return /* @__PURE__ */ import_react.default.createElement(TreeNodeWidget, { key: child.id, node: child });
      });
    };
    const renderProps = (extendsProps = {}) => {
      var _a2, _b2, _c;
      const props2 = {
        ...(_a2 = node.designerProps) == null ? void 0 : _a2.defaultProps,
        ...extendsProps,
        ...node.props,
        ...(_c = (_b2 = node.designerProps) == null ? void 0 : _b2.getComponentProps) == null ? void 0 : _c.call(_b2, node)
      };
      if (node.depth === 0) {
        delete props2.style;
      }
      return props2;
    };
    const renderComponent = () => {
      var _a2, _b2;
      const componentName = node.componentName;
      const Component = components[componentName];
      const dataId = {};
      if (Component) {
        if (designer) {
          dataId[(_a2 = designer == null ? void 0 : designer.props) == null ? void 0 : _a2.nodeIdAttrName] = node.id;
        }
        return import_react.default.createElement(
          Component,
          renderProps(dataId),
          ...renderChildren()
        );
      } else {
        if ((_b2 = node == null ? void 0 : node.children) == null ? void 0 : _b2.length) {
          return /* @__PURE__ */ import_react.default.createElement(import_react.Fragment, null, renderChildren());
        }
      }
    };
    if (!node) return null;
    if (node.hidden) return null;
    return import_react.default.createElement(
      import_context.TreeNodeContext.Provider,
      { value: node },
      renderComponent()
    );
  }
);
var ComponentTreeWidget = (0, import_reactive_react.observer)((props) => {
  var _a, _b;
  const tree = (0, import_hooks.useTree)();
  const prefix = (0, import_hooks.usePrefix)("component-tree");
  const designer = (0, import_hooks.useDesigner)();
  const dataId = {};
  if (designer && tree) {
    dataId[(_a = designer == null ? void 0 : designer.props) == null ? void 0 : _a.nodeIdAttrName] = tree.id;
  }
  (0, import_react.useEffect)(() => {
    import_core.GlobalRegistry.registerDesignerBehaviors(props.components);
  }, []);
  return /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      style: { ...props.style, ...(_b = tree == null ? void 0 : tree.props) == null ? void 0 : _b.style },
      className: (0, import_classnames.default)(prefix, props.className),
      ...dataId
    },
    /* @__PURE__ */ import_react.default.createElement(import_context.DesignerComponentsContext.Provider, { value: props.components }, /* @__PURE__ */ import_react.default.createElement(TreeNodeWidget, { node: tree }))
  );
});
ComponentTreeWidget.displayName = "ComponentTreeWidget";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ComponentTreeWidget,
  TreeNodeWidget
});
