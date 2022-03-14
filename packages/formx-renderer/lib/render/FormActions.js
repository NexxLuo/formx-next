"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FormEnvs = _interopRequireDefault(require("./FormEnvs"));

var _FormFunction = _interopRequireDefault(require("./FormFunction"));

var _utils = require("../extensions/utils");

var _reactive = require("@formily/reactive");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormActions = /*#__PURE__*/_createClass(function FormActions(_instance, $observable, _consumer) {
  var _this = this;

  _classCallCheck(this, FormActions);

  this.requestFieldDataSource = function (idOrCode, params) {
    return new Promise(function (resolve, reject) {
      var _fieldSchema$xCompon, _fieldSchema$xCompon$;

      var data = null;

      var fieldSchema = _this.getFieldSchema(idOrCode) || _this.getFieldSchemaByCode(idOrCode);

      var dataSourceConfig = fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xCompon = fieldSchema["x-component-props"]) === null || _fieldSchema$xCompon === void 0 ? void 0 : (_fieldSchema$xCompon$ = _fieldSchema$xCompon["x-extra-props"]) === null || _fieldSchema$xCompon$ === void 0 ? void 0 : _fieldSchema$xCompon$.dataSource;
      var dataSource = null;

      if (dataSourceConfig) {
        dataSource = JSON.parse(dataSourceConfig);
      }

      if (dataSource) {
        if (dataSource.type === "const") {
          data = dataSource.data.const;
          resolve(data);
          return;
        } else if (dataSource.type === "formItem") {
          resolve(data);
          return;
        } else if (dataSource.type === "api") {
          var _dataSource$data;

          var apiData = (_dataSource$data = dataSource.data) === null || _dataSource$data === void 0 ? void 0 : _dataSource$data.api;

          if (apiData) {
            var _input = {};

            if (typeof params === "function") {
              _input = params(apiData.input, apiData);
            } else {
              _input = params;
            }

            var _params = {
              id: apiData.dataSourceId,
              input: _input,
              output: apiData.output
            };
            (0, _utils.requestApiById)(_params).then(function (res) {
              resolve(res.data);
            });
          }
        } else {
          resolve(data);
          console.warn("requestFieldDataSource :", "dataSource type unknown");
        }
      } else {
        resolve(data);
        console.warn("requestFieldDataSource :", "dataSource configration not found");
      }
    });
  };

  this.requestDataSource = function (dataSourceId, params) {
    return new Promise(function (resolve, reject) {
      var data = null;

      if (dataSourceId) {
        var _input = {};

        if (typeof params === "function") {
          _input = params();
        } else {
          _input = params;
        }

        var _params = {
          id: dataSourceId,
          input: _input
        };
        (0, _utils.requestApiById)(_params).then(function (res) {
          resolve(res.data);
        });
      } else {
        resolve(data);
        console.warn("requestDataSource :", "dataSourceId not found");
      }
    });
  };

  this.isMobile = function () {
    return _this.isResponsiveSizeSmall();
  };

  this.isResponsiveSizeSmall = function () {
    return (0, _utils.isResponsiveSizeSmall)(_this.getFormInstance());
  };

  this.subscribe = function (type, event) {
    var formInstance = _this.getFormInstance();

    if (formInstance && type && typeof event === "function") {
      return formInstance.subscribe(function (p) {
        if (p.type && p.type === type) {
          event(p.payload);
        }
      });
    }
  };

  this.unsubscribe = function (subscribeId) {
    var formInstance = _this.getFormInstance();

    if (formInstance && subscribeId) {
      return formInstance.unsubscribe(subscribeId);
    }
  };

  this.notify = function (type, payload) {
    var formInstance = _this.getFormInstance();

    return formInstance.notify(type, payload);
  };

  this.getElement = function (id) {
    var el = null;

    var formInstance = _this.getFormInstance();

    if (id && formInstance) {
      el = formInstance.query(id).take();
    }

    return el;
  };

  this.getElementIdByCode = function (code) {
    var el = _this.getElementsByCode(code)[0];

    if (el) {
      return el.name;
    }

    return null;
  };

  this.getElementsByCode = function (code) {
    var arr = [];
    var hasGraph = false;

    var formInstance = _this.getFormInstance();

    if (formInstance && code) {
      var graph = formInstance.getFormGraph();
      var tableGraph = [];

      for (var k in graph) {
        if (k && graph.hasOwnProperty(k)) {
          var _g$component;

          hasGraph = true;
          var g = graph[k];
          var componentProps = (_g$component = g.component) === null || _g$component === void 0 ? void 0 : _g$component[1];

          if (componentProps && g.isTableCellField !== true) {
            var _extraProps$name;

            var extraProps = componentProps["x-extra-props"] || {};
            var ctype = (_extraProps$name = extraProps.name) === null || _extraProps$name === void 0 ? void 0 : _extraProps$name.toLowerCase();

            if (ctype === "arraytable") {
              tableGraph.push(g);
            }

            if (extraProps.formItemCode === code) {
              var path = g.path;

              if (path) {
                arr.push(_objectSpread(_objectSpread({}, componentProps), {}, {
                  name: path,
                  path: g.address
                }));
              }
            }
          }
        }
      }
    }

    if (hasGraph && arr.length === 0) {
      console.error("no element found:", code);
    }

    return arr;
  };

  this.getFormState = function () {
    var formInstance = _this.getFormInstance();

    if (formInstance) {
      return formInstance.getFormState();
    }

    return null;
  };

  this.getFieldState = function (id) {
    var formInstance = _this.getFormInstance();

    if (formInstance && id) {
      var state = formInstance.getFieldState(id);
      return state;
    }

    return null;
  };

  this.setFieldState = function (id, fn) {
    var formInstance = _this.getFormInstance();

    if (formInstance && id && typeof fn === "function") {
      formInstance.setFieldState(id, fn);
    }

    return null;
  };

  this.setValue = function (id, value, callback, nullAsDefault) {
    var formInstance = _this.getFormInstance();

    if (formInstance && id) {
      var field = formInstance.query(id).take();
      var state = null;

      if (field) {
        if (field.displayName === "ArrayField") {
          var _field$fieldActions;

          //如果为表格组件，需要通过表格内部的方法设置值
          var fn = (_field$fieldActions = field.fieldActions) === null || _field$fieldActions === void 0 ? void 0 : _field$fieldActions.setData;

          if (typeof fn === "function") {
            fn(value, callback, nullAsDefault);
          } else {
            field.onInput(value);

            if (typeof callback === "function") {
              callback(id, value);
            }

            console.warn("setValue to ArrayTable but 'setData' function not found, replaced with 'onInput'");
          }
        } else {
          field.setState(function (s) {
            s.value = value;

            if (typeof callback === "function") {
              callback(id, value);
            }
          });
        }
      }

      return state;
    }

    return null;
  };

  this.batch = _reactive.batch;
  this.untracked = _reactive.untracked;

  this.transformCodeValues = function (values) {
    if (_typeof(values) === "object" && values) {
      var realValues = {};
      Reflect.ownKeys(values).forEach(function (k) {
        var id = _this.getElementIdByCode(k);

        if (id) {
          realValues[id] = values[k];
        } else {
          realValues[k] = values[k];
        }
      });
      return realValues;
    }
  };

  this.setFieldValues = function (values) {
    var formInstance = _this.getFormInstance();

    if (formInstance && _typeof(values) === "object" && values) {
      (0, _reactive.batch)(function () {
        Reflect.ownKeys(values).forEach(function (k) {
          var field = formInstance.query(k).take();

          if (field) {
            field.setValue(values[k]);
          }
        });
      });
    }
  };

  this.setFieldValuesByCode = function (values) {
    var realValues = _this.transformCodeValues(values);

    return _this.setFieldValues(realValues);
  };

  this.setValues = function (values) {
    var strategy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "merge";

    var formInstance = _this.getFormInstance();

    if (formInstance && _typeof(values) === "object" && values) {
      var state = formInstance.setValues(values, strategy);
      return state;
    }
  };

  this.setValuesByCode = function (values) {
    var strategy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "merge";

    var realValues = _this.transformCodeValues(values);

    return _this.setValues(realValues, strategy);
  };

  this.getValue = function (id) {
    var formInstance = _this.getFormInstance();

    if (formInstance && id) {
      var _formInstance$getFiel;

      var state = (_formInstance$getFiel = formInstance.getFieldState(id)) === null || _formInstance$getFiel === void 0 ? void 0 : _formInstance$getFiel.value;
      return state;
    }

    return null;
  };

  this.getFieldComponentProps = function (id) {
    var formInstance = _this.getFormInstance();

    if (formInstance && id) {
      var state = formInstance.getFieldState(id);

      if (state) {
        var _state$component;

        return ((_state$component = state.component) === null || _state$component === void 0 ? void 0 : _state$component[1]) || {};
      }
    }

    return null;
  };

  this.setFieldComponentProps = function (id, values) {
    var formInstance = _this.getFormInstance();

    if (_typeof(values) === "object" && values && formInstance) {
      if (id) {
        formInstance.setFieldState(id, function (state) {
          var prev = state.componentProps || {};
          state.componentProps = _objectSpread(_objectSpread({}, prev), values);
        });
      }
    }
  };

  this.getFieldAttribute = function (id) {
    var formInstance = _this.getFormInstance();

    if (formInstance && id) {
      var state = formInstance.getFieldState(id);

      if (state) {
        var _state$component2, _state$component2$;

        var o = ((_state$component2 = state.component) === null || _state$component2 === void 0 ? void 0 : (_state$component2$ = _state$component2[1]) === null || _state$component2$ === void 0 ? void 0 : _state$component2$.attribute) || {};
        return _objectSpread({}, o);
      }
    }

    return null;
  };

  this.setFieldAttribute = function (id, values) {
    var formInstance = _this.getFormInstance();

    if (_typeof(values) === "object" && values && formInstance) {
      if (id) {
        formInstance.setFieldState(id, function (state) {
          var prev = state.componentProps.attribute || {};
          state.componentProps.attribute = _objectSpread(_objectSpread({}, prev), values);
        });
      }
    }
  };

  this.setDataSource = function (id, data) {
    var formInstance = _this.getFormInstance();

    if (id && formInstance) {
      formInstance.setFieldState(id, function (state) {
        state.dataSource = data;
      });
    }
  };

  this.onLoad = function (id, data, options) {
    var formInstance = _this.getFormInstance();

    if (id && formInstance) {
      formInstance.setFieldState(id, function (state) {
        state.dataSource = data;
        state.loading = false;
      });

      if (options) {
        var dataSource = data; //options.data为查找name的数据源，没有则从原始数据源中查找

        if (options.data instanceof Array) {
          dataSource = options.data;
        }

        var idField = options.idField,
            nameField = options.nameField;

        if (idField && dataSource instanceof Array) {
          var field = formInstance.query(id).take();

          if (field) {
            var componentProps = field.component[1] || {};
            var componentAttribute = componentProps.attribute || {};
            var showLabelStrategy = componentProps.showLabelStrategy || componentAttribute.showLabelStrategy;
            var item = null;
            dataSource.forEach(function (d) {
              var _value = d[idField];

              if (_value === field.value) {
                item = d;
              }

              d.value = _value;
            });

            if (item) {
              var _value = field.value;
              var labelMap = {};

              if (showLabelStrategy) {
                labelMap = (0, _utils.getLabelMap)(dataSource);
              }

              var _label = labelMap[_value] || item[nameField];

              field.onInput(_value, _label, item);
            }
          }
        }
      }
    }
  };

  this.addEvent = function (id, type, event) {
    var formInstance = _this.getFormInstance();

    if (formInstance && id && typeof event === "function") {
      //前置事件只能注入到x-prepose-event,因为subscribe无法获取到返回值
      //注意事项:前置事件无法多次添加,会被后添加的覆盖;前置事件无法被dispatch
      var preEvents = ["onBeforeClick", "onBeforeClose", "onBeforeSearch", "onBeforeSelect"];

      if (preEvents.indexOf(type) > -1) {
        formInstance.setFieldState(id, function (state) {
          if (state.componentProps["x-prepose-event"]) {
            state.componentProps["x-prepose-event"][type] = event;
          } else {
            state.componentProps["x-prepose-event"] = _defineProperty({}, type, event);
          }
        });
      } else {
        return _this.subscribe(id + "_" + type, event);
      }
    }
  };

  this.dispatchEvent = function (id, type) {
    var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var formInstance = _this.getFormInstance();

    if (formInstance) {
      formInstance.notify(id + "_" + type, {
        name: id,
        payload: args
      });
    }
  };

  this.addEventByCode = function (code, type, event) {
    var els = [];

    if (code) {
      els = _this.getElementsByCode(code);
    }

    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var name = el === null || el === void 0 ? void 0 : el.name;

      if (name) {
        _this.addEvent(name, type, event);
      }
    }
  };

  this.dispatchEventByCode = function (code, type, args) {
    var els = [];

    if (code) {
      els = _this.getElementsByCode(code);
    }

    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var name = el === null || el === void 0 ? void 0 : el.name;

      if (name) {
        _this.dispatchEvent(name, type, args);
      }
    }
  };

  this.getFieldStateByCode = function (code) {
    var id = _this.getElementIdByCode(code);

    return _this.getFieldState(id);
  };

  this.setFieldStateByCode = function (code, fn) {
    var id = _this.getElementIdByCode(code);

    return _this.setFieldState(id, fn);
  };

  this.setValueByCode = function (code, value) {
    var id = _this.getElementIdByCode(code);

    return _this.setValue(id, value);
  };

  this.getValueByCode = function (code) {
    var id = _this.getElementIdByCode(code);

    return _this.getValue(id);
  };

  this.getFieldComponentPropsByCode = function (code) {
    var id = _this.getElementIdByCode(code);

    return _this.getFieldComponentProps(id);
  };

  this.setFieldComponentPropsByCode = function (code, values) {
    var id = _this.getElementIdByCode(code);

    _this.setFieldComponentProps(id, values);
  };

  this.getFieldAttributeByCode = function (code) {
    var id = _this.getElementIdByCode(code);

    return _this.getFieldAttribute(id);
  };

  this.setFieldAttributeByCode = function (code, values) {
    var id = _this.getElementIdByCode(code);

    return _this.setFieldAttribute(id, values);
  };

  this.getValues = function () {
    var formInstance = _this.getFormInstance();

    if (formInstance) {
      var state = formInstance.getFormState().values;
      return state;
    }

    return null;
  };

  this.getExtraData = function () {
    var formInstance = _this.getFormInstance();

    if (formInstance) {
      var _formInstance$getForm;

      var data = (_formInstance$getForm = formInstance.getFormState().values) === null || _formInstance$getForm === void 0 ? void 0 : _formInstance$getForm["__DATA__"];
      return data;
    }

    return null;
  };

  this.setExtraData = function (values) {
    var formInstance = _this.getFormInstance();

    if (values && _typeof(values) === "object" && formInstance) {
      var _formInstance$getFiel2;

      var prev = ((_formInstance$getFiel2 = formInstance.getFieldState("__DATA__")) === null || _formInstance$getFiel2 === void 0 ? void 0 : _formInstance$getFiel2.value) || {};

      var next = _objectSpread(_objectSpread({}, prev), values);

      formInstance.setFieldState("__DATA__", function (s) {
        s.value = next;
      });
    }
  };

  this.isVirtualField = function (id) {
    var bl = false;

    var formInstance = _this.getFormInstance();

    if (formInstance && id) {
      var _path = id;
      _path = _path.replace(/.additionalProperties./g, "_toolbar.");
      var state = formInstance.getFieldState(_path);

      if (state) {
        var _state$displayName;

        if (((_state$displayName = state.displayName) === null || _state$displayName === void 0 ? void 0 : _state$displayName.toLowerCase()) === "voidfield") {
          bl = true;
        } else {
          var _state$component3, _state$component3$, _extraProps$name2;

          var extraProps = (_state$component3 = state.component) === null || _state$component3 === void 0 ? void 0 : (_state$component3$ = _state$component3[1]) === null || _state$component3$ === void 0 ? void 0 : _state$component3$["x-extra-props"];
          var ctype = extraProps === null || extraProps === void 0 ? void 0 : (_extraProps$name2 = extraProps.name) === null || _extraProps$name2 === void 0 ? void 0 : _extraProps$name2.toLowerCase();
          bl = ["button", "label"].indexOf(ctype) > -1;
        }
      }
    }

    return bl;
  };

  this.setFieldErrors = function (path, msg) {
    var formInstance = _this.getFormInstance();

    if (formInstance && path && msg) {
      var field = formInstance.query(path).take();

      if (field) {
        field.setSelfErrors([msg]);
      }
    }
  };

  this.setTableErrors = function (path, errors) {
    if (path) {
      var instance = _this.getFormInstance();

      var arrayTable = instance.query(path).take();

      if (arrayTable && errors instanceof Array) {
        var _errors = [];
        var arrayPath = arrayTable.address.toString();
        var bl = true;

        for (var i = 0; i < errors.length; i++) {
          var d = errors[i];
          var index = d.index;
          var dataIndex = d.dataIndex;
          var messages = d.messages;

          if (isNaN(index)) {
            bl = false;
          }

          if (!dataIndex) {
            bl = false;
          }

          if (!(messages instanceof Array)) {
            bl = false;
          }

          if (bl === false) {
            break;
          }

          var _address = arrayPath + "." + index + "." + dataIndex;

          _errors.push({
            address: _address,
            messages: messages,
            path: _address,
            type: "error",
            triggerType: "onInput",
            code: "ValidateError"
          });
        }

        if (bl === false) {
          console.error("setTableErrors failed.The parameter is incorrect:", errors);
          return;
        }

        arrayTable.data = {
          validateResult: _errors
        };
        (0, _utils.setTableErrorsToExtraField)(arrayPath, instance, _errors);
      }
    }
  };

  this.clearFieldErrors = function (path) {
    var formInstance = _this.getFormInstance();

    if (formInstance && path) {
      var field = formInstance.query(path).take();

      if (field) {
        field.setSelfErrors([]);
      }
    }
  };

  this.setLoading = function (id, loading) {
    var formInstance = _this.getFormInstance();

    if (id && formInstance) {
      formInstance.setFieldState(id, function (state) {
        state.loading = !!loading;
      });
    }
  };

  this.setFieldLoading = function (path) {
    var loading = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var formInstance = _this.getFormInstance();

    if (formInstance && path) {
      var field = formInstance.query(path).take();

      if (field) {
        field.setLoading(loading);
      }
    }
  };

  this.getFieldLoading = function (path) {
    var formInstance = _this.getFormInstance();

    if (formInstance && path) {
      var field = formInstance.query(path).take();

      if (field) {
        return field.loading;
      }
    }
  };

  this.setFieldLoadingByCode = function (code) {
    var loading = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var id = _this.getElementIdByCode(code);

    _this.setFieldLoading(id, loading);
  };

  this.getFieldLoadingByCode = function (code) {
    var id = _this.getElementIdByCode(code);

    return _this.getFieldLoading(id);
  };

  this.getLoadingFields = function () {
    var formInstance = _this.getFormInstance();

    var loadingFields = [];

    if (formInstance) {
      formInstance.query("*").forEach(function (_field) {
        if (_field.loading && _field.mounted) {
          var _field$componentProps, _field$componentProps2;

          var title = (_field$componentProps = _field.componentProps) === null || _field$componentProps === void 0 ? void 0 : (_field$componentProps2 = _field$componentProps["x-extra-props"]) === null || _field$componentProps2 === void 0 ? void 0 : _field$componentProps2.title;
          loadingFields.push({
            path: _field.address.toString(),
            title: title
          });
        }
      });
    }

    return loadingFields;
  };

  this.setFormLoading = function () {
    var loading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var formInstance = _this.getFormInstance();

    if (formInstance) {
      formInstance.setLoading(loading);
    }
  };

  this.getFormLoading = function () {
    var formInstance = _this.getFormInstance();

    if (formInstance) {
      return formInstance.loading;
    }
  };

  this.isLoading = function () {
    var bl = false;

    var formLoading = _this.getFormLoading();

    if (formLoading === true) {
      bl = true;
      console.warn("Form is in loading status.");
    } else {
      var loadingFields = _this.getLoadingFields();

      if (loadingFields.length > 0) {
        console.warn("Exist fields in loading status:");
        console.info(loadingFields);
        bl = true;
      }
    }

    return bl;
  };

  this.getFormErrors = function () {
    var formInstance = _this.getFormInstance();

    if (formInstance) {
      return formInstance.getFormState().errors;
    }

    return null;
  };

  this.clearFormErrors = function (path) {
    var formInstance = _this.getFormInstance();

    if (formInstance && path) {
      formInstance.clearErrors(path);
    }
  };

  this.setFormState = function (fn) {
    var formInstance = _this.getFormInstance();

    if (formInstance && typeof fn === "function") {
      formInstance.setFormState(fn);
    }

    return null;
  };

  this.onFieldRequestDataSource = function (id, fn) {
    if (id && typeof fn === "function") {
      return _this.subscribe(id + "_onFieldRequestDataSource", fn);
    }

    return null;
  };

  this.onFormValidate = function (id, fn) {
    if (id && typeof fn === "function") {
      var next = _this.tasks.validateTasks || {};
      next[id] = fn;
      _this.tasks.validateTasks = next;
    }

    return null;
  };

  this.onBeforeFormSubmit = function (id, fn) {
    if (id && typeof fn === "function") {
      var next = _this.tasks.beforeSubmitTasks || {};
      next[id] = fn;
      _this.tasks.beforeSubmitTasks = next;
    }

    return null;
  };

  this.onAfterFormSubmit = function (id, fn) {
    if (id && typeof fn === "function") {
      var next = _this.tasks.afterSubmitTasks || {};
      next[id] = fn;
      _this.tasks.afterSubmitTasks = next;
    }

    return null;
  };

  this.onBeforeFormSave = function (id, fn) {
    if (id && typeof fn === "function") {
      var next = _this.tasks.beforeSaveTasks || {};
      next[id] = fn;
      _this.tasks.beforeSaveTasks = next;
    }

    return null;
  };

  this.onAfterFormSave = function (id, fn) {
    if (id && typeof fn === "function") {
      var next = _this.tasks.afterSaveTasks || {};
      next[id] = fn;
      _this.tasks.afterSaveTasks = next;
    }

    return null;
  };

  this.onBeforeSchemaSave = function (id, fn) {
    if (id && typeof fn === "function") {
      var next = _this.tasks.beforeSchemaSave || {};
      next[id] = fn;
      _this.tasks.beforeSchemaSave = next;
    }

    return null;
  };

  this.onFormLoad = function (id, fn) {
    if (id && typeof fn === "function") {
      var next = _this.tasks.formLoad || {};
      next[id] = fn;
      _this.tasks.formLoad = next;
    }

    return null;
  };

  this.callTask = function (taskType, params) {
    var type = {
      beforeSubmit: "beforeSubmitTasks",
      afterSubmit: "afterSubmitTasks",
      validate: "validateTasks",
      beforeSave: "beforeSaveTasks",
      afterSave: "afterSaveTasks",
      beforeSchemaSave: "beforeSchemaSave",
      formLoad: "formLoad"
    }[taskType];
    var formTasks = _this.tasks[type] || {};
    var tasks = [];

    var _loop = function _loop(k) {
      if (Object.hasOwnProperty.call(formTasks, k)) {
        var fn = formTasks[k];

        if (typeof fn === "function") {
          tasks.push(new Promise(function (resolve, reject) {
            var res = fn(params);

            if (res instanceof Promise) {
              res.then(function (_res) {
                resolve(_res);
              }).catch(function (e) {
                var msg = "";

                if (e) {
                  msg = e;
                } else {
                  var _this$getFieldSchema, _this$getFieldSchema$, _this$getFieldSchema$2;

                  var title = (_this$getFieldSchema = _this.getFieldSchema(k)) === null || _this$getFieldSchema === void 0 ? void 0 : (_this$getFieldSchema$ = _this$getFieldSchema["x-component-props"]) === null || _this$getFieldSchema$ === void 0 ? void 0 : (_this$getFieldSchema$2 = _this$getFieldSchema$["x-extra-props"]) === null || _this$getFieldSchema$2 === void 0 ? void 0 : _this$getFieldSchema$2.title;

                  if (title) {
                    msg = title + ",未通过验证";
                  } else {
                    msg = "未知项,未通过验证";
                  }
                }

                reject({
                  path: k,
                  messages: [msg]
                });
              });
            } else {
              if (res) {
                reject(res);
              } else {
                resolve();
              }
            }
          }));
        }
      }
    };

    for (var k in formTasks) {
      _loop(k);
    }

    return new Promise(function (resolve, reject) {
      if (tasks.length > 0) {
        Promise.allSettled(tasks).then(function (res) {
          var errors = res.filter(function (d) {
            return d.status === "rejected";
          }).map(function (d) {
            return d.reason;
          });

          if (errors.length > 0) {
            reject(errors);
          } else {
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  };

  this.getFormInstance = function () {
    return _instance;
  };

  this.formEnvs = new _FormEnvs.default();
  this.formFunction = new _FormFunction.default();

  this.getFormSchema = function () {
    var _consumer2;

    return (_consumer2 = _consumer()) === null || _consumer2 === void 0 ? void 0 : _consumer2.formSchema;
  };

  this.getFieldSchema = function (name) {
    var _consumer3;

    var schemaMap = (_consumer3 = _consumer()) === null || _consumer3 === void 0 ? void 0 : _consumer3.formSchemaMap;

    if (schemaMap && name) {
      return schemaMap[name];
    }

    return null;
  };

  this.getFormContext = function () {
    return _consumer();
  };

  this.getOptions = function () {
    var _consumer4;

    return (_consumer4 = _consumer()) === null || _consumer4 === void 0 ? void 0 : _consumer4.options;
  }; //是否由外部options控制了禁用、只读状态


  this.isControledDisabled = function (id) {
    var _consumer5;

    var bl = false;
    var options = (_consumer5 = _consumer()) === null || _consumer5 === void 0 ? void 0 : _consumer5.options;

    if (_typeof(options) === "object" && options) {
      var name = "";

      if (typeof id === "string") {
        var arr = id.split(".");
        name = arr[arr.length - 1];
      }

      var o = options[name];

      if (_typeof(o) === "object" && o) {
        bl = o.disabled || o.readonly;
      }
    }

    return bl;
  };

  this.getFieldSchemaByCode = function (code) {
    var _consumer6;

    var schemaMap = (_consumer6 = _consumer()) === null || _consumer6 === void 0 ? void 0 : _consumer6.formSchemaMap;

    if (schemaMap && code) {
      for (var k in schemaMap) {
        var _item$xComponentPro;

        var item = schemaMap[k];
        var extraProps = item === null || item === void 0 ? void 0 : (_item$xComponentPro = item["x-component-props"]) === null || _item$xComponentPro === void 0 ? void 0 : _item$xComponentPro["x-extra-props"];

        if (extraProps && extraProps.formItemCode === code) {
          return item;
        }
      }
    }

    return null;
  };

  this.tasks = {};
});

exports.default = FormActions;