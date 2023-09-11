import { v4 as uuid } from "uuid";
import { each } from "@formily/shared";
import dayjs from "dayjs";
import { JSEncrypt } from "jsencrypt";

function isNum(v) {
    return isNaN(v) === false && v !== null;
}

export { each };

/**
 * 对表格设置的数据源进行转换
 * @param {*} output 
 * @returns 
 */
export function getListDataFieldMap(output) {

    let formatMap = {};
    let bl = false;

    let fieldMap = {};
    let targetFieldMap = {};

    if (output instanceof Array) {
        output.forEach(d => {
            if (d.field) {
                if (d.formatter) {
                    bl = true;
                    formatMap[d.field] = d.formatter;
                }

                if (d.fieldMap) {
                    bl = true;
                    fieldMap[d.field] = d.fieldMap;
                }

                if (d.targetField) {
                    bl = true;
                    let { key } = getItemIndex(d.targetField)
                    targetFieldMap[d.field] = key;
                }
            }
        });
    }

    return {
        needTransform: bl,
        formatMap,
        transformer: (item, k) => {
            let mapKey = fieldMap[k];
            if (mapKey) {
                item[mapKey] = item[k];
            }
            let targetFieldMapKey = targetFieldMap[k];
            if (targetFieldMapKey) {
                item[targetFieldMapKey] = item[k];
            }
        }
    }

}

export function formatNumberComma(value) {
    if (value === undefined || value === null) {
        return value;
    }
    let arr = String(value).split(".");
    let v = arr[0];
    let temp = [];
    v = v.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    temp.push(v);
    for (let i = 1; i < arr.length; i++) {
        temp.push(arr[i]);
    }
    return temp.join(".");
}

export function formatDateValue(value, format) {
    if (value) {
        let _format = format;
        if (typeof format === "string" && format) {
            _format = format.replace("hh", "HH");
        }
        let momentable = dayjs(value, _format);
        return momentable.format(_format);
    } else {
        return value;
    }
}

export function guid(prefix = "f") {
    let uid = uuid().replace(/-/g, "");
    return prefix + uid;
}

/**
 * 匹配路径中的索引
 * 表格组件存在编辑、非编辑两种模式，编辑模式时需要使用表单项真实id进行值的操作，非编辑模式需要使用数据中的dataIndex数据key进行操作
 * @路径 {string} path 如：a.1.b
 */
/**
2022年6月24日 如果使用form获取表格state，当数据量大时会造成明显的性能问题；
而由于表格在render时已经将数据接口中的字段值同步到真实字段id中，故可不需获取表格state拿dataIndex，直接使用列的真实id即可，故使用此方法的地方均不再传递form参数；
将会产生的问题如下：表格数据源来自于接口时，修改列值时不会及时同步到接口对应的字段中，点击完成编辑时方进行同步；
 */
export function getItemIndex(path, form) {
    let itemIndex = -1;

    let parentKey = "";
    let key = "";

    let index = "";
    let dataIndex = "";

    let pathArr = path.split(".");

    for (let i = 0; i < pathArr.length; i++) {
        if (isNum(pathArr[i])) {
            index = pathArr[i] + "";
            break;
        }
    }

    if (index) {
        let arr = path.split("." + index + ".");
        parentKey = arr[0];
        key = arr[1];
        itemIndex = index;
        dataIndex = key;

        if (form) {
            let itemState = form.getFieldState(path);

            let itemIsSchema = false;
            let itemIsEditing = false;

            if (itemState) {
                //如果产生了state，则为编辑模式
                itemIsEditing = true;
                if (
                    itemState.componentProps?.["x-extra-props"]
                        .isRenderSchema === true
                ) {
                    itemIsSchema = true;
                }
            }

            //非编辑模式需要通过dataIndex获取数据
            //renderSchema模式也需要通过dataIndex获取数据，因为此时的通过key无法获取到真实数据
            if (!itemIsEditing || itemIsSchema) {
                let listState = form.getFieldState(parentKey);
                if (
                    listState &&
                    typeof listState.fieldActions?.getItemDataIndex ===
                    "function"
                ) {
                    //获取表单项key对应的dataIndex
                    dataIndex = listState.fieldActions.getItemDataIndex(key);
                }
            }
        }
    } else {
        let pathArr = path.split(".items.");
        if (pathArr.length > 1) {
            parentKey = pathArr[0];
            key = pathArr[1];
            dataIndex = key;
            if (form) {
                let listState = form.query(parentKey).take();
                if (
                    listState &&
                    typeof listState.fieldActions?.getItemDataIndex ===
                    "function"
                ) {
                    //获取表单项key对应的dataIndex
                    dataIndex = listState.fieldActions.getItemDataIndex(key);
                }

                //如果传递的path为表格列，则查找表格正在编辑的行索引
                if (listState) {
                    let edittingKey = "";
                    let editKeys = listState.componentProps.editKeys;
                    let arr = listState.value;

                    if (editKeys instanceof Array && editKeys.length > 0) {
                        edittingKey = editKeys[editKeys.length - 1];
                    }

                    if (edittingKey && arr instanceof Array && arr.length > 0) {
                        let index = arr.findIndex(d => d["__KEY__"] === edittingKey);
                        if (index > -1) {
                            itemIndex = index + "";
                        }
                    }
                }
            }
        } else {
            let pathArr = path.split(".toolbar_");
            if (pathArr.length > 1) {
                parentKey = pathArr[0];
            } else {
                parentKey = getParentPath(path);
            }
        }
    }
    if (parentKey.indexOf("__DATA__") > -1) {
        parentKey = "";
    }
    return {
        index: itemIndex,
        parentKey,
        key,
        dataIndex
    };
}

export function callEventWithPrepose(fn, preFn, payload) {
    if (typeof fn === "function") {
        if (typeof preFn === "function") {
            let res = preFn(payload);
            if (res instanceof Promise) {
                res.then(d => {
                    if (d !== false) {
                        fn(payload);
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

export function getParentPath(path) {
    let parentPath = "";
    let pathArr = path.split(".");
    let key = "";
    if (pathArr.length > 1) {
        key = pathArr[pathArr.length - 1];
    }
    if (key) {
        pathArr = path.split("." + key);
    }
    if (pathArr.length > 1) {
        parentPath = pathArr[0];
    }
    return parentPath;
}

export function replacePathKey(path, key) {
    let parentPath = getParentPath(path);
    if (parentPath) {
        return parentPath + "." + key;
    }
    return key;
}

export function mapSchemaItems(items, fn, o) {
    let options = o || { paths: [], title: [], parent: null };

    function isEmptyItems(_schema) {
        let bl = false;
        if (_schema.items) {
            if (_schema.items.properties) {
                if (Object.keys(_schema.items.properties).length === 0) {
                    bl = true;
                }
            } else {
                bl = true;
            }
        } else {
            bl = true;
        }
        return bl;
    }

    if (items && typeof items.properties === "object" && items.properties) {
        for (const key in items.properties) {
            let props = items.properties[key];

            let o = {
                paths: options.paths.slice(),
                title: options.title.slice(),
                parent: options.parent
            };

            o.paths.push(props.name);
            let cprops = props["x-component-props"] || {};
            let extraProps = cprops["x-extra-props"] || {};
            let currTitle = "";
            if (cprops.hasOwnProperty("title")) {
                currTitle = cprops.title;
            } else {
                currTitle = props.title;
            }
            if (currTitle) {
                if (
                    extraProps.extraNameFieldKey ||
                    extraProps.relatedNameFieldKey
                ) {
                    currTitle = currTitle + "_id";
                }
                o.title.push(currTitle);
            }

            let item = o;
            if (typeof fn === "function") {
                item = fn(props, key, {
                    ...o,
                    leaf: isEmptyItems(props)
                });
            }

            if (props.items) {
                o.parent = {
                    key: props.key,
                    name: props.name,
                    path: props.name,
                    "x-extra-props": props["x-extra-props"]
                };
                mapSchemaItems(props.items, fn, o);
            }
        }
    }
}

export function eachSchemaItems(root, callback) {
    function hasItems(o) {
        if (
            o &&
            typeof o.items === "object" &&
            o.items &&
            Object.keys(o.items).length > 0
        ) {
            return true;
        }
        return false;
    }
    function isObject(o) {
        return o
            ? (typeof o === "object" && o !== null && !(o instanceof Array))
            : false;
    }

    let rootPath = [];

    if (isObject(root)) {
        let rootExtra = root["x-extra-props"] || {};
        let rp = rootExtra["data-path"];
        if (rp) {
            rootPath = [rp];
        }

        if (hasItems(root)) {
            mapChildren(root.items.properties || {}, rootPath, "items");
        } else {
            mapChildren(root.properties || {}, rootPath);
        }
    }

    function mapChildren(node, prevPath, prefix = "") {
        let index = 0;
        for (const k in node) {
            let d = node[k];

            let nodePath = prevPath.slice();
            if (prefix) {
                nodePath.push(prefix + "." + k);
            } else {
                nodePath.push(k);
            }

            let bl = callback(k, d, index, nodePath);

            if (bl === false) {
                return;
            }

            if (isObject(d)) {
                if (hasItems(d)) {
                    mapChildren(d.items.properties || {}, nodePath, "items");
                } else {
                    mapChildren(d.properties || {}, nodePath);
                }
            }
            index++;
        }
    }
}

export function transformComponentValue(schema, value, instance) {
    let ctype = schema.componentName?.toLowerCase();
    let extraProps = schema.extraProps;

    let _value = value;

    if (extraProps) {
        if (["checkbox"].indexOf(ctype) > -1) {
            _value = transformCommaValuesToArray(value);
        } else if (["select", "treeselect", "tree"].indexOf(ctype) > -1) {
            if (extraProps.selectMode === "multiple") {
                _value = transformCommaValuesToArray(value);
            }
        } else if (["switch"].indexOf(ctype) > -1) {
            _value = value == "1" ? true : false;
        }

        if (extraProps.relatedKey) {
            let relatedFieldState = instance.getFieldState(
                extraProps.relatedKey
            );

            if (relatedFieldState) {
                let relatedExtraProps =
                    relatedFieldState.componentProps?.["x-extra-props"] || {};
                let relatedCtype = relatedExtraProps.name?.toLowerCase();

                if (["checkbox"].indexOf(relatedCtype) > -1) {
                    _value = transformCommaValuesToArray(value);
                } else if (
                    ["select", "treeselect", "tree"].indexOf(relatedCtype) > -1
                ) {
                    if (relatedExtraProps.selectMode === "multiple") {
                        _value = transformCommaValuesToArray(value);
                    }
                }
            }
        }
    }

    return _value;
}

export function transformCommaValuesToArray(value) {
    const SPLIT_CHAR = ",";
    let _value = value;
    if (typeof value === "string" && value) {
        _value = value.split(SPLIT_CHAR);
    }
    return _value;
}

export function transformArrayValuesToComma(value) {
    const SPLIT_CHAR = ",";
    let _value = value;
    if (value instanceof Array) {
        _value = value.join(SPLIT_CHAR);
    }
    return _value;
}

export function formatNamedValueWhenChange(value, label, keyField = "key") {
    let _value = null,
        _label = null;

    if (typeof value === "object") {
        if (value instanceof Array) {
            let keys = [],
                labels = [];

            value.map(d => {
                keys.push(d[keyField]);
                labels.push(d.label);
            });

            if (keys.length > 0) {
                _value = keys;
            }

            if (labels.length > 0) {
                _label = labels;
            }
        } else {
            _value = value[keyField];
            _label = label;
        }
    } else {
        _value = value;
        _label = label;
    }

    return {
        value: _value,
        label: _label
    };
}

export function formatNamedValue(value, values, isMultiple) {
    let objectValue = undefined;
    if (value) {
        let extraNameValue = values[1] ?? "";
        if (value instanceof Array) {
            objectValue = [];
            let labels = [];

            if (extraNameValue instanceof Array) {
                labels = extraNameValue;
            } else {
                if (isMultiple) {
                    labels = transformCommaValuesToArray(extraNameValue);
                } else {
                    labels = [extraNameValue];
                }
            }

            value.forEach((d, i) => {
                objectValue.push({
                    key: d,
                    value: d,
                    label: labels[i]
                });
            });
        } else if (typeof value === "string") {
            if (isMultiple === true) {
                let keys = transformCommaValuesToArray(value);
                let labels = transformCommaValuesToArray(extraNameValue);
                objectValue = [];
                keys.forEach((d, i) => {
                    objectValue.push({
                        key: d,
                        value: d,
                        label: labels[i]
                    });
                });
            } else {
                objectValue = {
                    key: value,
                    value: value,
                    label: extraNameValue
                };
            }
        }
    }
    return objectValue;
}

//下拉、下拉树，如果有id但无lable，则在数据源加载完成后，重新触发onChange以反写label及行数据值
export function triggerOnChangeWhenDataLoaded(value, data, onChange) {
    if (value) {
        let dataMap = {};
        data.forEach(d => {
            dataMap[d.value] = d;
        });
        if (value instanceof Array) {
            let values = [];
            let items = [];
            if (value.length > 0) {
                let bl = false;
                value.forEach(d => {
                    let selected = dataMap[d.value] || {};
                    let item = { ...d };
                    if (selected) {
                        if (!item.label) {
                            item.label = selected.label;
                            bl = true;
                        }
                    }
                    values.push(item);
                    items.push(selected);
                });
                if (bl) {
                    onChange(values, undefined, items);
                }
            }
        } else if (!value.label) {
            let selected = dataMap[value.value];
            if (selected) {
                onChange(selected.value, selected.label, selected);
            }
        }
    }
}

export const decryptString = (text) => {

    if (typeof text === "number" && !isNaN(text)) {
        text = text.toString();
    }

    if (typeof text === "string" && text.length > 0) {
        let privateKey = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAJzARBzfyEkgdZCL9lyIJVdmX+AyzjbdWPmTtyWB61uJyP9aDrCJzuzxjpD0lLnaS5uj55rYdyvPRpJk4QOCvaylQjYC5rlr4pSdQwK97jAr4LMqRG0rPgQ0RnBAo1+hexST7WTkkHrWtiN5CpN/y0XierJz3ksrQllSuqBWFMDhAgMBAAECgYAnTodF/k/JFpykfJRwq6tBeWh9XgAb/fF71DDO9P9B2xFOBxU767K58/DeJJbO7BCdnMJNMA7iK33049sQ+E37gW4pmBP+kQE2gYRHdOHfv/2VEorBq0tDbH/RNXcmPSQhRIOKMTLAimzvbO33205hVjBHawkZvvejcgrxT2Gp6QJBAOkZWVB35Vtttmz1sSn6zz+A9aHFpjUoUuf0Ik9u2F145ahGrl26hLXH/Fo/0QsHmBizJ1gn+9bj/d0XhI1rhpMCQQCsJrJKmZgTU4I1PlFncNRitfXr8cRH+fwS2jzpYTWKsXxUmX4IBUI4xZ9hYSnO7Et8TZvxTV4wfNn8EIjiIW87AkEAigNDOXyzpO2RrHPQIK3qlYvyY4UWArVMWR/YTLWxj65sM7UdukscFlFBXeIZEHG/oSg57F1IJBS7k3NAPUdj1wJALU8uA+ZzGTsUfTD+uev/ak+b/1Ktp4gLKWcZOw+jyPI32AhiHHhN2qVg8n9hQp38rCW9EoCbdsWVlftAG8xS+wJAOayzd77cAqule52wIz7LER8DsEo5IQAzGp579U6bMQQCXeHQ4CrpN7zZzgcHR1IGdAGKBJkEWHbaKkbpAejKhA==";

        const jsEncrypt = new JSEncrypt();
        jsEncrypt.setPrivateKey(privateKey)
        let decrypted = jsEncrypt.decrypt(text);
        return decrypted;
    }
    return text;
};

export const encryptString = (text) => {

    let publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCcwEQc38hJIHWQi/ZciCVXZl/gMs423Vj5k7clgetbicj/Wg6wic7s8Y6Q9JS52kubo+ea2Hcrz0aSZOEDgr2spUI2Aua5a+KUnUMCve4wK+CzKkRtKz4ENEZwQKNfoXsUk+1k5JB61rYjeQqTf8tF4nqyc95LK0JZUrqgVhTA4QIDAQAB";

    if (typeof text === "number" && !isNaN(text)) {
        text = text.toString();
    }

    if (typeof text === "string" && text.length > 0) {
        const jsEncrypt = new JSEncrypt();
        jsEncrypt.setPublicKey(publicKey);
        let encrypted = jsEncrypt.encrypt(text);
        return encrypted;
    }
    return text
};
