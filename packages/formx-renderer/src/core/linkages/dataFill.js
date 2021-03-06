import { FormPath } from "@formily/shared";
import { getExpressionVar } from "./utils";

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
 * ??? array.items.key1 ??????items???????????????????????????????????????
 * @param {string} path ??????items?????????
 * @param {*} form
 */
function transformArrayItemsPath(path, form, expressionVar) {
    let index = -1;

    if (expressionVar?.items) {
        index = Number(expressionVar.items);
    }

    let _path = path;
    if (index > -1) {
        _path = path.replace(".items.", "." + index + ".");
    }

    return _path;
}

//????????????
export function linkageDataFill(instance, schema, _evaluator) {
    let values = schema.values;
    let dataValues = values;

    let _dataFill = schema.extraProps?.dataFill;
    let dataFill = formatDataFill(_dataFill);
    let expressionVar = getExpressionVar(schema.name);

    if (dataFill instanceof Array && dataFill.length > 0) {
        for (let i = 0; i < dataFill.length; i++) {
            let d = dataFill[i];
            let targetField = transformArrayItemsPath(
                d.targetField,
                instance,
                expressionVar
            );
            let field = d.field;
            //????????????,?????????onChange??????????????????????????????????????????????????????????????????????????? ??????????????????value ??????????????????label
            let parameterIndex = 2;
            if (isNum(d.parameterIndex) && d.parameterIndex > -1) {
                parameterIndex = d.parameterIndex;
            }
            dataValues = values[parameterIndex];

            if (field && targetField) {
                //??????????????????????????????????????????????????????
                if (isNull(values[0])) {
                    instance.setFieldState(
                        targetField,
                        s => (s.value = undefined)
                    );
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
                        //??????????????????????????????????????????????????????????????????
                        let valueFieldMap = d.fieldMap;
                        if (value instanceof Array) {
                            value.forEach(d => {
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
                                    d[fm.field] = _value;
                                }
                                //???????????????????????????rowKey??????
                                Reflect.deleteProperty(d, "__KEY__");
                            });
                        }
                        instance.setFieldState(targetField, s => {
                            let nextValue = [];
                            if (d.fillMode === "append") {
                                nextValue = []
                                    .concat(s.value || [])
                                    .concat(value);
                            } else if (d.fillMode === "prepend") {
                                nextValue = []
                                    .concat(value)
                                    .concat(s.value || []);
                            } else {
                                nextValue = value;
                            }
                            s.value = nextValue;
                        });
                    } else {
                        instance.setFieldState(
                            targetField,
                            s => (s.value = value)
                        );
                    }
                }
            }
        }
    }
}
