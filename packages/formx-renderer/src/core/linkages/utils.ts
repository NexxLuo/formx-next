import { getItemIndex } from "../utils";

export function getExpressionVar(name: string) {
    //由于表格的行数据联动时需要指定index，故将表达式内容中的items替换为当前的行index
    let { index } = getItemIndex(name);

    return {
        items: index
    };
}

function getChildrenGraph(graph: object, path: string) {
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

/**
 * 将 array.items.key1 中的items转换为表格正在编辑中的索引
 * @param {string} path 包含items的路径
 * @param {*} form
 */
export function transformArrayItemsPath(path: string, form: any) {
    let pathArr = path.split(".items.");
    if (pathArr.length > 1) {
        let listKey = pathArr[0];
        let itemKey = pathArr[1];
        let itemIndex: string | number = -1;

        //获取表格组件未卸载的表单项（即为编辑中的表单项）
        let gArr = getChildrenGraph(form.getFormGraph(), listKey);
        let itemGraph = null;
        if (gArr instanceof Array) {
            itemGraph = gArr.find(d => {
                return (
                    d.mounted === true &&
                    d.unmounted === false &&
                    d.path.indexOf(itemKey) > 0
                );
            });
        }
        //

        //从编辑中的表单项路径中匹配出索引
        if (itemGraph) {
            let itemPathArr = itemGraph.path.split(".");
            for (let i = 0; i < itemPathArr.length; i++) {
                let _index = itemPathArr[i];
                if (isNaN(_index) === false && _index !== null) {
                    itemIndex = _index + "";
                    break;
                }
            }
        }
        //

        if (Number(itemIndex) > -1) {
            path = path.replace(".items.", "." + itemIndex + ".");
        }
    }

    return path;
}

/**
 * 转换样式字符串为object
 * @param {string | CSSStyleDeclaration} style eg :"color:red,fontWeight:bold,fontSize:20px" or {}
 * @returns CSSStyleDeclaration
 */
export function parseStyleString(style: string | object) {
    let styles = {};
    if (typeof style === "string" && style.length > 0) {
        style.split(",").forEach(d => {
            let temp = d.split(":");
            let k = temp[0],
                v = temp[1];
            if (k) {
                styles[k] = v;
            }
        });
    } else if (typeof style === "object" && style) {
        styles = { ...style };
    }
    return styles;
}

export function getEnv(instance: any, k: string, injectEnvs: object) {
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

export function getParentPath(path: string) {
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

export function replacePathKey(path: string, key: string) {
    let parentPath = getParentPath(path);
    if (parentPath) {
        return parentPath + "." + key;
    }
    return key;
}
