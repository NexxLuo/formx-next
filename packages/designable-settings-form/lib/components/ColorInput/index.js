"use strict";

var __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = void 0 && (void 0).__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = void 0 && (void 0).__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorInput = void 0;

var react_1 = __importStar(require("react"));

var antd_1 = require("antd");

var designable_react_1 = require("@platform/designable-react");

var react_color_1 = require("react-color");

require("./styles.less");

var ColorInput = function ColorInput(props) {
  var container = (0, react_1.useRef)();
  var prefix = (0, designable_react_1.usePrefix)('color-input');
  var color = props.value;
  return react_1.default.createElement("div", {
    ref: container,
    className: prefix
  }, react_1.default.createElement(antd_1.Input, {
    value: props.value,
    onChange: function onChange(e) {
      var _a;

      (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, e.target.value);
    },
    placeholder: "Color",
    prefix: react_1.default.createElement(antd_1.Popover, {
      autoAdjustOverflow: true,
      trigger: "click",
      getPopupContainer: function getPopupContainer() {
        return container.current;
      },
      content: react_1.default.createElement(react_color_1.SketchPicker, {
        color: color,
        onChange: function onChange(_a) {
          var _b;

          var rgb = _a.rgb;
          (_b = props.onChange) === null || _b === void 0 ? void 0 : _b.call(props, "rgba(".concat(rgb.r, ",").concat(rgb.g, ",").concat(rgb.b, ",").concat(rgb.a, ")"));
        }
      })
    }, react_1.default.createElement("div", {
      className: prefix + '-color-tips',
      style: {
        backgroundColor: color
      }
    }))
  }));
};

exports.ColorInput = ColorInput;