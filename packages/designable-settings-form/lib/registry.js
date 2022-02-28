"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNpmCDNRegistry = exports.setNpmCDNRegistry = void 0;

var loader_1 = __importDefault(require("@monaco-editor/loader"));

var Registry = {
  cdn: '//cdn.jsdelivr.net/npm'
};

var setNpmCDNRegistry = function setNpmCDNRegistry(registry) {
  Registry.cdn = registry;
  loader_1.default.config({
    paths: {
      vs: "".concat(registry, "/monaco-editor@0.30.1/min/vs")
    }
  });
};

exports.setNpmCDNRegistry = setNpmCDNRegistry;

var getNpmCDNRegistry = function getNpmCDNRegistry() {
  return String(Registry.cdn).replace(/\/$/, '');
};

exports.getNpmCDNRegistry = getNpmCDNRegistry;