import { getItemIndex } from "../utils";
import { linkageValue, setInitialValue } from "./value";
import {
    linkageVisibility,
    setExtraNameFieldVisibility,
    linkageTabPaneVisible,
    observerChainHidden
} from "./visibility";
import { linkageColumnVisibility } from "./columnVisibility";
import { linkageAvailability } from "./availability";

import {
    linkageDataSource,
    setInitialDataSource,
    setTableDataSource
} from "./dataSource";
import { linkageDataFill } from "./dataFill";

import { linkageProps } from "./props";
import { getExpressionVar, replacePathKey } from "./utils";

import { initValidator } from "./validator";

export {
    linkageDataFill,
    setTableDataSource,
    observerChainHidden,
    initValidator
};

/**
 * 获取需要关联设置状态的所有表单项
 * @param {*} name
 * @param {*} store
 * @param {*} instance
 */
function getLinkageItem(name, store = {}, instance, options) {
    let { index } = getItemIndex(name);

    //已被卸载的表单项不进行状态联动
    //display为false的表单项mounted为false
    function itemIsValid(_state) {
        if (_state) {
            //如果触发联动的是表格，则不应触发当前表格列本身的联动
            let runtime = _state.component?.[1]?.["x-runtime"] || {};
            if (runtime.isTableCellField && runtime.arrayPath === name) {
                return false;
            }
            return (
                _state.mounted === true ||
                ((_state.hidden === true || _state.visible === false) &&
                    _state.unmounted === true)
            );
        }
        return false;
    }

    function getItemState(_name) {
        //如果是表格列中的表单项，则需要替换items为当前行索引，以只联动当前编辑行的表单项
        if (_name.indexOf(".items.") > -1 && index > -1) {
            _name = _name.replace(".items.", "." + index + ".");
        }
        //

        return instance.getFieldState(_name);
    }

    //如果已被外部控制为隐藏，则不进行联动控制
    function isControledHidden(_name) {
        if (options?.[_name]?.visible === false) {
            return true;
        }
        return false;
    }

    //如果已被外部控制为禁用，则不进行联动控制
    function isControledDisabled(_name) {
        if (options?.[_name]?.disabled === true) {
            return true;
        }
        return false;
    }

    //如果触发源index和目标index均有值，则代码在表格内部联动
    //此时只允许联动同一行
    function isSameRowIndex(_name) {
        let { index: targetIndex } = getItemIndex(_name);
        if (targetIndex > -1 && index > -1 && targetIndex !== index) {
            return false;
        }
        return true;
    }

    let item = null;

    if (store[name]) {
        item = store[name];
    }

    //表格列中的公式计算，联动项存储时的路径是从公式中匹配出来的，都带有items
    //而onChange时的路径是带索引而不是带items的，所以查找联动项时需要讲索引替换为items，否则会找不到
    //场景：一个表单项既配置了属性联动又被公式计算引用时，如果不合并，则会导致公式计算不生效
    if (index > -1) {
        let _name = name.replace("." + index + ".", ".items.");
        let _item = store[_name];
        item = { ...item, ..._item };
    }
    //

    if (item) {
        item = { ...item };
        if (item.value instanceof Array) {
            item.value = item.value.filter(d => {
                return (
                    isSameRowIndex(d.name) && itemIsValid(getItemState(d.name))
                );
            });
        }

        if (item.visibility instanceof Array) {
            item.visibility = item.visibility.filter(d => {
                let _itemState = getItemState(d.name);
                let extraProps =
                    _itemState?.component?.[1]?.["x-extra-props"] || {};
                let _key = extraProps["data-key"];
                return (
                    isSameRowIndex(d.name) &&
                    !isControledHidden(_key) &&
                    itemIsValid(_itemState)
                );
            });
        }

        if (item.columnVisibility instanceof Array) {
            item.columnVisibility = item.columnVisibility.filter(d => {
                return isSameRowIndex(d.name) && !isControledHidden(d.name);
            });
        }

        if (item.availability instanceof Array) {
            item.availability = item.availability.filter(d => {
                let _itemState = getItemState(d.name);
                let extraProps =
                    _itemState?.component?.[1]?.["x-extra-props"] || {};
                let _key = extraProps["data-key"];
                return (
                    isSameRowIndex(d.name) &&
                    !isControledDisabled(_key) &&
                    itemIsValid(_itemState)
                );
            });
        }

        if (item.dataSource instanceof Array) {
            item.dataSource = item.dataSource.filter(d => {
                return (
                    isSameRowIndex(d.name) && itemIsValid(getItemState(d.name))
                );
            });
        }

        if (item.fieldProps instanceof Array) {
            item.fieldProps = item.fieldProps.filter(d => {
                return (
                    isSameRowIndex(d.name) && itemIsValid(getItemState(d.name))
                );
            });
        }
    }
    return item;
}

//添加所有被引用的表单项
export function addLinkageItem(targets, store, type, item) {
    let name = item.name;
    let path = item.path;
    let extraProps = item.extraProps || {};
    let ctype = item.componentName;
    let hiddenValue = false;

    let expression = null;

    if (type === "visibility") {
        if (
            typeof extraProps.visibility === "object" &&
            extraProps.visibility &&
            extraProps.visibility.type === "expression"
        ) {
            expression = extraProps.visibility.expression;
        }
        hiddenValue = extraProps.visibility?.hiddenValue ?? true;
    } else if (type === "columnVisibility") {
        if (
            typeof extraProps.columnVisibility === "object" &&
            extraProps.columnVisibility &&
            extraProps.columnVisibility.type === "expression"
        ) {
            expression = extraProps.columnVisibility.expression;
        }
    } else if (type === "value") {
        if (
            typeof extraProps.initialValue === "object" &&
            extraProps.initialValue
        ) {
            if (extraProps.initialValue.type === "expression") {
                expression = extraProps.initialValue.expression;
            } else if (extraProps.initialValue.type === "api") {
                let apiData = extraProps.initialValue.api;
                if (typeof apiData === "string") {
                    apiData = JSON.parse(apiData);
                }

                let _input = apiData?.input;
                if (_input instanceof Array) {
                    _input.forEach(d => {
                        if (d.type === "formItem" && d.value) {
                            let k = d.value;
                            let curr = {
                                name: name,
                                path: path,
                                component: ctype,
                                type: "api"
                            };

                            if (store[k]) {
                                let prev = store[k][type];
                                if (prev) {
                                    store[k][type] = [...prev, curr];
                                } else {
                                    store[k][type] = [curr];
                                }
                            } else {
                                store[k] = {
                                    [type]: [curr]
                                };
                            }
                        }
                    });
                }
            }
        }
    } else if (type === "availability") {
        if (
            typeof extraProps.availability === "object" &&
            extraProps.availability &&
            extraProps.availability.type === "expression"
        ) {
            expression = extraProps.availability.expression;
        }
    } else if (type === "dataSource") {
        let _dataSource = null;

        if (extraProps.dataSource) {
            _dataSource = JSON.parse(extraProps.dataSource);
        }

        if (typeof _dataSource === "object" && _dataSource) {
            if (_dataSource.type === "formItem") {
                let _dataSourceFormItem = _dataSource.data?.formItem;

                if (_dataSourceFormItem) {
                    let k = _dataSourceFormItem;

                    let curr = {
                        name: name,
                        path: path,
                        component: ctype,
                        dataSourceType: _dataSource.type
                    };

                    if (store[k]) {
                        let prev = store[k][type];
                        if (prev) {
                            store[k][type] = [...prev, curr];
                        } else {
                            store[k][type] = [curr];
                        }
                    } else {
                        store[k] = {
                            [type]: [curr]
                        };
                    }
                }
            } else if (_dataSource.type === "api") {
                let _input = _dataSource.data?.api?.input;

                if (_input instanceof Array) {
                    _input.forEach(d => {
                        if (d.type === "formItem" && d.value) {
                            let k = d.value;

                            let curr = {
                                name: name,
                                path: path,
                                component: ctype,
                                dataSourceType: _dataSource.type
                            };

                            if (store[k]) {
                                let prev = store[k][type];
                                if (prev) {
                                    store[k][type] = [...prev, curr];
                                } else {
                                    store[k][type] = [curr];
                                }
                            } else {
                                store[k] = {
                                    [type]: [curr]
                                };
                            }
                        }
                    });
                }
            }
        }

        return;
    } else if (type === "fieldProps") {
        let linkageProps = extraProps.linkageProps;

        if (linkageProps instanceof Array) {
            linkageProps.forEach(d => {
                if (d.targetField && d.name) {
                    let k = name;
                    let curr = {
                        name: d.targetField,
                        type: d.type,
                        expression: d.value,
                        property: d.name
                    };

                    if (store[k]) {
                        let prev = store[k][type];
                        if (prev) {
                            store[k][type] = [...prev, curr];
                        } else {
                            store[k][type] = [curr];
                        }
                    } else {
                        store[k] = {
                            [type]: [curr]
                        };
                    }
                }
            });
        }
        return;
    }

    //表达式支持两种数据格式，数组（兼容以前的配置）、字符串
    if (typeof expression === "string" && expression) {
        let currvExpression = {
            name: name,
            path: path,
            component: ctype,
            expression: expression,
            hiddenValue: !!hiddenValue
        };

        if (targets[name]) {
            let prev = targets[name][type];
            if (prev) {
                targets[name][type] = [...prev, currvExpression];
            } else {
                targets[name][type] = [currvExpression];
            }
        } else {
            targets[name] = {
                [type]: [currvExpression]
            };
        }

        //匹配出的表单项使用map方式进行去重
        let expressionItems = {};

        //匹配出表达式中的所有相关表单项
        let matched = expression.match(/value\('(\w|-|.items.)+'\)/g);
        if (matched) {
            matched.forEach(i => {
                let v = i.replace(/value\('([^<]*?)'\)/g, "$1");
                expressionItems[v] = {
                    type: "value",
                    value: v
                };
            });
        }

        for (const p in expressionItems) {
            const d = expressionItems[p];
            let k = d.value;

            if (d && d.type === "value") {
                if (store[k]) {
                    let prev = store[k][type];
                    if (prev) {
                        store[k][type] = [...prev, currvExpression];
                    } else {
                        store[k][type] = [currvExpression];
                    }
                } else {
                    store[k] = {
                        [type]: [currvExpression]
                    };
                }

                //如果是表格的列被引用，则表格状态变化时也触发联动
                //注意：此方式比较耗费性能；比如：一行数据中存在多个联动字段，每次字段联动后都会触发表格的onChange；
                //但如果表格change不触发联动，会导致存在默认值的列在新增、删除行时，无法正确联动到外部字段
                if (k.indexOf(".items.") > -1) {
                    let { parentKey: pk } = getItemIndex(k);
                    if (pk) {
                        if (store[pk]) {
                            let prev = store[pk][type];
                            if (prev) {
                                store[pk][type] = [...prev, currvExpression];
                            } else {
                                store[pk][type] = [currvExpression];
                            }
                        } else {
                            store[pk] = {
                                [type]: [currvExpression]
                            };
                        }
                    }
                }
                //
            }
        }
    }
}

function triggerLinkage(
    schema,
    linkageItemMap,
    instance,
    _evaluator,
    fieldActionTargetMap,
    options
) {
    //虽然会进此生命周期但组件可能还未挂载，此时不做任何处理
    if (schema.mounted === false) {
        return;
    }
    let name = schema.name;

    /*********条件表达式处理**********/

    //此表单项是否被联动引用
    let linkageItem = getLinkageItem(name, linkageItemMap, instance, options);
    if (linkageItem) {
        linkageValue(linkageItem, instance, _evaluator, "", schema);
        linkageVisibility(linkageItem, instance, _evaluator);
        linkageAvailability(linkageItem, instance, _evaluator);
        linkageProps(linkageItem, schema, instance, _evaluator);
        linkageColumnVisibility(linkageItem, instance, _evaluator);
        linkageDataSource(
            schema,
            linkageItem,
            instance,
            ["api", "formItem"],
            fieldActionTargetMap,
            _evaluator
        );
    }
}

function triggerLinkageDataSource(
    schema,
    linkageItemMap,
    instance,
    _evaluator,
    fieldActionTargetMap,
    options
) {
    //虽然会进此生命周期但组件可能还未挂载，此时不做任何处理
    if (schema.mounted === false) {
        return;
    }
    let name = schema.name;

    /*********条件表达式处理**********/

    //此表单项是否被联动引用
    let linkageItem = getLinkageItem(name, linkageItemMap, instance, options);
    if (linkageItem) {
        linkageDataSource(
            schema,
            linkageItem,
            instance,
            ["api", "formItem"],
            fieldActionTargetMap,
            _evaluator
        );
    }
}

//debounce(_triggerLinkage, 100); 使用debounce会导致_triggerLinkage执行次数变少，部分联动会失效
//比如：表格下拉列触发数据源联动

export { triggerLinkage, triggerLinkageDataSource };

function getFieldInitOptions(schema, _evaluator) {
    let extraProps = schema.extraProps || {};
    let name = schema.name;

    let expressionVar = getExpressionVar(name);
    //初始属性，模板中配置的属性
    let initOptions = {};
    if (typeof extraProps === "object" && extraProps) {
        //显示、隐藏
        let visibility = extraProps.visibility;

        if (extraProps.hidden === true) {
            initOptions.hidden = true;
        } else if (typeof visibility === "object" && visibility) {
            let hiddenValue = visibility.hiddenValue ?? true;
            let res = true;
            if (visibility.type === "visible") {
                res = true;
            } else if (visibility.type === "hidden") {
                res = false;
            } else if (visibility.type === "expression") {
                //表达式求值
                res =
                    _evaluator.evaluate(
                        visibility.expression,
                        expressionVar
                    ) !== true;
            }

            if (hiddenValue === true) {
                initOptions.visible = res;
            } else {
                initOptions.hidden = !res;
            }
        }

        //是否可编辑
        let availability = extraProps.availability;
        if (typeof availability === "object" && availability) {
            let res = false;
            if (availability.type === "disabled") {
                res = true;
            } else if (availability.type === "enabled") {
                res = false;
            } else if (availability.type === "expression") {
                //表达式求值
                res =
                    _evaluator.evaluate(
                        availability.expression,
                        expressionVar
                    ) === true;
            }
            initOptions.disabled = res;
        }

        //是否只读
        let readonly = extraProps.readonly;
        if (readonly === true) {
            initOptions.readonly = true;
        }

        //是否必填
        let required = schema.required;
        if (required === true) {
            initOptions.required = true;
        }
    }

    return initOptions;
}

function getFieldControledOptions(schema, _evaluator, allOptions) {
    let extraProps = schema.extraProps || {};
    let itemKey = extraProps["data-key"];

    //初始属性，模板中配置的属性
    let initOptions = getFieldInitOptions(schema, _evaluator);

    let options = allOptions[itemKey];

    //需要控制的属性，模板中配置的属性不为禁用时，方通过传入的参数进行控制
    //模板中的状态如果为禁用，则优先级最高，否则通过参数控制
    let controlOptions = {};

    if (typeof options === "object" && options) {
        if (
            typeof options.visible === "boolean" &&
            initOptions.visible !== false &&
            initOptions.hidden !== true
        ) {
            controlOptions.hidden = !options.visible; //外部options控制，只控制样式上的是否可见
        }
        if (
            typeof options.disabled === "boolean" &&
            initOptions.disabled !== true
        ) {
            controlOptions.disabled = options.disabled;
        }

        if (
            typeof options.required === "boolean" &&
            initOptions.required !== true
        ) {
            controlOptions.required = options.required;
        }

        if (options.readonly === true && initOptions.readonly !== true) {
            controlOptions.disabled = true; //由于许多属性不支持readonly，故直接控制disabled
        }
    }

    let _initOptions = Object.assign({}, initOptions, controlOptions);

    //表格列头中的控件，如果为禁用，直接不显示
    if (extraProps?.renderInHeader === true) {
        if (_initOptions.disabled === true) {
            _initOptions.hidden = true;
        }
    }
    //

    return _initOptions;
}

/**
 * 设置表单项权限
 * 模板中配置的属性不为禁用时，方通过传入的参数进行控制;模板中的状态如果为禁用，则优先级最高，否则通过参数控制
 * @param {} state
 * @param {*} allOptions 通过options属性传递的权限
 * @param {*} _evaluator
 * @param {*} form
 */
function setFieldOptions(schema, allOptions, _evaluator, form) {
    let extraProps = schema.extraProps || {};
    let name = schema.name;
    let ctype = schema.componentName;

    function _setFieldOptions(name, options) {
        form.setFieldState(name, state => {
            for (const ck in options) {
                if (ck === "visible") {
                    state.visible = options[ck]; //visible如果为false，value值将会被清空
                    //如果表单项值为隐藏，则对应的name字段也应该隐藏值
                    setExtraNameFieldVisibility(state, form, options[ck]);
                    //
                } else if (ck === "hidden") {
                    state.hidden = options[ck]; //hidden如果为false，只会隐藏控件不会隐藏值
                } else if (ck === "disabled") {
                    //state.disabled = options[ck];
                    state.componentProps.disabled = options[ck];
                } else if (ck === "readonly") {
                    state.componentProps.readOnly = options[ck];
                } else if (ck === "required") {
                    state.required = options[ck];
                } else {
                    state[ck] = options[ck];
                }
            }
        });
    }

    let _initOptions = getFieldControledOptions(
        schema,
        _evaluator,
        allOptions || {}
    );

    if (Object.keys(_initOptions).length > 0) {
        if (ctype === "tabpane") {
            linkageTabPaneVisible(
                form,
                name,
                extraProps["data-path"],
                _initOptions.visible
            );
        } else {
            _setFieldOptions(name, _initOptions);
        }
    }
}

export function initFieldOptions(schema, field, allOptions, _evaluator, form) {
    let extraProps = schema.extraProps || {};

    //忽略存在extraNameFieldKey的控件，否则会导致对应的name值无法设置成功
    if (extraProps.extraNameFieldKey) {
        return;
    }

    let ctype = schema.componentName;
    let name = schema.name;
    function _setFieldOptions(options) {
        if (field) {
            for (const ck in options) {
                if (ck === "visible") {
                    field.visible = options[ck]; //visible如果为false，value值将会被清空
                } else if (ck === "hidden") {
                    field.hidden = options[ck]; //hidden如果为false，只会隐藏控件不会隐藏值
                } else if (ck === "disabled") {
                    //field.disabled = options[ck];
                    field.componentProps.disabled = options[ck];
                } else if (ck === "readonly") {
                    field.componentProps.readOnly = options[ck];
                } else if (ck === "required") {
                    field.required = options[ck];
                } else {
                    field[ck] = options[ck];
                }
            }
        }
    }
    let _initOptions = getFieldControledOptions(
        schema,
        _evaluator,
        allOptions || {}
    );

    if (Object.keys(_initOptions).length > 0) {
        if (ctype === "tabpane") {
            linkageTabPaneVisible(
                form,
                name,
                extraProps["data-path"],
                _initOptions.visible
            );
        } else {
            _setFieldOptions(_initOptions);
        }
    }
}

export function triggerExtraFieldValue(schema, instance) {
    let extraProps = schema.extraProps || {};

    //如果存在额外的显示字段项，当值改变时设置显示值
    if (
        schema.display !== "none" &&
        schema.mounted === true &&
        extraProps &&
        extraProps.extraNameFieldKey
    ) {
        let extraNameFieldPath = replacePathKey(
            schema.path,
            extraProps.extraNameFieldKey
        );

        instance.setFieldState(extraNameFieldPath, s => {
            s.value = schema.values[1];
        });
    }
    //
}

export function triggerRelatedInputValues(schema, instance) {
    let extraProps = schema.extraProps || {};

    if (extraProps && extraProps.relatedKey) {
        let relatedFieldPath = replacePathKey(
            schema.path,
            extraProps.relatedKey
        );
        let field = instance.query(relatedFieldPath).take();
        if (field) {
            field.setState(s => {
                s.inputValues = [s.value, schema.value];
                s.componentProps = { ...s.componentProps };
            });
        }
    }
}

function setSelectable(schema, instance, _evaluator) {
    let extraProps = schema.extraProps || {};
    let name = schema.name;
    let ctype = schema.componentName?.toLowerCase();

    if (ctype === "datepicker" || ctype === "monthpicker") {
        let expressionVar = getExpressionVar(name);

        let dateItemSelectable = extraProps.itemSelectable;
        if (
            dateItemSelectable &&
            dateItemSelectable.type === "expression" &&
            dateItemSelectable.expression
        ) {
            instance.setFieldState(name, s => {
                s.componentProps.disabledDate = currDate => {
                    let v = currDate;
                    if (typeof currDate.format === "function") {
                        v = currDate.format("YYYY-MM-DD");
                    }
                    let res = _evaluator.evaluate(
                        extraProps.itemSelectable.expression,
                        expressionVar,
                        { value: v }
                    );
                    return res;
                };
            });
        }
    }
}

//如果当前值为扩展隐藏字段（比如name字段），初始值设置完成后，将值反写到关联字段的values中以便后续消费
function setInitialRelatedInputValues(schema, instance, initialValue) {
    let extraProps = schema.extraProps || {};
    let value = initialValue;
    //如果id字段已经存在值，则不需要再使用默认值；因为第二次打开表单时不存在默认值
    if (typeof schema.value !== "undefined") {
        value = schema.value;
    }
    //
    if (extraProps.relatedKey && typeof value !== "undefined") {
        let idFieldPath = replacePathKey(schema.path, extraProps.relatedKey);
        instance.setFieldState(idFieldPath, s => {
            s.inputValues = [s.value, value];
            s.componentProps = { ...s.componentProps };
        });
    }
}

export function refreshInitialValue(schema, instance, loading, _evaluator) {
    let initialValue = setInitialValue(schema, instance, loading, _evaluator);
    //必须设置inputValues,因为第二次打开表单时，values已经传递给form的initialValues，未触发onFieldValueChange，
    //所以必须在此手动设置
    setInitialRelatedInputValues(schema, instance, initialValue);
    //
}

export function setInitialOptions(
    schema,
    instance,
    loading,
    options,
    _evaluator
) {
    let { index: triggerIndex } = getItemIndex(schema.path);
    refreshInitialValue(schema, instance, loading, _evaluator);
    setFieldOptions(schema, options, _evaluator, instance);
    setInitialDataSource(schema, instance, _evaluator, triggerIndex);
    setSelectable(schema, instance, _evaluator);
}

export function linkageAsyncValue(
    schema,
    linkageItemMap,
    instance,
    _evaluator,
    options
) {
    let name = schema.name;
    let linkageItem = getLinkageItem(name, linkageItemMap, instance, options);

    if (linkageItem) {
        linkageValue(linkageItem, instance, _evaluator, "api", schema);
    }
}
