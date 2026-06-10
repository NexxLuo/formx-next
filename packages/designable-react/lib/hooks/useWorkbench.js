"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWorkbench = void 0;
var _useDesigner = require("./useDesigner");
const useWorkbench = () => {
  const designer = (0, _useDesigner.useDesigner)();
  return designer.workbench;
};
exports.useWorkbench = useWorkbench;