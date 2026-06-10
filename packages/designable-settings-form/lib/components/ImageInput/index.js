"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageInput = exports.BackgroundImageInput = void 0;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _designableReact = require("@platform/designable-react");
var _context = require("../../shared/context");
var _classnames = _interopRequireDefault(require("classnames"));
require("./styles.less");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const ImageInput = ({
  className,
  style,
  ...props
}) => {
  const prefix = (0, _designableReact.usePrefix)('image-input');
  const context = (0, _react.useContext)(_context.SettingsFormContext);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(prefix, className),
    style: style
  }, /*#__PURE__*/_react.default.createElement(_antd.Input, _extends({}, props, {
    onChange: e => {
      props.onChange?.(e?.target?.['value']);
    },
    prefix: /*#__PURE__*/_react.default.createElement(_antd.Upload, {
      action: context.uploadAction,
      onChange: params => {
        const response = params.file?.response;
        const url = response?.url || response?.downloadURL || response?.imageURL || response?.thumbUrl;
        if (!url) return;
        props.onChange?.(url);
      }
    }, /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
      infer: "CloudUpload",
      style: {
        cursor: 'pointer'
      }
    }))
  })));
};
exports.ImageInput = ImageInput;
const BackgroundImageInput = props => {
  const addBgValue = value => {
    if (/url\([^)]+\)/.test(value)) {
      return value;
    }
    return `url(${value})`;
  };
  const removeBgValue = value => {
    const matched = String(value).match(/url\(\s*([^)]+)\s*\)/);
    if (matched?.[1]) {
      return matched?.[1];
    }
    return value;
  };
  return /*#__PURE__*/_react.default.createElement(ImageInput, {
    value: removeBgValue(props.value),
    onChange: url => {
      props.onChange?.(addBgValue(url));
    }
  });
};
exports.BackgroundImageInput = BackgroundImageInput;