// @ts-nocheck
import React, { useRef, useEffect, useLayoutEffect } from "react";
import { TableProps, ColumnProps } from "antd/lib/table";
import {
  useForm,
  useField,
  useFieldSchema,
  RecursionField,
  Schema,
  connect,
  mapProps
} from "@formily/react";
import { usePrefixCls } from "../../../__builtins__";
import Table from "tablex";
import { getParentElement } from "tablex/lib/utils";
import {
  useArrayTableColumns,
  useFieldActions,
  getDataIndexStore,
  useEvaluator,
  useSummary,
  transformToTreeData,
  getSelectable,
  resetHeaderCellWidth,
  OperationColumnTrigger,
  focusInput
} from "./Extends";
import { untracked } from "@formily/reactive";
import { ArrayField } from "@formily/core";
import { isResponsiveSizeSmall } from "../../shared/utils";

const KEY_FIELD = "__KEY__";

type ComposedArrayTable = React.FC<TableProps<any>> & {
  Column?: React.FC<ColumnProps<any>>;
};

const useAddition = (schema: Schema) => {
  const additionalProperties = schema;
  if (additionalProperties) {
    return additionalProperties.reduceProperties((addition, schema) => {
      return <RecursionField schema={schema} name="addition" />;
    }, null);
  }
  return null;
};

const isValidWidthHeight = v => {
  let bl = false;

  if (typeof v === "number" && !isNaN(v)) {
    bl = true;
  }

  if (typeof v === "string" && v) {
    let n = parseFloat(v);
    if (!isNaN(n)) {
      if (n + "%" === v || n + "vw" === v || n + "vh" === v) {
        bl = true;
      }
    }
  }

  return bl;
};

const BaseArrayTable: ComposedArrayTable = (fieldProps: any) => {
  let {
    onBlur,
    onFocus,
    onSelect,
    dataIndexStore,
    temporary_virtual,
    fixedOperationColumn,
    ...props
  } = fieldProps;
  const field = useField<ArrayField>();
  let fieldPath = field.path.toString();
  let editable: boolean = !props.disabled;
  const form = useForm();
  let schema: Schema = useFieldSchema();
  if (props.schema) {
    schema = new Schema(props.schema);
  }
  let prefixCls = usePrefixCls("formily-array-table");

  if (field.required) {
    prefixCls = prefixCls + " formx-array-table-required";
  }

  let dataSource = props.dataSource;

  const tbRef = useRef(null);

  const wrapperRef = useRef(null);

  let stateStoredRef = useRef({
    selections: {},
    isAdding: false,
    columnsProps: {},
    columns: []
  });

  let arrayIndexMap = props.arrayIndexMap;

  let isEditor = false;
  isEditor = form.getValuesIn("__DATA__.__isEditor");

  let _evaluator = useEvaluator(form, dataIndexStore);
  const fieldActions = useFieldActions({
    field,
    schema,
    form,
    stateStoredRef,
    dataIndexStore,
    wrapperRef,
    tableRef: tbRef,
    evaluator: _evaluator
  });

  const {
    columns,
    columnsProps,
    fixedOperationColumns,
    needResetHeaderCellWidth
  } = useArrayTableColumns(
    fieldActions,
    field,
    form,
    schema,
    dataIndexStore,
    _evaluator,
    arrayIndexMap,
    fixedOperationColumn
  );

  let summary = useSummary(field, dataIndexStore, _evaluator, columnsProps);

  form.notify(fieldPath + "_didUpdate", {
    name: fieldPath,
    payload: { columns }
  });

  const addition = useAddition(schema);
  const defaultRowKey = KEY_FIELD;

  field.setState((s: any) => {
    s.fieldActions = fieldActions;
  });

  const onEditRowChange = (keys, e) => {
    field.setState((s: any) => {
      s.componentProps.editKeys = keys;
    });

    let cellEl = getParentElement(e?.target, ".tablex-table-row-cell");
    if (cellEl) {
      let wrapper = wrapperRef.current;
      let rowIndex = cellEl.dataset.rowindex;
      let columnKey = cellEl.dataset.columnkey;
      if (wrapper) {
        setTimeout(() => {
          let el = wrapper.getElementsByClassName(
            "row-" + rowIndex + "-column-" + columnKey
          )[0];
          focusInput(el);
        }, 0);
      }
    }
  };

  const onPageChange = (page, pageSize) => {
    let _pagination = {
      ...props.pagination,
      pageIndex: page,
      pageSize: pageSize
    };

    form.notify("onListPageChange", {
      props: schema,
      name: fieldPath,
      pagination: _pagination
    });
  };
  //
  let wrapperStyle = {
    height: "100%",
    outline: "none",
    width: "100%"
  };

  let tbProps: any = {
    autoHeight: true
  };

  if (!isEditor) {
    let orderColumnWidth = summary?.titleWidth || 60;
    if (isResponsiveSizeSmall()) {
      orderColumnWidth = orderColumnWidth / 2;
      if (orderColumnWidth < 40) {
        orderColumnWidth = 40;
      }
    }
    tbProps.orderNumber = {
      resizable: true,
      width: orderColumnWidth
    };
  }
  if (summary !== null) {
    tbProps.summary = summary;
  }

  const layoutProps = field.componentProps["x-layout-props"] || {};

  let layoutHeight = layoutProps.height;

  let minHeight = layoutProps.minHeight;
  let maxHeight = layoutProps.maxHeight;

  if (typeof layoutHeight === "object" && layoutHeight) {
    if (layoutHeight.type === "const") {
      tbProps.autoHeight = false;
    } else if (layoutHeight.type === "auto") {
    } else if (layoutHeight.type === "percent") {
      tbProps.autoHeight = false;
    }
  }
  if (tbProps.autoHeight) {
    tbProps.maxHeight = 3000;
  }

  if (isValidWidthHeight(minHeight)) {
    tbProps.minHeight = minHeight;
  }

  if (isValidWidthHeight(maxHeight)) {
    tbProps.maxHeight = maxHeight;
  }
  //

  let pagination: any = false;
  let extraProps = props["x-extra-props"] || {};
  let _pagination = extraProps.pagination || {};
  if (_pagination.enabled === true) {
    let prePagination: any = props.pagination || {};
    pagination = {
      ...prePagination,
      pageSize: prePagination.pageSize || _pagination.pageSize || 20,
      current: prePagination.pageIndex || 1,
      onPageChange: onPageChange
    };

    if (!pagination.total) {
      pagination.total = dataSource.length;
    }
  }

  let selectType = extraProps?.selectMode;

  let disabledSelectKeys = getSelectable(
    extraProps,
    props.flatData,
    _evaluator
  );

  let rowSelection: any = {
    selectType: "single",
    type: "none",
    disabledSelectKeys: disabledSelectKeys
  };

  if (selectType === "multiple") {
    rowSelection = {
      selectType: "multiple",
      type: "checkbox",
      disabledCheckedKeys: disabledSelectKeys
    };
  } else if (selectType === "none") {
    rowSelection = {
      selectType: "none",
      type: "none"
    };
  }

  let editKeys = props.editKeys || [];

  useEffect(() => {
    if (stateStoredRef.current.isAdding === true) {
      let lastKey = editKeys[0];
      if (lastKey) {
        if (tbRef.current) {
          tbRef.current.api.scrollToRow(lastKey, "start");
        }
      }
    }
    stateStoredRef.current.isAdding = false;
    stateStoredRef.current.columnsProps = columnsProps;
  });

  useLayoutEffect(() => {
    let _editKeys = props.editKeys || [];
    let columnMatchContentWidth = props.columnMatchContentWidth || false;
    let frameId = null;
    if (columnMatchContentWidth && _editKeys.length === 0) {
      let fn = tbRef.current.api.matchColumnContentWidth;
      if (typeof fn === "function") {
        frameId = requestAnimationFrame(() => {
          tbRef.current.api.matchColumnContentWidth(d => {
            if (d && d.isOperationColumn === true) {
              return 0;
            }
          });
        });
      }
    }
    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [editKeys]);

  let isVirtual = false;

  if (typeof props.virtual === "boolean") {
    isVirtual = props.virtual;
  } else {
    isVirtual = dataSource.length > 50;
  }

  if (temporary_virtual === false) {
    isVirtual = false;
  }

  let columnDropMenu = props.columnDropMenu ?? true;
  if (isEditor) {
    columnDropMenu = false;
  }

  if (needResetHeaderCellWidth === true) {
    tbProps.onComponentDidUpdate = () => {
      resetHeaderCellWidth(wrapperRef);
    };
  }

  let id = field.path.toString() + "_" + field.form.id;

  return (
    <div className={prefixCls} ref={wrapperRef} style={wrapperStyle} id={id}>
      <Table
        size="small"
        rowKey={defaultRowKey}
        editable={editable}
        {...props}
        minHeight={200}
        {...tbProps}
        clearPrevSelections={true}
        singleRowEditTrigger="onDoubleClick"
        loading={field.loading}
        editTools={[]}
        editKeys={editKeys}
        singleRowEdit={editable}
        virtual={isVirtual}
        validateNoEditting={false}
        columnDropMenu={columnDropMenu}
        columnDropMenuOptions={{
          fixable: true,
          filterable: false,
          groupable: true
        }}
        dataControled={true}
        bordered={true}
        keyboardNavigation={false}
        pagination={pagination}
        columns={columns}
        dataSource={dataSource}
        onEditRowChange={onEditRowChange}
        onBeforeAdd={() => {
          fieldActions.insertData();
          return false;
        }}
        footer={() => {
          return addition;
        }}
        header={() => {
          if (field.componentProps.displayTitle === false) {
            return null;
          } else {
            return field.componentProps.title || null;
          }
        }}
        onRow={row => {
          return {
            onClick: () => {
              //如果点击的不是当前编辑行，则取消编辑状态
              let hasEditing = fieldActions.isEditing();
              let isEditing = fieldActions.isEditing(row[KEY_FIELD]);
              if (hasEditing && !isEditing) {
                fieldActions.completeEdit();
              }
              //
            }
          };
        }}
        rowSelection={{
          ...rowSelection,
          onSelectChange: keys => {
            let selectedIndex = {};
            keys.forEach(k => {
              if (arrayIndexMap.hasOwnProperty(k)) {
                selectedIndex[arrayIndexMap[k]] = true;
              }
            });
            stateStoredRef.current.selections = selectedIndex;
            if (typeof onSelect === "function") {
              onSelect(keys);
            }
            let _name = field.path.toString();
            form.notify(_name + "_onSelectChange", {
              name: _name
            });
          }
        }}
        ref={tbRef}
      />
      {addition}
      <OperationColumnTrigger
        operationColumns={fixedOperationColumns}
        form={form}
        onClick={() => {
          field.setComponentProps({
            fixedOperationColumn: !fixedOperationColumn
          });
        }}
      ></OperationColumnTrigger>
    </div>
  );
};

const ArrayTable: any = connect(
  BaseArrayTable,
  mapProps((props: any, field) => {
    let fieldValue = Array.isArray(props.value) ? props.value.slice() : [];

    let dataIndexStore = getDataIndexStore(field);

    let arrayIndexMap = {};
    let isTreeData = false;

    let flatData = [];
    let dataSource = fieldValue;

    const childrenToParents = {};
    let listMap = {};

    fieldValue.forEach((d, i) => {
      let _key = d[KEY_FIELD];

      if (!d.hasOwnProperty(KEY_FIELD)) {
        if (d.hasOwnProperty("value")) {
          _key = d.value;
        } else {
          _key = new Date().getTime() + "_" + i;
        }

        d[KEY_FIELD] = _key;
      }

      if (d.hasOwnProperty("parent") && !d.hasOwnProperty("__PARENT__")) {
        d.__PARENT__ = d.parent;
      }

      arrayIndexMap[_key] = i;

      if (_key) {
        listMap[_key] = true;
      }

      const parentKey = d.__PARENT__;

      if (parentKey) {
        if (parentKey in childrenToParents) {
          childrenToParents[parentKey].push(d);
        } else {
          childrenToParents[parentKey] = [d];
        }
      }
    });

    dataSource = fieldValue.map(d => {
      let item = d;
      if (typeof d === "object" && d) {
        if (!d.__PARENT__ || !listMap[d.__PARENT__]) {
          d.__PARENT__ = "__ROOT__";
        }

        //如果设置了dataIndex，则dataIndex对应的字段值应进行同步
        //而且必须使用untracked包装，否则输入时会导致表格二次渲染，从而输入卡顿
        //如果使用untracked包装，dataIndex同步会在每次表格渲染后才生效，直接现象就是：必须点击完成编辑才会生效
        untracked(() => {
          //bug fixed : 首次加载时将dataIndex的值映射到字段id
          //bug fixed : dataIndex对应值为undefined时不进行值映射，
          //否则会导致setValue对dataIndex二次设置时，无法成功设置
          for (const k in dataIndexStore) {
            let dataIndex = dataIndexStore[k];
            if (
              dataIndex &&
              !Reflect.has(item, k) &&
              d[dataIndex] !== undefined
            ) {
              item[k] = d[dataIndex];
            }
          }
          //

          //修改字段值后，将字段值映射到dataIndex
          for (const k in d) {
            let targetDataIndex = dataIndexStore[k];
            if (targetDataIndex) {
              item[targetDataIndex] = d[k];
            }
          }
          //
        });
        //

        //是否存在子级
        let childrens = childrenToParents[d[KEY_FIELD]] || [];
        if (childrens.length <= 0) {
          d.__LEAF__ = true;
        }

        flatData.push(item);
        if (item.__PARENT__) {
          isTreeData = true;
        }
      }
      return item;
    });

    if (isTreeData) {
      let treeData = transformToTreeData(
        flatData,
        KEY_FIELD,
        "__PARENT__",
        "__ROOT__"
      );
      dataSource = treeData;
    } else {
      dataSource = flatData;
    }
    return {
      dataIndexStore,
      arrayIndexMap,
      dataSource,
      flatData,
      validateResult: field.data?.validateResult
    };
  })
);
ArrayTable.displayName = "ArrayTable";

export default ArrayTable;
