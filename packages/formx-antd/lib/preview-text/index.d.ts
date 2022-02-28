import React from "react";
import { InputProps } from "antd/lib/input";
import { SelectProps } from "antd/lib/select";
import { TreeSelectProps } from "antd/lib/tree-select";
import { CascaderProps } from "antd/lib/cascader";
import { DatePickerProps, RangePickerProps as DateRangePickerProps } from "antd/lib/date-picker/interface";
import { TimePickerProps } from "antd/lib/time-picker";
interface TimeRangePickerProps extends TimePickerProps {
}
export declare const PreviewText: {
    (props: React.PropsWithChildren<any>): JSX.Element;
    Input: React.FC<InputProps>;
    Select: React.FC<SelectProps<any> & {
        options: any;
    }>;
    TreeSelect: React.FC<TreeSelectProps<any> & {
        options: any;
    }>;
    Cascader: React.FC<CascaderProps>;
    DatePicker: React.FC<DatePickerProps>;
    DateRangePicker: React.FC<DateRangePickerProps>;
    TimePicker: React.FC<TimePickerProps>;
    TimeRangePicker: React.FC<TimeRangePickerProps>;
    Placeholder: React.Provider<React.ReactNode>;
    usePlaceholder: (value?: any) => any;
};
export default PreviewText;
