"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linkageTabPaneVisible = linkageTabPaneVisible;
exports.linkageVisibility = linkageVisibility;
exports.observerChainHidden = observerChainHidden;
exports.setExtraNameFieldVisibility = setExtraNameFieldVisibility;

var _utils = require("./utils");

function linkageTabPaneVisible(instance, key, path, value) {
  if (typeof value === "boolean") {
    var tabpaneKey = key;
    var tabpanePath = path.split("." + tabpaneKey);
    var tabKey = "";

    if (tabpanePath.length > 1) {
      tabKey = tabpanePath[0];
    }

    if (tabKey) {
      instance.setFieldState(tabKey, function (state) {
        var prevHiddenKeys = state.componentProps.hiddenKeys || [];
        var nextHiddenKeys = prevHiddenKeys.slice();
        var i = prevHiddenKeys.indexOf(key);

        if (value === true) {
          if (i > -1) {
            nextHiddenKeys.splice(i, 1);
          }
        } else {
          if (i === -1) {
            nextHiddenKeys.push(key);
          }
        }

        state.componentProps.hiddenKeys = nextHiddenKeys;
      });
    }
  }
}

function setExtraNameFieldVisibility(state, form, visible) {
  var _state$componentProps, _state$componentProps2;

  var extraNameFieldKey = (_state$componentProps = state.componentProps) === null || _state$componentProps === void 0 ? void 0 : (_state$componentProps2 = _state$componentProps["x-extra-props"]) === null || _state$componentProps2 === void 0 ? void 0 : _state$componentProps2.extraNameFieldKey;

  if (extraNameFieldKey) {
    var extraNameFieldPath = (0, _utils.replacePathKey)(state.path.toString(), extraNameFieldKey);

    if (extraNameFieldPath) {
      form.setFieldState(extraNameFieldPath, function (state) {
        if (visible === true) {
          state.display = "hidden";
        } else {
          state.display = "none";
        }
      });
    }
  }
}

function linkageVisibility(linkageItem, instance, _evaluator) {
  //隐藏联动
  if (linkageItem.visibility instanceof Array) {
    linkageItem.visibility.forEach(function (d) {
      var _expressionVar = (0, _utils.getExpressionVar)(d.name);

      if (d.component === "tabpane") {
        var res = _evaluator.evaluate(d.expression, _expressionVar);

        linkageTabPaneVisible(instance, d.name, d.path, !res);
      } else {
        instance.setFieldState(d.name, function (state) {
          //此处不能判断state.mounted,因为如果父级也被隐藏，mounted将为false，这样就没法实现isChainHidden
          //执行表达式
          var res = _evaluator.evaluate(d.expression, _expressionVar);

          if (d.hiddenValue === true) {
            if (res === true) {
              //bug fixed : 如果不添加displayName === "VoidField"判断会导致父级容器隐藏为none时，再次显示子级表格，表格值部分丢失
              state.display = state.displayName === "VoidField" ? "hidden" : "none";
            } else {
              state.display = "visible";
            } //如果id值不可见，则对应的name值也应该不可见


            setExtraNameFieldVisibility(state, instance, !res); //
          } else {
            if (res === true) {
              state.display = "hidden";
            } else {
              state.display = "visible";
            }
          }
        });
      }
    });
  }
}

function observerChainHidden($) {
  $("onFieldReact", "*").subscribe(function (field, form) {
    if (form.mounted) {
      var parent = field.parent;

      if (parent) {
        var _parent$componentProp;

        var extraProps = (_parent$componentProp = parent.componentProps) === null || _parent$componentProp === void 0 ? void 0 : _parent$componentProp["x-extra-props"];

        if (extraProps === null || extraProps === void 0 ? void 0 : extraProps.isChainHidden) {
          var visibles = field.query(parent.address.toString() + ".*").map(function (_field) {
            if (_field.selfDisplay === "none" || _field.selfDisplay === "hidden") {
              return false;
            }

            return true;
          });

          if (visibles.length > 0) {
            var bl = visibles.indexOf(true) > -1;
            parent.setState({
              hidden: !bl
            });
          }
        }

        if (parent.visible === true && parent.hidden === false) {
          //如果autoCollapse为true，且为"FieldSet","Card"组件，且子级只有一个表格
          //则表格无数据时自动折叠
          if (extraProps.autoCollapse && ["FieldSet", "Card"].indexOf(extraProps.name) > -1) {
            var _field$componentProps;

            var parentPath = parent.address.toString();
            var childrens = [];
            field.query(parentPath + ".*").map(function (_field) {
              var _fieldPath = _field.address.toString();

              var a = parentPath.split(".").length + 1;

              var b = _fieldPath.split(".").length; //查找直系子级


              if (a === b) {
                childrens.push(_fieldPath);
              }
            });

            var _extraProps = (_field$componentProps = field.componentProps) === null || _field$componentProps === void 0 ? void 0 : _field$componentProps["x-extra-props"];

            if (_extraProps && childrens.length === 1) {
              if (_extraProps.name === "ArrayTable" && !field.loading) {
                var arrayValue = field.value;
                var hasValue = false;

                if (arrayValue instanceof Array && arrayValue.length > 0) {
                  hasValue = true;
                }

                if (!hasValue) {
                  parent.setComponentProps({
                    activeKey: []
                  });
                } else {
                  parent.setComponentProps({
                    activeKey: ["pane"]
                  });
                }
              }
            }
          }
        }
      }
    }
  });
}