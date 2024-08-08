"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FontStyleSetter = void 0;
var _react = _interopRequireDefault(require("react"));
var _designableReact = require("@platform/designable-react");
var _react2 = require("@formily/react");
var _formxAntd = require("@platform/formx-antd");
var _FoldItem = require("../FoldItem");
var _InputItems = require("../InputItems");
var _SizeInput = require("../SizeInput");
var _ColorInput = require("../ColorInput");
var _classnames = _interopRequireDefault(require("classnames"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createFontFamilyOptions = fonts => {
  return fonts.map(font => {
    const splited = font.split('=');
    const label = splited?.[0];
    const value = splited?.[1];
    return {
      label: /*#__PURE__*/_react.default.createElement("span", {
        style: {
          fontFamily: value
        }
      }, label),
      value
    };
  });
};
const FontFamilyOptions = createFontFamilyOptions(['宋体=SimSun', '微软雅黑=Microsoft Yahei', '苹方=PingFang SC', 'Andale Mono=andale mono,monospace', 'Arial=arial,helvetica,sans-serif', 'Arial Black=arial black,sans-serif', 'Book Antiqua=book antiqua,palatino,serif', 'Comic Sans MS=comic sans ms,sans-serif', 'Courier New=courier new,courier,monospace', 'Georgia=georgia,palatino,serif', 'Helvetica Neue=Helvetica Neue', 'Helvetica=helvetica,arial,sans-serif', 'Impact=impact,sans-serif', 'Symbol=symbol', 'Tahoma=tahoma,arial,helvetica,sans-serif', 'Terminal=terminal,monaco,monospace', 'Times New Roman=times new roman,times,serif', 'Trebuchet MS=trebuchet ms,geneva,sans-serif', 'Verdana=verdana,geneva,sans-serif']);
const FontStyleSetter = exports.FontStyleSetter = (0, _react2.observer)(props => {
  const field = (0, _react2.useField)();
  const prefix = (0, _designableReact.usePrefix)('font-style-setter');
  return /*#__PURE__*/_react.default.createElement(_FoldItem.FoldItem, {
    label: field.title,
    className: (0, _classnames.default)(prefix, props.className),
    style: props.style
  }, /*#__PURE__*/_react.default.createElement(_FoldItem.FoldItem.Base, null, /*#__PURE__*/_react.default.createElement(_react2.Field, {
    name: "fontFamily",
    basePath: field.address.parent(),
    component: [_formxAntd.Select, {
      style: {
        width: '100%'
      },
      placeholder: 'Helvetica Neue'
    }],
    dataSource: FontFamilyOptions
  })), /*#__PURE__*/_react.default.createElement(_FoldItem.FoldItem.Extra, null, /*#__PURE__*/_react.default.createElement(_InputItems.InputItems, null, /*#__PURE__*/_react.default.createElement(_InputItems.InputItems.Item, {
    icon: "FontWeight",
    width: "50%"
  }, /*#__PURE__*/_react.default.createElement(_react2.Field, {
    name: "fontWeight",
    basePath: field.address.parent(),
    component: [_formxAntd.NumberPicker, {
      placeholder: '400'
    }]
  })), /*#__PURE__*/_react.default.createElement(_InputItems.InputItems.Item, {
    icon: "FontStyle",
    width: "50%"
  }, /*#__PURE__*/_react.default.createElement(_react2.Field, {
    name: "fontStyle",
    basePath: field.address.parent(),
    dataSource: [{
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "NormalFontStyle"
      }),
      value: 'normal'
    }, {
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "ItalicFontStyle"
      }),
      value: 'italic'
    }],
    component: [_formxAntd.Radio.Group, {
      optionType: 'button'
    }]
  })), /*#__PURE__*/_react.default.createElement(_InputItems.InputItems.Item, {
    icon: "FontColor",
    width: "100%"
  }, /*#__PURE__*/_react.default.createElement(_react2.Field, {
    name: "color",
    basePath: field.address.parent(),
    component: [_ColorInput.ColorInput]
  })), /*#__PURE__*/_react.default.createElement(_InputItems.InputItems.Item, {
    icon: "FontSize",
    width: "50%"
  }, /*#__PURE__*/_react.default.createElement(_react2.Field, {
    name: "fontSize",
    basePath: field.address.parent(),
    component: [_SizeInput.SizeInput, {
      exclude: ['auto']
    }]
  })), /*#__PURE__*/_react.default.createElement(_InputItems.InputItems.Item, {
    icon: "LineHeight",
    width: "50%"
  }, /*#__PURE__*/_react.default.createElement(_react2.Field, {
    name: "lineHeight",
    basePath: field.address.parent(),
    component: [_SizeInput.SizeInput, {
      exclude: ['auto']
    }]
  })), /*#__PURE__*/_react.default.createElement(_InputItems.InputItems.Item, {
    icon: "TextAlign"
  }, /*#__PURE__*/_react.default.createElement(_react2.Field, {
    name: "textAlign",
    basePath: field.address.parent(),
    dataSource: [{
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "TextAlignLeft"
      }),
      value: 'left'
    }, {
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "TextAlignCenter"
      }),
      value: 'center'
    }, {
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "TextAlignRight"
      }),
      value: 'right'
    }, {
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "TextAlignJustify"
      }),
      value: 'justify'
    }],
    component: [_formxAntd.Radio.Group, {
      optionType: 'button'
    }]
  })), /*#__PURE__*/_react.default.createElement(_InputItems.InputItems.Item, {
    icon: "TextDecoration"
  }, /*#__PURE__*/_react.default.createElement(_react2.Field, {
    name: "textDecoration",
    basePath: field.address.parent(),
    dataSource: [{
      label: '--',
      value: 'none'
    }, {
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "TextUnderline"
      }),
      value: 'underline'
    }, {
      label: /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
        infer: "TextLineThrough"
      }),
      value: 'line-through'
    }],
    component: [_formxAntd.Radio.Group, {
      optionType: 'button'
    }]
  })))));
});