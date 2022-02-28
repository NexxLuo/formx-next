"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getItems = void 0;
exports.setItem = setItem;
exports.setItemValue = setItemValue;
exports.setItems = setItems;

function lowercase(str) {
  return str === null || str === void 0 ? void 0 : str.toLowerCase();
}

var registry = {
  items: {}
};

var getItems = function getItems() {
  return Object.keys(registry.items).map(function (k) {
    return registry.items[k];
  });
};

exports.getItems = getItems;

function setItem(o) {
  var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (o && o.name) {
    var name = o.name;

    if (reset !== true && registry.items[name]) {
      console.warn("Env name duplicate. Please change the name:" + name);
      return false;
    }

    registry.items[name] = {
      name: name,
      value: o.value,
      title: o.title
    };
    return true;
  }

  return false;
}

function setItems(items) {
  var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (items) {
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      setItem(item, reset);
    }
  }
}

function setItemValue(o) {
  if (o) {
    for (var k in o) {
      if (Object.prototype.hasOwnProperty.call(o, k)) {
        var name = k;
        var d = registry.items[name];

        if (d) {
          d.value = o[k];
        }
      }
    }
  }
}