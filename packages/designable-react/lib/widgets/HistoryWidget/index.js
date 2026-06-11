"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HistoryWidget = void 0;
var _react = _interopRequireDefault(require("react"));
var _dateformat = _interopRequireDefault(require("dateformat"));
var _observer = require("../../observer");
var _hooks = require("../../hooks");
var _TextWidget = require("../TextWidget");
var _classnames = _interopRequireDefault(require("classnames"));
require("./styles.less");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const HistoryWidget = exports.HistoryWidget = (0, _observer.observer)(() => {
  const workbench = (0, _hooks.useWorkbench)();
  const currentWorkspace = workbench?.activeWorkspace || workbench?.currentWorkspace;
  const prefix = (0, _hooks.usePrefix)('history');
  if (!currentWorkspace) return null;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: prefix,
    children: currentWorkspace.history.list().map((item, index) => {
      const type = item.type || 'default_state';
      const token = type.replace(/\:/g, '_');
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: (0, _classnames.default)(prefix + '-item', {
          active: currentWorkspace.history.current === index
        }),
        onClick: () => {
          currentWorkspace.history.goTo(index);
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: prefix + '-item-title',
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TextWidget.TextWidget, {
            token: `operations.${token}`
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
          className: prefix + '-item-timestamp',
          children: [' ', (0, _dateformat.default)(item.timestamp, 'yy/mm/dd HH:MM:ss')]
        })]
      }, item.timestamp);
    })
  });
});