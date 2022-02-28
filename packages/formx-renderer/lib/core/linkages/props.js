"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linkageProps = linkageProps;

var _utils = require("./utils");

var _core = require("@formily/core");

function linkageProps(linkageItem, field, instance, _evaluator) {
  var propertyPathMap = {
    value: ["value"],
    title: ["title", "componentProps.title", "componentProps.x-extra-props.title"],
    style: ["componentProps.style", "decorator[1].style"],
    disabled: ["componentProps.disabled"],
    readonly: ["componentProps.readOnly"],
    visible: ["visible"]
  }; //属性联动

  if (linkageItem && linkageItem.fieldProps instanceof Array) {
    linkageItem.fieldProps.forEach(function (d) {
      var property = d.property;
      var propertyType = d.type;
      var targetPath = (0, _utils.transformArrayItemsPath)(d.name, instance);

      if (property) {
        var bl = true; //如果联动属性为value，源控件则必须要主动输入过才进行联动

        if (property === "value") {
          bl = field.selfModified === true ? true : false;
        } //


        if (bl === true) {
          instance.setFieldState(targetPath, function (state) {
            var name = state.path.toString();

            var _expressionVar = (0, _utils.getExpressionVar)(name);

            var res = _evaluator.evaluate(d.expression, _expressionVar);

            if (propertyType === "componentProps") {
              if (property === "style") {
                res = (0, _utils.parseStyleString)(res);
              }

              var propertyPathArr = propertyPathMap[property];

              if (propertyPathArr instanceof Array) {
                propertyPathArr.forEach(function (_d) {
                  _core.FormPath.setIn(state, _d, res);
                });
              }
            } else {
              _core.FormPath.setIn(state, "componentProps.attribute." + property, res);
            }
          });
        }
      }
    });
  }
}