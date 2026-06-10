"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolbarPanel = void 0;
var _react = _interopRequireDefault(require("react"));
var _WorkspacePanel = require("./WorkspacePanel");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const ToolbarPanel = props => {
  return /*#__PURE__*/_react.default.createElement(_WorkspacePanel.WorkspacePanel.Item, _extends({}, props, {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 4,
      padding: '0 4px',
      ...props.style
    }
  }), props.children);
};
exports.ToolbarPanel = ToolbarPanel;