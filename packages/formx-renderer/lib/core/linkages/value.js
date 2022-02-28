"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValue = getValue;
exports.linkageValue = linkageValue;
exports.setInitialValue = setInitialValue;

var _utils = require("./utils");

var _utils2 = require("../utils");

var _utils3 = require("../../extensions/utils");

var _useAsyncDataSource = require("../effects/useAsyncDataSource");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function formatState(field) {
  var componentProps = field.component[1] || {};
  var extraProps = componentProps["x-extra-props"];
  return {
    name: field.path.toString(),
    path: field.address.toString(),
    modified: field.modified,
    selfModified: field.selfModified,
    initialValue: field.initialValue,
    value: field.value,
    values: field.inputValues,
    required: field.required,
    extraProps: extraProps,
    componentProps: componentProps,
    componentName: extraProps === null || extraProps === void 0 ? void 0 : extraProps.name
  };
}

function setAsyncValue(name, initialValue, expressionVar, instance) {
  try {
    var apiData = JSON.parse(initialValue.api);
    (0, _useAsyncDataSource.useAsyncValue)(instance, {
      name: name,
      service: _utils3.requestApiById,
      pathVars: expressionVar,
      extra: {
        form: instance,
        id: apiData.dataSourceId,
        input: (0, _utils3.getRequestParams)(apiData.input, instance, {}, _utils.getEnv, {
          index: expressionVar === null || expressionVar === void 0 ? void 0 : expressionVar.items
        }),
        output: apiData.output
      }
    });
  } catch (e) {
    console.error("useAsyncValue error:", e);
  }
}

function _getAsyncValue(instance, expressionVar, apiData) {
  return (0, _useAsyncDataSource.getAsyncValue)(instance, {
    service: _utils3.requestApiById,
    pathVars: expressionVar,
    extra: {
      form: instance,
      id: apiData.dataSourceId,
      input: (0, _utils3.getRequestParams)(apiData.input, instance, {}, _utils.getEnv, {
        index: expressionVar === null || expressionVar === void 0 ? void 0 : expressionVar.items
      }),
      output: apiData.output
    }
  });
}

function getValue(initialValue, instance, expressionVar, _evaluator) {
  var ignoreAsync = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var value = undefined;

  if (_typeof(initialValue) === "object" && initialValue) {
    if (initialValue.type === "const") {
      if (initialValue.const !== "" && initialValue.const !== null) {
        value = initialValue.const;
      }
    } else if (initialValue.type === "expression") {
      //表达式求值
      var res = _evaluator.evaluate(initialValue.expression, expressionVar);

      value = res;
    } else if (initialValue.type === "env") {
      value = (0, _utils.getEnv)(instance, initialValue.env);
    } else if (!ignoreAsync && initialValue.type === "api" && initialValue.api) {
      var apiData = JSON.parse(initialValue.api);

      if (apiData) {
        value = _getAsyncValue(instance, expressionVar, apiData);
      }
    }
  }

  return value;
}

function linkageValue(linkageItem, instance, _evaluator, type) {
  //数据联动
  if (linkageItem.value instanceof Array) {
    linkageItem.value.forEach(function (d) {
      if (type === "api") {
        if (d.type === "api") {
          var state = instance.getFieldState(d.name);

          if (state) {
            var _state$extraProps;

            var _state = formatState(state);

            var initialValue = (_state$extraProps = _state.extraProps) === null || _state$extraProps === void 0 ? void 0 : _state$extraProps.initialValue;
            var expressionVar = (0, _utils.getExpressionVar)(_state.name);
            setAsyncValue(_state.name, initialValue, expressionVar, instance);
          }
        }
      } else if (d.expression) {
        var _expressionVar = (0, _utils.getExpressionVar)(d.name); //执行表达式


        var res = _evaluator.evaluate(d.expression, _expressionVar); //如果表达式返回undefined，则不进行值设置，可通过此方式避免死循环


        if (typeof res !== "undefined") {
          //当目标字段值需要保留小数位时，需进行处理
          instance.setFieldState(d.name, function (s) {
            var _s$componentProps;

            var precision = (_s$componentProps = s.componentProps) === null || _s$componentProps === void 0 ? void 0 : _s$componentProps.precision;

            if (typeof res == "number" && typeof precision === "number") {
              s.value = res.toFixed(precision);
            } else {
              s.value = res;
            }
          });
        }
      }
    });
  }
}

function setInitialValue(schema, instance, _loading, _evaluator) {
  var extraProps = schema.extraProps || {}; //默认值，设置默认值必须在init中，否则可能导致后续组件无法获取到值
  //只有在数据加载完成(loading:false)且外部未传递值时才进行默认值设置，如：新增时取配置的默认值，编辑时直接取外部传递的值

  var initialValue = extraProps.initialValue;
  var name = schema.name;
  var hasValue = typeof schema.value !== "undefined";
  var expressionVar = (0, _utils.getExpressionVar)(name);
  var loading = !!_loading;
  var _initialValue = undefined;

  if (loading === false && hasValue === false && _typeof(initialValue) === "object" && initialValue) {
    if (initialValue.type === "const") {
      if (initialValue.const !== "" && initialValue.const !== null) {
        _initialValue = initialValue.const;
      }
    } else if (initialValue.type === "expression") {
      //表达式求值
      var res = _evaluator.evaluate(initialValue.expression, expressionVar);

      _initialValue = res;
    } else if (initialValue.type === "env") {
      _initialValue = (0, _utils.getEnv)(instance, initialValue.env);
    } else if (initialValue.type === "api" && initialValue.api) {
      setAsyncValue(name, initialValue, expressionVar, instance);
    }

    if (typeof _initialValue !== "undefined") {
      _initialValue = (0, _utils2.transformComponentValue)(schema, _initialValue, instance);
      instance.setFieldState(name, function (s) {
        //如果值已经被修改过，则不再设置默认值，比如表格复制行数据，此时数据已经被修改过，无需再设置默认值
        //visible为false时证明需要隐藏值，也就不应该设置默认值
        if (!s.selfModified && s.display !== "none") {
          var _s$componentProps2;

          var precision = (_s$componentProps2 = s.componentProps) === null || _s$componentProps2 === void 0 ? void 0 : _s$componentProps2.precision;

          if (typeof _initialValue == "number" && typeof precision === "number") {
            _initialValue = _initialValue.toFixed(precision);
          }

          s.value = _initialValue;
        }
      });
    }
  }

  return _initialValue;
}