import FormEnvs from "./FormEnvs";
import FormFunction from "./FormFunction";
import {
    requestApiById,
    getLabelMap,
    setTableErrorsToExtraField,
    isResponsiveSizeSmall,
    getRequestParams,
    getFormEnvValue,
    createEvaluator
} from "../extensions/utils";
import { batch, untracked } from "@formily/reactive";

export default class FormActions {
    constructor(instance, $observable, _consumer) {
        this.getFormInstance = () => {
            return instance;
        };
        this.observable = $observable;
        this.businessData = {};
        this.formEnvs = new FormEnvs();
        this.formFunction = new FormFunction();
        this.evaluator = createEvaluator(instance);
        this.getFormSchema = () => {
            return _consumer()?.formSchema;
        };
        this.getFieldSchema = name => {
            let schemaMap = _consumer()?.formSchemaMap;
            if (schemaMap && name) {
                return schemaMap[name];
            }
            return null;
        };

        this.getFormSchemaMap = () => {
            return _consumer()?.formSchemaMap;
        };

        this.getFormContext = () => {
            return _consumer();
        };

        this.getOptions = () => {
            return _consumer()?.options;
        };

        //是否由外部options控制了禁用、只读状态
        this.isControledDisabled = id => {
            let bl = false;
            let options = _consumer()?.options;
            if (typeof options === "object" && options) {
                let name = "";
                if (typeof id === "string") {
                    let arr = id.split(".");
                    name = arr[arr.length - 1];
                }
                let o = options[name];
                if (typeof o === "object" && o) {
                    bl = o.disabled || o.readonly;
                }
            }
            return bl;
        };

        this.getFieldSchemaByCode = code => {
            let schemaMap = _consumer()?.formSchemaMap;
            if (schemaMap && code) {
                for (const k in schemaMap) {
                    const item = schemaMap[k];
                    const extraProps =
                        item?.["x-component-props"]?.["x-extra-props"];
                    if (extraProps && extraProps.formItemCode === code) {
                        return item;
                    }
                }
            }
            return null;
        };

        this.getFieldSchemasByCode = code => {
            let schemas = [];
            let schemaMap = _consumer()?.formSchemaMap;
            if (schemaMap && code) {
                for (const k in schemaMap) {
                    const item = schemaMap[k];
                    const extraProps =
                        item?.["x-component-props"]?.["x-extra-props"];
                    if (extraProps && extraProps.formItemCode === code) {
                        schemas.push(item);
                    }
                }
            }
            return schemas;
        };

        this.getFieldGraphByCode = code => {
            let graphs = [];
            let graphMap = _consumer()?.formGraphMap;
            if (graphMap && code) {
                for (const k in graphMap) {
                    const item = graphMap[k];
                    const extraProps =
                        item?.["component"]?.[1]?.["x-extra-props"];
                    if (extraProps && extraProps.formItemCode === code) {
                        graphs.push(item);
                    }
                }
            }

            //如果依然没找到graph，则可能字段是懒渲染的，此时需要通过表单实例获取graph
            if (graphs.length <= 0) {
                let _graphMap = instance.getFormGraph();
                if (_graphMap && code) {
                    for (const k in _graphMap) {
                        const item = _graphMap[k];
                        const extraProps =
                            item?.["component"]?.[1]?.["x-extra-props"];
                        if (
                            item.mounted === true &&
                            extraProps &&
                            extraProps.formItemCode === code
                        ) {
                            graphs.push(item);
                        }
                    }
                }
            }

            return graphs;
        };

        this.tasks = {};
    }

    reloadFieldDataSource = (id, envs) => {
        let form = this.getFormInstance();
        let field = form.query(id).take();
        if (field) {
            form.notify("onFieldDataSourceLoad", { field, envs });
        }
    };

    requestFieldDataSource = (idOrCode, params) => {
        return new Promise((resolve, reject) => {
            let data = null;
            let fieldSchema =
                this.getFieldSchema(idOrCode) ||
                this.getFieldSchemaByCode(idOrCode);
            let dataSourceConfig =
                fieldSchema?.["x-component-props"]?.["x-extra-props"]
                    ?.dataSource;
            let dataSource = null;
            if (dataSourceConfig) {
                dataSource = JSON.parse(dataSourceConfig);
            }
            if (dataSource) {
                if (dataSource.type === "const") {
                    data = dataSource.data.const;
                    resolve(data);
                    return;
                } else if (dataSource.type === "formItem") {
                    resolve(data);
                    return;
                } else if (dataSource.type === "api") {
                    let apiData = dataSource.data?.api;
                    if (apiData) {
                        let reqParams =
                            getRequestParams(
                                apiData.input,
                                this.getFormInstance(),
                                {},
                                getFormEnvValue
                            ) || {};
                        let _input = {};
                        if (typeof params === "function") {
                            _input = params(apiData.input, apiData, reqParams);
                        } else {
                            _input = params;
                        }
                        let _params = {
                            id: apiData.dataSourceId,
                            input: { ...reqParams, ..._input },
                            output: apiData.output
                        };
                        requestApiById(_params).then(res => {
                            resolve(res.data);
                        });
                    }
                } else {
                    resolve(data);
                    console.warn(
                        "requestFieldDataSource :",
                        "dataSource type unknown"
                    );
                }
            } else {
                resolve(data);
                console.warn(
                    "requestFieldDataSource :",
                    "dataSource configration not found"
                );
            }
        });
    };

    requestDataSource = (dataSourceId, params) => {
        return new Promise((resolve, reject) => {
            let data = null;
            if (dataSourceId) {
                let _input = {};
                if (typeof params === "function") {
                    _input = params();
                } else {
                    _input = params;
                }
                let _params = {
                    id: dataSourceId,
                    input: _input
                };
                requestApiById(_params).then(res => {
                    resolve(res.data);
                });
            } else {
                resolve(data);
                console.warn("requestDataSource :", "dataSourceId not found");
            }
        });
    };

    requestChildrenDataSource = (idOrCode, parentId) => {
        let instance = this.getFormInstance();
        return new Promise(resolve => {
            let fieldSchema =
                this.getFieldSchema(idOrCode) ||
                this.getFieldSchemaByCode(idOrCode);
            let dataSourceConfig =
                fieldSchema?.["x-component-props"]?.["x-extra-props"]
                    ?.childrenDataSource;
            let apiData = null;

            if (dataSourceConfig) {
                apiData = dataSourceConfig;
            }
            if (apiData) {
                let _params = {
                    id: apiData.dataSourceId,
                    input: getRequestParams(
                        apiData.input,
                        instance,
                        {
                            parentId
                        },
                        getFormEnvValue,
                        {}
                    ),
                    output: apiData.output
                };
                requestApiById(_params)
                    .then(res => {
                        resolve(res.data);
                    })
                    .catch(() => {
                        resolve([]);
                    });
            } else {
                resolve([]);
                console.warn(
                    "requestChildrenDataSource :",
                    "dataSource configration not found"
                );
            }
        });
    };

    isMobile = () => {
        return this.isResponsiveSizeSmall();
    };

    isResponsiveSizeSmall = () => {
        return isResponsiveSizeSmall(this.getFormInstance());
    };

    subscribe = (type, event) => {
        let formInstance = this.getFormInstance();
        if (formInstance && type && typeof event === "function") {
            return formInstance.subscribe(p => {
                if (p.type && p.type === type) {
                    event(p.payload);
                }
            });
        }
    };

    unsubscribe = subscribeId => {
        let formInstance = this.getFormInstance();
        if (formInstance && subscribeId) {
            return formInstance.unsubscribe(subscribeId);
        }
    };

    notify = (type, payload) => {
        let formInstance = this.getFormInstance();
        return formInstance.notify(type, payload);
    };

    getElement = id => {
        let el = null;
        let formInstance = this.getFormInstance();
        if (id && formInstance) {
            el = formInstance.query(id).take();
        }
        return el;
    };

    getElementIdByCode = code => {
        let g = this.getFieldGraphByCode(code)[0];
        if (g) {
            return g.path;
        }
        let el = this.getFieldSchemasByCode(code)[0];
        if (el) {
            return el.name;
        }
        return null;
    };

    getElementsByCode2 = code => {
        let arr = [];

        let formInstance = this.getFormInstance();
        if (code && formInstance) {
            let schemas = this.getFieldSchemasByCode(code);
            schemas.forEach(d => {
                let name = d.name;
                let fieldState = formInstance.getFieldState(name);
                if (fieldState) {
                    arr.push({
                        ...fieldState,
                        name: fieldState.path
                    });
                }
            });

            if (schemas.length === 0) {
                console.error("no element schema found:", code);
            }

            if (arr.length === 0) {
                console.error("no element state found:", code);
            }
        }

        return arr;
    };

    getElementsByCode = code => {
        let arr = [];
        let hasGraph = false;
        let formInstance = this.getFormInstance();
        if (formInstance && code) {
            let graph = formInstance.getFormGraph();
            let tableGraph = [];
            for (const k in graph) {
                if (k && graph.hasOwnProperty(k)) {
                    hasGraph = true;
                    let g = graph[k];
                    let componentProps = g.component?.[1];
                    if (componentProps && g.isTableCellField !== true) {
                        let extraProps = componentProps["x-extra-props"] || {};
                        let ctype = extraProps.name?.toLowerCase();

                        if (ctype === "arraytable") {
                            tableGraph.push(g);
                        }

                        if (extraProps.formItemCode === code) {
                            let path = g.path;
                            if (path) {
                                arr.push({
                                    ...componentProps,
                                    name: path,
                                    path: g.address
                                });
                            }
                        }
                    }
                }
            }
        }

        if (hasGraph && arr.length === 0) {
            console.error("no element found:", code);
        }

        return arr;
    };

    getFormState = () => {
        let formInstance = this.getFormInstance();
        if (formInstance) {
            return formInstance.getFormState();
        }
        return null;
    };

    getFieldState = id => {
        let formInstance = this.getFormInstance();

        if (formInstance && id) {
            let state = formInstance.getFieldState(id);
            return state;
        }
        return null;
    };

    setFieldState = (id, fn) => {
        let formInstance = this.getFormInstance();

        if (formInstance && id && typeof fn === "function") {
            formInstance.setFieldState(id, fn);
        }
        return null;
    };

    setValue = (id, value, callback, nullAsDefault) => {
        let formInstance = this.getFormInstance();
        if (formInstance && id) {
            let field = formInstance.query(id).take();
            let state = null;
            if (field) {
                if (field.displayName === "ArrayField") {
                    //如果为表格组件，需要通过表格内部的方法设置值
                    let fn = field.fieldActions?.setData;
                    if (typeof fn === "function") {
                        fn(value, callback, nullAsDefault);
                    } else {
                        field.onInput(value);
                        if (typeof callback === "function") {
                            callback(id, value);
                        }
                        console.warn(
                            "setValue to ArrayTable but 'setData' function not found, replaced with 'onInput'"
                        );
                    }
                } else {
                    field.setState(s => {
                        s.value = value;
                        if (typeof callback === "function") {
                            callback(id, value);
                        }
                    });
                }
            }
            return state;
        }
        return null;
    };

    batch = batch;
    untracked = untracked;

    transformCodeValues = values => {
        if (typeof values === "object" && values) {
            if (values instanceof Array) {
                let arr = [];
                values.forEach(d => {
                    let item = {};
                    Reflect.ownKeys(d).forEach(k => {
                        let id = this.getFieldSchemasByCode(k)[0]?.name;
                        if (id) {
                            item[id] = d[k];
                        } else {
                            item[k] = d[k];
                        }
                    });
                    arr.push(item);
                });
                return arr;
            } else {
                let realValues = {};
                Reflect.ownKeys(values).forEach(k => {
                    let id = this.getFieldSchemasByCode(k)[0]?.name;
                    if (id) {
                        realValues[id] = values[k];
                    } else {
                        realValues[k] = values[k];
                    }
                });
                return realValues;
            }
        }
    };

    setFieldValues = values => {
        let formInstance = this.getFormInstance();
        if (formInstance && typeof values === "object" && values) {
            batch(() => {
                Reflect.ownKeys(values).forEach(k => {
                    let field = formInstance.query(k).take();
                    if (field) {
                        field.setValue(values[k]);
                    }
                });
            });
        }
    };

    setFieldValuesByCode = values => {
        let realValues = this.transformCodeValues(values);
        return this.setFieldValues(realValues);
    };

    setValues = (values, strategy = "merge") => {
        let formInstance = this.getFormInstance();
        if (formInstance && typeof values === "object" && values) {
            let state = formInstance.setValues(values, strategy);
            return state;
        }
    };

    setValuesByCode = (values, strategy = "merge") => {
        let realValues = this.transformCodeValues(values);
        return this.setValues(realValues, strategy);
    };

    getValue = id => {
        let formInstance = this.getFormInstance();

        if (formInstance && id) {
            let state = formInstance.getFieldState(id)?.value;
            return state;
        }
        return null;
    };

    getFieldComponentProps = id => {
        let formInstance = this.getFormInstance();
        if (formInstance && id) {
            let state = formInstance.getFieldState(id);
            if (state) {
                return state.component?.[1] || {};
            }
        }
        return null;
    };

    setFieldComponentProps = (id, values) => {
        let formInstance = this.getFormInstance();

        if (typeof values === "object" && values && formInstance) {
            if (id) {
                formInstance.setFieldState(id, state => {
                    let prev = state.componentProps || {};
                    state.componentProps = {
                        ...prev,
                        ...values
                    };
                });
            }
        }
    };

    getFieldAttribute = id => {
        let formInstance = this.getFormInstance();
        if (formInstance && id) {
            let state = formInstance.getFieldState(id);
            if (state) {
                let o = state.component?.[1]?.attribute || {};
                return { ...o };
            }
        }
        return null;
    };

    setFieldAttribute = (id, values) => {
        let formInstance = this.getFormInstance();

        if (typeof values === "object" && values && formInstance) {
            if (id) {
                formInstance.setFieldState(id, state => {
                    let prev = state.componentProps.attribute || {};
                    state.componentProps.attribute = {
                        ...prev,
                        ...values
                    };
                });
            }
        }
    };

    setDataSource = (id, data) => {
        let formInstance = this.getFormInstance();
        if (id && formInstance) {
            formInstance.setFieldState(id, state => {
                state.dataSource = data;
            });
        }
    };

    onLoad = (id, data, options) => {
        let formInstance = this.getFormInstance();
        if (id && formInstance) {
            formInstance.setFieldState(id, state => {
                state.dataSource = data;
                state.loading = false;
            });

            if (options) {
                let dataSource = data;
                //options.data为查找name的数据源，没有则从原始数据源中查找
                if (options.data instanceof Array) {
                    dataSource = options.data;
                }
                let { idField, nameField } = options;
                if (idField && dataSource instanceof Array) {
                    let field = formInstance.query(id).take();

                    if (field) {
                        let componentProps = field.component[1] || {};
                        let componentAttribute = componentProps.attribute || {};
                        let showLabelStrategy =
                            componentProps.showLabelStrategy ||
                            componentAttribute.showLabelStrategy;

                        let item = null;

                        dataSource.forEach(d => {
                            let _value = d[idField];
                            if (_value === field.value) {
                                item = d;
                            }
                            d.value = _value;
                        });

                        if (item) {
                            let _value = field.value;

                            let labelMap = {};
                            if (showLabelStrategy) {
                                labelMap = getLabelMap(dataSource);
                            }

                            let _label = labelMap[_value] || item[nameField];

                            field.onInput(_value, _label, item);
                        }
                    }
                }
            }
        }
    };

    addEvent = (id, type, event) => {
        let formInstance = this.getFormInstance();
        if (formInstance && id && typeof event === "function") {
            //前置事件只能注入到x-prepose-event,因为subscribe无法获取到返回值
            //注意事项:前置事件无法多次添加,会被后添加的覆盖;前置事件无法被dispatch
            let preEvents = [
                "onBeforeClick",
                "onBeforeClose",
                "onBeforeSearch",
                "onBeforeSelect"
            ];
            if (preEvents.indexOf(type) > -1) {
                formInstance.setFieldState(id, state => {
                    if (state.componentProps["x-prepose-event"]) {
                        state.componentProps["x-prepose-event"][type] = event;
                    } else {
                        state.componentProps["x-prepose-event"] = {
                            [type]: event
                        };
                    }
                });
            } else {
                return this.subscribe(id + "_" + type, event);
            }
        }
    };

    dispatchEvent = (id, type, args = {}) => {
        let formInstance = this.getFormInstance();

        if (formInstance) {
            formInstance.notify(id + "_" + type, {
                name: id,
                payload: args
            });
        }
    };

    addEventByCode = (code, type, event) => {
        let els = [];

        if (code) {
            els = this.getElementsByCode(code);
        }

        for (let i = 0; i < els.length; i++) {
            const el = els[i];
            let name = el?.name;

            if (name) {
                this.addEvent(name, type, event);
            }
        }
    };

    dispatchEventByCode = (code, type, args) => {
        let els = [];

        if (code) {
            els = this.getElementsByCode(code);
        }

        for (let i = 0; i < els.length; i++) {
            const el = els[i];
            let name = el?.name;

            if (name) {
                this.dispatchEvent(name, type, args);
            }
        }
    };

    getFieldStateByCode = code => {
        let id = this.getElementIdByCode(code);
        return this.getFieldState(id);
    };

    setFieldStateByCode = (code, fn) => {
        let id = this.getElementIdByCode(code);
        return this.setFieldState(id, fn);
    };

    setValueByCode = (code, value) => {
        let id = this.getElementIdByCode(code);
        return this.setValue(id, value);
    };

    getValueByCode = code => {
        let id = this.getElementIdByCode(code);
        return this.getValue(id);
    };

    getFieldComponentPropsByCode = code => {
        let id = this.getElementIdByCode(code);
        return this.getFieldComponentProps(id);
    };

    setFieldComponentPropsByCode = (code, values) => {
        let id = this.getElementIdByCode(code);
        this.setFieldComponentProps(id, values);
    };

    getFieldAttributeByCode = code => {
        let id = this.getElementIdByCode(code);
        return this.getFieldAttribute(id);
    };

    setFieldAttributeByCode = (code, values) => {
        let id = this.getElementIdByCode(code);
        return this.setFieldAttribute(id, values);
    };

    getRuntimeVar = id => {
        let props = this.getFieldComponentProps(id)?.["x-runtime"];
        return props || {};
    };

    getRuntimeVarByCode = code => {
        let id = this.getElementIdByCode(code);
        return this.getRuntimeVar(id);
    };

    getRecord = id => {
        let data = getRuntimeVar(id);
        return {
            data: data?.row,
            index: data?.index
        };
    };

    getValues = () => {
        let formInstance = this.getFormInstance();

        if (formInstance) {
            let state = formInstance.getFormState().values;
            return state;
        }
        return null;
    };

    /**
     * 获取已设置的业务数据
     * @param {string?} type 类型
     * @returns {{}} 业务数据
     */
    getBusinessData = type => {
        if (type) {
            return this.businessData[type];
        }
        return this.businessData;
    };

    /**
     * 设置业务数据
     * @param {string} id 字段id
     * @param {string} type 业务数据类型
     * @param {*} data 需要设置的数据
     * @returns {{}} 已设置的完整业务数据
     */
    setBusinessData = (id, type, data) => {
        let store = this.businessData || {};
        let old = store[type];
        if (old) {
            this.businessData[type] = { ...old, [id]: data };
        } else {
            this.businessData[type] = { [id]: data };
        }
        return this.businessData;
    };

    /**
     * 根据字段id或类型移除业务数据
     * @param {string?} id 字段id
     * @param {string?} type 业务数据类型
     * @returns {{}} 移除后的完整业务数据
     */
    removeBusinessData = (id, type) => {
        if (id) {
            if (type) {
                let typed = this.businessData[type];
                if (typed) {
                    if (Reflect.has(typed, id)) {
                        Reflect.deleteProperty(this.businessData[type], id);
                    }
                }
            } else {
                Reflect.ownKeys(this.businessData).forEach(k => {
                    let typed = this.businessData[k];
                    if (typed) {
                        if (Reflect.has(typed, id)) {
                            Reflect.deleteProperty(this.businessData[k], id);
                        }
                    }
                });
            }
        } else {
            if (type) {
                if (Reflect.has(this.businessData, type)) {
                    Reflect.deleteProperty(this.businessData, type);
                }
            }
        }
        return this.businessData;
    };

    getExtraData = () => {
        let formInstance = this.getFormInstance();

        if (formInstance) {
            let data = formInstance.getFormState().values?.["__DATA__"];
            return data;
        }
        return null;
    };

    setExtraData = values => {
        let formInstance = this.getFormInstance();

        if (values && typeof values === "object" && formInstance) {
            let prev = formInstance.getFieldState("__DATA__")?.value || {};
            let next = {
                ...prev,
                ...values
            };
            formInstance.setFieldState("__DATA__", s => {
                s.value = next;
            });
        }
    };

    isVirtualField = id => {
        let bl = false;
        let formInstance = this.getFormInstance();

        if (formInstance && id && typeof id === "string") {
            let temp = id.split(".");
            let name = temp[temp.length - 1];
            if (name) {
                let schema = this.getFieldSchema(name);
                if (schema?.type === "void") {
                    return true;
                }
            }

            let _path = id;
            _path = _path.replace(/.additionalProperties./g, "_toolbar.");
            let state = formInstance.getFieldState(_path);
            if (state) {
                if (state.displayName?.toLowerCase() === "voidfield") {
                    bl = true;
                } else {
                    let extraProps = state.component?.[1]?.["x-extra-props"];
                    let ctype = extraProps?.name?.toLowerCase();
                    bl = ["button", "label"].indexOf(ctype) > -1;
                }
            }
        }
        return bl;
    };

    setFieldErrors = (path, msg) => {
        let formInstance = this.getFormInstance();
        if (formInstance && path && msg) {
            let field = formInstance.query(path).take();
            if (field) {
                field.setSelfErrors([msg]);
            }
        }
    };

    /**
     * 设置表格非编辑态下的错误信息
     * @param {string} path
     * @param {[{index:number,dataIndex:string,messages:string[]}]} errors
     */
    setTableErrors = (path, errors) => {
        if (path) {
            let instance = this.getFormInstance();
            let arrayTable = instance.query(path).take();
            if (arrayTable && errors instanceof Array) {
                let _errors = [];

                let arrayPath = arrayTable.address.toString();

                let bl = true;

                for (let i = 0; i < errors.length; i++) {
                    const d = errors[i];
                    let index = d.index;
                    let dataIndex = d.dataIndex;
                    let messages = d.messages;

                    if (isNaN(index)) {
                        bl = false;
                    }

                    if (!dataIndex) {
                        bl = false;
                    }

                    if (!(messages instanceof Array)) {
                        bl = false;
                    }

                    if (bl === false) {
                        break;
                    }

                    let _address = arrayPath + "." + index + "." + dataIndex;

                    _errors.push({
                        address: _address,
                        messages: messages,
                        path: _address,
                        type: "custom",
                        title: d.title ?? "",
                        triggerType: "onInput",
                        code: "ValidateError"
                    });
                }

                if (bl === false) {
                    console.error(
                        "setTableErrors failed.The parameter is incorrect:",
                        errors
                    );
                    return;
                }

                setTableErrorsToExtraField(arrayPath, instance, _errors);
            }
        }
    };

    clearFieldErrors = path => {
        let formInstance = this.getFormInstance();
        if (formInstance && path) {
            let field = formInstance.query(path).take();
            if (field) {
                field.setSelfErrors([]);
            }
        }
    };

    focusField = idOrCode => {
        let form = this.getFormInstance();
        if (form) {
            let g = this.getFieldGraphByCode(idOrCode)[0];
            let fieldId = idOrCode;

            if (g) {
                fieldId = g.path;
            }
            let field = form.query(fieldId).take();

            if (field) {
                fieldId = field.path.toString();
                let wrapper = window.document.querySelector(
                    ".formx-container[data-form-id=" + form.id + "]"
                );
                //对.字符进行转义，避免元素查找失败
                fieldId = fieldId.replaceAll(".", "\\.");

                if (wrapper) {
                    try {
                        let el = wrapper.querySelector(
                            ".ant-formily-item[data-field-id=" + fieldId + "]"
                        );
                        if (el) {
                            let editorEL = el.getElementsByClassName(
                                "formx-field-focusable"
                            )[0];
                            if (editorEL) {
                                editorEL.focus();
                                return;
                            }

                            let selectEl =
                                el.getElementsByClassName(
                                    "ant-select-enabled"
                                )[0];

                            if (selectEl) {
                                selectEl.click();
                                return;
                            }

                            let inputEl = el.getElementsByTagName("input")[0];

                            if (inputEl) {
                                inputEl.focus();
                                return;
                            }

                            let buttonEL = el.getElementsByTagName("button")[0];

                            if (buttonEL) {
                                buttonEL.focus();
                                return;
                            }
                        }
                    } catch (error) {
                        console.error("focus field error", error);
                    }
                }
            }
        }
    };

    setLoading = (id, loading) => {
        let formInstance = this.getFormInstance();
        if (id && formInstance) {
            let field = formInstance.query(id).take();
            if (field && typeof field.setLoading === "function") {
                field.setLoading(!!loading);
            }
        }
    };

    setFieldLoading = (path, loading = false) => {
        let formInstance = this.getFormInstance();
        if (formInstance && path) {
            let field = formInstance.query(path).take();
            if (field) {
                field.setState(s => {
                    s.loading = loading;
                });
            }
        }
    };

    getFieldLoading = path => {
        let formInstance = this.getFormInstance();
        if (formInstance && path) {
            let field = formInstance.query(path).take();
            if (field) {
                return field.loading;
            }
        }
    };

    setFieldLoadingByCode = (code, loading = false) => {
        let id = this.getElementIdByCode(code);
        this.setFieldLoading(id, loading);
    };

    getFieldLoadingByCode = code => {
        let id = this.getElementIdByCode(code);
        return this.getFieldLoading(id);
    };

    getLoadingFields = () => {
        let formInstance = this.getFormInstance();
        let loadingFields = [];
        if (formInstance) {
            formInstance.query("*").forEach(_field => {
                if (_field.loading && _field.mounted) {
                    let title = _field.componentProps?.["x-extra-props"]?.title;
                    loadingFields.push({
                        path: _field.address.toString(),
                        title
                    });
                }
            });
        }
        return loadingFields;
    };

    setFormLoading = (loading = false) => {
        let formInstance = this.getFormInstance();
        if (formInstance) {
            formInstance.setLoading(loading);
        }
    };

    getFormLoading = () => {
        let formInstance = this.getFormInstance();
        if (formInstance) {
            return formInstance.loading;
        }
    };

    isLoading = () => {
        let bl = false;
        let formLoading = this.getFormLoading();
        if (formLoading === true) {
            bl = true;
            console.warn("Form is in loading status.");
        } else {
            let loadingFields = this.getLoadingFields();
            if (loadingFields.length > 0) {
                console.warn("Exist fields in loading status:");
                console.info(loadingFields);
                bl = true;
            }
        }
        return bl;
    };

    getFormErrors = () => {
        let formInstance = this.getFormInstance();
        if (formInstance) {
            return formInstance.getFormState().errors;
        }
        return null;
    };

    clearFormErrors = path => {
        let formInstance = this.getFormInstance();

        if (formInstance && path) {
            formInstance.clearErrors(path);
        }
    };

    setFormState = fn => {
        let formInstance = this.getFormInstance();
        if (formInstance && typeof fn === "function") {
            formInstance.setFormState(fn);
        }
        return null;
    };

    onFieldRequestDataSource = (id, fn) => {
        if (id && typeof fn === "function") {
            return this.subscribe(id + "_onFieldRequestDataSource", fn);
        }
        return null;
    };

    onFormValidate = (id, fn) => {
        if (id && typeof fn === "function") {
            let next = this.tasks.validateTasks || {};
            next[id] = fn;
            this.tasks.validateTasks = next;
        }
        return null;
    };

    onBeforeFormSubmit = (id, fn) => {
        if (id && typeof fn === "function") {
            let next = this.tasks.beforeSubmitTasks || {};
            next[id] = fn;
            this.tasks.beforeSubmitTasks = next;
        }
        return null;
    };

    onAfterFormSubmit = (id, fn) => {
        if (id && typeof fn === "function") {
            let next = this.tasks.afterSubmitTasks || {};
            next[id] = fn;
            this.tasks.afterSubmitTasks = next;
        }
        return null;
    };

    onBeforeFormSave = (id, fn) => {
        if (id && typeof fn === "function") {
            let next = this.tasks.beforeSaveTasks || {};
            next[id] = fn;
            this.tasks.beforeSaveTasks = next;
        }
        return null;
    };

    onAfterFormSave = (id, fn) => {
        if (id && typeof fn === "function") {
            let next = this.tasks.afterSaveTasks || {};
            next[id] = fn;
            this.tasks.afterSaveTasks = next;
        }
        return null;
    };

    onFormSaveFailed = (id, fn) => {
        if (id && typeof fn === "function") {
            let next = this.tasks.saveFailed || {};
            next[id] = fn;
            this.tasks.saveFailed = next;
        }
        return null;
    };

    onFormSubmitFailed = (id, fn) => {
        if (id && typeof fn === "function") {
            let next = this.tasks.submitFailed || {};
            next[id] = fn;
            this.tasks.submitFailed = next;
        }
        return null;
    };

    onBeforeSchemaSave = (id, fn) => {
        if (id && typeof fn === "function") {
            let next = this.tasks.beforeSchemaSave || {};
            next[id] = fn;
            this.tasks.beforeSchemaSave = next;
        }
        return null;
    };

    onFormLoad = (id, fn) => {
        if (id && typeof fn === "function") {
            let next = this.tasks.formLoad || {};
            next[id] = fn;
            this.tasks.formLoad = next;
        }
        return null;
    };

    callTask = (taskType, params) => {
        let type = {
            beforeSubmit: "beforeSubmitTasks",
            afterSubmit: "afterSubmitTasks",
            validate: "validateTasks",
            beforeSave: "beforeSaveTasks",
            afterSave: "afterSaveTasks",
            beforeSchemaSave: "beforeSchemaSave",
            formLoad: "formLoad",
            submitFailed: "submitFailed",
            saveFailed: "saveFailed"
        }[taskType];

        let formTasks = this.tasks[type] || {};

        let tasks = [];

        for (const k in formTasks) {
            if (Object.hasOwnProperty.call(formTasks, k)) {
                let fn = formTasks[k];
                if (typeof fn === "function") {
                    tasks.push(
                        new Promise((resolve, reject) => {
                            let res = fn(params);
                            if (res instanceof Promise) {
                                res.then(_res => {
                                    resolve(_res);
                                }).catch(e => {
                                    let msg = "";
                                    if (e) {
                                        msg = e;
                                    } else {
                                        let title =
                                            this.getFieldSchema(k)?.[
                                                "x-component-props"
                                            ]?.["x-extra-props"]?.title;

                                        if (title) {
                                            msg = title + ",未通过验证";
                                        } else {
                                            msg = "未知项,未通过验证";
                                        }
                                    }
                                    reject({ path: k, messages: [msg] });
                                });
                            } else {
                                if (res) {
                                    reject(res);
                                } else {
                                    resolve();
                                }
                            }
                        })
                    );
                }
            }
        }

        return new Promise((resolve, reject) => {
            if (tasks.length > 0) {
                Promise.allSettled(tasks).then(res => {
                    let errors = res
                        .filter(d => d.status === "rejected")
                        .map(d => d.reason);

                    if (errors.length > 0) {
                        reject(errors);
                    } else {
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        });
    };
}
