"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FoldItem = void 0;
var _react = _interopRequireWildcard(require("react"));
var _formxAntd = require("@platform/formx-antd");
var _react2 = require("@formily/react");
var _reactive = require("@formily/reactive");
var _designableReact = require("@platform/designable-react");
var _classnames = _interopRequireDefault(require("classnames"));
require("./styles.less");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ExpandedMap = new Map();
const FoldItem = exports.FoldItem = (0, _react2.observer)(({
  className,
  style,
  children,
  ...props
}) => {
  const prefix = (0, _designableReact.usePrefix)('fold-item');
  const field = (0, _react2.useField)();
  const expand = (0, _react.useMemo)(() => _reactive.observable.ref(ExpandedMap.get(field.address.toString())), []);
  const slots = (0, _react.useRef)({
    base: null,
    extra: null
  });
  _react.default.Children.forEach(children, node => {
    if ( /*#__PURE__*/_react.default.isValidElement(node)) {
      let _node = node;
      if (_node?.['type']?.['displayName'] === 'FoldItem.Base') {
        slots.current.base = _node['props'].children;
      }
      if (_node?.['type']?.['displayName'] === 'FoldItem.Extra') {
        slots.current.extra = _node['props'].children;
      }
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: (0, _classnames.default)(prefix, className),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: prefix + '-base',
      onClick: () => {
        expand.value = !expand.value;
        ExpandedMap.set(field.address.toString(), expand.value);
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_formxAntd.FormItem.BaseItem, {
        ...props,
        label: /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
          className: (0, _classnames.default)(prefix + '-title', {
            expand: expand.value
          }),
          children: [slots.current.extra && /*#__PURE__*/(0, _jsxRuntime.jsx)(_designableReact.IconWidget, {
            infer: "Expand",
            size: 10
          }), props.label]
        }),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            width: '100%'
          },
          onClick: e => {
            e.stopPropagation();
          },
          children: slots.current.base
        })
      })
    }), expand.value && slots.current.extra && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: prefix + '-extra',
      children: slots.current.extra
    })]
  });
});
const Base = () => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.Fragment, {});
};
Base.displayName = 'FoldItem.Base';
const Extra = () => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.Fragment, {});
};
Extra.displayName = 'FoldItem.Extra';
FoldItem.Base = Base;
FoldItem.Extra = Extra;