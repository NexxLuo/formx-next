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

// src/SettingsForm.tsx
var SettingsForm_exports = {};
__export(SettingsForm_exports, {
  SettingsForm: () => SettingsForm
});
module.exports = __toCommonJS(SettingsForm_exports);
var import_react = __toESM(require("react"));
var import_core = require("@formily/core");
var import_formx_antd = require("@platform/formx-antd");
var import_react2 = require("@formily/react");
var import_shared = require("@designable/shared");
var import_designable_react = require("@platform/designable-react");
var import_SchemaField = require("./SchemaField");
var import_context = require("./shared/context");
var import_effects = require("./effects");
var import_antd = require("antd");
var import_classnames = __toESM(require("classnames"));
var import_styles = require("./styles.less");
var GlobalState = {
  idleRequest: null
};
var SettingsForm = (0, import_react2.observer)(
  (props) => {
    var _a, _b;
    const workbench = (0, import_designable_react.useWorkbench)();
    const currentWorkspace = (workbench == null ? void 0 : workbench.activeWorkspace) || (workbench == null ? void 0 : workbench.currentWorkspace);
    const currentWorkspaceId = currentWorkspace == null ? void 0 : currentWorkspace.id;
    const operation = (0, import_designable_react.useOperation)(currentWorkspaceId);
    const node = (0, import_designable_react.useCurrentNode)(currentWorkspaceId);
    const selected = (0, import_designable_react.useSelected)(currentWorkspaceId);
    const prefix = (0, import_designable_react.usePrefix)("settings-form");
    const schema = (_a = node == null ? void 0 : node.designerProps) == null ? void 0 : _a.propsSchema;
    const isEmpty = !(node && ((_b = node.designerProps) == null ? void 0 : _b.propsSchema) && selected.length === 1);
    const form = (0, import_react.useMemo)(() => {
      var _a2;
      return (0, import_core.createForm)({
        initialValues: (_a2 = node == null ? void 0 : node.designerProps) == null ? void 0 : _a2.defaultProps,
        values: node == null ? void 0 : node.props,
        effects(form2) {
          var _a3;
          (0, import_effects.useLocales)(node);
          (0, import_effects.useSnapshot)(operation);
          (_a3 = props.effects) == null ? void 0 : _a3.call(props, form2);
        }
      });
    }, [node, node == null ? void 0 : node.props, schema, operation, isEmpty]);
    const render = () => {
      if (!isEmpty) {
        return /* @__PURE__ */ import_react.default.createElement(
          "div",
          {
            className: (0, import_classnames.default)(prefix, props.className),
            style: props.style,
            key: node.id
          },
          /* @__PURE__ */ import_react.default.createElement(import_context.SettingsFormContext.Provider, { value: props }, /* @__PURE__ */ import_react.default.createElement(
            import_formx_antd.Form,
            {
              form,
              colon: false,
              labelWidth: 120,
              labelAlign: "left",
              wrapperAlign: "right",
              feedbackLayout: "none",
              tooltipLayout: "text"
            },
            /* @__PURE__ */ import_react.default.createElement(
              import_SchemaField.SchemaField,
              {
                schema,
                components: props.components,
                scope: { $node: node, ...props.scope }
              }
            )
          ))
        );
      }
      return /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-empty" }, /* @__PURE__ */ import_react.default.createElement(import_antd.Empty, null));
    };
    return /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget.Provider, { tooltip: true }, /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-wrapper" }, !isEmpty && /* @__PURE__ */ import_react.default.createElement(import_designable_react.NodePathWidget, { workspaceId: currentWorkspaceId }), /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-content" }, render())));
  },
  {
    scheduler: (update) => {
      (0, import_shared.cancelIdle)(GlobalState.idleRequest);
      GlobalState.idleRequest = (0, import_shared.requestIdle)(update, {
        timeout: 500
      });
    }
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SettingsForm
});
