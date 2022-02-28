"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEnv = getEnv;
exports.setActions = setActions;
exports.triggerItemActions = triggerItemActions;

var _utils = require("../utils");

var _message = _interopRequireDefault(require("../../extensions/message"));

var _shared = require("@formily/shared");

var _useAsyncDataSource = require("../effects/useAsyncDataSource");

var _utils2 = require("../../extensions/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function getEnv(instance, k, injectEnvs) {
  try {
    if (_typeof(injectEnvs) === "object" && injectEnvs && injectEnvs.hasOwnProperty(k)) {
      return injectEnvs[k];
    }

    var formActions = instance.getFormState().formActions;
    return formActions.formEnvs.getItemValue(k);
  } catch (error) {
    console.error("get environment value error :", error);
    return null;
  }
}
/**
 * 控件动作请求接口
 * @param {*} name
 * @param {*} triggerType
 * @param {*} form
 * @param {*} $
 */


function triggerItemActionRequest(state, args, form) {
  if (state) {
    var _state$componentProps;

    var name = state.path.toString();
    var extraProps = (_state$componentProps = state.componentProps) === null || _state$componentProps === void 0 ? void 0 : _state$componentProps["x-extra-props"];
    var actionRequest = extraProps === null || extraProps === void 0 ? void 0 : extraProps.actionRequest;

    if (actionRequest && actionRequest.enabled === true) {
      var _actionRequest$data;

      var requestDataSourceId = (_actionRequest$data = actionRequest.data) === null || _actionRequest$data === void 0 ? void 0 : _actionRequest$data.dataSourceId;

      if (requestDataSourceId) {
        var _ref = (args === null || args === void 0 ? void 0 : args.payload) || {},
            resolving = _ref.resolving,
            resolve = _ref.resolve,
            reject = _ref.reject;

        callActionRequest(name, form, resolving, resolve, reject);
      }
    }
  }
}
/**
 * 订阅表单项动作
 * @表单实例 {*} instance
 * @表单项key {*} name
 * @表单项props {*} props
 * @observerable {*} $
 */


function triggerItemActions(state, args, form) {
  var name = state.name;
  var actions = {
    queryData: function queryData(name) {
      form.notify("onDataSourceReload", {
        name: name,
        payload: {
          pageIndex: 1
        }
      });
    },
    filterData: function filterData(name, args, sourcename) {
      var v = form.getFieldValue(sourcename);
      form.getFieldState(name, function (state) {
        state.fieldActions.filterData(v);
      });
    },
    findData: function findData(name, args, sourcename) {
      var v = form.getFieldValue(sourcename);
      form.getFieldState(name, function (state) {
        state.fieldActions.findData(v);
      });
    },
    insertData: function insertData(name, args) {
      //如果存在参数(比如：弹窗关闭时)，则修改state.value;
      //否则直接调用表格默认新增方法
      if (args && args.items instanceof Array) {
        form.setFieldState(name, function (state) {
          var prevValue = state.value;

          if (prevValue instanceof Array) {
            state.value = [].concat(_toConsumableArray(state.value), _toConsumableArray(args.items));
          } else {
            state.value = _toConsumableArray(args.items);
          }
        });
      } else {
        form.getFieldState(name, function (state) {
          state.fieldActions.insertData();
        });
      }
    },
    deleteSelected: function deleteSelected(name, args) {
      form.getFieldState(name, function (state) {
        state.fieldActions.deleteSelected(args === null || args === void 0 ? void 0 : args.arrayIndex);
      });
    },
    cloneRow: function cloneRow(name, args) {
      form.getFieldState(name, function (state) {
        state.fieldActions.cloneRow(args === null || args === void 0 ? void 0 : args.arrayIndex);
      });
    },
    moveUp: function moveUp(name, args) {
      form.getFieldState(name, function (state) {
        state.fieldActions.moveUp(args === null || args === void 0 ? void 0 : args.arrayIndex);
      });
    },
    moveDown: function moveDown(name, args) {
      form.getFieldState(name, function (state) {
        state.fieldActions.moveDown(args === null || args === void 0 ? void 0 : args.arrayIndex);
      });
    },
    editRow: function editRow(name, args) {
      form.getFieldState(name, function (state) {
        state.fieldActions.editRow(args === null || args === void 0 ? void 0 : args.arrayIndex, args === null || args === void 0 ? void 0 : args.rowKey);
      });
    },
    openModal: function openModal(name) {
      form.getFieldState(name, function (state) {
        state.fieldActions.show();
      });
    },
    closeModal: function closeModal(name) {
      form.getFieldState(name, function (state) {
        state.fieldActions.hide();
      });
    },
    confirmModal: function confirmModal(name) {
      form.getFieldState(name, function (state) {
        state.fieldActions.confirm();
      });
    }
  };

  if (state) {
    var extraProps = state.extraProps || {};

    if (_typeof(extraProps.actions) === "object" && extraProps.actions) {
      var actionType = extraProps.actions.type;
      var actionTarget = extraProps.actions.targetField;
      var actionCall = actions[actionType];
      var address = state.path;

      var _getItemIndex = (0, _utils.getItemIndex)(address),
          parentKey = _getItemIndex.parentKey,
          index = _getItemIndex.index;

      if (address) {
        if (!actionTarget) {
          actionTarget = parentKey;
        }
      }

      if (actionType && actionTarget && typeof actionCall === "function") {
        var runtime = {};
        var fieldState = form.query(address).take();

        if (fieldState) {
          var _fieldState$component;

          runtime = (0, _shared.clone)(((_fieldState$component = fieldState.componentProps) === null || _fieldState$component === void 0 ? void 0 : _fieldState$component["x-runtime"]) || {});
        }

        actionCall(actionTarget, _objectSpread(_objectSpread({}, args), {}, {
          arrayIndex: index,
          rowKey: runtime.rowKey
        }), name);
      }
    }

    triggerItemActionRequest(state, _objectSpread({}, args), form);
  }
}
/**
 * 表单项动作请求异步接口
 * @param {*} _name
 * @param {*} form
 * @param {*} resolving
 * @param {*} resolve
 * @param {*} reject
 */


function callActionRequest(_name, form, resolving, resolve, reject) {
  var state = form.getFieldState(_name);

  function _resolving() {
    if (typeof resolving === "function") {
      resolving();
    } else {
      form.setFieldState(name, function (_state) {
        _state.componentProps.loading = true;
      });
    }
  }

  function _reject() {
    if (typeof reject === "function") {
      reject();
    } else {
      form.setFieldState(name, function (_state) {
        _state.componentProps.loading = false;
      });
    }

    form.setFieldState(name, function (_state) {
      _state.componentProps.loading = false;
    });
  }

  function _resolve() {
    if (typeof resolve === "function") {
      resolve();
    } else {
      form.setFieldState(name, function (_state) {
        _state.componentProps.loading = false;
      });
    }
  }

  if (!state) {
    _reject();

    return;
  }

  var name = state.path;
  var componentProps = state.component[1] || {};
  var extraProps = componentProps["x-extra-props"] || {}; //控件动作触发时进行数据接口调用

  var actionRequest = extraProps.actionRequest;

  if (actionRequest && actionRequest.enabled === true) {
    var _actionRequest$data2;

    var requestDataSourceId = (_actionRequest$data2 = actionRequest.data) === null || _actionRequest$data2 === void 0 ? void 0 : _actionRequest$data2.dataSourceId;

    if (requestDataSourceId) {
      var _actionRequest$data3, _actionRequest$data4;

      var requestInput = (_actionRequest$data3 = actionRequest.data) === null || _actionRequest$data3 === void 0 ? void 0 : _actionRequest$data3.input;
      var requestOutput = (_actionRequest$data4 = actionRequest.data) === null || _actionRequest$data4 === void 0 ? void 0 : _actionRequest$data4.output;
      var dataIndexMap = {};
      var groups = [];
      var groupsMap = {};
      var items = [];
      var subItems = [];

      if (requestOutput instanceof Array) {
        requestOutput.forEach(function (d) {
          if (d.targetField) {
            if (d.dataType === "array") {
              groups.push(d.targetField);
              groupsMap[d.id] = d.targetField;
            }

            var _field = d.field;

            if (_field) {
              var arr = d.targetField.split(".");
              var fieldKey = arr[arr.length - 1];
              dataIndexMap[_field] = fieldKey;
            }
          }
        });
        requestOutput.forEach(function (d) {
          var parentId = d.parentId;

          if (groupsMap.hasOwnProperty(parentId)) {
            subItems.push(d.targetField);
          } else {
            items.push(d.targetField);
          }
        });
      }

      [].concat(groups, items).forEach(function (d) {
        form.setFieldState(d, function (s) {
          s.componentProps = _objectSpread({}, s.componentProps || {});
          s.loading = true;
        });
      });
      (0, _useAsyncDataSource.useAsyncRequest)({
        name: name,
        service: _utils2.requestApiById,
        extra: {
          form: form,
          id: requestDataSourceId,
          input: (0, _utils2.getRequestParams)(requestInput, form, {}, getEnv)
        },
        resolving: _resolving,
        resolve: _resolve,
        reject: _reject,
        callback: function callback(res) {
          var data = res === null || res === void 0 ? void 0 : res.data;
          var _data = [];
          var _itemData = {};

          if (data instanceof Array) {
            data.forEach(function (item) {
              var _item = _objectSpread({}, item);

              for (var k in _item) {
                var fieldKey = dataIndexMap[k];

                if (fieldKey) {
                  _item[fieldKey] = _item[k];
                }
              }

              _data.push(_item);
            });
            _itemData = _data[0] || {};
          }

          groups.forEach(function (d) {
            form.setFieldState(d, function (s) {
              s.componentProps = _objectSpread({}, s.componentProps || {});
              s.loading = false;
              s.value = _data;
            });
          });
          items.forEach(function (k) {
            if (_itemData.hasOwnProperty(k)) {
              form.setFieldState(k, function (s) {
                s.componentProps = _objectSpread({}, s.componentProps || {});
                s.loading = false;
                s.value = _itemData[k];
              });
            } else {
              form.setFieldState(k, function (s) {
                s.componentProps = _objectSpread({}, s.componentProps || {});
                s.loading = false;
              });
            }
          });
        }
      });
    }
  } else {
    if (typeof resolve === "function") {
      resolve();
    }
  } //

}
/**
 * 响应表单项绑定的事件
 * @param {*} name
 * @param {*} eventType
 * @param {*} form
 * @param {*} _evaluator
 */


function bindItemEvent(schema, eventType, form, _evaluator) {
  var name = schema.name;
  var extraProps = schema.extraProps;
  var state = form.getFieldState(name);
  var preEventType = {
    onClick: "onBeforeClick",
    onSelect: "onBeforeSelect",
    onSearch: "onBeforeSearch",
    onClose: "onBeforeClose"
  }[eventType];

  function callPrepose(data) {
    //模板中配置的前置条件控制
    var preposeEvent = extraProps === null || extraProps === void 0 ? void 0 : extraProps.preposeEvent;

    if (preposeEvent) {
      var expr = preposeEvent.expression;
      var type = preposeEvent.type;
      var msg = preposeEvent.message;

      if (expr && type === eventType) {
        var res = _evaluator.evaluate(expr, {}, data);

        if (res === true) {
          if (msg) {
            _message.default.warn(msg);
          } else {
            console.error("Interrupt execution event '" + eventType + "' by form setting and without message tips");
          }

          return false;
        }
      }
    } //通过脚本注册的前置事件


    var preFn = null;
    var field = form.getFieldState(data === null || data === void 0 ? void 0 : data.name);

    if (field) {
      var _componentProps$xPre;

      var componentProps = field.component[1];
      preFn = componentProps === null || componentProps === void 0 ? void 0 : (_componentProps$xPre = componentProps["x-prepose-event"]) === null || _componentProps$xPre === void 0 ? void 0 : _componentProps$xPre[preEventType];
    }

    if (typeof preFn === "function") {
      return preFn(data);
    }

    return true;
  }

  if (state && eventType) {
    form.setFieldState(name, function (_state) {
      _state.componentProps[eventType] = function (e) {
        var _getItemIndex2 = (0, _utils.getItemIndex)(name),
            parentKey = _getItemIndex2.parentKey,
            index = _getItemIndex2.index;

        if (typeof e.persist === "function") {
          e.persist();
        }

        (0, _utils.callEventWithPrepose)(function () {
          form.notify(eventType, {
            event: e,
            field: _state,
            payload: {
              name: name,
              listKey: parentKey,
              index: index
            }
          });
        }, callPrepose, {
          event: e,
          name: name,
          listKey: parentKey,
          index: index
        });
      };
    });
  }
}

function setActions(schema, instance, _evaluator) {
  var _schema$componentName;

  var ctype = (_schema$componentName = schema.componentName) === null || _schema$componentName === void 0 ? void 0 : _schema$componentName.toLowerCase(); //控件事件订阅,目前暂时只支持以下事件类型

  if (["button", "search", "modal", "select", "treeselect", "arraytable"].indexOf(ctype) > -1) {
    var eventType = {
      button: "onClick",
      select: "onSelect",
      treeselect: "onSelect",
      arraytable: "onSelect",
      search: "onSearch",
      modal: "onClose"
    }[ctype];
    bindItemEvent(schema, eventType, instance, _evaluator);
  }
}