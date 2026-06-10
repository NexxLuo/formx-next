"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
require("./locales");
require("./theme.less");
var _panels = require("./panels");
Object.keys(_panels).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _panels[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _panels[key];
    }
  });
});
var _widgets = require("./widgets");
Object.keys(_widgets).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _widgets[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _widgets[key];
    }
  });
});
var _context = require("./context");
Object.keys(_context).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _context[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _context[key];
    }
  });
});
var _hooks = require("./hooks");
Object.keys(_hooks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _hooks[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hooks[key];
    }
  });
});
var _containers = require("./containers");
Object.keys(_containers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _containers[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _containers[key];
    }
  });
});
var _simulators = require("./simulators");
Object.keys(_simulators).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _simulators[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _simulators[key];
    }
  });
});
var _types = require("./types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});