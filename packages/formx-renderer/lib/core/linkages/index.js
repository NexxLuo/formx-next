"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addLinkageItem = addLinkageItem;
exports.initFieldOptions = initFieldOptions;
Object.defineProperty(exports, "initValidator", {
  enumerable: true,
  get: function get() {
    return _validator.initValidator;
  }
});
exports.linkageAsyncValue = linkageAsyncValue;
Object.defineProperty(exports, "linkageDataFill", {
  enumerable: true,
  get: function get() {
    return _dataFill.linkageDataFill;
  }
});
Object.defineProperty(exports, "observerChainHidden", {
  enumerable: true,
  get: function get() {
    return _visibility.observerChainHidden;
  }
});
exports.refreshInitialValue = refreshInitialValue;
exports.setInitialOptions = setInitialOptions;
Object.defineProperty(exports, "setTableDataSource", {
  enumerable: true,
  get: function get() {
    return _dataSource2.setTableDataSource;
  }
});
exports.triggerExtraFieldValue = triggerExtraFieldValue;
exports.triggerLinkage = triggerLinkage;
exports.triggerRelatedInputValues = triggerRelatedInputValues;

var _utils = require("../utils");

var _value = require("./value");

var _visibility = require("./visibility");

var _columnVisibility = require("./columnVisibility");

var _availability = require("./availability");

var _dataSource2 = require("./dataSource");

var _dataFill = require("./dataFill");

var _props = require("./props");

var _utils2 = require("./utils");

var _validator = require("./validator");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 获取需要关联设置状态的所有表单项
 * @param {*} name
 * @param {*} store
 * @param {*} instance
 */
function getLinkageItem(name) {
  var store = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var instance = arguments.length > 2 ? arguments[2] : undefined;
  var options = arguments.length > 3 ? arguments[3] : undefined;

  var _getItemIndex = (0, _utils.getItemIndex)(name),
      index = _getItemIndex.index; //已被卸载的表单项不进行状态联动
  //display为false的表单项mounted为false


  function itemIsValid(_state) {
    if (_state) {
      var _state$component, _state$component$;

      //如果触发联动的是表格，则不应触发当前表格列本身的联动
      var runtime = ((_state$component = _state.component) === null || _state$component === void 0 ? void 0 : (_state$component$ = _state$component[1]) === null || _state$component$ === void 0 ? void 0 : _state$component$["x-runtime"]) || {};

      if (runtime.isTableCellField && runtime.arrayPath === name) {
        return false;
      }

      return _state.mounted === true || (_state.hidden === true || _state.visible === false) && _state.unmounted === true;
    }

    return false;
  }

  function getItemState(_name) {
    //如果是表格列中的表单项，则需要替换items为当前行索引，以只联动当前编辑行的表单项
    if (_name.indexOf(".items.") > -1 && index > -1) {
      _name = _name.replace(".items.", "." + index + ".");
    } //


    return instance.getFieldState(_name);
  } //如果已被外部控制为隐藏，则不进行联动控制


  function isControledHidden(_name) {
    var _options$_name;

    if ((options === null || options === void 0 ? void 0 : (_options$_name = options[_name]) === null || _options$_name === void 0 ? void 0 : _options$_name.visible) === false) {
      return true;
    }

    return false;
  } //如果已被外部控制为禁用，则不进行联动控制


  function isControledDisabled(_name) {
    var _options$_name2;

    if ((options === null || options === void 0 ? void 0 : (_options$_name2 = options[_name]) === null || _options$_name2 === void 0 ? void 0 : _options$_name2.disabled) === true) {
      return true;
    }

    return false;
  } //如果触发源index和目标index均有值，则代码在表格内部联动
  //此时只允许联动同一行


  function isSameRowIndex(_name) {
    var _getItemIndex2 = (0, _utils.getItemIndex)(_name),
        targetIndex = _getItemIndex2.index;

    if (targetIndex > -1 && index > -1 && targetIndex !== index) {
      return false;
    }

    return true;
  }

  var item = null;

  if (store[name]) {
    item = store[name];
  } //表格列中的公式计算，联动项存储时的路径是从公式中匹配出来的，都带有items
  //而onChange时的路径是带索引而不是带items的，所以查找联动项时需要讲索引替换为items，否则会找不到
  //场景：一个表单项既配置了属性联动又被公式计算引用时，如果不合并，则会导致公式计算不生效


  if (index > -1) {
    var _name = name.replace("." + index + ".", ".items.");

    var _item = store[_name];
    item = _objectSpread(_objectSpread({}, item), _item);
  } //


  if (item) {
    item = _objectSpread({}, item);

    if (item.value instanceof Array) {
      item.value = item.value.filter(function (d) {
        return isSameRowIndex(d.name) && itemIsValid(getItemState(d.name));
      });
    }

    if (item.visibility instanceof Array) {
      item.visibility = item.visibility.filter(function (d) {
        var _itemState$component, _itemState$component$;

        var _itemState = getItemState(d.name);

        var extraProps = (_itemState === null || _itemState === void 0 ? void 0 : (_itemState$component = _itemState.component) === null || _itemState$component === void 0 ? void 0 : (_itemState$component$ = _itemState$component[1]) === null || _itemState$component$ === void 0 ? void 0 : _itemState$component$["x-extra-props"]) || {};
        var _key = extraProps["data-key"];
        return isSameRowIndex(d.name) && !isControledHidden(_key) && itemIsValid(_itemState);
      });
    }

    if (item.columnVisibility instanceof Array) {
      item.columnVisibility = item.columnVisibility.filter(function (d) {
        return isSameRowIndex(d.name) && !isControledHidden(d.name);
      });
    }

    if (item.availability instanceof Array) {
      item.availability = item.availability.filter(function (d) {
        var _itemState$component2, _itemState$component3;

        var _itemState = getItemState(d.name);

        var extraProps = (_itemState === null || _itemState === void 0 ? void 0 : (_itemState$component2 = _itemState.component) === null || _itemState$component2 === void 0 ? void 0 : (_itemState$component3 = _itemState$component2[1]) === null || _itemState$component3 === void 0 ? void 0 : _itemState$component3["x-extra-props"]) || {};
        var _key = extraProps["data-key"];
        return isSameRowIndex(d.name) && !isControledDisabled(_key) && itemIsValid(_itemState);
      });
    }

    if (item.dataSource instanceof Array) {
      item.dataSource = item.dataSource.filter(function (d) {
        return isSameRowIndex(d.name) && itemIsValid(getItemState(d.name));
      });
    }

    if (item.fieldProps instanceof Array) {
      item.fieldProps = item.fieldProps.filter(function (d) {
        return isSameRowIndex(d.name) && itemIsValid(getItemState(d.name));
      });
    }
  }

  return item;
} //添加所有被引用的表单项


function addLinkageItem(targets, store, type, item) {
  var name = item.name;
  var path = item.path;
  var extraProps = item.extraProps || {};
  var ctype = item.componentName;
  var hiddenValue = false;
  var expression = null;

  if (type === "visibility") {
    var _extraProps$visibilit, _extraProps$visibilit2;

    if (_typeof(extraProps.visibility) === "object" && extraProps.visibility && extraProps.visibility.type === "expression") {
      expression = extraProps.visibility.expression;
    }

    hiddenValue = (_extraProps$visibilit = (_extraProps$visibilit2 = extraProps.visibility) === null || _extraProps$visibilit2 === void 0 ? void 0 : _extraProps$visibilit2.hiddenValue) !== null && _extraProps$visibilit !== void 0 ? _extraProps$visibilit : true;
  } else if (type === "columnVisibility") {
    if (_typeof(extraProps.columnVisibility) === "object" && extraProps.columnVisibility && extraProps.columnVisibility.type === "expression") {
      expression = extraProps.columnVisibility.expression;
    }
  } else if (type === "value") {
    if (_typeof(extraProps.initialValue) === "object" && extraProps.initialValue) {
      if (extraProps.initialValue.type === "expression") {
        expression = extraProps.initialValue.expression;
      } else if (extraProps.initialValue.type === "api") {
        var _apiData;

        var apiData = extraProps.initialValue.api;

        if (typeof apiData === "string") {
          apiData = JSON.parse(apiData);
        }

        var _input = (_apiData = apiData) === null || _apiData === void 0 ? void 0 : _apiData.input;

        if (_input instanceof Array) {
          _input.forEach(function (d) {
            if (d.type === "formItem" && d.value) {
              var k = d.value;
              var curr = {
                name: name,
                path: path,
                component: ctype,
                type: "api"
              };

              if (store[k]) {
                var prev = store[k][type];

                if (prev) {
                  store[k][type] = [].concat(_toConsumableArray(prev), [curr]);
                } else {
                  store[k][type] = [curr];
                }
              } else {
                store[k] = _defineProperty({}, type, [curr]);
              }
            }
          });
        }
      }
    }
  } else if (type === "availability") {
    if (_typeof(extraProps.availability) === "object" && extraProps.availability && extraProps.availability.type === "expression") {
      expression = extraProps.availability.expression;
    }
  } else if (type === "dataSource") {
    var _dataSource = null;

    if (extraProps.dataSource) {
      _dataSource = JSON.parse(extraProps.dataSource);
    }

    if (_typeof(_dataSource) === "object" && _dataSource) {
      if (_dataSource.type === "formItem") {
        var _dataSource$data;

        var _dataSourceFormItem = (_dataSource$data = _dataSource.data) === null || _dataSource$data === void 0 ? void 0 : _dataSource$data.formItem;

        if (_dataSourceFormItem) {
          var k = _dataSourceFormItem;
          var curr = {
            name: name,
            path: path,
            component: ctype,
            dataSourceType: _dataSource.type
          };

          if (store[k]) {
            var prev = store[k][type];

            if (prev) {
              store[k][type] = [].concat(_toConsumableArray(prev), [curr]);
            } else {
              store[k][type] = [curr];
            }
          } else {
            store[k] = _defineProperty({}, type, [curr]);
          }
        }
      } else if (_dataSource.type === "api") {
        var _dataSource$data2, _dataSource$data2$api;

        var _input2 = (_dataSource$data2 = _dataSource.data) === null || _dataSource$data2 === void 0 ? void 0 : (_dataSource$data2$api = _dataSource$data2.api) === null || _dataSource$data2$api === void 0 ? void 0 : _dataSource$data2$api.input;

        if (_input2 instanceof Array) {
          _input2.forEach(function (d) {
            if (d.type === "formItem" && d.value) {
              var _k = d.value;
              var _curr = {
                name: name,
                path: path,
                component: ctype,
                dataSourceType: _dataSource.type
              };

              if (store[_k]) {
                var _prev = store[_k][type];

                if (_prev) {
                  store[_k][type] = [].concat(_toConsumableArray(_prev), [_curr]);
                } else {
                  store[_k][type] = [_curr];
                }
              } else {
                store[_k] = _defineProperty({}, type, [_curr]);
              }
            }
          });
        }
      }
    }

    return;
  } else if (type === "fieldProps") {
    var _linkageProps = extraProps.linkageProps;

    if (_linkageProps instanceof Array) {
      _linkageProps.forEach(function (d) {
        if (d.targetField && d.name) {
          var _k2 = name;
          var _curr2 = {
            name: d.targetField,
            type: d.type,
            expression: d.value,
            property: d.name
          };

          if (store[_k2]) {
            var _prev2 = store[_k2][type];

            if (_prev2) {
              store[_k2][type] = [].concat(_toConsumableArray(_prev2), [_curr2]);
            } else {
              store[_k2][type] = [_curr2];
            }
          } else {
            store[_k2] = _defineProperty({}, type, [_curr2]);
          }
        }
      });
    }

    return;
  } //表达式支持两种数据格式，数组（兼容以前的配置）、字符串


  if (typeof expression === "string" && expression) {
    var currvExpression = {
      name: name,
      path: path,
      component: ctype,
      expression: expression,
      hiddenValue: !!hiddenValue
    };

    if (targets[name]) {
      var _prev3 = targets[name][type];

      if (_prev3) {
        targets[name][type] = [].concat(_toConsumableArray(_prev3), [currvExpression]);
      } else {
        targets[name][type] = [currvExpression];
      }
    } else {
      targets[name] = _defineProperty({}, type, [currvExpression]);
    } //匹配出的表单项使用map方式进行去重


    var expressionItems = {}; //匹配出表达式中的所有相关表单项

    var matched = expression.match(/value\('(\w|-|.items.)+'\)/g);

    if (matched) {
      matched.forEach(function (i) {
        var v = i.replace(/value\('([^<]*?)'\)/g, "$1");
        expressionItems[v] = {
          type: "value",
          value: v
        };
      });
    }

    for (var p in expressionItems) {
      var d = expressionItems[p];
      var _k3 = d.value;

      if (d && d.type === "value") {
        if (store[_k3]) {
          var _prev4 = store[_k3][type];

          if (_prev4) {
            store[_k3][type] = [].concat(_toConsumableArray(_prev4), [currvExpression]);
          } else {
            store[_k3][type] = [currvExpression];
          }
        } else {
          store[_k3] = _defineProperty({}, type, [currvExpression]);
        } //如果是表格的列被引用，则表格状态变化时也触发联动
        //注意：此方式比较耗费性能；比如：一行数据中存在多个联动字段，每次字段联动后都会触发表格的onChange；
        //但如果表格change不触发联动，会导致存在默认值的列在新增、删除行时，无法正确联动到外部字段


        if (_k3.indexOf(".items.") > -1) {
          var _getItemIndex3 = (0, _utils.getItemIndex)(_k3),
              pk = _getItemIndex3.parentKey;

          if (pk) {
            if (store[pk]) {
              var _prev5 = store[pk][type];

              if (_prev5) {
                store[pk][type] = [].concat(_toConsumableArray(_prev5), [currvExpression]);
              } else {
                store[pk][type] = [currvExpression];
              }
            } else {
              store[pk] = _defineProperty({}, type, [currvExpression]);
            }
          }
        } //

      }
    }
  }
}

function triggerLinkage(schema, linkageItemMap, instance, _evaluator, fieldActionTargetMap, options) {
  //虽然会进此生命周期但组件可能还未挂载，此时不做任何处理
  if (schema.mounted === false) {
    return;
  }

  var name = schema.name;
  /*********条件表达式处理**********/
  //此表单项是否被联动引用

  var linkageItem = getLinkageItem(name, linkageItemMap, instance, options);

  if (linkageItem) {
    (0, _value.linkageValue)(linkageItem, instance, _evaluator);
    (0, _visibility.linkageVisibility)(linkageItem, instance, _evaluator);
    (0, _availability.linkageAvailability)(linkageItem, instance, _evaluator);
    (0, _props.linkageProps)(linkageItem, schema, instance, _evaluator);
    (0, _columnVisibility.linkageColumnVisibility)(linkageItem, instance, _evaluator);
    (0, _dataSource2.linkageDataSource)(schema, linkageItem, instance, "api", fieldActionTargetMap, _evaluator);
  }
} //debounce(_triggerLinkage, 100); 使用debounce会导致_triggerLinkage执行次数变少，部分联动会失效
//比如：表格下拉列触发数据源联动


function getFieldInitOptions(schema, _evaluator) {
  var extraProps = schema.extraProps || {};
  var name = schema.name;
  var expressionVar = (0, _utils2.getExpressionVar)(name); //初始属性，模板中配置的属性

  var initOptions = {};

  if (_typeof(extraProps) === "object" && extraProps) {
    //显示、隐藏
    var visibility = extraProps.visibility;

    if (extraProps.hidden === true) {
      initOptions.hidden = true;
    } else if (_typeof(visibility) === "object" && visibility) {
      var _visibility$hiddenVal;

      var hiddenValue = (_visibility$hiddenVal = visibility.hiddenValue) !== null && _visibility$hiddenVal !== void 0 ? _visibility$hiddenVal : true;
      var res = true;

      if (visibility.type === "visible") {
        res = true;
      } else if (visibility.type === "hidden") {
        res = false;
      } else if (visibility.type === "expression") {
        //表达式求值
        res = _evaluator.evaluate(visibility.expression, expressionVar) !== true;
      }

      if (hiddenValue === true) {
        initOptions.visible = res;
      } else {
        initOptions.hidden = !res;
      }
    } //是否可编辑


    var availability = extraProps.availability;

    if (_typeof(availability) === "object" && availability) {
      var _res = false;

      if (availability.type === "disabled") {
        _res = true;
      } else if (availability.type === "enabled") {
        _res = false;
      } else if (availability.type === "expression") {
        //表达式求值
        _res = _evaluator.evaluate(availability.expression, expressionVar) === true;
      }

      initOptions.disabled = _res;
    } //是否只读


    var readonly = extraProps.readonly;

    if (readonly === true) {
      initOptions.readonly = true;
    } //是否必填


    var required = schema.required;

    if (required === true) {
      initOptions.required = true;
    }
  }

  return initOptions;
}

function getFieldControledOptions(schema, _evaluator, allOptions) {
  var extraProps = schema.extraProps || {};
  var itemKey = extraProps["data-key"]; //初始属性，模板中配置的属性

  var initOptions = getFieldInitOptions(schema, _evaluator);
  var options = allOptions[itemKey]; //需要控制的属性，模板中配置的属性不为禁用时，方通过传入的参数进行控制
  //模板中的状态如果为禁用，则优先级最高，否则通过参数控制

  var controlOptions = {};

  if (_typeof(options) === "object" && options) {
    if (typeof options.visible === "boolean" && initOptions.visible !== false && initOptions.hidden !== true) {
      controlOptions.hidden = !options.visible; //外部options控制，只控制样式上的是否可见
    }

    if (typeof options.disabled === "boolean" && initOptions.disabled !== true) {
      controlOptions.disabled = options.disabled;
    }

    if (typeof options.required === "boolean" && initOptions.required !== true) {
      controlOptions.required = options.required;
    }

    if (options.readonly === true && initOptions.readonly !== true) {
      controlOptions.disabled = true; //由于许多属性不支持readonly，故直接控制disabled
    }
  } //临时处理，导出按钮不禁用


  var _formItemCode = extraProps === null || extraProps === void 0 ? void 0 : extraProps.formItemCode;

  if (_formItemCode === "Export") {
    controlOptions.disabled = false;
  } //


  var _initOptions = Object.assign({}, initOptions, controlOptions); //表格列头中的控件，如果为禁用，直接不显示


  if ((extraProps === null || extraProps === void 0 ? void 0 : extraProps.renderInHeader) === true) {
    if (_initOptions.disabled === true) {
      _initOptions.hidden = true;
    }
  } //


  return _initOptions;
}
/**
 * 设置表单项权限
 * 模板中配置的属性不为禁用时，方通过传入的参数进行控制;模板中的状态如果为禁用，则优先级最高，否则通过参数控制
 * @param {} state
 * @param {*} allOptions 通过options属性传递的权限
 * @param {*} _evaluator
 * @param {*} form
 */


function setFieldOptions(schema, allOptions, _evaluator, form) {
  var extraProps = schema.extraProps || {};
  var name = schema.name;
  var ctype = schema.componentName;

  function _setFieldOptions(name, options) {
    form.setFieldState(name, function (state) {
      for (var ck in options) {
        if (ck === "visible") {
          state.visible = options[ck]; //visible如果为false，value值将会被清空
          //如果表单项值为隐藏，则对应的name字段也应该隐藏值

          (0, _visibility.setExtraNameFieldVisibility)(state, form, options[ck]); //
        } else if (ck === "hidden") {
          state.hidden = options[ck]; //hidden如果为false，只会隐藏控件不会隐藏值
        } else if (ck === "disabled") {
          //state.disabled = options[ck];
          state.componentProps.disabled = options[ck];
        } else if (ck === "readonly") {
          state.componentProps.readOnly = options[ck];
        } else if (ck === "required") {
          state.required = options[ck];
        } else {
          state[ck] = options[ck];
        }
      }
    });
  }

  var _initOptions = getFieldControledOptions(schema, _evaluator, allOptions || {});

  if (Object.keys(_initOptions).length > 0) {
    if (ctype === "tabpane") {
      (0, _visibility.linkageTabPaneVisible)(form, name, extraProps["data-path"], _initOptions.visible);
    } else {
      _setFieldOptions(name, _initOptions);
    }
  }
}

function initFieldOptions(schema, field, allOptions, _evaluator, form) {
  var extraProps = schema.extraProps || {}; //忽略存在extraNameFieldKey的控件，否则会导致对应的name值无法设置成功

  if (extraProps.extraNameFieldKey) {
    return;
  }

  var ctype = schema.componentName;
  var name = schema.name;

  function _setFieldOptions(options) {
    if (field) {
      for (var ck in options) {
        if (ck === "visible") {
          field.visible = options[ck]; //visible如果为false，value值将会被清空
        } else if (ck === "hidden") {
          field.hidden = options[ck]; //hidden如果为false，只会隐藏控件不会隐藏值
        } else if (ck === "disabled") {
          //field.disabled = options[ck];
          field.componentProps.disabled = options[ck];
        } else if (ck === "readonly") {
          field.componentProps.readOnly = options[ck];
        } else if (ck === "required") {
          field.required = options[ck];
        } else {
          field[ck] = options[ck];
        }
      }
    }
  }

  var _initOptions = getFieldControledOptions(schema, _evaluator, allOptions || {});

  if (Object.keys(_initOptions).length > 0) {
    if (ctype === "tabpane") {
      (0, _visibility.linkageTabPaneVisible)(form, name, extraProps["data-path"], _initOptions.visible);
    } else {
      _setFieldOptions(_initOptions);
    }
  }
}

function triggerExtraFieldValue(schema, instance) {
  var extraProps = schema.extraProps || {}; //如果存在额外的显示字段项，当值改变时设置显示值

  if (schema.display !== "none" && schema.mounted === true && extraProps && extraProps.extraNameFieldKey) {
    var extraNameFieldPath = (0, _utils2.replacePathKey)(schema.path, extraProps.extraNameFieldKey);
    instance.setFieldState(extraNameFieldPath, function (s) {
      s.value = schema.values[1];
    });
  } //

}

function triggerRelatedInputValues(schema, instance) {
  var extraProps = schema.extraProps || {};

  if (extraProps && extraProps.relatedKey) {
    var relatedFieldPath = (0, _utils2.replacePathKey)(schema.path, extraProps.relatedKey);
    var field = instance.query(relatedFieldPath).take();

    if (field) {
      field.setState(function (s) {
        s.inputValues = [s.value, schema.value];
        s.componentProps = _objectSpread({}, s.componentProps);
      });
    }
  }
}

function setSelectable(schema, instance, _evaluator) {
  var _schema$componentName;

  var extraProps = schema.extraProps || {};
  var name = schema.name;
  var ctype = (_schema$componentName = schema.componentName) === null || _schema$componentName === void 0 ? void 0 : _schema$componentName.toLowerCase();

  if (ctype === "datepicker" || ctype === "monthpicker") {
    var expressionVar = (0, _utils2.getExpressionVar)(name);
    var dateItemSelectable = extraProps.itemSelectable;

    if (dateItemSelectable && dateItemSelectable.type === "expression" && dateItemSelectable.expression) {
      instance.setFieldState(name, function (s) {
        s.componentProps.disabledDate = function (currDate) {
          var v = currDate;

          if (typeof currDate.format === "function") {
            v = currDate.format("YYYY-MM-DD");
          }

          var res = _evaluator.evaluate(extraProps.itemSelectable.expression, expressionVar, {
            value: v
          });

          return res;
        };
      });
    }
  }
} //如果当前值为扩展隐藏字段（比如name字段），初始值设置完成后，将值反写到关联字段的values中以便后续消费


function setInitialRelatedInputValues(schema, instance, initialValue) {
  var extraProps = schema.extraProps || {};
  var value = initialValue; //如果id字段已经存在值，则不需要再使用默认值；因为第二次打开表单时不存在默认值

  if (typeof schema.value !== "undefined") {
    value = schema.value;
  } //


  if (extraProps.relatedKey && typeof value !== "undefined") {
    var idFieldPath = (0, _utils2.replacePathKey)(schema.path, extraProps.relatedKey);
    instance.setFieldState(idFieldPath, function (s) {
      s.inputValues = [s.value, value];
    });
  }
}

function refreshInitialValue(schema, instance, loading, _evaluator) {
  var initialValue = (0, _value.setInitialValue)(schema, instance, loading, _evaluator); //必须设置inputValues,因为第二次打开表单时，values已经传递给form的initialValues，未触发onFieldValueChange，
  //所以必须在此手动设置

  setInitialRelatedInputValues(schema, instance, initialValue); //
}

function setInitialOptions(schema, instance, loading, options, _evaluator) {
  var _getItemIndex4 = (0, _utils.getItemIndex)(schema.path),
      triggerIndex = _getItemIndex4.index;

  refreshInitialValue(schema, instance, loading, _evaluator);
  setFieldOptions(schema, options, _evaluator, instance);
  (0, _dataSource2.setInitialDataSource)(schema, instance, _evaluator, triggerIndex);
  setSelectable(schema, instance, _evaluator);
}

function linkageAsyncValue(schema, linkageItemMap, instance, _evaluator, options) {
  var name = schema.name;
  var linkageItem = getLinkageItem(name, linkageItemMap, instance, options);

  if (linkageItem) {
    (0, _value.linkageValue)(linkageItem, instance, _evaluator, "api");
  }
}