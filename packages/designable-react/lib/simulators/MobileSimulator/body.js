"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MobileBody = void 0;
var _reactiveReact = require("@formily/reactive-react");
var _react = _interopRequireDefault(require("react"));
var _hooks = require("../../hooks");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MockupImages = {
  dark: ['//img.alicdn.com/imgextra/i3/O1CN01zXMc8W26oJZGUaCK1_!!6000000007708-55-tps-946-459.svg', '//img.alicdn.com/imgextra/i3/O1CN012KWk2i1DLduN7InSK_!!6000000000200-55-tps-459-945.svg'],
  light: ['//img.alicdn.com/imgextra/i4/O1CN01vuXGe31tEy00v2xBx_!!6000000005871-55-tps-946-459.svg', '//img.alicdn.com/imgextra/i4/O1CN01ehfzMc1QPqY6HONTJ_!!6000000001969-55-tps-459-945.svg']
};
const MobileBody = exports.MobileBody = (0, _reactiveReact.observer)(props => {
  const screen = (0, _hooks.useScreen)();
  const theme = (0, _hooks.useTheme)();
  const prefix = (0, _hooks.usePrefix)('mobile-simulator-body');
  const getContentStyles = () => {
    if (screen.flip) {
      return {
        position: 'absolute',
        width: 736,
        height: 414,
        top: 43.3333,
        left: 106.667,
        overflow: 'hidden'
      };
    }
    return {
      position: 'absolute',
      width: 414,
      height: 736,
      top: 126.667,
      left: 23.3333,
      overflow: 'hidden'
    };
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: prefix,
    style: {
      alignItems: screen.flip ? 'center' : '',
      minWidth: screen.flip ? 1000 : 0
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-wrapper',
    style: {
      position: 'relative',
      minHeight: screen.flip ? 0 : 1000
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: screen.flip ? MockupImages[theme][0] : MockupImages[theme][1],
    style: {
      display: 'block',
      margin: '20px 0',
      width: screen.flip ? 946.667 : 460,
      height: screen.flip ? 460 : 946.667,
      boxShadow: '0 0 20px #0000004d',
      borderRadius: 60,
      backfaceVisibility: 'hidden'
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix + '-content',
    style: getContentStyles()
  }, props.children)));
});
MobileBody.defaultProps = {};