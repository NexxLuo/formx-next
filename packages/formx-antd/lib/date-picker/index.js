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
exports.DatePicker = void 0;

var react_1 = require("@formily/react");

var antd_1 = require("antd");

var preview_text_1 = require("../preview-text");

var __builtins__1 = require("../__builtins__");

var mapDateFormat = function mapDateFormat() {
  var getDefaultFormat = function getDefaultFormat(props) {
    if (props['picker'] === 'month') {
      return 'YYYY-MM';
    } else if (props['picker'] === 'quarter') {
      return 'YYYY-\\QQ';
    } else if (props['picker'] === 'year') {
      return 'YYYY';
    } else if (props['picker'] === 'week') {
      return 'gggg-wo';
    }

    return props['showTime'] ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
  };

  return function (props) {
    var format = props['format'] || getDefaultFormat(props);
    var _onChange = props.onChange;
    return __assign(__assign({}, props), {
      format: format,
      value: (0, __builtins__1.momentable)(props.value, format === 'gggg-wo' ? 'gggg-ww' : format),
      onChange: function onChange(value) {
        if (_onChange) {
          _onChange((0, __builtins__1.formatMomentValue)(value, format));
        }
      }
    });
  };
};

exports.DatePicker = (0, react_1.connect)(antd_1.DatePicker, (0, react_1.mapProps)(mapDateFormat()), (0, react_1.mapReadPretty)(preview_text_1.PreviewText.DatePicker));
exports.DatePicker.RangePicker = (0, react_1.connect)(antd_1.DatePicker.RangePicker, (0, react_1.mapProps)(mapDateFormat()), (0, react_1.mapReadPretty)(preview_text_1.PreviewText.DateRangePicker));
exports.default = exports.DatePicker;