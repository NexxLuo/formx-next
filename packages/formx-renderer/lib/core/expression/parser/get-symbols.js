"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getSymbols;

var _instruction = require("./instruction");

var _contains = _interopRequireDefault(require("./contains"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSymbols(tokens, symbols, options) {
  options = options || {};
  var withMembers = !!options.withMembers;
  var prevVar = null;

  for (var i = 0; i < tokens.length; i++) {
    var item = tokens[i];

    if (item.type === _instruction.IVAR || item.type === _instruction.IVARNAME) {
      if (!withMembers && !(0, _contains.default)(symbols, item.value)) {
        symbols.push(item.value);
      } else if (prevVar !== null) {
        if (!(0, _contains.default)(symbols, prevVar)) {
          symbols.push(prevVar);
        }

        prevVar = item.value;
      } else {
        prevVar = item.value;
      }
    } else if (item.type === _instruction.IMEMBER && withMembers && prevVar !== null) {
      prevVar += '.' + item.value;
    } else if (item.type === _instruction.IEXPR) {
      getSymbols(item.value, symbols, options);
    } else if (prevVar !== null) {
      if (!(0, _contains.default)(symbols, prevVar)) {
        symbols.push(prevVar);
      }

      prevVar = null;
    }
  }

  if (prevVar !== null && !(0, _contains.default)(symbols, prevVar)) {
    symbols.push(prevVar);
  }
}