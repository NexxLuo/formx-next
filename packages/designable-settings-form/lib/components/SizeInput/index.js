"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SizeInput = exports.BackgroundSizeInput = void 0;
var _antd = require("antd");
var _PolyInput = require("../PolyInput");
const takeNumber = value => {
  const num = String(value).trim().replace(/[^\d\.]+/, '');
  if (num === '') return;
  return Number(num);
};
const createUnitType = type => {
  return {
    type,
    component: _antd.InputNumber,
    checker(value) {
      return String(value).includes(type);
    },
    toInputValue(value) {
      return takeNumber(value);
    },
    toChangeValue(value) {
      return `${value || 0}${type}`;
    }
  };
};
const createSpecialSizeOption = type => ({
  type: type,
  checker(value) {
    if (value === type) return true;
    return false;
  },
  toChangeValue() {
    return type;
  }
});
const NormalSizeOptions = [createSpecialSizeOption('inherit'), createSpecialSizeOption('auto'), createUnitType('px'), createUnitType('%'), createUnitType('vh'), createUnitType('em')];
const SizeInput = exports.SizeInput = (0, _PolyInput.createPolyInput)(NormalSizeOptions);
const BackgroundSizeInput = exports.BackgroundSizeInput = (0, _PolyInput.createPolyInput)([createSpecialSizeOption('cover'), createSpecialSizeOption('contain'), createUnitType('px'), createUnitType('%'), createUnitType('vh'), createUnitType('em')]);