"use strict";

var _core = require("@designable/core");
var _zhCN = _interopRequireDefault(require("./zh-CN"));
var _enUS = _interopRequireDefault(require("./en-US"));
var _koKR = _interopRequireDefault(require("./ko-KR"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_core.GlobalRegistry.registerDesignerLocales(_zhCN.default, _enUS.default, _koKR.default);