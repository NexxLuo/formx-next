var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/locales/panels.ts
var panels_exports = {};
__export(panels_exports, {
  default: () => panels_default
});
module.exports = __toCommonJS(panels_exports);
var panels_default = {
  "zh-CN": {
    panels: {
      Component: "组件",
      OutlinedTree: "大纲树",
      PropertySettings: "属性配置",
      History: "历史记录"
    }
  },
  "en-US": {
    panels: {
      Component: "Component",
      OutlinedTree: "Outlined Tree",
      PropertySettings: "Property Settings",
      History: "History"
    }
  },
  "ko-KR": {
    panels: {
      Component: "컴포넌트",
      OutlinedTree: "트리 노드",
      PropertySettings: "속성 설정",
      History: "기록"
    }
  }
};
