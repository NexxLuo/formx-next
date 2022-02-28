"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FormContext", {
  enumerable: true,
  get: function get() {
    return _index.FormContext;
  }
});
Object.defineProperty(exports, "FormPath", {
  enumerable: true,
  get: function get() {
    return _shared.FormPath;
  }
});
Object.defineProperty(exports, "FormRender", {
  enumerable: true,
  get: function get() {
    return _index.default;
  }
});
Object.defineProperty(exports, "Schema", {
  enumerable: true,
  get: function get() {
    return _react.Schema;
  }
});
exports.registry = exports.default = void 0;

var _index = _interopRequireWildcard(require("./render/index"));

var registry = _interopRequireWildcard(require("./core/registry"));

exports.registry = registry;

var _react = require("@formily/react");

var _shared = require("@formily/shared");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = _index.default;
exports.default = _default;