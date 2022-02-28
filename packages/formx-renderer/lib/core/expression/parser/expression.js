"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Expression = Expression;

var _simplify = _interopRequireDefault(require("./simplify"));

var _substitute = _interopRequireDefault(require("./substitute"));

var _evaluate = _interopRequireDefault(require("./evaluate"));

var _expressionToString = _interopRequireDefault(require("./expression-to-string"));

var _getSymbols = _interopRequireDefault(require("./get-symbols"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Expression(tokens, parser) {
  this.tokens = tokens;
  this.parser = parser;
  this.unaryOps = parser.unaryOps;
  this.binaryOps = parser.binaryOps;
  this.ternaryOps = parser.ternaryOps;
  this.functions = parser.functions;
}

Expression.prototype.simplify = function (values) {
  values = values || {};
  return new Expression((0, _simplify.default)(this.tokens, this.unaryOps, this.binaryOps, this.ternaryOps, values), this.parser);
};

Expression.prototype.substitute = function (variable, expr) {
  if (!(expr instanceof Expression)) {
    expr = this.parser.parse(String(expr));
  }

  return new Expression((0, _substitute.default)(this.tokens, variable, expr), this.parser);
};

Expression.prototype.evaluate = function (values) {
  values = values || {};
  return (0, _evaluate.default)(this.tokens, this, values);
};

Expression.prototype.toString = function () {
  return (0, _expressionToString.default)(this.tokens, false);
};

Expression.prototype.symbols = function (options) {
  options = options || {};
  var vars = [];
  (0, _getSymbols.default)(this.tokens, vars, options);
  return vars;
};

Expression.prototype.variables = function (options) {
  options = options || {};
  var vars = [];
  (0, _getSymbols.default)(this.tokens, vars, options);
  var functions = this.functions;
  return vars.filter(function (name) {
    return !(name in functions);
  });
};

Expression.prototype.toJSFunction = function (param, variables) {
  var expr = this;
  var f = new Function(param, 'with(this.functions) with (this.ternaryOps) with (this.binaryOps) with (this.unaryOps) { return ' + (0, _expressionToString.default)(this.simplify(variables).tokens, true) + '; }'); // eslint-disable-line no-new-func

  return function () {
    return f.apply(expr, arguments);
  };
};