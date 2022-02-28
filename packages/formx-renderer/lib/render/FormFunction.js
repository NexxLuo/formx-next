"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _excluded = ["value"];

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function lowercase(str) {
  if (str && typeof str.toLowerCase === "function") {
    return str.toLowerCase();
  }

  return str;
}

var FormFunction = /*#__PURE__*/_createClass(function FormFunction() {
  var _this = this;

  _classCallCheck(this, FormFunction);

  this.setItem = function (o) {
    var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (o && o.name) {
      var name = o.name;

      if (reset !== true && _this.items[name]) {
        console.warn("Function name duplicate. Please change the name:" + name);
        return false;
      }

      _this.items[name] = {
        name: name,
        value: o.value,
        title: o.title
      };
      return true;
    }

    return false;
  };

  this.setItems = function (items, reset) {
    if (items instanceof Array) {
      for (var i = 0; i < items.length; i++) {
        var item = items[i];

        _this.setItem(item, reset);
      }
    }
  };

  this.getItems = function () {
    var items = _this.items;
    return Object.keys(items).map(function (k) {
      var _items$k = items[k],
          value = _items$k.value,
          other = _objectWithoutProperties(_items$k, _excluded);

      return other;
    });
  };

  this.getItemValue = function (k) {
    var _items$k2;

    var items = _this.items;
    var v = (_items$k2 = items[k]) === null || _items$k2 === void 0 ? void 0 : _items$k2.value;
    return v;
  };

  this.setItemValue = function (k, v) {
    var items = _this.items;
    var d = items[k];

    if (d) {
      d.value = v;
    }
  };

  this.setItemsValue = function (o) {
    if (_typeof(o) === "object" && o) {
      for (var k in o) {
        if (Object.prototype.hasOwnProperty.call(o, k)) {
          _this.setItemValue(k, o[k]);
        }
      }
    }
  };

  this.items = {};

  this.call = function () {
    var res = undefined;
    var args = Array.prototype.slice.call(arguments);
    var name = args[0];
    var arr = [];
    var i = 1;

    while (i < args.length) {
      arr.push(args[i]);
      i++;
    }

    if (name) {
      var fn = this.getItemValue(name);

      if (typeof fn === "function") {
        res = fn.apply(null, arr);
      } else {
        console.error("Function not found. Please check:" + name);
      }
    }

    return res;
  }.bind(this);
});

exports.default = FormFunction;