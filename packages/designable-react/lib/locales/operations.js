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

// src/locales/operations.ts
var operations_exports = {};
__export(operations_exports, {
  default: () => operations_default
});
module.exports = __toCommonJS(operations_exports);
var operations_default = {
  "zh-CN": {
    operations: {
      default_state: "缺省态",
      append_node: "追加节点",
      prepend_node: "头部追加",
      clone_node: "复制节点",
      update_node_props: "属性更改",
      insert_after: "后置插入",
      insert_before: "前置插入",
      insert_children: "插入子节点",
      update_children: "覆盖子节点",
      remove_node: "删除节点",
      wrap_node: "包装节点",
      from_node: "子树更新"
    }
  },
  "en-US": {
    operations: {
      default_state: "Default State",
      append_node: "Append Node",
      prepend_node: "Prepend Node",
      clone_node: "Clone Node",
      update_node_props: "Update Node Props",
      insert_after: "Insert Node After",
      insert_before: "Insert Node Before",
      insert_children: "Insert Node Children",
      update_children: "Update Children",
      remove_node: "Remove Node",
      wrap_node: "Wrap Node",
      from_node: "Update Child Tree"
    }
  },
  "ko-KR": {
    operations: {
      default_state: "초기 상태",
      append_node: "노드 추가",
      prepend_node: "노드 삽입",
      clone_node: "노드 복제",
      update_node_props: "노드 속성 수정",
      insert_after: "뒤쪽 노드 삽입",
      insert_before: "앞쪽 노드 삽입",
      insert_children: "자식 노드 삽입",
      update_children: "자식 노드 수정",
      remove_node: "노드 삭제",
      wrap_node: "노드 랩핑",
      from_node: "자식 노드 트리 수정"
    }
  }
};
