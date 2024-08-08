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

// src/effects/useLocales.tsx
var useLocales_exports = {};
__export(useLocales_exports, {
  useLocales: () => useLocales
});
module.exports = __toCommonJS(useLocales_exports);
var import_react = __toESM(require("react"));
var import_core = require("@formily/core");
var import_core2 = require("@designable/core");
var import_shared = require("@designable/shared");
var import_designable_react = require("@platform/designable-react");
var takeIcon = (message) => {
  if (!(0, import_shared.isStr)(message)) return;
  const matched = message.match(/@([^:\s]+)(?:\s*\:\s*([\s\S]+))?/);
  if (matched) return [matched[1], matched[2]];
  return;
};
var mapEnum = (dataSource) => (item, index) => {
  const label = dataSource[index] || dataSource[item.value] || item.label;
  const icon = takeIcon(label);
  return {
    ...item,
    value: (item == null ? void 0 : item.value) ?? null,
    label: icon ? /* @__PURE__ */ import_react.default.createElement(import_designable_react.IconWidget, { infer: icon[0], tooltip: icon[1] }) : (label == null ? void 0 : label.label) ?? label ?? "Unknow"
  };
};
var useLocales = (node) => {
  (0, import_core.onFieldReact)("*", (field) => {
    var _a, _b;
    const path = field.path.toString().replace(/\.[\d+]/g, "");
    const takeMessage = (prop) => {
      const token = `settings.${path}${prop ? `.${prop}` : ""}`;
      return node.getMessage(token) || import_core2.GlobalRegistry.getDesignerMessage(token);
    };
    const title = takeMessage("title") || takeMessage();
    const description = takeMessage("description");
    const tooltip = takeMessage("tooltip");
    const dataSource = takeMessage("dataSource");
    const placeholder = takeMessage("placeholder");
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
    if (!(0, import_core.isVoidField)(field)) {
      if (dataSource == null ? void 0 : dataSource.length) {
        if ((_a = field.dataSource) == null ? void 0 : _a.length) {
          field.dataSource = field.dataSource.map(mapEnum(dataSource));
        } else {
          field.dataSource = dataSource.slice();
        }
      } else {
        field.dataSource = (_b = field.dataSource) == null ? void 0 : _b.filter(Boolean);
      }
    }
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useLocales
});
