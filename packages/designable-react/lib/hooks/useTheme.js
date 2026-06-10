"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTheme = void 0;
var _useLayout = require("./useLayout");
const useTheme = () => {
  return (0, _useLayout.useLayout)()?.theme;
};
exports.useTheme = useTheme;