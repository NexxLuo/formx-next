"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDesigner = void 0;
var _react = require("react");
var _context = require("../context");
var _shared = require("@designable/shared");
const useDesigner = effects => {
  const designer = _shared.globalThisPolyfill['__DESIGNABLE_ENGINE__'] || (0, _react.useContext)(_context.DesignerEngineContext);
  console.log("designer:", designer?.id);
  (0, _react.useEffect)(() => {
    if ((0, _shared.isFn)(effects)) {
      return effects(designer);
    }
  }, []);
  return designer;
};
exports.useDesigner = useDesigner;