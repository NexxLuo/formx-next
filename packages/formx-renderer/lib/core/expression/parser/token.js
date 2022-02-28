"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TSTRING = exports.TSEMICOLON = exports.TPAREN = exports.TOP = exports.TNUMBER = exports.TNAME = exports.TEOF = exports.TCOMMA = exports.TBRACKET = void 0;
exports.Token = Token;
var TEOF = 'TEOF';
exports.TEOF = TEOF;
var TOP = 'TOP';
exports.TOP = TOP;
var TNUMBER = 'TNUMBER';
exports.TNUMBER = TNUMBER;
var TSTRING = 'TSTRING';
exports.TSTRING = TSTRING;
var TPAREN = 'TPAREN';
exports.TPAREN = TPAREN;
var TBRACKET = 'TBRACKET';
exports.TBRACKET = TBRACKET;
var TCOMMA = 'TCOMMA';
exports.TCOMMA = TCOMMA;
var TNAME = 'TNAME';
exports.TNAME = TNAME;
var TSEMICOLON = 'TSEMICOLON';
exports.TSEMICOLON = TSEMICOLON;

function Token(type, value, index) {
  this.type = type;
  this.value = value;
  this.index = index;
}

Token.prototype.toString = function () {
  return this.type + ': ' + this.value;
};