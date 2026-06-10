"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _useLocales = require("./useLocales");
Object.keys(_useLocales).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useLocales[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useLocales[key];
    }
  });
});
var _useSnapshot = require("./useSnapshot");
Object.keys(_useSnapshot).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useSnapshot[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useSnapshot[key];
    }
  });
});