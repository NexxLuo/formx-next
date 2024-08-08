"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadScript = void 0;
var _registry = require("../registry");
var _shared = require("@designable/shared");
const loadScript = async props => {
  const options = {
    base: (0, _registry.getNpmCDNRegistry)(),
    ...props
  };
  if (_shared.globalThisPolyfill[props.root]) return _shared.globalThisPolyfill[options.root];
  const path = `${options.base}/${options.package}/${options.entry}`;
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = false;
    script.src = path;
    script.onload = () => {
      const module = _shared.globalThisPolyfill[options.root];
      _shared.globalThisPolyfill['define'] = define;
      resolve(module);
      script.remove();
    };
    script.onerror = err => {
      reject(err);
    };
    const define = _shared.globalThisPolyfill['define'];
    _shared.globalThisPolyfill['define'] = undefined;
    document.body.appendChild(script);
  });
};
exports.loadScript = loadScript;