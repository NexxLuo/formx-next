"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
require("./styles.less");
var _Layout = require("./Layout");
Object.keys(_Layout).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Layout[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Layout[key];
    }
  });
});
var _Designer = require("./Designer");
Object.keys(_Designer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Designer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Designer[key];
    }
  });
});
var _Workspace = require("./Workspace");
Object.keys(_Workspace).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Workspace[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Workspace[key];
    }
  });
});
var _Simulator = require("./Simulator");
Object.keys(_Simulator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Simulator[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Simulator[key];
    }
  });
});
var _Viewport = require("./Viewport");
Object.keys(_Viewport).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Viewport[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Viewport[key];
    }
  });
});
var _Workbench = require("./Workbench");
Object.keys(_Workbench).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Workbench[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Workbench[key];
    }
  });
});