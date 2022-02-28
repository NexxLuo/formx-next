"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linkageAvailability = linkageAvailability;

var _utils = require("./utils");

function linkageAvailability(linkageItem, instance, _evaluator) {
  //禁用联动
  if (linkageItem.availability instanceof Array) {
    linkageItem.availability.forEach(function (d) {
      var _expressionVar = (0, _utils.getExpressionVar)(d.name);

      instance.setFieldState(d.name, function (state) {
        //执行表达式
        var res = _evaluator.evaluate(d.expression, _expressionVar);

        if (res === true) {
          state.componentProps.disabled = true; //state.disabled = true;
        } else {
          state.componentProps.disabled = false; //state.disabled = false;
        }
      });
    });
  }
}