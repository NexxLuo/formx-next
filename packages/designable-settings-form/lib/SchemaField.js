var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/SchemaField.tsx
var SchemaField_exports = {};
__export(SchemaField_exports, {
  SchemaField: () => SchemaField
});
module.exports = __toCommonJS(SchemaField_exports);
var import_react = require("@formily/react");
var import_formx_antd = require("@platform/formx-antd");
var import_antd = require("antd");
var import_components = require("./components");
var SchemaField = (0, import_react.createSchemaField)({
  components: {
    FormItem: import_formx_antd.FormItem,
    CollapseItem: import_components.CollapseItem,
    Input: import_formx_antd.Input,
    ValueInput: import_components.ValueInput,
    SizeInput: import_components.SizeInput,
    ColorInput: import_components.ColorInput,
    ImageInput: import_components.ImageInput,
    MonacoInput: import_components.MonacoInput,
    PositionInput: import_components.PositionInput,
    CornerInput: import_components.CornerInput,
    BackgroundImageInput: import_components.BackgroundImageInput,
    BackgroundStyleSetter: import_components.BackgroundStyleSetter,
    BoxStyleSetter: import_components.BoxStyleSetter,
    BorderStyleSetter: import_components.BorderStyleSetter,
    BorderRadiusStyleSetter: import_components.BorderRadiusStyleSetter,
    DisplayStyleSetter: import_components.DisplayStyleSetter,
    BoxShadowStyleSetter: import_components.BoxShadowStyleSetter,
    FlexStyleSetter: import_components.FlexStyleSetter,
    FontStyleSetter: import_components.FontStyleSetter,
    DrawerSetter: import_components.DrawerSetter,
    NumberPicker: import_formx_antd.NumberPicker,
    DatePicker: import_formx_antd.DatePicker,
    TimePicker: import_formx_antd.TimePicker,
    Select: import_formx_antd.Select,
    Radio: import_formx_antd.Radio,
    Slider: import_antd.Slider,
    Switch: import_formx_antd.Switch,
    Space: import_formx_antd.Space,
    ArrayItems: import_formx_antd.ArrayItems,
    ArrayTable: import_formx_antd.ArrayTable,
    FormCollapse: import_formx_antd.FormCollapse,
    FormGrid: import_formx_antd.FormGrid,
    FormLayout: import_formx_antd.FormLayout,
    FormTab: import_formx_antd.FormTab
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SchemaField
});
