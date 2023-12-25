import dayjs from "dayjs";
import Decimal from "decimal.js";
import { formatNumberComma, decryptString, encryptString, guid, formatQuarterValue } from "../utils";


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
    let value = tryToDecimal(v);
    if (typeof precision === "number") {
        value = tryGetNumberValue(tryToDecimal(value.toFixed(precision)))
    } else {
        value = tryGetNumberValue(value)
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

function isValidValue(v) {
    let bl = true;
    if (v === "" || v === null || v === undefined) {
        bl = false;
        return bl;
    }
    if (isNaN(v)) {
        bl = false;
        return bl;
    }

    try {
        new Decimal(v);
    } catch (error) {
        bl = false;
        console.error(error)
    }

    return bl;
}

function tryToDecimal(v, defaultValue = 0) {
    try {
        return new Decimal(v);
    } catch (error) {
        return new Decimal(defaultValue);
    }
}


function tryGetNumberValue(v) {
    let value = 0;

    //大于15位不进行toNumber处理，否则会精度错误
    if (typeof v?.toString === "function") {
        let str = v.toString();
        if (str.length > 15) {
            return str;
        }
    }

    if (typeof v?.toNumber === "function") {
        let _v = v.toNumber();
        if (!isNaN(_v)) {
            value = _v;
        }
    } else {
        let _v = Number(v);
        if (!isNaN(_v)) {
            value = _v;
        }
    }
    return value;
}

export function MathAdd() {
    let args = Array.prototype.slice.call(arguments);

    if (args.length === 0) {
        return 0;
    }

    if (args.length === 1) {
        return args[0];
    }

    let c = tryToDecimal(args[0]);

    let i = 1;

    let value = 0;

    while (i < args.length) {
        if (isValidValue(args[i])) {
            c = c.add(tryToDecimal(args[i]));
        }
        i += 1;
    }
    value = tryGetNumberValue(c);
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

    let c = tryToDecimal(args[0]);
    let i = 1;

    let value = 0;

    while (i < args.length) {
        if (isValidValue(args[i])) {
            c = c.sub(tryToDecimal(args[i]));
        }
        i += 1;
    }

    value = tryGetNumberValue(c);

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

    let c = tryToDecimal(args[0]);
    let i = 1;

    let value = 0;

    while (i < args.length) {
        if (isValidValue(args[i])) {
            c = c.mul(tryToDecimal(args[i]));
        }
        i += 1;
    }
    value = tryGetNumberValue(c);
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

    let c = tryToDecimal(args[0]);
    let i = 1;

    let value = 0;

    while (i < args.length) {
        if (isValidValue(args[i])) {
            c = c.div(tryToDecimal(args[i]));
        }
        i += 1;
    }
    value = tryGetNumberValue(c);
    return value;
}

export function GetId(v) {
    let value = "";

    if (typeof v === "string" && v) {
        v = v.trim();
        let _v = v.replace(/value\('([^<]*?)'\)/g, "$1").split(".");
        value = _v[_v.length - 1];
    }

    return value;
}

/**
 * 根据条件表达式过滤数据源
 * 表达式中如果想获取其他字段的值可使用GetId函数包装表单项，如：item[GetId("表格.column1")]
 * 完整用例 Sum(Filter(value('fc50caa74f3d642bcb083bec3f44fa6f2') ,"item[GetId(\"value('fc50caa74f3d642bcb083bec3f44fa6f2.items.fb403c08619234ee2b2a57250f20ebaec')\")]==deps[0]",GetId("value('fc50caa74f3d642bcb083bec3f44fa6f2.items.fb403c08619234ee2b2a57250f20ebaec')") ,[value('fb68970699b2b498eb804b0e0ac16b9d7.items.f10382d373c534bf78185d819269eb542') ]))
 * @param {array} items 数据源
 * @param {string} expr 过滤表达式，支持item:any、value:(fieldId:string)=>any两个参数
 * @param {string} returnedField 过滤后返回的数据字段，不设置则返回所有
 * @param {array} deps 依赖项，会直接传递到表达式中,表达式中可直接使用deps变量名
 * @returns {array} 过滤后的值
 */
export function Filter(items, expr, returnedField, deps) {

    let value = items;

    let _evaluator = this;
    function getValue(str) {
        let res = _evaluator.parser.functions.value(str);
        return res;
    }
    if (items instanceof Array && expr) {
        let fn = new Function(
            ["item", "value", "index", "items", "GetId", "deps"],
            "var top=undefined,parent=undefined,window=undefined,eval=undefined;return " +
            expr
        );

        let _temp = items.filter((d, index) => {
            try {
                let res = fn(d, getValue, index, items, GetId, deps);
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
 * 查询是否存在表达式匹配的项
 * @param {array} items 需要检索的集合
 * @param {string} expr 表达式
 * @param {array} deps 依赖项，会直接传递到表达式中,表达式中可直接使用deps变量名
 * @returns {boolean} 是否存在
 */
export function Exists(items, expr, deps) {

    let bl = false;

    let _evaluator = this;
    function getValue(str) {
        let res = _evaluator.parser.functions.value(str);
        return res;
    }

    if (items instanceof Array && items.length > 0 && expr) {
        let fn = new Function(
            ["item", "value", "index", "items", "GetId", "deps"],
            "var top=undefined,parent=undefined,window=undefined,eval=undefined;return " +
            expr
        );

        let arr = items.filter((d, index) => {
            try {
                let res = fn(d, getValue, index, items, GetId, deps);
                return res;
            } catch (error) {
                console.error("filter function error:", error);
                return false;
            }
        });

        bl = arr.length > 0;
    }


    return bl;
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
    } catch (error) { }

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

export function EncryptString(value) {
    return encryptString(value);
}

export function DecryptString(value) {
    return decryptString(value);
}


/**
 * 验证集合中的指定属性值是否重复
 * @param {*} items 数组集合
 * @param {*} itemKey 属性key
 * @returns 是否存在重复
 */
export function IsDuplicated(items, itemKey) {
    let bl = false;
    if (items instanceof Array && items.length > 0 && itemKey) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (items.filter(d => d[itemKey] === item[itemKey]).length > 1) {
                bl = true;
                break;
            }
        }
    }
    return bl;
}

/**
 * 生成一个唯一id
 * @returns guid
 */
export function Guid() {
    return guid("");
}

/**
 * 根据条件返回匹配的结果
 * @param {*} cons 条件数组，第一项为条件，紧跟条件的后一项为条件满足后的返回值
 * @param {*} defaultValue 没有条件满足时返回此默认值
 * @returns 
 */
export function SwitchIF(cons, defaultValue) {
    var res = defaultValue;
    if (cons instanceof Array) {
        for (let i = 0; i < cons.length; i = i + 2) {
            let bl = cons[i];
            if (bl === true) {
                res = cons[i + 1];
                break;
            }
        }
    }
    return res;
}

/**
 * 返回一个undefined类型的常量值
 * @returns undefined
 */
export function Undefined() {
    return undefined
}

/**
 * 格式化季度值
 * @param {*} v 季度值字符串 如：2023Q1
 * @param {*} format 指定格式 如：YYYY年第Q季度 ，输出 2023年第1季度
 * @returns 格式化后的字符串
 */
export function FormatQuarterValue(v, format) {
    return formatQuarterValue(v, format)
}