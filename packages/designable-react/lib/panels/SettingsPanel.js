"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsPanel = void 0;
var _react = _interopRequireWildcard(require("react"));
var _shared = require("@designable/shared");
var _reactiveReact = require("@formily/reactive-react");
var _widgets = require("../widgets");
var _hooks = require("../hooks");
var _classnames = _interopRequireDefault(require("classnames"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const SettingsPanel = exports.SettingsPanel = (0, _reactiveReact.observer)(props => {
  const prefix = (0, _hooks.usePrefix)('settings-panel');
  const workbench = (0, _hooks.useWorkbench)();
  const [innerVisible, setInnerVisible] = (0, _react.useState)(true);
  const [pinning, setPinning] = (0, _react.useState)(false);
  const [visible, setVisible] = (0, _react.useState)(true);
  (0, _react.useEffect)(() => {
    if (visible || workbench.type === 'DESIGNABLE') {
      if (!innerVisible) {
        (0, _shared.requestIdle)(() => {
          requestAnimationFrame(() => {
            setInnerVisible(true);
          });
        });
      }
    }
  }, [visible, workbench.type]);
  if (workbench.type !== 'DESIGNABLE') {
    if (innerVisible) setInnerVisible(false);
    return null;
  }
  if (!visible) {
    if (innerVisible) setInnerVisible(false);
    return /*#__PURE__*/_react.default.createElement("div", {
      className: prefix + '-opener',
      onClick: () => {
        setVisible(true);
      }
    }, /*#__PURE__*/_react.default.createElement(_widgets.IconWidget, {
      infer: "Setting",
      size: 20
    }));
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(prefix, {
      pinning
    })
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-header'
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-header-title'
  }, /*#__PURE__*/_react.default.createElement(_widgets.TextWidget, null, props.title)), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-header-actions'
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-header-extra'
  }, props.extra), !pinning && /*#__PURE__*/_react.default.createElement(_widgets.IconWidget, {
    infer: "PushPinOutlined",
    className: prefix + '-header-pin',
    onClick: () => {
      setPinning(!pinning);
    }
  }), pinning && /*#__PURE__*/_react.default.createElement(_widgets.IconWidget, {
    infer: "PushPinFilled",
    className: prefix + '-pin-filled',
    onClick: () => {
      setPinning(!pinning);
    }
  }), /*#__PURE__*/_react.default.createElement(_widgets.IconWidget, {
    infer: "Close",
    className: prefix + '-header-close',
    onClick: () => {
      setVisible(false);
    }
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-body'
  }, innerVisible && props.children));
});