var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/simulators/MobileSimulator/body.tsx
var body_exports = {};
__export(body_exports, {
  MobileBody: () => MobileBody
});
module.exports = __toCommonJS(body_exports);
var import_reactive_react = require("@formily/reactive-react");
var import_react = __toESM(require("react"));
var import_hooks = require("../../hooks");
var MockupImages = {
  dark: [
    "//img.alicdn.com/imgextra/i3/O1CN01zXMc8W26oJZGUaCK1_!!6000000007708-55-tps-946-459.svg",
    "//img.alicdn.com/imgextra/i3/O1CN012KWk2i1DLduN7InSK_!!6000000000200-55-tps-459-945.svg"
  ],
  light: [
    "//img.alicdn.com/imgextra/i4/O1CN01vuXGe31tEy00v2xBx_!!6000000005871-55-tps-946-459.svg",
    "//img.alicdn.com/imgextra/i4/O1CN01ehfzMc1QPqY6HONTJ_!!6000000001969-55-tps-459-945.svg"
  ]
};
var MobileBody = (0, import_reactive_react.observer)((props) => {
  const screen = (0, import_hooks.useScreen)();
  const theme = (0, import_hooks.useTheme)();
  const prefix = (0, import_hooks.usePrefix)("mobile-simulator-body");
  const getContentStyles = () => {
    if (screen.flip) {
      return {
        position: "absolute",
        width: 736,
        height: 414,
        top: 43.3333,
        left: 106.667,
        overflow: "hidden"
      };
    }
    return {
      position: "absolute",
      width: 414,
      height: 736,
      top: 126.667,
      left: 23.3333,
      overflow: "hidden"
    };
  };
  return /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      className: prefix,
      style: {
        alignItems: screen.flip ? "center" : "",
        minWidth: screen.flip ? 1e3 : 0
      }
    },
    /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        className: prefix + "-wrapper",
        style: {
          position: "relative",
          minHeight: screen.flip ? 0 : 1e3
        }
      },
      /* @__PURE__ */ import_react.default.createElement(
        "img",
        {
          src: screen.flip ? MockupImages[theme][0] : MockupImages[theme][1],
          style: {
            display: "block",
            margin: "20px 0",
            width: screen.flip ? 946.667 : 460,
            height: screen.flip ? 460 : 946.667,
            boxShadow: "0 0 20px #0000004d",
            borderRadius: 60,
            backfaceVisibility: "hidden"
          }
        }
      ),
      /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-content", style: getContentStyles() }, props.children)
    )
  );
});
MobileBody.defaultProps = {};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MobileBody
});
