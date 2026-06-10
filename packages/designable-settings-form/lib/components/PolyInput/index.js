"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPolyInput = createPolyInput;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _designableReact = require("@platform/designable-react");
var _classnames = _interopRequireDefault(require("classnames"));
require("./styles.less");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const isValid = val => val !== undefined && val !== null;
const getEventValue = event => {
  if (event?.target) {
    if (isValid(event.target.value)) return event.target.value;
    if (isValid(event.target.checked)) return event.target.checked;
    return;
  }
  return event;
};
const createTypes = (types, exclude, include) => {
  return types.filter(({
    type
  }) => {
    if (Array.isArray(include) && include.length) {
      return include.includes(type);
    }
    if (Array.isArray(exclude) && exclude.length) {
      return !exclude.includes(type);
    }
    return true;
  });
};
function createPolyInput(polyTypes = []) {
  return ({
    className,
    style,
    value,
    onChange,
    exclude,
    include,
    ...props
  }) => {
    const prefix = (0, _designableReact.usePrefix)('poly-input');
    const types = createTypes(polyTypes, exclude, include);
    const [current, setCurrent] = (0, _react.useState)(types[0]?.type);
    const type = types?.find(({
      type
    }) => type === current);
    const component = type?.component;
    const typesValue = (0, _react.useRef)({});
    (0, _react.useEffect)(() => {
      types?.forEach(({
        checker,
        type
      }) => {
        if (checker(value)) {
          setCurrent(type);
        }
      });
    }, [value]);
    const getNextType = () => {
      const currentIndex = types?.findIndex(({
        type
      }) => type === current);
      const nextIndex = currentIndex + 1 > types?.length - 1 ? 0 : currentIndex + 1;
      return types[nextIndex];
    };
    const transformOnChangeValue = (value, type) => {
      return type?.toChangeValue ? type?.toChangeValue(value) : value;
    };
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(prefix, className),
      style: style
    }, component && /*#__PURE__*/_react.default.createElement("div", {
      className: prefix + '-content'
    }, /*#__PURE__*/_react.default.createElement(component, {
      ...props,
      value: type?.toInputValue ? type?.toInputValue(value) : value,
      onChange: event => {
        const value = getEventValue(event);
        typesValue.current[type?.type] = value;
        onChange?.(transformOnChangeValue(value, type));
      }
    })), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      className: prefix + '-controller',
      style: {
        width: !component ? '100%' : 'auto'
      },
      block: true,
      onClick: () => {
        const nextType = getNextType();
        if (nextType === type) return;
        setCurrent(nextType?.type);
        onChange?.(transformOnChangeValue(typesValue.current[nextType?.type], nextType));
      }
    }, type?.icon ? /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
      infer: type.icon
    }) : type?.title || type?.type));
  };
}