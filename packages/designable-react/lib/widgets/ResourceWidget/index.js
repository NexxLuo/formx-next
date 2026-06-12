"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResourceWidget = void 0;
var _react = _interopRequireWildcard(require("react"));
var _core = require("@designable/core");
var _shared = require("@designable/shared");
var _observer = require("../../observer");
var _hooks = require("../../hooks");
var _IconWidget = require("../IconWidget");
var _TextWidget = require("../TextWidget");
var _classnames = _interopRequireDefault(require("classnames"));
require("./styles.less");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// @ts-nocheck

const ResourceWidget = exports.ResourceWidget = (0, _observer.observer)(props => {
  const prefix = (0, _hooks.usePrefix)('resource');
  const [expand, setExpand] = (0, _react.useState)(props.defaultExpand);
  const renderNode = source => {
    const {
      node,
      icon,
      title,
      thumb,
      span
    } = source;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: prefix + '-item',
      style: {
        gridColumnStart: `span ${span || 1}`
      },
      "data-designer-source-id": node.id,
      children: [thumb && /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
        className: prefix + '-item-thumb',
        src: thumb
      }), icon && /*#__PURE__*/_react.default.isValidElement(icon) ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
        children: icon
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconWidget.IconWidget, {
        className: prefix + '-item-icon',
        infer: icon,
        style: {
          width: 150,
          height: 40
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: prefix + '-item-text',
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TextWidget.TextWidget, {
          children: title || node.children[0]?.getMessage('title')
        })
      })]
    }, node.id);
  };
  const sources = props.sources.reduce((buf, source) => {
    if ((0, _core.isResourceList)(source)) {
      return buf.concat(source);
    } else if ((0, _core.isResourceHost)(source)) {
      return buf.concat(source.Resource);
    }
    return buf;
  }, []);
  let children = null;
  if (typeof props.renderContent === "function") {
    children = props.renderContent(props.itemData, expand);
  } else {
    children = sources.map((0, _shared.isFn)(props.children) ? props.children : renderNode);
  }
  const remainItems = sources.reduce((length, source) => {
    return length + (source.span ?? 1);
  }, 0) % 3;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: (0, _classnames.default)(prefix, props.className, {
      expand
    }),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: prefix + '-header',
      onClick: e => {
        e.stopPropagation();
        e.preventDefault();
        setExpand(!expand);
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: prefix + '-header-expand',
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconWidget.IconWidget, {
          infer: "Expand",
          size: 10
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: prefix + '-header-content',
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TextWidget.TextWidget, {
          children: props.title
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: prefix + '-content-wrapper',
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: prefix + '-content',
        children: [children, remainItems ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: prefix + '-item-remain',
          style: {
            gridColumnStart: `span ${3 - remainItems}`
          }
        }) : null]
      })
    })]
  });
});
ResourceWidget.defaultProps = {
  defaultExpand: true
};