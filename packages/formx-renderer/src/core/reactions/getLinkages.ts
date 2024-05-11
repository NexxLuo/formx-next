import { addLinkageItem } from "../linkages";
import {
  mapSchemaItems,
  getItemIndex
} from "../utils";
import { Evaluator } from "../expression";

function formatSchema(schema) {
  let componentProps = schema["x-component-props"] || {};
  let extraProps = componentProps?.["x-extra-props"] || {};
  return {
    name: schema.name,
    path: schema.name,
    extraProps: extraProps,
    componentName: extraProps.name,
    componentProps
  };
}

/**
 * 获取需要关联设置状态的所有表单项
 * @param {*} name
 * @param {*} store
 * @param {*} instance
 */
export function getLinkageItem(name, store = {}) {
  let { index } = getItemIndex(name);

  let item = null;

  if (store[name]) {
    item = store[name];
  }

  //表格列中的公式计算，联动项存储时的路径是从公式中匹配出来的，都带有items
  //而onChange时的路径是带索引而不是带items的，所以查找联动项时需要讲索引替换为items，否则会找不到
  //场景：一个表单项既配置了属性联动又被公式计算引用时，如果不合并，则会导致公式计算不生效
  if (index > -1) {
    let _name = name.replace("." + index + ".", ".items.");
    let _item = store[_name];
    item = { ...item, ..._item };
  }
  //

  if (item) {
    item = { ...item };
    if (item.value instanceof Array) {
      item.value = item.value;
    }
  }

  return item;
}

export const getLinkages = schema => {
  let linkageTargetMap = {};
  let linkageItemMap = {};

  let columns = [];

  mapSchemaItems(schema?.items, o => {
    let _componentProps = o["x-component-props"] || {};
    const itemExtraProps = _componentProps["x-extra-props"] || {};

    const initialValue = itemExtraProps.initialValue;

    let columnProps: any = {};
    if (typeof initialValue === "object" && initialValue) {
      columnProps.initialValue = initialValue;
    }

    if (
      typeof _componentProps.precision === "number"
    ) {
      columnProps.precision = _componentProps.precision;
    }


    columns.push({
      ...columnProps,
      name: o.name
    });
    addLinkageItem(linkageTargetMap, linkageItemMap, "value", {
      ...formatSchema(o),
      path: schema.name
    });

    if (itemExtraProps.extraNameFieldKey) {
      let _columnProps: any = {};
      let _schema = o.properties?.[itemExtraProps.extraNameFieldKey];
      const _initialValue = _schema?.["x-component-props"]?.["x-extra-props"]?.initialValue;
      if (typeof _initialValue === "object" && _initialValue) {
        _columnProps.initialValue = _initialValue;
      }
      columns.push({
        ..._columnProps,
        name: itemExtraProps.extraNameFieldKey
      });
    }

    if (itemExtraProps.extraIdFieldKey) {
      let _columnProps: any = {};
      let _schema = o.properties?.[itemExtraProps.extraIdFieldKey];
      const _initialValue = _schema?.["x-component-props"]?.["x-extra-props"]?.initialValue;
      if (typeof _initialValue === "object" && _initialValue) {
        _columnProps.initialValue = _initialValue;
      }
      columns.push({
        ..._columnProps,
        name: itemExtraProps.extraIdFieldKey
      });
    }
  });

  return {
    columns,
    linkageItemMap
  };
};

function getValueFromOutter({ path, listKey, fieldKey, index, form }) {
  let v = null;

  if (index > -1) {
    let values = form.getValuesIn(listKey) || [];
    v = values[index]?.[fieldKey];
  } else {
    if (listKey) {
      v = form.getValuesIn(listKey);
      if (v instanceof Array) {
        v = v.map(d => {
          return d[fieldKey];
        });
      }
      if (typeof v === "undefined") {
        v = [];
      }
    } else {
      v = form.getValuesIn(path);
    }
  }
  return v;
}

function getValueFromCurrentArray({
  index,
  listKey,
  fieldKey,
  arrayValues,
  path
}) {
  let v = null;

  if (index > -1) {
    v = arrayValues.getValuesIn(path);
  } else {
    if (listKey) {
      let values = arrayValues.getValue();
      if (values instanceof Array) {
        v = values.map(d => {
          return d[fieldKey];
        });
      }
      if (typeof v === "undefined") {
        v = [];
      }
    } else {
      v = arrayValues.getValuesIn(path);
    }
  }
  return v;
}

export function createEvaluator(arrayValues) {
  //表格非编辑模式时的公式计算
  return new Evaluator({
    functions: {
      value: k => {
        let v = null;
        if (k) {
          let { index, parentKey: listKey, key: columnKey } = getItemIndex(k);
          let fieldKey = columnKey;
          if (listKey === arrayValues.name) {
            v = getValueFromCurrentArray({
              path: k,
              arrayValues,
              index,
              listKey,
              fieldKey
            });
          } else {
            v = getValueFromOutter({
              path: k,
              form: arrayValues.form,
              index,
              listKey,
              fieldKey
            });
          }
        }
        return v;
      }
    }
  });
}
