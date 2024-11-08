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
    setAsyncDataSource,
    linkageAsyncValue,
    initValidator,
    triggerLinkageDataSource
} from "../core/linkages";
import { mapSchemaItems, getItemIndex, decryptString } from "../core/utils";

import { setActions, triggerItemActions } from "../core/actions";
import { EventFlow } from "../extensions/event-flow";
import message from "../extensions/message";

function formatField(field, options) {
    let componentProps = clone(field.componentProps || {});
    let extraProps = componentProps["x-extra-props"] || {};
    let controledOptions = options?.[extraProps["data-key"]] || {};
    return {
        name: field.path.toString(),
        path: field.address.toString(),
        data: field.data,
        modified: field.modified,
        selfModified: field.selfModified,
        initialValue: field.initialValue,
        value: field.value,
        values: field.inputValues,
        required: field.required,
        extraProps,
        componentProps,
        componentName: field.componentType || extraProps?.name,
        displayName: field.displayName,
        unmounted: field.unmounted,
        mounted: field.mounted,
        visible: field.visible,
        display: field.display,
        alwaysDisabled:
            controledOptions.disabled === true ||
            controledOptions.readonly === true,
        ignoreDataSourceWhenDisabled: extraProps.ignoreDataSourceWhenDisabled
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
        let { formSchemaMap, options, loading, onListItemDelete } = _consumer();
        return {
            formSchemaMap: formSchemaMap ?? {},
            options: options ?? {},
            loading: loading ?? false,
            onListItemDelete
        };
    }

    function getSchema(name) {
        let formSchemaMap = getContext().formSchemaMap;
        return formSchemaMap[name];
    }
    //创建表达式计算实例，并传递上下文
    let _evaluator = createEvaluator(instance);

    function getEventFlowConfig() {
        let { formSchema } = _consumer();
        let arr = [];
        let data = formSchema.additionalProperties?.formEventFlow;
        if (data instanceof Array) {
            arr = data;
        }
        return arr;
    }

    let _eventFlow = new EventFlow({
        data: getEventFlowConfig(),
        form: instance,
        evaluator: _evaluator,
        onReject: msg => {
            message.error(msg);
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
        addLinkageItem(linkageTargetMap, linkageItemMap, "required", schema);
        addLinkageItem(linkageTargetMap, linkageItemMap, "fieldProps", schema);

        addLinkageItem(linkageTargetMap, linkageItemMap, "dataSource", schema);
        addLinkageItem(linkageTargetMap, linkageItemMap, "displayText", schema);

        //表格列隐藏条件表达式
        if (schema.componentName === "ArrayTable") {
            //不加载初始数据时，将初始值设置为undefined，以便后续数据源接口进行设置值
            let _dataHandleMode = schema.extraProps.dataHandleMode ?? "default";
            if (["onlySave", "none"].indexOf(_dataHandleMode) > -1) {
                field.initialValue = undefined;
                field.value = undefined;
            }
            //

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
                        form.query(schema.name).take(),
                        schema,
                        form,
                        { ..._payload },
                        { ..._context, triggerType: "dispatch" }
                    );
                }
            });
            //
        }

        // 脱敏文本，需对脱敏文本的初始值进行解密
        if (schema.componentName === "SensitiveInput") {
            let _initialValue = field.initialValue;
            if (typeof _initialValue !== "undefined") {
                _initialValue = decryptString(_initialValue);
                field.initialValue = _initialValue;
                field.value = _initialValue;
            }
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
        //父级容器若在init时就隐藏子级将不会再mount，故隐藏应该在mount中进行，2022年11月23日10:22:09
        //initFieldOptions(schema, field, getContext().options, _evaluator, form);
        //init中设置验证器，mount可能会多次执行
        initValidator(field, schema, _evaluator, form, getContext());
    });

    $("onFieldMount").subscribe((field, form) => {
        let schema = formatField(field, getContext().options);
        //重新mount时，应将loaded设置为false，避免无法重新加载数据
        field.loaded = false;

        let _context = getContext();

        //在mount中设置初始属性响应才能正确获取到初始值
        setActions(field, schema, form, _evaluator);
        setInitialOptions(
            field,
            schema,
            form,
            _context.loading,
            _context.options,
            _evaluator,
            _context
        );
        _eventFlow.dispatch(schema.name, "onMount");
        if (typeof schema.initialValue === "undefined") {
            _eventFlow.dispatch(schema.name, "onInitValue");
        }
    });

    $("onFieldChange", "*", ["active"]).subscribe((field, form) => {
        if (field.mounted) {
            if (
                field.active &&
                field.loaded !== true &&
                field.loading !== true
            ) {
                let schema = formatField(field, getContext().options);
                let dataSourceLoadMode =
                    schema.extraProps.dataSourceLoadMode ?? "mount";
                if (dataSourceLoadMode === "focus") {
                    let { index: triggerIndex } = getItemIndex(schema.path);
                    setAsyncDataSource(schema, form, _evaluator, triggerIndex);
                }
            }

            _eventFlow.dispatch(
                field.path.toString(),
                field.active === true ? "onFocus" : "onBlur"
            );
        }
    });

    $("onFieldChange", "*", ["data"]).subscribe(field => {
        if (
            field.data !== null &&
            field.data !== undefined &&
            field.data !== ""
        ) {
            let schema = formatField(field, getContext().options);
            addLinkageItem(
                linkageTargetMap,
                linkageItemMap,
                "renderBydependencies",
                schema
            );
        }
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
        } else {
            triggerLinkageDataSource(
                schema,
                linkageItemMap,
                form,
                _evaluator,
                fieldActionTargetMap,
                getContext().options
            );
        }

        _eventFlow.dispatch(schema.name, "onValueChange");
    });

    $("onFieldValueDeferLoad").subscribe((field, form) => {
        let schema = formatField(field);
        triggerLinkage(
            schema,
            linkageItemMap,
            form,
            _evaluator,
            fieldActionTargetMap,
            getContext().options,
            false
        );
    });

    $("onFieldDataSourceLoad").subscribe(({ field, envs }, form) => {
        if (field.mounted) {
            let schema = formatField(field, getContext().options);
            let { index: triggerIndex } = getItemIndex(schema.path);
            setAsyncDataSource(schema, form, _evaluator, triggerIndex, envs);
        }
    });

    $("onFieldInputValueChange").subscribe((field, form) => {
        let schema = formatField(field);
        //表格组件始终在onFieldInputValueChange中执行联动逻辑，避免引用发生变化产生不必要的联动
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

        _eventFlow.dispatch(schema.name, "onInput");
    });

    //处理级联隐藏
    observerChainHidden($);
    //

    //自定义事件响应
    $("onClick").subscribe(({ event, payload, field }, form) => {
        let schema = formatField(field);
        if (payload?.cancelBubble === true && event?.stopPropagation) {
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
        _eventFlow.dispatch(schema.name, "onClick");
    });

    $("onSelect").subscribe(({ payload, field }, form) => {
        let schema = formatField(field);

        triggerItemActions(schema, {}, form);
        form.notify(schema.name + "_" + "onSelect", {
            name: schema.name,
            payload
        });
        _eventFlow.dispatch(schema.name, "onSelect");
    });

    $("onSearch").subscribe(({ payload, field }, form) => {
        let schema = formatField(field);

        triggerItemActions(schema, {}, form);
        form.notify(schema.name + "_" + "onSearch", {
            name: schema.name,
            payload
        });
        _eventFlow.dispatch(schema.name, "onSearch");
    });

    $("onClose").subscribe(({ payload, field }, form) => {
        let schema = formatField(field);
        triggerItemActions(schema, {}, form);
        form.notify(schema.name + "_" + "onClose", {
            name: schema.name,
            payload
        });
        _eventFlow.dispatch(schema.name, "onClose");
    });

    //异步数据值加载完成后支持触发动作
    $("onAsyncValueComplete").subscribe(({ name }, form) => {
        let field = form.query(name).take();
        let schema = formatField(field);
        triggerItemActions(schema, {}, form);
        _eventFlow.dispatch(schema.name, "onAsyncValueLoad");
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
        setTableDataSource(
            field,
            schema,
            form,
            {},
            { triggerType: "fieldAction" }
        );
        _eventFlow.dispatch(schema.name, "onListDataSourceReload");
    });

    //列表分页
    $("onListPageChange").subscribe(({ name, pagination }, form) => {
        let field = form.query(name).take();
        let schema = formatField(field);
        //翻页时过滤掉冗余参数，避免传递到接口，导致报错
        let { isServerSidePagination, total, ...extraParameters } =
            pagination || {};
        setTableDataSource(
            field,
            schema,
            form,
            extraParameters,
            {
                triggerType: "pageChange"
            },
            pagination?.isServerSidePagination !== true
        );

        _eventFlow.dispatch(schema.name, "onListPageChange");
    });
    //

    //弹窗数据联动
    $("onModalChange").subscribe(({ name, payload }, form) => {
        let field = form.query(name).take();
        let schema = formatField(field);
        let fn = field.getState().fieldActions?.getActionArgs;
        let itemsIndex = undefined;
        if (typeof fn === "function") {
            let actionArgs = fn()?.show;
            if (
                typeof actionArgs?.arrayIndex !== "undefined" &&
                !isNaN(Number(actionArgs.arrayIndex))
            ) {
                itemsIndex = Number(actionArgs.arrayIndex);
            }
        }

        linkageDataFill(
            form,
            {
                ...schema,
                values: [true, "", { ...payload.data }]
            },
            _evaluator,
            itemsIndex
        );

        _eventFlow.dispatch(schema.name, "onConfirm", {
            arrayIndex: itemsIndex,
            values: [true, "", { ...payload.data }]
        });
    });
    //

    $("onCancel").subscribe(({ name }, form) => {
        let field = form.query(name).take();
        let schema = formatField(field);
        _eventFlow.dispatch(schema.name, "onClose");
    });
};
