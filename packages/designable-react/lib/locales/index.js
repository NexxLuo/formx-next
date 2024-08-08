"use strict";

var _core = require("@designable/core");
var _icons = _interopRequireDefault(require("./icons"));
var _panels = _interopRequireDefault(require("./panels"));
var _global = _interopRequireDefault(require("./global"));
var _operations = _interopRequireDefault(require("./operations"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_core.GlobalRegistry.registerDesignerLocales(_icons.default, _panels.default, _global.default, _operations.default);