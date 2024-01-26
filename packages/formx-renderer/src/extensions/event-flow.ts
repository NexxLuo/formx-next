import type { Form, Field } from "@formily/core";
import { requestApiById } from "./utils";
import { linkageDataFill } from "../core/linkages/dataFill";
import { linkageProps } from "../core/linkages/props";
import { parseStyleString } from "../core/linkages/utils";

type ActionInfo = {
    type: string;
    target: string;
    after: ActionInfo[];
    before: ActionInfo[];
    params: string;
    rejectMessage?: string;
    expression?: string;
    dataFill?: any;
    api?: {
        dataSourceId: string;
        input: any[];
        output: any[];
    };
};

type ActionRuntimeContext = {
    form: any;
    evaluator: any;
    source: string;
    runtimeParams: any;
    onReject: (msg: string) => void;
};

type EventTypes = string;

type EventFlowConfigType = {
    source: string;
    events: { type: string; actions: ActionInfo[] }[];
};

type EventFlowPropsType = {
    form: any;
    data: EventFlowConfigType[];
    evaluator: any;
    onReject: ActionRuntimeContext["onReject"];
};

type ActionResultType = {
    success: boolean;
    message: string;
    data: any;
};

type FieldPropsActionParamsType = {
    property: string;
    type: "componentProps" | "extraProps";
    name: string;
    expression: string;
};

function setFieldLoading(field: Field, isLoading = true) {
    if (field) {
        let fn = field.setLoading;
        if (typeof fn === "function") {
            fn(isLoading);
        } else {
            field.setComponentProps({ loading: isLoading });
        }
    }
}

async function dispatchAction(
    {
        type,
        target,
        after,
        before,
        params,
        expression,
        api,
        dataFill
    }: ActionInfo,
    actionContext: ActionRuntimeContext
) {
    let { form, evaluator, source, onReject, runtimeParams } = actionContext;
    const actions = {
        queryData: function (name) {
            form.notify("onDataSourceReload", {
                name,
                payload: { pageIndex: 1 }
            });
        },
        filterData: function (name, args, sourcename) {
            let v = form.getFieldState(sourcename)?.value;
            form.getFieldState(name, state => {
                state.fieldActions.filterData(v);
            });
        },
        findData: function (name, args, sourcename) {
            let v = form.getFieldState(sourcename)?.value;
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
        insertChildren: function (name, args) {
            form.getFieldState(name, state => {
                state.fieldActions.insertChildren(args?.arrayIndex);
            });
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
        },
        callExpression: function (name, expr) {
            let res = evaluator.evaluate(expr, {});
            return res;
        },
        setValue: function (name, v) {
            let field = form.query(name).take();
            if (field) {
                field.setValue(v);
            }
        },
        callApi: function (name: string, apiData: any) {
            return new Promise((resolve, reject) => {
                if (apiData) {
                    let _params = {
                        id: apiData.dataSourceId,
                        input: apiData.input,
                        output: apiData.output
                    };
                    requestApiById(_params)
                        .then(res => {
                            if (res.state === 0) {
                                reject(res.message);
                            } else {
                                resolve(res.data);
                            }
                        })
                        .catch((e: any) => {
                            reject(e);
                        });
                }
            });
        },
        setRequired: function (name: string, args: boolean = false) {
            if (typeof args === "boolean") {
                let targetField: Field = form.query(name).take();
                targetField.setRequired(args);
            }
        },
        setDisabled: function (name: string, args: boolean = false) {
            if (typeof args === "boolean") {
                let targetField: Field = form.query(name).take();
                targetField.setState(s => {
                    s.disabled = args;
                    s.componentProps.disabled = args;
                });
            }
        },
        setReadonly: function (name: string, args: boolean = false) {
            if (typeof args === "boolean") {
                let targetField: Field = form.query(name).take();
                targetField.setState(s => {
                    s.componentProps.readOnly = args;
                });
            }
        },
        setVisible: function (name: string, args: boolean = false) {
            if (typeof args === "boolean") {
                let targetField: Field = form.query(name).take();
                targetField.setState(s => {
                    s.visible = args;
                });
            }
        },
        setTitle: function (name: string, args: boolean = false) {
            if (typeof args === "undefined") {
                let targetField: Field = form.query(name).take();
                targetField.setState(s => {
                    s.title = args;
                    s.componentProps.title = args;
                    s.componentProps["x-extra-props"].title = args;
                });
            }
        },
        setStyle: function (name: string, args: boolean = false) {
            if (typeof args !== "undefined") {
                let targetField: Field = form.query(name).take();
                let styles = parseStyleString(args);
                targetField.setState(s => {
                    s.componentProps.style = styles;
                    s.decoratorProps.style = styles;
                });
            }
        },
        setAttribute: function (name: string, args) {
            if (typeof args === "object" && args !== null) {
                let targetField: Field = form.query(name).take();
                targetField.setState(s => {
                    let prev = s.componentProps.attribute;
                    s.componentProps.attribute = {
                        ...prev,
                        ...args
                    };
                });
            }
        },
        dataFill: function (name, args) {
            let sourceField: Field = form.query(source).take();
            linkageDataFill(
                form,
                {
                    extraProps: {
                        dataFill: args.dataFill
                    },
                    name: source,
                    values: args.values || sourceField.inputValues
                },
                evaluator,
                args?.arrayIndex
            );
        },
        customDataFill: function (name, args) {
            let sourceField: Field = form.query(source).take();
            linkageDataFill(
                form,
                {
                    extraProps: {
                        dataFill: args.dataFill
                    },
                    name: source,
                    values: sourceField.inputValues
                },
                evaluator,
                args?.arrayIndex
            );
        }
    };

    let fn = actions[type];

    let isBreak = false;
    if (before instanceof Array) {
        for (let i = 0; i < before.length; i++) {
            let obj = before[i];
            let res = await dispatchAction(obj, actionContext);
            if (res?.success === false || res?.data === false) {
                let msg = "";
                if (typeof res.message === "string") {
                    msg = res.message;
                }
                isBreak = true;
                onReject(obj.rejectMessage || msg);
                break;
            }
        }
    }

    if (isBreak === true) {
        console.warn("action interrupted by preposed event");
        let sourceField = form.query(source).take();
        setFieldLoading(sourceField, false);
        return;
    }

    let res: ActionResultType = null;
    if (typeof fn === "function") {
        let _params: any = {};

        if (type === "callExpression") {
            _params = expression;
        } else if (type === "callApi") {
            _params = api;
        } else if (type === "dataFill") {
            _params.dataFill = dataFill;
        } else {
            if (typeof params === "string" && params.length > 0) {
                _params = evaluator.evaluate(params, {});
            }
        }

        if (typeof _params === "object" && _params) {
            _params = { ..._params, ...runtimeParams };
        }

        let sourceField = form.query(source).take();
        setFieldLoading(sourceField, true);
        try {
            let fn_res = await fn(target, _params, source);
            res = {
                success: true,
                data: fn_res,
                message: ""
            };
        } catch (error) {
            res = {
                success: false,
                data: null,
                message: error
            };
        } finally {
            setFieldLoading(sourceField, false);
        }
    }

    if (after instanceof Array) {
        for (let i = 0; i < after.length; i++) {
            let obj = after[i];
            dispatchAction(obj, actionContext);
        }
    }

    return res;
}

export class EventFlow {
    data: EventFlowConfigType[] = [];
    form = null;
    evaluator = null;
    onReject = (msg: string) => {
        console.error("event flow rejected : " + msg);
    };

    constructor(props: EventFlowPropsType) {
        this.data = props.data;
        this.form = props.form;
        this.evaluator = props.evaluator;
        if (typeof props.onReject === "function") {
            this.onReject = props.onReject;
        }
    }

    dispatch(target: string, type: EventTypes, resetArgs: any) {
        let arr = this.data;

        let _target = target;

        if (typeof _target === "string") {
            let arr = _target.split(".");
            _target = arr[arr.length - 1];
            if (typeof _target === "string") {
                _target = _target.replace(/additionalProperties_/g, "");
                _target = _target.replace(/toolbar_/g, "");
            }
        }

        let events = arr.find(d => {
            let _source = d.source;
            if (typeof _source === "string") {
                let arr = _source.split(".");
                _source = arr[arr.length - 1];
                if (typeof _source === "string") {
                    _source = _source.replace(/additionalProperties_/g, "");
                    _source = _source.replace(/toolbar_/g, "");
                }
            }

            return _source === _target;
        })?.events;

        let form = this.form,
            _evaluator = this.evaluator,
            onReject = this.onReject;

        let runtime: any = {};
        let fieldState = form.query(target).take();
        if (fieldState) {
            runtime = fieldState.componentProps?.["x-runtime"] || {};
        }

        let runtimeParams = {
            triggerPath: target,
            arrayName: runtime.arrayPath,
            arrayIndex: runtime.index,
            rowKey: runtime.rowKey,
            ...(resetArgs || {})
        };

        if (events instanceof Array) {
            events.forEach(d => {
                if (d.type === type) {
                    if (d.actions instanceof Array) {
                        d.actions.forEach(_d => {
                            dispatchAction(
                                {
                                    type: _d.type,
                                    after: _d.after,
                                    before: _d.before,
                                    target: _d.target,
                                    params: _d.params,
                                    expression: _d.expression,
                                    api: _d.api,
                                    dataFill: _d.dataFill,
                                    rejectMessage: _d.rejectMessage
                                },
                                {
                                    form,
                                    evaluator: _evaluator,
                                    source: target,
                                    runtimeParams: runtimeParams,
                                    onReject
                                }
                            );
                        });
                    }
                }
            });
        }
    }
}
