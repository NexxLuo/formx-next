"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSnapshot = void 0;
var _core = require("@formily/core");
let timeRequest = null;
const useSnapshot = operation => {
  (0, _core.onFieldInputValueChange)('*', () => {
    clearTimeout(timeRequest);
    timeRequest = setTimeout(() => {
      operation.snapshot('update:node:props');
    }, 1000);
  });
};
exports.useSnapshot = useSnapshot;