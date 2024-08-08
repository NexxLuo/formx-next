"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HistoryWidget = void 0;
var _react = _interopRequireDefault(require("react"));
var _dateformat = _interopRequireDefault(require("dateformat"));
var _reactiveReact = require("@formily/reactive-react");
var _hooks = require("../../hooks");
var _TextWidget = require("../TextWidget");
var _classnames = _interopRequireDefault(require("classnames"));
require("./styles.less");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const HistoryWidget = exports.HistoryWidget = (0, _reactiveReact.observer)(() => {
  const workbench = (0, _hooks.useWorkbench)();
  const currentWorkspace = workbench?.activeWorkspace || workbench?.currentWorkspace;
  const prefix = (0, _hooks.usePrefix)('history');
  if (!currentWorkspace) return null;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: prefix
  }, currentWorkspace.history.list().map((item, index) => {
    const type = item.type || 'default_state';
    const token = type.replace(/\:/g, '_');
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(prefix + '-item', {
        active: currentWorkspace.history.current === index
      }),
      key: item.timestamp,
      onClick: () => {
        currentWorkspace.history.goTo(index);
      }
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: prefix + '-item-title'
    }, /*#__PURE__*/_react.default.createElement(_TextWidget.TextWidget, {
      token: `operations.${token}`
    })), /*#__PURE__*/_react.default.createElement("span", {
      className: prefix + '-item-timestamp'
    }, ' ', (0, _dateformat.default)(item.timestamp, 'yy/mm/dd HH:MM:ss')));
  }));
});