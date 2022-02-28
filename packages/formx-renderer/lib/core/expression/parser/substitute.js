"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = substitute;

var _instruction = require("./instruction");

function substitute(tokens, variable, expr) {
  var newexpression = [];

  for (var i = 0; i < tokens.length; i++) {
    var item = tokens[i];
    var type = item.type;

    if (type === _instruction.IVAR && item.value === variable) {
      for (var j = 0; j < expr.tokens.length; j++) {
        var expritem = expr.tokens[j];
        var replitem;

        if (expritem.type === _instruction.IOP1) {
          replitem = (0, _instruction.unaryInstruction)(expritem.value);
        } else if (expritem.type === _instruction.IOP2) {
          replitem = (0, _instruction.binaryInstruction)(expritem.value);
        } else if (expritem.type === _instruction.IOP3) {
          replitem = (0, _instruction.ternaryInstruction)(expritem.value);
        } else {
          replitem = new _instruction.Instruction(expritem.type, expritem.value);
        }

        newexpression.push(replitem);
      }
    } else if (type === _instruction.IEXPR) {
      newexpression.push(new _instruction.Instruction(_instruction.IEXPR, substitute(item.value, variable, expr)));
    } else {
      newexpression.push(item);
    }
  }

  return newexpression;
}