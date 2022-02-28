"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Average = Average;
exports.CalcDateTime = CalcDateTime;
exports.Contains = Contains;
exports.Count = Count;
exports.DateTimeFormat = DateTimeFormat;
exports.DateTimeNow = DateTimeNow;
exports.DiffDateTime = DiffDateTime;
exports.Filter = Filter;
exports.FormatNumberComma = FormatNumberComma;
exports.GetId = GetId;
exports.GetLength = GetLength;
exports.GetProperty = GetProperty;
exports.IF = IF;
exports.IfNull = IfNull;
exports.IsEqual = IsEqual;
exports.IsNullOrEmpty = IsNullOrEmpty;
exports.IsStrictlyEqual = IsStrictlyEqual;
exports.JSONParse = JSONParse;
exports.JSONStringify = JSONStringify;
exports.Like = Like;
exports.MapValue = MapValue;
exports.MathAdd = MathAdd;
exports.MathDivide = MathDivide;
exports.MathMultiply = MathMultiply;
exports.MathSubtract = MathSubtract;
exports.Max = Max;
exports.Min = Min;
exports.Not = Not;
exports.NotLike = NotLike;
exports.Reduce = Reduce;
exports.StringConcat = StringConcat;
exports.Sum = Sum;
exports.ToDateTime = ToDateTime;
exports.ToDecimal = ToDecimal;
exports.ToNumber = ToNumber;
exports.ToString = ToString;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _mathjs = require("mathjs");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var MathCalc = (0, _mathjs.create)(_mathjs.all, {
  number: "BigNumber"
});

function toNumber(v) {
  var value = 0;
  var temp = Number(v);

  if (!isNaN(temp)) {
    value = temp;
  }

  return value;
}

function getArgs(_args) {
  var args = Array.prototype.slice.call(_args);
  var values = [];

  if (args.length > 0) {
    for (var i = 0; i < args.length; i++) {
      var arg = args[i];

      if (arg instanceof Array) {
        values = values.concat(arg);
      } else {
        values.push(arg);
      }
    }
  }

  return values;
}

function Sum() {
  var value = 0;
  var values = getArgs(arguments);
  value = MathAdd.apply(void 0, _toConsumableArray(values));
  return value;
}

function Average() {
  var value = 0;
  var values = getArgs(arguments);
  value = MathDivide(MathAdd.apply(void 0, _toConsumableArray(values)), values.length);
  return value;
}

function Count() {
  var values = getArgs(arguments);
  var i = 0;
  values.forEach(function (v) {
    if (v !== null && v !== undefined) {
      i++;
    }
  });
  return i;
}

function Min() {
  var values = getArgs(arguments);
  var value = null;
  values.forEach(function (a) {
    var v = toNumber(a);

    if (value === null) {
      value = v;
    } else {
      if (v < value) {
        value = v;
      }
    }
  });
  return value;
}

function Max() {
  var values = getArgs(arguments);
  var value = null;
  values.forEach(function (a) {
    var v = toNumber(a);

    if (value === null) {
      value = v;
    } else {
      if (v > value) {
        value = v;
      }
    }
  });
  return value;
}

function IF(con, y, n) {
  if (con) {
    return y;
  } else {
    return n;
  }
} //日期操作函数


function DateTimeNow() {
  return (0, _dayjs.default)().format("YYYY/MM/DD HH:mm:ss");
}

function ToDateTime(v) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "YYYY/MM/DD HH:mm:ss";

  if (format) {
    var _format = format;

    if (typeof format === "string") {
      _format = format.replace("hh", "HH");
    }

    return new Date((0, _dayjs.default)(v).format(_format));
  }

  return new Date(v);
}

function DateTimeFormat(v, format) {
  if (v) {
    var _format = format;

    if (typeof format === "string" && format) {
      _format = format.replace("hh", "HH");
    }

    return (0, _dayjs.default)(v).format(_format);
  }

  return v;
} //区间计算

/**
 * 后者与前者的时间差
 * @param {*} a
 * @param {*} b
 * @param {*} type years、quarter、mouths、weeks、days、hours、minutes、seconds、milliseconds
 *  */


function DiffDateTime(a, b, type) {
  if (!a || !b) {
    return null;
  }

  var date1 = (0, _dayjs.default)(b);
  var v = date1.diff(a, type, false);
  return v;
} //

/**
 * 日期加减运算
 * @param {*} a
 * @param {*} b  正数为+，负数为减法
 * @param {*} type years、quarter、mouths、weeks、days、hours、minutes、seconds、milliseconds
 */


function CalcDateTime(a, b, type) {
  if (!a) {
    return null;
  }

  if (!b) {
    b = 0;
  }

  var date1 = (0, _dayjs.default)(a);
  var v = date1.add(b, type).format("YYYY/MM/DD HH:mm:ss");
  return v;
} //


function MapValue() {
  var _obj$value;

  var args = Array.prototype.slice.call(arguments);
  var value = args[0];
  var obj = {};
  var i = 1;

  while (i < args.length) {
    var arg = args[i];
    obj[arg] = args[i + 1];
    i += 2;
  }

  return (_obj$value = obj[value]) !== null && _obj$value !== void 0 ? _obj$value : value;
}

function IsNullOrEmpty(v) {
  return v === undefined || v === null || v === "";
}

function IfNull(v, res) {
  var bl = v === undefined || v === null || v === "";

  if (typeof res === "undefined") {
    return v;
  }

  if (bl === true) {
    return res;
  } else {
    return v;
  }
}

function Contains() {
  var args = Array.prototype.slice.call(arguments);

  if (args.length === 0) {
    return false;
  }

  var value = args[0];
  var arr = []; //如果第一个参数为数组，则第一个参数为查找源，后续参数为需要查找的关键字集合
  //否则第一个参数为查找的关键字，后续参数为查找源

  if (value instanceof Array) {
    var _ret = function () {
      var bl = false;
      var values = {};

      for (var j = 1; j < args.length; j++) {
        var d = args[j];

        if (d !== null && d !== undefined) {
          if (d instanceof Array) {
            d.forEach(function (_d) {
              values[_d] = true;
            });
          } else {
            values[d] = true;
          }
        }
      }

      for (var k = 0; k < value.length; k++) {
        var e = value[k];

        if (values[e]) {
          bl = true;
          break;
        }
      }

      return {
        v: bl
      };
    }();

    if (_typeof(_ret) === "object") return _ret.v;
  } else {
    var i = 1;

    while (i < args.length) {
      if (args[i] instanceof Array) {
        args[i].forEach(function (d) {
          arr.push(d);
        });
      } else {
        arr.push(args[i]);
      }

      i += 1;
    }

    return arr.indexOf(value) > -1;
  }
}

function Like(a, b) {
  var bl = false;

  if (IsNullOrEmpty(a)) {
    return bl;
  }

  if (typeof a === "string" || a instanceof Array) {
    return a.indexOf(b) > -1;
  }

  return bl;
}

function NotLike(a, b) {
  var bl = false;

  if (IsNullOrEmpty(a)) {
    return bl;
  }

  if (typeof a === "string" || a instanceof Array) {
    return a.indexOf(b) === -1;
  }

  return bl;
}

function GetLength(v) {
  var len = 0;

  if (v !== null && typeof v !== "undefined") {
    if (_typeof(v) === "object") {
      len = v.length || 0;
    } else {
      len = String(v).length;
    }
  }

  return len;
}

function GetProperty(values, p) {
  var value = null;

  if (_typeof(values) === "object" && values && p) {
    var o = values;

    if (values instanceof Array) {
      o = values[0] || {};
    }

    value = o[p];
  }

  return value;
}

function JSONParse(str) {
  var value = null;

  if (typeof str === "string" && str) {
    value = JSON.parse(str);
  }

  return value;
}

function JSONStringify(values) {
  var value = null;

  if (_typeof(values) === "object" && values) {
    value = JSON.stringify(values);
  }

  return value;
}

function StringConcat() {
  var values = getArgs(arguments);
  var value = values.join("");
  return value;
}

function ToString(v) {
  var value = String(v);
  return value;
}

function ToNumber(v, precision) {
  var value = Number(v);

  if (isNaN(value)) {
    value = 0;
  }

  if (typeof precision === "number") {
    value = Number(value.toFixed(precision));
  }

  return value;
}

function ToDecimal(v, precision) {
  var value = Number(v);

  if (isNaN(value)) {
    value = 0;
  }

  if (typeof precision === "number") {
    value = value.toFixed(precision);
  }

  return value;
}

function IsEqual(a, b) {
  return a == b;
}

function IsStrictlyEqual(a, b) {
  return a === b;
}

function Not(v) {
  return !v;
}

function MathAdd() {
  var _value;

  var args = Array.prototype.slice.call(arguments);

  if (args.length === 0) {
    return 0;
  }

  if (args.length === 1) {
    return args[0];
  }

  var first = Number(args[0]);

  if (isNaN(first)) {
    first = 0;
  }

  var c = MathCalc.chain(MathCalc.bignumber(first));
  var i = 1;
  var value = 0;

  while (i < args.length) {
    var v = Number(args[i]);

    if (typeof v === "number" && !isNaN(v)) {
      c = c.add(MathCalc.bignumber(v));
    }

    i += 1;
  }

  value = c.done();

  if (typeof ((_value = value) === null || _value === void 0 ? void 0 : _value.toNumber) === "function") {
    value = value.toNumber();
  } else {
    value = 0;
  }

  return value;
}

function MathSubtract() {
  var _value2;

  var args = Array.prototype.slice.call(arguments);

  if (args.length === 0) {
    return 0;
  }

  if (args.length === 1) {
    return args[0];
  }

  var first = Number(args[0]);

  if (isNaN(first)) {
    first = 0;
  }

  var c = MathCalc.chain(MathCalc.bignumber(first));
  var i = 1;
  var value = 0;

  while (i < args.length) {
    var v = Number(args[i]);

    if (typeof v === "number" && !isNaN(v)) {
      c = c.subtract(MathCalc.bignumber(v));
    }

    i += 1;
  }

  value = c.done();

  if (typeof ((_value2 = value) === null || _value2 === void 0 ? void 0 : _value2.toNumber) === "function") {
    value = value.toNumber();
  } else {
    value = 0;
  }

  return value;
}

function MathMultiply() {
  var _value3;

  var args = Array.prototype.slice.call(arguments);

  if (args.length === 0) {
    return 0;
  }

  if (args.length === 1) {
    return args[0];
  }

  var first = Number(args[0]);

  if (isNaN(first)) {
    first = 0;
  }

  var c = MathCalc.chain(MathCalc.bignumber(first));
  var i = 1;
  var value = 0;

  while (i < args.length) {
    var v = Number(args[i]);

    if (typeof v === "number" && !isNaN(v)) {
      c = c.multiply(MathCalc.bignumber(v));
    }

    i += 1;
  }

  value = c.done();

  if (typeof ((_value3 = value) === null || _value3 === void 0 ? void 0 : _value3.toNumber) === "function") {
    value = value.toNumber();
  } else {
    value = 0;
  }

  return value;
}

function MathDivide() {
  var _value4;

  var args = Array.prototype.slice.call(arguments);

  if (args.length === 0) {
    return 0;
  }

  if (args.length === 1) {
    return args[0];
  }

  var first = Number(args[0]);

  if (isNaN(first)) {
    first = 0;
  }

  var c = MathCalc.chain(MathCalc.bignumber(first));
  var i = 1;
  var value = 0;

  while (i < args.length) {
    var v = Number(args[i]);

    if (typeof v === "number" && !isNaN(v)) {
      c = c.divide(MathCalc.bignumber(v));
    }

    i += 1;
  }

  value = c.done();

  if (typeof ((_value4 = value) === null || _value4 === void 0 ? void 0 : _value4.toNumber) === "function") {
    value = value.toNumber();
  } else {
    value = 0;
  }

  return value;
}

function GetId(v) {
  var value = "";

  if (typeof v === "string" && v) {
    var _v = v.replace(/value\('([^<]*?)'\)/g, "$1").split(".");

    value = _v[_v.length - 1];
  }

  return value;
}
/**
 * 根据条件表达式过滤数据源
 * 表达式中如果想获取其他字段的值可使用GetId函数包装表单项，如：item[GetId("表格.column1")]
 * 完整用例 Filter(表格,'item[GetId("表格.column1")]=="a"?true:false',GetId("表格.column2"))
 * @param {Array} items 数据源
 * @param {string} expr 过滤表达式，支持item:any、value:(fieldId:string)=>any两个参数
 * @param {*} returnedField 过滤后返回的数据字段，不设置则返回所有
 * @returns 过滤后的值
 */


function Filter(items, expr, returnedField, a, b, c) {
  var value = items;

  var _evaluator = this;

  function getValue(str) {
    var res = _evaluator.parser.functions.value(str);

    return res;
  }

  if (items instanceof Array && expr) {
    var fn = new Function(["item", "value", "index", "items"], "var top=undefined,parent=undefined,window=undefined,eval=undefined;return " + expr);

    var _temp = items.filter(function (d, index) {
      try {
        var res = fn(d, getValue, index, items);
        return res;
      } catch (error) {
        console.error("filter function error:", error);
        return false;
      }
    });

    if (typeof returnedField === "string" && returnedField) {
      var _field = returnedField.trim();

      value = _temp.map(function (d) {
        return d[_field];
      });
    } else {
      value = _temp;
    }
  }

  return value;
}
/**
 * 数组Reduce函数
 * 表达式中如果想获取其他字段的值可使用GetId函数包装表单项，如：item[GetId("表格.column1")]
 * 完整用例 Reduce(表格,'item[GetId("表格.column1")]=="a"?all:all+1',0)
 * @param {Array} items 数据源
 * @param {string} expr 过滤表达式，支持all:any、item:any、index:number、array:[] 四个参数
 * @param {*} initialValue 初始值
 * @returns 处理后的值
 */


function Reduce(items, expr, initialValue) {
  var value = [];

  try {
    value = JSONParse(JSONStringify(items || []));
  } catch (error) {}

  if (_typeof(items) === "object" && items && expr) {
    if (items instanceof Array === false) {
      items = [items];
    }

    var fn = new Function(["all", "item", "index", "array"], "var top=undefined,parent=undefined,window=undefined,eval=undefined;return " + expr);
    value = items.reduce(fn, initialValue !== null && initialValue !== void 0 ? initialValue : "");
  }

  return value;
} //数字千分位分隔


function FormatNumberComma(value) {
  return (0, _utils.formatNumberComma)(value);
}