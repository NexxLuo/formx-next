"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCursor = void 0;
var _useDesigner = require("./useDesigner");
const useCursor = () => {
  const designer = (0, _useDesigner.useDesigner)();
  return designer.cursor;
};
exports.useCursor = useCursor;