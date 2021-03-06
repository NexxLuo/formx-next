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

var __read = void 0 && (void 0).__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CornerInput = void 0;

var react_1 = __importStar(require("react"));

var designable_react_1 = require("@platform/designable-react");

var classnames_1 = __importDefault(require("classnames"));

require("./styles.less");

var CornerInput = function CornerInput(props) {
  var prefix = (0, designable_react_1.usePrefix)('corner-input');

  var _a = __read((0, react_1.useState)(props.value), 2),
      current = _a[0],
      setCurrent = _a[1];

  (0, react_1.useEffect)(function () {
    if (!props.value) {
      setCurrent('all');
    }
  }, [props.value]);

  var createCellProps = function createCellProps(type) {
    return {
      className: (0, classnames_1.default)(prefix + '-cell', {
        active: current === type
      }),
      onClick: function onClick() {
        var _a;

        setCurrent(type);
        (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, type);
      }
    };
  };

  return react_1.default.createElement("div", {
    className: (0, classnames_1.default)(prefix, props.className),
    style: props.style
  }, react_1.default.createElement("div", {
    className: prefix + '-column'
  }, react_1.default.createElement("div", __assign({}, createCellProps('topLeft')), "\u250F"), react_1.default.createElement("div", __assign({}, createCellProps('bottomLeft')), "\u2517")), react_1.default.createElement("div", {
    className: prefix + '-column'
  }, react_1.default.createElement("div", __assign({}, createCellProps('all')), "\u254B")), react_1.default.createElement("div", {
    className: prefix + '-column'
  }, react_1.default.createElement("div", __assign({}, createCellProps('topRight')), "\u2513"), react_1.default.createElement("div", __assign({}, createCellProps('bottomRight')), "\u251B")));
};

exports.CornerInput = CornerInput;