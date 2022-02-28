import FormEnvs from "./FormEnvs";
import FormFunction from "./FormFunction";
import {
    requestApiById,
    getLabelMap,
    setTableErrorsToExtraField,
    isResponsiveSizeSmall
} from "../extensions/utils";

export default class FormActions {
    constructor(instance, $observable, _consumer) {
        this.getFormInstance = () => {
            return instance;
        };
        this.formEnvs = new FormEnvs();
        this.formFunction = new FormFunction();
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

        this.tasks = {};
    }

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
                        let _input = {};
                        if (typeof params === "function") {
                            _input = params(apiData.input, apiData);
                        } else {
                            _input = params;
                        }
                        let _params = {
                            id: apiData.dataSourceId,
                            input: _input,
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
        let el = this.getElementsByCode(code)[0];
        if (el) {
            return el.name;
        }
        return null;
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

    getValues = () => {
        let formInstance = this.getFormInstance();

        if (formInstance) {
            let state = formInstance.getFormState().values;
            return state;
        }
        return null;
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

        if (formInstance && id) {
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
                        type: "error",
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

                arrayTable.data = {
                    validateResult: _errors
                };

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

    setLoading = (id, loading) => {
        let formInstance = this.getFormInstance();
        if (id && formInstance) {
            formInstance.setFieldState(id, state => {
                state.loading = !!loading;
            });
        }
    };

    setFieldLoading = (path, loading = false) => {
        let formInstance = this.getFormInstance();
        if (formInstance && path) {
            let field = formInstance.query(path).take();
            if (field) {
                field.setLoading(loading);
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
            formLoad: "formLoad"
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
