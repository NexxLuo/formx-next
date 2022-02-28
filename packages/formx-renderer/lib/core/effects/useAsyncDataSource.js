"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAsyncValue = exports.useAsyncRequest = exports.useAsyncListData = exports.useAsyncData = exports.getAsyncValue = void 0;

var _useLinkageUtils = require("./useLinkageUtils");

var _utils = require("../../extensions/utils");

var _utils2 = require("../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function getExpressionVar(name, form) {
  var expressionVar = {};

  if (name && form) {
    var _getItemIndex = (0, _utils2.getItemIndex)(name, form),
        index = _getItemIndex.index;

    if (index > -1) {
      expressionVar.items = index;
    }
  }

  return expressionVar;
}
/**
 * 根据输出参数配置的formater格式化表达式，格式化数据
 * @param {*} data
 * @param {*} output
 * @param {*} form
 * @param {*} name 表单项路径
 * @param {*} pathVars items代表的索引
 * @returns
 */


function formatter(data, output, form, name, pathVars) {
  var _data = [];
  var formatMap = {};
  var hasFormatter = false;
  var fieldMap = {};

  if (output instanceof Array) {
    output.forEach(function (d) {
      if (d.formatter && d.field) {
        hasFormatter = true;
        formatMap[d.field] = d.formatter;

        if (d.fieldMap) {
          fieldMap[d.field] = d.fieldMap;
        }
      }
    });
  }

  if (!hasFormatter) {
    return data;
  }

  var expressionVar = pathVars || getExpressionVar(name, form);
  var evaluator = (0, _utils.createEvaluator)(form);

  if (_typeof(data) === "object" && data !== null) {
    if (data instanceof Array) {
      data.forEach(function (d) {
        var item = _objectSpread({}, d);

        for (var k in d) {
          var _formatter = formatMap[k];

          if (_formatter) {
            var _value = item[k];
            var formatted = evaluator.evaluate(_formatter, expressionVar, _objectSpread(_objectSpread({}, d), {}, {
              value: _value
            }));

            if (typeof formatted !== "undefined") {
              item[k] = formatted;
              var mapKey = fieldMap[k];

              if (mapKey) {
                item[mapKey] = formatted;
              }
            }
          }
        }

        _data.push(item);
      });
    } else {
      var item = _objectSpread({}, data);

      for (var k in data) {
        var _formatter2 = formatMap[k];

        if (_formatter2) {
          var _value = item[k];
          var formatted = evaluator.evaluate(_formatter2, expressionVar, _objectSpread(_objectSpread({}, data), {}, {
            value: _value
          }));

          if (typeof formatted !== "undefined") {
            item[k] = formatted;
            var mapKey = fieldMap[k];

            if (mapKey) {
              item[mapKey] = formatted;
            }
          }
        }
      }

      _data = item;
    }
  } else {
    _data = data;
  }

  return _data;
}

var useAsyncData = function useAsyncData(form, _ref, filter) {
  var name = _ref.name,
      service = _ref.service,
      extra = _ref.extra;
  var notify = form.notify,
      setFieldState = form.setFieldState;
  setFieldState(name, function (state) {
    state.loading = true;
    state.dataSource = [];
    var componentProps = state.componentProps || {};
    state.componentProps = _objectSpread({}, componentProps);
    service(extra).then(function (res) {
      state.loading = false;
      var data = res.data;

      if (typeof filter === "function") {
        data = filter(res.data);
      }

      data = formatter(data, extra.output, form, name);
      state.dataSource = data;
      state.componentProps = _objectSpread({}, componentProps); //请求结束可以dispatch一个自定义事件收尾，方便后续针对该事件做联动

      notify("requestAsyncDataSourceComplete", {
        name: name,
        payload: res
      });
    });
  });
};

exports.useAsyncData = useAsyncData;

var useAsyncListData = function useAsyncListData(form, _ref2) {
  var name = _ref2.name,
      service = _ref2.service,
      extra = _ref2.extra,
      pagination = _ref2.pagination;
  var notify = form.notify,
      setFieldState = form.setFieldState;
  var linkage = (0, _useLinkageUtils.useLinkageUtilsSync)(form);
  setFieldState(name, function (state) {
    state.loading = true;
    state.componentProps.loading = true;
  });
  service(extra, pagination).then(function (res) {
    setFieldState(name, function (state) {
      state.loading = false;
      state.componentProps.loading = false;
      var _data = res.data;
      _data = formatter(_data, extra.output, form, name);
      state.value = _data;
    });
    linkage.requestInfo(name, res === null || res === void 0 ? void 0 : res.requestInfo);

    if (pagination) {
      linkage.pagination(name, {
        total: res.total,
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize
      });
    } //请求结束可以dispatch一个自定义事件收尾，方便后续针对该事件做联动


    notify("requestListDataSourceComplete", {
      name: name,
      payload: res
    });
  });
};

exports.useAsyncListData = useAsyncListData;

var getOutputTargetValues = function getOutputTargetValues(_ref3) {
  var output = _ref3.output,
      pathVars = _ref3.pathVars,
      item = _ref3.item,
      form = _ref3.form;
  var items = {};
  var hasTargetField = false;
  output.forEach(function (d) {
    var k = d.targetField;
    var o = pathVars || {};

    if (k) {
      for (var _k in o) {
        k = k.replace("." + _k + ".", "." + o[_k] + ".");
      }

      hasTargetField = true;
      var field = form.query(k).take(); //如果目标表单项没有值方进行设置，否则会导致被覆盖

      var hasValue = false;

      if (field) {
        hasValue = typeof field.value !== "undefined";
      }

      if (!hasValue) {
        if (_typeof(item) === "object") {
          items[k] = item[d.field];
        } else {
          items[k] = item;
        }
      }
    }
  });
  return {
    values: items,
    hasTargetField: hasTargetField
  };
};

var useAsyncValue = function useAsyncValue(form, _ref4) {
  var pathVars = _ref4.pathVars,
      name = _ref4.name,
      service = _ref4.service,
      extra = _ref4.extra;
  var notify = form.notify,
      setFieldState = form.setFieldState;
  var linkage = (0, _useLinkageUtils.useLinkageUtilsSync)(form);
  setFieldState(name, function (state) {
    state.loading = true;
    service(extra).then(function (res) {
      state.loading = false; //设置值

      var data = res.data;
      data = formatter(data, extra.output, form, name);
      var item = data;
      var output = extra.output;

      if (data instanceof Array) {
        item = data[0];
      }

      if (item && output instanceof Array) {
        var _getOutputTargetValue = getOutputTargetValues({
          pathVars: pathVars,
          output: output,
          item: item,
          form: form
        }),
            items = _getOutputTargetValue.values,
            hasTargetField = _getOutputTargetValue.hasTargetField;

        if (hasTargetField) {
          for (var k in items) {
            linkage.value(k, items[k]);
          }
        }
      } //
      //请求结束可以dispatch一个自定义事件收尾，方便后续针对该事件做联动


      notify("requestAsyncValueComplete", {
        name: name,
        payload: res
      });
    });
  });
};

exports.useAsyncValue = useAsyncValue;

var getAsyncValue = function getAsyncValue(form, _ref5) {
  var pathVars = _ref5.pathVars,
      service = _ref5.service,
      extra = _ref5.extra;
  return new Promise(function (resolve) {
    var _data = null;
    service(extra).then(function (res) {
      //设置值
      var data = res.data;
      data = formatter(data, extra.output, form, pathVars);
      var item = data;
      var output = extra.output;

      if (data instanceof Array) {
        item = data[0];
      }

      if (item && output instanceof Array) {
        var _getOutputTargetValue2 = getOutputTargetValues({
          pathVars: pathVars,
          output: output,
          item: item,
          form: form
        }),
            items = _getOutputTargetValue2.values,
            hasTargetField = _getOutputTargetValue2.hasTargetField;

        if (hasTargetField) {
          var arr = [];

          if (item instanceof Array) {
            arr = item;
          } else {
            arr.push(item);
          }

          arr.forEach(function (d) {
            for (var k in items) {
              d[k] = items[k];
            }
          });
        }

        _data = item;
      } //


      resolve(_data);
    });
  });
};

exports.getAsyncValue = getAsyncValue;

var useAsyncRequest = function useAsyncRequest(_ref6) {
  var service = _ref6.service,
      extra = _ref6.extra,
      resolving = _ref6.resolving,
      resolve = _ref6.resolve,
      reject = _ref6.reject,
      callback = _ref6.callback;

  if (typeof resolving === "function") {
    resolving();
  }

  service(extra).then(function (res) {
    if (typeof callback === "function") {
      callback(res);
    }

    if (res.succeed) {
      if (typeof resolve === "function") {
        resolve();
      }
    } else {
      if (typeof reject === "function") {
        reject();
      }
    }
  });
};

exports.useAsyncRequest = useAsyncRequest;