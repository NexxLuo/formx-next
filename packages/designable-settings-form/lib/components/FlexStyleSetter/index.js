"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlexStyleSetter = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@formily/react");
var _formxAntd = require("@platform/formx-antd");
var _designableReact = require("@platform/designable-react");
var _InputItems = require("../InputItems");
var _classnames = _interopRequireDefault(require("classnames"));
require("./styles.less");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const FlexStyleSetter = exports.FlexStyleSetter = (0, _react2.observer)(props => {
  const field = (0, _react2.useField)();
  const prefix = (0, _designableReact.usePrefix)('flex-style-setter');
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(prefix, props.className),
    style: props.style
  }, /*#__PURE__*/_react.default.createElement(_InputItems.InputItems, {
    vertical: true
  }, /*#__PURE__*/_react.default.createElement(_react2.Field, {
    name: "flexDirection",
    basePath: field.address.parent(),
    dataSource: [{
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "FlexDirectionRow"
      }),
      value: 'row'
    }, {
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "FlexDirectionColumn"
      }),
      value: 'column'
    }],
    reactions: field => {
      field.decorator[1].title = `Flex Direction : ${field.value || ''}`;
    },
    decorator: [_InputItems.InputItems.Item],
    component: [_formxAntd.Radio.Group, {
      optionType: 'button'
    }]
  }), /*#__PURE__*/_react.default.createElement(_react2.Field, {
    name: "flexWrap",
    basePath: field.address.parent(),
    dataSource: [{
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "FlexNoWrap"
      }),
      value: 'nowrap'
    }, {
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "FlexWrap"
      }),
      value: 'wrap'
    }],
    reactions: field => {
      field.decorator[1].title = `Flex Wrap : ${field.value || ''}`;
    },
    decorator: [_InputItems.InputItems.Item],
    component: [_formxAntd.Radio.Group, {
      optionType: 'button'
    }]
  }), /*#__PURE__*/_react.default.createElement(_react2.Field, {
    name: "alignContent",
    basePath: field.address.parent(),
    dataSource: [{
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "FlexAlignContentCenter"
      }),
      value: 'center'
    }, {
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "FlexAlignContentStart"
      }),
      value: 'flex-start'
    }, {
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "FlexAlignContentEnd"
      }),
      value: 'flex-end'
    }, {
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "FlexAlignContentSpaceAround"
      }),
      value: 'space-around'
    }, {
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "FlexAlignContentSpaceBetween"
      }),
      value: 'space-between'
    }, {
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "FlexAlignContentStretch"
      }),
      value: 'stretch'
    }],
    reactions: field => {
      field.decorator[1].title = `Align Content : ${field.value || ''}`;
    },
    decorator: [_InputItems.InputItems.Item],
    component: [_formxAntd.Radio.Group, {
      optionType: 'button'
    }]
  }), /*#__PURE__*/_react.default.createElement(_react2.Field, {
    name: "justifyContent",
    basePath: field.address.parent(),
    dataSource: [{
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "FlexJustifyCenter"
      }),
      value: 'center'
    }, {
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "FlexJustifyStart"
      }),
      value: 'flex-start'
    }, {
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "FlexJustifyEnd"
      }),
      value: 'flex-end'
    }, {
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "FlexJustifySpaceAround"
      }),
      value: 'space-around'
    }, {
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "FlexJustifySpaceBetween"
      }),
      value: 'space-between'
    }, {
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "FlexJustifySpaceEvenly"
      }),
      value: 'space-evenly'
    }],
    reactions: field => {
      field.decorator[1].title = `Justify Content : ${field.value || ''}`;
    },
    decorator: [_InputItems.InputItems.Item],
    component: [_formxAntd.Radio.Group, {
      optionType: 'button'
    }]
  }), /*#__PURE__*/_react.default.createElement(_react2.Field, {
    name: "alignItems",
    basePath: field.address.parent(),
    dataSource: [{
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "FlexAlignItemsCenter"
      }),
      value: 'center'
    }, {
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "FlexAlignItemsStart"
      }),
      value: 'flex-start'
    }, {
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "FlexAlignItemsEnd"
      }),
      value: 'flex-end'
    }, {
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "FlexAlignItemsStretch"
      }),
      value: 'stretch'
    }, {
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "FlexAlignItemsBaseline"
      }),
      value: 'baseline'
    }],
    reactions: field => {
      field.decorator[1].title = `Align Items : ${field.value || ''}`;
    },
    decorator: [_InputItems.InputItems.Item],
    component: [_formxAntd.Radio.Group, {
      optionType: 'button'
    }]
  })));
});