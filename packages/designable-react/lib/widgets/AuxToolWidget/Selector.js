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

// src/widgets/AuxToolWidget/Selector.tsx
var Selector_exports = {};
__export(Selector_exports, {
  Selector: () => Selector
});
module.exports = __toCommonJS(Selector_exports);
var import_react = __toESM(require("react"));
var import_hooks = require("../../hooks");
var import_IconWidget = require("../IconWidget");
var import_NodeTitleWidget = require("../NodeTitleWidget");
var import_antd = require("antd");
var import_reactive_react = require("@formily/reactive-react");
var useMouseHover = (ref, enter, leave) => {
  (0, import_react.useEffect)(() => {
    let timer = null;
    let unmounted = false;
    const onMouseOver = (e) => {
      const target = e.target;
      clearTimeout(timer);
      timer = setTimeout(() => {
        var _a;
        if (unmounted) return;
        if ((_a = ref == null ? void 0 : ref.current) == null ? void 0 : _a.contains(target)) {
          enter && enter();
        } else {
          leave && leave();
        }
      }, 100);
    };
    document.addEventListener("mouseover", onMouseOver);
    return () => {
      unmounted = true;
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, []);
};
var Selector = (0, import_reactive_react.observer)(({ node }) => {
  const hover = (0, import_hooks.useHover)();
  const [expand, setExpand] = (0, import_react.useState)(false);
  const ref = (0, import_react.useRef)(null);
  const selection = (0, import_hooks.useSelection)();
  const prefix = (0, import_hooks.usePrefix)("aux-selector");
  const renderIcon = (node2) => {
    var _a;
    const icon = node2.designerProps.icon;
    if (icon) {
      return /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: icon });
    }
    if (node2 === node2.root) {
      return /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "Page" });
    } else if ((_a = node2.designerProps) == null ? void 0 : _a.droppable) {
      return /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "Container" });
    }
    return /* @__PURE__ */ import_react.default.createElement(import_IconWidget.IconWidget, { infer: "Component" });
  };
  const renderMenu = () => {
    const parents = node.getParents();
    return /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        className: prefix + "-menu",
        style: {
          position: "absolute",
          top: "100%",
          left: 0
        }
      },
      parents.slice(0, 4).map((parent) => {
        return /* @__PURE__ */ import_react.default.createElement(
          import_antd.Button,
          {
            key: parent.id,
            type: "primary",
            onClick: () => {
              selection.select(parent.id);
            },
            onMouseEnter: () => {
              hover.setHover(parent);
            }
          },
          renderIcon(parent),
          /* @__PURE__ */ import_react.default.createElement("span", { style: { transform: "scale(0.85)", marginLeft: 2 } }, /* @__PURE__ */ import_react.default.createElement(import_NodeTitleWidget.NodeTitleWidget, { node: parent }))
        );
      })
    );
  };
  useMouseHover(
    ref,
    () => {
      setExpand(true);
    },
    () => {
      setExpand(false);
    }
  );
  return /* @__PURE__ */ import_react.default.createElement("div", { ref, className: prefix }, /* @__PURE__ */ import_react.default.createElement(
    import_antd.Button,
    {
      className: prefix + "-title",
      type: "primary",
      onMouseEnter: () => {
        hover.setHover(node);
      }
    },
    renderIcon(node),
    /* @__PURE__ */ import_react.default.createElement("span", null, /* @__PURE__ */ import_react.default.createElement(import_NodeTitleWidget.NodeTitleWidget, { node }))
  ), expand && renderMenu());
});
Selector.displayName = "Selector";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Selector
});
