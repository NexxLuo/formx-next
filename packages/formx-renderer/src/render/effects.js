import { clone } from "@formily/shared";
import { createEvaluator } from "../extensions/utils";

import {
    addLinkageItem,
    triggerLinkage,
    setInitialOptions,
    triggerExtraFieldValue,
    triggerRelatedInputValues,
    linkageDataFill,
    setTableDataSource,
    observerChainHidden,
    initFieldOptions,
    linkageAsyncValue,
    initValidator
} from "../core/linkages";
import { mapSchemaItems } from "../core/utils";

import { setActions, triggerItemActions } from "../core/actions";

function formatField(field, options) {
    let componentProps = clone(field.componentProps || {});
    let extraProps = componentProps["x-extra-props"] || {};
    let controledOptions = options?.[extraProps["data-key"]] || {};
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
        componentName: extraProps?.name,
        unmounted: field.unmounted,
        mounted: field.mounted,
        visible: field.visible,
        display: field.display,
        alwaysDisabled:
            controledOptions.disabled === true ||
            controledOptions.readonly === true,
        requestDataSourceWhenDisabled: extraProps.requestDataSourceWhenDisabled
    };
}

function formatSchema(schema) {
    let componentProps = schema["x-component-props"] || {};
    let extraProps = componentProps?.["x-extra-props"] || {};
    return {
        name: schema.name,
        path: schema.name,
        extraProps: extraProps,
        componentName: extraProps.name,
        componentProps
    };
}

export const createEffects = ($, instance, _consumer) => {
    let linkageTargetMap = {};
    let linkageItemMap = {};
    //所有被指定为控件动作目标的表单项
    let fieldActionTargetMap = {};

    function getContext() {
        let { formSchemaMap, options, loading } = _consumer();
        return {
            formSchemaMap: formSchemaMap ?? {},
            options: options ?? {},
            loading: loading ?? false
        };
    }

    function getSchema(name) {
        let formSchemaMap = getContext().formSchemaMap;
        return formSchemaMap[name];
    }
    //创建表达式计算实例，并传递上下文
    let _evaluator = createEvaluator(instance);

    //由于unmounted后field.selfErrors会被清除
    //故在此记录以便表格非编辑状态下展示错误信息
    $("onFieldValidateEnd").subscribe(field => {
        if (field.mounted) {
            field.setState(state => {
                let prev = state.data;
                let next = {};
                if (prev) {
                    next = {
                        ...prev,
                        selfErrors: field.selfErrors
                    };
                } else {
                    next = {
                        selfErrors: field.selfErrors
                    };
                }
                state.data = next;
            });
        }
    });

    $("onFieldInit").subscribe((field, form) => {
        let schema = formatField(field, getContext().options);
        //数据表达式
        addLinkageItem(linkageTargetMap, linkageItemMap, "value", schema);
        addLinkageItem(linkageTargetMap, linkageItemMap, "visibility", schema);
        addLinkageItem(
            linkageTargetMap,
            linkageItemMap,
            "availability",
            schema
        );
        addLinkageItem(linkageTargetMap, linkageItemMap, "fieldProps", schema);

        addLinkageItem(linkageTargetMap, linkageItemMap, "dataSource", schema);

        //表格列隐藏条件表达式
        if (schema.componentName === "ArrayTable") {
            let itemsSchema = getSchema(schema.name);
            mapSchemaItems(itemsSchema?.items, o => {
                addLinkageItem(
                    linkageTargetMap,
                    linkageItemMap,
                    "columnVisibility",
                    {
                        ...formatSchema(o),
                        path: schema.name
                    }
                );
            });

            //订阅表格数据加载事件
            form.subscribe(params => {
                let payload = params.payload || {};
                if (params.type === schema.name + "_reload") {
                    let { context: _context, ..._payload } =
                        payload.payload || {};
                    setTableDataSource(
                        schema,
                        form,
                        { ..._payload },
                        { ..._context, triggerType: "dispatch" }
                    );
                }
            });
            //
        }

        //记录被指定为控件动作目标的表单项
        let extraProps = schema.extraProps || {};

        if (typeof extraProps.actions === "object" && extraProps.actions) {
            let actionType = extraProps.actions.type;
            let actionTarget = extraProps.actions.targetField;
            if (actionTarget && actionType) {
                if (fieldActionTargetMap[actionTarget]) {
                    fieldActionTargetMap[actionTarget].push(extraProps.actions);
                } else {
                    fieldActionTargetMap[actionTarget] = [extraProps.actions];
                }
            }
        }
        //

        //如果不在init时进行显隐控制，将会导致隐藏的控件依然进行mount
        //新版本后，无论显隐，始终都会触发mount
        initFieldOptions(schema, field, getContext().options, _evaluator, form);
        //init中设置验证器，mount可能会多次执行
        initValidator(schema, _evaluator, form, getContext());
    });

    $("onFieldMount").subscribe((field, form) => {
        let schema = formatField(field, getContext().options);
        setActions(schema, form, _evaluator);
        setInitialOptions(
            schema,
            form,
            getContext().loading,
            getContext().options,
            _evaluator,
            getContext()
        );
    });

    $("onFieldValueChange").subscribe((field, form) => {
        let schema = formatField(field);
        //非表格组件value change时才进行联动
        //表格组件change时联动时，如果列字段存在多个联动，会多次触发表格change，影响性能
        if (schema.componentName?.toLowerCase() !== "arraytable") {
            triggerLinkage(
                schema,
                linkageItemMap,
                form,
                _evaluator,
                fieldActionTargetMap,
                getContext().options
            );
            triggerRelatedInputValues(schema, form);
        }
    });

    $("onFieldInputValueChange").subscribe((field, form) => {
        let schema = formatField(field);
        if (schema.componentName?.toLowerCase() === "arraytable") {
            triggerLinkage(
                schema,
                linkageItemMap,
                form,
                _evaluator,
                fieldActionTargetMap,
                getContext().options
            );
        }
        triggerExtraFieldValue(schema, form);
        linkageDataFill(form, schema, _evaluator);
        linkageAsyncValue(
            schema,
            linkageItemMap,
            form,
            _evaluator,
            getContext().options
        );
    });

    //处理级联隐藏
    observerChainHidden($);
    //

    //自定义事件响应
    $("onClick").subscribe(({ event, payload, field }, form) => {
        let schema = formatField(field);
        if (event?.stopPropagation) {
            event.stopPropagation();
        }

        triggerItemActions(schema, {}, form);
        form.notify(schema.name + "_" + "onClick", {
            name: schema.name,
            event,
            payload
        });

        let runtime = schema.componentProps?.["x-runtime"];
        if (runtime) {
            if (runtime.arrayPath && runtime.isOperationTool === true) {
                if ("index" in runtime) {
                    let arrayItem = clone(
                        form.getValuesIn(
                            runtime.arrayPath + "." + runtime.index
                        )
                    );
                    form.notify(runtime.arrayPath + "_" + "onOperationClick", {
                        name: runtime.arrayPath,
                        event,
                        payload: {
                            row: arrayItem,
                            rowIndex: runtime.index,
                            code: runtime.code
                        }
                    });
                }
            }
        }
    });

    $("onSelect").subscribe(({ payload, field }, form) => {
        let schema = formatField(field);
        triggerItemActions(schema, {}, form);
        form.notify(schema.name + "_" + "onSelect", {
            name: schema.name,
            payload
        });
    });

    $("onSearch").subscribe(({ payload, field }, form) => {
        let schema = formatField(field);
        triggerItemActions(schema, {}, form);
        form.notify(schema.name + "_" + "onSearch", {
            name: schema.name,
            payload
        });
    });

    $("onClose").subscribe(({ payload, field }, form) => {
        let schema = formatField(field);
        triggerItemActions(schema, {}, form);
        form.notify(schema.name + "_" + "onClose", {
            name: schema.name,
            payload
        });
    });

    //列表数据删除事件
    $("onListItemDelete").subscribe(p => {
        let fn = getContext().onListItemDelete;
        if (typeof fn === "function") {
            fn(p);
        }
    });
    //

    $("onDataSourceReload").subscribe(({ name, payload }, form) => {
        let field = form.query(name).take();
        let schema = formatField(field);
        setTableDataSource(schema, form, {}, { triggerType: "fieldAction" });
    });

    //列表分页
    $("onListPageChange").subscribe(({ name, pagination }, form) => {
        let field = form.query(name).take();
        let schema = formatField(field);
        setTableDataSource(schema, form, pagination, {
            triggerType: "pageChange"
        });
    });
    //

    //弹窗数据联动
    $("onModalChange").subscribe(({ name, payload }, form) => {
        let field = form.query(name).take();
        let schema = formatField(field);
        linkageDataFill(
            form,
            {
                ...schema,
                values: [true, "", { ...payload.data }]
            },
            _evaluator
        );
    });
    //
};
