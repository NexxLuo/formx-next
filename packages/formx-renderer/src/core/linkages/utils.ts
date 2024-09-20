import { getItemIndex } from "../utils";
import Decimal from "decimal.js";

export function getExpressionVar(name: string, sourcePath?: string) {
    //由于表格的行数据联动时需要指定index，故将表达式内容中的items替换为当前的行index
    let { index } = getItemIndex(name);
    let sourceIndex = -1;
    if (sourcePath) {
        sourceIndex = getItemIndex(sourcePath).index;
    }

    return {
        items: index,
        sourceIndex: sourceIndex
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

export const isValidNumber = (v: any) => {
    if (typeof v !== "string" && typeof v !== "number") {
        return false;
    }
    if (typeof v === "string" && v.indexOf(".") === v.length - 1) {
        return false;
    }
    if (v === null || isNaN(Number(v))) {
        return false;
    }
    return true;
};

type NumberUnitOptionsType = {
    value: any;
    unit:
        | "percentage"
        | "thousand"
        | "tenThousand"
        | "million"
        | "tenMillion"
        | "oneHundredMillion";
    precision?: number;
};

const getNumberDisplayValueByUnit = ({
    value,
    unit,
    precision
}: NumberUnitOptionsType) => {
    let realValue = value;
    let displayValue = realValue;

    let isZero = Number(realValue) === Number(0);

    if (isValidNumber(realValue) && !isZero) {
        let num: Decimal = new Decimal(realValue);

        switch (unit) {
            case "percentage":
                displayValue = num.mul(100);
                break;
            case "thousand":
                displayValue = num.div(1000);
                break;
            case "tenThousand":
                displayValue = num.div(10000);
                break;
            case "million":
                displayValue = num.div(1000000);
                break;
            case "tenMillion":
                displayValue = num.div(10000000);
                break;
            case "oneHundredMillion":
                displayValue = num.div(100000000);
                break;
            default:
                break;
        }

        if (Decimal.isDecimal(displayValue)) {
            if (typeof precision === "number") {
                displayValue = displayValue
                    .toDP(precision, Decimal.ROUND_HALF_UP)
                    .toNumber();
            } else {
                displayValue = displayValue.toString();
            }
        }
    }

    return displayValue;
};

const getNumberRealValueByUnit = ({
    value,
    unit,
    precision
}: NumberUnitOptionsType) => {
    let displayValue = value;
    let realValue = displayValue;

    let isZero = Number(displayValue) === Number(0);

    if (isValidNumber(displayValue) && !isZero) {
        let num: Decimal = null;

        //需将原值进行小数位保留，否则会导致计算后的值不正确
        if (typeof precision === "number") {
            num = new Decimal(displayValue).toDP(precision);
        } else {
            num = new Decimal(displayValue);
        }

        switch (unit) {
            case "percentage":
                realValue = num.div(100);
                break;
            case "thousand":
                realValue = num.mul(1000);
                break;
            case "tenThousand":
                realValue = num.mul(10000);
                break;
            case "million":
                realValue = num.mul(1000000);
                break;
            case "tenMillion":
                realValue = num.mul(10000000);
                break;
            case "oneHundredMillion":
                realValue = num.mul(100000000);
                break;
            default:
                break;
        }

        if (Decimal.isDecimal(realValue)) {
            realValue = realValue.toNumber();
        }
    }

    return realValue;
};

export const getNumberValueByUnit = (
    options: NumberUnitOptionsType & { type: "real" | "display" }
) => {
    if (options.type === "real") {
        return getNumberRealValueByUnit(options);
    } else {
        return getNumberDisplayValueByUnit(options);
    }
};
