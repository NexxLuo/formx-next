import { getLinkages, getLinkageItem, createEvaluator } from "./getLinkages";
import { getValue } from "../linkages/value";
import { toFixed } from "../utils";

class Field {
  disposers = [];
  state = null;
  name: string = "";
  precision: number = null;
  address: string = "";
  onChange = null;
  modified = false;
  constructor(name: string, address: string, precision: number, onChange) {
    this.address = address;
    this.name = name;
    this.precision = precision;

    let state = {
      value: undefined,
      initialValue: undefined
    };

    let _this = this;
    this.state = new Proxy(state, {
      set: function (target, property, value, receiver) {
        if (property === "value") {
          var res = Reflect.set(target, property, value, receiver);
          _this.onChange(_this);
          return res;
        } else if (property === "initialValue") {
          Reflect.set(target, property, value, receiver);
          var res = Reflect.set(target, "value", value, receiver);
          return res;
        }
        return Reflect.set(target, property, value, receiver);
      }
    });

    this.onChange = onChange;
  }

  setValue = value => {
    if (typeof value !== "undefined") {
      if (typeof this.precision === "number") {
        this.state.value = toFixed(value, this.precision);
      } else {
        this.state.value = value;
      }
      this.modified = true;
    }
  };

  setInitialValue = value => {
    if (typeof value !== "undefined") {
      this.state.initialValue = value;
    }
  };

  getInitialValue = () => {
    return this.state.initialValue;
  };

  getValue = () => {
    return this.state.value;
  };
}

export class ArrayValues {
  address: string;
  name: string;
  graph: {} = null;
  rawData: any[] = [];
  form = null;
  columns: any[] = [];
  linkageItemMap: any = {};
  evaluator = null;

  constructor(schema, form) {
    this.address = schema.name;
    this.name = schema.name;
    let { linkageItemMap, columns } = getLinkages(schema);
    this.form = form;
    this.columns = columns;
    this.linkageItemMap = linkageItemMap;
    this.evaluator = createEvaluator(this);
  }

  linkageValue = (field: Field) => {
    let linkageItem = getLinkageItem(
      this.address + ".items." + field.name,
      this.linkageItemMap
    );
    let _evaluator = this.evaluator;

    if (linkageItem && linkageItem.value instanceof Array) {
      linkageItem.value.forEach(item => {
        let target = item.name;

        let res = _evaluator.evaluate(item.expression, {
          items: field.state.index
        });

        if (target) {
          let targetPath =
            this.address + "." + field.state.index + "." + target;
          this.linkageValueIn(targetPath, res);
        }
      });
    }
  };

  onChange = (field: Field) => {
    this.linkageValue(field);
  };

  transformPath = (name: string, index: number) => {
    let basePath = this.address;
    return [basePath, index, name].join(".");
  };

  getColumnValue = (name: string, row: any, rowIndex: number) => {
    let defaultValue = row[name];
    let _value = defaultValue;
    return _value;
  };

  createFields = (data: any[], dataIndexMap = {}) => {
    let graph = null;
    let fields = [];
    let rawData = [];

    if (data instanceof Array && data.length > 0) {
      graph = {};

      let columns = this.columns;

      //存在于数据中的字段，但不存在于schema中items列，也应该设置值。但此举会导致列数据变多，且场景单一，故先注释
      //场景：通过dataIndex设置表格值(而不是通过字段id设置值)，更好的方式时设置值时先将dataIndex转换为字段真实id
      //bug fixed : 如果注释此，重新setData后将无法及时获取到dataIndex值，如：郑州表单固定资产变更在单独区域更新明细表字段
      let columnsMap = {};
      columns.forEach(d => {
        columnsMap[d.name] = true;
      });
      data.forEach((d, i) => {
        for (const k in d) {
          if (!Reflect.has(columnsMap, k)) {
            columns.push({ name: k });
            columnsMap[k] = true;
          }
        }
      });
      //

      data.forEach((d, i) => {
        let _d = { ...d };
        //如果存在dataIndex，应将dataIndex同步到字段id中,否则无法成功设置到值
        //如果同时存在dataIndex和字段id，也应将dataIndex值覆盖到字段id值
        for (const k in dataIndexMap) {
          let dataIndex = dataIndexMap[k];
          if (dataIndex && Reflect.has(_d, dataIndex)) {
            _d[k] = d[dataIndex];
          }
        }
        //

        rawData.push(_d);

        columns.forEach(item => {
          let k = item.name;
          let _path = this.transformPath(k, i);
          let field = new Field(k, _path, item.precision, this.onChange);
          field.setInitialValue(_d[k]);
          field.state.index = i;
          graph[_path] = field;
          fields.push(field);
        });
      });

      this.rawData = rawData;
      this.graph = graph;
    }

    return fields;
  };

  setData = (data: any[], nullAsDefault = false) => {
    if (data instanceof Array && data.length > 0) {
      let columns = this.columns;
      let _evaluator = this.evaluator;
      let _form = this.form;

      for (let i = 0; i < data.length; i++) { }
      data.forEach((d, i) => {
        columns.forEach(item => {
          let k = item.name;
          let _path = this.transformPath(k, i);
          let _value = this.getColumnValue(k, d, i);
          let field = this.graph[_path];

          let bl = typeof _value === "undefined";
          if (nullAsDefault === true && _value === null) {
            bl = true;
          }

          //如果当前行无值，则应该计算出配置的默认值
          if (bl) {
            _value = getValue(
              item.initialValue,
              _form,
              { items: i },
              _evaluator,
              true
            );
          }

          if (field && field.modified === false) {
            field.setValue(_value);
          }
        });
      });
    }
  };

  /**
   * 
   * @param data 数据
   * @param dataIndexMap 字段key和dataIndex的对应关系
   * @param nullAsDefault null值是否视为需要加载默认值
   */
  init = (data: any[], dataIndexMap = {}, nullAsDefault = false) => {
    this.createFields(data, dataIndexMap);
    this.setData(this.rawData, nullAsDefault);
  };

  /** 此方法只会处理联动值和同步的默认值计算，不会处理接口数据值 */
  getValue = (ignoreNull = false) => {
    let data = this.rawData;

    let columns = this.columns;
    let rows = [];
    data.forEach((d, i) => {
      let row = {};

      if (Reflect.has(d, "__KEY__")) {
        row["__KEY__"] = d["__KEY__"];
      }

      if (Reflect.has(d, "__PARENT__")) {
        row["__PARENT__"] = d["__PARENT__"];
      }

      if (Reflect.has(d, "__LEAF__")) {
        row["__LEAF__"] = d["__LEAF__"];
      }

      columns.forEach(item => {
        let k = item.name;
        let _path = this.transformPath(k, i);
        let field = this.graph[_path];
        if (field) {
          let _v = field.state.value;
          if (typeof _v !== "undefined") {
            if (ignoreNull === true) {
              if (_v !== null) {
                row[k] = _v;
              }
            } else {
              row[k] = _v;
            }
          }
        }
      });

      rows.push(row);
    });

    return rows;
  };

  getValuesIn = (path: string) => {
    if (this.graph !== null) {
      let field = this.graph[path];
      if (field) {
        return field.state.value;
      }
    }
    return null;
  };

  setValueIn = (path: string, value: any) => {
    if (this.graph !== null) {
      let field = this.graph[path];
      if (field) {
        field.setValue(value);
      }
    }
  };

  linkageValueIn = (path: string, value: any) => {
    if (this.graph !== null) {
      let field = this.graph[path];
      if (field) {
        //如果存在初始值，则不联动
        if (typeof field.getInitialValue() === "undefined") {
          field.setValue(value);
        }
      }
    }
  };
}
