"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TreeSelect = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@formily/react");

var _antd = require("antd");

var _formxAntd = require("@nvwa/formx-antd");

var _icons = require("@nvwa/formx-antd/lib/icons");

var _utils = require("../../utils");

var _expression = require("../../expression");

var _excluded = ["showLabelStrategy", "listMap"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getNodePath = function getNodePath(list, key) {
  var paths = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var titles = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var node = list === null || list === void 0 ? void 0 : list[key];

  if (node) {
    paths.unshift(node.value);
    titles.unshift(node.label);
    var parent = list[node.parent];

    if (parent) {
      getNodePath(list, parent.value, paths, titles);
    }
  }

  return {
    paths: paths,
    titles: titles
  };
};

var transformTreeData = function transformTreeData(arr) {
  var data = [];
  var listMap = {};
  var childrenToParents = {};
  arr.forEach(function (d) {
    listMap[d.value] = d;
    var parentKey = d.parent;

    if (parentKey) {
      if (parentKey in childrenToParents) {
        childrenToParents[parentKey].push(d);
      } else {
        childrenToParents[parentKey] = [d];
      }
    }
  });
  data = arr.map(function (item) {
    var d = _objectSpread({}, item); //parent为空或者parent不在当前数据中，则为根级


    if (!d.parent || !listMap.hasOwnProperty(d.parent)) {
      d.parent = "";
    }

    d.title = d.label; //是否存在子级

    var childrens = childrenToParents[d.value] || [];

    if (childrens.length <= 0) {
      d.__LEAF__ = true;
    }

    return d;
  });
  return {
    data: data,
    list: listMap
  };
};

var formatSelectable = function formatSelectable(itemSelectable, data, form) {
  if (data.length <= 0) {
    return {};
  }

  var selectable = itemSelectable;

  if (selectable && _typeof(selectable) === "object") {
    if (selectable.type === "expression" && selectable.expression) {
      var expr = selectable.expression;

      var _evaluator = new _expression.Evaluator({
        functions: {
          value: function value(k) {
            var v = null;

            if (k) {
              var _form$getFieldState;

              v = (_form$getFieldState = form.getFieldState(k)) === null || _form$getFieldState === void 0 ? void 0 : _form$getFieldState.value;
            }

            return v;
          }
        }
      });

      data.forEach(function (d) {
        var obj = _objectSpread({}, d); //将当前行数据作为运行时变量传入公式计算


        var res = _evaluator.evaluate(expr, {}, obj); //返回值为true，则不可选择


        if (res === true) {
          d.disabled = true;
        }
      });
    } else if (selectable.type === "disableParent") {
      data.forEach(function (d) {
        if (!d.__LEAF__) {
          d.disabled = true;
        }
      });
    }
  }
};

var TreeSelect = (0, _react2.connect)(function (_props) {
  var showLabelStrategy = _props.showLabelStrategy,
      listMap = _props.listMap,
      props = _objectWithoutProperties(_props, _excluded);

  var field = (0, _react2.useField)();
  var schema = (0, _react2.useFieldSchema)();
  var v = props.value;

  if (typeof v === "number") {
    v = v + "";
  }

  var arr = props.treeData;

  function getExtraData(value, extra) {
    var extraData = null;

    if (_typeof(value) === "object" && value) {
      if (value instanceof Array) {
        var _extra$allCheckedNode;

        extraData = [];
        extra === null || extra === void 0 ? void 0 : (_extra$allCheckedNode = extra.allCheckedNodes) === null || _extra$allCheckedNode === void 0 ? void 0 : _extra$allCheckedNode.forEach(function (d) {
          var _d$node;

          var item = (_d$node = d.node) === null || _d$node === void 0 ? void 0 : _d$node.props;
          var o = null;

          if (item) {
            o = _objectSpread({}, item);

            if (o) {
              delete o.children;
              extraData.push(o);
            }
          }
        });
      } else {
        if (value) {
          extraData = arr.find(function (d) {
            return d.value === value.value;
          });
        }
      }
    } else {
      if (value) {
        extraData = arr.find(function (d) {
          return d.value === value;
        });
      }
    }

    return extraData;
  }

  function onChangeValue(value, label, extraData) {
    var formated = {};

    if (value instanceof Array) {
      var _value = []; //多选时，可显示父级label

      if (showLabelStrategy) {
        value.forEach(function (d) {
          var _getNodePath = getNodePath(listMap, d.value),
              titles = _getNodePath.titles;

          var _label = titles.join("-");

          _value.push({
            value: d.value,
            label: _label
          });
        });
      } else {
        _value = value;
      }

      formated = (0, _utils.formatNamedValueWhenChange)(_value, label, "value");
    } else {
      var _value2 = value === null || value === void 0 ? void 0 : value.value;

      var _label = value === null || value === void 0 ? void 0 : value.label; //单选时，可显示父级label


      if (showLabelStrategy) {
        var _getNodePath2 = getNodePath(listMap, _value2),
            titles = _getNodePath2.titles;

        _label = titles.join("-");
      }

      formated = (0, _utils.formatNamedValueWhenChange)(_value2, _label);
    }

    props.onChange(formated.value, formated.label, extraData);
  }

  function onChange(value, label, extra) {
    if (value) {
      var extraData = getExtraData(value, extra);
      onChangeValue(value, label, extraData);
    } else {
      onChangeValue("", "", null);
    }
  }

  var parentPath = field.address.parent().toString();
  var objectValue = (0, _utils.formatNamedValue)(v, field.inputValues, props.treeCheckable === true);
  (0, _react.useEffect)(function () {
    (0, _utils.triggerOnChangeWhenDataLoaded)(objectValue, props.treeData, function (value, label, extra) {
      if (value instanceof Array) {
        onChangeValue(value, null, extra);
      } else {
        onChangeValue({
          value: value,
          label: label
        }, null, extra);
      }
    });
  }, [props.sourceData]);
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.TreeSelect, _extends({}, props, {
    onChange: onChange,
    labelInValue: true,
    value: objectValue
  })), schema.mapProperties(function (item, key) {
    return /*#__PURE__*/_react.default.createElement(_react2.RecursionField, {
      key: key,
      basePath: [parentPath],
      schema: item,
      name: key,
      onlyRenderProperties: true
    });
  }));
}, (0, _react2.mapProps)({
  dataSource: "treeData"
}, function (props, field) {
  var resetProps = {};
  props.readOnly && (resetProps.open = false);
  var extraProps = props["x-extra-props"] || {};

  if (extraProps.selectMode === "multiple") {
    resetProps.treeCheckable = true;
  }

  var treeData = [];
  var listMap = {};

  var _treeData = props.treeData || [];

  if (_treeData instanceof Array) {
    var _transformTreeData = transformTreeData(_treeData),
        data = _transformTreeData.data,
        list = _transformTreeData.list;

    treeData = data;
    listMap = list;
  } else {
    console.error("Invalid prop type of `dataSource`:", _treeData, field.path);
  }

  formatSelectable(extraProps.itemSelectable, treeData, field.form);
  var dropdownStyle = {
    maxHeight: 400
  };
  var bl = props.dropdownMatchSelectWidth;

  if (typeof bl === "boolean") {
    bl = bl;
  } else {
    bl = true;
  }

  if (bl === false) {
    //dropdownMatchSelectWidth为undefined时，最小宽度为选择器宽度，且会被自动撑宽
    bl = undefined;
  }

  return _objectSpread(_objectSpread(_objectSpread({
    treeCheckStrictly: true
  }, props), resetProps), {}, {
    treeDataSimpleMode: {
      id: "value",
      pId: "parent",
      rootPId: ""
    },
    dropdownStyle: dropdownStyle,
    dropdownMatchSelectWidth: bl,
    treeNodeFilterProp: "title",
    treeData: treeData,
    listMap: listMap,
    sourceData: props.treeData,
    allowClear: true,
    suffixIcon: (field === null || field === void 0 ? void 0 : field["loading"]) || (field === null || field === void 0 ? void 0 : field["validating"]) ? /*#__PURE__*/_react.default.createElement(_icons.LoadingOutlined, null) : props.suffixIcon
  });
}), (0, _react2.mapReadPretty)(_formxAntd.PreviewText.TreeSelect));
exports.TreeSelect = TreeSelect;
var _default = TreeSelect;
exports.default = _default;