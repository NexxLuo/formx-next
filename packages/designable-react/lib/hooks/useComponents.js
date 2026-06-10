"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useComponents = void 0;
var _react = require("react");
var _context = require("../context");
const useComponents = () => (0, _react.useContext)(_context.DesignerComponentsContext);
exports.useComponents = useComponents;