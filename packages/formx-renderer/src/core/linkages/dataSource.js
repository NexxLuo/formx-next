import { getEnv } from "./utils";
import { getItemIndex } from "../utils";
import { requestApiById, getRequestParams } from "../../extensions/utils";

import { useAsyncData, useAsyncListData } from "../effects/useAsyncDataSource";

export function setTableDataSource(schema, instance, extraParameters, context) {
    let name = schema.name;
    let apiUrl = "";
    let apiId = "";
    let apiOutput = [];
    let apiInput = [];
    let dataSource = {};
    let hasPagination = false;
    let _pagination = {};

    let extraProps = schema.extraProps;
    if (extraProps) {
        if (extraProps.dataSource) {
            dataSource = JSON.parse(extraProps.dataSource);
            let d = dataSource.data || {};
            if (dataSource.type === "api") {
                if (d.api) {
                    apiUrl = d.api.url;
                    apiId = d.api.dataSourceId;
                    apiOutput = d.api.output;
                    apiInput = d.api.input;
                }
            }
        }

        if (extraProps.pagination && extraProps.pagination.enabled) {
            hasPagination = true;
            _pagination = {
                pageIndex: 1,
                pageSize: extraProps.pagination.pageSize || 20
            };
        }
    }

    if (extraParameters) {
        if ("pageIndex" in extraParameters) {
            _pagination.pageIndex = extraParameters.pageIndex ?? 1;
        }

        if ("pageSize" in extraParameters) {
            _pagination.pageSize = extraParameters.pageSize ?? 20;
        }
    }

    if (dataSource.type === "api") {
        if (apiUrl || apiId) {
            let envs = {
                pageIndex: 1
            };

            if (hasPagination) {
                if ("pageIndex" in _pagination) {
                    envs.pageIndex = _pagination.pageIndex;
                }
                if ("pageSize" in _pagination) {
                    envs.pageSize = _pagination.pageSize;
                }
            }

            let requestParams =
                getRequestParams(apiInput, instance, envs, getEnv) || {};

            //?????????????????????????????????????????????????????????????????????
            instance.notify(name + "_onFieldRequestDataSource", {
                requestParameters: requestParams,
                pagination: _pagination,
                context
            });
            //

            useAsyncListData(instance, {
                name: name,
                service: requestApiById,
                pagination: _pagination,
                extra: {
                    form: instance,
                    id: apiId,
                    runtime: extraParameters,
                    input: requestParams,
                    output: apiOutput,
                    env: envs
                }
            });
        }
    } else if (dataSource.type === "const") {
        if (dataSource.data && dataSource.data.const instanceof Array) {
            instance.setFieldState(name, state => {
                state.value = dataSource.data.const;
                if (hasPagination) {
                    state.componentProps.pagination = {
                        ..._pagination
                    };
                }
            });
        }
    } else {
        if (hasPagination) {
            instance.setFieldState(name, state => {
                state.componentProps.pagination = {
                    ..._pagination
                };
            });
        }
    }
}

/**
 * ???????????????????????????????????????
 * @param {*} name
 * @param {*} extraProps
 * @param {*} instance
 * @param {number} triggerIndex ??????????????????????????????
 */
export function setInitialDataSource(
    schema,
    instance,
    _evaluator,
    triggerIndex
) {
    let ctype = schema.componentName?.toLowerCase();

    //????????????????????????????????????????????????????????????
    //?????????????????????
    //???????????????????????????????????????????????????????????????
    if (
        ctype !== "arraytable" &&
        schema.alwaysDisabled === true &&
        schema.requestDataSourceWhenDisabled === false
    ) {
        return;
    }
    let extraProps = schema.extraProps || {};

    let name = schema.name;
    let _dataSource = null;
    let _dataFilterExpr = null;
    if (extraProps) {
        if (extraProps.dataSource) {
            _dataSource = JSON.parse(extraProps.dataSource);
        }

        if (extraProps.dataFilter) {
            _dataFilterExpr = extraProps.dataFilter.expression;
        }
    }

    if (typeof _dataSource === "object" && _dataSource) {
        if (_dataSource.type === "const") {
            if (ctype === "arraytable") {
                setTableDataSource(
                    schema,
                    instance,
                    {},
                    { triggerType: "effects" }
                );
            }
        } else if (_dataSource.type === "formItem") {
            let fields = _dataSource.data?.formItemFields;
            let formItem = _dataSource.data?.formItem;
            let valueList = [];
            let values = [];

            if (formItem) {
                let formItemState = instance.getFieldState(formItem);
                if (formItemState) {
                    let formItemType =
                        formItemState.component[1]?.[
                            "x-extra-props"
                        ]?.name?.toLowerCase();
                    if (formItemType === "arraytable") {
                        values = formItemState.value;
                    } else {
                        values = formItemState.dataSource;
                    }
                }
            }

            if (fields instanceof Array && values instanceof Array) {
                valueList = values.map(item => {
                    let newItem = {
                        ...item
                    };
                    fields.forEach(d => {
                        if (d.field) {
                            if (d.fieldMap) {
                                newItem[d.fieldMap] = newItem[d.field] ?? "";
                            }
                            if (d.targetField) {
                                let { dataIndex } = getItemIndex(d.targetField);
                                if (dataIndex) {
                                    newItem[dataIndex] = newItem[d.field] ?? "";
                                }
                            }
                        }
                    });
                    return newItem;
                });

                instance.setFieldState(name, s => {
                    let _ctype =
                        s.componentProps?.[
                            "x-extra-props"
                        ]?.name?.toLowerCase();
                    if (_ctype === "arraytable") {
                        s.value = valueList;
                    } else {
                        s.dataSource = valueList;
                    }
                });
            }
        } else if (_dataSource.type === "api") {
            if (ctype === "arraytable") {
                setTableDataSource(
                    schema,
                    instance,
                    {},
                    { triggerType: "effects" }
                );
            } else {
                let apiUrl = "";
                let apiId = "";
                let apiOutput = [];
                let apiInput = [];
                let apiData = _dataSource.data?.api;

                if (apiData) {
                    apiUrl = apiData.url;
                    apiId = apiData.dataSourceId;
                    apiOutput = apiData.output;
                    apiInput = apiData.input;
                }

                if (apiUrl || apiId) {
                    useAsyncData(
                        instance,
                        {
                            name: name,
                            service: requestApiById,
                            extra: {
                                form: instance,
                                id: apiId,
                                input: getRequestParams(
                                    apiInput,
                                    instance,
                                    {},
                                    getEnv,
                                    { index: triggerIndex }
                                ),
                                output: apiOutput
                            }
                        },
                        data => {
                            if (data instanceof Array && _dataFilterExpr) {
                                let arr = data.filter(d => {
                                    let res = _evaluator.evaluate(
                                        _dataFilterExpr,
                                        {},
                                        d
                                    );
                                    return res;
                                });
                                return arr;
                            }
                            return data;
                        }
                    );
                }
            }
        }
    }
}

function formatState(field) {
    let componentProps = field.component[1] || {};
    let extraProps = componentProps["x-extra-props"];
    return {
        name: field.path.toString(),
        path: field.address.toString(),
        modified: field.modified,
        selfModified: field.selfModified,
        initialValue: field.initialValue,
        value: field.value,
        values: field.inputValues,
        required: field.required,
        extraProps,
        componentProps,
        componentName: extraProps?.name
    };
}

/**
 * ?????????????????????,???????????????
 * @param {*} name
 * @param {*} values
 */
export function linkageDataSource(
    schema,
    linkageItem,
    instance,
    dataSourceType,
    fieldActionTargetMap = {},
    _evaluator
) {
    let { index: triggerIndex } = getItemIndex(schema.path);

    let linkageItemDataSource = [];
    if (linkageItem.dataSource instanceof Array) {
        linkageItemDataSource = linkageItem.dataSource;
    }

    //?????????????????????????????????????????????????????????????????????????????????????????????????????????onChange?????????api??????
    //???????????????????????????????????????????????????????????????????????????????????????????????????????????????change???????????????????????????????????????????????????????????????????????????????????????
    if (linkageItemDataSource.length > 0 && dataSourceType === "api") {
        linkageItemDataSource = linkageItemDataSource.filter(d => {
            let actionTarget = fieldActionTargetMap[d.name];
            if (
                actionTarget instanceof Array &&
                actionTarget.findIndex(_d => _d.type === "queryData") > -1
            ) {
                return false;
            }
            return true;
        });
    }
    //

    linkageItemDataSource.forEach(d => {
        if (d.dataSourceType === dataSourceType) {
            let state = instance.getFieldState(d.name);
            if (state) {
                let schema = formatState(state);
                setInitialDataSource(
                    schema,
                    instance,
                    _evaluator,
                    triggerIndex
                );
            }
        }
    });
}
