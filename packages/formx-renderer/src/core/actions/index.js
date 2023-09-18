import { callEventWithPrepose, getItemIndex } from "../utils";
import message from "../../extensions/message";
import { clone } from "@formily/shared";
import { useAsyncRequest } from "../effects/useAsyncDataSource";
import { requestApiById, getRequestParams } from "../../extensions/utils";

export function getEnv(instance, k, injectEnvs) {
    try {
        if (
            typeof injectEnvs === "object" &&
            injectEnvs &&
            injectEnvs.hasOwnProperty(k)
        ) {
            return injectEnvs[k];
        }
        let formActions = instance.getFormState().formActions;
        return formActions.formEnvs.getItemValue(k);
    } catch (error) {
        console.error("get environment value error :", error);
        return null;
    }
}

/**
 * 控件动作请求接口
 * @param {*} name
 * @param {*} triggerType
 * @param {*} form
 * @param {*} $
 */
function triggerItemActionRequest(state, args, form) {
    if (state) {
        let name = state.path.toString();
        let extraProps = state.componentProps?.["x-extra-props"];
        let actionRequest = extraProps?.actionRequest;
        if (actionRequest && actionRequest.enabled === true) {
            let requestDataSourceId = actionRequest.data?.dataSourceId;
            if (requestDataSourceId) {
                let { resolving, resolve, reject } = args?.payload || {};
                callActionRequest(name, form, resolving, resolve, reject);
            }
        }
    }
}

/**
 * 订阅表单项动作
 * @表单实例 {*} instance
 * @表单项key {*} name
 * @表单项props {*} props
 * @observerable {*} $
 */
export function triggerItemActions(state, args, form) {
    let name = state.name;

    const actions = {
        queryData: function (name) {
            form.notify("onDataSourceReload", {
                name,
                payload: { pageIndex: 1 }
            });
        },
        filterData: function (name, args, sourcename) {
            let v = form.getFieldValue(sourcename);
            form.getFieldState(name, state => {
                state.fieldActions.filterData(v);
            });
        },
        findData: function (name, args, sourcename) {
            let v = form.getFieldValue(sourcename);
            form.getFieldState(name, state => {
                state.fieldActions.findData(v);
            });
        },
        insertData: function (name, args) {
            //如果存在参数(比如：弹窗关闭时)，则修改state.value;
            //否则直接调用表格默认新增方法
            if (args && args.items instanceof Array) {
                form.setFieldState(name, state => {
                    let prevValue = state.value;
                    if (prevValue instanceof Array) {
                        state.value = [...state.value, ...args.items];
                    } else {
                        state.value = [...args.items];
                    }
                });
            } else {
                form.getFieldState(name, state => {
                    state.fieldActions.insertData();
                });
            }
        },
        deleteSelected: function (name, args) {
            form.getFieldState(name, state => {
                state.fieldActions.deleteSelected(args?.arrayIndex);
            });
        },
        cloneRow: function (name, args) {
            form.getFieldState(name, state => {
                state.fieldActions.cloneRow(args?.arrayIndex);
            });
        },
        moveUp: function (name, args) {
            form.getFieldState(name, state => {
                state.fieldActions.moveUp(args?.arrayIndex);
            });
        },
        moveDown: function (name, args) {
            form.getFieldState(name, state => {
                state.fieldActions.moveDown(args?.arrayIndex);
            });
        },
        editRow: function (name, args) {
            form.getFieldState(name, state => {
                state.fieldActions.editRow(args?.arrayIndex, args?.rowKey);
            });
        },
        openModal: function (name, args) {
            form.getFieldState(name, state => {
                state.fieldActions.show(args);
            });
        },
        closeModal: function (name) {
            form.getFieldState(name, state => {
                state.fieldActions.hide();
            });
        },
        confirmModal: function (name) {
            form.getFieldState(name, state => {
                state.fieldActions.confirm();
            });
        }
    };

    if (state) {
        let extraProps = state.extraProps || {};

        if (typeof extraProps.actions === "object" && extraProps.actions) {
            let actionType = extraProps.actions.type;
            let actionTarget = extraProps.actions.targetField;
            const actionCall = actions[actionType];
            let address = state.path;

            let { parentKey, index } = getItemIndex(address);

            if (address) {
                if (!actionTarget) {
                    actionTarget = parentKey;
                }
            }
            if (
                actionType &&
                actionTarget &&
                typeof actionCall === "function"
            ) {
                let runtime = {};
                let fieldState = form.query(address).take();
                if (fieldState) {
                    runtime = clone(
                        fieldState.componentProps?.["x-runtime"] || {}
                    );
                }
                actionCall(
                    actionTarget,
                    { ...args, triggerPath: name, arrayName: runtime.arrayPath, arrayIndex: index, rowKey: runtime.rowKey },
                    name
                );
            }
        }
        triggerItemActionRequest(state, { ...args }, form);
    }
}

/**
 * 表单项动作请求异步接口
 * @param {*} _name
 * @param {*} form
 * @param {*} resolving
 * @param {*} resolve
 * @param {*} reject
 */
function callActionRequest(_name, form, resolving, resolve, reject) {
    let state = form.getFieldState(_name);

    function _resolving() {
        if (typeof resolving === "function") {
            resolving();
        } else {
            form.setFieldState(name, _state => {
                _state.componentProps.loading = true;
            });
        }
    }

    function _reject() {
        if (typeof reject === "function") {
            reject();
        } else {
            form.setFieldState(name, _state => {
                _state.componentProps.loading = false;
            });
        }

        form.setFieldState(name, _state => {
            _state.componentProps.loading = false;
        });
    }

    function _resolve() {
        if (typeof resolve === "function") {
            resolve();
        } else {
            form.setFieldState(name, _state => {
                _state.componentProps.loading = false;
            });
        }
    }

    if (!state) {
        _reject();
        return;
    }

    let name = state.path;
    let componentProps = state.component[1] || {};
    let extraProps = componentProps["x-extra-props"] || {};

    //控件动作触发时进行数据接口调用
    let actionRequest = extraProps.actionRequest;
    if (actionRequest && actionRequest.enabled === true) {
        let requestDataSourceId = actionRequest.data?.dataSourceId;
        if (requestDataSourceId) {
            let requestInput = actionRequest.data?.input;
            let requestOutput = actionRequest.data?.output;

            let dataIndexMap = {};

            let groups = [];
            let groupsMap = {};
            let items = [];
            let subItems = [];
            if (requestOutput instanceof Array) {
                requestOutput.forEach(d => {
                    if (d.targetField) {
                        if (d.dataType === "array") {
                            groups.push(d.targetField);
                            groupsMap[d.id] = d.targetField;
                        }
                        let _field = d.field;
                        if (_field) {
                            let arr = d.targetField.split(".");
                            let fieldKey = arr[arr.length - 1];
                            dataIndexMap[_field] = fieldKey;
                        }
                    }
                });

                requestOutput.forEach(d => {
                    let parentId = d.parentId;
                    if (groupsMap.hasOwnProperty(parentId)) {
                        subItems.push(d.targetField);
                    } else {
                        items.push(d.targetField);
                    }
                });
            }

            [...groups, ...items].forEach(d => {
                form.setFieldState(d, s => {
                    s.componentProps = { ...(s.componentProps || {}) };
                    s.loading = true;
                });
            });
            useAsyncRequest({
                name: name,
                service: requestApiById,
                extra: {
                    form: form,
                    id: requestDataSourceId,
                    input: getRequestParams(requestInput, form, {}, getEnv)
                },
                resolving: _resolving,
                resolve: _resolve,
                reject: _reject,
                callback: res => {
                    let data = res?.data;
                    let _data = [];
                    let _itemData = {};
                    if (data instanceof Array) {
                        data.forEach(item => {
                            let _item = { ...item };
                            for (const k in _item) {
                                let fieldKey = dataIndexMap[k];

                                if (fieldKey) {
                                    _item[fieldKey] = _item[k];
                                }
                            }
                            _data.push(_item);
                        });
                        _itemData = _data[0] || {};
                    }

                    groups.forEach(d => {
                        form.setFieldState(d, s => {
                            s.componentProps = { ...(s.componentProps || {}) };
                            s.loading = false;
                            s.value = _data;
                        });
                    });

                    items.forEach(k => {
                        if (_itemData.hasOwnProperty(k)) {
                            form.setFieldState(k, s => {
                                s.componentProps = {
                                    ...(s.componentProps || {})
                                };
                                s.loading = false;
                                s.value = _itemData[k];
                            });
                        } else {
                            form.setFieldState(k, s => {
                                s.componentProps = {
                                    ...(s.componentProps || {})
                                };
                                s.loading = false;
                            });
                        }
                    });
                }
            });
        }
    } else {
        if (typeof resolve === "function") {
            resolve();
        }
    }
    //
}

/**
 * 响应表单项绑定的事件
 * @param {*} name
 * @param {*} eventType
 * @param {*} form
 * @param {*} _evaluator
 */
function bindItemEvent(field, schema, eventType, form, _evaluator) {
    let name = schema.name;
    let extraProps = schema.extraProps;

    let state = field.getState(name);

    let preEventType = {
        onClick: "onBeforeClick",
        onSelect: "onBeforeSelect",
        onSearch: "onBeforeSearch",
        onClose: "onBeforeClose"
    }[eventType];

    function callPrepose(data) {
        //模板中配置的前置条件控制
        let preposeEvent = extraProps?.preposeEvent;

        if (preposeEvent) {
            let expr = preposeEvent.expression;
            let type = preposeEvent.type;
            let msg = preposeEvent.message;

            if (expr && type === eventType) {
                let res = _evaluator.evaluate(expr, {}, data);
                if (res === true) {
                    if (msg) {
                        message.warn(msg);
                    } else {
                        console.error(
                            "Interrupt execution event '" +
                            eventType +
                            "' by form setting and without message tips"
                        );
                    }
                    return false;
                }
            }
        }

        //通过脚本注册的前置事件
        let preFn = null;
        let field = form.getFieldState(data?.name);
        if (field) {
            let componentProps = field.component[1];
            preFn = componentProps?.["x-prepose-event"]?.[preEventType];
        }

        if (typeof preFn === "function") {
            return preFn(data);
        }

        return true;
    }

    if (state && eventType) {
        field.setState(_state => {
            let cancelBubble = _state.componentProps?.["x-runtime"]?.cancelBubble ?? false;
            _state.componentProps[eventType] = e => {
                let { parentKey, index } = getItemIndex(name);
                if (typeof e.persist === "function") {
                    e.persist();
                }
                callEventWithPrepose(
                    () => {
                        form.notify(eventType, {
                            event: e,
                            field: _state,
                            payload: {
                                cancelBubble,
                                name,
                                listKey: parentKey,
                                index
                            }
                        });
                    },
                    callPrepose,
                    {
                        event: e,
                        name,
                        listKey: parentKey,
                        index
                    }
                );
            };
        });
    }
}

export function setActions(field, schema, instance, _evaluator) {
    let ctype = schema.componentName?.toLowerCase();

    //控件事件订阅,目前暂时只支持以下事件类型
    if (
        [
            "button",
            "search",
            "modal",
            "select",
            "treeselect",
            "tree",
            "arraytable"
        ].indexOf(ctype) > -1
    ) {
        let eventType = {
            button: "onClick",
            select: "onSelect",
            treeselect: "onSelect",
            tree: "onSelect",
            arraytable: "onSelect",
            search: "onSearch",
            modal: "onClose"
        }[ctype];

        bindItemEvent(field, schema, eventType, instance, _evaluator);
    } else {
        let extraActionEventType = schema?.extraProps?.actionEventType
        if (typeof extraActionEventType === "string" && extraActionEventType.length > 0) {
            bindItemEvent(field, schema, extraActionEventType, instance, _evaluator);
        }
    }
}
