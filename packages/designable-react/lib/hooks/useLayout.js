"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLayout = void 0;
var _react = require("react");
var _context = require("../context");
var _shared = require("@designable/shared");
const useLayout = () => {
  const contextLayout = (0, _react.useContext)(_context.DesignerLayoutContext);
  return _shared.globalThisPolyfill['__DESIGNABLE_LAYOUT__'] || contextLayout;
};
exports.useLayout = useLayout;