import {
    isEmpty,
    isStr,
    isValid,
    isNum,
    isArr,
    stringLength
} from "@formily/shared";
import { registerValidateRules } from "@formily/core";

const isValidateEmpty = (value: any) => {
    if (isArr(value)) {
        for (let i = 0; i < value.length; i++) {
            if (isValid(value[i])) return false;
        }
        return true;
    } else {
        return isEmpty(value);
    }
};

const getLength = (value: any) => {
    return isStr(value) ? stringLength(value) : value ? value.length : 0;
};

registerValidateRules({
    maximum(value, rule) {
        if (isValidateEmpty(value)) return "";
        var length = isNum(Number(value)) ? Number(value) : getLength(value);
        var max = Number(rule.maximum);
        return length > max ? rule.message : "";
    },
    minimum(value, rule) {
        if (isValidateEmpty(value)) return "";
        var length = isNum(Number(value)) ? Number(value) : getLength(value);
        var min = Number(rule.min);
        return length < min ? rule.message : "";
    }
});
