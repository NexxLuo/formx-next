"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linkageDataFill = linkageDataFill;

var _shared = require("@formily/shared");

var _utils = require("./utils");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function formatDataFill(dataFill) {
  var arr = [];
  var childrenToParents = {};

  if (dataFill instanceof Array) {
    dataFill.forEach(function (d) {
      var pathArr = d.field.split(".");
      var parentKey = pathArr.slice(0, pathArr.length - 1).join(".");

      if (parentKey) {
        if (parentKey in childrenToParents) {
          childrenToParents[parentKey].push(d);
        } else {
          childrenToParents[parentKey] = [d];
        }
      }
    });
    dataFill.forEach(function (d) {
      var o = _objectSpread({}, d);

      if (d.type === "arrayItem") {} else if (d.type === "array") {
        var _fieldMap = {};
        var childrens = childrenToParents[d.field] || [];

        if (childrens instanceof Array) {
          childrens.forEach(function (_d) {
            if (_d.field && _d.targetField) {
              var _pathArr = _d.field.split(".");

              var _field = _pathArr[_pathArr.length - 1];

              var _targetPathArr = _d.targetField.split(".");

              var _targetField = _targetPathArr[_targetPathArr.length - 1];
              _fieldMap[_field] = {
                field: _targetField,
                expression: _d.expression
              };
            }
          });
        }

        if (Object.keys(_fieldMap).length > 0) {
          o.fieldMap = _fieldMap;
        }

        arr.push(o);
      } else {
        arr.push(o);
      }
    });
  }

  return arr;
}

function getChildrenGraph(graph, path) {
  var items = [];

  for (var k in graph) {
    if (graph.hasOwnProperty(k)) {
      var g = graph[k];

      if (g.path && g.path !== path && g.path.indexOf(path) > -1) {
        items.push(g);
      }
    }
  }

  return items;
}

function isNum(v) {
  return isNaN(v) === false && v !== null;
}

function isNull(v) {
  var bl = false;

  if (_typeof(v) === "object") {
    if (v instanceof Array) {
      bl = v.length === 0;
    } else {
      bl = v === null;
    }
  } else if (typeof v === "string") {
    bl = !v;
  } else if (typeof v === "number") {
    bl = isNaN(v);
  } else if (typeof v === "undefined") {
    bl = true;
  }

  return bl;
}

function isValidObject(v) {
  if (_typeof(v) === "object") {
    return v !== null || v instanceof Array;
  }

  return false;
}
/**
 * 将 array.items.key1 中的items转换为表格正在编辑中的索引
 * @param {string} path 包含items的路径
 * @param {*} form
 */


function transformArrayItemsPath(path, form, expressionVar) {
  var index = -1;

  if (expressionVar === null || expressionVar === void 0 ? void 0 : expressionVar.items) {
    index = Number(expressionVar.items);
  }

  var _path = path;

  if (index > -1) {
    _path = path.replace(".items.", "." + index + ".");
  }

  return _path;
} //数据回填


function linkageDataFill(instance, schema, _evaluator) {
  var _schema$extraProps;

  var values = schema.values;
  var dataValues = values;

  var _dataFill = (_schema$extraProps = schema.extraProps) === null || _schema$extraProps === void 0 ? void 0 : _schema$extraProps.dataFill;

  var dataFill = formatDataFill(_dataFill);
  var expressionVar = (0, _utils.getExpressionVar)(schema.name);

  if (dataFill instanceof Array && dataFill.length > 0) {
    var _loop = function _loop(i) {
      var d = dataFill[i];
      var targetField = transformArrayItemsPath(d.targetField, instance, expressionVar);
      var field = d.field; //参数索引,默认取onChange中的第三个参数为数据回填的数据源，下拉、字典等组件 第一个参数为value 第二个参数为label

      var parameterIndex = 2;

      if (isNum(d.parameterIndex) && d.parameterIndex > -1) {
        parameterIndex = d.parameterIndex;
      }

      dataValues = values[parameterIndex];

      if (field && targetField) {
        //如果是清空值，则清空数据联动的所有值
        if (isNull(values[0])) {
          instance.setFieldState(targetField, function (s) {
            return s.value = undefined;
          });
          return "continue";
        }

        if (!isValidObject(dataValues)) {
          console.error("Values is not a valid object in index \"".concat(parameterIndex, "\":"), values, schema);
          return "continue";
        }

        var bl = true;
        var value = undefined;

        try {
          if (_shared.FormPath.existIn(dataValues, field)) {
            value = _shared.FormPath.getIn(dataValues, field);
          } else {
            if (d.expression) {
              value = dataValues;
              console.warn("Field path not found:\"".concat(field, "\" in values :"), dataValues, ",will get it from expression.", schema);
            } else {
              bl = false;
              console.error("DataFill execute failed.Field path not found:\"".concat(field, "\" in values :"), dataValues, ",and without any expression.", schema);
            }
          }
        } catch (e) {
          bl = false;
          console.error("DataFill execute failed.Field path pattern error:\"".concat(field, "\""), schema);
        }

        if (bl === true) {
          if (d.expression) {
            value = _evaluator.evaluate(d.expression, {}, {
              value: value
            });
          }

          if (d.fieldMap) {
            //如果存在字段映射，数组类型数据则进行字段对应
            var valueFieldMap = d.fieldMap;

            if (value instanceof Array) {
              value.forEach(function (d) {
                for (var k in valueFieldMap) {
                  var fm = valueFieldMap[k];
                  var _value = d[k];

                  if (fm.expression) {
                    _value = _evaluator.evaluate(fm.expression, {}, d);
                  }

                  d[fm.field] = _value;
                } //避免追加模式，表格rowKey重复


                Reflect.deleteProperty(d, "__KEY__");
              });
            }

            instance.setFieldState(targetField, function (s) {
              var nextValue = [];

              if (d.fillMode === "append") {
                nextValue = [].concat(s.value || []).concat(value);
              } else if (d.fillMode === "prepend") {
                nextValue = [].concat(value).concat(s.value || []);
              } else {
                nextValue = value;
              }

              s.value = nextValue;
            });
          } else {
            instance.setFieldState(targetField, function (s) {
              return s.value = value;
            });
          }
        }
      }
    };

    for (var i = 0; i < dataFill.length; i++) {
      var _ret = _loop(i);

      if (_ret === "continue") continue;
    }
  }
}