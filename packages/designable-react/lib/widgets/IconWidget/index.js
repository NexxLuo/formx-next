"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconWidget = void 0;
var _react = _interopRequireWildcard(require("react"));
var _shared = require("@designable/shared");
var _reactiveReact = require("@formily/reactive-react");
var _antd = require("antd");
var _hooks = require("../../hooks");
var _classnames = _interopRequireDefault(require("classnames"));
require("./styles.less");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const IconContext = /*#__PURE__*/(0, _react.createContext)(null);
const isNumSize = val => /^[\d.]+$/.test(val);
const IconWidget = exports.IconWidget = (0, _reactiveReact.observer)(props => {
  const theme = (0, _hooks.useTheme)();
  const context = (0, _react.useContext)(IconContext);
  const registry = (0, _hooks.useRegistry)();
  const prefix = (0, _hooks.usePrefix)('icon');
  const size = props.size || '1em';
  const height = props.style?.height || size;
  const width = props.style?.width || size;
  const takeIcon = infer => {
    if ((0, _shared.isStr)(infer)) {
      const finded = registry.getDesignerIcon(infer);
      if (finded) {
        return takeIcon(finded);
      }
      return /*#__PURE__*/_react.default.createElement("img", {
        src: infer,
        height: height,
        width: width
      });
    } else if ((0, _shared.isFn)(infer)) {
      return /*#__PURE__*/_react.default.createElement(infer, {
        height,
        width,
        fill: 'currentColor'
      });
    } else if ( /*#__PURE__*/_react.default.isValidElement(infer)) {
      if (infer.type === 'svg') {
        return /*#__PURE__*/_react.default.cloneElement(infer, {
          height,
          width,
          fill: 'currentColor',
          viewBox: infer.props.viewBox || '0 0 1024 1024',
          focusable: 'false',
          'aria-hidden': 'true'
        });
      } else if (infer.type === 'path' || infer.type === 'g') {
        return /*#__PURE__*/_react.default.createElement("svg", {
          viewBox: "0 0 1024 1024",
          height: height,
          width: width,
          fill: "currentColor",
          focusable: "false",
          "aria-hidden": "true"
        }, infer);
      }
      return infer;
    } else if ((0, _shared.isPlainObj)(infer)) {
      if (infer[theme]) {
        return takeIcon(infer[theme]);
      } else if (infer['shadow']) {
        return /*#__PURE__*/_react.default.createElement(IconWidget.ShadowSVG, {
          width: width,
          height: height,
          content: infer['shadow']
        });
      }
      return null;
    }
  };
  const renderTooltips = children => {
    if (!(0, _shared.isStr)(props.infer) && context?.tooltip) return children;
    const tooltip = props.tooltip || registry.getDesignerMessage(`icons.${props.infer}`);
    if (tooltip) {
      const title = /*#__PURE__*/_react.default.isValidElement(tooltip) || (0, _shared.isStr)(tooltip) ? tooltip : tooltip.title;
      const props = /*#__PURE__*/_react.default.isValidElement(tooltip) || (0, _shared.isStr)(tooltip) ? {} : (0, _shared.isObj)(tooltip) ? tooltip : {};
      return /*#__PURE__*/_react.default.createElement(_antd.Tooltip, _extends({}, props, {
        title: title
      }), children);
    }
    return children;
  };
  if (!props.infer) return null;
  return renderTooltips( /*#__PURE__*/_react.default.createElement("span", _extends({}, props, {
    className: (0, _classnames.default)(prefix, props.className),
    style: {
      ...props.style,
      cursor: props.onClick ? 'pointer' : props.style?.cursor
    }
  }), takeIcon(props.infer)));
});
IconWidget.ShadowSVG = props => {
  const ref = (0, _react.useRef)();
  const width = isNumSize(props.width) ? `${props.width}px` : props.width;
  const height = isNumSize(props.height) ? `${props.height}px` : props.height;
  (0, _react.useEffect)(() => {
    if (ref.current) {
      const root = ref.current.attachShadow({
        mode: 'open'
      });
      root.innerHTML = `<svg viewBox="0 0 1024 1024" style="width:${width};height:${height}">${props.content}</svg>`;
    }
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: ref
  });
};
IconWidget.Provider = props => {
  return /*#__PURE__*/_react.default.createElement(IconContext.Provider, {
    value: props
  }, props.children);
};