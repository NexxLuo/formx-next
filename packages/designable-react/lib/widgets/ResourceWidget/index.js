"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResourceWidget = void 0;
var _react = _interopRequireWildcard(require("react"));
var _core = require("@designable/core");
var _shared = require("@designable/shared");
var _reactiveReact = require("@formily/reactive-react");
var _hooks = require("../../hooks");
var _IconWidget = require("../IconWidget");
var _TextWidget = require("../TextWidget");
var _classnames = _interopRequireDefault(require("classnames"));
require("./styles.less");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ResourceWidget = exports.ResourceWidget = (0, _reactiveReact.observer)(props => {
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
    return /*#__PURE__*/_react.default.createElement("div", {
      className: prefix + '-item',
      style: {
        gridColumnStart: `span ${span || 1}`
      },
      key: node.id,
      "data-designer-source-id": node.id
    }, thumb && /*#__PURE__*/_react.default.createElement("img", {
      className: prefix + '-item-thumb',
      src: thumb
    }), icon && /*#__PURE__*/_react.default.isValidElement(icon) ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, icon) : /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
      className: prefix + '-item-icon',
      infer: icon,
      style: {
        width: 150,
        height: 40
      }
    }), /*#__PURE__*/_react.default.createElement("span", {
      className: prefix + '-item-text'
    }, /*#__PURE__*/_react.default.createElement(_TextWidget.TextWidget, null, title || node.children[0]?.getMessage('title'))));
  };
  const sources = props.sources.reduce((buf, source) => {
    if ((0, _core.isResourceList)(source)) {
      return buf.concat(source);
    } else if ((0, _core.isResourceHost)(source)) {
      return buf.concat(source.Resource);
    }
    return buf;
  }, []);
  const remainItems = sources.reduce((length, source) => {
    return length + (source.span ?? 1);
  }, 0) % 3;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(prefix, props.className, {
      expand
    })
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-header',
    onClick: e => {
      e.stopPropagation();
      e.preventDefault();
      setExpand(!expand);
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-header-expand'
  }, /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
    infer: "Expand",
    size: 10
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-header-content'
  }, /*#__PURE__*/_react.default.createElement(_TextWidget.TextWidget, null, props.title))), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-content-wrapper'
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-content'
  }, sources.map((0, _shared.isFn)(props.children) ? props.children : renderNode), remainItems ? /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-item-remain',
    style: {
      gridColumnStart: `span ${3 - remainItems}`
    }
  }) : null)));
});
ResourceWidget.defaultProps = {
  defaultExpand: true
};