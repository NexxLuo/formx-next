"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePrefixCls = void 0;

var usePrefixCls = function usePrefixCls(tag, props) {
  return ((props === null || props === void 0 ? void 0 : props.prefixCls) || "ant-") + tag;
};

exports.usePrefixCls = usePrefixCls;