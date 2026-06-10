"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setNpmCDNRegistry = exports.getNpmCDNRegistry = void 0;
var _loader = _interopRequireDefault(require("@monaco-editor/loader"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Registry = {
  cdn: '//cdn.jsdelivr.net/npm'
};
const setNpmCDNRegistry = registry => {
  Registry.cdn = registry;
  _loader.default.config({
    paths: {
      vs: `${registry}/monaco-editor@0.30.1/min/vs`
    }
  });
};
exports.setNpmCDNRegistry = setNpmCDNRegistry;
const getNpmCDNRegistry = () => String(Registry.cdn).replace(/\/$/, '');
exports.getNpmCDNRegistry = getNpmCDNRegistry;