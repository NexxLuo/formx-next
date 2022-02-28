"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemDroppable = exports.Droppable = exports.Draggable = exports.DragDrop = exports.DndProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDnd = require("react-dnd");

var _reactDndHtml5Backend = require("react-dnd-html5-backend");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getDircetion(elementRect, mouseOffset, divide) {
  var divideCount = divide || 3;
  var avgW = elementRect.width / divideCount;
  var avgH = elementRect.height / divideCount;
  var leftStart = elementRect.x;
  var leftEnd = leftStart + avgW;
  var rightStart = elementRect.x + elementRect.width - avgW;
  var rightEnd = rightStart + avgW;
  var centerStart = leftEnd;
  var centerEnd = rightStart;
  var topStart = elementRect.y;
  var topEnd = elementRect.y + avgH;
  var bottomStart = elementRect.y + elementRect.height - avgH;
  var bottomeEnd = bottomStart + avgH;
  var middleStart = topEnd;
  var middleEnd = bottomStart;
  var dircetion_h = "";
  var dircetion_v = ""; //水平方向

  if (mouseOffset.x >= leftStart && mouseOffset.x <= leftEnd) {
    dircetion_h = "left";
  }

  if (mouseOffset.x >= centerStart && mouseOffset.x <= centerEnd) {
    dircetion_h = "center";
  }

  if (mouseOffset.x >= rightStart && mouseOffset.x <= rightEnd) {
    dircetion_h = "right";
  } //垂直方向


  if (mouseOffset.y >= topStart && mouseOffset.y <= topEnd) {
    dircetion_v = "top";
  }

  if (mouseOffset.y >= middleStart && mouseOffset.y <= middleEnd) {
    dircetion_v = "middle";
  }

  if (mouseOffset.y >= bottomStart && mouseOffset.y <= bottomeEnd) {
    dircetion_v = "bottom";
  }

  return {
    h: dircetion_h,
    v: dircetion_v
  };
}

var DndProvider = function DndProvider(props) {
  return /*#__PURE__*/_react.default.createElement(_reactDnd.DndProvider, {
    backend: _reactDndHtml5Backend.HTML5Backend,
    context: window
  }, props.children);
};

exports.DndProvider = DndProvider;

var Draggable = function Draggable(_ref) {
  var _ref$item = _ref.item,
      item = _ref$item === void 0 ? {} : _ref$item,
      type = _ref.type,
      onDragDrop = _ref.onDragDrop,
      onDragEnd = _ref.onDragEnd,
      children = _ref.children,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? "" : _ref$className;

  var _useDrag = (0, _reactDnd.useDrag)({
    item: _objectSpread({
      type: type
    }, item),
    end: function end(data, monitor) {
      var dropResult = monitor.getDropResult();

      var source = _objectSpread({}, item);

      if (typeof onDragEnd === "function") {
        onDragEnd(source);
      }

      if (data && dropResult) {
        if (typeof onDragDrop === "function") {
          onDragDrop(source, dropResult);
        }
      }
    },
    collect: function collect(monitor) {
      return {
        isDragging: monitor.isDragging()
      };
    }
  }),
      _useDrag2 = _slicedToArray(_useDrag, 2),
      isDragging = _useDrag2[0].isDragging,
      drag = _useDrag2[1];

  return /*#__PURE__*/_react.default.createElement("div", {
    ref: drag,
    className: "drag-item ".concat(className)
  }, children, /*#__PURE__*/_react.default.createElement("div", {
    className: "drag-item-tool"
  }, /*#__PURE__*/_react.default.createElement("span", null)));
};

exports.Draggable = Draggable;

var Droppable = function Droppable(_ref2) {
  var _ref2$item = _ref2.item,
      item = _ref2$item === void 0 ? {} : _ref2$item,
      type = _ref2.type,
      onDragHover = _ref2.onDragHover,
      children = _ref2.children,
      _ref2$extra = _ref2.extra,
      extra = _ref2$extra === void 0 ? {} : _ref2$extra,
      _ref2$style = _ref2.style,
      style = _ref2$style === void 0 ? {} : _ref2$style,
      className = _ref2.className;

  var _useDrop = (0, _reactDnd.useDrop)({
    accept: type,
    drop: function drop(data, monitor) {
      //阻止drop事件冒泡
      var didDrop = monitor.didDrop();

      if (didDrop) {
        return;
      }

      var target = _objectSpread(_objectSpread(_objectSpread({}, item), extra), {}, {
        dircetion: {
          h: "center",
          v: "middle"
        }
      });

      return target;
    },
    hover: function hover(data, monitor) {
      var isOver = monitor.isOver({
        shallow: true
      });

      if (isOver) {
        if (typeof onDragHover === "function") {
          onDragHover({
            dom: null,
            dircetion: {}
          });
        }
      }
    },
    collect: function collect(monitor) {
      return {
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({
          shallow: true
        })
      };
    }
  }),
      _useDrop2 = _slicedToArray(_useDrop, 2);

  _objectDestructuringEmpty(_useDrop2[0]);

  var drop = _useDrop2[1];
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: drop,
    className: className,
    style: _objectSpread({}, style)
  }, children);
};

exports.Droppable = Droppable;

var ItemDroppable = function ItemDroppable(_ref3) {
  var _ref3$item = _ref3.item,
      item = _ref3$item === void 0 ? {} : _ref3$item,
      type = _ref3.type,
      onDragHover = _ref3.onDragHover,
      children = _ref3.children,
      _ref3$extra = _ref3.extra,
      extra = _ref3$extra === void 0 ? {} : _ref3$extra,
      _ref3$style = _ref3.style,
      style = _ref3$style === void 0 ? {} : _ref3$style,
      className = _ref3.className,
      _canDrop = _ref3.canDrop;
  var ref = (0, _react.useRef)(null);

  var dragRef = function dragRef() {
    return ref.current;
  };

  var _useDrop3 = (0, _reactDnd.useDrop)({
    accept: type,
    canDrop: function canDrop(item) {
      var bl = true;

      if (typeof _canDrop === "function") {
        bl = _canDrop(item);
      }

      return bl;
    },
    drop: function drop(data, monitor) {
      //阻止drop事件冒泡
      var didDrop = monitor.didDrop();

      if (didDrop) {
        return;
      }

      var target = _objectSpread(_objectSpread(_objectSpread({}, item), extra), {}, {
        dircetion: {
          h: "center",
          v: "middle"
        }
      });

      return target;
    },
    hover: function hover(item, monitor) {
      var isCanDrop = monitor.canDrop();
      var isOver = monitor.isOver({
        shallow: true
      });

      if (isCanDrop && isOver) {
        if (typeof onDragHover === "function") {
          onDragHover({
            dom: dragRef(),
            dircetion: {
              h: "center",
              v: "middle"
            }
          });
        }
      }
    },
    collect: function collect(monitor) {
      return {
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({
          shallow: true
        })
      };
    }
  }),
      _useDrop4 = _slicedToArray(_useDrop3, 2);

  _objectDestructuringEmpty(_useDrop4[0]);

  var connectDrop = _useDrop4[1];
  (0, _react.useEffect)(function () {
    connectDrop(dragRef());
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: ref,
    style: style,
    className: className
  }, children);
};

exports.ItemDroppable = ItemDroppable;

var DragDrop = function DragDrop(_ref4) {
  var type = _ref4.type,
      _ref4$item = _ref4.item,
      item = _ref4$item === void 0 ? {} : _ref4$item,
      _ref4$allowInner = _ref4.allowInner,
      allowInner = _ref4$allowInner === void 0 ? false : _ref4$allowInner,
      onDragDrop = _ref4.onDragDrop,
      onDragEnd = _ref4.onDragEnd,
      onDragHover = _ref4.onDragHover,
      children = _ref4.children,
      onClick = _ref4.onClick,
      _ref4$className = _ref4.className,
      className = _ref4$className === void 0 ? "" : _ref4$className,
      _ref4$extra = _ref4.extra,
      extra = _ref4$extra === void 0 ? {} : _ref4$extra,
      _ref4$style = _ref4.style,
      style = _ref4$style === void 0 ? {} : _ref4$style,
      _canDrop2 = _ref4.canDrop;
  var ref = (0, _react.useRef)(null);

  var dragRef = function dragRef() {
    return ref.current;
  };

  var dragItem = _objectSpread({
    type: type
  }, item);

  var _useDrag3 = (0, _reactDnd.useDrag)({
    item: dragItem,
    end: function end(source, monitor) {
      var dropResult = monitor.getDropResult();

      if (typeof onDragEnd === "function") {
        onDragEnd(source);
      }

      if (source && dropResult) {
        if (typeof onDragDrop === "function") {
          onDragDrop(source, dropResult);
        }
      }
    }
  }),
      _useDrag4 = _slicedToArray(_useDrag3, 3);

  _objectDestructuringEmpty(_useDrag4[0]);

  var connectDrag = _useDrag4[1],
      preview = _useDrag4[2];

  var _useDrop5 = (0, _reactDnd.useDrop)({
    accept: type,
    canDrop: function canDrop(item) {
      var bl = true;

      if (typeof _canDrop2 === "function") {
        bl = _canDrop2(item);
      }

      return bl;
    },
    drop: function drop(data, monitor) {
      var _dragRef;

      //控制事件执行到子级
      var didDrop = monitor.didDrop();

      if (didDrop) {
        return;
      }

      var hoverBoundingRect = (_dragRef = dragRef()) === null || _dragRef === void 0 ? void 0 : _dragRef.getBoundingClientRect();
      var clientOffset = monitor.getClientOffset();
      var dircetion = getDircetion(hoverBoundingRect, clientOffset, allowInner === false ? 2 : 8);

      var target = _objectSpread(_objectSpread(_objectSpread({}, extra), item), {}, {
        dircetion: dircetion
      });

      return target;
    },
    hover: function hover(data, monitor) {
      var isOver = monitor.isOver({
        shallow: true
      });
      var isCanDrop = monitor.canDrop();

      if (isCanDrop && isOver) {
        var _dragRef2;

        var clientOffset = monitor.getClientOffset();
        var prevOffset = data.prevOffset;

        if (prevOffset) {
          if (clientOffset.x === prevOffset.x) {
            return;
          }
        }

        var hoverBoundingRect = (_dragRef2 = dragRef()) === null || _dragRef2 === void 0 ? void 0 : _dragRef2.getBoundingClientRect();
        var dircetion = getDircetion(hoverBoundingRect, clientOffset, allowInner === false ? 2 : 8);

        if (typeof onDragHover === "function") {
          onDragHover({
            dom: dragRef(),
            dircetion: dircetion
          });
        }

        data.prevOffset = {
          y: clientOffset.y,
          x: clientOffset.x
        };
      }
    },
    collect: function collect(monitor) {
      var clientOffset = monitor.getClientOffset();
      var prevOffset = {};

      if (clientOffset) {
        prevOffset.x = clientOffset.x;
        prevOffset.y = clientOffset.y;
      }

      return {
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({
          shallow: true
        }),
        prevOffset: prevOffset
      };
    }
  }),
      _useDrop6 = _slicedToArray(_useDrop5, 2);

  _objectDestructuringEmpty(_useDrop6[0]);

  var connectDrop = _useDrop6[1];
  (0, _react.useEffect)(function () {
    connectDrop(dragRef());
    connectDrag(dragRef());
    preview(dragRef(), {
      captureDraggingState: true
    });
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "drag-item ".concat(className),
    style: style,
    ref: ref,
    onClick: onClick
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "drag-item-border"
  }), children);
};

exports.DragDrop = DragDrop;