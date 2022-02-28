"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberPicker = void 0;

var react_1 = require("@formily/react");

var antd_1 = require("antd");

var preview_text_1 = require("../preview-text");

exports.NumberPicker = (0, react_1.connect)(antd_1.InputNumber, (0, react_1.mapReadPretty)(preview_text_1.PreviewText.Input));
exports.default = exports.NumberPicker;