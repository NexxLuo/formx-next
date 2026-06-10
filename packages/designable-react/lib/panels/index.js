"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
require("./styles.less");
var _StudioPanel = require("./StudioPanel");
Object.keys(_StudioPanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _StudioPanel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _StudioPanel[key];
    }
  });
});
var _CompositePanel = require("./CompositePanel");
Object.keys(_CompositePanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CompositePanel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _CompositePanel[key];
    }
  });
});
var _SettingsPanel = require("./SettingsPanel");
Object.keys(_SettingsPanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SettingsPanel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _SettingsPanel[key];
    }
  });
});
var _WorkspacePanel = require("./WorkspacePanel");
Object.keys(_WorkspacePanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _WorkspacePanel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _WorkspacePanel[key];
    }
  });
});
var _ToolbarPanel = require("./ToolbarPanel");
Object.keys(_ToolbarPanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ToolbarPanel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ToolbarPanel[key];
    }
  });
});
var _ViewportPanel = require("./ViewportPanel");
Object.keys(_ViewportPanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ViewportPanel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ViewportPanel[key];
    }
  });
});
var _ViewPanel = require("./ViewPanel");
Object.keys(_ViewPanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ViewPanel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ViewPanel[key];
    }
  });
});