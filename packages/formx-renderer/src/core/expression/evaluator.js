import { Parser } from "./parser/parser";
import * as functions from "./functions";

function parseExpressionString(values, formatVar) {
    let str = "";

    if (values instanceof Array) {
        let expr = [];
        values.forEach(d => {
            if (typeof d === "object" && d) {
                if (d.type === "value") {
                    let v = d.value;

                    if (v) {
                        for (const k in formatVar) {
                            let kv = formatVar[k];
                            v = v.replace(k, kv);
                        }
                    }

                    expr.push(`value("${v}")`);
                } else if (d.type === "func") {
                    expr.push(`${d.value}()`);
                } else if (d.type === "operator") {
                    expr.push(d.value);
                } else {
                    expr.push(d.value);
                }
            } else {
                if (typeof d === "string") {
                    if (isNaN(Number(d))) {
                        expr.push(`"${d}"`);
                    } else {
                        expr.push(d);
                    }
                } else {
                    expr.push(d);
                }
            }
        });

        str = expr.join(" ");
    } else {
        str = values;
        for (const k in formatVar) {
            let kv = formatVar[k];
            str = str.replaceAll(k, kv);
        }
    }

    return str;
}

export default class Evaluator {
    constructor(props) {
        this.parser = new Parser({});
        this.parser.functions = {
            ...functions,
            ...props.functions
        };
        this.onError = props.onError;
    }

    evaluate(expressionArray, replaceVar = {}, injectVar = {}) {
        if (!expressionArray) {
            return null;
        }

        let exprString = "";
        try {
            exprString = parseExpressionString(expressionArray, replaceVar);
            var expr = this.parser.parse(exprString);

            this.parser.functions.RuntimeVar = _k => {
                let k = _k;
                if (typeof _k === "string" && _k.length === 0) {
                    k = "value";
                } else if (typeof _k === "undefined" || _k === null) {
                    return injectVar;
                }
                return injectVar[k];
            };

            let res = expr.evaluate({
                null: null,
                ...injectVar
            });

            if (typeof res === "number" && isNaN(res)) {
                return null;
            }
            return res;
        } catch (e) {
            console.error("expression error:", exprString, e.message);
            let fn = this.onError;
            if (typeof fn === "function") {
                fn(e);
            }
            return null;
        }
    }
}
