"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IVARNAME = exports.IVAR = exports.IOP3 = exports.IOP2 = exports.IOP1 = exports.INUMBER = exports.IMEMBER = exports.IFUNDEF = exports.IFUNCALL = exports.IEXPREVAL = exports.IEXPR = exports.IENDSTATEMENT = exports.IARRAY = void 0;
exports.Instruction = Instruction;
exports.binaryInstruction = binaryInstruction;
exports.ternaryInstruction = ternaryInstruction;
exports.unaryInstruction = unaryInstruction;
var INUMBER = 'INUMBER';
exports.INUMBER = INUMBER;
var IOP1 = 'IOP1';
exports.IOP1 = IOP1;
var IOP2 = 'IOP2';
exports.IOP2 = IOP2;
var IOP3 = 'IOP3';
exports.IOP3 = IOP3;
var IVAR = 'IVAR';
exports.IVAR = IVAR;
var IVARNAME = 'IVARNAME';
exports.IVARNAME = IVARNAME;
var IFUNCALL = 'IFUNCALL';
exports.IFUNCALL = IFUNCALL;
var IFUNDEF = 'IFUNDEF';
exports.IFUNDEF = IFUNDEF;
var IEXPR = 'IEXPR';
exports.IEXPR = IEXPR;
var IEXPREVAL = 'IEXPREVAL';
exports.IEXPREVAL = IEXPREVAL;
var IMEMBER = 'IMEMBER';
exports.IMEMBER = IMEMBER;
var IENDSTATEMENT = 'IENDSTATEMENT';
exports.IENDSTATEMENT = IENDSTATEMENT;
var IARRAY = 'IARRAY';
exports.IARRAY = IARRAY;

function Instruction(type, value) {
  this.type = type;
  this.value = value !== undefined && value !== null ? value : 0;
}

Instruction.prototype.toString = function () {
  switch (this.type) {
    case INUMBER:
    case IOP1:
    case IOP2:
    case IOP3:
    case IVAR:
    case IVARNAME:
    case IENDSTATEMENT:
      return this.value;

    case IFUNCALL:
      return 'CALL ' + this.value;

    case IFUNDEF:
      return 'DEF ' + this.value;

    case IARRAY:
      return 'ARRAY ' + this.value;

    case IMEMBER:
      return '.' + this.value;

    default:
      return 'Invalid Instruction';
  }
};

function unaryInstruction(value) {
  return new Instruction(IOP1, value);
}

function binaryInstruction(value) {
  return new Instruction(IOP2, value);
}

function ternaryInstruction(value) {
  return new Instruction(IOP3, value);
}