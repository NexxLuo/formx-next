"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initValidator = initValidator;

var _utils = require("./utils");

var _utils2 = require("../../extensions/utils");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function validateArrayTable(_x, _x2, _x3) {
  return _validateArrayTable.apply(this, arguments);
}

function _validateArrayTable() {
  _validateArrayTable = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value, rule, context) {
    var validatorContext, schemaMap, _evaluator, _options, field, instance, listAddress, arr, tasks, validateRequired, validate, isVisible, _field$fieldActions, arrayItemKeys, res, resultMap, i, _tasks$i, validator, _value2, address, _context, result, arrayPath;

    return regeneratorRuntime.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            isVisible = function _isVisible(row, rowIndex, columnKey, _options, _schema, _evaluator) {
              var _options$columnKey;

              var bl = true;

              if ((_options === null || _options === void 0 ? void 0 : (_options$columnKey = _options[columnKey]) === null || _options$columnKey === void 0 ? void 0 : _options$columnKey.visible) === false) {
                bl = false;
                return bl;
              }

              if (_schema) {
                var _schema$xComponentP;

                var extraProps = (_schema$xComponentP = _schema["x-component-props"]) === null || _schema$xComponentP === void 0 ? void 0 : _schema$xComponentP["x-extra-props"];
                var columnHidden = false;

                if (extraProps) {
                  var columnVisibility = extraProps.columnVisibility;

                  if (_typeof(columnVisibility) === "object" && columnVisibility && columnVisibility.type === "expression" && columnVisibility.expression) {
                    columnHidden = _evaluator.evaluate(columnVisibility.expression, {});
                  }

                  var hidden = false;

                  if (columnHidden !== true) {
                    var visibility = extraProps.visibility;

                    if (_typeof(visibility) === "object" && visibility && visibility.type === "expression" && visibility.expression) {
                      hidden = _evaluator.evaluate(visibility.expression, {
                        items: rowIndex
                      });
                    }
                  }

                  if (columnHidden === true || hidden === true) {
                    bl = false;
                  }
                }
              }

              return bl;
            };

            validate = function _validate(_value, _validator, _address, context, _instance) {
              return new Promise(function (resolve) {
                var res = _validator(_value, {
                  validatorContext: context
                }, {
                  form: _instance
                });

                if (res) {
                  var _res$constructor;

                  if (((_res$constructor = res.constructor) === null || _res$constructor === void 0 ? void 0 : _res$constructor.name) === "Promise") {
                    res.then(function (_res) {
                      if (_res) {
                        resolve({
                          address: _address,
                          messages: [_res],
                          path: _address,
                          type: "error",
                          triggerType: "onInput",
                          code: "ValidateError"
                        });
                      } else {
                        resolve(null);
                      }
                    });
                  } else {
                    if (res) {
                      resolve({
                        address: _address,
                        messages: [res],
                        path: _address,
                        type: "error",
                        triggerType: "onInput",
                        code: "ValidateError"
                      });
                    } else {
                      resolve(null);
                    }
                  }
                } else {
                  resolve(null);
                }
              });
            };

            validateRequired = function _validateRequired(_value) {
              if (_value === "" || _value === null || _value === undefined) {
                return "该字段是必填字段";
              }

              return "";
            };

            validatorContext = rule.validatorContext;
            schemaMap = (validatorContext === null || validatorContext === void 0 ? void 0 : validatorContext.formSchemaMap) || {};
            _evaluator = validatorContext === null || validatorContext === void 0 ? void 0 : validatorContext.evaluator;
            _options = validatorContext === null || validatorContext === void 0 ? void 0 : validatorContext.options;
            field = context.field;
            instance = context.form;
            listAddress = field.address.toString();
            arr = value;
            tasks = [];

            if (arr instanceof Array && arr.length > 0) {
              arrayItemKeys = [];
              (_field$fieldActions = field.fieldActions) === null || _field$fieldActions === void 0 ? void 0 : _field$fieldActions.mapItems(function (_, key, o) {
                if (o.leaf === true) {
                  arrayItemKeys.push(key);
                }
              });
              arr.forEach(function (d, i) {
                arrayItemKeys.forEach(function (k) {
                  var _value = d[k];
                  var _schema = schemaMap[k];

                  if (_schema) {
                    var _schema$xComponentP2;

                    var extraProps = (_schema$xComponentP2 = _schema["x-component-props"]) === null || _schema$xComponentP2 === void 0 ? void 0 : _schema$xComponentP2["x-extra-props"];

                    var _address = listAddress + "." + i + "." + k;

                    var fieldState = instance.query(_address).take();
                    var existFieldState = false;

                    if (fieldState) {
                      existFieldState = fieldState.mounted === true;
                    }

                    if (!existFieldState && isVisible(d, i, k, _options, _schema, _evaluator)) {
                      var _options$k;

                      var schema = {
                        name: _address,
                        extraProps: extraProps,
                        required: _schema.required === true || (_options === null || _options === void 0 ? void 0 : (_options$k = _options[k]) === null || _options$k === void 0 ? void 0 : _options$k.required) === true
                      };

                      if (schema.required === true) {
                        tasks.push({
                          validator: validateRequired,
                          value: _value,
                          address: _address,
                          context: {}
                        });
                      }

                      var rules = getValidateRules(schema, instance, _evaluator, context);
                      rules.forEach(function (rule) {
                        tasks.push({
                          validator: rule.validator,
                          value: _value,
                          address: _address,
                          context: rule.validatorContext
                        });
                      });
                    }
                  }
                });
              });
            }

            res = [];
            resultMap = {};
            i = 0;

          case 16:
            if (!(i < tasks.length)) {
              _context2.next = 26;
              break;
            }

            _tasks$i = tasks[i], validator = _tasks$i.validator, _value2 = _tasks$i.value, address = _tasks$i.address, _context = _tasks$i.context;

            if (resultMap.hasOwnProperty(address)) {
              _context2.next = 23;
              break;
            }

            _context2.next = 21;
            return validate(_value2, validator, address, _context, instance);

          case 21:
            result = _context2.sent;

            if (result != null) {
              resultMap[address] = result;
              res.push(result);
            }

          case 23:
            i++;
            _context2.next = 16;
            break;

          case 26:
            arrayPath = field.address.toString();
            instance.query(arrayPath).take().data = {
              validateResult: res
            };
            (0, _utils2.setTableErrorsToExtraField)(arrayPath, instance, res);
            return _context2.abrupt("return", "");

          case 30:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee);
  }));
  return _validateArrayTable.apply(this, arguments);
}

function regExpValidator(value, rule) {
  var _rule$validatorContex = rule.validatorContext,
      _message = _rule$validatorContex.message,
      _expression = _rule$validatorContex.expression;
  var res = false;

  try {
    var reg = new RegExp(_expression);
    res = reg.test(value);
  } catch (error) {
    console.error("validate RegExp error:", error, _expression);
  }

  return res === true ? "" : _message;
}

function expressionValidator(value, rule) {
  var _rule$validatorContex2 = rule.validatorContext,
      _message = _rule$validatorContex2.message,
      _expression = _rule$validatorContex2.expression,
      _evaluator = _rule$validatorContex2.evaluator,
      _expressionVar = _rule$validatorContex2.expressionVar;

  var res = _evaluator.evaluate(_expression, _expressionVar, {
    value: value
  });

  return res === true ? "" : _message;
}

function asyncValidator(_x4, _x5, _x6) {
  return _asyncValidator.apply(this, arguments);
}

function _asyncValidator() {
  _asyncValidator = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(value, rule, context) {
    var _rule$validatorContex3, _message, _api, _expressionVar, _instance, _yield$requestValidat, valid, returnedMsg, msg;

    return regeneratorRuntime.wrap(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _rule$validatorContex3 = rule.validatorContext, _message = _rule$validatorContex3.message, _api = _rule$validatorContex3.api, _expressionVar = _rule$validatorContex3.expressionVar;
            _instance = context.form;
            _context3.next = 4;
            return (0, _utils2.requestValidateApiById)({
              form: _instance,
              id: _api.dataSourceId,
              input: (0, _utils2.getRequestParams)(_api.input, _instance, {}, _utils.getEnv, {
                index: _expressionVar === null || _expressionVar === void 0 ? void 0 : _expressionVar.items
              }),
              output: _api.output
            });

          case 4:
            _yield$requestValidat = _context3.sent;
            valid = _yield$requestValidat.valid;
            returnedMsg = _yield$requestValidat.message;
            msg = "";

            if (valid === false) {
              msg = _message || returnedMsg || "验证未通过";
            }

            return _context3.abrupt("return", msg);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee2);
  }));
  return _asyncValidator.apply(this, arguments);
}

function getValidateRules(schema, instance, _evaluator, context) {
  var _schema$componentName;

  var rules = [];
  var extraProps = schema.extraProps || {};
  var name = schema.name;
  var expressionVar = (0, _utils.getExpressionVar)(name);

  if (((_schema$componentName = schema.componentName) === null || _schema$componentName === void 0 ? void 0 : _schema$componentName.toLowerCase()) === "arraytable") {
    rules.push({
      validator: validateArrayTable,
      triggerType: "onSubmit",
      //只有提交或手动验证时方验证表格内数据
      validatorContext: {
        formSchemaMap: context === null || context === void 0 ? void 0 : context.formSchemaMap,
        evaluator: _evaluator,
        options: context === null || context === void 0 ? void 0 : context.options
      }
    });
  }

  if (_typeof(extraProps.validateRegExp) === "object" && extraProps.validateRegExp) {
    var validateExpression = extraProps.validateRegExp.expression;
    var validateMessage = extraProps.validateRegExp.message || "验证未通过";

    if (validateExpression && validateExpression.length > 0) {
      rules.push({
        validator: regExpValidator,
        validatorContext: {
          expression: validateExpression,
          message: validateMessage
        }
      });
    }
  }

  if (_typeof(extraProps.validate) === "object" && extraProps.validate) {
    var _validateExpression = extraProps.validate.expression;

    var _validateMessage = extraProps.validate.message || "验证未通过";

    if (_validateExpression && _validateExpression.length > 0) {
      rules.push({
        validator: expressionValidator,
        validatorContext: {
          expression: _validateExpression,
          message: _validateMessage,
          evaluator: _evaluator,
          expressionVar: expressionVar
        }
      });
    }
  }

  if (_typeof(extraProps.validateAsync) === "object" && extraProps.validateAsync) {
    var validateAsyncApi = null;

    try {
      validateAsyncApi = JSON.parse(extraProps.validateAsync.api);
    } catch (error) {}

    var validateAsyncMessage = extraProps.validateAsync.message;

    if (validateAsyncApi) {
      rules.push({
        validator: asyncValidator,
        validatorContext: {
          api: validateAsyncApi,
          message: validateAsyncMessage,
          expressionVar: expressionVar
        }
      });
    }
  }

  return rules;
}

function initValidator(schema, _evaluator, instance, context) {
  var extraRules = getValidateRules(schema, instance, _evaluator, context);
  var name = schema.name;

  if (extraRules.length > 0) {
    instance.setFieldState(name, function (state) {
      var prev = state.validator;
      var next = extraRules;

      if (prev instanceof Array) {
        next = [].concat(_toConsumableArray(prev), _toConsumableArray(extraRules));
      }

      state.validator = next;
    });
  }
}