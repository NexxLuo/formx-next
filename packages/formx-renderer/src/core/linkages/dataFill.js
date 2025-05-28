import { FormPath } from "@formily/shared";
import { getExpressionVar } from "./utils";
import { getItemIndex } from "../utils";
import { ArrayValues } from "../reactions/Field";

function formatDataFill(dataFill) {
    let arr = [];

    let childrenToParents = {};
    if (dataFill instanceof Array) {
        dataFill.forEach(d => {
            let pathArr = d.field.split(".");
            let parentKey = pathArr.slice(0, pathArr.length - 1).join(".");
            if (parentKey) {
                if (parentKey in childrenToParents) {
                    childrenToParents[parentKey].push(d);
                } else {
                    childrenToParents[parentKey] = [d];
                }
            }
        });

        dataFill.forEach(d => {
            let o = {
                ...d
            };

            if (d.type === "arrayItem") {
            } else if (d.type === "array") {
                let _fieldMap = {};

                let childrens = childrenToParents[d.field] || [];
                if (childrens instanceof Array) {
                    childrens.forEach(_d => {
                        if (_d.field && _d.targetField) {
                            let _pathArr = _d.field.split(".");
                            let _field = _pathArr[_pathArr.length - 1];
                            let _targetPathArr = _d.targetField.split(".");
                            let _targetField =
                                _targetPathArr[_targetPathArr.length - 1];
                            _fieldMap[_field] = {
                                field: _targetField,
                                expression: _d.expression
                            };
                        }
                    });
                }

                if (Object.keys(_fieldMap).length > 0) {
                    o.fieldMap = _fieldMap;
                }
                arr.push(o);
            } else {
                arr.push(o);
            }
        });
    }

    return arr;
}

function getChildrenGraph(graph, path) {
    let items = [];
    for (const k in graph) {
        if (graph.hasOwnProperty(k)) {
            const g = graph[k];
            if (g.path && g.path !== path && g.path.indexOf(path) > -1) {
                items.push(g);
            }
        }
    }
    return items;
}

function isNum(v) {
    return isNaN(v) === false && v !== null;
}

function isNull(v) {
    let bl = false;
    if (typeof v === "object") {
        if (v instanceof Array) {
            bl = v.length === 0;
        } else {
            bl = v === null;
        }
    } else if (typeof v === "string") {
        bl = !v;
    } else if (typeof v === "number") {
        bl = isNaN(v);
    } else if (typeof v === "undefined") {
        bl = true;
    }

    return bl;
}

function isValidObject(v) {
    if (typeof v === "object") {
        return v !== null || v instanceof Array;
    }
    return false;
}

/**
 * 将 array.items.key1 中的items转换为表格正在编辑中的索引
 * @param {string} path 包含items的路径
 * @param {*} form
 */
function transformArrayItemsPath(path, form, expressionVar) {
    let index = -1;

    if (!isNull(expressionVar?.items)) {
        index = Number(expressionVar.items);
    }

    //当为弹窗进行数据联动到表格时，由于触发源为弹窗，源schema不存在表格的行索引
    //故需要通过表格状态去查找正在编辑的行索引，否则无法联动
    if (!(index > -1)) {
        index = Number(getItemIndex(path, form).index)
    }

    let _path = path;
    if (index > -1) {
        _path = path.replace(".items.", "." + index + ".");
    } else {
        //当items未匹配上时，可能是表格弹窗编辑，此时联动的目标字段路径应进行重写
        let { parentKey, key } = getItemIndex(_path);
        if (_path.indexOf(".items.") > -1) {
            _path = "__DATA__." + parentKey + ".EDIT_ROW." + key;
        }
        //
    }

    return _path;
}

//数据回填
export function linkageDataFill(instance, schema, _evaluator, itemsIndex) {
    let values = schema.values;
    let dataValues = values;

    let _dataFill = schema.extraProps?.dataFill;
    let dataFill = formatDataFill(_dataFill);
    let expressionVar = getExpressionVar(schema.name);

    //部分情况下需要外部传递index，比如外部弹窗联动设置表格行字段
    //此时索引由弹窗的getActionArgs方法提供
    if (typeof itemsIndex === "number") {
        expressionVar.items = itemsIndex;
    }

    if (dataFill instanceof Array && dataFill.length > 0) {
        for (let i = 0; i < dataFill.length; i++) {
            let d = dataFill[i];
            let targetFieldPath = transformArrayItemsPath(
                d.targetField,
                instance,
                expressionVar
            );
            let field = d.field;
            //参数索引,默认取onChange中的第三个参数为数据回填的数据源，下拉、字典等组件 第一个参数为value 第二个参数为label
            let parameterIndex = 2;
            if (isNum(d.parameterIndex) && d.parameterIndex > -1) {
                parameterIndex = d.parameterIndex;
            }
            dataValues = values[parameterIndex];

            var targetField = null;
            if (targetFieldPath) {
                targetField = instance.query(targetFieldPath).take();
            }

            if (field && targetField) {
                //如果是清空值，则清空数据联动的所有值
                if (isNull(values[0])) {
                    if (!isNull(targetField.value)) {
                        targetField.onInput(undefined)
                    }
                    continue;
                }

                if (!isValidObject(dataValues)) {
                    console.error(
                        `Values is not a valid object in index "${parameterIndex}":`,
                        values,
                        schema
                    );
                    continue;
                }

                let bl = true;
                let value = undefined;

                try {
                    if (FormPath.existIn(dataValues, field)) {
                        value = FormPath.getIn(dataValues, field);
                    } else {
                        if (d.expression) {
                            value = dataValues;
                            console.warn(
                                `Field path not found:"${field}" in values :`,
                                dataValues,
                                ",will get it from expression.",
                                schema
                            );
                        } else {
                            bl = false;
                            console.error(
                                `DataFill execute failed.Field path not found:"${field}" in values :`,
                                dataValues,
                                ",and without any expression.",
                                schema
                            );
                        }
                    }
                } catch (e) {
                    bl = false;
                    console.error(
                        `DataFill execute failed.Field path pattern error:"${field}"`,
                        schema
                    );
                }

                if (bl === true) {
                    if (d.expression) {
                        value = _evaluator.evaluate(
                            d.expression,
                            {},
                            {
                                value: value
                            }
                        );
                    }

                    if (d.fieldMap) {
                        //如果存在字段映射，数组类型数据则进行字段对应
                        let valueFieldMap = d.fieldMap;
                        if (value instanceof Array) {
                            value = value.map(d => {
                                let item = {};
                                for (const k in valueFieldMap) {
                                    let fm = valueFieldMap[k];
                                    let _value = d[k];
                                    if (fm.expression) {
                                        _value = _evaluator.evaluate(
                                            fm.expression,
                                            {},
                                            d
                                        );
                                    }
                                    //数据联动未配置目标回填字段时，则不设置此字段至目标表格
                                    if (!isNull(fm.field)) {
                                        item[fm.field] = _value;
                                    }
                                }
                                return item;
                            });

                            //数据回填时是否执行数据联动逻辑
                            if (schema.extraProps?.executeLinkageWhenDataFill === true) {
                                let arraySchema = instance.formActions.getFieldSchema(targetField.path.toString());
                                if (arraySchema) {
                                    let array = new ArrayValues(arraySchema, instance);
                                    array.init(value, {}, true);
                                    value = array.getValue(true);
                                }
                            }
                            //
                        }

                        let prevValue = targetField.getState().value;
                        let nextValue = [];
                        if (d.fillMode === "append") {
                            nextValue = []
                                .concat(prevValue || [])
                                .concat(value);
                        } else if (d.fillMode === "prepend") {
                            nextValue = []
                                .concat(value)
                                .concat(prevValue || []);
                        } else {
                            nextValue = value;
                        }

                        targetField.onInput(nextValue)

                    } else {
                        //非表格组件不可使用onInput处理数据回填，会导致name字段被设置为空值
                        targetField.setValue(value)
                    }
                }
            }
        }
    }
}
