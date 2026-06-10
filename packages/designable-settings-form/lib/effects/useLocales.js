"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLocales = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@formily/core");
var _core2 = require("@designable/core");
var _shared = require("@designable/shared");
var _designableReact = require("@platform/designable-react");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const takeIcon = message => {
  if (!(0, _shared.isStr)(message)) return;
  const matched = message.match(/@([^:\s]+)(?:\s*\:\s*([\s\S]+))?/);
  if (matched) return [matched[1], matched[2]];
  return;
};
const mapEnum = dataSource => (item, index) => {
  const label = dataSource[index] || dataSource[item.value] || item.label;
  const icon = takeIcon(label);
  return {
    ...item,
    value: item?.value ?? null,
    label: icon ? /*#__PURE__*/_react.default.createElement(_designableReact.IconWidget, {
      infer: icon[0],
      tooltip: icon[1]
    }) : label?.label ?? label ?? 'Unknow'
  };
};
const useLocales = node => {
  (0, _core.onFieldReact)('*', field => {
    const path = field.path.toString().replace(/\.[\d+]/g, '');
    const takeMessage = prop => {
      const token = `settings.${path}${prop ? `.${prop}` : ''}`;
      return node.getMessage(token) || _core2.GlobalRegistry.getDesignerMessage(token);
    };
    const title = takeMessage('title') || takeMessage();
    const description = takeMessage('description');
    const tooltip = takeMessage('tooltip');
    const dataSource = takeMessage('dataSource');
    const placeholder = takeMessage('placeholder');
    if (title) {
      field.title = title;
    }
    if (description) {
      field.description = description;
    }
    if (tooltip) {
      field.decorator[1] = field.decorator[1] || [];
      field.decorator[1].tooltip = tooltip;
    }
    if (placeholder) {
      field.component[1] = field.component[1] || [];
      field.component[1].placeholder = placeholder;
    }
    if (!(0, _core.isVoidField)(field)) {
      if (dataSource?.length) {
        if (field.dataSource?.length) {
          field.dataSource = field.dataSource.map(mapEnum(dataSource));
        } else {
          field.dataSource = dataSource.slice();
        }
      } else {
        field.dataSource = field.dataSource?.filter(Boolean);
      }
    }
  });
};
exports.useLocales = useLocales;