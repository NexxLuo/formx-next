"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useScreen = void 0;
var _useDesigner = require("./useDesigner");
const useScreen = () => {
  return (0, _useDesigner.useDesigner)().screen;
};
exports.useScreen = useScreen;