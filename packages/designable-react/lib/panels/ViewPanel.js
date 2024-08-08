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

// src/panels/ViewPanel.tsx
var ViewPanel_exports = {};
__export(ViewPanel_exports, {
  ViewPanel: () => ViewPanel
});
module.exports = __toCommonJS(ViewPanel_exports);
var import_react = __toESM(require("react"));
var import_reactive_react = require("@formily/reactive-react");
var import_hooks = require("../hooks");
var import_containers = require("../containers");
var import_shared = require("@designable/shared");
var ViewPanel = (0, import_reactive_react.observer)((props) => {
  const [visible, setVisible] = (0, import_react.useState)(true);
  const workbench = (0, import_hooks.useWorkbench)();
  const tree = (0, import_hooks.useTree)();
  (0, import_react.useEffect)(() => {
    if (workbench.type === props.type) {
      (0, import_shared.requestIdle)(() => {
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
    return props.children(tree, (payload) => {
      tree.from(payload);
      tree.takeSnapshot();
    });
  };
  if (workbench.type === "DESIGNABLE")
    return /* @__PURE__ */ import_react.default.createElement(import_containers.Viewport, { dragTipsDirection: props.dragTipsDirection }, render());
  return /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      style: {
        overflow: props.scrollable ? "overlay" : "hidden",
        height: "100%",
        cursor: "auto",
        userSelect: "text"
      }
    },
    visible && render()
  );
});
ViewPanel.defaultProps = {
  scrollable: true
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ViewPanel
});
