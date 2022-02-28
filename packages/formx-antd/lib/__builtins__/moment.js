"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatMomentValue = exports.momentable = void 0;

var shared_1 = require("@formily/shared");

var moment_1 = __importDefault(require("moment"));

var momentable = function momentable(value, format) {
  return Array.isArray(value) ? value.map(function (val) {
    return (0, moment_1.default)(val, format);
  }) : value ? (0, moment_1.default)(value, format) : value;
};

exports.momentable = momentable;

var formatMomentValue = function formatMomentValue(value, format, placeholder) {
  var formatDate = function formatDate(date, format, i) {
    if (i === void 0) {
      i = 0;
    }

    if (!date) return placeholder;

    if ((0, shared_1.isArr)(format)) {
      var _format = format[i];

      if ((0, shared_1.isFn)(_format)) {
        return _format(date);
      }

      return (date === null || date === void 0 ? void 0 : date.format) ? date.format(_format) : date;
    } else {
      if ((0, shared_1.isFn)(format)) {
        return format(date);
      }

      return (date === null || date === void 0 ? void 0 : date.format) ? date.format(format) : date;
    }
  };

  if ((0, shared_1.isArr)(value)) {
    return value.map(function (val, index) {
      return formatDate(val, format, index);
    });
  } else {
    return value ? formatDate(value, format) : value || placeholder;
  }
};

exports.formatMomentValue = formatMomentValue;