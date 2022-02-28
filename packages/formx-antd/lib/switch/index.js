"use strict";

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Switch = void 0;

var antd_1 = require("antd");

var react_1 = require("@formily/react");

exports.Switch = (0, react_1.connect)(antd_1.Switch, (0, react_1.mapProps)({
  value: 'checked'
}, function (props) {
  var _onChange = props.onChange;
  delete props['value'];
  return __assign(__assign({}, props), {
    onChange: function onChange(checked) {
      _onChange === null || _onChange === void 0 ? void 0 : _onChange(checked, null);
    }
  });
}));
exports.default = exports.Switch;