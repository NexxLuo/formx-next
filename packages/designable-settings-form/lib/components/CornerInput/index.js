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

// src/components/CornerInput/index.tsx
var CornerInput_exports = {};
__export(CornerInput_exports, {
  CornerInput: () => CornerInput
});
module.exports = __toCommonJS(CornerInput_exports);
var import_react = __toESM(require("react"));
var import_designable_react = require("@platform/designable-react");
var import_classnames = __toESM(require("classnames"));
var import_styles = require("./styles.less");
var CornerInput = (props) => {
  const prefix = (0, import_designable_react.usePrefix)("corner-input");
  const [current, setCurrent] = (0, import_react.useState)(props.value);
  (0, import_react.useEffect)(() => {
    if (!props.value) {
      setCurrent("all");
    }
  }, [props.value]);
  const createCellProps = (type) => ({
    className: (0, import_classnames.default)(prefix + "-cell", { active: current === type }),
    onClick() {
      var _a;
      setCurrent(type);
      (_a = props.onChange) == null ? void 0 : _a.call(props, type);
    }
  });
  return /* @__PURE__ */ import_react.default.createElement("div", { className: (0, import_classnames.default)(prefix, props.className), style: props.style }, /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-column" }, /* @__PURE__ */ import_react.default.createElement("div", { ...createCellProps("topLeft") }, "┏"), /* @__PURE__ */ import_react.default.createElement("div", { ...createCellProps("bottomLeft") }, "┗")), /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-column" }, /* @__PURE__ */ import_react.default.createElement("div", { ...createCellProps("all") }, "╋")), /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-column" }, /* @__PURE__ */ import_react.default.createElement("div", { ...createCellProps("topRight") }, "┓"), /* @__PURE__ */ import_react.default.createElement("div", { ...createCellProps("bottomRight") }, "┛")));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CornerInput
});
