"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEnv = getEnv;
exports.getExpressionVar = getExpressionVar;
exports.getParentPath = getParentPath;
exports.parseStyleString = parseStyleString;
exports.replacePathKey = replacePathKey;
exports.transformArrayItemsPath = transformArrayItemsPath;

var _utils = require("../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function getExpressionVar(name) {
  //由于表格的行数据联动时需要指定index，故将表达式内容中的items替换为当前的行index
  var _getItemIndex = (0, _utils.getItemIndex)(name),
      index = _getItemIndex.index;

  return {
    items: index
  };
}

function getChildrenGraph(graph, path) {
  var items = [];

  for (var k in graph) {
    if (graph.hasOwnProperty(k)) {
      var g = graph[k];

      if (g.path && g.path !== path && g.path.indexOf(path) > -1) {
        items.push(g);
      }
    }
  }

  return items;
}
/**
 * 将 array.items.key1 中的items转换为表格正在编辑中的索引
 * @param {string} path 包含items的路径
 * @param {*} form
 */


function transformArrayItemsPath(path, form) {
  var pathArr = path.split(".items.");

  if (pathArr.length > 1) {
    var listKey = pathArr[0];
    var itemKey = pathArr[1];
    var itemIndex = -1; //获取表格组件未卸载的表单项（即为编辑中的表单项）

    var gArr = getChildrenGraph(form.getFormGraph(), listKey);
    var itemGraph = null;

    if (gArr instanceof Array) {
      itemGraph = gArr.find(function (d) {
        return d.mounted === true && d.unmounted === false && d.path.indexOf(itemKey) > 0;
      });
    } //
    //从编辑中的表单项路径中匹配出索引


    if (itemGraph) {
      var itemPathArr = itemGraph.path.split(".");

      for (var i = 0; i < itemPathArr.length; i++) {
        var _index = itemPathArr[i];

        if (isNaN(_index) === false && _index !== null) {
          itemIndex = _index + "";
          break;
        }
      }
    } //


    if (itemIndex > -1) {
      path = path.replace(".items.", "." + itemIndex + ".");
    }
  }

  return path;
}
/**
 * 转换样式字符串为object
 * @param {string | CSSStyleDeclaration} style eg :"color:red,fontWeight:bold,fontSize:20px" or {}
 * @returns CSSStyleDeclaration
 */


function parseStyleString(style) {
  var styles = {};

  if (typeof style === "string" && style.length > 0) {
    style.split(",").forEach(function (d) {
      var temp = d.split(":");
      var k = temp[0],
          v = temp[1];

      if (k) {
        styles[k] = v;
      }
    });
  } else if (_typeof(style) === "object" && style) {
    styles = _objectSpread({}, style);
  }

  return styles;
}

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