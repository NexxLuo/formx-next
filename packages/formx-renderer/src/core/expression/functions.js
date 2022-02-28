import dayjs from "dayjs";
import { create, all } from "mathjs";
import { formatNumberComma } from "../utils";

const MathCalc = create(all, {
    number: "BigNumber"
});

function toNumber(v) {
    let value = 0;

    let temp = Number(v);

    if (!isNaN(temp)) {
        value = temp;
    }

    return value;
}

function getArgs(_args) {
    let args = Array.prototype.slice.call(_args);
    let values = [];

    if (args.length > 0) {
        for (let i = 0; i < args.length; i++) {
            const arg = args[i];

            if (arg instanceof Array) {
                values = values.concat(arg);
            } else {
                values.push(arg);
            }
        }
    }

    return values;
}

export function Sum() {
    let value = 0;
    let values = getArgs(arguments);

    value = MathAdd(...values);

    return value;
}

export function Average() {
    let value = 0;
    let values = getArgs(arguments);

    value = MathDivide(MathAdd(...values), values.length);

    return value;
}

export function Count() {
    let values = getArgs(arguments);
    let i = 0;

    values.forEach(v => {
        if (v !== null && v !== undefined) {
            i++;
        }
    });

    return i;
}

export function Min() {
    let values = getArgs(arguments);

    let value = null;

    values.forEach(a => {
        let v = toNumber(a);

        if (value === null) {
            value = v;
        } else {
            if (v < value) {
                value = v;
            }
        }
    });

    return value;
}

export function Max() {
    let values = getArgs(arguments);

    let value = null;

    values.forEach(a => {
        let v = toNumber(a);

        if (value === null) {
            value = v;
        } else {
            if (v > value) {
                value = v;
            }
        }
    });

    return value;
}

export function IF(con, y, n) {
    if (con) {
        return y;
    } else {
        return n;
    }
}

//日期操作函数
export function DateTimeNow() {
    return dayjs().format("YYYY/MM/DD HH:mm:ss");
}

export function ToDateTime(v, format = "YYYY/MM/DD HH:mm:ss") {
    if (format) {
        let _format = format;
        if (typeof format === "string") {
            _format = format.replace("hh", "HH");
        }
        return new Date(dayjs(v).format(_format));
    }
    return new Date(v);
}

export function DateTimeFormat(v, format) {
    if (v) {
        let _format = format;
        if (typeof format === "string" && format) {
            _format = format.replace("hh", "HH");
        }
        return dayjs(v).format(_format);
    }
    return v;
}

//区间计算
/**
 * 后者与前者的时间差
 * @param {*} a
 * @param {*} b
 * @param {*} type years、quarter、mouths、weeks、days、hours、minutes、seconds、milliseconds
 *  */
export function DiffDateTime(a, b, type) {
    if (!a || !b) {
        return null;
    }
    const date1 = dayjs(b);
    let v = date1.diff(a, type, false);
    return v;
}
//

/**
 * 日期加减运算
 * @param {*} a
 * @param {*} b  正数为+，负数为减法
 * @param {*} type years、quarter、mouths、weeks、days、hours、minutes、seconds、milliseconds
 */
export function CalcDateTime(a, b, type) {
    if (!a) {
        return null;
    }

    if (!b) {
        b = 0;
    }

    const date1 = dayjs(a);
    let v = date1.add(b, type).format("YYYY/MM/DD HH:mm:ss");
    return v;
}
//

export function MapValue() {
    let args = Array.prototype.slice.call(arguments);

    let value = args[0];

    let obj = {};

    let i = 1;

    while (i < args.length) {
        let arg = args[i];
        obj[arg] = args[i + 1];

        i += 2;
    }

    return obj[value] ?? value;
}

export function IsNullOrEmpty(v) {
    return v === undefined || v === null || v === "";
}

export function IfNull(v, res) {
    let bl = v === undefined || v === null || v === "";
    if (typeof res === "undefined") {
        return v;
    }
    if (bl === true) {
        return res;
    } else {
        return v;
    }
}

export function Contains() {
    let args = Array.prototype.slice.call(arguments);

    if (args.length === 0) {
        return false;
    }

    let value = args[0];

    let arr = [];

    //如果第一个参数为数组，则第一个参数为查找源，后续参数为需要查找的关键字集合
    //否则第一个参数为查找的关键字，后续参数为查找源
    if (value instanceof Array) {
        let bl = false;
        let values = {};
        for (let j = 1; j < args.length; j++) {
            const d = args[j];
            if (d !== null && d !== undefined) {
                if (d instanceof Array) {
                    d.forEach(_d => {
                        values[_d] = true;
                    });
                } else {
                    values[d] = true;
                }
            }
        }

        for (let k = 0; k < value.length; k++) {
            const e = value[k];
            if (values[e]) {
                bl = true;
                break;
            }
        }

        return bl;
    } else {
        let i = 1;
        while (i < args.length) {
            if (args[i] instanceof Array) {
                args[i].forEach(d => {
                    arr.push(d);
                });
            } else {
                arr.push(args[i]);
            }

            i += 1;
        }
        return arr.indexOf(value) > -1;
    }
}

export function Like(a, b) {
    let bl = false;
    if (IsNullOrEmpty(a)) {
        return bl;
    }
    if (typeof a === "string" || a instanceof Array) {
        return a.indexOf(b) > -1;
    }
    return bl;
}

export function NotLike(a, b) {
    let bl = false;
    if (IsNullOrEmpty(a)) {
        return bl;
    }
    if (typeof a === "string" || a instanceof Array) {
        return a.indexOf(b) === -1;
    }
    return bl;
}

export function GetLength(v) {
    let len = 0;

    if (v !== null && typeof v !== "undefined") {
        if (typeof v === "object") {
            len = v.length || 0;
        } else {
            len = String(v).length;
        }
    }

    return len;
}

export function GetProperty(values, p) {
    let value = null;
    if (typeof values === "object" && values && p) {
        let o = values;
        if (values instanceof Array) {
            o = values[0] || {};
        }
        value = o[p];
    }
    return value;
}

export function JSONParse(str) {
    let value = null;
    if (typeof str === "string" && str) {
        value = JSON.parse(str);
    }
    return value;
}

export function JSONStringify(values) {
    let value = null;
    if (typeof values === "object" && values) {
        value = JSON.stringify(values);
    }
    return value;
}

export function StringConcat() {
    let values = getArgs(arguments);
    let value = values.join("");
    return value;
}

export function ToString(v) {
    let value = String(v);
    return value;
}

export function ToNumber(v, precision) {
    let value = Number(v);
    if (isNaN(value)) {
        value = 0;
    }
    if (typeof precision === "number") {
        value = Number(value.toFixed(precision));
    }
    return value;
}

export function ToDecimal(v, precision) {
    let value = Number(v);
    if (isNaN(value)) {
        value = 0;
    }
    if (typeof precision === "number") {
        value = value.toFixed(precision);
    }
    return value;
}

export function IsEqual(a, b) {
    return a == b;
}

export function IsStrictlyEqual(a, b) {
    return a === b;
}

export function Not(v) {
    return !v;
}

export function MathAdd() {
    let args = Array.prototype.slice.call(arguments);

    if (args.length === 0) {
        return 0;
    }

    if (args.length === 1) {
        return args[0];
    }

    let first = Number(args[0]);
    if (isNaN(first)) {
        first = 0;
    }

    let c = MathCalc.chain(MathCalc.bignumber(first));

    let i = 1;

    let value = 0;

    while (i < args.length) {
        let v = Number(args[i]);
        if (typeof v === "number" && !isNaN(v)) {
            c = c.add(MathCalc.bignumber(v));
        }
        i += 1;
    }
    value = c.done();
    if (typeof value?.toNumber === "function") {
        value = value.toNumber();
    } else {
        value = 0;
    }
    return value;
}

export function MathSubtract() {
    let args = Array.prototype.slice.call(arguments);

    if (args.length === 0) {
        return 0;
    }

    if (args.length === 1) {
        return args[0];
    }

    let first = Number(args[0]);
    if (isNaN(first)) {
        first = 0;
    }

    let c = MathCalc.chain(MathCalc.bignumber(first));
    let i = 1;

    let value = 0;

    while (i < args.length) {
        let v = Number(args[i]);
        if (typeof v === "number" && !isNaN(v)) {
            c = c.subtract(MathCalc.bignumber(v));
        }
        i += 1;
    }

    value = c.done();
    if (typeof value?.toNumber === "function") {
        value = value.toNumber();
    } else {
        value = 0;
    }

    return value;
}

export function MathMultiply() {
    let args = Array.prototype.slice.call(arguments);

    if (args.length === 0) {
        return 0;
    }

    if (args.length === 1) {
        return args[0];
    }

    let first = Number(args[0]);
    if (isNaN(first)) {
        first = 0;
    }

    let c = MathCalc.chain(MathCalc.bignumber(first));
    let i = 1;

    let value = 0;

    while (i < args.length) {
        let v = Number(args[i]);
        if (typeof v === "number" && !isNaN(v)) {
            c = c.multiply(MathCalc.bignumber(v));
        }
        i += 1;
    }
    value = c.done();
    if (typeof value?.toNumber === "function") {
        value = value.toNumber();
    } else {
        value = 0;
    }
    return value;
}

export function MathDivide() {
    let args = Array.prototype.slice.call(arguments);

    if (args.length === 0) {
        return 0;
    }

    if (args.length === 1) {
        return args[0];
    }

    let first = Number(args[0]);
    if (isNaN(first)) {
        first = 0;
    }

    let c = MathCalc.chain(MathCalc.bignumber(first));
    let i = 1;

    let value = 0;

    while (i < args.length) {
        let v = Number(args[i]);
        if (typeof v === "number" && !isNaN(v)) {
            c = c.divide(MathCalc.bignumber(v));
        }
        i += 1;
    }
    value = c.done();
    if (typeof value?.toNumber === "function") {
        value = value.toNumber();
    } else {
        value = 0;
    }
    return value;
}

export function GetId(v) {
    let value = "";

    if (typeof v === "string" && v) {
        let _v = v.replace(/value\('([^<]*?)'\)/g, "$1").split(".");
        value = _v[_v.length - 1];
    }

    return value;
}

/**
 * 根据条件表达式过滤数据源
 * 表达式中如果想获取其他字段的值可使用GetId函数包装表单项，如：item[GetId("表格.column1")]
 * 完整用例 Filter(表格,'item[GetId("表格.column1")]=="a"?true:false',GetId("表格.column2"))
 * @param {Array} items 数据源
 * @param {string} expr 过滤表达式，支持item:any、value:(fieldId:string)=>any两个参数
 * @param {*} returnedField 过滤后返回的数据字段，不设置则返回所有
 * @returns 过滤后的值
 */
export function Filter(items, expr, returnedField, a, b, c) {
    let value = items;

    let _evaluator = this;
    function getValue(str) {
        let res = _evaluator.parser.functions.value(str);
        return res;
    }

    if (items instanceof Array && expr) {
        let fn = new Function(
            ["item", "value", "index", "items"],
            "var top=undefined,parent=undefined,window=undefined,eval=undefined;return " +
                expr
        );

        let _temp = items.filter((d, index) => {
            try {
                let res = fn(d, getValue, index, items);
                return res;
            } catch (error) {
                console.error("filter function error:", error);
                return false;
            }
        });
        if (typeof returnedField === "string" && returnedField) {
            let _field = returnedField.trim();
            value = _temp.map(d => {
                return d[_field];
            });
        } else {
            value = _temp;
        }
    }

    return value;
}

/**
 * 数组Reduce函数
 * 表达式中如果想获取其他字段的值可使用GetId函数包装表单项，如：item[GetId("表格.column1")]
 * 完整用例 Reduce(表格,'item[GetId("表格.column1")]=="a"?all:all+1',0)
 * @param {Array} items 数据源
 * @param {string} expr 过滤表达式，支持all:any、item:any、index:number、array:[] 四个参数
 * @param {*} initialValue 初始值
 * @returns 处理后的值
 */
export function Reduce(items, expr, initialValue) {
    let value = [];

    try {
        value = JSONParse(JSONStringify(items || []));
    } catch (error) {}

    if (typeof items === "object" && items && expr) {
        if (items instanceof Array === false) {
            items = [items];
        }

        let fn = new Function(
            ["all", "item", "index", "array"],
            "var top=undefined,parent=undefined,window=undefined,eval=undefined;return " +
                expr
        );

        value = items.reduce(fn, initialValue ?? "");
    }
    return value;
}

//数字千分位分隔
export function FormatNumberComma(value) {
    return formatNumberComma(value);
}
