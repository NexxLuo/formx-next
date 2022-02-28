"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = simplify;

var _instruction = require("./instruction");

function simplify(tokens, unaryOps, binaryOps, ternaryOps, values) {
  var nstack = [];
  var newexpression = [];
  var n1, n2, n3;
  var f;

  for (var i = 0; i < tokens.length; i++) {
    var item = tokens[i];
    var type = item.type;

    if (type === _instruction.INUMBER || type === _instruction.IVARNAME) {
      if (Array.isArray(item.value)) {
        nstack.push.apply(nstack, simplify(item.value.map(function (x) {
          return new _instruction.Instruction(_instruction.INUMBER, x);
        }).concat(new _instruction.Instruction(_instruction.IARRAY, item.value.length)), unaryOps, binaryOps, ternaryOps, values));
      } else {
        nstack.push(item);
      }
    } else if (type === _instruction.IVAR && values.hasOwnProperty(item.value)) {
      item = new _instruction.Instruction(_instruction.INUMBER, values[item.value]);
      nstack.push(item);
    } else if (type === _instruction.IOP2 && nstack.length > 1) {
      n2 = nstack.pop();
      n1 = nstack.pop();
      f = binaryOps[item.value];
      item = new _instruction.Instruction(_instruction.INUMBER, f(n1.value, n2.value));
      nstack.push(item);
    } else if (type === _instruction.IOP3 && nstack.length > 2) {
      n3 = nstack.pop();
      n2 = nstack.pop();
      n1 = nstack.pop();

      if (item.value === '?') {
        nstack.push(n1.value ? n2.value : n3.value);
      } else {
        f = ternaryOps[item.value];
        item = new _instruction.Instruction(_instruction.INUMBER, f(n1.value, n2.value, n3.value));
        nstack.push(item);
      }
    } else if (type === _instruction.IOP1 && nstack.length > 0) {
      n1 = nstack.pop();
      f = unaryOps[item.value];
      item = new _instruction.Instruction(_instruction.INUMBER, f(n1.value));
      nstack.push(item);
    } else if (type === _instruction.IEXPR) {
      while (nstack.length > 0) {
        newexpression.push(nstack.shift());
      }

      newexpression.push(new _instruction.Instruction(_instruction.IEXPR, simplify(item.value, unaryOps, binaryOps, ternaryOps, values)));
    } else if (type === _instruction.IMEMBER && nstack.length > 0) {
      n1 = nstack.pop();
      nstack.push(new _instruction.Instruction(_instruction.INUMBER, n1.value[item.value]));
    }
    /* else if (type === IARRAY && nstack.length >= item.value) {
    var length = item.value;
    while (length-- > 0) {
      newexpression.push(nstack.pop());
    }
    newexpression.push(new Instruction(IARRAY, item.value));
    } */
    else {
      while (nstack.length > 0) {
        newexpression.push(nstack.shift());
      }

      newexpression.push(item);
    }
  }

  while (nstack.length > 0) {
    newexpression.push(nstack.shift());
  }

  return newexpression;
}