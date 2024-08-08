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

// src/components/PolyInput/index.tsx
var PolyInput_exports = {};
__export(PolyInput_exports, {
  createPolyInput: () => createPolyInput
});
module.exports = __toCommonJS(PolyInput_exports);
var import_react = __toESM(require("react"));
var import_antd = require("antd");
var import_designable_react = require("@platform/designable-react");
var import_classnames = __toESM(require("classnames"));
var import_styles = require("./styles.less");
var isValid = (val) => val !== void 0 && val !== null;
var getEventValue = (event) => {
  if (event == null ? void 0 : event.target) {
    if (isValid(event.target.value)) return event.target.value;
    if (isValid(event.target.checked)) return event.target.checked;
    return;
  }
  return event;
};
var createTypes = (types, exclude, include) => {
  return types.filter(({ type }) => {
    if (Array.isArray(include) && include.length) {
      return include.includes(type);
    }
    if (Array.isArray(exclude) && exclude.length) {
      return !exclude.includes(type);
    }
    return true;
  });
};
function createPolyInput(polyTypes = []) {
  return ({
    className,
    style,
    value,
    onChange,
    exclude,
    include,
    ...props
  }) => {
    var _a;
    const prefix = (0, import_designable_react.usePrefix)("poly-input");
    const types = createTypes(polyTypes, exclude, include);
    const [current, setCurrent] = (0, import_react.useState)((_a = types[0]) == null ? void 0 : _a.type);
    const type = types == null ? void 0 : types.find(({ type: type2 }) => type2 === current);
    const component = type == null ? void 0 : type.component;
    const typesValue = (0, import_react.useRef)({});
    (0, import_react.useEffect)(() => {
      types == null ? void 0 : types.forEach(({ checker, type: type2 }) => {
        if (checker(value)) {
          setCurrent(type2);
        }
      });
    }, [value]);
    const getNextType = () => {
      const currentIndex = types == null ? void 0 : types.findIndex(({ type: type2 }) => type2 === current);
      const nextIndex = currentIndex + 1 > (types == null ? void 0 : types.length) - 1 ? 0 : currentIndex + 1;
      return types[nextIndex];
    };
    const transformOnChangeValue = (value2, type2) => {
      return (type2 == null ? void 0 : type2.toChangeValue) ? type2 == null ? void 0 : type2.toChangeValue(value2) : value2;
    };
    return /* @__PURE__ */ import_react.default.createElement("div", { className: (0, import_classnames.default)(prefix, className), style }, component && /* @__PURE__ */ import_react.default.createElement("div", { className: prefix + "-content" }, import_react.default.createElement(component, {
      ...props,
      value: (type == null ? void 0 : type.toInputValue) ? type == null ? void 0 : type.toInputValue(value) : value,
      onChange: (event) => {
        const value2 = getEventValue(event);
        typesValue.current[type == null ? void 0 : type.type] = value2;
        onChange == null ? void 0 : onChange(transformOnChangeValue(value2, type));
      }
    })), /* @__PURE__ */ import_react.default.createElement(
      import_antd.Button,
      {
        className: prefix + "-controller",
        style: {
          width: !component ? "100%" : "auto"
        },
        block: true,
        onClick: () => {
          const nextType = getNextType();
          if (nextType === type) return;
          setCurrent(nextType == null ? void 0 : nextType.type);
          onChange == null ? void 0 : onChange(
            transformOnChangeValue(
              typesValue.current[nextType == null ? void 0 : nextType.type],
              nextType
            )
          );
        }
      },
      (type == null ? void 0 : type.icon) ? /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: type.icon }) : (type == null ? void 0 : type.title) || (type == null ? void 0 : type.type)
    ));
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createPolyInput
});
