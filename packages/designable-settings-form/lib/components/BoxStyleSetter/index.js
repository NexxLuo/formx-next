"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoxStyleSetter = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@formily/react");
var _designableReact = require("@platform/designable-react");
var _FoldItem = require("../FoldItem");
var _SizeInput = require("../SizeInput");
var _InputItems = require("../InputItems");
var _classnames = _interopRequireDefault(require("classnames"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const PositionMap = {
  top: 1,
  right: 2,
  bottom: 3,
  left: 4,
  all: 1
};
const BoxRex = /([\d\.]+[^\d\s\.+-]+)(?:\s+([\d\.]+[^\d\s\.+-]+)(?:\s+([\d\.]+[^\d\s\.+-]+)(?:\s+([\d\.]+[^\d\s\.+-]+))?)?)?/;
const BoxStyleSetter = exports.BoxStyleSetter = (0, _react2.observer)(props => {
  const field = (0, _react2.useField)();
  const prefix = (0, _designableReact.usePrefix)('box-style-setter');
  const createPositionHandler = (position, props) => {
    const matched = String(props.value).match(BoxRex) || [];
    const value = matched[PositionMap[position]];
    const v1 = matched[1];
    const v2 = matched[2];
    const v3 = matched[3];
    const v4 = matched[4];
    const allEqualls = v1 === v2 && v2 === v3 && v3 === v4;
    return {
      ...props,
      value: position === 'all' ? allEqualls ? v1 : undefined : value,
      onChange(value) {
        if (position === 'all') {
          props.onChange?.(`${value || '0px'} ${value || '0px'} ${value || '0px'} ${value || '0px'}`);
        } else {
          matched[PositionMap[position]] = value;
          props.onChange?.(`${matched[1] || '0px'} ${matched[2] || '0px'} ${matched[3] || '0px'} ${matched[4] || '0px'}`);
        }
      }
    };
  };
  return /*#__PURE__*/_react.default.createElement(_FoldItem.FoldItem, {
    className: (0, _classnames.default)(prefix, props.className),
    label: field.title
  }, /*#__PURE__*/_react.default.createElement(_FoldItem.FoldItem.Base, null, /*#__PURE__*/_react.default.createElement(_SizeInput.SizeInput, _extends({}, createPositionHandler('all', props), {
    exclude: ['inherit', 'auto']
  }))), /*#__PURE__*/_react.default.createElement(_FoldItem.FoldItem.Extra, null, /*#__PURE__*/_react.default.createElement(_InputItems.InputItems, {
    width: "50%"
  }, /*#__PURE__*/_react.default.createElement(_InputItems.InputItems.Item, {
    icon: props.labels[0]
  }, /*#__PURE__*/_react.default.createElement(_SizeInput.SizeInput, _extends({}, createPositionHandler('top', props), {
    exclude: ['inherit', 'auto']
  }))), /*#__PURE__*/_react.default.createElement(_InputItems.InputItems.Item, {
    icon: props.labels[1]
  }, /*#__PURE__*/_react.default.createElement(_SizeInput.SizeInput, _extends({}, createPositionHandler('right', props), {
    exclude: ['inherit', 'auto']
  }))), /*#__PURE__*/_react.default.createElement(_InputItems.InputItems.Item, {
    icon: props.labels[2]
  }, /*#__PURE__*/_react.default.createElement(_SizeInput.SizeInput, _extends({}, createPositionHandler('bottom', props), {
    exclude: ['inherit', 'auto']
  }))), /*#__PURE__*/_react.default.createElement(_InputItems.InputItems.Item, {
    icon: props.labels[3]
  }, /*#__PURE__*/_react.default.createElement(_SizeInput.SizeInput, _extends({}, createPositionHandler('left', props), {
    exclude: ['inherit', 'auto']
  }))))));
});
BoxStyleSetter.defaultProps = {
  labels: [/*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
    infer: "Top",
    size: 16,
    key: "1"
  }), /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
    infer: "Right",
    size: 16,
    key: "2"
  }), /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
    infer: "Bottom",
    size: 16,
    key: "3"
  }), /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
    infer: "Left",
    size: 16,
    key: "4"
  })]
};