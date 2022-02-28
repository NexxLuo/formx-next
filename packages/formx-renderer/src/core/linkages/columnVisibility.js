export function linkageColumnVisibility(linkageItem, instance, _evaluator) {
    //表格列隐藏联动
    if (linkageItem.columnVisibility instanceof Array) {
        linkageItem.columnVisibility.forEach(d => {
            let listPath = d.path;
            let itemKey = d.name;
            if (listPath) {
                let list = instance.getFieldState(listPath);
                if (list && list.fieldActions) {
                    let fn = list.fieldActions.toggleColumnVisibility;
                    if (typeof fn === "function") {
                        let res = _evaluator.evaluate(d.expression, {});
                        fn(itemKey, res);
                    }
                }
            }
        });
    }
}
