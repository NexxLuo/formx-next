"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePrefix = void 0;
var _useLayout = require("./useLayout");
const usePrefix = (after = '') => {
  return (0, _useLayout.useLayout)()?.prefixCls + after;
};
exports.usePrefix = usePrefix;