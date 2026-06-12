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
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-nocheck

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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_FoldItem.FoldItem, {
    className: (0, _classnames.default)(prefix, props.className),
    label: field.title,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_FoldItem.FoldItem.Base, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SizeInput.SizeInput, {
        ...createPositionHandler('all', props),
        exclude: ['inherit', 'auto']
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FoldItem.FoldItem.Extra, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_InputItems.InputItems, {
        width: "50%",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_InputItems.InputItems.Item, {
          icon: props.labels[0],
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SizeInput.SizeInput, {
            ...createPositionHandler('top', props),
            exclude: ['inherit', 'auto']
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputItems.InputItems.Item, {
          icon: props.labels[1],
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SizeInput.SizeInput, {
            ...createPositionHandler('right', props),
            exclude: ['inherit', 'auto']
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputItems.InputItems.Item, {
          icon: props.labels[2],
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SizeInput.SizeInput, {
            ...createPositionHandler('bottom', props),
            exclude: ['inherit', 'auto']
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputItems.InputItems.Item, {
          icon: props.labels[3],
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SizeInput.SizeInput, {
            ...createPositionHandler('left', props),
            exclude: ['inherit', 'auto']
          })
        })]
      })
    })]
  });
});
BoxStyleSetter.defaultProps = {
  labels: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designableReact.IconWidget, {
    infer: "Top",
    size: 16
  }, "1"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designableReact.IconWidget, {
    infer: "Right",
    size: 16
  }, "2"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designableReact.IconWidget, {
    infer: "Bottom",
    size: 16
  }, "3"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designableReact.IconWidget, {
    infer: "Left",
    size: 16
  }, "4")]
};