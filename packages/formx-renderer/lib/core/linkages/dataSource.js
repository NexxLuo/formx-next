"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linkageDataSource = linkageDataSource;
exports.setInitialDataSource = setInitialDataSource;
exports.setTableDataSource = setTableDataSource;

var _utils = require("./utils");

var _utils2 = require("../utils");

var _utils3 = require("../../extensions/utils");

var _useAsyncDataSource = require("../effects/useAsyncDataSource");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function setTableDataSource(schema, instance, extraParameters, context) {
  var name = schema.name;
  var apiUrl = "";
  var apiId = "";
  var apiOutput = [];
  var apiInput = [];
  var dataSource = {};
  var hasPagination = false;
  var _pagination = {};
  var extraProps = schema.extraProps;

  if (extraProps) {
    if (extraProps.dataSource) {
      dataSource = JSON.parse(extraProps.dataSource);
      var d = dataSource.data || {};

      if (dataSource.type === "api") {
        if (d.api) {
          apiUrl = d.api.url;
          apiId = d.api.dataSourceId;
          apiOutput = d.api.output;
          apiInput = d.api.input;
        }
      }
    }

    if (extraProps.pagination && extraProps.pagination.enabled) {
      hasPagination = true;
      _pagination = {
        pageIndex: 1,
        pageSize: extraProps.pagination.pageSize || 20
      };
    }
  }

  if (extraParameters) {
    if ("pageIndex" in extraParameters) {
      var _extraParameters$page;

      _pagination.pageIndex = (_extraParameters$page = extraParameters.pageIndex) !== null && _extraParameters$page !== void 0 ? _extraParameters$page : 1;
    }

    if ("pageSize" in extraParameters) {
      var _extraParameters$page2;

      _pagination.pageSize = (_extraParameters$page2 = extraParameters.pageSize) !== null && _extraParameters$page2 !== void 0 ? _extraParameters$page2 : 20;
    }
  }

  if (dataSource.type === "api") {
    if (apiUrl || apiId) {
      var envs = {
        pageIndex: 1
      };

      if (hasPagination) {
        if ("pageIndex" in _pagination) {
          envs.pageIndex = _pagination.pageIndex;
        }

        if ("pageSize" in _pagination) {
          envs.pageSize = _pagination.pageSize;
        }
      }

      var requestParams = (0, _utils3.getRequestParams)(apiInput, instance, envs, _utils.getEnv) || {}; //响应数据源加载钩子，已便对请求参数进行定制处理

      instance.notify(name + "_onFieldRequestDataSource", {
        requestParameters: requestParams,
        pagination: _pagination,
        context: context
      }); //

      (0, _useAsyncDataSource.useAsyncListData)(instance, {
        name: name,
        service: _utils3.requestApiById,
        pagination: _pagination,
        extra: {
          form: instance,
          id: apiId,
          runtime: extraParameters,
          input: requestParams,
          output: apiOutput,
          env: envs
        }
      });
    }
  } else if (dataSource.type === "const") {
    if (dataSource.data && dataSource.data.const instanceof Array) {
      instance.setFieldState(name, function (state) {
        state.value = dataSource.data.const;

        if (hasPagination) {
          state.componentProps.pagination = _objectSpread({}, _pagination);
        }
      });
    }
  } else {
    if (hasPagination) {
      instance.setFieldState(name, function (state) {
        state.componentProps.pagination = _objectSpread({}, _pagination);
      });
    }
  }
}
/**
 * 字段挂载完成时，联动数据源
 * @param {*} name
 * @param {*} extraProps
 * @param {*} instance
 * @param {number} triggerIndex 触发联动的行数据索引
 */


function setInitialDataSource(schema, instance, _evaluator, triggerIndex) {
  var _schema$componentName;

  var ctype = (_schema$componentName = schema.componentName) === null || _schema$componentName === void 0 ? void 0 : _schema$componentName.toLowerCase(); //如果由外部控制了禁用，则不进行数据源加载
  //以下情况除外：
  //表格组件、组件属性控制禁用时依然加载数据源

  if (ctype !== "arraytable" && schema.alwaysDisabled === true && schema.requestDataSourceWhenDisabled === false) {
    return;
  }

  var extraProps = schema.extraProps || {};
  var name = schema.name;
  var _dataSource = null;
  var _dataFilterExpr = null;

  if (extraProps) {
    if (extraProps.dataSource) {
      _dataSource = JSON.parse(extraProps.dataSource);
    }

    if (extraProps.dataFilter) {
      _dataFilterExpr = extraProps.dataFilter.expression;
    }
  }

  if (_typeof(_dataSource) === "object" && _dataSource) {
    if (_dataSource.type === "const") {
      if (ctype === "arraytable") {
        setTableDataSource(schema, instance, {}, {
          triggerType: "effects"
        });
      }
    } else if (_dataSource.type === "formItem") {
      var _dataSource$data, _dataSource$data2;

      var fields = (_dataSource$data = _dataSource.data) === null || _dataSource$data === void 0 ? void 0 : _dataSource$data.formItemFields;
      var formItem = (_dataSource$data2 = _dataSource.data) === null || _dataSource$data2 === void 0 ? void 0 : _dataSource$data2.formItem;
      var valueList = [];
      var values = [];

      if (formItem) {
        var formItemState = instance.getFieldState(formItem);

        if (formItemState) {
          var _formItemState$compon, _formItemState$compon2, _formItemState$compon3;

          var formItemType = (_formItemState$compon = formItemState.component[1]) === null || _formItemState$compon === void 0 ? void 0 : (_formItemState$compon2 = _formItemState$compon["x-extra-props"]) === null || _formItemState$compon2 === void 0 ? void 0 : (_formItemState$compon3 = _formItemState$compon2.name) === null || _formItemState$compon3 === void 0 ? void 0 : _formItemState$compon3.toLowerCase();

          if (formItemType === "arraytable") {
            values = formItemState.value;
          } else {
            values = formItemState.dataSource;
          }
        }
      }

      if (fields instanceof Array && values instanceof Array) {
        valueList = values.map(function (item) {
          var newItem = _objectSpread({}, item);

          fields.forEach(function (d) {
            if (d.field) {
              if (d.fieldMap) {
                var _newItem$d$field;

                newItem[d.fieldMap] = (_newItem$d$field = newItem[d.field]) !== null && _newItem$d$field !== void 0 ? _newItem$d$field : "";
              }

              if (d.targetField) {
                var _getItemIndex = (0, _utils2.getItemIndex)(d.targetField),
                    dataIndex = _getItemIndex.dataIndex;

                if (dataIndex) {
                  var _newItem$d$field2;

                  newItem[dataIndex] = (_newItem$d$field2 = newItem[d.field]) !== null && _newItem$d$field2 !== void 0 ? _newItem$d$field2 : "";
                }
              }
            }
          });
          return newItem;
        });
        instance.setFieldState(name, function (s) {
          var _s$componentProps, _s$componentProps$xE, _s$componentProps$xE$;

          var _ctype = (_s$componentProps = s.componentProps) === null || _s$componentProps === void 0 ? void 0 : (_s$componentProps$xE = _s$componentProps["x-extra-props"]) === null || _s$componentProps$xE === void 0 ? void 0 : (_s$componentProps$xE$ = _s$componentProps$xE.name) === null || _s$componentProps$xE$ === void 0 ? void 0 : _s$componentProps$xE$.toLowerCase();

          if (_ctype === "arraytable") {
            s.value = valueList;
          } else {
            s.dataSource = valueList;
          }
        });
      }
    } else if (_dataSource.type === "api") {
      if (ctype === "arraytable") {
        setTableDataSource(schema, instance, {}, {
          triggerType: "effects"
        });
      } else {
        var _dataSource$data3;

        var apiUrl = "";
        var apiId = "";
        var apiOutput = [];
        var apiInput = [];
        var apiData = (_dataSource$data3 = _dataSource.data) === null || _dataSource$data3 === void 0 ? void 0 : _dataSource$data3.api;

        if (apiData) {
          apiUrl = apiData.url;
          apiId = apiData.dataSourceId;
          apiOutput = apiData.output;
          apiInput = apiData.input;
        }

        if (apiUrl || apiId) {
          (0, _useAsyncDataSource.useAsyncData)(instance, {
            name: name,
            service: _utils3.requestApiById,
            extra: {
              form: instance,
              id: apiId,
              input: (0, _utils3.getRequestParams)(apiInput, instance, {}, _utils.getEnv, {
                index: triggerIndex
              }),
              output: apiOutput
            }
          }, function (data) {
            if (data instanceof Array && _dataFilterExpr) {
              var arr = data.filter(function (d) {
                var res = _evaluator.evaluate(_dataFilterExpr, {}, d);

                return res;
              });
              return arr;
            }

            return data;
          });
        }
      }
    }
  }
}

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
/**
 * 关联字段修改时,联动数据源
 * @param {*} name
 * @param {*} values
 */


function linkageDataSource(schema, linkageItem, instance, dataSourceType) {
  var fieldActionTargetMap = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  var _evaluator = arguments.length > 5 ? arguments[5] : undefined;

  var _getItemIndex2 = (0, _utils2.getItemIndex)(schema.path),
      triggerIndex = _getItemIndex2.index;

  var linkageItemDataSource = [];

  if (linkageItem.dataSource instanceof Array) {
    linkageItemDataSource = linkageItem.dataSource;
  } //过滤掉指定了表单项动作执行查询的数据源控件，如果绑定了查询动作，则不在onChange时触发api请求
  //比如：比如表格如果被指定了一个按钮或搜索框进行数据查询，则其所有表单项参数change时都不会联动触发数据源请求，只会在点击按钮或点击搜索时触发


  if (linkageItemDataSource.length > 0 && dataSourceType === "api") {
    linkageItemDataSource = linkageItemDataSource.filter(function (d) {
      var actionTarget = fieldActionTargetMap[d.name];

      if (actionTarget instanceof Array && actionTarget.findIndex(function (_d) {
        return _d.type === "queryData";
      }) > -1) {
        return false;
      }

      return true;
    });
  } //


  linkageItemDataSource.forEach(function (d) {
    if (d.dataSourceType === dataSourceType) {
      var state = instance.getFieldState(d.name);

      if (state) {
        var _schema = formatState(state);

        setInitialDataSource(_schema, instance, _evaluator, triggerIndex);
      }
    }
  });
}