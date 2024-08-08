"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePosition = void 0;
var _useLayout = require("./useLayout");
const usePosition = () => {
  return (0, _useLayout.useLayout)()?.position;
};
exports.usePosition = usePosition;