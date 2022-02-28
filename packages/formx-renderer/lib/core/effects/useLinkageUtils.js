"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLinkageUtilsSync = exports.useLinkageUtils = void 0;

var _shared = require("@formily/shared");

var _react = require("@formily/react");

var useLinkageUtils = function useLinkageUtils() {
  var _useForm = (0, _react.useForm)(),
      setFieldState = _useForm.setFieldState;

  var linkage = function linkage(key, defaultValue) {
    return function (path, value) {
      return setFieldState(path, function (state) {
        _shared.FormPath.setIn(state, key, value !== undefined ? value : defaultValue);
      });
    };
  };

  return {
    hide: linkage("visible", false),
    show: linkage("visible", true),
    visible: linkage("visible"),
    enum: linkage("enum", []),
    loading: linkage("loading", true),
    loaded: linkage("loading", false),
    value: linkage("value"),
    disable: linkage("componentProps.disabled", false),
    style: linkage("componentProps.style", {})
  };
};

exports.useLinkageUtils = useLinkageUtils;

var useLinkageUtilsSync = function useLinkageUtilsSync(_ref) {
  var setFieldState = _ref.setFieldState;

  var linkage = function linkage(key, defaultValue) {
    return function (path, value) {
      return setFieldState(path, function (state) {
        _shared.FormPath.setIn(state, key, value !== undefined ? value : defaultValue);
      });
    };
  };

  return {
    hide: linkage("visible", false),
    show: linkage("visible", true),
    visible: linkage("visible"),
    enum: linkage("enum", []),
    loading: linkage("loading", true),
    loaded: linkage("loading", false),
    value: linkage("value"),
    disable: linkage("componentProps.disabled", false),
    style: linkage("componentProps.style", {}),
    pagination: linkage("componentProps.pagination", false),
    requestInfo: linkage("componentProps.x-runtime.requestInfo", null)
  };
};

exports.useLinkageUtilsSync = useLinkageUtilsSync;