"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _PCSimulator = require("./PCSimulator");
Object.keys(_PCSimulator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _PCSimulator[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _PCSimulator[key];
    }
  });
});
var _MobileSimulator = require("./MobileSimulator");
Object.keys(_MobileSimulator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MobileSimulator[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _MobileSimulator[key];
    }
  });
});
var _ResponsiveSimulator = require("./ResponsiveSimulator");
Object.keys(_ResponsiveSimulator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ResponsiveSimulator[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ResponsiveSimulator[key];
    }
  });
});