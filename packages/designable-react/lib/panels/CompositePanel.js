"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompositePanel = void 0;
var _react = _interopRequireWildcard(require("react"));
var _shared = require("@designable/shared");
var _classnames = _interopRequireDefault(require("classnames"));
var _widgets = require("../widgets");
var _hooks = require("../hooks");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const parseItems = children => {
  const items = [];
  _react.default.Children.forEach(children, (child, index) => {
    if (child?.['type'] === CompositePanel.Item) {
      items.push({
        key: child['key'] ?? index,
        ...child['props']
      });
    }
  });
  return items;
};
const findItem = (items, key) => {
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    if (key === index) return item;
    if (key === item.key) return item;
  }
};
const getDefaultKey = children => {
  const items = parseItems(children);
  return items?.[0].key;
};
const CompositePanel = props => {
  const prefix = (0, _hooks.usePrefix)('composite-panel');
  const [activeKey, setActiveKey] = (0, _react.useState)(props.defaultActiveKey ?? getDefaultKey(props.children));
  const activeKeyRef = (0, _react.useRef)(null);
  const [pinning, setPinning] = (0, _react.useState)(props.defaultPinning ?? false);
  const [visible, setVisible] = (0, _react.useState)(props.defaultOpen ?? true);
  const items = parseItems(props.children);
  const currentItem = findItem(items, activeKey);
  const content = currentItem?.children;
  activeKeyRef.current = activeKey;
  (0, _react.useEffect)(() => {
    if ((0, _shared.isValid)(props.activeKey)) {
      if (props.activeKey !== activeKeyRef.current) {
        setActiveKey(props.activeKey);
      }
    }
  }, [props.activeKey]);
  const renderContent = () => {
    if (!content || !visible) return;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(prefix + '-tabs-content', {
        pinning
      })
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: prefix + '-tabs-header'
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: prefix + '-tabs-header-title'
    }, /*#__PURE__*/_react.default.createElement(_widgets.TextWidget, null, currentItem.title)), /*#__PURE__*/_react.default.createElement("div", {
      className: prefix + '-tabs-header-actions'
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: prefix + '-tabs-header-extra'
    }, currentItem.extra), !pinning && /*#__PURE__*/_react.default.createElement(_widgets.IconWidget, {
      infer: "PushPinOutlined",
      className: prefix + '-tabs-header-pin',
      onClick: () => {
        setPinning(!pinning);
      }
    }), pinning && /*#__PURE__*/_react.default.createElement(_widgets.IconWidget, {
      infer: "PushPinFilled",
      className: prefix + '-tabs-header-pin-filled',
      onClick: () => {
        setPinning(!pinning);
      }
    }), /*#__PURE__*/_react.default.createElement(_widgets.IconWidget, {
      infer: "Close",
      className: prefix + '-tabs-header-close',
      onClick: () => {
        setVisible(false);
      }
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: prefix + '-tabs-body'
    }, content));
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(prefix, {
      [`direction-${props.direction}`]: !!props.direction
    })
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-tabs'
  }, items.map((item, index) => {
    const takeTab = () => {
      if (item.href) {
        return /*#__PURE__*/_react.default.createElement("a", {
          href: item.href
        }, item.icon);
      }
      return /*#__PURE__*/_react.default.createElement(_widgets.IconWidget, {
        tooltip: props.showNavTitle ? null : {
          title: /*#__PURE__*/_react.default.createElement(_widgets.TextWidget, null, item.title),
          placement: props.direction === 'right' ? 'left' : 'right'
        },
        infer: item.icon
      });
    };
    const shape = item.shape ?? 'tab';
    const Comp = shape === 'link' ? 'a' : 'div';
    return /*#__PURE__*/_react.default.createElement(Comp, {
      className: (0, _classnames.default)(prefix + '-tabs-pane', {
        active: activeKey === item.key
      }),
      key: index,
      href: item.href,
      onClick: e => {
        if (shape === 'tab') {
          if (activeKey === item.key) {
            setVisible(!visible);
          } else {
            setVisible(true);
          }
          if (!props?.activeKey || !props?.onChange) setActiveKey(item.key);
        }
        item.onClick?.(e);
        props.onChange?.(item.key);
      }
    }, takeTab(), props.showNavTitle && item.title ? /*#__PURE__*/_react.default.createElement("div", {
      className: prefix + '-tabs-pane-title'
    }, /*#__PURE__*/_react.default.createElement(_widgets.TextWidget, null, item.title)) : null);
  })), renderContent());
};
exports.CompositePanel = CompositePanel;
CompositePanel.Item = () => {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
};