import { Form } from "@formily/core";
import { getExpressionVar } from "./utils";

export function setLinkageDisplayText(
    instance: Form,
    name: string,
    expr: string,
    _evaluator
) {
    if (name && expr) {
        let _expressionVar = getExpressionVar(name);
        let _field = instance.query(name).take();
        if (_field) {
            let res = _evaluator.evaluate(expr, _expressionVar);
            _field.setComponentProps({ displayText: res });
        }
    }
}

export function linkageDisplayText(linkageItem, instance: Form, _evaluator) {
    if (linkageItem.displayText instanceof Array) {
        linkageItem.displayText.forEach(d => {
            setLinkageDisplayText(instance, d.name, d.expression, _evaluator);
        });
    }
}

export function linkageRenderBydependencies(
    linkageItem,
    instance: Form,
    _evaluator
) {
    if (linkageItem.renderBydependencies instanceof Array) {
        linkageItem.renderBydependencies.forEach(d => {
            let name = d.name;
            instance.setFieldState(name, state => {
                state.componentProps = { ...state.componentProps };
            });
        });
    }
}
