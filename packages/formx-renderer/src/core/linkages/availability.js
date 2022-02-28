import { getExpressionVar } from "./utils";

export function linkageAvailability(linkageItem, instance, _evaluator) {
    //禁用联动
    if (linkageItem.availability instanceof Array) {
        linkageItem.availability.forEach(d => {
            let _expressionVar = getExpressionVar(d.name);
            instance.setFieldState(d.name, state => {
                //执行表达式
                let res = _evaluator.evaluate(d.expression, _expressionVar);
                if (res === true) {
                    state.componentProps.disabled = true;
                    //state.disabled = true;
                } else {
                    state.componentProps.disabled = false;
                    //state.disabled = false;
                }
            });
        });
    }
}