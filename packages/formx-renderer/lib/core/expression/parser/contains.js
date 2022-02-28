"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = contains;

function contains(array, obj) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === obj) {
      return true;
    }
  }

  return false;
}