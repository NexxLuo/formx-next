"use strict";

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = void 0 && (void 0).__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = void 0 && (void 0).__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __read = void 0 && (void 0).__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrayTable = void 0;

var react_1 = __importStar(require("react"));

var antd_1 = require("antd");

var classnames_1 = __importDefault(require("classnames"));

var react_2 = require("@formily/react");

var shared_1 = require("@formily/shared");

var __builtins__1 = require("../__builtins__");

var array_base_1 = require("../array-base");

var SortableRow = function SortableRow(props) {
  return react_1.default.createElement("tr", __assign({}, props));
};

var SortableBody = function SortableBody(props) {
  return react_1.default.createElement("tbody", __assign({}, props));
};

var isColumnComponent = function isColumnComponent(schema) {
  var _a;

  return ((_a = schema['x-component']) === null || _a === void 0 ? void 0 : _a.indexOf('Column')) > -1;
};

var isOperationsComponent = function isOperationsComponent(schema) {
  var _a;

  return ((_a = schema['x-component']) === null || _a === void 0 ? void 0 : _a.indexOf('Operations')) > -1;
};

var isAdditionComponent = function isAdditionComponent(schema) {
  var _a;

  return ((_a = schema['x-component']) === null || _a === void 0 ? void 0 : _a.indexOf('Addition')) > -1;
};

var useArrayTableSources = function useArrayTableSources() {
  var arrayField = (0, react_2.useField)();
  var schema = (0, react_2.useFieldSchema)();

  var parseSources = function parseSources(schema) {
    var _a, _b, _c;

    if (isColumnComponent(schema) || isOperationsComponent(schema) || isAdditionComponent(schema)) {
      if (!((_a = schema['x-component-props']) === null || _a === void 0 ? void 0 : _a['dataIndex']) && !schema['name']) return [];
      var name_1 = ((_b = schema['x-component-props']) === null || _b === void 0 ? void 0 : _b['dataIndex']) || schema['name'];
      var field = arrayField.query(arrayField.address.concat(name_1)).take();
      var columnProps = ((_c = field === null || field === void 0 ? void 0 : field.component) === null || _c === void 0 ? void 0 : _c[1]) || schema['x-component-props'] || {};
      var display = (field === null || field === void 0 ? void 0 : field.display) || schema['x-display'];
      return [{
        name: name_1,
        display: display,
        field: field,
        schema: schema,
        columnProps: columnProps
      }];
    } else if (schema.properties) {
      return schema.reduceProperties(function (buf, schema) {
        return buf.concat(parseSources(schema));
      }, []);
    }
  };

  var parseArrayItems = function parseArrayItems(schema) {
    if (!schema) return [];
    var sources = [];
    var items = (0, shared_1.isArr)(schema) ? schema : [schema];
    return items.reduce(function (columns, schema) {
      var item = parseSources(schema);

      if (item) {
        return columns.concat(item);
      }

      return columns;
    }, sources);
  };

  if (!schema) throw new Error('can not found schema object');
  return parseArrayItems(schema.items);
};

var useArrayTableColumns = function useArrayTableColumns(dataSource, sources) {
  return sources.reduce(function (buf, _a, key) {
    var name = _a.name,
        columnProps = _a.columnProps,
        schema = _a.schema,
        display = _a.display;
    if (display !== 'visible') return buf;
    if (!isColumnComponent(schema)) return buf;
    return buf.concat(__assign(__assign({}, columnProps), {
      key: key,
      dataIndex: name,
      render: function render(value, record) {
        var index = dataSource.indexOf(record);
        var children = react_1.default.createElement(array_base_1.ArrayBase.Item, {
          index: index,
          record: record
        }, react_1.default.createElement(react_2.RecursionField, {
          schema: schema,
          name: index,
          onlyRenderProperties: true
        }));
        return children;
      }
    }));
  }, []);
};

var useAddition = function useAddition() {
  var schema = (0, react_2.useFieldSchema)();
  return schema.reduceProperties(function (addition, schema, key) {
    if (isAdditionComponent(schema)) {
      return react_1.default.createElement(react_2.RecursionField, {
        schema: schema,
        name: key
      });
    }

    return addition;
  }, null);
};

var StatusSelect = (0, react_2.observer)(function (props) {
  var _a;

  var form = (0, react_2.useForm)();
  var field = (0, react_2.useField)();
  var prefixCls = (0, __builtins__1.usePrefixCls)('formily-array-table');
  var errors = form.queryFeedbacks({
    type: 'error',
    address: "".concat(field.address, ".*")
  });

  var parseIndex = function parseIndex(address) {
    var _a;

    return Number((_a = address.slice(address.indexOf(field.address.toString()) + 1).match(/(\d+)/)) === null || _a === void 0 ? void 0 : _a[1]);
  };

  var options = (_a = props.options) === null || _a === void 0 ? void 0 : _a.map(function (_a) {
    var label = _a.label,
        value = _a.value;
    var hasError = errors.some(function (_a) {
      var address = _a.address;
      var currentIndex = parseIndex(address);
      var startIndex = (value - 1) * props.pageSize;
      var endIndex = value * props.pageSize;
      return currentIndex >= startIndex && currentIndex <= endIndex;
    });
    return {
      label: hasError ? react_1.default.createElement(antd_1.Badge, {
        dot: true
      }, label) : label,
      value: value
    };
  });
  var width = String(options === null || options === void 0 ? void 0 : options.length).length * 15;
  return react_1.default.createElement(antd_1.Select, {
    value: props.value,
    onChange: props.onChange,
    style: {
      width: width < 60 ? 60 : width
    },
    className: (0, classnames_1.default)("".concat(prefixCls, "-status-select"), {
      'has-error': errors === null || errors === void 0 ? void 0 : errors.length
    })
  });
});

var ArrayTablePagination = function ArrayTablePagination(props) {
  var _a;

  var _b = __read((0, react_1.useState)(1), 2),
      current = _b[0],
      setCurrent = _b[1];

  var prefixCls = (0, __builtins__1.usePrefixCls)('formily-array-table');
  var pageSize = props.pageSize || 10;
  var size = props.size || 'default';
  var dataSource = props.dataSource || [];
  var startIndex = (current - 1) * pageSize;
  var endIndex = startIndex + pageSize - 1;
  var total = (dataSource === null || dataSource === void 0 ? void 0 : dataSource.length) || 0;
  var totalPage = Math.ceil(total / pageSize);
  var pages = Array.from(new Array(totalPage)).map(function (_, index) {
    var page = index + 1;
    return {
      label: page,
      value: page
    };
  });

  var handleChange = function handleChange(current) {
    setCurrent(current);
  };

  (0, react_1.useEffect)(function () {
    if (totalPage > 0 && totalPage < current) {
      handleChange(totalPage);
    }
  }, [totalPage, current]);

  var renderPagination = function renderPagination() {
    if (totalPage <= 1) return;
    return react_1.default.createElement("div", {
      className: "".concat(prefixCls, "-pagination")
    }, react_1.default.createElement(StatusSelect, {
      value: current,
      pageSize: pageSize,
      onChange: handleChange,
      options: pages,
      notFoundContent: false
    }), react_1.default.createElement(antd_1.Pagination, __assign({}, props, {
      pageSize: pageSize,
      current: current,
      total: dataSource.length,
      size: size,
      showSizeChanger: false,
      onChange: handleChange
    })));
  };

  return react_1.default.createElement(react_1.Fragment, null, (_a = props.children) === null || _a === void 0 ? void 0 : _a.call(props, dataSource === null || dataSource === void 0 ? void 0 : dataSource.slice(startIndex, endIndex + 1), renderPagination()));
};

var RowComp = function RowComp(props) {
  return react_1.default.createElement(SortableRow, __assign({
    index: props['data-row-key'] || 0
  }, props));
};

exports.ArrayTable = (0, react_2.observer)(function (props) {
  var ref = (0, react_1.useRef)();
  var field = (0, react_2.useField)();
  var prefixCls = (0, __builtins__1.usePrefixCls)('formily-array-table');
  var dataSource = Array.isArray(field.value) ? field.value.slice() : [];
  var sources = useArrayTableSources();
  var columns = useArrayTableColumns(dataSource, sources);
  var pagination = (0, shared_1.isBool)(props.pagination) ? {} : props.pagination;
  var addition = useAddition();

  var defaultRowKey = function defaultRowKey(record) {
    return dataSource.indexOf(record).toString();
  };

  var addTdStyles = function addTdStyles(node) {
    var helper = document.body.querySelector(".".concat(prefixCls, "-sort-helper"));

    if (helper) {
      var tds_1 = node.querySelectorAll('td');
      requestAnimationFrame(function () {
        helper.querySelectorAll('td').forEach(function (td, index) {
          if (tds_1[index]) {
            td.style.width = getComputedStyle(tds_1[index]).width;
          }
        });
      });
    }
  };

  return react_1.default.createElement(ArrayTablePagination, __assign({}, pagination, {
    dataSource: dataSource
  }), function (dataSource, pager) {
    return react_1.default.createElement("div", {
      ref: ref,
      className: prefixCls
    }, react_1.default.createElement(array_base_1.ArrayBase, null, react_1.default.createElement(antd_1.Table, __assign({
      size: "small",
      bordered: true,
      rowKey: defaultRowKey
    }, props, {
      onChange: function onChange() {},
      pagination: false,
      columns: columns,
      dataSource: dataSource,
      components: {
        body: {
          wrapper: function wrapper(props) {
            return react_1.default.createElement(SortableBody, __assign({
              useDragHandle: true,
              lockAxis: "y",
              helperClass: "".concat(prefixCls, "-sort-helper"),
              helperContainer: function helperContainer() {
                var _a;

                return (_a = ref.current) === null || _a === void 0 ? void 0 : _a.querySelector('tbody');
              },
              onSortStart: function onSortStart(_a) {
                var node = _a.node;
                addTdStyles(node);
              },
              onSortEnd: function onSortEnd(_a) {
                var oldIndex = _a.oldIndex,
                    newIndex = _a.newIndex;
                field.move(oldIndex, newIndex);
              }
            }, props));
          },
          row: RowComp
        }
      }
    })), react_1.default.createElement("div", {
      style: {
        marginTop: 5,
        marginBottom: 5
      }
    }, pager), sources.map(function (column, key) {
      //专门用来承接对Column的状态管理
      if (!isColumnComponent(column.schema)) return;
      return react_1.default.createElement(react_2.RecursionField, {
        name: column.name,
        schema: column.schema,
        onlyRenderSelf: true,
        key: key
      });
    }), addition));
  });
});
exports.ArrayTable.displayName = 'ArrayTable';

exports.ArrayTable.Column = function () {
  return react_1.default.createElement(react_1.Fragment, null);
};

array_base_1.ArrayBase.mixin(exports.ArrayTable);
exports.default = exports.ArrayTable;