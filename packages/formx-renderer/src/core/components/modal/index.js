import React, { useRef, useEffect, useState } from "react";
import { ConfigProvider, Modal as AntdModal, Row } from "antd";
import {
    RecursionField,
    connect,
    mapProps,
    useFieldSchema,
    useField,
    useForm
} from "@formily/react";

function callPrepose(fn, preFn, payload, { resolving, resolve, reject }) {
    if (typeof fn === "function") {
        if (typeof preFn === "function") {
            let res = preFn(payload);
            if (res instanceof Promise) {
                resolving();
                res.then(d => {
                    if (d !== false) {
                        resolve();
                        fn(payload);
                    } else {
                        reject();
                    }
                });
            } else if (res !== false) {
                fn(payload);
            }
        } else {
            fn(payload);
        }
    }
}

function getChildrenGraph(graph, name) {
    let items = [];
    for (const k in graph) {
        if (graph.hasOwnProperty(k)) {
            const g = graph[k];
            if (g.address && g.path !== name && g.address.indexOf(name) > -1) {
                items.push(g);
            }
        }
    }
    return items;
}

function getChildrenState(form, name) {
    let graph = form.getFormGraph();
    let items = getChildrenGraph(graph, name);
    let state = {};

    items.forEach(g => {
        let componentProps = g.component[1] || {};
        let _name = g.path;
        let ctype = componentProps["x-extra-props"]?.name?.toLowerCase();

        if (!state[_name]) {
            if (ctype === "arraytable") {
                let _values = [g.value];
                let fn = g.fieldActions?.getSelections;
                if (typeof fn === "function") {
                    let selections = fn();
                    _values.push({
                        selections
                    });
                }
                state[_name] = _values;
            } else {
                let _inputValues = [];
                if (
                    g.inputValues instanceof Array &&
                    g.inputValues.length > 0
                ) {
                    _inputValues = g.inputValues;
                } else {
                    if (typeof g.value !== "undefined") {
                        _inputValues = [g.value];
                    }
                }
                state[_name] = _inputValues;
            }
        }
    });
    return state;
}

function getLayoutStyle(layoutProps = {}) {
    let layoutStyle = {};

    let layoutHeight = layoutProps.height ?? { type: "auto" };
    let layoutWidth = layoutProps.width;

    if (typeof layoutHeight === "object" && layoutHeight) {
        if (layoutHeight.type === "const") {
            let _constHeight = Number(layoutHeight.const);
            if (!isNaN(_constHeight)) {
                layoutStyle.height = _constHeight;
            } else {
                layoutStyle.height = "auto";
            }
        } else if (layoutHeight.type === "percent") {
            let _percentHeight = Number(layoutHeight.percent);
            if (!isNaN(_percentHeight)) {
                layoutStyle.height = _percentHeight + "%";
            } else {
                layoutStyle.height = "auto";
            }
        }
    }

    if (typeof layoutWidth === "object" && layoutWidth) {
        if (layoutWidth.type === "const") {
            let _constWidth = Number(layoutWidth.const);
            if (!isNaN(_constWidth)) {
                layoutStyle.width = _constWidth;
            }
        } else if (layoutWidth.type === "percent") {
            let _percentWidth = Number(layoutWidth.percent);
            if (!isNaN(_percentWidth)) {
                layoutStyle.width = _percentWidth + "%";
            }
        } else if (layoutWidth.type === "auto") {
            layoutStyle.width = "auto";
        }
    }
    return layoutStyle;
}

const BaseModal = props => {
    let form = useForm();
    let field = useField();
    let name = field.path.toString();
    const schema = useFieldSchema();

    const {
        onCancel,
        footerRender,
        onClose,
        onBeforeClose,
        isEditor,
        ...componentProps
    } = props;

    const storeRef = useRef({
        isOkClose: false
    });

    const [state, _setState] = useState({
        visible: props.visible,
        okLoading: false
    });

    function setState(o) {
        _setState({
            ...state,
            ...o
        });
    }

    const show = () => {
        setState({ visible: true });
    };

    const hide = () => {
        if (!isEditor) {
            setState({ visible: false, okLoading: false });
        }
    };

    const renderFooter = () => {
        let items = schema.additionalProperties;

        if (!items) {
            return null;
        }

        let path = field.address.toString();

        let elements = items.mapProperties((props, _key) => {
            let basePath = path;
            let key = "additionalProperties_" + _key;
            return (
                <RecursionField
                    key={key}
                    basePath={basePath}
                    name={key}
                    schema={{
                        ...props,
                        noneWrapper: true
                    }}
                />
            );
        });

        if (isEditor) {
            elements = (
                <React.Fragment>
                    <span
                        style={{
                            color: "#c8c8c8",
                            paddingRight: 4,
                            display: "inline-flex",
                            alignItems: "center"
                        }}
                    >
                        可向此处拖入按钮表单项
                    </span>
                    {elements}
                </React.Fragment>
            );
        }

        return elements;
    };

    const afterClose = () => {
        let isOkClose = storeRef.current.isOkClose;
        if (isOkClose) {
            // let state = getChildrenState(form, schema.key);
            // form.notify(props.name + "_onClose", {
            //     name: props.name,
            //     data: state
            // });
        } else {
            form.notify(name + "_onCancel", {
                name
            });
        }
        storeRef.current.isOkClose = false;
    };

    const onOk = () => {
        let _state = getChildrenState(form, schema.name);
        function resolve() {
            hide();
            storeRef.current.isOkClose = true;
            form.notify("onModalChange", {
                name,
                payload: {
                    data: _state
                }
            });
        }

        function reject() {
            setState({ okLoading: false });
        }

        function resolving() {
            setState({ okLoading: true });
        }

        callPrepose(
            () => {
                //先执行本身的close将弹窗关闭，再触发onClose事件，否则会导致弹窗无法关闭
                resolve();
                //
                //此处onClose传递resolve事件主要是为了onClose时调用异步接口后再关闭弹窗
                let _onClose =
                    form.getFieldState(name)?.component?.[1]?.onClose;
                if (typeof _onClose === "function") {
                    _onClose({
                        data: _state,
                        resolving: resolving,
                        resolve: resolve,
                        reject: reject
                    });
                }
            },
            onBeforeClose,
            _state,
            {
                resolving: resolving,
                resolve: resolve,
                reject: reject
            }
        );
    };

    //必须每次render时都更新fieldActions，否则会导致方法内部的state不同步
    useEffect(() => {
        field.setState(s => {
            s.fieldActions = {
                show,
                hide,
                confirm: onOk
            };
        });
    }, [schema]);

    let footer = renderFooter();
    if (typeof footerRender === "function") {
        footer = footerRender(footer, schema);
    }

    return (
        <AntdModal
            {...componentProps}
            destroyOnClose={true}
            visible={state.visible}
            confirmLoading={state.okLoading}
            onCancel={() => hide()}
            afterClose={afterClose}
            onOk={() => onOk()}
            footer={footer}
        >
            <Row type="flex">{props.children}</Row>
        </AntdModal>
    );
};

export const Modal = connect(
    props => {
        const wrapperRef = useRef(null);
        return (
            <ConfigProvider getPopupContainer={() => document.body}>
                <div ref={wrapperRef}></div>
                <BaseModal
                    {...props}
                    getContainer={() => {
                        return props.isEditor
                            ? wrapperRef.current
                            : document.body;
                    }}
                >
                    {props.children}
                </BaseModal>
            </ConfigProvider>
        );
    },
    mapProps((props, field) => {
        let layoutProps = props["x-layout-props"] || {};
        let layoutStyle = getLayoutStyle(layoutProps);
        let isEditor =
            field.form.getValuesIn("__DATA__.__isEditor") === true
                ? true
                : false;
        let resetProps = {
            isEditor: isEditor,
            transitionName: isEditor ? "" : undefined,
            mask: isEditor ? false : true,
            maskClosable: false,
            style: { height: "auto", maxWidth: "100%", maxHeight: "100%" },
            bodyStyle: {
                height: layoutStyle.height ?? "auto",
                overflow: "auto"
            },
            width: layoutStyle.width ?? "auto",
            wrapClassName: "formx-container formx-modal-wrapper",
            size: "small"
        };

        if (isEditor) {
            resetProps.visible = true;
        }
        return { ...resetProps };
    })
);

export default Modal;
