"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _parser = require("./parser/parser");

var functions = _interopRequireWildcard(require("./functions"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function parseExpressionString(values, formatVar) {
  var str = "";

  if (values instanceof Array) {
    var expr = [];
    values.forEach(function (d) {
      if (_typeof(d) === "object" && d) {
        if (d.type === "value") {
          var v = d.value;

          if (v) {
            for (var k in formatVar) {
              var kv = formatVar[k];
              v = v.replace(k, kv);
            }
          }

          expr.push("value(\"".concat(v, "\")"));
        } else if (d.type === "func") {
          expr.push("".concat(d.value, "()"));
        } else if (d.type === "operator") {
          expr.push(d.value);
        } else {
          expr.push(d.value);
        }
      } else {
        if (typeof d === "string") {
          if (isNaN(Number(d))) {
            expr.push("\"".concat(d, "\""));
          } else {
            expr.push(d);
          }
        } else {
          expr.push(d);
        }
      }
    });
    str = expr.join(" ");
  } else {
    str = values;

    for (var k in formatVar) {
      var kv = formatVar[k];
      str = str.replaceAll(k, kv);
    }
  }

  return str;
}

var Evaluator = /*#__PURE__*/function () {
  function Evaluator(props) {
    _classCallCheck(this, Evaluator);

    this.parser = new _parser.Parser({});
    this.parser.functions = _objectSpread(_objectSpread({}, functions), props.functions);
    this.onError = props.onError;
  }

  _createClass(Evaluator, [{
    key: "evaluate",
    value: function evaluate(expressionArray) {
      var replaceVar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var injectVar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (!expressionArray) {
        return null;
      }

      var exprString = "";

      try {
        exprString = parseExpressionString(expressionArray, replaceVar);
        var expr = this.parser.parse(exprString);

        this.parser.functions.RuntimeVar = function (_k) {
          var k = _k;

          if (typeof _k === "string" && _k.length === 0) {
            k = "value";
          } else if (typeof _k === "undefined" || _k === null) {
            return injectVar;
          }

          return injectVar[k];
        };

        var res = expr.evaluate(_objectSpread({
          null: null,
          undefined: undefined
        }, injectVar));

        if (typeof res === "number" && isNaN(res)) {
          return null;
        }

        return res;
      } catch (e) {
        console.error("expression error:", exprString, e.message);
        var fn = this.onError;

        if (typeof fn === "function") {
          fn(e);
        }

        return null;
      }
    }
  }]);

  return Evaluator;
}();

exports.default = Evaluator;