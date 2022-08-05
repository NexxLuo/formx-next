import { getExpressionVar, replacePathKey } from "./utils";

export function linkageTabPaneVisible(instance, key, path, value) {
    if (typeof value === "boolean") {
        let tabpaneKey = key;
        let tabpanePath = path.split("." + tabpaneKey);
        let tabKey = "";

        if (tabpanePath.length > 1) {
            tabKey = tabpanePath[0];
        }

        if (tabKey) {
            instance.setFieldState(tabKey, state => {
                const prevHiddenKeys = state.componentProps.hiddenKeys || [];

                const nextHiddenKeys = prevHiddenKeys.slice();
                let i = prevHiddenKeys.indexOf(key);
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

export function setExtraNameFieldVisibility(state, form, visible) {
    let extraNameFieldKey =
        state.componentProps?.["x-extra-props"]?.extraNameFieldKey;

    if (extraNameFieldKey) {
        let extraNameFieldPath = replacePathKey(
            state.path.toString(),
            extraNameFieldKey
        );
        if (extraNameFieldPath) {
            form.setFieldState(extraNameFieldPath, state => {
                if (visible === true) {
                    state.display = "hidden";
                } else {
                    state.display = "none";
                }
            });
        }
    }
}

export function linkageVisibility(linkageItem, instance, _evaluator) {
    //隐藏联动
    if (linkageItem.visibility instanceof Array) {
        linkageItem.visibility.forEach(d => {
            let _expressionVar = getExpressionVar(d.name);
            if (d.component === "tabpane") {
                let res = _evaluator.evaluate(d.expression, _expressionVar);
                linkageTabPaneVisible(instance, d.name, d.path, !res);
            } else {
                instance.setFieldState(d.name, state => {
                    //此处不能判断state.mounted,因为如果父级也被隐藏，mounted将为false，这样就没法实现isChainHidden
                    //执行表达式
                    let res = _evaluator.evaluate(d.expression, _expressionVar);
                    if (d.hiddenValue === true) {
                        if (res === true) {
                            //bug fixed : 如果不添加displayName === "VoidField"判断会导致父级容器隐藏为none时，再次显示子级表格，表格值部分丢失
                            state.display =
                                state.displayName === "VoidField"
                                    ? "hidden"
                                    : "none";
                        } else {
                            state.display = "visible";
                        }
                        //如果id值不可见，则对应的name值也应该不可见
                        setExtraNameFieldVisibility(state, instance, !res);
                        //
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

/**
 * 如果父级已被隐藏，或者是条件隐藏，则不响应该父级容器的级联隐藏属性(isChainHidden)
 * @param {*} field 
 * @returns 
 */
const isControledHidden = (field) => {
    let bl = false;

    if (field) {
        let visibility = field.componentProps?.["x-extra-props"]?.visibility;
        if (typeof visibility === "object" && visibility) {
            if (visibility.type === "expression" || visibility.type === "hidden") {
                bl = true;
            } else {
                let allOptions = field.form.formActions.getOptions() || {};
                let fieldOptions = allOptions[field.path.toString()];
                if (fieldOptions && fieldOptions.visible === false) {
                    bl = true;
                }
            }
        }
    }

    return bl
}

export function observerChainHidden($) {
    $("onFieldReact", "*").subscribe((field, form) => {
        if (form.mounted) {
            let parent = field.parent;
            if (parent && !isControledHidden(parent)) {
                let extraProps = parent.componentProps?.["x-extra-props"];
                if (extraProps?.isChainHidden) {
                    let visibles = field
                        .query(parent.address.toString() + ".*")
                        .map(_field => {
                            if (
                                _field.selfDisplay === "none" ||
                                _field.selfDisplay === "hidden"
                            ) {
                                return false;
                            }

                            let extraProps =
                                _field.componentProps?.["x-extra-props"] || {};
                            if (extraProps.isTableColumn === true) {
                                return false;
                            }

                            return true;
                        });

                    if (visibles.length > 0) {
                        let bl = visibles.indexOf(true) > -1;
                        parent.setState({ hidden: !bl });
                    }
                }

                if (parent.visible === true && parent.hidden === false) {
                    //如果autoCollapse为true，且为"FieldSet","Card"组件，且子级只有一个表格
                    //则表格无数据时自动折叠
                    if (
                        extraProps.autoCollapse &&
                        ["FieldSet", "Card"].indexOf(extraProps.name) > -1
                    ) {
                        let parentPath = parent.address.toString();
                        let childrens = [];
                        field.query(parentPath + ".*").map(_field => {
                            let _fieldPath = _field.address.toString();
                            let a = parentPath.split(".").length + 1;
                            let b = _fieldPath.split(".").length;
                            //查找直系子级
                            if (a === b) {
                                childrens.push(_fieldPath);
                            }
                        });
                        let _extraProps =
                            field.componentProps?.["x-extra-props"];
                        if (_extraProps && childrens.length === 1) {
                            if (
                                _extraProps.name === "ArrayTable" &&
                                !field.loading
                            ) {
                                let arrayValue = field.value;
                                let hasValue = false;
                                if (
                                    arrayValue instanceof Array &&
                                    arrayValue.length > 0
                                ) {
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
