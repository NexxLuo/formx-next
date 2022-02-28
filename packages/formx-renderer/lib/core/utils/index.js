"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callEventWithPrepose = callEventWithPrepose;
Object.defineProperty(exports, "each", {
  enumerable: true,
  get: function get() {
    return _shared.each;
  }
});
exports.eachSchemaItems = eachSchemaItems;
exports.formatDateValue = formatDateValue;
exports.formatNamedValue = formatNamedValue;
exports.formatNamedValueWhenChange = formatNamedValueWhenChange;
exports.formatNumberComma = formatNumberComma;
exports.getItemIndex = getItemIndex;
exports.getParentPath = getParentPath;
exports.guid = guid;
exports.mapSchemaItems = mapSchemaItems;
exports.replacePathKey = replacePathKey;
exports.transformArrayValuesToComma = transformArrayValuesToComma;
exports.transformCommaValuesToArray = transformCommaValuesToArray;
exports.transformComponentValue = transformComponentValue;
exports.triggerOnChangeWhenDataLoaded = triggerOnChangeWhenDataLoaded;

var _uuid = require("uuid");

var _shared = require("@formily/shared");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function isNum(v) {
  return isNaN(v) === false && v !== null;
}

function formatNumberComma(value) {
  if (value === undefined || value === null) {
    return value;
  }

  var arr = String(value).split(".");
  var v = arr[0];
  var temp = [];
  v = v.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  temp.push(v);

  for (var i = 1; i < arr.length; i++) {
    temp.push(arr[i]);
  }

  return temp.join(".");
}

function formatDateValue(value, format) {
  if (value) {
    var _format = format;

    if (typeof format === "string" && format) {
      _format = format.replace("hh", "HH");
    }

    var momentable = (0, _moment.default)(value, _format);
    return momentable.format(_format);
  } else {
    return value;
  }
}

function guid() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "f";
  var uid = (0, _uuid.v4)().replace(/-/g, "");
  return prefix + uid;
}
/**
 * 匹配路径中的索引
 * 表格组件存在编辑、非编辑两种模式，编辑模式时需要使用表单项真实id进行值的操作，非编辑模式需要使用数据中的dataIndex数据key进行操作
 * @路径 {string} path 如：a.1.b
 */


function getItemIndex(path, form) {
  var itemIndex = -1;
  var parentKey = "";
  var key = "";
  var index = "";
  var dataIndex = "";
  var pathArr = path.split(".");

  for (var i = 0; i < pathArr.length; i++) {
    if (isNum(pathArr[i])) {
      index = pathArr[i] + "";
      break;
    }
  }

  if (index) {
    var arr = path.split("." + index + ".");
    parentKey = arr[0];
    key = arr[1];
    itemIndex = index;
    dataIndex = key;

    if (form) {
      var itemState = form.getFieldState(path);
      var itemIsSchema = false;
      var itemIsEditing = false;

      if (itemState) {
        var _itemState$componentP;

        //如果产生了state，则为编辑模式
        itemIsEditing = true;

        if (((_itemState$componentP = itemState.componentProps) === null || _itemState$componentP === void 0 ? void 0 : _itemState$componentP["x-extra-props"].isRenderSchema) === true) {
          itemIsSchema = true;
        }
      } //非编辑模式需要通过dataIndex获取数据
      //renderSchema模式也需要通过dataIndex获取数据，因为此时的通过key无法获取到真实数据


      if (!itemIsEditing || itemIsSchema) {
        var _listState$fieldActio;

        var listState = form.getFieldState(parentKey);

        if (listState && typeof ((_listState$fieldActio = listState.fieldActions) === null || _listState$fieldActio === void 0 ? void 0 : _listState$fieldActio.getItemDataIndex) === "function") {
          //获取表单项key对应的dataIndex
          dataIndex = listState.fieldActions.getItemDataIndex(key);
        }
      }
    }
  } else {
    var _pathArr = path.split(".items.");

    if (_pathArr.length > 1) {
      parentKey = _pathArr[0];
      key = _pathArr[1];
      dataIndex = key;

      if (form) {
        var _listState$fieldActio2;

        var _listState = form.getFieldState(parentKey);

        if (_listState && typeof ((_listState$fieldActio2 = _listState.fieldActions) === null || _listState$fieldActio2 === void 0 ? void 0 : _listState$fieldActio2.getItemDataIndex) === "function") {
          //获取表单项key对应的dataIndex
          dataIndex = _listState.fieldActions.getItemDataIndex(key);
        }
      }
    } else {
      var _pathArr2 = path.split(".toolbar_");

      if (_pathArr2.length > 1) {
        parentKey = _pathArr2[0];
      }
    }
  }

  return {
    index: itemIndex,
    parentKey: parentKey,
    key: key,
    dataIndex: dataIndex
  };
}

function callEventWithPrepose(fn, preFn, payload) {
  if (typeof fn === "function") {
    if (typeof preFn === "function") {
      var res = preFn(payload);

      if (res instanceof Promise) {
        res.then(function (d) {
          if (d !== false) {
            fn(payload);
          }
        });
      } else if (res !== false) {
        fn(payload);
      }
    } else {
      fn(payload);
    }
  }
}

function getParentPath(path) {
  var parentPath = "";
  var pathArr = path.split(".");
  var key = "";

  if (pathArr.length > 1) {
    key = pathArr[pathArr.length - 1];
  }

  if (key) {
    pathArr = path.split("." + key);
  }

  if (pathArr.length > 1) {
    parentPath = pathArr[0];
  }

  return parentPath;
}

function replacePathKey(path, key) {
  var parentPath = getParentPath(path);

  if (parentPath) {
    return parentPath + "." + key;
  }

  return key;
}

function mapSchemaItems(items, fn, o) {
  var options = o || {
    paths: [],
    title: [],
    parent: null
  };

  function isEmptyItems(_schema) {
    var bl = false;

    if (_schema.items) {
      if (_schema.items.properties) {
        if (Object.keys(_schema.items.properties).length === 0) {
          bl = true;
        }
      } else {
        bl = true;
      }
    } else {
      bl = true;
    }

    return bl;
  }

  if (items && _typeof(items.properties) === "object" && items.properties) {
    for (var key in items.properties) {
      var props = items.properties[key];
      var _o = {
        paths: options.paths.slice(),
        title: options.title.slice(),
        parent: options.parent
      };

      _o.paths.push(props.name);

      var cprops = props["x-component-props"] || {};
      var extraProps = cprops["x-extra-props"] || {};
      var currTitle = "";

      if (cprops.hasOwnProperty("title")) {
        currTitle = cprops.title;
      } else {
        currTitle = props.title;
      }

      if (currTitle) {
        if (extraProps.extraNameFieldKey || extraProps.relatedNameFieldKey) {
          currTitle = currTitle + "_id";
        }

        _o.title.push(currTitle);
      }

      var item = _o;

      if (typeof fn === "function") {
        item = fn(props, key, _objectSpread(_objectSpread({}, _o), {}, {
          leaf: isEmptyItems(props)
        }));
      }

      if (props.items) {
        _o.parent = {
          key: props.key,
          name: props.name,
          path: props.name,
          "x-extra-props": props["x-extra-props"]
        };
        mapSchemaItems(props.items, fn, _o);
      }
    }
  }
}

function eachSchemaItems(root, callback) {
  function hasItems(o) {
    if (o && _typeof(o.items) === "object" && o.items && Object.keys(o.items).length > 0) {
      return true;
    }

    return false;
  }

  function isObject(o) {
    return o ? _typeof(o) === "object" && Object.getPrototypeOf(o) === Object.prototype : false;
  }

  var rootPath = [];

  if (isObject(root)) {
    var rootExtra = root["x-extra-props"] || {};
    var rp = rootExtra["data-path"];

    if (rp) {
      rootPath = [rp];
    }

    if (hasItems(root)) {
      mapChildren(root.items.properties || {}, rootPath, "items");
    } else {
      mapChildren(root.properties || {}, rootPath);
    }
  }

  function mapChildren(node, prevPath) {
    var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
    var index = 0;

    for (var k in node) {
      var d = node[k];
      var nodePath = prevPath.slice();

      if (prefix) {
        nodePath.push(prefix + "." + k);
      } else {
        nodePath.push(k);
      }

      var bl = callback(k, d, index, nodePath);

      if (bl === false) {
        return;
      }

      if (isObject(d)) {
        if (hasItems(d)) {
          mapChildren(d.items.properties || {}, nodePath, "items");
        } else {
          mapChildren(d.properties || {}, nodePath);
        }
      }

      index++;
    }
  }
}

function transformComponentValue(schema, value, instance) {
  var _schema$componentName;

  var ctype = (_schema$componentName = schema.componentName) === null || _schema$componentName === void 0 ? void 0 : _schema$componentName.toLowerCase();
  var extraProps = schema.extraProps;
  var _value = value;

  if (extraProps) {
    if (["checkbox"].indexOf(ctype) > -1) {
      _value = transformCommaValuesToArray(value);
    } else if (["select", "treeselect"].indexOf(ctype) > -1) {
      if (extraProps.selectMode === "multiple") {
        _value = transformCommaValuesToArray(value);
      }
    } else if (["switch"].indexOf(ctype) > -1) {
      _value = value == "1" ? true : false;
    }

    if (extraProps.relatedKey) {
      var relatedFieldState = instance.getFieldState(extraProps.relatedKey);

      if (relatedFieldState) {
        var _relatedFieldState$co, _relatedExtraProps$na;

        var relatedExtraProps = ((_relatedFieldState$co = relatedFieldState.componentProps) === null || _relatedFieldState$co === void 0 ? void 0 : _relatedFieldState$co["x-extra-props"]) || {};
        var relatedCtype = (_relatedExtraProps$na = relatedExtraProps.name) === null || _relatedExtraProps$na === void 0 ? void 0 : _relatedExtraProps$na.toLowerCase();

        if (["checkbox"].indexOf(relatedCtype) > -1) {
          _value = transformCommaValuesToArray(value);
        } else if (["select", "treeselect"].indexOf(relatedCtype) > -1) {
          if (relatedExtraProps.selectMode === "multiple") {
            _value = transformCommaValuesToArray(value);
          }
        }
      }
    }
  }

  return _value;
}

function transformCommaValuesToArray(value) {
  var SPLIT_CHAR = ",";
  var _value = value;

  if (typeof value === "string" && value) {
    _value = value.split(SPLIT_CHAR);
  }

  return _value;
}

function transformArrayValuesToComma(value) {
  var SPLIT_CHAR = ",";
  var _value = value;

  if (value instanceof Array) {
    _value = value.join(SPLIT_CHAR);
  }

  return _value;
}

function formatNamedValueWhenChange(value, label) {
  var keyField = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "key";
  var _value = null,
      _label = null;

  if (_typeof(value) === "object") {
    if (value instanceof Array) {
      var keys = [],
          labels = [];
      value.map(function (d) {
        keys.push(d[keyField]);
        labels.push(d.label);
      });

      if (keys.length > 0) {
        _value = keys;
      }

      if (labels.length > 0) {
        _label = labels;
      }
    } else {
      _value = value[keyField];
      _label = label;
    }
  } else {
    _value = value;
    _label = label;
  }

  return {
    value: _value,
    label: _label
  };
}

function formatNamedValue(value, values, isMultiple) {
  var objectValue = undefined;

  if (value) {
    var _values$;

    var extraNameValue = (_values$ = values[1]) !== null && _values$ !== void 0 ? _values$ : "";

    if (value instanceof Array) {
      objectValue = [];
      var labels = [];

      if (extraNameValue instanceof Array) {
        labels = extraNameValue;
      } else {
        if (isMultiple) {
          labels = transformCommaValuesToArray(extraNameValue);
        } else {
          labels = [extraNameValue];
        }
      }

      value.forEach(function (d, i) {
        objectValue.push({
          key: d,
          value: d,
          label: labels[i]
        });
      });
    } else if (typeof value === "string") {
      if (isMultiple === true) {
        var keys = transformCommaValuesToArray(value);

        var _labels = transformCommaValuesToArray(extraNameValue);

        objectValue = [];
        keys.forEach(function (d, i) {
          objectValue.push({
            key: d,
            value: d,
            label: _labels[i]
          });
        });
      } else {
        objectValue = {
          key: value,
          value: value,
          label: extraNameValue
        };
      }
    }
  }

  return objectValue;
} //下拉、下拉树，如果有id但无lable，则在数据源加载完成后，重新触发onChange以反写label及行数据值


function triggerOnChangeWhenDataLoaded(value, data, onChange) {
  if (value) {
    var dataMap = {};
    data.forEach(function (d) {
      dataMap[d.value] = d;
    });

    if (value instanceof Array) {
      var values = [];
      var items = [];

      if (value.length > 0) {
        var bl = false;
        value.forEach(function (d) {
          var selected = dataMap[d.value] || {};

          var item = _objectSpread({}, d);

          if (selected) {
            if (!item.label) {
              item.label = selected.label;
              bl = true;
            }
          }

          values.push(item);
          items.push(selected);
        });

        if (bl) {
          onChange(values, undefined, items);
        }
      }
    } else if (!value.label) {
      var selected = dataMap[value.value];

      if (selected) {
        onChange(selected.value, selected.label, selected);
      }
    }
  }
}