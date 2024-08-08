var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/hooks/useValidNodeOffsetRect.ts
var useValidNodeOffsetRect_exports = {};
__export(useValidNodeOffsetRect_exports, {
  useValidNodeOffsetRect: () => useValidNodeOffsetRect
});
module.exports = __toCommonJS(useValidNodeOffsetRect_exports);
var import_react = require("react");
var import_core = require("@designable/core");
var import_shared = require("@designable/shared");
var import_resize_observer = require("@juggle/resize-observer");
var import_useViewport = require("./useViewport");
var import_useDesigner = require("./useDesigner");
var isEqualRect = (rect1, rect2) => {
  return (rect1 == null ? void 0 : rect1.x) === (rect2 == null ? void 0 : rect2.x) && (rect1 == null ? void 0 : rect1.y) === (rect2 == null ? void 0 : rect2.y) && (rect1 == null ? void 0 : rect1.width) === (rect2 == null ? void 0 : rect2.width) && (rect1 == null ? void 0 : rect1.height) === (rect2 == null ? void 0 : rect2.height);
};
var useValidNodeOffsetRect = (node) => {
  const engine = (0, import_useDesigner.useDesigner)();
  const viewport = (0, import_useViewport.useViewport)();
  const [, forceUpdate] = (0, import_react.useState)(null);
  const rectRef = (0, import_react.useRef)(viewport.getValidNodeOffsetRect(node));
  const idleTaskRef = (0, import_react.useRef)(null);
  const unmountRef = (0, import_react.useRef)(false);
  const observerRef = (0, import_react.useRef)(null);
  const element = viewport.findElementById(node == null ? void 0 : node.id);
  const compute = (0, import_react.useCallback)(() => {
    if (unmountRef.current) return;
    if (engine.cursor.status !== import_core.CursorStatus.Normal && engine.screen.status === import_core.ScreenStatus.Normal)
      return;
    const nextRect = viewport.getValidNodeOffsetRect(node);
    if (!isEqualRect(rectRef.current, nextRect) && nextRect) {
      rectRef.current = nextRect;
      forceUpdate(nextRect);
    }
  }, [viewport, node]);
  (0, import_react.useEffect)(() => {
    if (!element || !element.isConnected) return;
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    observerRef.current = new import_resize_observer.ResizeObserver(() => {
      compute();
    });
    observerRef.current.observe(element);
    return () => {
      observerRef.current.disconnect();
    };
  }, [element, viewport]);
  (0, import_react.useEffect)(() => {
    unmountRef.current = false;
    const requestIdleTask = () => {
      (0, import_shared.cancelIdle)(idleTaskRef.current);
      idleTaskRef.current = (0, import_shared.requestIdle)(() => {
        compute();
        requestIdleTask();
      });
    };
    requestIdleTask();
    return () => {
      unmountRef.current = true;
      (0, import_shared.cancelIdle)(idleTaskRef.current);
    };
  }, [node]);
  return rectRef.current;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useValidNodeOffsetRect
});
