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

// src/simulators/ResponsiveSimulator/index.tsx
var ResponsiveSimulator_exports = {};
__export(ResponsiveSimulator_exports, {
  ResponsiveSimulator: () => ResponsiveSimulator
});
module.exports = __toCommonJS(ResponsiveSimulator_exports);
var import_react = __toESM(require("react"));
var import_reactive_react = require("@formily/reactive-react");
var import_core = require("@designable/core");
var import_shared = require("@designable/shared");
var import_hooks = require("../../hooks");
var import_widgets = require("../../widgets");
var import_handle = require("./handle");
var import_classnames = __toESM(require("classnames"));
var import_styles = require("./styles.less");
var useResizeEffect = (container, content, engine) => {
  let status = null;
  let startX = 0;
  let startY = 0;
  let startWidth = 0;
  let startHeight = 0;
  let animationX = null;
  let animationY = null;
  const getStyle = (status2) => {
    if (status2 === import_handle.ResizeHandleType.Resize) return "nwse-resize";
    if (status2 === import_handle.ResizeHandleType.ResizeHeight) return "ns-resize";
    if (status2 === import_handle.ResizeHandleType.ResizeWidth) return "ew-resize";
  };
  const updateSize = (deltaX, deltaY) => {
    var _a;
    const containerRect = (_a = container.current) == null ? void 0 : _a.getBoundingClientRect();
    if (status === import_handle.ResizeHandleType.Resize) {
      engine.screen.setSize(startWidth + deltaX, startHeight + deltaY);
      container.current.scrollBy(
        containerRect.width + deltaX,
        containerRect.height + deltaY
      );
    } else if (status === import_handle.ResizeHandleType.ResizeHeight) {
      engine.screen.setSize(startWidth, startHeight + deltaY);
      container.current.scrollBy(
        container.current.scrollLeft,
        containerRect.height + deltaY
      );
    } else if (status === import_handle.ResizeHandleType.ResizeWidth) {
      engine.screen.setSize(startWidth + deltaX, startHeight);
      container.current.scrollBy(
        containerRect.width + deltaX,
        container.current.scrollTop
      );
    }
  };
  engine.subscribeTo(import_core.DragStartEvent, (e) => {
    var _a, _b;
    if (!((_a = engine.workbench.currentWorkspace) == null ? void 0 : _a.viewport)) return;
    const target = e.data.target;
    if (target == null ? void 0 : target.closest("*[data-designer-resize-handle]")) {
      const rect = (_b = content.current) == null ? void 0 : _b.getBoundingClientRect();
      if (!rect) return;
      status = target.getAttribute(
        "data-designer-resize-handle"
      );
      engine.cursor.setStyle(getStyle(status));
      startX = e.data.topClientX;
      startY = e.data.topClientY;
      startWidth = rect.width;
      startHeight = rect.height;
      engine.screen.setStatus(import_core.ScreenStatus.Resizing);
    }
  });
  engine.subscribeTo(import_core.DragMoveEvent, (e) => {
    var _a, _b;
    if (!((_a = engine.workbench.currentWorkspace) == null ? void 0 : _a.viewport)) return;
    if (!status) return;
    const deltaX = e.data.topClientX - startX;
    const deltaY = e.data.topClientY - startY;
    const containerRect = (_b = container.current) == null ? void 0 : _b.getBoundingClientRect();
    const distanceX = Math.floor(containerRect.right - e.data.topClientX);
    const distanceY = Math.floor(containerRect.bottom - e.data.topClientY);
    const factorX = (0, import_shared.calcSpeedFactor)(distanceX, 10);
    const factorY = (0, import_shared.calcSpeedFactor)(distanceY, 10);
    updateSize(deltaX, deltaY);
    if (distanceX <= 10) {
      if (!animationX) {
        animationX = (0, import_shared.createUniformSpeedAnimation)(1e3 * factorX, (delta) => {
          updateSize(deltaX + delta, deltaY);
        });
      }
    } else {
      if (animationX) {
        animationX = animationX();
      }
    }
    if (distanceY <= 10) {
      if (!animationY) {
        animationY = (0, import_shared.createUniformSpeedAnimation)(300 * factorY, (delta) => {
          updateSize(deltaX, deltaY + delta);
        });
      }
    } else {
      if (animationY) {
        animationY = animationY();
      }
    }
  });
  engine.subscribeTo(import_core.DragStopEvent, () => {
    if (!status) return;
    status = null;
    engine.cursor.setStyle("");
    engine.screen.setStatus(import_core.ScreenStatus.Normal);
    if (animationX) {
      animationX = animationX();
    }
    if (animationY) {
      animationY = animationY();
    }
  });
};
var ResponsiveSimulator = (0, import_reactive_react.observer)((props) => {
  const container = (0, import_react.useRef)();
  const content = (0, import_react.useRef)();
  const prefix = (0, import_hooks.usePrefix)("responsive-simulator");
  const screen = (0, import_hooks.useScreen)();
  (0, import_hooks.useDesigner)((engine) => {
    useResizeEffect(container, content, engine);
  });
  return /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      ...props,
      className: (0, import_classnames.default)(prefix, props.className),
      style: {
        height: "100%",
        width: "100%",
        minHeight: 100,
        position: "relative",
        ...props.style
      }
    },
    /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        ref: container,
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          overflow: "overlay"
        }
      },
      /* @__PURE__ */ import_react.default.createElement(
        "div",
        {
          ref: content,
          style: {
            width: screen.width,
            height: screen.height,
            paddingRight: 15,
            paddingBottom: 15,
            position: "relative",
            boxSizing: "border-box",
            overflow: "hidden"
          }
        },
        props.children,
        /* @__PURE__ */ import_react.default.createElement(import_handle.ResizeHandle, { type: import_handle.ResizeHandleType.Resize }, /* @__PURE__ */ import_react.default.createElement(import_widgets.IconWidget, { infer: "DragMove", style: { pointerEvents: "none" } })),
        /* @__PURE__ */ import_react.default.createElement(import_handle.ResizeHandle, { type: import_handle.ResizeHandleType.ResizeHeight }, /* @__PURE__ */ import_react.default.createElement(import_widgets.IconWidget, { infer: "Menu", style: { pointerEvents: "none" } })),
        /* @__PURE__ */ import_react.default.createElement(import_handle.ResizeHandle, { type: import_handle.ResizeHandleType.ResizeWidth }, /* @__PURE__ */ import_react.default.createElement(import_widgets.IconWidget, { infer: "Menu", style: { pointerEvents: "none" } }))
      )
    )
  );
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ResponsiveSimulator
});
