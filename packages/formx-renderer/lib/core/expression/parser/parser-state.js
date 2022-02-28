"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParserState = ParserState;

var _token = require("./token");

var _instruction = require("./instruction");

var _contains = _interopRequireDefault(require("./contains"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ParserState(parser, tokenStream, options) {
  this.parser = parser;
  this.tokens = tokenStream;
  this.current = null;
  this.nextToken = null;
  this.next();
  this.savedCurrent = null;
  this.savedNextToken = null;
  this.allowMemberAccess = options.allowMemberAccess !== false;
}

ParserState.prototype.next = function () {
  this.current = this.nextToken;
  return this.nextToken = this.tokens.next();
};

ParserState.prototype.tokenMatches = function (token, value) {
  if (typeof value === "undefined") {
    return true;
  } else if (Array.isArray(value)) {
    return (0, _contains.default)(value, token.value);
  } else if (typeof value === "function") {
    return value(token);
  } else {
    return token.value === value;
  }
};

ParserState.prototype.save = function () {
  this.savedCurrent = this.current;
  this.savedNextToken = this.nextToken;
  this.tokens.save();
};

ParserState.prototype.restore = function () {
  this.tokens.restore();
  this.current = this.savedCurrent;
  this.nextToken = this.savedNextToken;
};

ParserState.prototype.accept = function (type, value) {
  if (this.nextToken.type === type && this.tokenMatches(this.nextToken, value)) {
    this.next();
    return true;
  }

  return false;
};

ParserState.prototype.expect = function (type, value) {
  if (!this.accept(type, value)) {
    var coords = this.tokens.getCoordinates();
    throw new Error("parse error [" + coords.line + ":" + coords.column + "]: Expected " + (value || type));
  }
};

ParserState.prototype.parseAtom = function (instr) {
  var unaryOps = this.tokens.unaryOps;

  function isPrefixOperator(token) {
    return token.value in unaryOps;
  }

  if (this.accept(_token.TNAME) || this.accept(_token.TOP, isPrefixOperator)) {
    instr.push(new _instruction.Instruction(_instruction.IVAR, this.current.value));
  } else if (this.accept(_token.TNUMBER)) {
    instr.push(new _instruction.Instruction(_instruction.INUMBER, this.current.value));
  } else if (this.accept(_token.TSTRING)) {
    instr.push(new _instruction.Instruction(_instruction.INUMBER, this.current.value));
  } else if (this.accept(_token.TPAREN, "(")) {
    this.parseExpression(instr);
    this.expect(_token.TPAREN, ")");
  } else if (this.accept(_token.TBRACKET, "[")) {
    if (this.accept(_token.TBRACKET, "]")) {
      instr.push(new _instruction.Instruction(_instruction.IARRAY, 0));
    } else {
      var argCount = this.parseArrayList(instr);
      instr.push(new _instruction.Instruction(_instruction.IARRAY, argCount));
    }
  } else {
    throw new Error("unexpected " + this.nextToken);
  }
};

ParserState.prototype.parseExpression = function (instr) {
  var exprInstr = [];

  if (this.parseUntilEndStatement(instr, exprInstr)) {
    return;
  }

  this.parseVariableAssignmentExpression(exprInstr);

  if (this.parseUntilEndStatement(instr, exprInstr)) {
    return;
  }

  this.pushExpression(instr, exprInstr);
};

ParserState.prototype.pushExpression = function (instr, exprInstr) {
  for (var i = 0, len = exprInstr.length; i < len; i++) {
    instr.push(exprInstr[i]);
  }
};

ParserState.prototype.parseUntilEndStatement = function (instr, exprInstr) {
  if (!this.accept(_token.TSEMICOLON)) return false;

  if (this.nextToken && this.nextToken.type !== _token.TEOF && !(this.nextToken.type === _token.TPAREN && this.nextToken.value === ")")) {
    exprInstr.push(new _instruction.Instruction(_instruction.IENDSTATEMENT));
  }

  if (this.nextToken.type !== _token.TEOF) {
    this.parseExpression(exprInstr);
  }

  instr.push(new _instruction.Instruction(_instruction.IEXPR, exprInstr));
  return true;
};

ParserState.prototype.parseArrayList = function (instr) {
  var argCount = 0;

  while (!this.accept(_token.TBRACKET, "]")) {
    this.parseExpression(instr);
    ++argCount;

    while (this.accept(_token.TCOMMA)) {
      this.parseExpression(instr);
      ++argCount;
    }
  }

  return argCount;
};

ParserState.prototype.parseVariableAssignmentExpression = function (instr) {
  this.parseConditionalExpression(instr);

  while (this.accept(_token.TOP, "=")) {
    var varName = instr.pop();
    var varValue = [];
    var lastInstrIndex = instr.length - 1;

    if (varName.type === _instruction.IFUNCALL) {
      if (!this.tokens.isOperatorEnabled("()=")) {
        throw new Error("function definition is not permitted");
      }

      for (var i = 0, len = varName.value + 1; i < len; i++) {
        var index = lastInstrIndex - i;

        if (instr[index].type === _instruction.IVAR) {
          instr[index] = new _instruction.Instruction(_instruction.IVARNAME, instr[index].value);
        }
      }

      this.parseVariableAssignmentExpression(varValue);
      instr.push(new _instruction.Instruction(_instruction.IEXPR, varValue));
      instr.push(new _instruction.Instruction(_instruction.IFUNDEF, varName.value));
      continue;
    }

    if (varName.type !== _instruction.IVAR && varName.type !== _instruction.IMEMBER) {
      throw new Error("expected variable for assignment");
    }

    this.parseVariableAssignmentExpression(varValue);
    instr.push(new _instruction.Instruction(_instruction.IVARNAME, varName.value));
    instr.push(new _instruction.Instruction(_instruction.IEXPR, varValue));
    instr.push((0, _instruction.binaryInstruction)("="));
  }
};

ParserState.prototype.parseConditionalExpression = function (instr) {
  this.parseOrExpression(instr);

  while (this.accept(_token.TOP, "?")) {
    var trueBranch = [];
    var falseBranch = [];
    this.parseConditionalExpression(trueBranch);
    this.expect(_token.TOP, ":");
    this.parseConditionalExpression(falseBranch);
    instr.push(new _instruction.Instruction(_instruction.IEXPR, trueBranch));
    instr.push(new _instruction.Instruction(_instruction.IEXPR, falseBranch));
    instr.push((0, _instruction.ternaryInstruction)("?"));
  }
};

ParserState.prototype.parseOrExpression = function (instr) {
  this.parseAndExpression(instr);

  while (this.accept(_token.TOP, "or")) {
    var falseBranch = [];
    this.parseAndExpression(falseBranch);
    instr.push(new _instruction.Instruction(_instruction.IEXPR, falseBranch));
    instr.push((0, _instruction.binaryInstruction)("or"));
  }
};

ParserState.prototype.parseAndExpression = function (instr) {
  this.parseComparison(instr);

  while (this.accept(_token.TOP, "and")) {
    var trueBranch = [];
    this.parseComparison(trueBranch);
    instr.push(new _instruction.Instruction(_instruction.IEXPR, trueBranch));
    instr.push((0, _instruction.binaryInstruction)("and"));
  }
};

var COMPARISON_OPERATORS = ["==", "!=", "<", "<=", ">=", ">", "in"];

ParserState.prototype.parseComparison = function (instr) {
  this.parseAddSub(instr);

  while (this.accept(_token.TOP, COMPARISON_OPERATORS)) {
    var op = this.current;
    this.parseAddSub(instr);
    instr.push((0, _instruction.binaryInstruction)(op.value));
  }
};

var ADD_SUB_OPERATORS = ["+", "-", "||"];

ParserState.prototype.parseAddSub = function (instr) {
  this.parseTerm(instr);

  while (this.accept(_token.TOP, ADD_SUB_OPERATORS)) {
    var op = this.current;
    this.parseTerm(instr);
    instr.push((0, _instruction.binaryInstruction)(op.value));
  }
};

var TERM_OPERATORS = ["*", "/", "%"];

ParserState.prototype.parseTerm = function (instr) {
  this.parseFactor(instr);

  while (this.accept(_token.TOP, TERM_OPERATORS)) {
    var op = this.current;
    this.parseFactor(instr);
    instr.push((0, _instruction.binaryInstruction)(op.value));
  }
};

ParserState.prototype.parseFactor = function (instr) {
  var unaryOps = this.tokens.unaryOps;

  function isPrefixOperator(token) {
    return token.value in unaryOps;
  }

  this.save();

  if (this.accept(_token.TOP, isPrefixOperator)) {
    if (this.current.value !== "-" && this.current.value !== "+") {
      if (this.nextToken.type === _token.TPAREN && this.nextToken.value === "(") {
        this.restore();
        this.parseExponential(instr);
        return;
      } else if (this.nextToken.type === _token.TSEMICOLON || this.nextToken.type === _token.TCOMMA || this.nextToken.type === _token.TEOF || this.nextToken.type === _token.TPAREN && this.nextToken.value === ")") {
        this.restore();
        this.parseAtom(instr);
        return;
      }
    }

    var op = this.current;
    this.parseFactor(instr);
    instr.push((0, _instruction.unaryInstruction)(op.value));
  } else {
    this.parseExponential(instr);
  }
};

ParserState.prototype.parseExponential = function (instr) {
  this.parsePostfixExpression(instr);

  while (this.accept(_token.TOP, "^")) {
    this.parseFactor(instr);
    instr.push((0, _instruction.binaryInstruction)("^"));
  }
};

ParserState.prototype.parsePostfixExpression = function (instr) {
  this.parseFunctionCall(instr);

  while (this.accept(_token.TOP, "!")) {
    instr.push((0, _instruction.unaryInstruction)("!"));
  }
};

ParserState.prototype.parseFunctionCall = function (instr) {
  var unaryOps = this.tokens.unaryOps;

  function isPrefixOperator(token) {
    return token.value in unaryOps;
  }

  if (this.accept(_token.TOP, isPrefixOperator)) {
    var op = this.current;
    this.parseAtom(instr);
    instr.push((0, _instruction.unaryInstruction)(op.value));
  } else {
    this.parseMemberExpression(instr);

    while (this.accept(_token.TPAREN, "(")) {
      if (this.accept(_token.TPAREN, ")")) {
        instr.push(new _instruction.Instruction(_instruction.IFUNCALL, 0));
      } else {
        var argCount = this.parseArgumentList(instr);
        instr.push(new _instruction.Instruction(_instruction.IFUNCALL, argCount));
      }
    }
  }
};

ParserState.prototype.parseArgumentList = function (instr) {
  var argCount = 0;

  while (!this.accept(_token.TPAREN, ")")) {
    this.parseExpression(instr);
    ++argCount;

    while (this.accept(_token.TCOMMA)) {
      this.parseExpression(instr);
      ++argCount;
    }
  }

  return argCount;
};

ParserState.prototype.parseMemberExpression = function (instr) {
  this.parseAtom(instr);

  while (this.accept(_token.TOP, ".") || this.accept(_token.TBRACKET, "[")) {
    var op = this.current;

    if (op.value === ".") {
      if (!this.allowMemberAccess) {
        throw new Error('unexpected ".", member access is not permitted');
      }

      this.expect(_token.TNAME);
      instr.push(new _instruction.Instruction(_instruction.IMEMBER, this.current.value));
    } else if (op.value === "[") {
      if (!this.tokens.isOperatorEnabled("[")) {
        throw new Error('unexpected "[]", arrays are disabled');
      }

      this.parseExpression(instr);
      this.expect(_token.TBRACKET, "]");
      instr.push((0, _instruction.binaryInstruction)("["));
    } else {
      throw new Error("unexpected symbol: " + op.value);
    }
  }
};