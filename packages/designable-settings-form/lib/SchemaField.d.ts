/// <reference types="react" />
import { Slider } from 'antd';
export declare const SchemaField: {
    <Decorator extends import("@formily/react").JSXComponent, Component extends import("@formily/react").JSXComponent>(props: import("@formily/react").ISchemaFieldProps<Decorator, Component, import("@formily/core").ObjectField<Decorator, Component>>): JSX.Element;
    displayName: string;
    Markup: {
        <Decorator_1 extends "Space" | "FormItem" | "CollapseItem" | "Input" | "ValueInput" | "SizeInput" | "ColorInput" | "ImageInput" | "MonacoInput" | "PositionInput" | "CornerInput" | "BackgroundImageInput" | "BackgroundStyleSetter" | "BoxStyleSetter" | "BorderStyleSetter" | "BorderRadiusStyleSetter" | "DisplayStyleSetter" | "BoxShadowStyleSetter" | "FlexStyleSetter" | "FontStyleSetter" | "DrawerSetter" | "NumberPicker" | "DatePicker" | "TimePicker" | "Select" | "Radio" | "Slider" | "Switch" | "ArrayItems" | "ArrayTable" | "FormCollapse" | "FormGrid" | "FormLayout" | "FormTab" | "FormItem.BaseItem" | "Input.TextArea" | "MonacoInput.loader" | "DatePicker.RangePicker" | "TimePicker.RangePicker" | "Radio.Group" | "Radio.__ANT_RADIO" | "Slider.contextType" | "Slider.prototype" | "ArrayItems.Remove" | "ArrayItems.Item" | "ArrayItems.Addition" | "ArrayItems.MoveUp" | "ArrayItems.MoveDown" | "ArrayItems.Index" | "ArrayItems.useArray" | "ArrayItems.useIndex" | "ArrayItems.useRecord" | "ArrayTable.Remove" | "ArrayTable.Addition" | "ArrayTable.MoveUp" | "ArrayTable.MoveDown" | "ArrayTable.Index" | "ArrayTable.useArray" | "ArrayTable.useIndex" | "ArrayTable.useRecord" | "ArrayTable.Column" | "FormCollapse.CollapsePanel" | "FormCollapse.createFormCollapse" | "FormGrid.GridColumn" | "FormGrid.useFormGrid" | "FormGrid.createFormGrid" | "FormGrid.useGridSpan" | "FormGrid.useGridColumn" | "FormLayout.useFormLayout" | "FormLayout.useFormDeepLayout" | "FormLayout.useFormShallowLayout" | "FormTab.TabPane" | "FormTab.createFormTab", Component_1 extends "Space" | "FormItem" | "CollapseItem" | "Input" | "ValueInput" | "SizeInput" | "ColorInput" | "ImageInput" | "MonacoInput" | "PositionInput" | "CornerInput" | "BackgroundImageInput" | "BackgroundStyleSetter" | "BoxStyleSetter" | "BorderStyleSetter" | "BorderRadiusStyleSetter" | "DisplayStyleSetter" | "BoxShadowStyleSetter" | "FlexStyleSetter" | "FontStyleSetter" | "DrawerSetter" | "NumberPicker" | "DatePicker" | "TimePicker" | "Select" | "Radio" | "Slider" | "Switch" | "ArrayItems" | "ArrayTable" | "FormCollapse" | "FormGrid" | "FormLayout" | "FormTab" | "FormItem.BaseItem" | "Input.TextArea" | "MonacoInput.loader" | "DatePicker.RangePicker" | "TimePicker.RangePicker" | "Radio.Group" | "Radio.__ANT_RADIO" | "Slider.contextType" | "Slider.prototype" | "ArrayItems.Remove" | "ArrayItems.Item" | "ArrayItems.Addition" | "ArrayItems.MoveUp" | "ArrayItems.MoveDown" | "ArrayItems.Index" | "ArrayItems.useArray" | "ArrayItems.useIndex" | "ArrayItems.useRecord" | "ArrayTable.Remove" | "ArrayTable.Addition" | "ArrayTable.MoveUp" | "ArrayTable.MoveDown" | "ArrayTable.Index" | "ArrayTable.useArray" | "ArrayTable.useIndex" | "ArrayTable.useRecord" | "ArrayTable.Column" | "FormCollapse.CollapsePanel" | "FormCollapse.createFormCollapse" | "FormGrid.GridColumn" | "FormGrid.useFormGrid" | "FormGrid.createFormGrid" | "FormGrid.useGridSpan" | "FormGrid.useGridColumn" | "FormLayout.useFormLayout" | "FormLayout.useFormDeepLayout" | "FormLayout.useFormShallowLayout" | "FormTab.TabPane" | "FormTab.createFormTab">(props: import("@formily/react").ISchemaMarkupFieldProps<{
            FormItem: import("react").FC<import("@platform/formx-antd").IFormItemProps> & {
                BaseItem?: import("react").FC<import("@platform/formx-antd").IFormItemProps>;
            };
            CollapseItem: import("react").FC<import("./components").ICollapseItemProps>;
            Input: import("react").FC<import("antd/lib/input").InputProps> & {
                TextArea?: import("react").FC<import("antd/lib/input").TextAreaProps>;
            };
            ValueInput: import("react").FC<import("./components").IInput>;
            SizeInput: import("react").FC<import("./components").IInput>;
            ColorInput: import("react").FC<import("./components").IColorInputProps>;
            ImageInput: import("react").FC<import("./components").ImageInputProps>;
            MonacoInput: import("react").FC<import("./components").MonacoInputProps> & {
                loader?: typeof import("@monaco-editor/react").loader;
            };
            PositionInput: import("react").FC<import("./components").IPositionInputProps>;
            CornerInput: import("react").FC<import("./components").ICornerInputProps>;
            BackgroundImageInput: import("react").FC<import("./components").ImageInputProps>;
            BackgroundStyleSetter: import("react").FC<import("./components").IBackgroundStyleSetterProps>;
            BoxStyleSetter: import("react").FC<import("./components").IMarginStyleSetterProps>;
            BorderStyleSetter: import("react").FC<import("./components").IBorderStyleSetterProps>;
            BorderRadiusStyleSetter: import("react").FC<import("./components").IBorderRadiusStyleSetterProps>;
            DisplayStyleSetter: import("react").FC<import("./components").IDisplayStyleSetterProps>;
            BoxShadowStyleSetter: import("react").FC<import("./components").IBoxShadowStyleSetterProps>;
            FlexStyleSetter: import("react").FC<import("./components").IFlexStyleSetterProps>;
            FontStyleSetter: import("react").FC<import("./components").IFontStyleSetterProps>;
            DrawerSetter: import("react").FC<import("./components").IDrawerSetterProps>;
            NumberPicker: import("react").FC<any>;
            DatePicker: import("react").FC<import("antd/lib/date-picker/interface").DatePickerProps> & {
                RangePicker?: import("react").FC<import("antd/lib/date-picker/interface").RangePickerProps>;
            };
            TimePicker: import("react").FC<import("antd/lib/time-picker").TimePickerProps> & {
                RangePicker?: import("react").FC<{}>;
            };
            Select: import("react").FC<any>;
            Radio: import("react").FC<import("antd/lib/radio").RadioProps> & {
                Group?: import("react").FC<import("antd/lib/radio").RadioGroupProps>;
                __ANT_RADIO?: boolean;
            };
            Slider: typeof Slider;
            Switch: import("react").FC<any>;
            Space: import("react").FC<any>;
            ArrayItems: import("react").FC<import("react").HTMLAttributes<HTMLDivElement>> & import("@platform/formx-antd").ArrayBaseMixins & {
                Item?: import("react").FC<import("react").HTMLAttributes<HTMLDivElement> & {
                    type?: "card" | "divide";
                }>;
            };
            ArrayTable: import("react").FC<import("antd/lib/table").TableProps<any>> & import("@platform/formx-antd").ArrayBaseMixins & {
                Column?: import("react").FC<import("antd/lib/table").ColumnProps<any>>;
            };
            FormCollapse: import("react").FC<import("@platform/formx-antd").IFormCollapseProps> & {
                CollapsePanel?: import("react").FC<import("antd/lib/collapse").CollapsePanelProps>;
                createFormCollapse?: (defaultActiveKeys?: string | number | (string | number)[]) => import("@platform/formx-antd").IFormCollapse;
            };
            FormGrid: import("react").FC<import("@platform/formx-antd").IFormGridProps> & {
                GridColumn: import("react").FC<import("@platform/formx-antd").IGridColumnProps>;
                useFormGrid: () => import("@formily/grid").Grid<HTMLElement>;
                createFormGrid: (props: import("@platform/formx-antd").IFormGridProps) => import("@formily/grid").Grid<HTMLElement>;
                useGridSpan: (gridSpan: number) => number;
                useGridColumn: (gridSpan: number) => number;
            };
            FormLayout: import("react").FC<import("@platform/formx-antd").IFormLayoutProps> & {
                useFormLayout: () => import("@platform/formx-antd").IFormLayoutContext;
                useFormDeepLayout: () => import("@platform/formx-antd").IFormLayoutContext;
                useFormShallowLayout: () => import("@platform/formx-antd").IFormLayoutContext;
            };
            FormTab: import("react").FC<import("@platform/formx-antd").IFormTabProps> & {
                TabPane?: import("react").FC<import("@platform/formx-antd").IFormTabPaneProps>;
                createFormTab?: (defaultActiveKey?: string) => import("@platform/formx-antd").IFormTab;
            };
        }, Component_1, Decorator_1>): JSX.Element;
        displayName: string;
    };
    String: {
        <Decorator_2 extends "Space" | "FormItem" | "CollapseItem" | "Input" | "ValueInput" | "SizeInput" | "ColorInput" | "ImageInput" | "MonacoInput" | "PositionInput" | "CornerInput" | "BackgroundImageInput" | "BackgroundStyleSetter" | "BoxStyleSetter" | "BorderStyleSetter" | "BorderRadiusStyleSetter" | "DisplayStyleSetter" | "BoxShadowStyleSetter" | "FlexStyleSetter" | "FontStyleSetter" | "DrawerSetter" | "NumberPicker" | "DatePicker" | "TimePicker" | "Select" | "Radio" | "Slider" | "Switch" | "ArrayItems" | "ArrayTable" | "FormCollapse" | "FormGrid" | "FormLayout" | "FormTab" | "FormItem.BaseItem" | "Input.TextArea" | "MonacoInput.loader" | "DatePicker.RangePicker" | "TimePicker.RangePicker" | "Radio.Group" | "Radio.__ANT_RADIO" | "Slider.contextType" | "Slider.prototype" | "ArrayItems.Remove" | "ArrayItems.Item" | "ArrayItems.Addition" | "ArrayItems.MoveUp" | "ArrayItems.MoveDown" | "ArrayItems.Index" | "ArrayItems.useArray" | "ArrayItems.useIndex" | "ArrayItems.useRecord" | "ArrayTable.Remove" | "ArrayTable.Addition" | "ArrayTable.MoveUp" | "ArrayTable.MoveDown" | "ArrayTable.Index" | "ArrayTable.useArray" | "ArrayTable.useIndex" | "ArrayTable.useRecord" | "ArrayTable.Column" | "FormCollapse.CollapsePanel" | "FormCollapse.createFormCollapse" | "FormGrid.GridColumn" | "FormGrid.useFormGrid" | "FormGrid.createFormGrid" | "FormGrid.useGridSpan" | "FormGrid.useGridColumn" | "FormLayout.useFormLayout" | "FormLayout.useFormDeepLayout" | "FormLayout.useFormShallowLayout" | "FormTab.TabPane" | "FormTab.createFormTab", Component_2 extends "Space" | "FormItem" | "CollapseItem" | "Input" | "ValueInput" | "SizeInput" | "ColorInput" | "ImageInput" | "MonacoInput" | "PositionInput" | "CornerInput" | "BackgroundImageInput" | "BackgroundStyleSetter" | "BoxStyleSetter" | "BorderStyleSetter" | "BorderRadiusStyleSetter" | "DisplayStyleSetter" | "BoxShadowStyleSetter" | "FlexStyleSetter" | "FontStyleSetter" | "DrawerSetter" | "NumberPicker" | "DatePicker" | "TimePicker" | "Select" | "Radio" | "Slider" | "Switch" | "ArrayItems" | "ArrayTable" | "FormCollapse" | "FormGrid" | "FormLayout" | "FormTab" | "FormItem.BaseItem" | "Input.TextArea" | "MonacoInput.loader" | "DatePicker.RangePicker" | "TimePicker.RangePicker" | "Radio.Group" | "Radio.__ANT_RADIO" | "Slider.contextType" | "Slider.prototype" | "ArrayItems.Remove" | "ArrayItems.Item" | "ArrayItems.Addition" | "ArrayItems.MoveUp" | "ArrayItems.MoveDown" | "ArrayItems.Index" | "ArrayItems.useArray" | "ArrayItems.useIndex" | "ArrayItems.useRecord" | "ArrayTable.Remove" | "ArrayTable.Addition" | "ArrayTable.MoveUp" | "ArrayTable.MoveDown" | "ArrayTable.Index" | "ArrayTable.useArray" | "ArrayTable.useIndex" | "ArrayTable.useRecord" | "ArrayTable.Column" | "FormCollapse.CollapsePanel" | "FormCollapse.createFormCollapse" | "FormGrid.GridColumn" | "FormGrid.useFormGrid" | "FormGrid.createFormGrid" | "FormGrid.useGridSpan" | "FormGrid.useGridColumn" | "FormLayout.useFormLayout" | "FormLayout.useFormDeepLayout" | "FormLayout.useFormShallowLayout" | "FormTab.TabPane" | "FormTab.createFormTab">(props: import("@formily/react").ISchemaTypeFieldProps<{
            FormItem: import("react").FC<import("@platform/formx-antd").IFormItemProps> & {
                BaseItem?: import("react").FC<import("@platform/formx-antd").IFormItemProps>;
            };
            CollapseItem: import("react").FC<import("./components").ICollapseItemProps>;
            Input: import("react").FC<import("antd/lib/input").InputProps> & {
                TextArea?: import("react").FC<import("antd/lib/input").TextAreaProps>;
            };
            ValueInput: import("react").FC<import("./components").IInput>;
            SizeInput: import("react").FC<import("./components").IInput>;
            ColorInput: import("react").FC<import("./components").IColorInputProps>;
            ImageInput: import("react").FC<import("./components").ImageInputProps>;
            MonacoInput: import("react").FC<import("./components").MonacoInputProps> & {
                loader?: typeof import("@monaco-editor/react").loader;
            };
            PositionInput: import("react").FC<import("./components").IPositionInputProps>;
            CornerInput: import("react").FC<import("./components").ICornerInputProps>;
            BackgroundImageInput: import("react").FC<import("./components").ImageInputProps>;
            BackgroundStyleSetter: import("react").FC<import("./components").IBackgroundStyleSetterProps>;
            BoxStyleSetter: import("react").FC<import("./components").IMarginStyleSetterProps>;
            BorderStyleSetter: import("react").FC<import("./components").IBorderStyleSetterProps>;
            BorderRadiusStyleSetter: import("react").FC<import("./components").IBorderRadiusStyleSetterProps>;
            DisplayStyleSetter: import("react").FC<import("./components").IDisplayStyleSetterProps>;
            BoxShadowStyleSetter: import("react").FC<import("./components").IBoxShadowStyleSetterProps>;
            FlexStyleSetter: import("react").FC<import("./components").IFlexStyleSetterProps>;
            FontStyleSetter: import("react").FC<import("./components").IFontStyleSetterProps>;
            DrawerSetter: import("react").FC<import("./components").IDrawerSetterProps>;
            NumberPicker: import("react").FC<any>;
            DatePicker: import("react").FC<import("antd/lib/date-picker/interface").DatePickerProps> & {
                RangePicker?: import("react").FC<import("antd/lib/date-picker/interface").RangePickerProps>;
            };
            TimePicker: import("react").FC<import("antd/lib/time-picker").TimePickerProps> & {
                RangePicker?: import("react").FC<{}>;
            };
            Select: import("react").FC<any>;
            Radio: import("react").FC<import("antd/lib/radio").RadioProps> & {
                Group?: import("react").FC<import("antd/lib/radio").RadioGroupProps>;
                __ANT_RADIO?: boolean;
            };
            Slider: typeof Slider;
            Switch: import("react").FC<any>;
            Space: import("react").FC<any>;
            ArrayItems: import("react").FC<import("react").HTMLAttributes<HTMLDivElement>> & import("@platform/formx-antd").ArrayBaseMixins & {
                Item?: import("react").FC<import("react").HTMLAttributes<HTMLDivElement> & {
                    type?: "card" | "divide";
                }>;
            };
            ArrayTable: import("react").FC<import("antd/lib/table").TableProps<any>> & import("@platform/formx-antd").ArrayBaseMixins & {
                Column?: import("react").FC<import("antd/lib/table").ColumnProps<any>>;
            };
            FormCollapse: import("react").FC<import("@platform/formx-antd").IFormCollapseProps> & {
                CollapsePanel?: import("react").FC<import("antd/lib/collapse").CollapsePanelProps>;
                createFormCollapse?: (defaultActiveKeys?: string | number | (string | number)[]) => import("@platform/formx-antd").IFormCollapse;
            };
            FormGrid: import("react").FC<import("@platform/formx-antd").IFormGridProps> & {
                GridColumn: import("react").FC<import("@platform/formx-antd").IGridColumnProps>;
                useFormGrid: () => import("@formily/grid").Grid<HTMLElement>;
                createFormGrid: (props: import("@platform/formx-antd").IFormGridProps) => import("@formily/grid").Grid<HTMLElement>;
                useGridSpan: (gridSpan: number) => number;
                useGridColumn: (gridSpan: number) => number;
            };
            FormLayout: import("react").FC<import("@platform/formx-antd").IFormLayoutProps> & {
                useFormLayout: () => import("@platform/formx-antd").IFormLayoutContext;
                useFormDeepLayout: () => import("@platform/formx-antd").IFormLayoutContext;
                useFormShallowLayout: () => import("@platform/formx-antd").IFormLayoutContext;
            };
            FormTab: import("react").FC<import("@platform/formx-antd").IFormTabProps> & {
                TabPane?: import("react").FC<import("@platform/formx-antd").IFormTabPaneProps>;
                createFormTab?: (defaultActiveKey?: string) => import("@platform/formx-antd").IFormTab;
            };
        }, Component_2, Decorator_2>): JSX.Element;
        displayName: string;
    };
    Object: {
        <Decorator_3 extends "Space" | "FormItem" | "CollapseItem" | "Input" | "ValueInput" | "SizeInput" | "ColorInput" | "ImageInput" | "MonacoInput" | "PositionInput" | "CornerInput" | "BackgroundImageInput" | "BackgroundStyleSetter" | "BoxStyleSetter" | "BorderStyleSetter" | "BorderRadiusStyleSetter" | "DisplayStyleSetter" | "BoxShadowStyleSetter" | "FlexStyleSetter" | "FontStyleSetter" | "DrawerSetter" | "NumberPicker" | "DatePicker" | "TimePicker" | "Select" | "Radio" | "Slider" | "Switch" | "ArrayItems" | "ArrayTable" | "FormCollapse" | "FormGrid" | "FormLayout" | "FormTab" | "FormItem.BaseItem" | "Input.TextArea" | "MonacoInput.loader" | "DatePicker.RangePicker" | "TimePicker.RangePicker" | "Radio.Group" | "Radio.__ANT_RADIO" | "Slider.contextType" | "Slider.prototype" | "ArrayItems.Remove" | "ArrayItems.Item" | "ArrayItems.Addition" | "ArrayItems.MoveUp" | "ArrayItems.MoveDown" | "ArrayItems.Index" | "ArrayItems.useArray" | "ArrayItems.useIndex" | "ArrayItems.useRecord" | "ArrayTable.Remove" | "ArrayTable.Addition" | "ArrayTable.MoveUp" | "ArrayTable.MoveDown" | "ArrayTable.Index" | "ArrayTable.useArray" | "ArrayTable.useIndex" | "ArrayTable.useRecord" | "ArrayTable.Column" | "FormCollapse.CollapsePanel" | "FormCollapse.createFormCollapse" | "FormGrid.GridColumn" | "FormGrid.useFormGrid" | "FormGrid.createFormGrid" | "FormGrid.useGridSpan" | "FormGrid.useGridColumn" | "FormLayout.useFormLayout" | "FormLayout.useFormDeepLayout" | "FormLayout.useFormShallowLayout" | "FormTab.TabPane" | "FormTab.createFormTab", Component_3 extends "Space" | "FormItem" | "CollapseItem" | "Input" | "ValueInput" | "SizeInput" | "ColorInput" | "ImageInput" | "MonacoInput" | "PositionInput" | "CornerInput" | "BackgroundImageInput" | "BackgroundStyleSetter" | "BoxStyleSetter" | "BorderStyleSetter" | "BorderRadiusStyleSetter" | "DisplayStyleSetter" | "BoxShadowStyleSetter" | "FlexStyleSetter" | "FontStyleSetter" | "DrawerSetter" | "NumberPicker" | "DatePicker" | "TimePicker" | "Select" | "Radio" | "Slider" | "Switch" | "ArrayItems" | "ArrayTable" | "FormCollapse" | "FormGrid" | "FormLayout" | "FormTab" | "FormItem.BaseItem" | "Input.TextArea" | "MonacoInput.loader" | "DatePicker.RangePicker" | "TimePicker.RangePicker" | "Radio.Group" | "Radio.__ANT_RADIO" | "Slider.contextType" | "Slider.prototype" | "ArrayItems.Remove" | "ArrayItems.Item" | "ArrayItems.Addition" | "ArrayItems.MoveUp" | "ArrayItems.MoveDown" | "ArrayItems.Index" | "ArrayItems.useArray" | "ArrayItems.useIndex" | "ArrayItems.useRecord" | "ArrayTable.Remove" | "ArrayTable.Addition" | "ArrayTable.MoveUp" | "ArrayTable.MoveDown" | "ArrayTable.Index" | "ArrayTable.useArray" | "ArrayTable.useIndex" | "ArrayTable.useRecord" | "ArrayTable.Column" | "FormCollapse.CollapsePanel" | "FormCollapse.createFormCollapse" | "FormGrid.GridColumn" | "FormGrid.useFormGrid" | "FormGrid.createFormGrid" | "FormGrid.useGridSpan" | "FormGrid.useGridColumn" | "FormLayout.useFormLayout" | "FormLayout.useFormDeepLayout" | "FormLayout.useFormShallowLayout" | "FormTab.TabPane" | "FormTab.createFormTab">(props: import("@formily/react").ISchemaTypeFieldProps<{
            FormItem: import("react").FC<import("@platform/formx-antd").IFormItemProps> & {
                BaseItem?: import("react").FC<import("@platform/formx-antd").IFormItemProps>;
            };
            CollapseItem: import("react").FC<import("./components").ICollapseItemProps>;
            Input: import("react").FC<import("antd/lib/input").InputProps> & {
                TextArea?: import("react").FC<import("antd/lib/input").TextAreaProps>;
            };
            ValueInput: import("react").FC<import("./components").IInput>;
            SizeInput: import("react").FC<import("./components").IInput>;
            ColorInput: import("react").FC<import("./components").IColorInputProps>;
            ImageInput: import("react").FC<import("./components").ImageInputProps>;
            MonacoInput: import("react").FC<import("./components").MonacoInputProps> & {
                loader?: typeof import("@monaco-editor/react").loader;
            };
            PositionInput: import("react").FC<import("./components").IPositionInputProps>;
            CornerInput: import("react").FC<import("./components").ICornerInputProps>;
            BackgroundImageInput: import("react").FC<import("./components").ImageInputProps>;
            BackgroundStyleSetter: import("react").FC<import("./components").IBackgroundStyleSetterProps>;
            BoxStyleSetter: import("react").FC<import("./components").IMarginStyleSetterProps>;
            BorderStyleSetter: import("react").FC<import("./components").IBorderStyleSetterProps>;
            BorderRadiusStyleSetter: import("react").FC<import("./components").IBorderRadiusStyleSetterProps>;
            DisplayStyleSetter: import("react").FC<import("./components").IDisplayStyleSetterProps>;
            BoxShadowStyleSetter: import("react").FC<import("./components").IBoxShadowStyleSetterProps>;
            FlexStyleSetter: import("react").FC<import("./components").IFlexStyleSetterProps>;
            FontStyleSetter: import("react").FC<import("./components").IFontStyleSetterProps>;
            DrawerSetter: import("react").FC<import("./components").IDrawerSetterProps>;
            NumberPicker: import("react").FC<any>;
            DatePicker: import("react").FC<import("antd/lib/date-picker/interface").DatePickerProps> & {
                RangePicker?: import("react").FC<import("antd/lib/date-picker/interface").RangePickerProps>;
            };
            TimePicker: import("react").FC<import("antd/lib/time-picker").TimePickerProps> & {
                RangePicker?: import("react").FC<{}>;
            };
            Select: import("react").FC<any>;
            Radio: import("react").FC<import("antd/lib/radio").RadioProps> & {
                Group?: import("react").FC<import("antd/lib/radio").RadioGroupProps>;
                __ANT_RADIO?: boolean;
            };
            Slider: typeof Slider;
            Switch: import("react").FC<any>;
            Space: import("react").FC<any>;
            ArrayItems: import("react").FC<import("react").HTMLAttributes<HTMLDivElement>> & import("@platform/formx-antd").ArrayBaseMixins & {
                Item?: import("react").FC<import("react").HTMLAttributes<HTMLDivElement> & {
                    type?: "card" | "divide";
                }>;
            };
            ArrayTable: import("react").FC<import("antd/lib/table").TableProps<any>> & import("@platform/formx-antd").ArrayBaseMixins & {
                Column?: import("react").FC<import("antd/lib/table").ColumnProps<any>>;
            };
            FormCollapse: import("react").FC<import("@platform/formx-antd").IFormCollapseProps> & {
                CollapsePanel?: import("react").FC<import("antd/lib/collapse").CollapsePanelProps>;
                createFormCollapse?: (defaultActiveKeys?: string | number | (string | number)[]) => import("@platform/formx-antd").IFormCollapse;
            };
            FormGrid: import("react").FC<import("@platform/formx-antd").IFormGridProps> & {
                GridColumn: import("react").FC<import("@platform/formx-antd").IGridColumnProps>;
                useFormGrid: () => import("@formily/grid").Grid<HTMLElement>;
                createFormGrid: (props: import("@platform/formx-antd").IFormGridProps) => import("@formily/grid").Grid<HTMLElement>;
                useGridSpan: (gridSpan: number) => number;
                useGridColumn: (gridSpan: number) => number;
            };
            FormLayout: import("react").FC<import("@platform/formx-antd").IFormLayoutProps> & {
                useFormLayout: () => import("@platform/formx-antd").IFormLayoutContext;
                useFormDeepLayout: () => import("@platform/formx-antd").IFormLayoutContext;
                useFormShallowLayout: () => import("@platform/formx-antd").IFormLayoutContext;
            };
            FormTab: import("react").FC<import("@platform/formx-antd").IFormTabProps> & {
                TabPane?: import("react").FC<import("@platform/formx-antd").IFormTabPaneProps>;
                createFormTab?: (defaultActiveKey?: string) => import("@platform/formx-antd").IFormTab;
            };
        }, Component_3, Decorator_3>): JSX.Element;
        displayName: string;
    };
    Array: {
        <Decorator_4 extends "Space" | "FormItem" | "CollapseItem" | "Input" | "ValueInput" | "SizeInput" | "ColorInput" | "ImageInput" | "MonacoInput" | "PositionInput" | "CornerInput" | "BackgroundImageInput" | "BackgroundStyleSetter" | "BoxStyleSetter" | "BorderStyleSetter" | "BorderRadiusStyleSetter" | "DisplayStyleSetter" | "BoxShadowStyleSetter" | "FlexStyleSetter" | "FontStyleSetter" | "DrawerSetter" | "NumberPicker" | "DatePicker" | "TimePicker" | "Select" | "Radio" | "Slider" | "Switch" | "ArrayItems" | "ArrayTable" | "FormCollapse" | "FormGrid" | "FormLayout" | "FormTab" | "FormItem.BaseItem" | "Input.TextArea" | "MonacoInput.loader" | "DatePicker.RangePicker" | "TimePicker.RangePicker" | "Radio.Group" | "Radio.__ANT_RADIO" | "Slider.contextType" | "Slider.prototype" | "ArrayItems.Remove" | "ArrayItems.Item" | "ArrayItems.Addition" | "ArrayItems.MoveUp" | "ArrayItems.MoveDown" | "ArrayItems.Index" | "ArrayItems.useArray" | "ArrayItems.useIndex" | "ArrayItems.useRecord" | "ArrayTable.Remove" | "ArrayTable.Addition" | "ArrayTable.MoveUp" | "ArrayTable.MoveDown" | "ArrayTable.Index" | "ArrayTable.useArray" | "ArrayTable.useIndex" | "ArrayTable.useRecord" | "ArrayTable.Column" | "FormCollapse.CollapsePanel" | "FormCollapse.createFormCollapse" | "FormGrid.GridColumn" | "FormGrid.useFormGrid" | "FormGrid.createFormGrid" | "FormGrid.useGridSpan" | "FormGrid.useGridColumn" | "FormLayout.useFormLayout" | "FormLayout.useFormDeepLayout" | "FormLayout.useFormShallowLayout" | "FormTab.TabPane" | "FormTab.createFormTab", Component_4 extends "Space" | "FormItem" | "CollapseItem" | "Input" | "ValueInput" | "SizeInput" | "ColorInput" | "ImageInput" | "MonacoInput" | "PositionInput" | "CornerInput" | "BackgroundImageInput" | "BackgroundStyleSetter" | "BoxStyleSetter" | "BorderStyleSetter" | "BorderRadiusStyleSetter" | "DisplayStyleSetter" | "BoxShadowStyleSetter" | "FlexStyleSetter" | "FontStyleSetter" | "DrawerSetter" | "NumberPicker" | "DatePicker" | "TimePicker" | "Select" | "Radio" | "Slider" | "Switch" | "ArrayItems" | "ArrayTable" | "FormCollapse" | "FormGrid" | "FormLayout" | "FormTab" | "FormItem.BaseItem" | "Input.TextArea" | "MonacoInput.loader" | "DatePicker.RangePicker" | "TimePicker.RangePicker" | "Radio.Group" | "Radio.__ANT_RADIO" | "Slider.contextType" | "Slider.prototype" | "ArrayItems.Remove" | "ArrayItems.Item" | "ArrayItems.Addition" | "ArrayItems.MoveUp" | "ArrayItems.MoveDown" | "ArrayItems.Index" | "ArrayItems.useArray" | "ArrayItems.useIndex" | "ArrayItems.useRecord" | "ArrayTable.Remove" | "ArrayTable.Addition" | "ArrayTable.MoveUp" | "ArrayTable.MoveDown" | "ArrayTable.Index" | "ArrayTable.useArray" | "ArrayTable.useIndex" | "ArrayTable.useRecord" | "ArrayTable.Column" | "FormCollapse.CollapsePanel" | "FormCollapse.createFormCollapse" | "FormGrid.GridColumn" | "FormGrid.useFormGrid" | "FormGrid.createFormGrid" | "FormGrid.useGridSpan" | "FormGrid.useGridColumn" | "FormLayout.useFormLayout" | "FormLayout.useFormDeepLayout" | "FormLayout.useFormShallowLayout" | "FormTab.TabPane" | "FormTab.createFormTab">(props: import("@formily/react").ISchemaTypeFieldProps<{
            FormItem: import("react").FC<import("@platform/formx-antd").IFormItemProps> & {
                BaseItem?: import("react").FC<import("@platform/formx-antd").IFormItemProps>;
            };
            CollapseItem: import("react").FC<import("./components").ICollapseItemProps>;
            Input: import("react").FC<import("antd/lib/input").InputProps> & {
                TextArea?: import("react").FC<import("antd/lib/input").TextAreaProps>;
            };
            ValueInput: import("react").FC<import("./components").IInput>;
            SizeInput: import("react").FC<import("./components").IInput>;
            ColorInput: import("react").FC<import("./components").IColorInputProps>;
            ImageInput: import("react").FC<import("./components").ImageInputProps>;
            MonacoInput: import("react").FC<import("./components").MonacoInputProps> & {
                loader?: typeof import("@monaco-editor/react").loader;
            };
            PositionInput: import("react").FC<import("./components").IPositionInputProps>;
            CornerInput: import("react").FC<import("./components").ICornerInputProps>;
            BackgroundImageInput: import("react").FC<import("./components").ImageInputProps>;
            BackgroundStyleSetter: import("react").FC<import("./components").IBackgroundStyleSetterProps>;
            BoxStyleSetter: import("react").FC<import("./components").IMarginStyleSetterProps>;
            BorderStyleSetter: import("react").FC<import("./components").IBorderStyleSetterProps>;
            BorderRadiusStyleSetter: import("react").FC<import("./components").IBorderRadiusStyleSetterProps>;
            DisplayStyleSetter: import("react").FC<import("./components").IDisplayStyleSetterProps>;
            BoxShadowStyleSetter: import("react").FC<import("./components").IBoxShadowStyleSetterProps>;
            FlexStyleSetter: import("react").FC<import("./components").IFlexStyleSetterProps>;
            FontStyleSetter: import("react").FC<import("./components").IFontStyleSetterProps>;
            DrawerSetter: import("react").FC<import("./components").IDrawerSetterProps>;
            NumberPicker: import("react").FC<any>;
            DatePicker: import("react").FC<import("antd/lib/date-picker/interface").DatePickerProps> & {
                RangePicker?: import("react").FC<import("antd/lib/date-picker/interface").RangePickerProps>;
            };
            TimePicker: import("react").FC<import("antd/lib/time-picker").TimePickerProps> & {
                RangePicker?: import("react").FC<{}>;
            };
            Select: import("react").FC<any>;
            Radio: import("react").FC<import("antd/lib/radio").RadioProps> & {
                Group?: import("react").FC<import("antd/lib/radio").RadioGroupProps>;
                __ANT_RADIO?: boolean;
            };
            Slider: typeof Slider;
            Switch: import("react").FC<any>;
            Space: import("react").FC<any>;
            ArrayItems: import("react").FC<import("react").HTMLAttributes<HTMLDivElement>> & import("@platform/formx-antd").ArrayBaseMixins & {
                Item?: import("react").FC<import("react").HTMLAttributes<HTMLDivElement> & {
                    type?: "card" | "divide";
                }>;
            };
            ArrayTable: import("react").FC<import("antd/lib/table").TableProps<any>> & import("@platform/formx-antd").ArrayBaseMixins & {
                Column?: import("react").FC<import("antd/lib/table").ColumnProps<any>>;
            };
            FormCollapse: import("react").FC<import("@platform/formx-antd").IFormCollapseProps> & {
                CollapsePanel?: import("react").FC<import("antd/lib/collapse").CollapsePanelProps>;
                createFormCollapse?: (defaultActiveKeys?: string | number | (string | number)[]) => import("@platform/formx-antd").IFormCollapse;
            };
            FormGrid: import("react").FC<import("@platform/formx-antd").IFormGridProps> & {
                GridColumn: import("react").FC<import("@platform/formx-antd").IGridColumnProps>;
                useFormGrid: () => import("@formily/grid").Grid<HTMLElement>;
                createFormGrid: (props: import("@platform/formx-antd").IFormGridProps) => import("@formily/grid").Grid<HTMLElement>;
                useGridSpan: (gridSpan: number) => number;
                useGridColumn: (gridSpan: number) => number;
            };
            FormLayout: import("react").FC<import("@platform/formx-antd").IFormLayoutProps> & {
                useFormLayout: () => import("@platform/formx-antd").IFormLayoutContext;
                useFormDeepLayout: () => import("@platform/formx-antd").IFormLayoutContext;
                useFormShallowLayout: () => import("@platform/formx-antd").IFormLayoutContext;
            };
            FormTab: import("react").FC<import("@platform/formx-antd").IFormTabProps> & {
                TabPane?: import("react").FC<import("@platform/formx-antd").IFormTabPaneProps>;
                createFormTab?: (defaultActiveKey?: string) => import("@platform/formx-antd").IFormTab;
            };
        }, Component_4, Decorator_4>): JSX.Element;
        displayName: string;
    };
    Boolean: {
        <Decorator_5 extends "Space" | "FormItem" | "CollapseItem" | "Input" | "ValueInput" | "SizeInput" | "ColorInput" | "ImageInput" | "MonacoInput" | "PositionInput" | "CornerInput" | "BackgroundImageInput" | "BackgroundStyleSetter" | "BoxStyleSetter" | "BorderStyleSetter" | "BorderRadiusStyleSetter" | "DisplayStyleSetter" | "BoxShadowStyleSetter" | "FlexStyleSetter" | "FontStyleSetter" | "DrawerSetter" | "NumberPicker" | "DatePicker" | "TimePicker" | "Select" | "Radio" | "Slider" | "Switch" | "ArrayItems" | "ArrayTable" | "FormCollapse" | "FormGrid" | "FormLayout" | "FormTab" | "FormItem.BaseItem" | "Input.TextArea" | "MonacoInput.loader" | "DatePicker.RangePicker" | "TimePicker.RangePicker" | "Radio.Group" | "Radio.__ANT_RADIO" | "Slider.contextType" | "Slider.prototype" | "ArrayItems.Remove" | "ArrayItems.Item" | "ArrayItems.Addition" | "ArrayItems.MoveUp" | "ArrayItems.MoveDown" | "ArrayItems.Index" | "ArrayItems.useArray" | "ArrayItems.useIndex" | "ArrayItems.useRecord" | "ArrayTable.Remove" | "ArrayTable.Addition" | "ArrayTable.MoveUp" | "ArrayTable.MoveDown" | "ArrayTable.Index" | "ArrayTable.useArray" | "ArrayTable.useIndex" | "ArrayTable.useRecord" | "ArrayTable.Column" | "FormCollapse.CollapsePanel" | "FormCollapse.createFormCollapse" | "FormGrid.GridColumn" | "FormGrid.useFormGrid" | "FormGrid.createFormGrid" | "FormGrid.useGridSpan" | "FormGrid.useGridColumn" | "FormLayout.useFormLayout" | "FormLayout.useFormDeepLayout" | "FormLayout.useFormShallowLayout" | "FormTab.TabPane" | "FormTab.createFormTab", Component_5 extends "Space" | "FormItem" | "CollapseItem" | "Input" | "ValueInput" | "SizeInput" | "ColorInput" | "ImageInput" | "MonacoInput" | "PositionInput" | "CornerInput" | "BackgroundImageInput" | "BackgroundStyleSetter" | "BoxStyleSetter" | "BorderStyleSetter" | "BorderRadiusStyleSetter" | "DisplayStyleSetter" | "BoxShadowStyleSetter" | "FlexStyleSetter" | "FontStyleSetter" | "DrawerSetter" | "NumberPicker" | "DatePicker" | "TimePicker" | "Select" | "Radio" | "Slider" | "Switch" | "ArrayItems" | "ArrayTable" | "FormCollapse" | "FormGrid" | "FormLayout" | "FormTab" | "FormItem.BaseItem" | "Input.TextArea" | "MonacoInput.loader" | "DatePicker.RangePicker" | "TimePicker.RangePicker" | "Radio.Group" | "Radio.__ANT_RADIO" | "Slider.contextType" | "Slider.prototype" | "ArrayItems.Remove" | "ArrayItems.Item" | "ArrayItems.Addition" | "ArrayItems.MoveUp" | "ArrayItems.MoveDown" | "ArrayItems.Index" | "ArrayItems.useArray" | "ArrayItems.useIndex" | "ArrayItems.useRecord" | "ArrayTable.Remove" | "ArrayTable.Addition" | "ArrayTable.MoveUp" | "ArrayTable.MoveDown" | "ArrayTable.Index" | "ArrayTable.useArray" | "ArrayTable.useIndex" | "ArrayTable.useRecord" | "ArrayTable.Column" | "FormCollapse.CollapsePanel" | "FormCollapse.createFormCollapse" | "FormGrid.GridColumn" | "FormGrid.useFormGrid" | "FormGrid.createFormGrid" | "FormGrid.useGridSpan" | "FormGrid.useGridColumn" | "FormLayout.useFormLayout" | "FormLayout.useFormDeepLayout" | "FormLayout.useFormShallowLayout" | "FormTab.TabPane" | "FormTab.createFormTab">(props: import("@formily/react").ISchemaTypeFieldProps<{
            FormItem: import("react").FC<import("@platform/formx-antd").IFormItemProps> & {
                BaseItem?: import("react").FC<import("@platform/formx-antd").IFormItemProps>;
            };
            CollapseItem: import("react").FC<import("./components").ICollapseItemProps>;
            Input: import("react").FC<import("antd/lib/input").InputProps> & {
                TextArea?: import("react").FC<import("antd/lib/input").TextAreaProps>;
            };
            ValueInput: import("react").FC<import("./components").IInput>;
            SizeInput: import("react").FC<import("./components").IInput>;
            ColorInput: import("react").FC<import("./components").IColorInputProps>;
            ImageInput: import("react").FC<import("./components").ImageInputProps>;
            MonacoInput: import("react").FC<import("./components").MonacoInputProps> & {
                loader?: typeof import("@monaco-editor/react").loader;
            };
            PositionInput: import("react").FC<import("./components").IPositionInputProps>;
            CornerInput: import("react").FC<import("./components").ICornerInputProps>;
            BackgroundImageInput: import("react").FC<import("./components").ImageInputProps>;
            BackgroundStyleSetter: import("react").FC<import("./components").IBackgroundStyleSetterProps>;
            BoxStyleSetter: import("react").FC<import("./components").IMarginStyleSetterProps>;
            BorderStyleSetter: import("react").FC<import("./components").IBorderStyleSetterProps>;
            BorderRadiusStyleSetter: import("react").FC<import("./components").IBorderRadiusStyleSetterProps>;
            DisplayStyleSetter: import("react").FC<import("./components").IDisplayStyleSetterProps>;
            BoxShadowStyleSetter: import("react").FC<import("./components").IBoxShadowStyleSetterProps>;
            FlexStyleSetter: import("react").FC<import("./components").IFlexStyleSetterProps>;
            FontStyleSetter: import("react").FC<import("./components").IFontStyleSetterProps>;
            DrawerSetter: import("react").FC<import("./components").IDrawerSetterProps>;
            NumberPicker: import("react").FC<any>;
            DatePicker: import("react").FC<import("antd/lib/date-picker/interface").DatePickerProps> & {
                RangePicker?: import("react").FC<import("antd/lib/date-picker/interface").RangePickerProps>;
            };
            TimePicker: import("react").FC<import("antd/lib/time-picker").TimePickerProps> & {
                RangePicker?: import("react").FC<{}>;
            };
            Select: import("react").FC<any>;
            Radio: import("react").FC<import("antd/lib/radio").RadioProps> & {
                Group?: import("react").FC<import("antd/lib/radio").RadioGroupProps>;
                __ANT_RADIO?: boolean;
            };
            Slider: typeof Slider;
            Switch: import("react").FC<any>;
            Space: import("react").FC<any>;
            ArrayItems: import("react").FC<import("react").HTMLAttributes<HTMLDivElement>> & import("@platform/formx-antd").ArrayBaseMixins & {
                Item?: import("react").FC<import("react").HTMLAttributes<HTMLDivElement> & {
                    type?: "card" | "divide";
                }>;
            };
            ArrayTable: import("react").FC<import("antd/lib/table").TableProps<any>> & import("@platform/formx-antd").ArrayBaseMixins & {
                Column?: import("react").FC<import("antd/lib/table").ColumnProps<any>>;
            };
            FormCollapse: import("react").FC<import("@platform/formx-antd").IFormCollapseProps> & {
                CollapsePanel?: import("react").FC<import("antd/lib/collapse").CollapsePanelProps>;
                createFormCollapse?: (defaultActiveKeys?: string | number | (string | number)[]) => import("@platform/formx-antd").IFormCollapse;
            };
            FormGrid: import("react").FC<import("@platform/formx-antd").IFormGridProps> & {
                GridColumn: import("react").FC<import("@platform/formx-antd").IGridColumnProps>;
                useFormGrid: () => import("@formily/grid").Grid<HTMLElement>;
                createFormGrid: (props: import("@platform/formx-antd").IFormGridProps) => import("@formily/grid").Grid<HTMLElement>;
                useGridSpan: (gridSpan: number) => number;
                useGridColumn: (gridSpan: number) => number;
            };
            FormLayout: import("react").FC<import("@platform/formx-antd").IFormLayoutProps> & {
                useFormLayout: () => import("@platform/formx-antd").IFormLayoutContext;
                useFormDeepLayout: () => import("@platform/formx-antd").IFormLayoutContext;
                useFormShallowLayout: () => import("@platform/formx-antd").IFormLayoutContext;
            };
            FormTab: import("react").FC<import("@platform/formx-antd").IFormTabProps> & {
                TabPane?: import("react").FC<import("@platform/formx-antd").IFormTabPaneProps>;
                createFormTab?: (defaultActiveKey?: string) => import("@platform/formx-antd").IFormTab;
            };
        }, Component_5, Decorator_5>): JSX.Element;
        displayName: string;
    };
    Date: {
        <Decorator_6 extends "Space" | "FormItem" | "CollapseItem" | "Input" | "ValueInput" | "SizeInput" | "ColorInput" | "ImageInput" | "MonacoInput" | "PositionInput" | "CornerInput" | "BackgroundImageInput" | "BackgroundStyleSetter" | "BoxStyleSetter" | "BorderStyleSetter" | "BorderRadiusStyleSetter" | "DisplayStyleSetter" | "BoxShadowStyleSetter" | "FlexStyleSetter" | "FontStyleSetter" | "DrawerSetter" | "NumberPicker" | "DatePicker" | "TimePicker" | "Select" | "Radio" | "Slider" | "Switch" | "ArrayItems" | "ArrayTable" | "FormCollapse" | "FormGrid" | "FormLayout" | "FormTab" | "FormItem.BaseItem" | "Input.TextArea" | "MonacoInput.loader" | "DatePicker.RangePicker" | "TimePicker.RangePicker" | "Radio.Group" | "Radio.__ANT_RADIO" | "Slider.contextType" | "Slider.prototype" | "ArrayItems.Remove" | "ArrayItems.Item" | "ArrayItems.Addition" | "ArrayItems.MoveUp" | "ArrayItems.MoveDown" | "ArrayItems.Index" | "ArrayItems.useArray" | "ArrayItems.useIndex" | "ArrayItems.useRecord" | "ArrayTable.Remove" | "ArrayTable.Addition" | "ArrayTable.MoveUp" | "ArrayTable.MoveDown" | "ArrayTable.Index" | "ArrayTable.useArray" | "ArrayTable.useIndex" | "ArrayTable.useRecord" | "ArrayTable.Column" | "FormCollapse.CollapsePanel" | "FormCollapse.createFormCollapse" | "FormGrid.GridColumn" | "FormGrid.useFormGrid" | "FormGrid.createFormGrid" | "FormGrid.useGridSpan" | "FormGrid.useGridColumn" | "FormLayout.useFormLayout" | "FormLayout.useFormDeepLayout" | "FormLayout.useFormShallowLayout" | "FormTab.TabPane" | "FormTab.createFormTab", Component_6 extends "Space" | "FormItem" | "CollapseItem" | "Input" | "ValueInput" | "SizeInput" | "ColorInput" | "ImageInput" | "MonacoInput" | "PositionInput" | "CornerInput" | "BackgroundImageInput" | "BackgroundStyleSetter" | "BoxStyleSetter" | "BorderStyleSetter" | "BorderRadiusStyleSetter" | "DisplayStyleSetter" | "BoxShadowStyleSetter" | "FlexStyleSetter" | "FontStyleSetter" | "DrawerSetter" | "NumberPicker" | "DatePicker" | "TimePicker" | "Select" | "Radio" | "Slider" | "Switch" | "ArrayItems" | "ArrayTable" | "FormCollapse" | "FormGrid" | "FormLayout" | "FormTab" | "FormItem.BaseItem" | "Input.TextArea" | "MonacoInput.loader" | "DatePicker.RangePicker" | "TimePicker.RangePicker" | "Radio.Group" | "Radio.__ANT_RADIO" | "Slider.contextType" | "Slider.prototype" | "ArrayItems.Remove" | "ArrayItems.Item" | "ArrayItems.Addition" | "ArrayItems.MoveUp" | "ArrayItems.MoveDown" | "ArrayItems.Index" | "ArrayItems.useArray" | "ArrayItems.useIndex" | "ArrayItems.useRecord" | "ArrayTable.Remove" | "ArrayTable.Addition" | "ArrayTable.MoveUp" | "ArrayTable.MoveDown" | "ArrayTable.Index" | "ArrayTable.useArray" | "ArrayTable.useIndex" | "ArrayTable.useRecord" | "ArrayTable.Column" | "FormCollapse.CollapsePanel" | "FormCollapse.createFormCollapse" | "FormGrid.GridColumn" | "FormGrid.useFormGrid" | "FormGrid.createFormGrid" | "FormGrid.useGridSpan" | "FormGrid.useGridColumn" | "FormLayout.useFormLayout" | "FormLayout.useFormDeepLayout" | "FormLayout.useFormShallowLayout" | "FormTab.TabPane" | "FormTab.createFormTab">(props: import("@formily/react").ISchemaTypeFieldProps<{
            FormItem: import("react").FC<import("@platform/formx-antd").IFormItemProps> & {
                BaseItem?: import("react").FC<import("@platform/formx-antd").IFormItemProps>;
            };
            CollapseItem: import("react").FC<import("./components").ICollapseItemProps>;
            Input: import("react").FC<import("antd/lib/input").InputProps> & {
                TextArea?: import("react").FC<import("antd/lib/input").TextAreaProps>;
            };
            ValueInput: import("react").FC<import("./components").IInput>;
            SizeInput: import("react").FC<import("./components").IInput>;
            ColorInput: import("react").FC<import("./components").IColorInputProps>;
            ImageInput: import("react").FC<import("./components").ImageInputProps>;
            MonacoInput: import("react").FC<import("./components").MonacoInputProps> & {
                loader?: typeof import("@monaco-editor/react").loader;
            };
            PositionInput: import("react").FC<import("./components").IPositionInputProps>;
            CornerInput: import("react").FC<import("./components").ICornerInputProps>;
            BackgroundImageInput: import("react").FC<import("./components").ImageInputProps>;
            BackgroundStyleSetter: import("react").FC<import("./components").IBackgroundStyleSetterProps>;
            BoxStyleSetter: import("react").FC<import("./components").IMarginStyleSetterProps>;
            BorderStyleSetter: import("react").FC<import("./components").IBorderStyleSetterProps>;
            BorderRadiusStyleSetter: import("react").FC<import("./components").IBorderRadiusStyleSetterProps>;
            DisplayStyleSetter: import("react").FC<import("./components").IDisplayStyleSetterProps>;
            BoxShadowStyleSetter: import("react").FC<import("./components").IBoxShadowStyleSetterProps>;
            FlexStyleSetter: import("react").FC<import("./components").IFlexStyleSetterProps>;
            FontStyleSetter: import("react").FC<import("./components").IFontStyleSetterProps>;
            DrawerSetter: import("react").FC<import("./components").IDrawerSetterProps>;
            NumberPicker: import("react").FC<any>;
            DatePicker: import("react").FC<import("antd/lib/date-picker/interface").DatePickerProps> & {
                RangePicker?: import("react").FC<import("antd/lib/date-picker/interface").RangePickerProps>;
            };
            TimePicker: import("react").FC<import("antd/lib/time-picker").TimePickerProps> & {
                RangePicker?: import("react").FC<{}>;
            };
            Select: import("react").FC<any>;
            Radio: import("react").FC<import("antd/lib/radio").RadioProps> & {
                Group?: import("react").FC<import("antd/lib/radio").RadioGroupProps>;
                __ANT_RADIO?: boolean;
            };
            Slider: typeof Slider;
            Switch: import("react").FC<any>;
            Space: import("react").FC<any>;
            ArrayItems: import("react").FC<import("react").HTMLAttributes<HTMLDivElement>> & import("@platform/formx-antd").ArrayBaseMixins & {
                Item?: import("react").FC<import("react").HTMLAttributes<HTMLDivElement> & {
                    type?: "card" | "divide";
                }>;
            };
            ArrayTable: import("react").FC<import("antd/lib/table").TableProps<any>> & import("@platform/formx-antd").ArrayBaseMixins & {
                Column?: import("react").FC<import("antd/lib/table").ColumnProps<any>>;
            };
            FormCollapse: import("react").FC<import("@platform/formx-antd").IFormCollapseProps> & {
                CollapsePanel?: import("react").FC<import("antd/lib/collapse").CollapsePanelProps>;
                createFormCollapse?: (defaultActiveKeys?: string | number | (string | number)[]) => import("@platform/formx-antd").IFormCollapse;
            };
            FormGrid: import("react").FC<import("@platform/formx-antd").IFormGridProps> & {
                GridColumn: import("react").FC<import("@platform/formx-antd").IGridColumnProps>;
                useFormGrid: () => import("@formily/grid").Grid<HTMLElement>;
                createFormGrid: (props: import("@platform/formx-antd").IFormGridProps) => import("@formily/grid").Grid<HTMLElement>;
                useGridSpan: (gridSpan: number) => number;
                useGridColumn: (gridSpan: number) => number;
            };
            FormLayout: import("react").FC<import("@platform/formx-antd").IFormLayoutProps> & {
                useFormLayout: () => import("@platform/formx-antd").IFormLayoutContext;
                useFormDeepLayout: () => import("@platform/formx-antd").IFormLayoutContext;
                useFormShallowLayout: () => import("@platform/formx-antd").IFormLayoutContext;
            };
            FormTab: import("react").FC<import("@platform/formx-antd").IFormTabProps> & {
                TabPane?: import("react").FC<import("@platform/formx-antd").IFormTabPaneProps>;
                createFormTab?: (defaultActiveKey?: string) => import("@platform/formx-antd").IFormTab;
            };
        }, Component_6, Decorator_6>): JSX.Element;
        displayName: string;
    };
    DateTime: {
        <Decorator_7 extends "Space" | "FormItem" | "CollapseItem" | "Input" | "ValueInput" | "SizeInput" | "ColorInput" | "ImageInput" | "MonacoInput" | "PositionInput" | "CornerInput" | "BackgroundImageInput" | "BackgroundStyleSetter" | "BoxStyleSetter" | "BorderStyleSetter" | "BorderRadiusStyleSetter" | "DisplayStyleSetter" | "BoxShadowStyleSetter" | "FlexStyleSetter" | "FontStyleSetter" | "DrawerSetter" | "NumberPicker" | "DatePicker" | "TimePicker" | "Select" | "Radio" | "Slider" | "Switch" | "ArrayItems" | "ArrayTable" | "FormCollapse" | "FormGrid" | "FormLayout" | "FormTab" | "FormItem.BaseItem" | "Input.TextArea" | "MonacoInput.loader" | "DatePicker.RangePicker" | "TimePicker.RangePicker" | "Radio.Group" | "Radio.__ANT_RADIO" | "Slider.contextType" | "Slider.prototype" | "ArrayItems.Remove" | "ArrayItems.Item" | "ArrayItems.Addition" | "ArrayItems.MoveUp" | "ArrayItems.MoveDown" | "ArrayItems.Index" | "ArrayItems.useArray" | "ArrayItems.useIndex" | "ArrayItems.useRecord" | "ArrayTable.Remove" | "ArrayTable.Addition" | "ArrayTable.MoveUp" | "ArrayTable.MoveDown" | "ArrayTable.Index" | "ArrayTable.useArray" | "ArrayTable.useIndex" | "ArrayTable.useRecord" | "ArrayTable.Column" | "FormCollapse.CollapsePanel" | "FormCollapse.createFormCollapse" | "FormGrid.GridColumn" | "FormGrid.useFormGrid" | "FormGrid.createFormGrid" | "FormGrid.useGridSpan" | "FormGrid.useGridColumn" | "FormLayout.useFormLayout" | "FormLayout.useFormDeepLayout" | "FormLayout.useFormShallowLayout" | "FormTab.TabPane" | "FormTab.createFormTab", Component_7 extends "Space" | "FormItem" | "CollapseItem" | "Input" | "ValueInput" | "SizeInput" | "ColorInput" | "ImageInput" | "MonacoInput" | "PositionInput" | "CornerInput" | "BackgroundImageInput" | "BackgroundStyleSetter" | "BoxStyleSetter" | "BorderStyleSetter" | "BorderRadiusStyleSetter" | "DisplayStyleSetter" | "BoxShadowStyleSetter" | "FlexStyleSetter" | "FontStyleSetter" | "DrawerSetter" | "NumberPicker" | "DatePicker" | "TimePicker" | "Select" | "Radio" | "Slider" | "Switch" | "ArrayItems" | "ArrayTable" | "FormCollapse" | "FormGrid" | "FormLayout" | "FormTab" | "FormItem.BaseItem" | "Input.TextArea" | "MonacoInput.loader" | "DatePicker.RangePicker" | "TimePicker.RangePicker" | "Radio.Group" | "Radio.__ANT_RADIO" | "Slider.contextType" | "Slider.prototype" | "ArrayItems.Remove" | "ArrayItems.Item" | "ArrayItems.Addition" | "ArrayItems.MoveUp" | "ArrayItems.MoveDown" | "ArrayItems.Index" | "ArrayItems.useArray" | "ArrayItems.useIndex" | "ArrayItems.useRecord" | "ArrayTable.Remove" | "ArrayTable.Addition" | "ArrayTable.MoveUp" | "ArrayTable.MoveDown" | "ArrayTable.Index" | "ArrayTable.useArray" | "ArrayTable.useIndex" | "ArrayTable.useRecord" | "ArrayTable.Column" | "FormCollapse.CollapsePanel" | "FormCollapse.createFormCollapse" | "FormGrid.GridColumn" | "FormGrid.useFormGrid" | "FormGrid.createFormGrid" | "FormGrid.useGridSpan" | "FormGrid.useGridColumn" | "FormLayout.useFormLayout" | "FormLayout.useFormDeepLayout" | "FormLayout.useFormShallowLayout" | "FormTab.TabPane" | "FormTab.createFormTab">(props: import("@formily/react").ISchemaTypeFieldProps<{
            FormItem: import("react").FC<import("@platform/formx-antd").IFormItemProps> & {
                BaseItem?: import("react").FC<import("@platform/formx-antd").IFormItemProps>;
            };
            CollapseItem: import("react").FC<import("./components").ICollapseItemProps>;
            Input: import("react").FC<import("antd/lib/input").InputProps> & {
                TextArea?: import("react").FC<import("antd/lib/input").TextAreaProps>;
            };
            ValueInput: import("react").FC<import("./components").IInput>;
            SizeInput: import("react").FC<import("./components").IInput>;
            ColorInput: import("react").FC<import("./components").IColorInputProps>;
            ImageInput: import("react").FC<import("./components").ImageInputProps>;
            MonacoInput: import("react").FC<import("./components").MonacoInputProps> & {
                loader?: typeof import("@monaco-editor/react").loader;
            };
            PositionInput: import("react").FC<import("./components").IPositionInputProps>;
            CornerInput: import("react").FC<import("./components").ICornerInputProps>;
            BackgroundImageInput: import("react").FC<import("./components").ImageInputProps>;
            BackgroundStyleSetter: import("react").FC<import("./components").IBackgroundStyleSetterProps>;
            BoxStyleSetter: import("react").FC<import("./components").IMarginStyleSetterProps>;
            BorderStyleSetter: import("react").FC<import("./components").IBorderStyleSetterProps>;
            BorderRadiusStyleSetter: import("react").FC<import("./components").IBorderRadiusStyleSetterProps>;
            DisplayStyleSetter: import("react").FC<import("./components").IDisplayStyleSetterProps>;
            BoxShadowStyleSetter: import("react").FC<import("./components").IBoxShadowStyleSetterProps>;
            FlexStyleSetter: import("react").FC<import("./components").IFlexStyleSetterProps>;
            FontStyleSetter: import("react").FC<import("./components").IFontStyleSetterProps>;
            DrawerSetter: import("react").FC<import("./components").IDrawerSetterProps>;
            NumberPicker: import("react").FC<any>;
            DatePicker: import("react").FC<import("antd/lib/date-picker/interface").DatePickerProps> & {
                RangePicker?: import("react").FC<import("antd/lib/date-picker/interface").RangePickerProps>;
            };
            TimePicker: import("react").FC<import("antd/lib/time-picker").TimePickerProps> & {
                RangePicker?: import("react").FC<{}>;
            };
            Select: import("react").FC<any>;
            Radio: import("react").FC<import("antd/lib/radio").RadioProps> & {
                Group?: import("react").FC<import("antd/lib/radio").RadioGroupProps>;
                __ANT_RADIO?: boolean;
            };
            Slider: typeof Slider;
            Switch: import("react").FC<any>;
            Space: import("react").FC<any>;
            ArrayItems: import("react").FC<import("react").HTMLAttributes<HTMLDivElement>> & import("@platform/formx-antd").ArrayBaseMixins & {
                Item?: import("react").FC<import("react").HTMLAttributes<HTMLDivElement> & {
                    type?: "card" | "divide";
                }>;
            };
            ArrayTable: import("react").FC<import("antd/lib/table").TableProps<any>> & import("@platform/formx-antd").ArrayBaseMixins & {
                Column?: import("react").FC<import("antd/lib/table").ColumnProps<any>>;
            };
            FormCollapse: import("react").FC<import("@platform/formx-antd").IFormCollapseProps> & {
                CollapsePanel?: import("react").FC<import("antd/lib/collapse").CollapsePanelProps>;
                createFormCollapse?: (defaultActiveKeys?: string | number | (string | number)[]) => import("@platform/formx-antd").IFormCollapse;
            };
            FormGrid: import("react").FC<import("@platform/formx-antd").IFormGridProps> & {
                GridColumn: import("react").FC<import("@platform/formx-antd").IGridColumnProps>;
                useFormGrid: () => import("@formily/grid").Grid<HTMLElement>;
                createFormGrid: (props: import("@platform/formx-antd").IFormGridProps) => import("@formily/grid").Grid<HTMLElement>;
                useGridSpan: (gridSpan: number) => number;
                useGridColumn: (gridSpan: number) => number;
            };
            FormLayout: import("react").FC<import("@platform/formx-antd").IFormLayoutProps> & {
                useFormLayout: () => import("@platform/formx-antd").IFormLayoutContext;
                useFormDeepLayout: () => import("@platform/formx-antd").IFormLayoutContext;
                useFormShallowLayout: () => import("@platform/formx-antd").IFormLayoutContext;
            };
            FormTab: import("react").FC<import("@platform/formx-antd").IFormTabProps> & {
                TabPane?: import("react").FC<import("@platform/formx-antd").IFormTabPaneProps>;
                createFormTab?: (defaultActiveKey?: string) => import("@platform/formx-antd").IFormTab;
            };
        }, Component_7, Decorator_7>): JSX.Element;
        displayName: string;
    };
    Void: {
        <Decorator_8 extends "Space" | "FormItem" | "CollapseItem" | "Input" | "ValueInput" | "SizeInput" | "ColorInput" | "ImageInput" | "MonacoInput" | "PositionInput" | "CornerInput" | "BackgroundImageInput" | "BackgroundStyleSetter" | "BoxStyleSetter" | "BorderStyleSetter" | "BorderRadiusStyleSetter" | "DisplayStyleSetter" | "BoxShadowStyleSetter" | "FlexStyleSetter" | "FontStyleSetter" | "DrawerSetter" | "NumberPicker" | "DatePicker" | "TimePicker" | "Select" | "Radio" | "Slider" | "Switch" | "ArrayItems" | "ArrayTable" | "FormCollapse" | "FormGrid" | "FormLayout" | "FormTab" | "FormItem.BaseItem" | "Input.TextArea" | "MonacoInput.loader" | "DatePicker.RangePicker" | "TimePicker.RangePicker" | "Radio.Group" | "Radio.__ANT_RADIO" | "Slider.contextType" | "Slider.prototype" | "ArrayItems.Remove" | "ArrayItems.Item" | "ArrayItems.Addition" | "ArrayItems.MoveUp" | "ArrayItems.MoveDown" | "ArrayItems.Index" | "ArrayItems.useArray" | "ArrayItems.useIndex" | "ArrayItems.useRecord" | "ArrayTable.Remove" | "ArrayTable.Addition" | "ArrayTable.MoveUp" | "ArrayTable.MoveDown" | "ArrayTable.Index" | "ArrayTable.useArray" | "ArrayTable.useIndex" | "ArrayTable.useRecord" | "ArrayTable.Column" | "FormCollapse.CollapsePanel" | "FormCollapse.createFormCollapse" | "FormGrid.GridColumn" | "FormGrid.useFormGrid" | "FormGrid.createFormGrid" | "FormGrid.useGridSpan" | "FormGrid.useGridColumn" | "FormLayout.useFormLayout" | "FormLayout.useFormDeepLayout" | "FormLayout.useFormShallowLayout" | "FormTab.TabPane" | "FormTab.createFormTab", Component_8 extends "Space" | "FormItem" | "CollapseItem" | "Input" | "ValueInput" | "SizeInput" | "ColorInput" | "ImageInput" | "MonacoInput" | "PositionInput" | "CornerInput" | "BackgroundImageInput" | "BackgroundStyleSetter" | "BoxStyleSetter" | "BorderStyleSetter" | "BorderRadiusStyleSetter" | "DisplayStyleSetter" | "BoxShadowStyleSetter" | "FlexStyleSetter" | "FontStyleSetter" | "DrawerSetter" | "NumberPicker" | "DatePicker" | "TimePicker" | "Select" | "Radio" | "Slider" | "Switch" | "ArrayItems" | "ArrayTable" | "FormCollapse" | "FormGrid" | "FormLayout" | "FormTab" | "FormItem.BaseItem" | "Input.TextArea" | "MonacoInput.loader" | "DatePicker.RangePicker" | "TimePicker.RangePicker" | "Radio.Group" | "Radio.__ANT_RADIO" | "Slider.contextType" | "Slider.prototype" | "ArrayItems.Remove" | "ArrayItems.Item" | "ArrayItems.Addition" | "ArrayItems.MoveUp" | "ArrayItems.MoveDown" | "ArrayItems.Index" | "ArrayItems.useArray" | "ArrayItems.useIndex" | "ArrayItems.useRecord" | "ArrayTable.Remove" | "ArrayTable.Addition" | "ArrayTable.MoveUp" | "ArrayTable.MoveDown" | "ArrayTable.Index" | "ArrayTable.useArray" | "ArrayTable.useIndex" | "ArrayTable.useRecord" | "ArrayTable.Column" | "FormCollapse.CollapsePanel" | "FormCollapse.createFormCollapse" | "FormGrid.GridColumn" | "FormGrid.useFormGrid" | "FormGrid.createFormGrid" | "FormGrid.useGridSpan" | "FormGrid.useGridColumn" | "FormLayout.useFormLayout" | "FormLayout.useFormDeepLayout" | "FormLayout.useFormShallowLayout" | "FormTab.TabPane" | "FormTab.createFormTab">(props: import("@formily/react").ISchemaTypeFieldProps<{
            FormItem: import("react").FC<import("@platform/formx-antd").IFormItemProps> & {
                BaseItem?: import("react").FC<import("@platform/formx-antd").IFormItemProps>;
            };
            CollapseItem: import("react").FC<import("./components").ICollapseItemProps>;
            Input: import("react").FC<import("antd/lib/input").InputProps> & {
                TextArea?: import("react").FC<import("antd/lib/input").TextAreaProps>;
            };
            ValueInput: import("react").FC<import("./components").IInput>;
            SizeInput: import("react").FC<import("./components").IInput>;
            ColorInput: import("react").FC<import("./components").IColorInputProps>;
            ImageInput: import("react").FC<import("./components").ImageInputProps>;
            MonacoInput: import("react").FC<import("./components").MonacoInputProps> & {
                loader?: typeof import("@monaco-editor/react").loader;
            };
            PositionInput: import("react").FC<import("./components").IPositionInputProps>;
            CornerInput: import("react").FC<import("./components").ICornerInputProps>;
            BackgroundImageInput: import("react").FC<import("./components").ImageInputProps>;
            BackgroundStyleSetter: import("react").FC<import("./components").IBackgroundStyleSetterProps>;
            BoxStyleSetter: import("react").FC<import("./components").IMarginStyleSetterProps>;
            BorderStyleSetter: import("react").FC<import("./components").IBorderStyleSetterProps>;
            BorderRadiusStyleSetter: import("react").FC<import("./components").IBorderRadiusStyleSetterProps>;
            DisplayStyleSetter: import("react").FC<import("./components").IDisplayStyleSetterProps>;
            BoxShadowStyleSetter: import("react").FC<import("./components").IBoxShadowStyleSetterProps>;
            FlexStyleSetter: import("react").FC<import("./components").IFlexStyleSetterProps>;
            FontStyleSetter: import("react").FC<import("./components").IFontStyleSetterProps>;
            DrawerSetter: import("react").FC<import("./components").IDrawerSetterProps>;
            NumberPicker: import("react").FC<any>;
            DatePicker: import("react").FC<import("antd/lib/date-picker/interface").DatePickerProps> & {
                RangePicker?: import("react").FC<import("antd/lib/date-picker/interface").RangePickerProps>;
            };
            TimePicker: import("react").FC<import("antd/lib/time-picker").TimePickerProps> & {
                RangePicker?: import("react").FC<{}>;
            };
            Select: import("react").FC<any>;
            Radio: import("react").FC<import("antd/lib/radio").RadioProps> & {
                Group?: import("react").FC<import("antd/lib/radio").RadioGroupProps>;
                __ANT_RADIO?: boolean;
            };
            Slider: typeof Slider;
            Switch: import("react").FC<any>;
            Space: import("react").FC<any>;
            ArrayItems: import("react").FC<import("react").HTMLAttributes<HTMLDivElement>> & import("@platform/formx-antd").ArrayBaseMixins & {
                Item?: import("react").FC<import("react").HTMLAttributes<HTMLDivElement> & {
                    type?: "card" | "divide";
                }>;
            };
            ArrayTable: import("react").FC<import("antd/lib/table").TableProps<any>> & import("@platform/formx-antd").ArrayBaseMixins & {
                Column?: import("react").FC<import("antd/lib/table").ColumnProps<any>>;
            };
            FormCollapse: import("react").FC<import("@platform/formx-antd").IFormCollapseProps> & {
                CollapsePanel?: import("react").FC<import("antd/lib/collapse").CollapsePanelProps>;
                createFormCollapse?: (defaultActiveKeys?: string | number | (string | number)[]) => import("@platform/formx-antd").IFormCollapse;
            };
            FormGrid: import("react").FC<import("@platform/formx-antd").IFormGridProps> & {
                GridColumn: import("react").FC<import("@platform/formx-antd").IGridColumnProps>;
                useFormGrid: () => import("@formily/grid").Grid<HTMLElement>;
                createFormGrid: (props: import("@platform/formx-antd").IFormGridProps) => import("@formily/grid").Grid<HTMLElement>;
                useGridSpan: (gridSpan: number) => number;
                useGridColumn: (gridSpan: number) => number;
            };
            FormLayout: import("react").FC<import("@platform/formx-antd").IFormLayoutProps> & {
                useFormLayout: () => import("@platform/formx-antd").IFormLayoutContext;
                useFormDeepLayout: () => import("@platform/formx-antd").IFormLayoutContext;
                useFormShallowLayout: () => import("@platform/formx-antd").IFormLayoutContext;
            };
            FormTab: import("react").FC<import("@platform/formx-antd").IFormTabProps> & {
                TabPane?: import("react").FC<import("@platform/formx-antd").IFormTabPaneProps>;
                createFormTab?: (defaultActiveKey?: string) => import("@platform/formx-antd").IFormTab;
            };
        }, Component_8, Decorator_8>): JSX.Element;
        displayName: string;
    };
    Number: {
        <Decorator_9 extends "Space" | "FormItem" | "CollapseItem" | "Input" | "ValueInput" | "SizeInput" | "ColorInput" | "ImageInput" | "MonacoInput" | "PositionInput" | "CornerInput" | "BackgroundImageInput" | "BackgroundStyleSetter" | "BoxStyleSetter" | "BorderStyleSetter" | "BorderRadiusStyleSetter" | "DisplayStyleSetter" | "BoxShadowStyleSetter" | "FlexStyleSetter" | "FontStyleSetter" | "DrawerSetter" | "NumberPicker" | "DatePicker" | "TimePicker" | "Select" | "Radio" | "Slider" | "Switch" | "ArrayItems" | "ArrayTable" | "FormCollapse" | "FormGrid" | "FormLayout" | "FormTab" | "FormItem.BaseItem" | "Input.TextArea" | "MonacoInput.loader" | "DatePicker.RangePicker" | "TimePicker.RangePicker" | "Radio.Group" | "Radio.__ANT_RADIO" | "Slider.contextType" | "Slider.prototype" | "ArrayItems.Remove" | "ArrayItems.Item" | "ArrayItems.Addition" | "ArrayItems.MoveUp" | "ArrayItems.MoveDown" | "ArrayItems.Index" | "ArrayItems.useArray" | "ArrayItems.useIndex" | "ArrayItems.useRecord" | "ArrayTable.Remove" | "ArrayTable.Addition" | "ArrayTable.MoveUp" | "ArrayTable.MoveDown" | "ArrayTable.Index" | "ArrayTable.useArray" | "ArrayTable.useIndex" | "ArrayTable.useRecord" | "ArrayTable.Column" | "FormCollapse.CollapsePanel" | "FormCollapse.createFormCollapse" | "FormGrid.GridColumn" | "FormGrid.useFormGrid" | "FormGrid.createFormGrid" | "FormGrid.useGridSpan" | "FormGrid.useGridColumn" | "FormLayout.useFormLayout" | "FormLayout.useFormDeepLayout" | "FormLayout.useFormShallowLayout" | "FormTab.TabPane" | "FormTab.createFormTab", Component_9 extends "Space" | "FormItem" | "CollapseItem" | "Input" | "ValueInput" | "SizeInput" | "ColorInput" | "ImageInput" | "MonacoInput" | "PositionInput" | "CornerInput" | "BackgroundImageInput" | "BackgroundStyleSetter" | "BoxStyleSetter" | "BorderStyleSetter" | "BorderRadiusStyleSetter" | "DisplayStyleSetter" | "BoxShadowStyleSetter" | "FlexStyleSetter" | "FontStyleSetter" | "DrawerSetter" | "NumberPicker" | "DatePicker" | "TimePicker" | "Select" | "Radio" | "Slider" | "Switch" | "ArrayItems" | "ArrayTable" | "FormCollapse" | "FormGrid" | "FormLayout" | "FormTab" | "FormItem.BaseItem" | "Input.TextArea" | "MonacoInput.loader" | "DatePicker.RangePicker" | "TimePicker.RangePicker" | "Radio.Group" | "Radio.__ANT_RADIO" | "Slider.contextType" | "Slider.prototype" | "ArrayItems.Remove" | "ArrayItems.Item" | "ArrayItems.Addition" | "ArrayItems.MoveUp" | "ArrayItems.MoveDown" | "ArrayItems.Index" | "ArrayItems.useArray" | "ArrayItems.useIndex" | "ArrayItems.useRecord" | "ArrayTable.Remove" | "ArrayTable.Addition" | "ArrayTable.MoveUp" | "ArrayTable.MoveDown" | "ArrayTable.Index" | "ArrayTable.useArray" | "ArrayTable.useIndex" | "ArrayTable.useRecord" | "ArrayTable.Column" | "FormCollapse.CollapsePanel" | "FormCollapse.createFormCollapse" | "FormGrid.GridColumn" | "FormGrid.useFormGrid" | "FormGrid.createFormGrid" | "FormGrid.useGridSpan" | "FormGrid.useGridColumn" | "FormLayout.useFormLayout" | "FormLayout.useFormDeepLayout" | "FormLayout.useFormShallowLayout" | "FormTab.TabPane" | "FormTab.createFormTab">(props: import("@formily/react").ISchemaTypeFieldProps<{
            FormItem: import("react").FC<import("@platform/formx-antd").IFormItemProps> & {
                BaseItem?: import("react").FC<import("@platform/formx-antd").IFormItemProps>;
            };
            CollapseItem: import("react").FC<import("./components").ICollapseItemProps>;
            Input: import("react").FC<import("antd/lib/input").InputProps> & {
                TextArea?: import("react").FC<import("antd/lib/input").TextAreaProps>;
            };
            ValueInput: import("react").FC<import("./components").IInput>;
            SizeInput: import("react").FC<import("./components").IInput>;
            ColorInput: import("react").FC<import("./components").IColorInputProps>;
            ImageInput: import("react").FC<import("./components").ImageInputProps>;
            MonacoInput: import("react").FC<import("./components").MonacoInputProps> & {
                loader?: typeof import("@monaco-editor/react").loader;
            };
            PositionInput: import("react").FC<import("./components").IPositionInputProps>;
            CornerInput: import("react").FC<import("./components").ICornerInputProps>;
            BackgroundImageInput: import("react").FC<import("./components").ImageInputProps>;
            BackgroundStyleSetter: import("react").FC<import("./components").IBackgroundStyleSetterProps>;
            BoxStyleSetter: import("react").FC<import("./components").IMarginStyleSetterProps>;
            BorderStyleSetter: import("react").FC<import("./components").IBorderStyleSetterProps>;
            BorderRadiusStyleSetter: import("react").FC<import("./components").IBorderRadiusStyleSetterProps>;
            DisplayStyleSetter: import("react").FC<import("./components").IDisplayStyleSetterProps>;
            BoxShadowStyleSetter: import("react").FC<import("./components").IBoxShadowStyleSetterProps>;
            FlexStyleSetter: import("react").FC<import("./components").IFlexStyleSetterProps>;
            FontStyleSetter: import("react").FC<import("./components").IFontStyleSetterProps>;
            DrawerSetter: import("react").FC<import("./components").IDrawerSetterProps>;
            NumberPicker: import("react").FC<any>;
            DatePicker: import("react").FC<import("antd/lib/date-picker/interface").DatePickerProps> & {
                RangePicker?: import("react").FC<import("antd/lib/date-picker/interface").RangePickerProps>;
            };
            TimePicker: import("react").FC<import("antd/lib/time-picker").TimePickerProps> & {
                RangePicker?: import("react").FC<{}>;
            };
            Select: import("react").FC<any>;
            Radio: import("react").FC<import("antd/lib/radio").RadioProps> & {
                Group?: import("react").FC<import("antd/lib/radio").RadioGroupProps>;
                __ANT_RADIO?: boolean;
            };
            Slider: typeof Slider;
            Switch: import("react").FC<any>;
            Space: import("react").FC<any>;
            ArrayItems: import("react").FC<import("react").HTMLAttributes<HTMLDivElement>> & import("@platform/formx-antd").ArrayBaseMixins & {
                Item?: import("react").FC<import("react").HTMLAttributes<HTMLDivElement> & {
                    type?: "card" | "divide";
                }>;
            };
            ArrayTable: import("react").FC<import("antd/lib/table").TableProps<any>> & import("@platform/formx-antd").ArrayBaseMixins & {
                Column?: import("react").FC<import("antd/lib/table").ColumnProps<any>>;
            };
            FormCollapse: import("react").FC<import("@platform/formx-antd").IFormCollapseProps> & {
                CollapsePanel?: import("react").FC<import("antd/lib/collapse").CollapsePanelProps>;
                createFormCollapse?: (defaultActiveKeys?: string | number | (string | number)[]) => import("@platform/formx-antd").IFormCollapse;
            };
            FormGrid: import("react").FC<import("@platform/formx-antd").IFormGridProps> & {
                GridColumn: import("react").FC<import("@platform/formx-antd").IGridColumnProps>;
                useFormGrid: () => import("@formily/grid").Grid<HTMLElement>;
                createFormGrid: (props: import("@platform/formx-antd").IFormGridProps) => import("@formily/grid").Grid<HTMLElement>;
                useGridSpan: (gridSpan: number) => number;
                useGridColumn: (gridSpan: number) => number;
            };
            FormLayout: import("react").FC<import("@platform/formx-antd").IFormLayoutProps> & {
                useFormLayout: () => import("@platform/formx-antd").IFormLayoutContext;
                useFormDeepLayout: () => import("@platform/formx-antd").IFormLayoutContext;
                useFormShallowLayout: () => import("@platform/formx-antd").IFormLayoutContext;
            };
            FormTab: import("react").FC<import("@platform/formx-antd").IFormTabProps> & {
                TabPane?: import("react").FC<import("@platform/formx-antd").IFormTabPaneProps>;
                createFormTab?: (defaultActiveKey?: string) => import("@platform/formx-antd").IFormTab;
            };
        }, Component_9, Decorator_9>): JSX.Element;
        displayName: string;
    };
};
//# sourceMappingURL=SchemaField.d.ts.map