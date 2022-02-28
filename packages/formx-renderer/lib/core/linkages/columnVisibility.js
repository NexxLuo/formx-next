"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linkageColumnVisibility = linkageColumnVisibility;

function linkageColumnVisibility(linkageItem, instance, _evaluator) {
  //表格列隐藏联动
  if (linkageItem.columnVisibility instanceof Array) {
    linkageItem.columnVisibility.forEach(function (d) {
      var listPath = d.path;
      var itemKey = d.name;

      if (listPath) {
        var list = instance.getFieldState(listPath);

        if (list && list.fieldActions) {
          var fn = list.fieldActions.toggleColumnVisibility;

          if (typeof fn === "function") {
            var res = _evaluator.evaluate(d.expression, {});

            fn(itemKey, res);
          }
        }
      }
    });
  }
}