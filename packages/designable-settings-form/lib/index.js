"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
require("./locales");
var _registry = require("./registry");
Object.keys(_registry).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _registry[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _registry[key];
    }
  });
});
var _components = require("./components");
Object.keys(_components).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _components[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _components[key];
    }
  });
});
var _SchemaField = require("./SchemaField");
Object.keys(_SchemaField).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SchemaField[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _SchemaField[key];
    }
  });
});
var _SettingsForm = require("./SettingsForm");
Object.keys(_SettingsForm).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SettingsForm[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _SettingsForm[key];
    }
  });
});