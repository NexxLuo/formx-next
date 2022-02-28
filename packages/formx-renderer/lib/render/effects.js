"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEffects = void 0;

var _shared = require("@formily/shared");

var _utils = require("../extensions/utils");

var _linkages = require("../core/linkages");

var _utils2 = require("../core/utils");

var _actions = require("../core/actions");

var _excluded = ["context"];

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function formatField(field, options) {
  var componentProps = (0, _shared.clone)(field.componentProps || {});
  var extraProps = componentProps["x-extra-props"] || {};
  var controledOptions = (options === null || options === void 0 ? void 0 : options[extraProps["data-key"]]) || {};
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
    componentName: extraProps === null || extraProps === void 0 ? void 0 : extraProps.name,
    unmounted: field.unmounted,
    mounted: field.mounted,
    visible: field.visible,
    display: field.display,
    alwaysDisabled: controledOptions.disabled === true || controledOptions.readonly === true,
    requestDataSourceWhenDisabled: extraProps.requestDataSourceWhenDisabled
  };
}

function formatSchema(schema) {
  var componentProps = schema["x-component-props"] || {};
  var extraProps = (componentProps === null || componentProps === void 0 ? void 0 : componentProps["x-extra-props"]) || {};
  return {
    name: schema.name,
    path: schema.name,
    extraProps: extraProps,
    componentName: extraProps.name,
    componentProps: componentProps
  };
}

var createEffects = function createEffects($, instance, _consumer) {
  var linkageTargetMap = {};
  var linkageItemMap = {}; //所有被指定为控件动作目标的表单项

  var fieldActionTargetMap = {};

  function getContext() {
    var _consumer2 = _consumer(),
        formSchemaMap = _consumer2.formSchemaMap,
        options = _consumer2.options,
        loading = _consumer2.loading;

    return {
      formSchemaMap: formSchemaMap !== null && formSchemaMap !== void 0 ? formSchemaMap : {},
      options: options !== null && options !== void 0 ? options : {},
      loading: loading !== null && loading !== void 0 ? loading : false
    };
  }

  function getSchema(name) {
    var formSchemaMap = getContext().formSchemaMap;
    return formSchemaMap[name];
  } //创建表达式计算实例，并传递上下文


  var _evaluator = (0, _utils.createEvaluator)(instance); //由于unmounted后field.selfErrors会被清除
  //故在此记录以便表格非编辑状态下展示错误信息


  $("onFieldValidateEnd").subscribe(function (field) {
    if (field.mounted) {
      field.setState(function (state) {
        var prev = state.data;
        var next = {};

        if (prev) {
          next = _objectSpread(_objectSpread({}, prev), {}, {
            selfErrors: field.selfErrors
          });
        } else {
          next = {
            selfErrors: field.selfErrors
          };
        }

        state.data = next;
      });
    }
  });
  $("onFieldInit").subscribe(function (field, form) {
    var schema = formatField(field, getContext().options); //数据表达式

    (0, _linkages.addLinkageItem)(linkageTargetMap, linkageItemMap, "value", schema);
    (0, _linkages.addLinkageItem)(linkageTargetMap, linkageItemMap, "visibility", schema);
    (0, _linkages.addLinkageItem)(linkageTargetMap, linkageItemMap, "availability", schema);
    (0, _linkages.addLinkageItem)(linkageTargetMap, linkageItemMap, "fieldProps", schema);
    (0, _linkages.addLinkageItem)(linkageTargetMap, linkageItemMap, "dataSource", schema); //表格列隐藏条件表达式

    if (schema.componentName === "ArrayTable") {
      var itemsSchema = getSchema(schema.name);
      (0, _utils2.mapSchemaItems)(itemsSchema === null || itemsSchema === void 0 ? void 0 : itemsSchema.items, function (o) {
        (0, _linkages.addLinkageItem)(linkageTargetMap, linkageItemMap, "columnVisibility", _objectSpread(_objectSpread({}, formatSchema(o)), {}, {
          path: schema.name
        }));
      }); //订阅表格数据加载事件

      form.subscribe(function (params) {
        var payload = params.payload || {};

        if (params.type === schema.name + "_reload") {
          var _ref = payload.payload || {},
              _context = _ref.context,
              _payload = _objectWithoutProperties(_ref, _excluded);

          (0, _linkages.setTableDataSource)(schema, form, _objectSpread({}, _payload), _objectSpread(_objectSpread({}, _context), {}, {
            triggerType: "dispatch"
          }));
        }
      }); //
    } //记录被指定为控件动作目标的表单项


    var extraProps = schema.extraProps || {};

    if (_typeof(extraProps.actions) === "object" && extraProps.actions) {
      var actionType = extraProps.actions.type;
      var actionTarget = extraProps.actions.targetField;

      if (actionTarget && actionType) {
        if (fieldActionTargetMap[actionTarget]) {
          fieldActionTargetMap[actionTarget].push(extraProps.actions);
        } else {
          fieldActionTargetMap[actionTarget] = [extraProps.actions];
        }
      }
    } //
    //如果不在init时进行显隐控制，将会导致隐藏的控件依然进行mount
    //新版本后，无论显隐，始终都会触发mount


    (0, _linkages.initFieldOptions)(schema, field, getContext().options, _evaluator, form); //init中设置验证器，mount可能会多次执行

    (0, _linkages.initValidator)(schema, _evaluator, form, getContext());
  });
  $("onFieldMount").subscribe(function (field, form) {
    var schema = formatField(field, getContext().options);
    (0, _actions.setActions)(schema, form, _evaluator);
    (0, _linkages.setInitialOptions)(schema, form, getContext().loading, getContext().options, _evaluator, getContext());
  });
  $("onFieldValueChange").subscribe(function (field, form) {
    var _schema$componentName;

    var schema = formatField(field); //非表格组件value change时才进行联动
    //表格组件change时联动时，如果列字段存在多个联动，会多次触发表格change，影响性能

    if (((_schema$componentName = schema.componentName) === null || _schema$componentName === void 0 ? void 0 : _schema$componentName.toLowerCase()) !== "arraytable") {
      (0, _linkages.triggerLinkage)(schema, linkageItemMap, form, _evaluator, fieldActionTargetMap, getContext().options);
      (0, _linkages.triggerRelatedInputValues)(schema, form);
    }
  });
  $("onFieldInputValueChange").subscribe(function (field, form) {
    var _schema$componentName2;

    var schema = formatField(field);

    if (((_schema$componentName2 = schema.componentName) === null || _schema$componentName2 === void 0 ? void 0 : _schema$componentName2.toLowerCase()) === "arraytable") {
      (0, _linkages.triggerLinkage)(schema, linkageItemMap, form, _evaluator, fieldActionTargetMap, getContext().options);
    }

    (0, _linkages.triggerExtraFieldValue)(schema, form);
    (0, _linkages.linkageDataFill)(form, schema, _evaluator);
    (0, _linkages.linkageAsyncValue)(schema, linkageItemMap, form, _evaluator, getContext().options);
  }); //处理级联隐藏

  (0, _linkages.observerChainHidden)($); //
  //自定义事件响应

  $("onClick").subscribe(function (_ref2, form) {
    var _schema$componentProp;

    var event = _ref2.event,
        payload = _ref2.payload,
        field = _ref2.field;
    var schema = formatField(field);

    if (event === null || event === void 0 ? void 0 : event.stopPropagation) {
      event.stopPropagation();
    }

    (0, _actions.triggerItemActions)(schema, {}, form);
    form.notify(schema.name + "_" + "onClick", {
      name: schema.name,
      event: event,
      payload: payload
    });
    var runtime = (_schema$componentProp = schema.componentProps) === null || _schema$componentProp === void 0 ? void 0 : _schema$componentProp["x-runtime"];

    if (runtime) {
      if (runtime.arrayPath && runtime.isOperationTool === true) {
        if ("index" in runtime) {
          var arrayItem = (0, _shared.clone)(form.getValuesIn(runtime.arrayPath + "." + runtime.index));
          form.notify(runtime.arrayPath + "_" + "onOperationClick", {
            name: runtime.arrayPath,
            event: event,
            payload: {
              row: arrayItem,
              rowIndex: runtime.index,
              code: runtime.code
            }
          });
        }
      }
    }
  });
  $("onSelect").subscribe(function (_ref3, form) {
    var payload = _ref3.payload,
        field = _ref3.field;
    var schema = formatField(field);
    (0, _actions.triggerItemActions)(schema, {}, form);
    form.notify(schema.name + "_" + "onSelect", {
      name: schema.name,
      payload: payload
    });
  });
  $("onSearch").subscribe(function (_ref4, form) {
    var payload = _ref4.payload,
        field = _ref4.field;
    var schema = formatField(field);
    (0, _actions.triggerItemActions)(schema, {}, form);
    form.notify(schema.name + "_" + "onSearch", {
      name: schema.name,
      payload: payload
    });
  });
  $("onClose").subscribe(function (_ref5, form) {
    var payload = _ref5.payload,
        field = _ref5.field;
    var schema = formatField(field);
    (0, _actions.triggerItemActions)(schema, {}, form);
    form.notify(schema.name + "_" + "onClose", {
      name: schema.name,
      payload: payload
    });
  }); //列表数据删除事件

  $("onListItemDelete").subscribe(function (p) {
    var fn = getContext().onListItemDelete;

    if (typeof fn === "function") {
      fn(p);
    }
  }); //

  $("onDataSourceReload").subscribe(function (_ref6, form) {
    var name = _ref6.name,
        payload = _ref6.payload;
    var field = form.query(name).take();
    var schema = formatField(field);
    (0, _linkages.setTableDataSource)(schema, form, {}, {
      triggerType: "fieldAction"
    });
  }); //列表分页

  $("onListPageChange").subscribe(function (_ref7, form) {
    var name = _ref7.name,
        pagination = _ref7.pagination;
    var field = form.query(name).take();
    var schema = formatField(field);
    (0, _linkages.setTableDataSource)(schema, form, pagination, {
      triggerType: "pageChange"
    });
  }); //
  //弹窗数据联动

  $("onModalChange").subscribe(function (_ref8, form) {
    var name = _ref8.name,
        payload = _ref8.payload;
    var field = form.query(name).take();
    var schema = formatField(field);
    (0, _linkages.linkageDataFill)(form, _objectSpread(_objectSpread({}, schema), {}, {
      values: [true, "", _objectSpread({}, payload.data)]
    }), _evaluator);
  }); //
};

exports.createEffects = createEffects;