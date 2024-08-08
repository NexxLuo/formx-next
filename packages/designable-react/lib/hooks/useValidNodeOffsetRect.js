"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useValidNodeOffsetRect = void 0;
var _react = require("react");
var _core = require("@designable/core");
var _shared = require("@designable/shared");
var _resizeObserver = require("@juggle/resize-observer");
var _useViewport = require("./useViewport");
var _useDesigner = require("./useDesigner");
const isEqualRect = (rect1, rect2) => {
  return rect1?.x === rect2?.x && rect1?.y === rect2?.y && rect1?.width === rect2?.width && rect1?.height === rect2?.height;
};
const useValidNodeOffsetRect = node => {
  const engine = (0, _useDesigner.useDesigner)();
  const viewport = (0, _useViewport.useViewport)();
  const [, forceUpdate] = (0, _react.useState)(null);
  const rectRef = (0, _react.useRef)(viewport.getValidNodeOffsetRect(node));
  const idleTaskRef = (0, _react.useRef)(null);
  const unmountRef = (0, _react.useRef)(false);
  const observerRef = (0, _react.useRef)(null);
  const element = viewport.findElementById(node?.id);
  const compute = (0, _react.useCallback)(() => {
    if (unmountRef.current) return;
    if (engine.cursor.status !== _core.CursorStatus.Normal && engine.screen.status === _core.ScreenStatus.Normal) return;
    const nextRect = viewport.getValidNodeOffsetRect(node);
    if (!isEqualRect(rectRef.current, nextRect) && nextRect) {
      rectRef.current = nextRect;
      forceUpdate(nextRect);
    }
  }, [viewport, node]);
  (0, _react.useEffect)(() => {
    if (!element || !element.isConnected) return;
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    observerRef.current = new _resizeObserver.ResizeObserver(() => {
      compute();
    });
    observerRef.current.observe(element);
    return () => {
      observerRef.current.disconnect();
    };
  }, [element, viewport]);
  (0, _react.useEffect)(() => {
    unmountRef.current = false;
    const requestIdleTask = () => {
      (0, _shared.cancelIdle)(idleTaskRef.current);
      idleTaskRef.current = (0, _shared.requestIdle)(() => {
        compute();
        requestIdleTask();
      });
    };
    requestIdleTask();
    return () => {
      unmountRef.current = true;
      (0, _shared.cancelIdle)(idleTaskRef.current);
    };
  }, [node]);
  return rectRef.current;
};
exports.useValidNodeOffsetRect = useValidNodeOffsetRect;