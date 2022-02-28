"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FormContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _render = _interopRequireDefault(require("../core/render"));

var _FormActions = _interopRequireDefault(require("./FormActions"));

var _env = require("../extensions/env");

var _func = require("../extensions/func");

var _utils = require("../core/utils");

var _utils2 = require("../extensions/utils");

var _message2 = _interopRequireDefault(require("../extensions/message"));

var _effects2 = require("./effects");

var _AnchorNav = _interopRequireDefault(require("./AnchorNav"));

var _antd = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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

var FormContext = /*#__PURE__*/(0, _react.createContext)(null);
exports.FormContext = FormContext;

function formatGraph(item) {
  var _item$component, _extraProps$name;

  var componentProps = _objectSpread({}, ((_item$component = item.component) === null || _item$component === void 0 ? void 0 : _item$component[1]) || {});

  var extraProps = _objectSpread({}, (componentProps === null || componentProps === void 0 ? void 0 : componentProps["x-extra-props"]) || {});

  var ctype = (_extraProps$name = extraProps.name) === null || _extraProps$name === void 0 ? void 0 : _extraProps$name.toLowerCase();
  var o = {
    name: item.path,
    path: item.address,
    extraProps: extraProps,
    componentProps: componentProps,
    componentName: ctype,
    title: item.title,
    isTableCellField: extraProps.isTableCellField,
    fieldActions: item.fieldActions,
    displayName: item.displayName,
    isGroup: extraProps.isGroup,
    isList: extraProps.isList,
    isModal: ctype === "modal",
    entity: extraProps.entity,
    entityField: extraProps.field,
    isEntityField: extraProps.isEntityField,
    visible: item.visible
  };

  if (item.hasOwnProperty("value")) {
    o.value = item.value;
  }

  return o;
}

function getTitlePath(g, path, k, t) {
  var title = [];
  var parentPath = path.split("." + k)[0];

  if (parentPath && parentPath !== path) {
    var parentGraph = g[parentPath];
    var parentTitle = "";

    if (parentGraph) {
      if (parentGraph.componentName === "tabpane") {
        var _parentGraph$componen;

        parentTitle = (_parentGraph$componen = parentGraph.componentProps) === null || _parentGraph$componen === void 0 ? void 0 : _parentGraph$componen.tab;
      } else if (["tab", "grid"].indexOf(parentGraph.componentName) === -1) {
        parentTitle = parentGraph.title;
      }

      if (parentPath.split(".").length > 1) {
        var prevParentTitle = getTitlePath(g, parentPath, parentGraph.name, parentTitle);

        if (prevParentTitle) {
          title.push(prevParentTitle);
        }
      } else {
        if (parentTitle) {
          title.push(parentTitle);
        }
      }
    }
  }

  if (t) {
    title.push(t);
  }

  return title.join(".");
}

function getRoot(graphMap, k) {
  var root = null;
  var item = graphMap[k];
  var itemKey = "";
  var itemPath = "";

  if (item) {
    itemKey = item.name;
    itemPath = item.path || "";
  }

  var rootPath = "";
  var rootGraph = null;
  var pathArr = itemPath.split(".");

  if (pathArr.length > 1) {
    rootPath = pathArr[0];
    rootGraph = graphMap[rootPath];
  }

  if (rootGraph) {
    var extraProps = rootGraph.extraProps || {};
    root = {
      isGroup: rootGraph.isGroup,
      isList: rootGraph.isList,
      isModal: rootGraph.isModal,
      name: rootGraph.name,
      key: rootGraph.name,
      path: rootGraph.path,
      title: extraProps.title
    };
  }

  return root;
}

function getFormItems(ins) {
  if (ins) {
    var g = ins.getFormGraph();
    var gMap = {};
    Object.keys(g).forEach(function (k) {
      gMap[k] = formatGraph(g[k]);
    });
    var items = [];
    delete g.__DATA__;
    Object.keys(g).forEach(function (k) {
      var d = formatGraph(g[k]);
      var matched = false;
      var currTitle = "";
      var root = getRoot(gMap, k);
      var extraprops = d.extraProps || {};
      currTitle = d.title || extraprops.title;
      var ctype = d.componentName;

      if (currTitle) {
        if (extraprops.extraNameFieldKey || extraprops.relatedNameFieldKey) {
          currTitle = currTitle + "_id";
        }

        if (currTitle.endsWith("_name")) {
          currTitle = currTitle.substring(0, currTitle.length - 5);
        }
      }

      matched = d.unmounted !== true && ctype !== "grid";
      var isTable = ctype === "arraytable";

      if (d.unmounted !== true && isTable) {
        var _d$fieldActions;

        var fn = (_d$fieldActions = d.fieldActions) === null || _d$fieldActions === void 0 ? void 0 : _d$fieldActions.mapItems;

        if (typeof fn === "function") {
          var t = getTitlePath(g, d.path, d.name, currTitle);
          fn(function (_props, k, o) {
            var isInOperationColumn = false;

            var _componentProps = _props["x-component-props"] || {};

            var _extraProps = _componentProps["x-extra-props"] || {};

            if (o) {
              var _o$parent;

              var _parentExtraProps = ((_o$parent = o.parent) === null || _o$parent === void 0 ? void 0 : _o$parent["x-extra-props"]) || {};

              if (_parentExtraProps.isOperationColumn === true) {
                isInOperationColumn = true;
              }
            }

            if (o && o.leaf === true && !isInOperationColumn) {
              var ct = o.title.join(".");

              if (t && ct) {
                ct = t + "." + ct;
              }

              var clabel = "";

              if (_componentProps.hasOwnProperty("title")) {
                clabel = _componentProps.title;
              } else {
                clabel = _props.title;
              }

              items.push({
                root: root,
                label: clabel,
                title: ct,
                key: d.name + ".items." + _props.name,
                name: d.name + ".items." + _props.name,
                path: d.path + ".items." + _props.name,
                type: _props["x-component"],
                isGroup: _extraProps.isGroup,
                isList: _extraProps.isList,
                entity: extraprops.entity,
                entityField: extraprops.field
              }); //继续循环下级properties，表格列可能为下拉等存在隐藏字段的控件

              _props.mapProperties(function (__props) {
                var __componentProps = __props["x-component-props"] || {};

                var __extraProps = __componentProps["x-extra-props"] || {};

                var _label = __extraProps.title;

                if (_label && _label.endsWith("_name")) {
                  _label = _label.substring(0, _label.length - 5);
                }

                var _ct = _label;

                if (t && _ct) {
                  _ct = t + "." + _ct;
                }

                items.push({
                  root: root,
                  label: _label,
                  title: _ct,
                  key: d.name + ".items." + __props.name,
                  name: d.name + ".items." + __props.name,
                  path: d.path + ".items." + __props.name,
                  type: __props["x-component"],
                  isGroup: __extraProps.isGroup,
                  isList: __extraProps.isList,
                  entity: extraprops.entity,
                  entityField: extraprops.field
                });
              }); //

            }
          });
        }
      }

      if (k && matched) {
        var _t = getTitlePath(g, d.path, d.name, currTitle);

        items.push({
          root: root,
          label: currTitle,
          title: _t,
          key: d.name,
          name: d.name,
          path: d.path,
          type: d.componentName,
          isGroup: d.isGroup,
          isModal: d.isModal,
          isList: d.isList,
          entity: d.entity,
          entityField: d.field
        });
      }
    });
    return items;
  }
}
/**
 * 从表单中获取的为平级数据，传递给外部的数据需要进行嵌套处理
 * @param {*} graph
 * @param {*} stateValues
 * @param {*} bindEntity 是否将表单项值绑定到实体字段，默认情况下会将表单项值绑定到父级容器
 */


function getValuesFromGraph(graph, stateValues) {
  var bindEntity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var values = {};
  var keyPath = {};
  var listKeys = [];

  function getParentKey(item) {
    if (!item) {
      return "";
    }

    var path = item.path;
    var parentKey = ""; //结构上的父级

    var schemaParentKey = "";
    var pathArr = (path || "").split(".");

    if (pathArr.length > 0) {
      schemaParentKey = pathArr[pathArr.length - 2] || "";
    }

    var parent = keyPath[schemaParentKey]; //

    var entityParentKey = "";

    if (bindEntity === true) {
      //查找绑定了实体的父级
      if (parent) {
        if (parent.entity) {
          entityParentKey = parent.name;
        } else {
          entityParentKey = getParentKey(parent);
        }
      } //
      //如果父级存在实体，则嵌套一层直系父级


      if (entityParentKey) {
        parentKey = schemaParentKey;
      } //

    } else {
      parentKey = schemaParentKey;
    }

    return parentKey;
  }

  for (var k in graph) {
    if (k && graph.hasOwnProperty(k)) {
      var item = formatGraph(graph[k]);
      var extraProps = item.extraProps || {};
      var itemName = item.name;
      var tempArr = item.path.split(".");
      itemName = tempArr[tempArr.length - 1];
      keyPath[itemName] = {
        name: itemName,
        path: item.path,
        entity: extraProps.entity,
        entityField: extraProps.field,
        ctype: item.componentName,
        isField: item.hasOwnProperty("value") || item.isEntityField === true,
        //容错处理：组件isEntityField为true时也视为输入控件
        relatedKey: extraProps.relatedKey,
        visible: item.visible
      };

      if (bindEntity && extraProps.isEntity && extraProps.entity) {
        //bug fixed : 表格不应该设置{}值，否则会导致数据错误
        if (["arraytable"].indexOf(item.componentName) > -1) {
          values[itemName] = [];
          listKeys.push(itemName);
        } else {
          values[itemName] = {};
        }
      }
    }
  }

  for (var sk in stateValues) {
    if (stateValues.hasOwnProperty(sk) && keyPath.hasOwnProperty(sk)) {
      var dataValue = stateValues[sk];

      if (_typeof(dataValue) === "object" && dataValue) {
        if (dataValue instanceof Array) {
          dataValue = _toConsumableArray(dataValue);
        } else {
          dataValue = _objectSpread({}, dataValue);
        }
      }

      var dataKey = sk;
      var _item = keyPath[dataKey];
      var relatedItem = keyPath[_item === null || _item === void 0 ? void 0 : _item.relatedKey];

      if (["checkbox", "select", "treeselect"].indexOf(_item.ctype) > -1 || ["checkbox", "select", "treeselect"].indexOf(relatedItem === null || relatedItem === void 0 ? void 0 : relatedItem.ctype) > -1) {
        dataValue = (0, _utils.transformArrayValuesToComma)(dataValue);
      }

      if (["arraytable"].indexOf(_item.ctype) > -1) {
        //bug fixed : 表格父级隐藏后，表格本身的数据并未清空，导致传递给了后端
        if (_item.visible === false) {
          dataValue = [];
        } //


        dataValue = (dataValue || []).map(function (row) {
          var _d = {};

          for (var columnKey in row) {
            if (Object.hasOwnProperty.call(row, columnKey)) {
              var column_item = keyPath[columnKey];
              var column_relatedItem = keyPath[column_item === null || column_item === void 0 ? void 0 : column_item.relatedKey];
              var column_value = row[columnKey];

              if (["checkbox", "select", "treeselect"].indexOf(column_item === null || column_item === void 0 ? void 0 : column_item.ctype) > -1 || ["checkbox", "select", "treeselect"].indexOf(column_relatedItem === null || column_relatedItem === void 0 ? void 0 : column_relatedItem.ctype) > -1) {
                column_value = (0, _utils.transformArrayValuesToComma)(column_value);
              }

              _d[columnKey] = column_value;
            }
          }

          return _d;
        });
      }

      if (dataValue instanceof Array) {
        if (bindEntity === true) {
          var listEntityGroupKey = "";

          if (_item.entity) {
            listEntityGroupKey = _item.name;
          }

          if (listEntityGroupKey) {
            values[listEntityGroupKey] = dataValue;
          }
        } else {
          values[dataKey] = dataValue;
        }
      } else {
        var parentKey = "";
        var isField = true;

        if (_item) {
          isField = _item.isField;
        } //如果是表单输入项，数据则进行父级嵌套


        if (isField) {
          parentKey = getParentKey(_item);

          if (parentKey) {
            if (values[parentKey]) {
              values[parentKey][dataKey] = dataValue;
            } else {
              values[parentKey] = _defineProperty({}, dataKey, dataValue);
            }
          } else {
            //如果不是绑定到实体，才将无父级的字段绑定到根级
            if (bindEntity !== true) {
              values[dataKey] = dataValue;
            }
          }
        } else {
          //传递的values格式可能为{gxxxx:{Id:""}}
          //此时应该合并值
          var prev = values[dataKey];

          if (_typeof(prev) === "object" && prev) {
            if (_typeof(dataValue) === "object") {
              values[dataKey] = _objectSpread(_objectSpread({}, prev), dataValue);
            }
          } else {
            values[dataKey] = dataValue;
          }
        }
      }
    }
  }

  return {
    values: values,
    listKeys: listKeys
  };
}
/**
 * 此处为外部传递的嵌套数据，但是表单需接收平级数据，顾需要进行展平处理
 * @param {*} obj
 */


function getValuesFromJson(obj) {
  var values = {};

  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      var value = obj[k]; //DATA为预置属性用于存取特殊数据,不进行展平处理

      if (k === "__DATA__") {
        values[k] = value;
      } else {
        if (value instanceof Array) {
          values[k] = value;
        } else if (_typeof(value) === "object" && value) {
          //数据如果为object，则进行数据展平
          for (var sk in value) {
            if (value.hasOwnProperty(sk)) {
              //如果设置的值不在schema中，则数据不进行展平处理，比如 id
              var notExistInSchema = false;
              var arr = ["id"];

              if (arr.indexOf(sk.toLowerCase()) > -1) {
                notExistInSchema = true;
              } //


              if (notExistInSchema) {
                if (values[k]) {
                  values[k][sk] = value[sk];
                } else {
                  values[k] = _defineProperty({}, sk, value[sk]);
                }
              } else {
                values[sk] = value[sk];
              }
            }
          }
        } else {
          values[k] = value;
        }
      }
    }
  }

  return values;
}
/**
 * 合并错误信息，第二个参数优先级更高
 * @param {*} a
 * @param {*} b
 */


function mergeErrors(a, b) {
  var errors = [];
  var warnings = [];
  var e_a = a.errors || [];
  var w_a = a.warnings || [];
  var e_b = b.errors || [];
  var w_b = b.warnings || [];
  var errorsMap = {};
  e_a.forEach(function (d) {
    errorsMap[d.path] = d;
  });
  e_b.forEach(function (d) {
    errorsMap[d.path] = d;
  });

  for (var k in errorsMap) {
    errors.push(errorsMap[k]);
  }

  var warningsMap = {};
  w_a.forEach(function (d) {
    warningsMap[d.path] = d;
  });
  w_b.forEach(function (d) {
    warningsMap[d.path] = d;
  });

  for (var _k in warningsMap) {
    warnings.push(warningsMap[_k]);
  }

  return {
    errors: errors,
    warnings: warnings
  };
}
/**
 * 获取删除掉的数据值
 * @param {*} currentValues 当前表单值
 * @param {*} initialValues 初始表单值
 * @param {*} listKeys 所有列表的key
 * @param {*} deleted 已记录的删除掉的数据值
 * @returns
 */


function getDeleted(currentValues, initialValues, listKeys, deleted) {
  var deletedListItem = deleted;
  var keyField = "Id";

  if (listKeys instanceof Array) {
    listKeys.forEach(function (k) {
      var initial = initialValues[k];
      var current = currentValues[k];
      var deletedItems = [];
      var currentMap = {};

      if (current instanceof Array) {
        current.forEach(function (d) {
          if (d.hasOwnProperty(keyField)) {
            currentMap[d[keyField]] = d;
          }
        });
      }

      if (initial instanceof Array) {
        initial.forEach(function (d) {
          if (d.hasOwnProperty(keyField) && !currentMap.hasOwnProperty(d[keyField])) {
            deletedItems.push(d);
          }
        });
      }

      if (deletedItems.length > 0) {
        if (!deletedListItem) {
          deletedListItem = {};
        }

        if (deletedListItem[k] instanceof Array) {
          var obj = {}; //去重

          var combineArr = [].concat(_toConsumableArray(deletedListItem[k]), deletedItems).reduce(function (cur, next) {
            obj[next[keyField]] ? "" : obj[next[keyField]] = true && cur.push(next);
            return cur;
          }, []); //

          deletedListItem[k] = combineArr;
        } else {
          deletedListItem[k] = deletedItems;
        }
      }
    });
  }

  return deletedListItem;
}

var Renderer = /*#__PURE__*/function (_React$Component) {
  _inherits(Renderer, _React$Component);

  var _super = _createSuper(Renderer);

  function Renderer(props) {
    var _this;

    _classCallCheck(this, Renderer);

    _this = _super.call(this, props);

    _this.getFormItems = function () {
      var ins = _this.formInstance;
      return getFormItems(ins);
    };

    _this.getData = function (bindEntity) {
      var ins = _this.formInstance;

      if (ins) {
        var _ins$getFormState = ins.getFormState(function (state) {
          return getValuesFromGraph(ins.getFormGraph(), _objectSpread({}, state.values), bindEntity);
        }),
            values = _ins$getFormState.values,
            listKeys = _ins$getFormState.listKeys;

        return {
          data: values,
          deleted: getDeleted(values, _this.state.values, listKeys, _this.stateRef.current.deleted)
        };
      }
    };

    _this.validate = function (callback) {
      var ins = _this.formInstance;

      if (ins) {
        ins.validate().then(function (res) {
          if (typeof callback === "function") {
            var _mergeErrors = mergeErrors(ins.getFormState(), res),
                errors = _mergeErrors.errors,
                warnings = _mergeErrors.warnings;

            callback(errors, warnings);
          }
        }).catch(function (res) {
          if (typeof callback === "function") {
            var _mergeErrors2 = mergeErrors(ins.getFormState(), res),
                errors = _mergeErrors2.errors,
                warnings = _mergeErrors2.warnings;

            callback(errors, warnings);
          }
        });
      }
    };

    _this.callTask = function (taskType) {
      return _this.formActions.callTask(taskType);
    };

    _this.onSubmitError = function (errors, onError) {
      if (typeof onError === "function") {
        onError(errors);
      }

      var fn = _this.props.onSubmitError;

      if (typeof fn === "function") {
        fn(errors);
      }
    };

    _this.submitValidate = function () {
      var schema = _this.state.schema;
      var additional = (schema === null || schema === void 0 ? void 0 : schema.additionalProperties) || {};
      var formInstance = _this.formInstance;
      var validate = additional.validate;
      var validateAsync = additional.validateAsync;

      function getEnv(k, injectEnvs) {
        try {
          if (_typeof(injectEnvs) === "object" && injectEnvs && injectEnvs.hasOwnProperty(k)) {
            return injectEnvs[k];
          }

          var formActions = formInstance.getFormState().formActions;
          return formActions.formEnvs.getItemValue(k);
        } catch (error) {
          console.error("get environment value error :", error);
          return null;
        }
      }

      return new Promise(function (resolve, reject) {
        if (_typeof(validate) === "object" && validate && validate.expression) {
          var _evaluator = (0, _utils2.createEvaluator)(formInstance);

          var res = _evaluator.evaluate(validate.expression, {});

          if (res === false) {
            _message2.default.error(validate.message || "提交验证未通过");

            reject(validate.message);
            return;
          }
        }

        if (_typeof(validateAsync) === "object" && validateAsync && validateAsync.api) {
          var validateAsyncApi = null;

          try {
            validateAsyncApi = JSON.parse(validateAsync.api);
          } catch (error) {}

          var validateAsyncMessage = validateAsync.message;
          (0, _utils2.requestValidateApiById)({
            form: formInstance,
            id: validateAsyncApi.dataSourceId,
            input: (0, _utils2.getRequestParams)(validateAsyncApi.input, formInstance, {}, getEnv),
            output: validateAsyncApi.output
          }).then(function (_ref) {
            var valid = _ref.valid,
                _message = _ref.message;
            var msg = "";

            if (valid === false) {
              msg = validateAsyncMessage || _message || "提交验证未通过";

              _message2.default.error(msg);

              reject(msg);
            } else {
              resolve(true);
            }
          }).catch(function (e) {
            reject(e);
          });
        } else {
          resolve(true);
        }
      });
    };

    _this.submit = function (callback, onError, bindEntity) {
      var ins = _this.formInstance;

      if (ins) {
        var _submit = function _submit() {
          if (typeof callback === "function") {
            var formState = ins.getFormState();

            var _getValuesFromGraph = getValuesFromGraph(ins.getFormGraph(), _objectSpread({}, formState.values), bindEntity),
                values = _getValuesFromGraph.values,
                listKeys = _getValuesFromGraph.listKeys;

            callback(values, getDeleted(values, _this.state.values, listKeys, _this.stateRef.current.deleted), function () {
              return _this.callTask("after");
            });
          } else {
            _this.callTask("after");
          }
        };

        _this.validate(function (errors) {
          _this.callTask("validate").then(function () {
            if (errors.length > 0) {
              _this.onSubmitError(errors, onError);
            } else {
              _this.callTask("beforeSubmit").then(function () {
                _submit();
              }).catch(function (e) {
                console.error("beforeSubmit task error:", e);

                _this.onSubmitError([e], onError);
              });
            }
          }).catch(function (e) {
            var _errors = [].concat(_toConsumableArray(errors), [e]);

            _this.onSubmitError(_errors, onError);
          });
        });
      }
    };

    _this.registeEnvItems = function () {
      var _this$formActions, _this$formActions$for, _this$formActions2, _this$formActions2$fo;

      //将外部扩展的环境变量、表单配置的环境变量注入到当前表单中
      if (typeof ((_this$formActions = _this.formActions) === null || _this$formActions === void 0 ? void 0 : (_this$formActions$for = _this$formActions.formEnvs) === null || _this$formActions$for === void 0 ? void 0 : _this$formActions$for.setItems) === "function") {
        var extendEnvs = (0, _env.getItems)();
        var schema = _this.state.schema;
        var additional = (schema === null || schema === void 0 ? void 0 : schema.additionalProperties) || {};
        var envs = additional.formEnvVariables || [];
        var arr = [];
        extendEnvs.forEach(function (d) {
          if (d.name) {
            arr.push({
              name: d.name,
              value: d.value,
              title: d.title
            });
          }
        });
        envs.forEach(function (d) {
          if (d.name) {
            arr.push({
              name: d.name,
              value: d.value,
              title: d.title
            });
          }
        });

        _this.formActions.formEnvs.setItems(arr, true);
      } //将外部扩展的函数注入到当前表单中


      if (typeof ((_this$formActions2 = _this.formActions) === null || _this$formActions2 === void 0 ? void 0 : (_this$formActions2$fo = _this$formActions2.formFunction) === null || _this$formActions2$fo === void 0 ? void 0 : _this$formActions2$fo.setItems) === "function") {
        var extendFuncs = (0, _func.getItems)();
        var _arr = [];
        extendFuncs.forEach(function (d) {
          if (d.name) {
            _arr.push({
              name: d.name,
              value: d.value,
              title: d.title
            });
          }
        });

        _this.formActions.formFunction.setItems(_arr, true);
      }
    };

    _this.onResize = function () {
      var cw = window.document.body.clientWidth;

      if (cw <= 450) {
        document.body.classList.add("responsive-size-small");
      } else {
        document.body.classList.remove("responsive-size-small");
      }
    };

    _this.transformValues = function (data, schema) {
      return getValuesFromJson(data, schema);
    };

    _this.setData = function (data) {
      var ins = _this.formInstance;

      if (ins) {
        var values = getValuesFromJson(data, _this.state.sourceSchema); //如果不清除缓存，会导致获取到之前缓存的数据，如：
        //表格显示隐藏，隐藏后暂存，再次让表格显示，表格获取到了之前的数据，实际上此条数据已经被删除
        //清除caches也可以，但是暂存时表格数据超过2000行可能导致Reaction报错 RangeError: Maximum call stack size exceeded
        //直接更改key会导致所有组件都重新mount，不可取

        ins.query("*").forEach(function (_field) {
          if (_field) {
            _field.caches = {};
          }
        }); //不可reset，否则会导致未绑定实体的字段控件，如何默认值来自于接口，暂存reset后会被清空值，
        //因为暂存后的getData接口无法返回该字段值。
        //ins.reset("*", { forceClear: true, validate: false });

        ins.setValues(values, "merge");
      }
    };

    _this.onInit = function (formInstance, formEffect, _consumer) {
      _this.formInstance = formInstance;
      _this.formActions = new _FormActions.default(formInstance, formEffect, _consumer);

      _this.registeEnvItems();

      _this.formInstance.setFormState(function (state) {
        state.formActions = _this.formActions;
      });

      if (typeof _this.props.onInit === "function") {
        _this.props.onInit(_assertThisInitialized(_this), formInstance);
      }
    };

    _this.onMount = function () {
      if (typeof _this.props.onSchemaChange === "function") {
        _this.props.onSchemaChange(_this.formActions, _this.formInstance);
      }

      var navRef = _this.navRef.current;

      if (navRef) {
        navRef.init();
      }
    };

    _this.onListItemDelete = function (item) {
      var nextDeleted = _this.stateRef.current.deleted || {};
      var existData = nextDeleted[item.key];

      if (item) {
        if (existData instanceof Array) {
          nextDeleted[item.key] = [].concat(existData).concat(item.data || []);
        } else {
          nextDeleted[item.key] = item.data;
        }
      }

      _this.stateRef.current.deleted = nextDeleted;
    };

    _this.toTabLayout = function () {
      var next = (0, _utils2.transformCardToTab)(_this.state.schema);

      _this.setState({
        schema: next
      });
    };

    _this.getContainer = function () {
      return _this.containerRef.current;
    };

    _this.formInstance = null;
    _this.containerRef = /*#__PURE__*/_react.default.createRef(null);
    _this.navRef = /*#__PURE__*/_react.default.createRef(null);
    _this.stateRef = /*#__PURE__*/_react.default.createRef(null);
    _this.stateRef.current = {
      deleted: null
    };
    _this.state = {
      values: null,
      sourceValues: null,
      sourceSchema: null,
      schema: null,
      prevProps: null,
      schemaKey: "form"
    };
    return _this;
  }

  _createClass(Renderer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window._FormRender = this;
      var actions = this.props.actions;

      if (typeof actions === "function") {
        actions({
          getData: this.getData,
          validate: this.validate,
          submit: this.submit,
          getFormItems: this.getFormItems
        });
      } else {
        if (_typeof(actions) === "object" && actions !== null) {
          actions.getData = this.getData.bind(this);
          actions.validate = this.validate.bind(this);
          actions.submit = this.submit.bind(this);
          actions.getFormItems = this.getFormItems.bind(this);
        }
      }

      window.addEventListener("resize", this.onResize);
      this.onResize();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.onResize);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.sourceSchema !== this.state.sourceSchema) {
        this.registeEnvItems();

        if (typeof this.props.onSchemaChange === "function") {
          this.props.onSchemaChange(this.formActions, this.formInstance);
        }
      }

      if (prevState.sourceValues !== this.state.sourceValues) {
        this.setData(this.state.sourceValues);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _schema$additionalPro,
          _this2 = this;

      var _this$state = this.state,
          schema = _this$state.schema,
          values = _this$state.values;
      var _effects = _effects2.createEffects;

      if (typeof this.props.effects === "function") {
        _effects = this.props.effects;
      }

      var _this$props = this.props,
          readOnly = _this$props.readOnly,
          disabled = _this$props.disabled,
          getContext = _this$props.getContext,
          setContext = _this$props.setContext,
          className = _this$props.className;
      return /*#__PURE__*/_react.default.createElement(FormContext.Provider, {
        value: {
          loading: this.props.loading,
          options: this.props.options
        }
      }, /*#__PURE__*/_react.default.createElement(_antd.ConfigProvider, {
        getPopupContainer: this.getContainer
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "formx-wrapper formx-container",
        ref: this.containerRef
      }, /*#__PURE__*/_react.default.createElement(_render.default, {
        initialValues: values,
        schema: schema,
        effects: _effects,
        onInit: this.onInit,
        onMount: this.onMount,
        readOnly: readOnly,
        disabled: disabled,
        getContext: getContext,
        setContext: setContext,
        context: {
          loading: this.props.loading,
          options: this.props.options || {},
          onListItemDelete: this.onListItemDelete,
          enabledSmallLayoutSize: this.props.enabledSmallLayoutSize
        },
        className: className
      }, this.props.children), /*#__PURE__*/_react.default.createElement(_AnchorNav.default, {
        disabled: (schema === null || schema === void 0 ? void 0 : (_schema$additionalPro = schema.additionalProperties) === null || _schema$additionalPro === void 0 ? void 0 : _schema$additionalPro.enabledNavToolbar) === false ? true : false,
        ref: this.navRef,
        getContainer: this.getContainer,
        getForm: function getForm() {
          return _this2.formInstance;
        }
      }))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps !== prevState.prevProps) {
        var _schema = nextProps.schema;
        var nextState = {
          values: getValuesFromJson(nextProps.values, nextProps.schema)
        };

        if (_schema !== prevState.sourceSchema) {
          var schema = {
            type: "object",
            properties: {
              __DATA__: {
                key: "__DATA__",
                path: "__DATA__",
                type: "object",
                visible: false,
                display: false
              }
            }
          };

          if (_schema) {
            if (_schema.properties) {
              schema.properties = _objectSpread(_objectSpread({}, schema.properties), _schema.properties);
            }

            if (_schema.additionalProperties) {
              schema.additionalProperties = _objectSpread({}, _schema.additionalProperties);

              if (_schema.additionalProperties.transformToTabWhenScreenSmall === true && ((0, _utils2.isResponsiveSizeSmall)() || nextProps.enabledSmallLayoutSize)) {
                schema = (0, _utils2.transformCardToTab)(schema);
              }
            }
          }

          nextState.schema = schema;
          nextState.sourceSchema = _schema;
        }

        if (nextProps.values !== prevState.sourceValues) {
          nextState.sourceValues = nextProps.values;
        }

        nextState.prevProps = nextProps;
        return nextState;
      }

      return null;
    }
  }]);

  return Renderer;
}(_react.default.Component);

Renderer.defaultProps = {
  disabled: false,
  readOnly: false,
  enabledSmallLayoutSize: false
};
Renderer.propTypes = {
  actions: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func]),

  /** 模板数据 */
  schema: _propTypes.default.object,

  /** 表单数据 */
  values: _propTypes.default.object,

  /** 表单数据是否加载中 */
  loading: _propTypes.default.bool,

  /**
   * 表单项权限配置,禁用、只读、可见、必填
   * {key:{disabled:boolean,readonly:boolean,visible:boolean,required:boolean}}
   */
  options: _propTypes.default.object,

  /** 提交失败的回调 */
  onSubmitError: _propTypes.default.func,
  getContext: _propTypes.default.func,
  effects: _propTypes.default.func,
  disabled: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  className: _propTypes.default.string,
  enabledSmallLayoutSize: _propTypes.default.bool
};
var _default = Renderer;
exports.default = _default;