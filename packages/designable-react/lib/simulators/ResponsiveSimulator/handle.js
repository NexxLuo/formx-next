"use strict";

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResizeHandle = exports.ResizeHandleType = void 0;

var react_1 = __importDefault(require("react"));

var hooks_1 = require("../../hooks");

var classnames_1 = __importDefault(require("classnames"));

var ResizeHandleType;

(function (ResizeHandleType) {
  ResizeHandleType["Resize"] = "RESIZE";
  ResizeHandleType["ResizeWidth"] = "RESIZE_WIDTH";
  ResizeHandleType["ResizeHeight"] = "RESIZE_HEIGHT";
})(ResizeHandleType = exports.ResizeHandleType || (exports.ResizeHandleType = {}));

var ResizeHandle = function ResizeHandle(props) {
  var _a;

  var prefix = (0, hooks_1.usePrefix)('resize-handle');
  return react_1.default.createElement("div", __assign({}, props, {
    "data-designer-resize-handle": props.type,
    className: (0, classnames_1.default)(prefix, (_a = {}, _a["".concat(prefix, "-").concat(props.type)] = !!props.type, _a))
  }), props.children);
};

exports.ResizeHandle = ResizeHandle;