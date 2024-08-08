"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BorderStyleSetter = void 0;
var _react = _interopRequireWildcard(require("react"));
var _designableReact = require("@platform/designable-react");
var _shared = require("@formily/shared");
var _formxAntd = require("@platform/formx-antd");
var _reactive = require("@formily/reactive");
var _react2 = require("@formily/react");
var _FoldItem = require("../FoldItem");
var _ColorInput = require("../ColorInput");
var _SizeInput = require("../SizeInput");
var _PositionInput = require("../PositionInput");
var _classnames = _interopRequireDefault(require("classnames"));
require("./styles.less");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Positions = ['center', 'top', 'right', 'bottom', 'left'];
const BorderStyleOptions = [{
  label: 'None',
  value: 'none'
}, {
  label: /*#__PURE__*/_react.default.createElement("span", {
    className: "border-style-solid-line"
  }),
  value: 'solid'
}, {
  label: /*#__PURE__*/_react.default.createElement("span", {
    className: "border-style-dashed-line"
  }),
  value: 'dashed'
}, {
  label: /*#__PURE__*/_react.default.createElement("span", {
    className: "border-style-dotted-line"
  }),
  value: 'dotted'
}];
const createBorderProp = (position, key) => {
  const insert = position === 'center' ? '' : `-${position}`;
  return (0, _shared.camelCase)(`border${insert}-${key}`);
};
const parseInitPosition = field => {
  const basePath = field.address.parent();
  for (let i = 0; i < Positions.length; i++) {
    const position = Positions[i];
    const stylePath = `${basePath}.${createBorderProp(position, 'style')}`;
    const widthPath = `${basePath}.${createBorderProp(position, 'width')}`;
    const colorPath = `${basePath}.${createBorderProp(position, 'color')}`;
    if (field.query(stylePath).value() || field.query(widthPath).value() || field.query(colorPath).value()) {
      return position;
    }
  }
  return 'center';
};
const BorderStyleSetter = exports.BorderStyleSetter = (0, _react2.observer)(({
  className,
  style
}) => {
  const field = (0, _react2.useField)();
  const currentPosition = (0, _react.useMemo)(() => (0, _reactive.observable)({
    value: parseInitPosition(field)
  }), [field.value]);
  const prefix = (0, _designableReact.usePrefix)('border-style-setter');
  const createReaction = position => field => {
    field.display = currentPosition.value === position ? 'visible' : 'hidden';
    if (position !== 'center') {
      const borderStyle = field.query('.borderStyle').value();
      const borderWidth = field.query('.borderWidth').value();
      const borderColor = field.query('.borderColor').value();
      if (borderStyle || borderWidth || borderColor) {
        field.value = undefined;
      }
    }
  };
  return /*#__PURE__*/_react.default.createElement(_FoldItem.FoldItem, {
    label: field.title
  }, /*#__PURE__*/_react.default.createElement(_FoldItem.FoldItem.Extra, null, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(prefix, className),
    style: style
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-position'
  }, /*#__PURE__*/_react.default.createElement(_PositionInput.PositionInput, {
    value: currentPosition.value,
    onChange: value => {
      currentPosition.value = value;
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-input'
  }, Positions.map((position, key) => {
    return /*#__PURE__*/_react.default.createElement(_react.Fragment, {
      key: key
    }, /*#__PURE__*/_react.default.createElement(_react2.Field, {
      name: createBorderProp(position, 'style'),
      basePath: field.address.parent(),
      dataSource: BorderStyleOptions,
      reactions: createReaction(position),
      component: [_formxAntd.Select, {
        placeholder: 'Please Select'
      }]
    }), /*#__PURE__*/_react.default.createElement(_react2.Field, {
      name: createBorderProp(position, 'width'),
      basePath: field.address.parent(),
      reactions: createReaction(position),
      component: [_SizeInput.SizeInput, {
        exclude: ['auto']
      }]
    }), /*#__PURE__*/_react.default.createElement(_react2.Field, {
      name: createBorderProp(position, 'color'),
      basePath: field.address.parent(),
      reactions: createReaction(position),
      component: [_ColorInput.ColorInput]
    }));
  })))));
});