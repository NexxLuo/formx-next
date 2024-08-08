"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DesignerToolsWidget = void 0;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _reactiveReact = require("@formily/reactive-react");
var _core = require("@designable/core");
var _hooks = require("../../hooks");
var _IconWidget = require("../IconWidget");
var _classnames = _interopRequireDefault(require("classnames"));
require("./styles.less");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const DesignerToolsWidget = exports.DesignerToolsWidget = (0, _reactiveReact.observer)(props => {
  const screen = (0, _hooks.useScreen)();
  const cursor = (0, _hooks.useCursor)();
  const workbench = (0, _hooks.useWorkbench)();
  const history = (0, _hooks.useHistory)();
  const sizeRef = (0, _react.useRef)({});
  const prefix = (0, _hooks.usePrefix)('designer-tools');
  const renderHistoryController = () => {
    if (!props.use.includes('HISTORY')) return null;
    return /*#__PURE__*/_react.default.createElement(_antd.Button.Group, {
      size: "small",
      style: {
        marginRight: 20
      }
    }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      size: "small",
      disabled: !history?.allowUndo,
      onClick: () => {
        history.undo();
      }
    }, /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
      infer: "Undo"
    })), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      size: "small",
      disabled: !history?.allowRedo,
      onClick: () => {
        history.redo();
      }
    }, /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
      infer: "Redo"
    })));
  };
  const renderCursorController = () => {
    if (workbench.type !== 'DESIGNABLE') return null;
    if (!props.use.includes('CURSOR')) return null;
    return /*#__PURE__*/_react.default.createElement(_antd.Button.Group, {
      size: "small",
      style: {
        marginRight: 20
      }
    }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      size: "small",
      disabled: cursor.type === _core.CursorType.Move,
      onClick: () => {
        cursor.setType(_core.CursorType.Move);
      }
    }, /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
      infer: "Move"
    })), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      size: "small",
      disabled: cursor.type === _core.CursorType.Selection,
      onClick: () => {
        cursor.setType(_core.CursorType.Selection);
      }
    }, /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
      infer: "Selection"
    })));
  };
  const renderResponsiveController = () => {
    if (!props.use.includes('SCREEN_TYPE')) return null;
    if (screen.type !== _core.ScreenType.Responsive) return null;
    return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.InputNumber, {
      size: "small",
      value: screen.width,
      style: {
        width: 70,
        textAlign: 'center'
      },
      onChange: value => {
        sizeRef.current.width = value;
      },
      onPressEnter: () => {
        screen.setSize(sizeRef.current.width, screen.height);
      }
    }), /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
      size: 10,
      infer: "Close",
      style: {
        padding: '0 3px',
        color: '#999'
      }
    }), /*#__PURE__*/_react.default.createElement(_antd.InputNumber, {
      value: screen.height,
      size: "small",
      style: {
        width: 70,
        textAlign: 'center',
        marginRight: 10
      },
      onChange: value => {
        sizeRef.current.height = value;
      },
      onPressEnter: () => {
        screen.setSize(screen.width, sizeRef.current.height);
      }
    }), (screen.width !== '100%' || screen.height !== '100%') && /*#__PURE__*/_react.default.createElement(_antd.Button, {
      size: "small",
      style: {
        marginRight: 20
      },
      onClick: () => {
        screen.resetSize();
      }
    }, /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
      infer: "Recover"
    })));
  };
  const renderScreenTypeController = () => {
    if (!props.use.includes('SCREEN_TYPE')) return null;
    return /*#__PURE__*/_react.default.createElement(_antd.Button.Group, {
      size: "small",
      style: {
        marginRight: 20
      }
    }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      size: "small",
      disabled: screen.type === _core.ScreenType.PC,
      onClick: () => {
        screen.setType(_core.ScreenType.PC);
      }
    }, /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
      infer: "PC"
    })), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      size: "small",
      disabled: screen.type === _core.ScreenType.Mobile,
      onClick: () => {
        screen.setType(_core.ScreenType.Mobile);
      }
    }, /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
      infer: "Mobile"
    })), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      size: "small",
      disabled: screen.type === _core.ScreenType.Responsive,
      onClick: () => {
        screen.setType(_core.ScreenType.Responsive);
      }
    }, /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
      infer: "Responsive"
    })));
  };
  const renderMobileController = () => {
    if (!props.use.includes('SCREEN_TYPE')) return null;
    if (screen.type !== _core.ScreenType.Mobile) return;
    return /*#__PURE__*/_react.default.createElement(_antd.Button, {
      size: "small",
      style: {
        marginRight: 20
      },
      onClick: () => {
        screen.setFlip(!screen.flip);
      }
    }, /*#__PURE__*/_react.default.createElement(_IconWidget.IconWidget, {
      infer: "Flip",
      style: {
        transition: 'all .15s ease-in',
        transform: screen.flip ? 'rotate(-90deg)' : ''
      }
    }));
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    style: props.style,
    className: (0, _classnames.default)(prefix, props.className)
  }, renderHistoryController(), renderCursorController(), renderScreenTypeController(), renderMobileController(), renderResponsiveController());
});
DesignerToolsWidget.defaultProps = {
  use: ['HISTORY', 'CURSOR', 'SCREEN_TYPE']
};