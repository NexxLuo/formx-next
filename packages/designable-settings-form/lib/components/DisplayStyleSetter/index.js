"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DisplayStyleSetter = void 0;

var react_1 = __importDefault(require("react"));

var react_2 = require("@formily/react");

var formx_antd_1 = require("@platform/formx-antd");

var antd_1 = require("antd");

var designable_react_1 = require("@platform/designable-react");

var FlexStyleSetter_1 = require("../FlexStyleSetter");

var classnames_1 = __importDefault(require("classnames"));

require("./styles.less");

exports.DisplayStyleSetter = (0, react_2.observer)(function (props) {
  var field = (0, react_2.useField)();
  var prefix = (0, designable_react_1.usePrefix)('display-style-setter');
  return react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement(formx_antd_1.FormItem.BaseItem, {
    label: field.title,
    className: (0, classnames_1.default)(prefix, props.className),
    style: props.style
  }, react_1.default.createElement(antd_1.Radio.Group, {
    className: prefix + '-radio',
    options: [{
      label: react_1.default.createElement(designable_react_1.IconWidget, {
        infer: "DisplayBlock",
        size: 16
      }),
      value: 'block'
    }, {
      label: react_1.default.createElement(designable_react_1.IconWidget, {
        infer: "DisplayInlineBlock",
        size: 16
      }),
      value: 'inline-block'
    }, {
      label: react_1.default.createElement(designable_react_1.IconWidget, {
        infer: "DisplayInline",
        size: 16
      }),
      value: 'inline'
    }, {
      label: react_1.default.createElement(designable_react_1.IconWidget, {
        infer: "DisplayFlex",
        size: 16
      }),
      value: 'flex'
    }],
    value: props.value,
    onChange: function onChange(e) {
      var _a;

      (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, e.target.value);
    }
  })), react_1.default.createElement(react_2.Field, {
    name: "flex",
    basePath: field.address.parent(),
    visible: false,
    reactions: function reactions(flexField) {
      flexField.visible = field.value === 'flex';
    },
    component: [FlexStyleSetter_1.FlexStyleSetter]
  }));
});