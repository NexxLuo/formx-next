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

// src/panels/CompositePanel.tsx
var CompositePanel_exports = {};
__export(CompositePanel_exports, {
  CompositePanel: () => CompositePanel
});
module.exports = __toCommonJS(CompositePanel_exports);
var import_react = __toESM(require("react"));
var import_shared = require("@designable/shared");
var import_classnames = __toESM(require("classnames"));
var import_widgets = require("../widgets");
var import_hooks = require("../hooks");
var parseItems = (children) => {
  const items = [];
  import_react.default.Children.forEach(children, (child, index) => {
    if ((child == null ? void 0 : child["type"]) === CompositePanel.Item) {
      items.push({ key: child["key"] ?? index, ...child["props"] });
    }
  });
  return items;
};
var findItem = (items, key) => {
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    if (key === index) return item;
    if (key === item.key) return item;
  }
};
var getDefaultKey = (children) => {
  const items = parseItems(children);
  return items == null ? void 0 : items[0].key;
};
var CompositePanel = (props) => {
  const prefix = (0, import_hooks.usePrefix)("composite-panel");
  const [activeKey, setActiveKey] = (0, import_react.useState)(
    props.defaultActiveKey ?? getDefaultKey(props.children)
  );
  const activeKeyRef = (0, import_react.useRef)(null);
  const [pinning, setPinning] = (0, import_react.useState)(props.defaultPinning ?? false);
  const [visible, setVisible] = (0, import_react.useState)(props.defaultOpen ?? true);
  const items = parseItems(props.children);
  const currentItem = findItem(items, activeKey);
  const content = currentItem == null ? void 0 : currentItem.children;
  activeKeyRef.current = activeKey;
  (0, import_react.useEffect)(() => {
    if ((0, import_shared.isValid)(props.activeKey)) {
      if (props.activeKey !== activeKeyRef.current) {
        setActiveKey(props.activeKey);
      }
    }
  }, [props.activeKey]);
  const renderContent = () => {
    if (!content || !visible) return;
    return /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        className: (0, import_classnames.default)(prefix + "-tabs-content", {
          pinning
        })
      },
      /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-tabs-header" }, /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-tabs-header-title" }, /* @__PURE__ */ import_react.default.createElement(import_widgets.TextWidget, null, currentItem.title)), /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-tabs-header-actions" }, /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-tabs-header-extra" }, currentItem.extra), !pinning && /* @__PURE__ */ import_react.default.createElement(
        import_widgets.IconWidget,
        {
          infer: "PushPinOutlined",
          className: prefix + "-tabs-header-pin",
          onClick: () => {
            setPinning(!pinning);
          }
        }
      ), pinning && /* @__PURE__ */ import_react.default.createElement(
        import_widgets.IconWidget,
        {
          infer: "PushPinFilled",
          className: prefix + "-tabs-header-pin-filled",
          onClick: () => {
            setPinning(!pinning);
          }
        }
      ), /* @__PURE__ */ import_react.default.createElement(
        import_widgets.IconWidget,
        {
          infer: "Close",
          className: prefix + "-tabs-header-close",
          onClick: () => {
            setVisible(false);
          }
        }
      ))),
      /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-tabs-body" }, content)
    );
  };
  return /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      className: (0, import_classnames.default)(prefix, {
        [`direction-${props.direction}`]: !!props.direction
      })
    },
    /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-tabs" }, items.map((item, index) => {
      const takeTab = () => {
        if (item.href) {
          return /* @__PURE__ */ import_react.default.createElement("a", { href: item.href }, item.icon);
        }
        return /* @__PURE__ */ import_react.default.createElement(
          import_widgets.IconWidget,
          {
            tooltip: props.showNavTitle ? null : {
              title: /* @__PURE__ */ import_react.default.createElement(import_widgets.TextWidget, null, item.title),
              placement: props.direction === "right" ? "left" : "right"
            },
            infer: item.icon
          }
        );
      };
      const shape = item.shape ?? "tab";
      const Comp = shape === "link" ? "a" : "div";
      return /* @__PURE__ */ import_react.default.createElement(
        Comp,
        {
          className: (0, import_classnames.default)(prefix + "-tabs-pane", {
            active: activeKey === item.key
          }),
          key: index,
          href: item.href,
          onClick: (e) => {
            var _a, _b;
            if (shape === "tab") {
              if (activeKey === item.key) {
                setVisible(!visible);
              } else {
                setVisible(true);
              }
              if (!(props == null ? void 0 : props.activeKey) || !(props == null ? void 0 : props.onChange))
                setActiveKey(item.key);
            }
            (_a = item.onClick) == null ? void 0 : _a.call(item, e);
            (_b = props.onChange) == null ? void 0 : _b.call(props, item.key);
          }
        },
        takeTab(),
        props.showNavTitle && item.title ? /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-tabs-pane-title" }, /* @__PURE__ */ import_react.default.createElement(import_widgets.TextWidget, null, item.title)) : null
      );
    })),
    renderContent()
  );
};
CompositePanel.Item = () => {
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CompositePanel
});
