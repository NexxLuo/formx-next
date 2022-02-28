"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEvaluator = createEvaluator;
exports.getApiFieldValue = void 0;
exports.getLabelMap = getLabelMap;
exports.getRequestParams = getRequestParams;
exports.isMobile = isMobile;
exports.isResponsiveSizeSmall = isResponsiveSizeSmall;
exports.requestValidateApiById = exports.requestPostApiById = exports.requestApiById = void 0;
exports.setTableErrorsToExtraField = setTableErrorsToExtraField;
exports.transformCardToTab = transformCardToTab;

var _expression = require("../core/expression");

var _utils = require("../core/utils");

var _excluded = ["children"];

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function createEvaluator(form, options) {
  function getEnv(k, injectEnvs) {
    try {
      if (_typeof(injectEnvs) === "object" && injectEnvs && injectEnvs.hasOwnProperty(k)) {
        return injectEnvs[k];
      }

      var formActions = form.getFormState().formActions;
      return formActions.formEnvs.getItemValue(k);
    } catch (error) {
      console.error("get environment value error :", error);
      return null;
    }
  }

  function callFunc() {
    var formActions = form.getFormState().formActions;

    try {
      return formActions.formFunction.call.apply(null, arguments);
    } catch (error) {
      console.error("call custom function error:", error);
      return null;
    }
  } //创建表达式计算实例，并传递上下文


  return new _expression.Evaluator({
    functions: {
      value: function value(k, type) {
        var v = null;

        if (k) {
          if (type === "selections") {
            var state = form.getFieldState(k);

            if (state && state.fieldActions && typeof state.fieldActions.getSelections === "function") {
              return state.fieldActions.getSelections();
            }

            return [];
          } else {
            var _getItemIndex = (0, _utils.getItemIndex)(k, form),
                index = _getItemIndex.index,
                listKey = _getItemIndex.parentKey,
                fieldKey = _getItemIndex.dataIndex;

            if (index > -1) {
              v = form.getValuesIn(listKey + "." + index + "." + fieldKey);
            } else {
              if (listKey) {
                v = form.getValuesIn(listKey);

                if (v instanceof Array) {
                  v = v.map(function (d) {
                    return d[fieldKey];
                  });
                }
              } else {
                v = form.getValuesIn(k);
              }
            }
          }
        }

        return v;
      },
      env: function env(k) {
        return getEnv(k);
      },
      CallFunc: callFunc
    },
    onError: options === null || options === void 0 ? void 0 : options.onError
  }); //
}
/**
 * 请求接口时获取表单项输入参数
 * @param {*} form
 * @param {*} id
 * @param {*} injectVar
 */


var getApiFieldValue = function getApiFieldValue(form, id, injectVar) {
  try {
    var k = id;
    var v = null;

    if (k) {
      //如果表单项为表格，则根据行索引获取值
      if (k.indexOf(".items.") > -1) {
        var temp = k.split(".items.");
        var listKey = temp[0],
            fieldKey = temp[1];
        var state = form.getFieldState(listKey);
        var objectValue = null;

        if (state) {
          var values = state.value;

          if (values instanceof Array) {
            var rowIndex = injectVar === null || injectVar === void 0 ? void 0 : injectVar.index;

            if (rowIndex) {
              objectValue = values[rowIndex];
            } else {
              objectValue = values[0];
            }
          }
        }

        if (fieldKey) {
          var _objectValue;

          v = (_objectValue = objectValue) === null || _objectValue === void 0 ? void 0 : _objectValue[fieldKey];
        }
      } else if (k.indexOf(".selections") > -1) {
        var _temp = k.split(".selections");

        var _listKey = _temp[0];

        var _state = form.getFieldState(_listKey);

        var _values = [];

        if (_state && _state.fieldActions && typeof _state.fieldActions.getSelections === "function") {
          _values = _state.fieldActions.getSelections();
        }

        v = _values;
      } else {
        v = form.getValuesIn(k);
      }
    }

    return v;
  } catch (error) {
    console.error("get field value error by request api:", error);
    return null;
  }
};

exports.getApiFieldValue = getApiFieldValue;

function treeForEach(arr, fn) {
  if (arr instanceof Array) {
    arr.forEach(function (d, i) {
      var children = d.children,
          item = _objectWithoutProperties(d, _excluded);

      fn(item, i);
      treeForEach(children, fn);
    });
  }
}

function getParams(queryString, bodyParams) {
  return {
    urlQuery: queryString,
    body: bodyParams
  };
}

var requestApiById = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(params, pagination) {
    var id, input, output, runtime, queryString, reqParams, queryOptions, url, options, requestInfo, res, arr, total, isPagination, outputMap, hasFieldMap, labelField, valueField, parentField, _arr;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = params.id, input = params.input, output = params.output, runtime = params.runtime;

            if (id) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", {
              data: []
            });

          case 3:
            queryString = "?id=".concat(id);
            reqParams = _objectSpread(_objectSpread(_objectSpread({}, input), runtime), pagination);
            queryOptions = window._Formx_Global_Options.get("dataSourceDetailQuery", getParams(queryString, reqParams));
            url = queryOptions.url + queryString;
            options = _objectSpread(_objectSpread({}, queryOptions.options), {}, {
              body: JSON.stringify(reqParams)
            });
            requestInfo = {
              dataSourceId: id,
              url: url,
              method: options.method,
              body: options.body
            };
            _context2.next = 11;
            return fetch(url, options).then( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(response) {
                var jsonData;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!(response.status >= 200 && response.status < 300)) {
                          _context.next = 13;
                          break;
                        }

                        _context.prev = 1;
                        _context.next = 4;
                        return response.json();

                      case 4:
                        jsonData = _context.sent;
                        return _context.abrupt("return", jsonData);

                      case 8:
                        _context.prev = 8;
                        _context.t0 = _context["catch"](1);
                        return _context.abrupt("return", {
                          State: 1,
                          Message: _context.t0.message,
                          Data: null,
                          Code: response.status,
                          requestInfo: requestInfo
                        });

                      case 11:
                        _context.next = 14;
                        break;

                      case 13:
                        return _context.abrupt("return", {
                          State: 0,
                          Message: null,
                          Data: null,
                          Code: response.status,
                          requestInfo: requestInfo
                        });

                      case 14:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[1, 8]]);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 11:
            res = _context2.sent;
            arr = res.Data || [];
            total = null;
            isPagination = false; //通过解析数据结构判定是否为分页数据，
            //通过控件是否启用分页判定并不可靠，因为数据接口可能不是分页接口而导致数据无法显示

            if (_typeof(res.Data) === "object" && res.Data && res.Data.hasOwnProperty("TotalCount") && res.Data.hasOwnProperty("Data")) {
              isPagination = true;
            }

            if (isPagination === true) {
              arr = res.Data.Data;
              total = res.Data.TotalCount;
            } else {
              arr = res.Data;
            }

            outputMap = {};
            hasFieldMap = false;

            if (output instanceof Array) {
              output.forEach(function (d) {
                if (d.fieldMap) {
                  outputMap[d.fieldMap] = d.field;
                  hasFieldMap = true;
                }
              });
            }

            labelField = outputMap["label"];
            valueField = outputMap["value"];
            parentField = outputMap["parent"];

            if (hasFieldMap && arr instanceof Array) {
              _arr = [];
              treeForEach(arr, function (d) {
                if (_typeof(d) === "object" && d) {
                  var _value = d[valueField];
                  var _parent = d[parentField];
                  var _label = d[labelField]; //数据源返回数字时转为字符串，避免下拉控件匹配不到值

                  if (typeof _value === "number") {
                    _value = _value.toString();
                  } //


                  if (valueField) {
                    var _value2;

                    d.value = (_value2 = _value) !== null && _value2 !== void 0 ? _value2 : null;
                  }

                  if (parentField) {
                    d.parent = _parent !== null && _parent !== void 0 ? _parent : "";
                  }

                  if (labelField) {
                    d.label = _label !== null && _label !== void 0 ? _label : "";
                  }
                }

                _arr.push(d);
              });
              arr = _arr;
            }

            return _context2.abrupt("return", {
              data: arr,
              total: total,
              requestInfo: requestInfo
            });

          case 25:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function requestApiById(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.requestApiById = requestApiById;

var requestValidateApiById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(params) {
    var id, input, form, queryString, reqParams, queryOptions, url, options, res, msg, bl;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = params.id, input = params.input, form = params.form;

            if (id) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt("return", {
              data: []
            });

          case 3:
            queryString = "?id=".concat(id);
            reqParams = input;
            queryOptions = window._Formx_Global_Options.get("dataSourceValidateQuery", getParams(queryString, reqParams));
            url = queryOptions.url + queryString;
            options = _objectSpread(_objectSpread({}, queryOptions.options), {}, {
              body: JSON.stringify(reqParams)
            });
            _context4.next = 10;
            return fetch(url, options).then( /*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(response) {
                var jsonData;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        if (!(response.status >= 200 && response.status < 300)) {
                          _context3.next = 7;
                          break;
                        }

                        _context3.next = 3;
                        return response.json();

                      case 3:
                        jsonData = _context3.sent;
                        return _context3.abrupt("return", jsonData);

                      case 7:
                        return _context3.abrupt("return", {
                          State: 0,
                          Message: null,
                          Data: null,
                          Code: response.status
                        });

                      case 8:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x5) {
                return _ref4.apply(this, arguments);
              };
            }());

          case 10:
            res = _context4.sent;
            msg = "";
            bl = true;

            if (res && res.State === 0) {
              bl = false;
              msg = res.Message;
            }

            return _context4.abrupt("return", {
              valid: bl,
              message: msg
            });

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function requestValidateApiById(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.requestValidateApiById = requestValidateApiById;

function getRequestParams(input, form, injectEnvs, getEnv, injectVars) {
  var params = {};
  var childrenToParents = {};

  var _evaluator = createEvaluator(form);

  function getExpressionValue(item, value) {
    var _value = value;

    if (item && item.expression) {
      _value = _evaluator.evaluate(item.expression, {}, {
        value: value
      });
    }

    if (typeof _value === "undefined") {
      _value = null;
    }

    return _value;
  }

  function getChildrenValue(data, _injectVar, _injectEnvs) {
    var values = null;
    var children = childrenToParents[data.id] || [];
    children.forEach(function (item) {
      var inputValue = getParamValue(item, _injectVar, _injectEnvs);

      if (typeof inputValue === "undefined") {
        inputValue = null;
      }

      if (values) {
        values[item.field] = inputValue;
      } else {
        values = _defineProperty({}, item.field, inputValue);
      }
    });
    return values;
  }

  function getItemValue(item, injectVar, _injectEnvs) {
    var value = null;

    if (item.type === "env") {
      value = getEnv(form, item.value, _injectEnvs);
    } else if (item.type === "formItem") {
      value = getApiFieldValue(form, item.value, injectVar);
    } else {
      value = item.value;
    }

    if (typeof value === "undefined") {
      value = null;
    }

    return value;
  }

  function formatListValue(list, fields, _injectEnvs) {
    if (fields instanceof Array && fields.length > 0) {
      return list.map(function (_d, i) {
        var o = {};
        fields.forEach(function (d) {
          var v = getParamValue(d, {
            index: i
          }, _injectEnvs);
          o[d.field] = v;
        });
        return o;
      });
    } else {
      return list;
    }
  }

  function getParamValue(item, injectVar, _injectEnvs) {
    var value = null;

    if (item.dataType === "array") {
      var itemValue = getItemValue(item, injectVar, _injectEnvs) || [];

      if (itemValue instanceof Array) {
        var children = childrenToParents[item.id] || [];
        value = formatListValue(itemValue, children, _injectEnvs);
      } else {
        value = [];
      }
    } else if (item.dataType === "object") {
      var _children = childrenToParents[item.id] || [];

      if (_children.length > 0) {
        var _itemValue = getChildrenValue(item, injectVar, _injectEnvs) || null;

        value = _itemValue;
      } else {
        value = getItemValue(item, injectVar, _injectEnvs);
      }
    } else if (item.dataType === "boolean") {
      var _valueMap$_value;

      var _value = getItemValue(item, injectVar, _injectEnvs);

      var _valueMap = {
        0: false,
        1: true,
        false: false,
        true: true
      }; //将指定字符串值转换为对应的布尔值

      value = (_valueMap$_value = _valueMap[_value]) !== null && _valueMap$_value !== void 0 ? _valueMap$_value : _value;
    } else {
      value = getItemValue(item, injectVar, _injectEnvs);
    }

    value = getExpressionValue(item, value);

    if (typeof value === "undefined") {
      value = null;
    }

    return value;
  }

  if (input instanceof Array) {
    input.forEach(function (d) {
      var parentKey = d.parentId;

      if (parentKey) {
        if (parentKey in childrenToParents) {
          childrenToParents[parentKey].push(d);
        } else {
          childrenToParents[parentKey] = [d];
        }
      }
    });
    input.forEach(function (d) {
      var hasParent = !!d.parentId;

      if (!hasParent) {
        params[d.field] = getParamValue(d, injectVars || {}, injectEnvs);
      }
    });
  }

  return params;
}

var requestPostApiById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(params) {
    var id, input, form, queryString, reqParams, queryOptions, url, options, requestInfo, res, msg, data, succeed;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = params.id, input = params.input, form = params.form;

            if (id) {
              _context6.next = 3;
              break;
            }

            return _context6.abrupt("return", {
              data: []
            });

          case 3:
            queryString = "?id=".concat(id);
            reqParams = input;
            queryOptions = window._Formx_Global_Options.get("dataSourceMaintain", getParams(queryString, reqParams));
            url = queryOptions.url + queryString;
            options = _objectSpread(_objectSpread({}, queryOptions.options), {}, {
              body: JSON.stringify(reqParams)
            });
            requestInfo = {
              dataSourceId: id,
              url: url,
              method: options.method,
              body: options.body
            };
            _context6.next = 11;
            return fetch(url, options).then( /*#__PURE__*/function () {
              var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(response) {
                var jsonData;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        if (!(response.status >= 200 && response.status < 300)) {
                          _context5.next = 7;
                          break;
                        }

                        _context5.next = 3;
                        return response.json();

                      case 3:
                        jsonData = _context5.sent;
                        return _context5.abrupt("return", jsonData);

                      case 7:
                        return _context5.abrupt("return", {
                          State: 0,
                          Message: null,
                          Data: null,
                          Code: response.status
                        });

                      case 8:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function (_x7) {
                return _ref6.apply(this, arguments);
              };
            }());

          case 11:
            res = _context6.sent;
            msg = "";
            data = null;
            succeed = false;

            if (res) {
              if (res.State === 1) {
                data = res.Data;
                succeed = true;
              } else {
                msg = res.Message;
                succeed = false;
              }
            }

            return _context6.abrupt("return", {
              succeed: succeed,
              data: data,
              message: msg,
              requestInfo: requestInfo
            });

          case 17:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function requestPostApiById(_x6) {
    return _ref5.apply(this, arguments);
  };
}();

exports.requestPostApiById = requestPostApiById;

function flatData(arr) {
  var removeChildren = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var treeList = arr || []; //末级节点

  var leafs = []; //根

  var roots = []; //所有节点

  var list = [];
  var listMap = {};

  for (var i = 0; i < treeList.length; i++) {
    var d = treeList[i];
    var childrens = d.children || [];
    d.titles = [d.label];
    list.push(d);
    roots.push(d);

    if (!listMap.hasOwnProperty(d.value)) {
      listMap[d.value] = d;
    }

    if (childrens.length > 0) {
      getChildren(d, 0);
    } else {
      leafs.push(d);
    }

    if (removeChildren === true) {
      delete d.children;
    }
  }

  function getChildren(item, depth) {
    var tempArr = item.children || [];

    for (var _i = 0; _i < tempArr.length; _i++) {
      var _d2 = tempArr[_i];

      var _childrens = _d2.children || [];

      _d2.titles = [].concat(_toConsumableArray(item.titles), [_d2.label]);
      _d2.parent = item.value;
      list.push(_d2);

      if (!listMap.hasOwnProperty(_d2.value)) {
        listMap[_d2.value] = _d2;
      }

      if (_childrens.length > 0) {
        getChildren(_d2, depth + 1);
      } else {
        leafs.push(_d2);
      }

      if (removeChildren === true) {
        delete _d2.children;
      }
    }
  }

  return {
    list: listMap,
    data: list
  };
}

var getNodeTitle = function getNodeTitle(list, key) {
  var node = list === null || list === void 0 ? void 0 : list[key];
  var titles = [];

  if (node) {
    if (node.titles instanceof Array) {
      titles = node.titles;
    }
  }

  return titles.join("-");
};

function getLabelMap(dataSource) {
  var labelMap = {};

  if (dataSource) {
    var _flatData = flatData(JSON.parse(JSON.stringify(dataSource))),
        data = _flatData.data,
        list = _flatData.list;

    if (data instanceof Array) {
      data.forEach(function (d) {
        var formattedLabel = getNodeTitle(list, d.value);
        labelMap[d.value] = formattedLabel;
      });
    }
  }

  return labelMap;
}

function setTableErrorsToExtraField(arrayPath, instance, errors) {
  var extraField = instance.query("__DATA__").take();
  var res = errors;

  if (extraField) {
    var prevErrors = extraField.selfErrors;
    var nextErrors = [];
    var prevTableErrorsMap = {};
    var currentTableErrors = [];
    var otherTableErrors = [];

    if (prevErrors instanceof Array) {
      prevErrors.forEach(function (d) {
        var isCurrentTableError = d.address.indexOf(arrayPath) > -1;

        if (isCurrentTableError) {
          prevTableErrorsMap[d.address] = true;
          currentTableErrors.push(d);
        } else {
          otherTableErrors.push(d);
        }
      });

      if (res instanceof Array) {
        if (res.length > 0) {
          res.forEach(function (d) {
            if (!prevTableErrorsMap.hasOwnProperty(d.address)) {
              currentTableErrors.push(d);
            }
          });
        } else {
          currentTableErrors = [];
        }
      }
    }

    nextErrors = otherTableErrors.concat(currentTableErrors);
    extraField.setSelfErrors(nextErrors);
  }
}

function transformCardToTab(schema) {
  if (_typeof(schema) === "object" && schema) {
    var _schema = JSON.parse(JSON.stringify(schema));

    var extraProperties = {};
    var firstChildren = _schema.properties;

    if (firstChildren) {
      var next = null;
      var bl = false;
      var children = {};
      Reflect.ownKeys(firstChildren).forEach(function (k) {
        var item = firstChildren[k];

        if (["__DATA__", "additionalProperties"].includes(k)) {
          extraProperties[k] = item;
        } else {
          var componentType = item["x-component"].toLowerCase();

          if (["arraytable"].includes(componentType)) {
            bl = true;
            var tabpaneId = (0, _utils.guid)("g");
            var tabpane = {
              properties: {},
              "x-component": "tabpane",
              "x-component-props": {
                "x-layout-props": {
                  span: 24
                },
                "x-extra-props": {
                  name: "tabpane"
                }
              }
            };
            tabpane["x-component-props"].tab = item["x-component-props"].title;
            tabpane.properties = _defineProperty({}, k, item);
            children[tabpaneId] = tabpane;
          } else if (["card", "fieldset", "grid"].includes(componentType)) {
            bl = true;
            item["x-component"] = "tabpane";
            var cmp = item["x-component-props"] || {};
            var extra = item["x-extra-props"] || {};
            var layout = item["x-layout-props"] || {};
            extra.name = "tabpane";
            cmp.name = "tabpane";
            item["x-component-props"] = _objectSpread(_objectSpread({}, cmp), {}, {
              tab: cmp.title,
              "x-extra-props": extra,
              "x-layout-props": layout
            });
            children[k] = item;
          } else {
            children[k] = item;
          }
        }
      });

      if (bl) {
        var tabId = (0, _utils.guid)("g");
        next = {
          type: "object",
          properties: _objectSpread(_defineProperty({}, tabId, {
            title: "选项卡",
            "x-component": "Tab",
            "x-component-props": {
              "x-extra-props": {
                name: "Tab"
              },
              "x-layout-props": {
                span: 24
              }
            },
            properties: children
          }), extraProperties)
        };
        return next;
      }
    }
  }

  return schema;
}

function isMobile() {
  var info = window.navigator.userAgent;
  var agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPod", "iPad"];

  for (var i = 0; i < agents.length; i++) {
    if (info.indexOf(agents[i]) >= 0) return true;
  }

  return false;
}

function isResponsiveSizeSmall(form) {
  var bl = window.document.body.classList.contains("responsive-size-small");

  if (bl === true) {
    return true;
  }

  if (form) {
    var _form$props, _form$props$context;

    var enabledSmallLayoutSize = (_form$props = form.props) === null || _form$props === void 0 ? void 0 : (_form$props$context = _form$props.context) === null || _form$props$context === void 0 ? void 0 : _form$props$context.enabledSmallLayoutSize;

    if (enabledSmallLayoutSize === true) {
      return true;
    }
  }

  var _isMobile = isMobile();

  if (_isMobile === true) {
    return true;
  }

  var cw = window.document.body.clientWidth;

  if (cw <= 450) {
    bl = true;
  } else {
    bl = false;
  }

  return bl;
}