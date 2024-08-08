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

// src/shared/loadScript.ts
var loadScript_exports = {};
__export(loadScript_exports, {
  loadScript: () => loadScript
});
module.exports = __toCommonJS(loadScript_exports);
var import_registry = require("../registry");
var import_shared = require("@designable/shared");
var loadScript = async (props) => {
  const options = {
    base: (0, import_registry.getNpmCDNRegistry)(),
    ...props
  };
  if (import_shared.globalThisPolyfill[props.root]) return import_shared.globalThisPolyfill[options.root];
  const path = `${options.base}/${options.package}/${options.entry}`;
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = false;
    script.src = path;
    script.onload = () => {
      const module2 = import_shared.globalThisPolyfill[options.root];
      import_shared.globalThisPolyfill["define"] = define;
      resolve(module2);
      script.remove();
    };
    script.onerror = (err) => {
      reject(err);
    };
    const define = import_shared.globalThisPolyfill["define"];
    import_shared.globalThisPolyfill["define"] = void 0;
    document.body.appendChild(script);
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  loadScript
});
