"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlexStyleSetter = void 0;

var react_1 = __importDefault(require("react"));

var react_2 = require("@formily/react");

var formx_antd_1 = require("@platform/formx-antd");

var designable_react_1 = require("@platform/designable-react");

var InputItems_1 = require("../InputItems");

var classnames_1 = __importDefault(require("classnames"));

require("./styles.less");

exports.FlexStyleSetter = (0, react_2.observer)(function (props) {
  var field = (0, react_2.useField)();
  var prefix = (0, designable_react_1.usePrefix)('flex-style-setter');
  return react_1.default.createElement("div", {
    className: (0, classnames_1.default)(prefix, props.className),
    style: props.style
  }, react_1.default.createElement(InputItems_1.InputItems, {
    vertical: true
  }, react_1.default.createElement(react_2.Field, {
    name: "flexDirection",
    basePath: field.address.parent(),
    dataSource: [{
      label: react_1.default.createElement(designable_react_1.IconWidget, {
        infer: "FlexDirectionRow"
      }),
      value: 'row'
    }, {
      label: react_1.default.createElement(designable_react_1.IconWidget, {
        infer: "FlexDirectionColumn"
      }),
      value: 'column'
    }],
    reactions: function reactions(field) {
      field.decorator[1].title = "Flex Direction : ".concat(field.value || '');
    },
    decorator: [InputItems_1.InputItems.Item],
    component: [formx_antd_1.Radio.Group, {
      optionType: 'button'
    }]
  }), react_1.default.createElement(react_2.Field, {
    name: "flexWrap",
    basePath: field.address.parent(),
    dataSource: [{
      label: react_1.default.createElement(designable_react_1.IconWidget, {
        infer: "FlexNoWrap"
      }),
      value: 'nowrap'
    }, {
      label: react_1.default.createElement(designable_react_1.IconWidget, {
        infer: "FlexWrap"
      }),
      value: 'wrap'
    }],
    reactions: function reactions(field) {
      field.decorator[1].title = "Flex Wrap : ".concat(field.value || '');
    },
    decorator: [InputItems_1.InputItems.Item],
    component: [formx_antd_1.Radio.Group, {
      optionType: 'button'
    }]
  }), react_1.default.createElement(react_2.Field, {
    name: "alignContent",
    basePath: field.address.parent(),
    dataSource: [{
      label: react_1.default.createElement(designable_react_1.IconWidget, {
        infer: "FlexAlignContentCenter"
      }),
      value: 'center'
    }, {
      label: react_1.default.createElement(designable_react_1.IconWidget, {
        infer: "FlexAlignContentStart"
      }),
      value: 'flex-start'
    }, {
      label: react_1.default.createElement(designable_react_1.IconWidget, {
        infer: "FlexAlignContentEnd"
      }),
      value: 'flex-end'
    }, {
      label: react_1.default.createElement(designable_react_1.IconWidget, {
        infer: "FlexAlignContentSpaceAround"
      }),
      value: 'space-around'
    }, {
      label: react_1.default.createElement(designable_react_1.IconWidget, {
        infer: "FlexAlignContentSpaceBetween"
      }),
      value: 'space-between'
    }, {
      label: react_1.default.createElement(designable_react_1.IconWidget, {
        infer: "FlexAlignContentStretch"
      }),
      value: 'stretch'
    }],
    reactions: function reactions(field) {
      field.decorator[1].title = "Align Content : ".concat(field.value || '');
    },
    decorator: [InputItems_1.InputItems.Item],
    component: [formx_antd_1.Radio.Group, {
      optionType: 'button'
    }]
  }), react_1.default.createElement(react_2.Field, {
    name: "justifyContent",
    basePath: field.address.parent(),
    dataSource: [{
      label: react_1.default.createElement(designable_react_1.IconWidget, {
        infer: "FlexJustifyCenter"
      }),
      value: 'center'
    }, {
      label: react_1.default.createElement(designable_react_1.IconWidget, {
        infer: "FlexJustifyStart"
      }),
      value: 'flex-start'
    }, {
      label: react_1.default.createElement(designable_react_1.IconWidget, {
        infer: "FlexJustifyEnd"
      }),
      value: 'flex-end'
    }, {
      label: react_1.default.createElement(designable_react_1.IconWidget, {
        infer: "FlexJustifySpaceAround"
      }),
      value: 'space-around'
    }, {
      label: react_1.default.createElement(designable_react_1.IconWidget, {
        infer: "FlexJustifySpaceBetween"
      }),
      value: 'space-between'
    }, {
      label: react_1.default.createElement(designable_react_1.IconWidget, {
        infer: "FlexJustifySpaceEvenly"
      }),
      value: 'space-evenly'
    }],
    reactions: function reactions(field) {
      field.decorator[1].title = "Justify Content : ".concat(field.value || '');
    },
    decorator: [InputItems_1.InputItems.Item],
    component: [formx_antd_1.Radio.Group, {
      optionType: 'button'
    }]
  }), react_1.default.createElement(react_2.Field, {
    name: "alignItems",
    basePath: field.address.parent(),
    dataSource: [{
      label: react_1.default.createElement(designable_react_1.IconWidget, {
        infer: "FlexAlignItemsCenter"
      }),
      value: 'center'
    }, {
      label: react_1.default.createElement(designable_react_1.IconWidget, {
        infer: "FlexAlignItemsStart"
      }),
      value: 'flex-start'
    }, {
      label: react_1.default.createElement(designable_react_1.IconWidget, {
        infer: "FlexAlignItemsEnd"
      }),
      value: 'flex-end'
    }, {
      label: react_1.default.createElement(designable_react_1.IconWidget, {
        infer: "FlexAlignItemsStretch"
      }),
      value: 'stretch'
    }, {
      label: react_1.default.createElement(designable_react_1.IconWidget, {
        infer: "FlexAlignItemsBaseline"
      }),
      value: 'baseline'
    }],
    reactions: function reactions(field) {
      field.decorator[1].title = "Align Items : ".concat(field.value || '');
    },
    decorator: [InputItems_1.InputItems.Item],
    component: [formx_antd_1.Radio.Group, {
      optionType: 'button'
    }]
  })));
});