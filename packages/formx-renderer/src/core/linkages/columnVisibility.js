export function linkageColumnVisibility(linkageItem, instance, _evaluator) {
    //表格列隐藏联动
    if (linkageItem.columnVisibility instanceof Array) {
        linkageItem.columnVisibility.forEach(d => {
            let listPath = d.path;
            let itemKey = d.name;
            if (listPath) {
                let list = instance.getFieldState(listPath);
                //fixed : 如果表格还未挂载，执行此操作会导致初始化时无法正确隐藏表格列
                if (list && list.fieldActions && list.mounted === true) {
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
