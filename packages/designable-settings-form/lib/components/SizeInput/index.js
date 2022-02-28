"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackgroundSizeInput = exports.SizeInput = void 0;

var antd_1 = require("antd");

var PolyInput_1 = require("../PolyInput");

var takeNumber = function takeNumber(value) {
  var num = String(value).trim().replace(/[^\d\.]+/, '');
  if (num === '') return;
  return Number(num);
};

var createUnitType = function createUnitType(type) {
  return {
    type: type,
    component: antd_1.InputNumber,
    checker: function checker(value) {
      return String(value).includes(type);
    },
    toInputValue: function toInputValue(value) {
      return takeNumber(value);
    },
    toChangeValue: function toChangeValue(value) {
      return "".concat(value || 0).concat(type);
    }
  };
};

var createSpecialSizeOption = function createSpecialSizeOption(type) {
  return {
    type: type,
    checker: function checker(value) {
      if (value === type) return true;
      return false;
    },
    toChangeValue: function toChangeValue() {
      return type;
    }
  };
};

var NormalSizeOptions = [createSpecialSizeOption('inherit'), createSpecialSizeOption('auto'), createUnitType('px'), createUnitType('%'), createUnitType('vh'), createUnitType('em')];
exports.SizeInput = (0, PolyInput_1.createPolyInput)(NormalSizeOptions);
exports.BackgroundSizeInput = (0, PolyInput_1.createPolyInput)([createSpecialSizeOption('cover'), createSpecialSizeOption('contain'), createUnitType('px'), createUnitType('%'), createUnitType('vh'), createUnitType('em')]);