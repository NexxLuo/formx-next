"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRegistry = void 0;
var _core = require("@designable/core");
var _shared = require("@designable/shared");
const useRegistry = () => {
  return _shared.globalThisPolyfill['__DESIGNER_REGISTRY__'] || _core.GlobalRegistry;
};
exports.useRegistry = useRegistry;