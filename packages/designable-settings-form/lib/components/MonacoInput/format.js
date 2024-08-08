"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.format = void 0;
var _parser = require("@babel/parser");
var _registry = require("../../registry");
const cache = {
  prettier: null
};
const format = async (language, source) => {
  cache.prettier = cache.prettier || new Function(`return import("${(0, _registry.getNpmCDNRegistry)()}/prettier@2.x/esm/standalone.mjs")`)();
  return cache.prettier.then(module => {
    if (language === 'javascript.expression' || language === 'typescript.expression') {
      return source;
    }
    if (/(?:javascript|typescript)/gi.test(language)) {
      return module.default.format(source, {
        semi: false,
        parser(text) {
          return (0, _parser.parse)(text, {
            sourceType: 'module',
            plugins: ['typescript', 'jsx']
          });
        }
      });
    }
    if (language === 'json') {
      return JSON.stringify(JSON.parse(source), null, 2);
    }
    return source;
  });
};
exports.format = format;