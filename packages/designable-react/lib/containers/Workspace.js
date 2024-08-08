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

// src/containers/Workspace.tsx
var Workspace_exports = {};
__export(Workspace_exports, {
  Workspace: () => Workspace
});
module.exports = __toCommonJS(Workspace_exports);
var import_react = __toESM(require("react"));
var import_hooks = require("../hooks");
var import_context = require("../context");
var Workspace = ({
  id,
  title,
  description,
  ...props
}) => {
  const oldId = (0, import_react.useRef)();
  const designer = (0, import_hooks.useDesigner)();
  const workspace = (0, import_react.useMemo)(() => {
    if (!designer) return;
    if (oldId.current && oldId.current !== id) {
      const old = designer.workbench.findWorkspaceById(oldId.current);
      if (old) old.viewport.detachEvents();
    }
    const workspace2 = {
      id: id || "index",
      title,
      description
    };
    designer.workbench.ensureWorkspace(workspace2);
    oldId.current = workspace2.id;
    return workspace2;
  }, [id, designer]);
  return /* @__PURE__ */ import_react.default.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_context.WorkspaceContext.Provider, { value: workspace }, props.children));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Workspace
});
