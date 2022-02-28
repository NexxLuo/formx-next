"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Parser = Parser;

var _token = require("./token");

var _tokenStream = require("./token-stream");

var _parserState = require("./parser-state");

var _expression = require("./expression");

var _functions = require("./functions");

function Parser(options) {
  this.options = options || {};
  this.unaryOps = {
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    asin: Math.asin,
    acos: Math.acos,
    atan: Math.atan,
    sinh: Math.sinh || _functions.sinh,
    cosh: Math.cosh || _functions.cosh,
    tanh: Math.tanh || _functions.tanh,
    asinh: Math.asinh || _functions.asinh,
    acosh: Math.acosh || _functions.acosh,
    atanh: Math.atanh || _functions.atanh,
    sqrt: Math.sqrt,
    cbrt: Math.cbrt || _functions.cbrt,
    log: Math.log,
    log2: Math.log2 || _functions.log2,
    ln: Math.log,
    lg: Math.log10 || _functions.log10,
    log10: Math.log10 || _functions.log10,
    expm1: Math.expm1 || _functions.expm1,
    log1p: Math.log1p || _functions.log1p,
    abs: Math.abs,
    ceil: Math.ceil,
    floor: Math.floor,
    round: Math.round,
    trunc: Math.trunc || _functions.trunc,
    "-": _functions.neg,
    "+": Number,
    exp: Math.exp,
    not: _functions.not,
    length: _functions.stringOrArrayLength,
    "!": _functions.factorial,
    sign: Math.sign || _functions.sign
  };
  this.binaryOps = {
    "+": _functions.add,
    "-": _functions.sub,
    "*": _functions.mul,
    "/": _functions.div,
    "%": _functions.mod,
    "^": Math.pow,
    "||": _functions.concat,
    "==": _functions.equal,
    "!=": _functions.notEqual,
    ">": _functions.greaterThan,
    "<": _functions.lessThan,
    ">=": _functions.greaterThanEqual,
    "<=": _functions.lessThanEqual,
    and: _functions.andOperator,
    or: _functions.orOperator,
    in: _functions.inOperator,
    "=": _functions.setVar,
    "[": _functions.arrayIndex
  };
  this.ternaryOps = {
    "?": _functions.condition
  };
  this.functions = {
    random: _functions.random,
    fac: _functions.factorial,
    min: _functions.min,
    max: _functions.max,
    hypot: Math.hypot || _functions.hypot,
    pyt: Math.hypot || _functions.hypot,
    // backward compat
    pow: Math.pow,
    atan2: Math.atan2,
    if: _functions.condition,
    gamma: _functions.gamma,
    roundTo: _functions.roundTo,
    map: _functions.arrayMap,
    fold: _functions.arrayFold,
    filter: _functions.arrayFilter,
    indexOf: _functions.stringOrArrayIndexOf,
    join: _functions.arrayJoin,
    sum: _functions.sum
  };
  this.consts = {
    E: Math.E,
    PI: Math.PI,
    true: true,
    false: false
  };
}

Parser.prototype.parse = function (expr) {
  var instr = [];
  var parserState = new _parserState.ParserState(this, new _tokenStream.TokenStream(this, expr), {
    allowMemberAccess: this.options.allowMemberAccess
  });
  parserState.parseExpression(instr);
  parserState.expect(_token.TEOF, "EOF");
  return new _expression.Expression(instr, this);
};

Parser.prototype.evaluate = function (expr, variables) {
  return this.parse(expr).evaluate(variables);
};

var sharedParser = new Parser();

Parser.parse = function (expr) {
  return sharedParser.parse(expr);
};

Parser.evaluate = function (expr, variables) {
  return sharedParser.parse(expr).evaluate(variables);
};

var optionNameMap = {
  "+": "add",
  "-": "subtract",
  "*": "multiply",
  "/": "divide",
  "%": "remainder",
  "^": "power",
  "!": "factorial",
  "<": "comparison",
  ">": "comparison",
  "<=": "comparison",
  ">=": "comparison",
  "==": "comparison",
  "!=": "comparison",
  "||": "concatenate",
  and: "logical",
  or: "logical",
  not: "logical",
  "?": "conditional",
  ":": "conditional",
  "=": "assignment",
  "[": "array",
  "()=": "fndef"
};

function getOptionName(op) {
  return optionNameMap.hasOwnProperty(op) ? optionNameMap[op] : op;
}

Parser.prototype.isOperatorEnabled = function (op) {
  var optionName = getOptionName(op);
  var operators = this.options.operators || {};
  return !(optionName in operators) || !!operators[optionName];
};