"use strict";

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = void 0 && (void 0).__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = void 0 && (void 0).__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsForm = void 0;

var react_1 = __importStar(require("react"));

var core_1 = require("@formily/core");

var formx_antd_1 = require("@nvwa/formx-antd");

var react_2 = require("@formily/react");

var shared_1 = require("@designable/shared");

var designable_react_1 = require("@nvwa/designable-react");

var SchemaField_1 = require("./SchemaField");

var context_1 = require("./shared/context");

var effects_1 = require("./effects");

var antd_1 = require("antd");

var classnames_1 = __importDefault(require("classnames"));

require("./styles.less");

var GlobalState = {
  idleRequest: null
};
exports.SettingsForm = (0, react_2.observer)(function (props) {
  var _a, _b;

  var workbench = (0, designable_react_1.useWorkbench)();
  var currentWorkspace = (workbench === null || workbench === void 0 ? void 0 : workbench.activeWorkspace) || (workbench === null || workbench === void 0 ? void 0 : workbench.currentWorkspace);
  var currentWorkspaceId = currentWorkspace === null || currentWorkspace === void 0 ? void 0 : currentWorkspace.id;
  var operation = (0, designable_react_1.useOperation)(currentWorkspaceId);
  var node = (0, designable_react_1.useCurrentNode)(currentWorkspaceId);
  var selected = (0, designable_react_1.useSelected)(currentWorkspaceId);
  var prefix = (0, designable_react_1.usePrefix)('settings-form');
  var schema = (_a = node === null || node === void 0 ? void 0 : node.designerProps) === null || _a === void 0 ? void 0 : _a.propsSchema;
  var isEmpty = !(node && ((_b = node.designerProps) === null || _b === void 0 ? void 0 : _b.propsSchema) && selected.length === 1);
  var form = (0, react_1.useMemo)(function () {
    var _a;

    return (0, core_1.createForm)({
      initialValues: (_a = node === null || node === void 0 ? void 0 : node.designerProps) === null || _a === void 0 ? void 0 : _a.defaultProps,
      values: node === null || node === void 0 ? void 0 : node.props,
      effects: function effects(form) {
        var _a;

        (0, effects_1.useLocales)(node);
        (0, effects_1.useSnapshot)(operation);
        (_a = props.effects) === null || _a === void 0 ? void 0 : _a.call(props, form);
      }
    });
  }, [node, node === null || node === void 0 ? void 0 : node.props, schema, operation, isEmpty]);

  var render = function render() {
    if (!isEmpty) {
      return react_1.default.createElement("div", {
        className: (0, classnames_1.default)(prefix, props.className),
        style: props.style,
        key: node.id
      }, react_1.default.createElement(context_1.SettingsFormContext.Provider, {
        value: props
      }, react_1.default.createElement(formx_antd_1.Form, {
        form: form,
        colon: false,
        labelWidth: 120,
        labelAlign: "left",
        wrapperAlign: "right",
        feedbackLayout: "none",
        tooltipLayout: "text"
      }, react_1.default.createElement(SchemaField_1.SchemaField, {
        schema: schema,
        components: props.components,
        scope: __assign({
          $node: node
        }, props.scope)
      }))));
    }

    return react_1.default.createElement("div", {
      className: prefix + '-empty'
    }, react_1.default.createElement(antd_1.Empty, null));
  };

  return react_1.default.createElement(designable_react_1.IconWidget.Provider, {
    tooltip: true
  }, react_1.default.createElement("div", {
    className: prefix + '-wrapper'
  }, !isEmpty && react_1.default.createElement(designable_react_1.NodePathWidget, {
    workspaceId: currentWorkspaceId
  }), react_1.default.createElement("div", {
    className: prefix + '-content'
  }, render())));
}, {
  scheduler: function scheduler(update) {
    (0, shared_1.cancelIdle)(GlobalState.idleRequest);
    GlobalState.idleRequest = (0, shared_1.requestIdle)(update, {
      timeout: 500
    });
  }
});