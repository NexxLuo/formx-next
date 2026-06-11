"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Selector = void 0;
var _react = _interopRequireWildcard(require("react"));
var _hooks = require("../../hooks");
var _IconWidget = require("../IconWidget");
var _NodeTitleWidget = require("../NodeTitleWidget");
var _antd = require("antd");
var _observer = require("../../observer");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// @ts-nocheck

const useMouseHover = (ref, enter, leave) => {
  (0, _react.useEffect)(() => {
    let timer = null;
    let unmounted = false;
    const onMouseOver = e => {
      const target = e.target;
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (unmounted) return;
        if (ref?.current?.contains(target)) {
          enter && enter();
        } else {
          leave && leave();
        }
      }, 100);
    };
    document.addEventListener('mouseover', onMouseOver);
    return () => {
      unmounted = true;
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);
};
const Selector = exports.Selector = (0, _observer.observer)(({
  node
}) => {
  const hover = (0, _hooks.useHover)();
  const [expand, setExpand] = (0, _react.useState)(false);
  const ref = (0, _react.useRef)(null);
  const selection = (0, _hooks.useSelection)();
  const prefix = (0, _hooks.usePrefix)('aux-selector');
  const renderIcon = node => {
    const icon = node.designerProps.icon;
    if (icon) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconWidget.IconWidget, {
        infer: icon
      });
    }
    if (node === node.root) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconWidget.IconWidget, {
        infer: "Page"
      });
    } else if (node.designerProps?.droppable) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconWidget.IconWidget, {
        infer: "Container"
      });
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconWidget.IconWidget, {
      infer: "Component"
    });
  };
  const renderMenu = () => {
    const parents = node.getParents();
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: prefix + '-menu',
      style: {
        position: 'absolute',
        top: '100%',
        left: 0
      },
      children: parents.slice(0, 4).map(parent => {
        return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_antd.Button, {
          type: "primary",
          onClick: () => {
            selection.select(parent.id);
          },
          onMouseEnter: () => {
            hover.setHover(parent);
          },
          children: [renderIcon(parent), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: {
              transform: 'scale(0.85)',
              marginLeft: 2
            },
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_NodeTitleWidget.NodeTitleWidget, {
              node: parent
            })
          })]
        }, parent.id);
      })
    });
  };
  useMouseHover(ref, () => {
    setExpand(true);
  }, () => {
    setExpand(false);
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    ref: ref,
    className: prefix,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_antd.Button, {
      className: prefix + '-title',
      type: "primary",
      onMouseEnter: () => {
        hover.setHover(node);
      },
      children: [renderIcon(node), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_NodeTitleWidget.NodeTitleWidget, {
          node: node
        })
      })]
    }), expand && renderMenu()]
  });
});
Selector.displayName = 'Selector';