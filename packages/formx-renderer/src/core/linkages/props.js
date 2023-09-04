import {
    getExpressionVar,
    parseStyleString,
    transformArrayItemsPath
} from "./utils";
import { FormPath } from "@formily/core";

export function linkageProps(linkageItem, field, instance, _evaluator) {
    let propertyPathMap = {
        value: ["value"],
        title: [
            "title",
            "componentProps.title",
            "componentProps.x-extra-props.title"
        ],
        style: ["componentProps.style", "decorator[1].style"],
        disabled: ["componentProps.disabled"],
        readonly: ["componentProps.readOnly"],
        visible: ["visible"],
        required: ["required"]
    };

    //属性联动
    if (linkageItem && linkageItem.fieldProps instanceof Array) {
        linkageItem.fieldProps.forEach(d => {
            let property = d.property;
            let propertyType = d.type;
            let targetPath = transformArrayItemsPath(d.name, instance);

            if (property) {
                let bl = true;
                //如果联动属性为value，源控件则必须要主动输入过才进行联动
                if (property === "value") {
                    bl = field.selfModified === true ? true : false;
                }
                //

                if (bl === true) {
                    instance.setFieldState(targetPath, state => {
                        let name = state.path.toString();
                        let _expressionVar = getExpressionVar(name);
                        let res = _evaluator.evaluate(
                            d.expression,
                            _expressionVar
                        );
                        if (propertyType === "componentProps") {
                            if (property === "style") {
                                res = parseStyleString(res);
                            }
                            //清空value值时，将值设置为undefined，以区分是无值还是值为null
                            if (property === "value") {
                                if (res === null) {
                                    res = undefined;
                                }
                            }
                            let propertyPathArr = propertyPathMap[property];
                            if (propertyPathArr instanceof Array) {
                                propertyPathArr.forEach(_d => {
                                    FormPath.setIn(state, _d, res);
                                });
                            }
                        } else {
                            FormPath.setIn(
                                state,
                                "componentProps.attribute." + property,
                                res
                            );
                        }
                    });
                }
            }
        });
    }
}


export function linkageRequired(linkageItem, instance, _evaluator) {
    if (linkageItem.required instanceof Array) {
        linkageItem.required.forEach(d => {
            let _expressionVar = getExpressionVar(d.name);
            instance.setFieldState(d.name, state => {
                let res = _evaluator.evaluate(d.expression, _expressionVar);
                if (res === true) {
                    state.required = true;
                } else {
                    state.required = false;
                }
            });
        });
    }
}