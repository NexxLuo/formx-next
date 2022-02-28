"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@formily/react");

var _builtins__ = require("@nvwa/formx-antd/lib/__builtins__");

var _tablex = _interopRequireDefault(require("tablex"));

var _utils = require("tablex/lib/utils");

var _Extends = require("./Extends");

var _reactive = require("@formily/reactive");

var _excluded = ["onBlur", "onFocus", "onSelect", "dataIndexStore", "temporary_virtual", "fixedOperationColumn"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var KEY_FIELD = "__KEY__";

var useAddition = function useAddition(schema) {
  var additionalProperties = schema;

  if (additionalProperties) {
    return additionalProperties.reduceProperties(function (addition, schema) {
      return /*#__PURE__*/_react.default.createElement(_react2.RecursionField, {
        schema: schema,
        name: "addition"
      });
    }, null);
  }

  return null;
};

var BaseArrayTable = function BaseArrayTable(fieldProps) {
  var _props$columnDropMenu;

  var onBlur = fieldProps.onBlur,
      onFocus = fieldProps.onFocus,
      onSelect = fieldProps.onSelect,
      dataIndexStore = fieldProps.dataIndexStore,
      temporary_virtual = fieldProps.temporary_virtual,
      fixedOperationColumn = fieldProps.fixedOperationColumn,
      props = _objectWithoutProperties(fieldProps, _excluded);

  var field = (0, _react2.useField)();
  var fieldPath = field.path.toString();
  var editable = !props.disabled;
  var form = (0, _react2.useForm)();
  var schema = (0, _react2.useFieldSchema)();

  if (props.schema) {
    schema = new _react2.Schema(props.schema);
  }

  var prefixCls = (0, _builtins__.usePrefixCls)("formily-array-table");

  if (field.required) {
    prefixCls = prefixCls + " formx-array-table-required";
  }

  var dataSource = props.dataSource;
  var tbRef = (0, _react.useRef)(null);
  var wrapperRef = (0, _react.useRef)(null);
  var stateStoredRef = (0, _react.useRef)({
    selections: {},
    isAdding: false,
    columnsProps: {},
    columns: []
  });
  var arrayIndexMap = props.arrayIndexMap;
  var isEditor = false;
  isEditor = form.getValuesIn("__DATA__.__isEditor");

  var _evaluator = (0, _Extends.useEvaluator)(form, dataIndexStore);

  var fieldActions = (0, _Extends.useFieldActions)({
    field: field,
    schema: schema,
    form: form,
    stateStoredRef: stateStoredRef,
    dataIndexStore: dataIndexStore,
    wrapperRef: wrapperRef,
    tableRef: tbRef,
    evaluator: _evaluator
  });

  var _useArrayTableColumns = (0, _Extends.useArrayTableColumns)(fieldActions, field, form, schema, dataIndexStore, _evaluator, arrayIndexMap, fixedOperationColumn),
      columns = _useArrayTableColumns.columns,
      columnsProps = _useArrayTableColumns.columnsProps,
      fixedOperationColumns = _useArrayTableColumns.fixedOperationColumns,
      needResetHeaderCellWidth = _useArrayTableColumns.needResetHeaderCellWidth;

  var summary = (0, _Extends.useSummary)(field, dataIndexStore, _evaluator, columnsProps);
  form.notify(fieldPath + "_didUpdate", {
    name: fieldPath,
    payload: {
      columns: columns
    }
  });
  var addition = useAddition(schema);
  var defaultRowKey = KEY_FIELD;
  field.setState(function (s) {
    s.fieldActions = fieldActions;
  });

  var onEditRowChange = function onEditRowChange(keys, e) {
    field.setState(function (s) {
      s.componentProps.editKeys = keys;
    });
    var cellEl = (0, _utils.getParentElement)(e === null || e === void 0 ? void 0 : e.target, ".tablex-table-row-cell");

    if (cellEl) {
      var wrapper = wrapperRef.current;
      var rowIndex = cellEl.dataset.rowindex;
      var columnKey = cellEl.dataset.columnkey;

      if (wrapper) {
        setTimeout(function () {
          var el = wrapper.getElementsByClassName("row-" + rowIndex + "-column-" + columnKey)[0];
          (0, _Extends.focusInput)(el);
        }, 0);
      }
    }
  };

  var onPageChange = function onPageChange(page, pageSize) {
    var _pagination = _objectSpread(_objectSpread({}, props.pagination), {}, {
      pageIndex: page,
      pageSize: pageSize
    });

    form.notify("onListPageChange", {
      props: schema,
      name: fieldPath,
      pagination: _pagination
    });
  }; //


  var wrapperStyle = {
    height: "100%",
    outline: "none",
    width: "100%"
  };
  var tbProps = {
    autoHeight: true
  };

  if (!isEditor) {
    tbProps.orderNumber = {
      resizable: true,
      width: (summary === null || summary === void 0 ? void 0 : summary.titleWidth) || 60
    };
  }

  if (summary !== null) {
    tbProps.summary = summary;
  }

  var layoutProps = field.componentProps["x-layout-props"] || {};
  var layoutHeight = layoutProps.height;

  if (_typeof(layoutHeight) === "object" && layoutHeight) {
    if (layoutHeight.type === "const") {
      tbProps.autoHeight = false;
    } else if (layoutHeight.type === "auto") {} else if (layoutHeight.type === "percent") {
      tbProps.autoHeight = false;
    }
  }

  if (tbProps.autoHeight) {
    tbProps.maxHeight = 3000;
  } //


  var pagination = false;
  var extraProps = props["x-extra-props"] || {};

  var _pagination = extraProps.pagination || {};

  if (_pagination.enabled === true) {
    var prePagination = props.pagination || {};
    pagination = _objectSpread(_objectSpread({}, prePagination), {}, {
      pageSize: prePagination.pageSize || _pagination.pageSize || 20,
      current: prePagination.pageIndex || 1,
      onPageChange: onPageChange
    });

    if (!pagination.total) {
      pagination.total = dataSource.length;
    }
  }

  var selectType = extraProps === null || extraProps === void 0 ? void 0 : extraProps.selectMode;
  var disabledSelectKeys = (0, _Extends.getSelectable)(extraProps, props.flatData, _evaluator);
  var rowSelection = {
    selectType: "single",
    type: "none",
    disabledSelectKeys: disabledSelectKeys
  };

  if (selectType === "multiple") {
    rowSelection = {
      selectType: "multiple",
      type: "checkbox",
      disabledCheckedKeys: disabledSelectKeys
    };
  } else if (selectType === "none") {
    rowSelection = {
      selectType: "none",
      type: "none"
    };
  }

  var editKeys = props.editKeys || [];
  (0, _react.useEffect)(function () {
    if (stateStoredRef.current.isAdding === true) {
      var lastKey = editKeys[0];

      if (lastKey) {
        if (tbRef.current) {
          tbRef.current.api.scrollToRow(lastKey, "start");
        }
      }
    }

    stateStoredRef.current.isAdding = false;
    stateStoredRef.current.columnsProps = columnsProps;
  });
  (0, _react.useLayoutEffect)(function () {
    var _editKeys = props.editKeys || [];

    var columnMatchContentWidth = props.columnMatchContentWidth || false;
    var frameId = null;

    if (columnMatchContentWidth && _editKeys.length === 0) {
      var fn = tbRef.current.api.matchColumnContentWidth;

      if (typeof fn === "function") {
        frameId = requestAnimationFrame(function () {
          tbRef.current.api.matchColumnContentWidth(function (d) {
            if (d && d.isOperationColumn === true) {
              return 0;
            }
          });
        });
      }
    }

    return function () {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [editKeys]);
  var isVirtual = false;

  if (typeof props.virtual === "boolean") {
    isVirtual = props.virtual;
  } else {
    isVirtual = dataSource.length > 50;
  }

  if (temporary_virtual === false) {
    isVirtual = false;
  }

  var columnDropMenu = (_props$columnDropMenu = props.columnDropMenu) !== null && _props$columnDropMenu !== void 0 ? _props$columnDropMenu : true;

  if (isEditor) {
    columnDropMenu = false;
  }

  if (needResetHeaderCellWidth === true) {
    tbProps.onComponentDidUpdate = function () {
      (0, _Extends.resetHeaderCellWidth)(wrapperRef);
    };
  }

  var id = field.path.toString() + "_" + field.form.id;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: prefixCls,
    ref: wrapperRef,
    style: wrapperStyle,
    id: id
  }, /*#__PURE__*/_react.default.createElement(_tablex.default, _extends({
    size: "small",
    rowKey: defaultRowKey,
    editable: editable
  }, props, tbProps, {
    clearPrevSelections: true,
    singleRowEditTrigger: "onDoubleClick",
    loading: field.loading,
    editTools: [],
    minHeight: 200,
    editKeys: editKeys,
    singleRowEdit: editable,
    virtual: isVirtual,
    validateNoEditting: false,
    columnDropMenu: columnDropMenu,
    columnDropMenuOptions: {
      fixable: true,
      filterable: false,
      groupable: true
    },
    dataControled: true,
    bordered: true,
    keyboardNavigation: false,
    pagination: pagination,
    columns: columns,
    dataSource: dataSource,
    onEditRowChange: onEditRowChange,
    onBeforeAdd: function onBeforeAdd() {
      fieldActions.insertData();
      return false;
    },
    footer: function footer() {
      return addition;
    },
    header: function header() {
      if (field.componentProps.displayTitle === false) {
        return null;
      } else {
        return field.componentProps.title || null;
      }
    },
    onRow: function onRow(row) {
      return {
        onClick: function onClick() {
          //如果点击的不是当前编辑行，则取消编辑状态
          var hasEditing = fieldActions.isEditing();
          var isEditing = fieldActions.isEditing(row[KEY_FIELD]);

          if (hasEditing && !isEditing) {
            fieldActions.completeEdit();
          } //

        }
      };
    },
    rowSelection: _objectSpread(_objectSpread({}, rowSelection), {}, {
      onSelectChange: function onSelectChange(keys) {
        var selectedIndex = {};
        keys.forEach(function (k) {
          if (arrayIndexMap.hasOwnProperty(k)) {
            selectedIndex[arrayIndexMap[k]] = true;
          }
        });
        stateStoredRef.current.selections = selectedIndex;

        if (typeof onSelect === "function") {
          onSelect(keys);
        }

        var _name = field.path.toString();

        form.notify(_name + "_onSelectChange", {
          name: _name
        });
      }
    }),
    ref: tbRef
  })), addition, /*#__PURE__*/_react.default.createElement(_Extends.OperationColumnTrigger, {
    operationColumns: fixedOperationColumns,
    form: form,
    onClick: function onClick() {
      field.setComponentProps({
        fixedOperationColumn: !fixedOperationColumn
      });
    }
  }));
};

var ArrayTable = (0, _react2.connect)(BaseArrayTable, (0, _react2.mapProps)(function (props, field) {
  var _field$data;

  var fieldValue = Array.isArray(props.value) ? props.value.slice() : [];
  var dataIndexStore = (0, _Extends.getDataIndexStore)(field);
  var arrayIndexMap = {};
  var isTreeData = false;
  var flatData = [];
  var dataSource = fieldValue;
  var childrenToParents = {};
  var listMap = {};
  fieldValue.forEach(function (d, i) {
    var _key = d[KEY_FIELD];

    if (!d.hasOwnProperty(KEY_FIELD)) {
      if (d.hasOwnProperty("value")) {
        _key = d.value;
      } else {
        _key = new Date().getTime() + "_" + i;
      }

      d[KEY_FIELD] = _key;
    }

    if (d.hasOwnProperty("parent") && !d.hasOwnProperty("__PARENT__")) {
      d.__PARENT__ = d.parent;
    }

    arrayIndexMap[_key] = i;

    if (_key) {
      listMap[_key] = true;
    }

    var parentKey = d.__PARENT__;

    if (parentKey) {
      if (parentKey in childrenToParents) {
        childrenToParents[parentKey].push(d);
      } else {
        childrenToParents[parentKey] = [d];
      }
    }
  });
  dataSource = fieldValue.map(function (d) {
    var item = d;

    if (_typeof(d) === "object" && d) {
      if (!d.__PARENT__ || !listMap[d.__PARENT__]) {
        d.__PARENT__ = "__ROOT__";
      } //如果设置了dataIndex，则dataIndex对应的字段值应进行同步
      //而且必须使用untracked包装，否则输入时会导致表格二次渲染，从而输入卡顿
      //如果使用untracked包装，dataIndex同步会在每次表格渲染后才生效，直接现象就是：必须点击完成编辑才会生效


      (0, _reactive.untracked)(function () {
        //bug fixed : 首次加载时将dataIndex的值映射到字段id
        //bug fixed : dataIndex对应值为undefined时不进行值映射，
        //否则会导致setValue对dataIndex二次设置时，无法成功设置
        for (var k in dataIndexStore) {
          var dataIndex = dataIndexStore[k];

          if (dataIndex && !Reflect.has(item, k) && d[dataIndex] !== undefined) {
            item[k] = d[dataIndex];
          }
        } //
        //修改字段值后，将字段值映射到dataIndex


        for (var _k in d) {
          var targetDataIndex = dataIndexStore[_k];

          if (targetDataIndex) {
            item[targetDataIndex] = d[_k];
          }
        } //

      }); //
      //是否存在子级

      var childrens = childrenToParents[d[KEY_FIELD]] || [];

      if (childrens.length <= 0) {
        d.__LEAF__ = true;
      }

      flatData.push(item);

      if (item.__PARENT__) {
        isTreeData = true;
      }
    }

    return item;
  });

  if (isTreeData) {
    var treeData = (0, _Extends.transformToTreeData)(flatData, KEY_FIELD, "__PARENT__", "__ROOT__");
    dataSource = treeData;
  } else {
    dataSource = flatData;
  }

  return {
    dataIndexStore: dataIndexStore,
    arrayIndexMap: arrayIndexMap,
    dataSource: dataSource,
    flatData: flatData,
    validateResult: (_field$data = field.data) === null || _field$data === void 0 ? void 0 : _field$data.validateResult
  };
}));
ArrayTable.displayName = "ArrayTable";
var _default = ArrayTable;
exports.default = _default;