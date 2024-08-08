"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SchemaField = void 0;
var _react = require("@formily/react");
var _formxAntd = require("@platform/formx-antd");
var _antd = require("antd");
var _components = require("./components");
const SchemaField = exports.SchemaField = (0, _react.createSchemaField)({
  components: {
    FormItem: _formxAntd.FormItem,
    CollapseItem: _components.CollapseItem,
    Input: _formxAntd.Input,
    ValueInput: _components.ValueInput,
    SizeInput: _components.SizeInput,
    ColorInput: _components.ColorInput,
    ImageInput: _components.ImageInput,
    MonacoInput: _components.MonacoInput,
    PositionInput: _components.PositionInput,
    CornerInput: _components.CornerInput,
    BackgroundImageInput: _components.BackgroundImageInput,
    BackgroundStyleSetter: _components.BackgroundStyleSetter,
    BoxStyleSetter: _components.BoxStyleSetter,
    BorderStyleSetter: _components.BorderStyleSetter,
    BorderRadiusStyleSetter: _components.BorderRadiusStyleSetter,
    DisplayStyleSetter: _components.DisplayStyleSetter,
    BoxShadowStyleSetter: _components.BoxShadowStyleSetter,
    FlexStyleSetter: _components.FlexStyleSetter,
    FontStyleSetter: _components.FontStyleSetter,
    DrawerSetter: _components.DrawerSetter,
    NumberPicker: _formxAntd.NumberPicker,
    DatePicker: _formxAntd.DatePicker,
    TimePicker: _formxAntd.TimePicker,
    Select: _formxAntd.Select,
    Radio: _formxAntd.Radio,
    Slider: _antd.Slider,
    Switch: _formxAntd.Switch,
    Space: _formxAntd.Space,
    ArrayItems: _formxAntd.ArrayItems,
    ArrayTable: _formxAntd.ArrayTable,
    FormCollapse: _formxAntd.FormCollapse,
    FormGrid: _formxAntd.FormGrid,
    FormLayout: _formxAntd.FormLayout,
    FormTab: _formxAntd.FormTab
  }
});