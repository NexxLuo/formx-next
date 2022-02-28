"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Radio = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@formily/react");

var _antd = require("antd");

var _formxAntd = require("@nvwa/formx-antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Radio = (0, _react2.connect)(_antd.Radio, (0, _react2.mapProps)({
  value: "checked",
  onInput: "onChange"
}));
exports.Radio = Radio;
Radio.__ANT_RADIO = true;
Radio.Group = (0, _react2.connect)(_antd.Radio.Group, (0, _react2.mapProps)({
  dataSource: "options"
}, function (props) {
  if (props.optionType === "button") {
    var childrens = (props.options || []).map(function (d) {
      return /*#__PURE__*/_react.default.createElement(_antd.Radio.Button, {
        key: d.value.toString(),
        value: d.value
      }, d.label);
    });
    return {
      options: undefined,
      children: childrens
    };
  }

  return {};
}), (0, _react2.mapReadPretty)(_formxAntd.PreviewText.Select));
var _default = Radio;
exports.default = _default;