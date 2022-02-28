"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OperationColumnTrigger = OperationColumnTrigger;
exports.focusInput = focusInput;
exports.getDataIndexStore = getDataIndexStore;
exports.renderValue = exports.renderOperationColumn = exports.renderHeaderTools = exports.renderEditor = exports.getSelectable = void 0;
exports.resetHeaderCellWidth = resetHeaderCellWidth;
exports.summaryMath = void 0;
exports.transformToFlatData = transformToFlatData;
exports.transformToTreeData = transformToTreeData;
exports.useArrayTableColumns = void 0;
exports.useEvaluator = useEvaluator;
exports.useFieldActions = void 0;
exports.useSummary = useSummary;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@formily/react");

var _icons = require("@nvwa/formx-antd/lib/icons");

var _shared = require("@formily/shared");

var _antd = require("antd");

var _message = _interopRequireDefault(require("../../../extensions/message"));

var _utils = require("../../../extensions/utils");

var _utils2 = require("../../utils");

var _expression = require("../../expression");

var _functions = require("../../expression/functions");

var _maxBy = _interopRequireDefault(require("lodash/maxBy"));

var _minBy = _interopRequireDefault(require("lodash/minBy"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _value2 = require("../../linkages/value");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var KEY_FIELD = "__KEY__";

function focusInput(wrapper) {
  if (wrapper) {
    //如果自定义李编辑焦点控件，则优先其focus
    var editorEL = wrapper.getElementsByClassName("table-editor-focusable")[0];

    if (editorEL) {
      editorEL.focus();
      return;
    } //


    var selectEl = wrapper.getElementsByClassName("ant-select-enabled")[0];

    if (selectEl) {
      selectEl.click();
      return;
    }

    var inputEl = wrapper.getElementsByTagName("input")[0];

    if (inputEl) {
      inputEl.focus();
      return;
    }

    var buttonEL = wrapper.getElementsByTagName("button")[0];

    if (buttonEL) {
      buttonEL.focus();
      return;
    }
  }
}

var renderHeaderTools = function renderHeaderTools(columnSchema, isEditor, arrayField) {
  var _arrayField$component;

  var innerElements = [];
  var operationElement = null;
  var items = columnSchema.items;
  var basePath = arrayField.address.toString();
  var editable = !((_arrayField$component = arrayField.component[1]) === null || _arrayField$component === void 0 ? void 0 : _arrayField$component.disabled);

  if (items) {
    items.mapProperties(function (item_props, _key) {
      var _extraProps$actions;

      var _props = item_props;

      var _componentProps = _props["x-component-props"] || {};

      var extraProps = _componentProps["x-extra-props"] || {};
      var renderInHeader = extraProps.renderInHeader || false;
      var itemActionType = extraProps === null || extraProps === void 0 ? void 0 : (_extraProps$actions = extraProps.actions) === null || _extraProps$actions === void 0 ? void 0 : _extraProps$actions.type;
      var key = "toolbar_" + _key;

      if (isEditor) {
        innerElements.push( /*#__PURE__*/_react.default.createElement(_react2.RecursionField, {
          key: key,
          basePath: basePath,
          name: key,
          schema: _props
        }));
      } else {
        if (["editRow", "cloneRow", "moveUp", "moveDown"].indexOf(itemActionType) > -1) {
          return null;
        }

        if (!editable) {
          if (["insertData", "deleteSelected", "importData"].indexOf(itemActionType) > -1) {
            return null;
          }
        }

        if (["insertData", "deleteSelected", "importData", "exportData"].indexOf(itemActionType) > -1 || renderInHeader) {
          innerElements.push( /*#__PURE__*/_react.default.createElement(_react2.RecursionField, {
            key: key,
            basePath: basePath,
            name: key,
            schema: _props
          }));
        }
      }
    });
  }

  if (innerElements.length > 0) {
    operationElement = /*#__PURE__*/_react.default.createElement("div", {
      className: "table-head-cell-operation"
    }, innerElements);
  } else if (isEditor) {
    operationElement = /*#__PURE__*/_react.default.createElement("span", {
      style: {
        color: "#c8c8c8"
      }
    }, "\u53EF\u5411\u6B64\u5904\u62D6\u5165\u6309\u94AE");
  } else {
    operationElement = /*#__PURE__*/_react.default.createElement("span", null, columnSchema.title);
  }

  return operationElement;
}; //渲染操作列内容


exports.renderHeaderTools = renderHeaderTools;

var renderOperationColumn = function renderOperationColumn(column, index, row, arrayPath, rowPath, fieldActions, editable) {
  var items = column.items;
  var operationElement = null;

  if (items) {
    var basePath = rowPath;
    var innerElements = items.mapProperties(function (item_props, key) {
      var _props = item_props;
      var componentProps = _props["x-component-props"] || {};
      var extraProps = (componentProps === null || componentProps === void 0 ? void 0 : componentProps["x-extra-props"]) || {};
      var renderInHeader = extraProps.renderInHeader || false;
      var itemAction = extraProps === null || extraProps === void 0 ? void 0 : extraProps.actions;

      if (itemAction) {
        if (["insertData", "importData", "exportData"].indexOf(itemAction.type) > -1) {
          return null;
        }

        if (!editable) {
          if (["editRow", "cloneRow", "deleteSelected", "moveUp", "moveDown"].indexOf(itemAction.type) > -1) {
            return null;
          }
        }

        if (row) {
          if (itemAction.type === "editRow") {
            if (fieldActions.isEditing(row[KEY_FIELD])) return /*#__PURE__*/_react.default.createElement(_icons.CheckOutlined, {
              key: key,
              onClick: function onClick(e) {
                e.stopPropagation();
                fieldActions.completeEdit();
              }
            });
          }
        }
      }

      if (renderInHeader) {
        return null;
      }

      return /*#__PURE__*/_react.default.createElement(_react2.RecursionField, {
        schema: _objectSpread(_objectSpread({}, _props), {}, {
          "x-component-props": _objectSpread(_objectSpread({}, componentProps), {}, {
            disabled: false,
            "x-runtime": {
              isOperationTool: true,
              code: extraProps === null || extraProps === void 0 ? void 0 : extraProps.formItemCode,
              arrayPath: arrayPath,
              isTableCellField: true,
              index: index,
              rowKey: row[KEY_FIELD]
            }
          }),
          isTableCellField: true,
          noneWrapper: true
        }),
        basePath: basePath,
        key: key,
        name: key
      });
    });

    if (innerElements.length > 0) {
      operationElement = /*#__PURE__*/_react.default.createElement("div", {
        className: "table-cell-operation"
      }, innerElements);
    }
  }

  return operationElement;
};

exports.renderOperationColumn = renderOperationColumn;

var formatRenderValue = function formatRenderValue(_ref) {
  var state = _ref.state,
      props = _ref.props,
      path = _ref.path,
      value = _ref.value,
      row = _ref.row,
      rowIndex = _ref.rowIndex,
      _evaluator = _ref._evaluator,
      form = _ref.form,
      _ref$ignoreNumberComm = _ref.ignoreNumberComma,
      ignoreNumberComma = _ref$ignoreNumberComm === void 0 ? false : _ref$ignoreNumberComm;
  var v = value;

  if (props) {
    var _props$xComponent;

    var componentProps = props["x-component-props"] || {};
    var extraProps = componentProps["x-extra-props"] || {};
    var ctype = (_props$xComponent = props["x-component"]) === null || _props$xComponent === void 0 ? void 0 : _props$xComponent.toLowerCase();
    var visibility = extraProps.visibility; //如果列已隐藏，则不渲染值

    if (_typeof(visibility) === "object" && visibility) {
      var _isHidden = false;

      if (visibility.type === "expression" && visibility.expression) {
        _isHidden = _evaluator.evaluate(visibility.expression, {
          items: rowIndex
        }, _objectSpread(_objectSpread({}, row), {}, {
          value: value
        }));
      } else if (visibility.type === "hidden") {
        _isHidden = true;
      }

      if (_isHidden) {
        return null;
      }
    } //


    var nameFieldPath = "";

    if (extraProps.extraNameFieldKey) {
      nameFieldPath = path.replace(props.name, extraProps.extraNameFieldKey);

      if (row) {
        if (value !== null && value !== undefined) {
          v = row[extraProps.extraNameFieldKey];
        } else {
          v = "";
        }
      }
    } //表格中的单选、复选、开关，需要匹配出显示值


    var rowValue = null;
    var enumData = null;
    var isHidden = false;

    if (state) {
      isHidden = state.display !== "visible";
    }

    if (state && state.unmounted !== true) {
      rowValue = state.value;
      enumData = state.dataSource;

      if (nameFieldPath) {
        if (rowValue !== null && rowValue !== undefined) {
          var _form$getFieldState;

          v = (_form$getFieldState = form.getFieldState(nameFieldPath)) === null || _form$getFieldState === void 0 ? void 0 : _form$getFieldState.value;
        } else {
          v = "";
        }
      } else {
        v = rowValue;
      }
    } else {
      //获取默认值时，必须排除隐藏字段
      if (isHidden) {
        value = "";
        v = "";
      }

      if (typeof value === "undefined") {
        var initialValue = extraProps.initialValue;

        if (initialValue && initialValue.type === "const") {
          rowValue = (0, _utils2.transformCommaValuesToArray)(initialValue.const);
        } else {
          rowValue = value;
        }
      } else {
        rowValue = value;
      }

      enumData = props.enum;
    }

    if (enumData instanceof Array) {
      var labels = [];
      var labelMap = {};
      enumData.forEach(function (d) {
        if (d.label !== null && d.value !== null && d.label !== undefined && d.value !== undefined) {
          labelMap[d.value] = d.label;
        }
      });

      if (rowValue instanceof Array) {
        rowValue.forEach(function (d) {
          if (labelMap.hasOwnProperty(d)) {
            labels.push(labelMap[d]);
          }
        });
      } else {
        if (labelMap.hasOwnProperty(rowValue)) {
          labels.push(labelMap[rowValue]);
        }
      }

      if (labels.length > 0) {
        v = labels.join(",");
      }
    } else if (ctype === "switch") {
      var _labelMap = {
        true: componentProps.checkedChildren,
        false: componentProps.unCheckedChildren
      };
      v = _labelMap[rowValue];
    } else if (ctype === "datepicker") {
      v = (0, _utils2.formatDateValue)(rowValue, componentProps.format || "YYYY-MM-DD");
    } else if (ctype === "monthpicker") {
      v = (0, _utils2.formatDateValue)(rowValue, "YYYY-MM");
    }

    if (componentProps.fillZero) {
      var fillZeroValue = undefined;

      if (rowValue !== null && rowValue !== undefined && rowValue !== "") {
        var _rowValue = Number(rowValue);

        if (!isNaN(_rowValue) && typeof componentProps.precision === "number") {
          fillZeroValue = Number(_rowValue).toFixed(componentProps.precision);
        }

        if (typeof fillZeroValue !== "undefined") {
          if (componentProps.commaSeparated === true) {
            rowValue = fillZeroValue;
          } else {
            v = fillZeroValue;
          }
        }
      }
    }

    if (ignoreNumberComma !== true && componentProps.commaSeparated === true) {
      v = (0, _utils2.formatNumberComma)(rowValue);
    }

    if (extraProps.renderFormatter) {
      var _formatedValue = _evaluator.evaluate(extraProps.renderFormatter, {
        items: rowIndex
      }, _objectSpread(_objectSpread({}, row), {}, {
        value: rowValue
      }));

      if (typeof _formatedValue !== "undefined") {
        v = _formatedValue;
      }
    } //

  }

  return v;
};

var ColumnRenderField = function ColumnRenderField(_ref2) {
  var _arrayField$data2;

  var form = _ref2.form,
      props = _ref2.props,
      path = _ref2.path,
      rowIndex = _ref2.rowIndex,
      row = _ref2.row,
      value = _ref2.value,
      _evaluator = _ref2._evaluator,
      columnKey = _ref2.columnKey,
      arrayField = _ref2.arrayField;
  var _path = path;

  if (_typeof(row.__LOADING__) === "object" && row.__LOADING__ && row.__LOADING__[columnKey] === true) {
    return /*#__PURE__*/_react.default.createElement(_antd.Skeleton, {
      active: true,
      paragraph: {
        rows: 1,
        width: "100%",
        style: {
          marginBottom: 0
        }
      },
      title: false
    });
  }

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      _value = _useState2[0],
      setValue = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      errors = _useState4[0],
      setErrors = _useState4[1];

  var _useState5 = (0, _react.useState)({}),
      _useState6 = _slicedToArray(_useState5, 2),
      style = _useState6[0],
      setStyles = _useState6[1];

  (0, _react.useEffect)(function () {
    var state = form.getFieldState(_path);

    if (state) {
      var _state$component;

      var cprops = ((_state$component = state.component) === null || _state$component === void 0 ? void 0 : _state$component[1]) || {};
      var _style = cprops.style;

      if (_style) {
        setStyles(_style);
      }
    }

    var formattedValue = formatRenderValue({
      state: state,
      props: props,
      path: path,
      value: value,
      row: row,
      rowIndex: rowIndex,
      _evaluator: _evaluator,
      form: form
    });
    setValue(formattedValue);
    var timer = setTimeout(function () {
      var _errors = [];

      var _state = form.getFieldState(_path);

      var hasSelfErrors = false;
      var selfErrors = null;

      if (_state) {
        if (_state.display === "visible") {
          var _state$data;

          var _selfErrors = (_state$data = _state.data) === null || _state$data === void 0 ? void 0 : _state$data.selfErrors;

          if (_selfErrors && _selfErrors instanceof Array) {
            hasSelfErrors = true;
            selfErrors = _selfErrors;
          }
        }
      }

      if (hasSelfErrors) {
        _errors = _toConsumableArray(selfErrors);
      } else {
        if (arrayField) {
          var _arrayField$data;

          var _childErrors = (_arrayField$data = arrayField.data) === null || _arrayField$data === void 0 ? void 0 : _arrayField$data.validateResult;

          if (_childErrors instanceof Array) {
            var childErrors = [];

            _childErrors.forEach(function (d) {
              if (d.path === _path) {
                childErrors = childErrors.concat(d.messages);
              }
            });

            _errors = _errors.concat(childErrors);
          }
        }
      }

      setErrors(_errors);
    }, 0);
    return function () {
      clearTimeout(timer);
    };
  }, [value, arrayField === null || arrayField === void 0 ? void 0 : (_arrayField$data2 = arrayField.data) === null || _arrayField$data2 === void 0 ? void 0 : _arrayField$data2.validateResult]);
  var textValue = _value;

  if (_typeof(_value) === "object" && _value) {
    textValue = _value.toString();
  }

  if (errors.length > 0) {
    var errorsMsg = errors.join(";");
    return /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      title: errorsMsg
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "table-cell-validate-error"
    }, /*#__PURE__*/_react.default.createElement("label", {
      style: style,
      title: textValue
    }, textValue)));
  }

  return /*#__PURE__*/_react.default.createElement("label", {
    style: style,
    title: textValue
  }, textValue);
};

var renderValue = function renderValue(form, value, record, index, columnKey, schema, fieldActions, _evaluator, arrayField) {
  var _arrayField$component2;

  var componentProps = schema["x-component-props"] || {};
  var extraProps = componentProps["x-extra-props"] || {};
  var rowPath = arrayField.address.concat(index);
  var arrayPath = arrayField.path.toString();
  var editable = !((_arrayField$component2 = arrayField.component[1]) === null || _arrayField$component2 === void 0 ? void 0 : _arrayField$component2.disabled);
  var row = (0, _shared.clone)(record);

  if (extraProps.isOperationColumn) {
    return renderOperationColumn(schema, index, row, arrayPath, rowPath, fieldActions, editable);
  } else if (extraProps.isRenderSchema === true) {
    return /*#__PURE__*/_react.default.createElement(_react2.RecursionField, {
      schema: _objectSpread(_objectSpread({}, schema), {}, {
        "x-component-props": _objectSpread(_objectSpread({}, componentProps), {}, {
          disabled: false,
          "x-runtime": {
            isRenderSchema: true,
            code: extraProps === null || extraProps === void 0 ? void 0 : extraProps.formItemCode,
            arrayPath: arrayPath,
            isTableCellField: true,
            index: index,
            row: row,
            rowKey: row[KEY_FIELD],
            value: value,
            columnKey: columnKey
          }
        }),
        isTableCellField: true,
        noneWrapper: true
      }),
      basePath: rowPath,
      key: columnKey,
      name: columnKey
    });
  } else {
    return /*#__PURE__*/_react.default.createElement(ColumnRenderField, {
      form: form,
      props: schema,
      path: rowPath.toString() + "." + columnKey,
      rowIndex: index,
      columnKey: columnKey,
      row: row,
      value: value,
      _evaluator: _evaluator,
      arrayField: arrayField
    });
  }
};

exports.renderValue = renderValue;

var renderEditor = function renderEditor(value, record, index, _ref3) {
  var itemKey = _ref3.itemKey,
      props = _ref3.props,
      arrayField = _ref3.arrayField;
  var basePath = arrayField.address.concat(index);
  var componentProps = props["x-component-props"] || {}; //必须进行深拷贝，否则每次输入时都会导致整行渲染

  var row = (0, _shared.clone)(record);
  return /*#__PURE__*/_react.default.createElement(_react2.RecursionField, {
    schema: _objectSpread(_objectSpread({}, props), {}, {
      isTableCellField: true,
      "x-component-props": _objectSpread(_objectSpread({}, componentProps), {}, {
        "x-runtime": {
          isTableCellField: true,
          arrayPath: arrayField.path.toString(),
          index: index,
          row: row,
          rowKey: record[KEY_FIELD]
        }
      })
    }),
    basePath: basePath,
    name: itemKey,
    key: itemKey
  });
};

exports.renderEditor = renderEditor;

var renderColumns = function renderColumns(items, form, fieldActions, field, isEditor, dataIndexStore, _evaluator, arrayIndexMap, options) {
  var parentKey = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : "";
  var fixedOperationColumn = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : true;
  var columns = [];
  var columnsProps = {};
  var _needResetHeaderCellWidth = false;
  3;
  var componentProps = field.component[1] || {};
  var operationColumns = [];
  var leftOperationColumns = [];
  var rightOperationColumns = [];
  items.mapProperties(function (props, key) {
    var _options$key;

    var _componentProps = props["x-component-props"] || {};

    var itemExtraProps = _componentProps["x-extra-props"] || {};
    var isHidden = false;
    var isAlwaysHidden = false;
    var isHiddenWidth = false; //如果options已经控制了列不可见，则始终不可见

    if (((_options$key = options[key]) === null || _options$key === void 0 ? void 0 : _options$key.visible) === false) {
      isHidden = true;
      isHiddenWidth = true; //isAlwaysHidden = true;//经测试提出，options中的visible只控制视觉上的显示隐藏，不应隐藏数据
    } else {
      //计算列是否可见
      var visibility = itemExtraProps.columnVisibility;

      if (!isEditor && _typeof(visibility) === "object" && visibility) {
        if (visibility.type === "hidden") {
          isHidden = true;
          isHiddenWidth = true; //isAlwaysHidden = true;
        } else if (visibility.type === "expression") {
          if (visibility.expression) {
            var res = _evaluator.evaluate(visibility.expression);

            if (res === true) {
              isHidden = true;
            }
          }
        }
      }
    }

    if (_typeof(itemExtraProps.initialValue) === "object" && itemExtraProps.initialValue) {
      if (columnsProps[key]) {
        columnsProps[key].initialValue = itemExtraProps.initialValue;
      } else {
        columnsProps[key] = {
          initialValue: itemExtraProps.initialValue
        };
      }

      if (itemExtraProps.extraNameFieldKey || itemExtraProps.extraIdFieldKey) {
        (0, _utils2.mapSchemaItems)(props, function (_item, _key) {
          var _item$xComponentPro;

          var _itemExtraProps = ((_item$xComponentPro = _item["x-component-props"]) === null || _item$xComponentPro === void 0 ? void 0 : _item$xComponentPro["x-extra-props"]) || {};

          if (_typeof(itemExtraProps.initialValue) === "object" && itemExtraProps.initialValue) {
            if (columnsProps[_key]) {
              columnsProps[_key].initialValue = _itemExtraProps.initialValue;
            } else {
              columnsProps[_key] = {
                initialValue: _itemExtraProps.initialValue
              };
            }
          }
        });
      }
    }

    if (isHidden) {
      if (columnsProps[key]) {
        columnsProps[key].visible = false;
      } else {
        columnsProps[key] = {
          visible: false
        };
      }

      if (parentKey) {
        _needResetHeaderCellWidth = true;
      }
    } //
    //如果时操作列，则需要判断操作列内部按钮是否均为启用，否则需要隐藏操作列


    if (itemExtraProps.isOperationColumn === true) {
      var _options$key2, _options$key3;

      if (((_options$key2 = options[key]) === null || _options$key2 === void 0 ? void 0 : _options$key2.visible) === false) {
        isAlwaysHidden = true;
      } else if (((_options$key3 = options[key]) === null || _options$key3 === void 0 ? void 0 : _options$key3.disabled) === true) {
        var itemIsValid = [];
        (0, _utils2.mapSchemaItems)(props.items, function (_item, _key) {
          var _o = options[_key];

          if (_o) {
            var _item$xComponentPro2, _item$xComponentPro2$;

            var bl = _o.visible !== false && _o.disabled !== true; //临时处理，排除导出按钮

            var _formItemCode = (_item$xComponentPro2 = _item["x-component-props"]) === null || _item$xComponentPro2 === void 0 ? void 0 : (_item$xComponentPro2$ = _item$xComponentPro2["x-extra-props"]) === null || _item$xComponentPro2$ === void 0 ? void 0 : _item$xComponentPro2$.formItemCode;

            if (_formItemCode === "Export") {
              bl = true;
            } //


            itemIsValid.push(bl);
          }
        });

        if (itemIsValid.length > 0 && itemIsValid.indexOf(true) === -1) {
          isAlwaysHidden = true;
        }
      }

      if (!isAlwaysHidden && !isEditor) {
        //如果模板中配置了操作列下的按钮始终隐藏
        //则不显示操作列
        var _itemIsValid = [];
        (0, _utils2.mapSchemaItems)(props.items, function (_item, _key) {
          var _item$xComponentPro3;

          var bl = true;

          var _extraProps = (_item$xComponentPro3 = _item["x-component-props"]) === null || _item$xComponentPro3 === void 0 ? void 0 : _item$xComponentPro3["x-extra-props"];

          if (_extraProps) {
            if (_extraProps.visibility && _extraProps.visibility.type === "hidden") {
              bl = false;
            }

            _itemIsValid.push(bl);
          }
        });

        if (_itemIsValid.length > 0 && _itemIsValid.indexOf(true) === -1) {
          isAlwaysHidden = true;
        }
      }
    } //


    if (isAlwaysHidden === false) {
      var _itemLayoutProps$widt;

      var dataIndex = key;
      var itemKey = key;

      if (_typeof(dataIndexStore) === "object" && dataIndexStore && dataIndexStore.hasOwnProperty(key)) {
        dataIndex = dataIndexStore[key];
      }

      var itemLayoutProps = _componentProps["x-layout-props"] || {};
      var itemWidth = null;

      if (((_itemLayoutProps$widt = itemLayoutProps.width) === null || _itemLayoutProps$widt === void 0 ? void 0 : _itemLayoutProps$widt.type) === "const") {
        var _itemLayoutProps$widt2;

        itemWidth = Number((_itemLayoutProps$widt2 = itemLayoutProps.width) === null || _itemLayoutProps$widt2 === void 0 ? void 0 : _itemLayoutProps$widt2.const);
      }

      var itemProps = {};

      if (["left", "center", "right"].indexOf(itemLayoutProps.labelAlign) > -1) {
        itemProps.halign = itemLayoutProps.labelAlign;
      }

      if (["left", "center", "right"].indexOf(itemLayoutProps.textAlign) > -1) {
        itemProps.align = itemLayoutProps.textAlign;
      }

      if (["left", "right"].indexOf(itemLayoutProps.columnFixed) > -1) {
        itemProps.fixed = itemLayoutProps.columnFixed;
      }

      if (itemLayoutProps.columnFixed === "none") {
        itemProps.fixed = false;
      }

      itemProps.code = itemExtraProps.formItemCode;

      if (typeof itemWidth === "number" && !isNaN(itemWidth)) {
        itemProps.width = itemWidth;
      }

      if (itemExtraProps.isOperationColumn === true) {
        if (!itemProps.hasOwnProperty("width")) {
          itemProps.width = 120;
        }

        if (!itemProps.hasOwnProperty("fixed")) {
          itemProps.fixed = "right";
        }

        itemProps.isOperationColumn = true;
        itemProps.sortable = false;
        itemProps.dropMenu = false;
      }

      if (isHiddenWidth) {
        itemProps.width = 0;
      }

      var column = _objectSpread(_objectSpread({
        title: props.title
      }, itemProps), {}, {
        extra: {
          isHidden: isHidden,
          parentKey: parentKey
        },
        titleRender: function titleRender(_ref4) {
          var column = _ref4.column;
          var title = column.title;
          var title_element = null;

          if (itemExtraProps.isOperationColumn) {
            title_element = renderHeaderTools(props, isEditor, field);
          } else {
            var _options$itemKey;

            if (typeof title === "function") {
              title_element = title({
                column: column
              });
            } else {
              title_element = title;
            }

            if (props.required === true || column.required === true || ((_options$itemKey = options[itemKey]) === null || _options$itemKey === void 0 ? void 0 : _options$itemKey.required) === true) {
              title_element = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
                className: "table-head-cell-tag-required"
              }), title_element);
            }
          }

          if (typeof componentProps.titleRender === "function") {
            return componentProps.titleRender(title_element, props, itemProps);
          }

          return title_element;
        },
        onHeaderCell: function onHeaderCell(cellProps) {
          var cls = ["column_" + cellProps.key];
          var extra = cellProps.extra;

          if (extra === null || extra === void 0 ? void 0 : extra.isHidden) {
            cls.push("tablex-table-column-hidden");
          }

          return {
            className: cls.join(" "),
            "data-parentkey": extra === null || extra === void 0 ? void 0 : extra.parentKey
          };
        },
        onCell: function onCell(row, index, column, extra) {
          var cls = ["column_" + column.columnKey, "row-" + index + "-column-" + column.columnKey];

          if (extra === null || extra === void 0 ? void 0 : extra.isHidden) {
            cls.push("tablex-table-column-hidden");
          }

          return {
            className: cls.join(" ")
          };
        },
        key: key,
        dataIndex: dataIndex,
        renderText: function renderText(value, record, index) {
          return formatRenderValue({
            state: null,
            props: props,
            path: field.address.toString(),
            value: value,
            row: record,
            rowIndex: index,
            _evaluator: _evaluator,
            form: form,
            ignoreNumberComma: true
          });
        },
        render: function render(value, record, index) {
          return renderValue(form, value, record, arrayIndexMap[record[KEY_FIELD]], itemKey, props, fieldActions, _evaluator, field);
        },
        editor: function editor(value, record) {
          return renderEditor(value, record, arrayIndexMap[record[KEY_FIELD]], {
            props: props,
            itemKey: itemKey,
            arrayField: field
          });
        }
      });

      if (itemExtraProps.isOperationColumn) {
        column.editor = null;
      }

      if (typeof componentProps.resizable === "boolean") {
        column.resizable = componentProps.resizable;
      }

      if (itemExtraProps.isOperationColumn) {
        if (column.fixed === "left") {
          leftOperationColumns.push(column);
          operationColumns.push(column);
        } else if (column.fixed === "right") {
          rightOperationColumns.push(column);
          operationColumns.push(column);
        } else {
          columns.push(column);
        }

        if (fixedOperationColumn === false) {
          column.fixed = false;
        }
      } else {
        if (props.items) {
          var _renderColumns = renderColumns(props.items, form, fieldActions, field, isEditor, dataIndexStore, _evaluator, arrayIndexMap, options, itemKey),
              childrens = _renderColumns.columns,
              needResetHeaderCellWidth = _renderColumns.needResetHeaderCellWidth;

          if (childrens instanceof Array && childrens.length > 0) {
            column.children = childrens;
          }

          if (_needResetHeaderCellWidth === false) {
            _needResetHeaderCellWidth = needResetHeaderCellWidth;
          }
        }

        columns.push(column);
      }
    }
  });
  return {
    columns: [].concat(leftOperationColumns, columns, rightOperationColumns),
    columnsProps: columnsProps,
    fixedOperationColumns: operationColumns,
    needResetHeaderCellWidth: true
  };
};

var useArrayTableColumns = function useArrayTableColumns(fieldActions, field, form, schema, dataIndexStore, _evaluator, arrayIndexMap, fixedOperationColumn) {
  var _props$context;

  var _fixedOperationColumn = true;

  if (typeof fixedOperationColumn === "boolean") {
    _fixedOperationColumn = fixedOperationColumn;
  } else {
    if ((0, _utils.isResponsiveSizeSmall)(form)) {
      _fixedOperationColumn = false;
    }
  }

  var isEditor = false;
  isEditor = form.getValuesIn("__DATA__.__isEditor");
  var _props = form.props;
  var options = ((_props$context = _props.context) === null || _props$context === void 0 ? void 0 : _props$context.options) || {};
  return renderColumns(schema.items, form, fieldActions, field, isEditor, dataIndexStore, _evaluator, arrayIndexMap, options, "", _fixedOperationColumn);
};

exports.useArrayTableColumns = useArrayTableColumns;

function createRowData() {
  var item = {};
  return item;
}

function getColumnInitialValue(_ref5) {
  var column = _ref5.column,
      index = _ref5.index,
      _evaluator = _ref5._evaluator,
      instance = _ref5.instance,
      ignoreAsync = _ref5.ignoreAsync;
  var initialValue = column.initialValue;
  var expressionVar = {
    items: index
  };
  var _initialValue = undefined;

  if (_typeof(initialValue) === "object" && initialValue) {
    _initialValue = (0, _value2.getValue)(initialValue, instance, expressionVar, _evaluator, ignoreAsync);
  }

  return _initialValue;
} //给表格设置值时，需要执行默认值表达式，避免字段丢失默认值


function getEmptyRow(_ref6) {
  var row = _ref6.row,
      index = _ref6.index,
      dataIndexStore = _ref6.dataIndexStore,
      columnsProps = _ref6.columnsProps,
      _evaluator = _ref6._evaluator,
      instance = _ref6.instance,
      _ref6$callback = _ref6.callback,
      callback = _ref6$callback === void 0 ? null : _ref6$callback,
      ignoreAsync = _ref6.ignoreAsync,
      _ref6$nullAsDefault = _ref6.nullAsDefault,
      nullAsDefault = _ref6$nullAsDefault === void 0 ? false : _ref6$nullAsDefault;
  var defaultValues = {};
  var _row = {};
  var columnLoading = {};

  if (_typeof(row) === "object" && row) {
    for (var k in row) {
      var v = row[k];

      if (nullAsDefault) {
        if (v !== null && v !== undefined) {
          _row[k] = v;
        }
      } else {
        _row[k] = v;
      }
    } //setValue如果对dataIndex赋值
    //则自动给对应的字段id赋值,dataIndex值优先


    var dataIndexField = {};

    if (_typeof(dataIndexStore) === "object" && dataIndexStore) {
      Reflect.ownKeys(dataIndexStore).forEach(function (k) {
        var v = dataIndexStore[k];
        dataIndexField[v] = k;
      });
    }

    if (Reflect.ownKeys(dataIndexField).length > 0) {
      for (var _k in row) {
        var _v = row[_k];
        var columnKey = dataIndexField[_k];

        if (columnKey && columnKey !== _k) {
          if (nullAsDefault) {
            if (_v !== null && _v !== undefined) {
              _row[columnKey] = _v;
            }
          } else {
            _row[columnKey] = _v;
          }
        }
      }
    } //

  } //f3bfe10dfd70947e8b7b36fbee926f9e5


  if (_typeof(columnsProps) === "object" && columnsProps) {
    Object.keys(columnsProps).forEach(function (k) {
      var column = columnsProps[k];
      var initialValue = getColumnInitialValue({
        column: column,
        index: index,
        _evaluator: _evaluator,
        instance: instance,
        ignoreAsync: ignoreAsync
      });

      if (typeof initialValue !== "undefined") {
        var _initialValue$constru;

        if ((initialValue === null || initialValue === void 0 ? void 0 : (_initialValue$constru = initialValue.constructor) === null || _initialValue$constru === void 0 ? void 0 : _initialValue$constru.name) === "Promise") {
          callback(initialValue);
        } else {
          defaultValues[k] = initialValue;
        }
      }

      var _initialValue = column.initialValue;

      if (ignoreAsync && (_initialValue === null || _initialValue === void 0 ? void 0 : _initialValue.type) === "api" && (_initialValue === null || _initialValue === void 0 ? void 0 : _initialValue.api)) {
        columnLoading[k] = true;
      }
    });
  }

  var item = _objectSpread(_objectSpread({}, defaultValues), _row);

  if (Object.keys(columnLoading).length > 0) {
    item["__LOADING__"] = columnLoading;
  }

  return item;
}

var useFieldActions = function useFieldActions(_ref7) {
  var field = _ref7.field,
      schema = _ref7.schema,
      wrapperRef = _ref7.wrapperRef,
      stateStoredRef = _ref7.stateStoredRef,
      dataIndexStore = _ref7.dataIndexStore,
      form = _ref7.form,
      tableRef = _ref7.tableRef,
      evaluator = _ref7.evaluator;

  var toggleColumnVisibility = function toggleColumnVisibility(columnKey, bl) {
    var wrapper = wrapperRef.current;

    if (columnKey && wrapper) {
      var isHidden = false;

      if (bl === true) {
        isHidden = true;
      } else {
        isHidden = false;
      }

      var columnClass = "column_" + columnKey;
      var headCellElements = wrapper.querySelectorAll(".tablex-table-head-cell." + columnClass);
      var rowCellElements = wrapper.querySelectorAll(".tablex-table-row-cell." + columnClass);

      for (var i = 0; i < headCellElements.length; i++) {
        var element = headCellElements[i];

        if (isHidden) {
          element.classList.add("tablex-table-column-hidden");
        } else {
          element.classList.remove("tablex-table-column-hidden");
        }
      }

      for (var _i2 = 0; _i2 < rowCellElements.length; _i2++) {
        var _element = rowCellElements[_i2];

        if (isHidden) {
          _element.classList.add("tablex-table-column-hidden");
        } else {
          _element.classList.remove("tablex-table-column-hidden");
        }
      }
    }

    resetHeaderCellWidth(wrapperRef);
  };

  var mapItems = function mapItems(callback) {
    return (0, _utils2.mapSchemaItems)(schema.items, callback);
  };

  return {
    getInstance: function getInstance() {
      return tableRef.current;
    },
    mapItems: mapItems,
    toggleColumnVisibility: toggleColumnVisibility,
    isEditing: function isEditing() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var editingKeys = field.componentProps.editKeys || [];

      if (key) {
        return editingKeys.indexOf(key) > -1;
      } else {
        return editingKeys.length > 0;
      }
    },
    completeEdit: function completeEdit() {
      var editingKeys = field.componentProps.editKeys || [];

      if (editingKeys.length > 0) {
        //需验证完成后才能关闭编辑状态，否则会导致不显示验证错误提示
        field.setState(function (s) {
          s.componentProps.editKeys = [];

          if (s.componentProps.temporary_virtual === false) {
            s.componentProps.temporary_virtual = true;
          }
        }); //触发onInput以响应联动

        var arr = (0, _shared.clone)(field.getState().value);
        field.onInput(arr);
      }
    },
    editRow: function editRow(index) {
      var rowKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

      if (index > -1) {
        var _field$getState$value;

        var k = (_field$getState$value = field.getState().value[index]) === null || _field$getState$value === void 0 ? void 0 : _field$getState$value[KEY_FIELD];

        if (k) {
          field.setState(function (s) {
            s.componentProps.editKeys = [k];
          });
        }
      } else if (rowKey) {
        field.setState(function (s) {
          s.componentProps.editKeys = [rowKey];
        });
      }
    },
    deleteSelected: function deleteSelected(index) {
      var deleted = [];
      var deletedIndex = [];
      var arr = (0, _shared.clone)(field.value);
      var next = [];

      if (index > -1) {
        for (var i = 0; i < arr.length; i++) {
          if (i == index) {
            deleted.push(arr[i]);
            deletedIndex.push(i);
          } else {
            next.push(arr[i]);
          }
        }
      } else {
        var selections = stateStoredRef.current.selections || {};

        if (Object.keys(selections).length > 0) {
          arr.forEach(function (d, i) {
            if (selections.hasOwnProperty(i) && selections[i] === true) {
              deleted.push(d);
              deletedIndex.push(i);
            } else {
              next.push(d);
            }
          });
          stateStoredRef.current.selections = {};
        } else {
          _message.default.warning("请选择需要删除的数据");
        }
      }

      if (deleted.length > 0) {
        for (var _i3 = deletedIndex.length - 1; _i3 >= 0; _i3--) {
          var _index2 = deletedIndex[_i3]; //field.remove(index);
        } //需要使用onInput更新表格数据，
        //使用remove会导致表格父级容器隐藏时,删除第一行数据暂存，再显示出容器时，
        //表格数据未清空，并且数据中丢失掉隐藏字段默认值


        field.onInput(next); //删除数据时重新验证表格数据，以刷新validateResult中的数据

        field.validate();
        form.notify("onListItemDelete", {
          data: deleted,
          key: field.path.toString()
        });
      }
    },
    cloneRow: (0, _debounce.default)(function (index) {
      if (index > -1) {
        var arr = field.value.slice();
        var row = arr[index];

        if (row) {
          var o = _objectSpread({}, row);

          delete o.Id;
          delete o[KEY_FIELD];
          delete o.value;
          delete o.__PARENT__;
          delete o.children;
          field.push(o);
        }
      }
    }, 100),
    moveDown: function moveDown(index) {
      var _index = Number(index);

      if (index !== null && !isNaN(_index)) {
        field.moveDown(_index);
      }
    },
    moveUp: function moveUp(index) {
      var _index = Number(index);

      if (index !== null && !isNaN(_index)) {
        field.moveUp(_index);
      }
    },
    insertData: (0, _debounce.default)(function () {
      var o = createRowData();
      o[KEY_FIELD] = new Date().getTime();
      field.push(o);
      field.setState(function (s) {
        s.componentProps.editKeys = [o[KEY_FIELD]];
      });
      stateStoredRef.current.isAdding = true;
    }, 100),
    getSelections: function getSelections() {
      //通过选中的行索引获取真实的行数据
      var rowsIndex = stateStoredRef.current.selections;
      var rows = [];

      if (Object.keys(rowsIndex).length > 0) {
        var _values = field.getState().value || [];

        _values.forEach(function (d, i) {
          if (rowsIndex.hasOwnProperty(i) && rowsIndex[i] === true) {
            rows.push(d);
          }
        });
      }

      return rows;
    },
    setData: function setData(arr, callback) {
      var nullAsDefault = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var data = [];

      if (arr instanceof Array) {
        var _dataIndexStore = dataIndexStore; //如果不进行reset,表格中存在下拉类控件时，且正处于编辑状态中时，会有如下bug：
        //setValue时会导致无法正确设置值，需要setValue两次，第一次完成编辑，第二次才设置到值
        //field.reset({ forceClear: true, validate: true });
        //reset会导致多次setData时，如果值较多会造成状态更新报错，故改用设置editKeys
        //bug fixed : 如果不进行editKeys置空,表格中存在下拉类控件时，setValue时会导致无法正确设置值，需要setValue两次，第一次完成编辑，第二次才设置到值

        field.setState(function (s) {
          s.componentProps.editKeys = [];
        }); //

        var fieldPath = field.path.toString();
        var promiseAll = [];
        arr.forEach(function (d, i) {
          if (_typeof(d) === "object" && d) {
            data.push(getEmptyRow({
              row: d,
              index: i,
              dataIndexStore: _dataIndexStore,
              columnsProps: null,
              _evaluator: evaluator,
              instance: form,
              ignoreAsync: true,
              nullAsDefault: nullAsDefault
            }));
          }
        }); //始终初始值

        field.onInput(data); //设置联动值,如果存在联动值需要再次触发onInput，因为第一次无法拿到联动表单项的数据
        //场景：表格数据导入，某个字段值来自当前行数据并进行公式计算得出

        data = [];
        arr.forEach(function (d, i) {
          if (_typeof(d) === "object" && d) {
            data.push(getEmptyRow({
              row: d,
              index: i,
              dataIndexStore: _dataIndexStore,
              columnsProps: stateStoredRef.current.columnsProps,
              _evaluator: evaluator,
              instance: form,
              ignoreAsync: true,
              nullAsDefault: nullAsDefault
            }));
          }
        });
        field.onInput(data); //
        //设置异步值

        data = [];
        arr.forEach(function (d, i) {
          if (_typeof(d) === "object" && d) {
            data.push(getEmptyRow({
              row: d,
              index: i,
              dataIndexStore: _dataIndexStore,
              columnsProps: stateStoredRef.current.columnsProps,
              _evaluator: evaluator,
              instance: form,
              ignoreAsync: false,
              nullAsDefault: nullAsDefault,
              callback: function callback(task) {
                promiseAll.push(task);
              }
            }));
          }
        });

        if (data.length > 0 && promiseAll.length > 0) {
          Promise.all(promiseAll).then(function (resArr) {
            var arr = [];
            var itemsMap = {};

            if (resArr instanceof Array) {
              resArr.forEach(function (d) {
                for (var k in d) {
                  var v = d[k];

                  if (k.indexOf(fieldPath + ".") > -1) {
                    var _getItemIndex = (0, _utils2.getItemIndex)(k),
                        index = _getItemIndex.index,
                        key = _getItemIndex.key;

                    if (index && key) {
                      if (itemsMap[index]) {
                        itemsMap[index][key] = v;
                      } else {
                        itemsMap[index] = _defineProperty({}, key, v);
                      }
                    }
                  }
                }
              });
            }

            data.forEach(function (d, i) {
              var _d = _objectSpread({}, d);

              var item = itemsMap[i];

              if (item) {
                _d = _objectSpread(_objectSpread({}, item), d);
              }

              arr.push(_d);
            });
            field.onInput(arr);

            if (typeof callback === "function") {
              callback(arr, fieldPath);
            }
          });
        } else {
          if (typeof callback === "function") {
            callback(data, fieldPath);
          }
        }
      }
    }
  };
};

exports.useFieldActions = useFieldActions;

function getDataIndexStore(field) {
  var dataIndexStore = {};
  var extraProps = field.componentProps["x-extra-props"]; //根据数据源中的绑定表单项设置表格的dataIndex

  if (extraProps.dataSource) {
    var dataSource = null;

    try {
      dataSource = JSON.parse(extraProps.dataSource);
    } catch (error) {}

    if (dataSource.data) {
      if (dataSource.type === "api") {
        if (dataSource.data.api && dataSource.data.api.output instanceof Array) {
          dataSource.data.api.output.forEach(function (d) {
            var fp = d.targetField;
            var fk = "";

            if (fp) {
              fk = fp.split(".items.")[1];

              if (fk) {
                dataIndexStore[fk] = d.field;
              }
            }
          });
        }
      } else if (dataSource.type === "const") {
        if (dataSource.data.fields instanceof Array) {
          dataSource.data.fields.forEach(function (d) {
            var fp = d.targetField;
            var fk = "";

            if (fp) {
              fk = fp.split(".items.")[1];

              if (fk) {
                dataIndexStore[fk] = d.field;
              }
            }
          });
        }
      }
    }
  } //


  return dataIndexStore;
}

function useEvaluator(form, dataIndexStore) {
  //表格非编辑模式时的公式计算
  return new _expression.Evaluator({
    functions: {
      value: function value(k) {
        var v = null;

        if (k) {
          var _getItemIndex2 = (0, _utils2.getItemIndex)(k),
              index = _getItemIndex2.index,
              listKey = _getItemIndex2.parentKey,
              columnKey = _getItemIndex2.key;

          var fieldKey = columnKey;

          if (_typeof(dataIndexStore) === "object" && dataIndexStore && dataIndexStore.hasOwnProperty(columnKey)) {
            fieldKey = dataIndexStore[columnKey];
          }

          if (index > -1) {
            var _values$index;

            var values = form.getValuesIn(listKey) || [];
            v = (_values$index = values[index]) === null || _values$index === void 0 ? void 0 : _values$index[fieldKey];
          } else {
            if (listKey) {
              v = form.getValuesIn(listKey);

              if (v instanceof Array) {
                v = v.map(function (d) {
                  return d[fieldKey];
                });
              }

              if (typeof v === "undefined") {
                v = [];
              }
            } else {
              v = form.getValuesIn(k);
            }
          }
        }

        return v;
      }
    }
  });
}

function tryParseNumber(v) {
  var nv = Number(v);

  if (isNaN(nv)) {
    return v;
  }

  return nv;
}

var summaryMath = {
  max: function max(items, key) {
    var r = (0, _maxBy.default)(items, function (o) {
      return tryParseNumber(o[key]);
    }) || {};
    return r[key];
  },
  min: function min(items, key) {
    var r = (0, _minBy.default)(items, function (o) {
      return tryParseNumber(o[key]);
    }) || {};
    return r[key];
  },
  average: function average(items, key) {
    var sum = _functions.MathAdd.apply(null, items.map(function (o) {
      return o[key];
    }));

    if (sum === undefined) {
      return "";
    } else {
      return (0, _functions.MathDivide)(sum, items.length);
    }
  },
  avg: function avg(items, key) {
    var sum = _functions.MathAdd.apply(null, items.map(function (o) {
      return o[key];
    }));

    if (sum === undefined) {
      return "";
    } else {
      return (0, _functions.MathDivide)(sum, items.length);
    }
  },
  sum: function sum(items, key) {
    var r = _functions.MathAdd.apply(null, items.map(function (o) {
      return o[key];
    }));

    return r;
  }
};
exports.summaryMath = summaryMath;

function useSummary(field, dataIndexStore, _evaluator, columnsProps) {
  var extraProps = field.componentProps["x-extra-props"]; //数据汇总配置

  var summary = null;

  if (extraProps && extraProps.summary) {
    var _summary = extraProps.summary;

    if (_summary.enabled) {
      var _arr = _summary.data;

      if (_arr instanceof Array && _arr.length > 0) {
        var exprMap = {};
        var itemKeyMap = {};
        var obj = {};

        _arr.forEach(function (d) {
          var _key = d.field;

          if (_key) {
            var temp = _key.split(".items.");

            _key = temp[temp.length - 1];
          }

          if (_typeof(dataIndexStore) === "object" && dataIndexStore && dataIndexStore.hasOwnProperty(_key)) {
            _key = dataIndexStore[_key];
          }

          obj[_key] = d.type;
          exprMap[_key] = d.expression;
          itemKeyMap[_key] = d.field;
        });

        var _titleWidth = undefined;

        if (typeof _summary.width === "number") {
          _titleWidth = _summary.width;
        } else {
          var _summary$title;

          var len = (_summary$title = _summary.title) === null || _summary$title === void 0 ? void 0 : _summary$title.length;

          if (len > 0) {
            _titleWidth = len * 14 + 10;
          }

          if (_titleWidth < 60) {
            _titleWidth = 60;
          }
        }

        summary = {
          title: {
            column: "__ordernumber_column",
            text: _summary.title
          },
          titleWidth: _titleWidth,
          custom: true,
          rowHeight: 30,
          data: [obj],
          onCell: function onCell(row, index, column) {
            var _columnsProps$column$;

            var cls = ["tablex-table-row-cell", "column_" + column.columnKey];
            var isHidden = (columnsProps === null || columnsProps === void 0 ? void 0 : (_columnsProps$column$ = columnsProps[column.columnKey]) === null || _columnsProps$column$ === void 0 ? void 0 : _columnsProps$column$.visible) === false;

            if (isHidden) {
              cls.push("tablex-table-column-hidden");
            }

            return {
              className: cls.join(" ")
            };
          },
          render: function render(value, k, type) {
            var expr = exprMap[k];
            var fn = summaryMath[type];
            var summaryValue = null;

            if (typeof fn === "function") {
              var flatData = field.getState().value || [];
              var _itemKey = itemKeyMap[k];
              var _itemDataIndex = k; //编辑模式时，列表数据key为id，非编辑模式时为dataIndex
              //如果修改过值，则将dataIndex对应的值进行同步

              flatData.forEach(function (d) {
                if (d.hasOwnProperty(_itemKey)) {
                  d[_itemDataIndex] = d[_itemKey];
                }
              }); //

              summaryValue = fn(flatData, k);

              if (isNaN(summaryValue) || typeof summaryValue === "undefined") {
                summaryValue = "";
              }
            }

            if (expr) {
              var res = _evaluator.evaluate(expr, {}, {
                value: summaryValue
              });

              return res;
            } else {
              return summaryValue;
            }
          }
        };
      }
    }
  }

  return summary; //
}

function transformToFlatData() {
  var treeData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var removeChildren = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var treeList = treeData || []; //末级节点

  var leafs = []; //根

  var roots = []; //所有节点

  var list = [];

  for (var i = 0; i < treeList.length; i++) {
    var d = treeList[i];
    var childrens = d.children || [];
    list.push(d);
    roots.push(d);

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

    for (var _i4 = 0; _i4 < tempArr.length; _i4++) {
      var _d2 = tempArr[_i4];

      var _childrens = _d2.children || [];

      list.push(_d2);

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
    list: list,
    leafs: leafs,
    roots: roots
  };
}

function transformToTreeData() {
  var flatData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var idField = arguments.length > 1 ? arguments[1] : undefined;
  var pidField = arguments.length > 2 ? arguments[2] : undefined;
  var rootKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

  function getKey(node) {
    return node[idField] || "";
  }

  function getParentKey(node) {
    return node[pidField] || "";
  }

  if (!flatData) {
    return [];
  }

  var childrenToParents = {};
  flatData.forEach(function (child) {
    var parentKey = getParentKey(child);

    if (parentKey in childrenToParents) {
      childrenToParents[parentKey].push(child);
    } else {
      childrenToParents[parentKey] = [child];
    }
  });

  if (!(rootKey in childrenToParents)) {
    return [];
  }

  var trav = function trav(parent) {
    var parentKey = getKey(parent);

    if (parentKey in childrenToParents) {
      parent.children = childrenToParents[parentKey].map(function (child) {
        return trav(child);
      });
    }

    return parent;
  };

  return childrenToParents[rootKey].map(function (child) {
    return trav(child);
  });
}

var getSelectable = function getSelectable(extraProps, data, _evaluator) {
  var arr = data || [];

  if (arr.length <= 0) {
    return [];
  }

  var selectable = extraProps === null || extraProps === void 0 ? void 0 : extraProps.itemSelectable;
  var selectableMap = {};

  if (selectable && _typeof(selectable) === "object") {
    if (selectable.type === "expression" && selectable.expression) {
      var expr = selectable.expression;
      arr.forEach(function (d, i) {
        var v = d[KEY_FIELD];

        var row = _objectSpread({}, d); //将当前行数据作为运行时变量传入公式计算


        var res = _evaluator.evaluate(expr, {
          items: i
        }, row); //返回值为true，则不可选择


        if (res === true) {
          selectableMap[v] = false;
        }
      });
    } else if (selectable.type === "disableParent") {
      arr.forEach(function (d) {
        var v = d[KEY_FIELD];

        if (!d.__LEAF__) {
          selectableMap[v] = false;
        }
      });
    }
  }

  return Object.keys(selectableMap);
};

exports.getSelectable = getSelectable;

function resetHeaderCellWidth(wrapperRef) {
  var el = wrapperRef.current;

  if (el) {
    var headers = el.getElementsByClassName("tablex-table-head");

    for (var i = 0; i < headers.length; i++) {
      var headEl = headers[i];
      var rows = headEl.getElementsByClassName("tablex-head-row"); //先设置多级表头的占位列隐藏样式名

      for (var j = 0; j < rows.length; j++) {
        var row = rows[j];
        var cells = row.getElementsByClassName("tablex-table-head-cell-placeholder");

        for (var k = 0; k < cells.length; k++) {
          var cell = cells[k];
          var ck = cell.dataset.columnkey;

          if (ck) {
            var c = el.getElementsByClassName("column_" + ck)[0];

            if (c) {
              var isHidden = c.classList.contains("tablex-table-column-hidden");

              if (isHidden) {
                cell.classList.add("tablex-table-column-hidden");
              } else {
                cell.classList.remove("tablex-table-column-hidden");
              }
            }
          }
        }
      } //


      for (var _j = rows.length - 1; _j >= 0; _j--) {
        var _row2 = rows[_j];

        var _cells = _row2.getElementsByClassName("tablex-table-head-cell");

        for (var _k2 = 0; _k2 < _cells.length; _k2++) {
          var _cell = _cells[_k2];

          var _isHidden2 = _cell.classList.contains("tablex-table-column-hidden");

          var parentKey = _cell.dataset.parentkey;

          if (parentKey) {
            var cellWidth = parseInt(_cell.style.width);

            if (!isNaN(cellWidth)) {
              var parentCell = headEl.getElementsByClassName("column_" + parentKey)[0];

              if (parentCell) {
                var parentCellWidth = parseInt(parentCell.style.width);

                if (!isNaN(parentCellWidth)) {
                  if (_isHidden2) {
                    if (parentCell.classList.contains("hasCalculated") === false) {
                      parentCell.classList.add("hasCalculated");
                      parentCell.style.maxWidth = parentCellWidth - cellWidth + "px";
                    }
                  } else {
                    parentCell.classList.remove("hasCalculated");
                    parentCell.style.maxWidth = "initial";
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

function OperationColumnTrigger(_ref8) {
  var form = _ref8.form,
      onClick = _ref8.onClick,
      operationColumns = _ref8.operationColumns;

  if (!(0, _utils.isResponsiveSizeSmall)(form)) {
    return null;
  }

  if (operationColumns instanceof Array && operationColumns.length > 0) {} else {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement("span", {
    style: {
      position: "absolute",
      right: 1,
      top: 2,
      zIndex: 2,
      color: "#9c9fb2",
      cursor: "pointer",
      height: 30,
      width: 14,
      backgroundColor: "#ffffff",
      padding: "5px 0 0 0",
      lineHeight: "normal",
      textAlign: "center"
    },
    onClick: onClick
  }, /*#__PURE__*/_react.default.createElement(_antd.Icon, {
    type: "dash",
    style: {
      transform: "rotate(90deg)"
    }
  }));
}