/// <reference types="react" />
import { TimePickerProps as AntdTimePickerProps } from 'antd/lib/time-picker';
declare type TimeRangePickerProps = {};
declare type ComposedTimePicker = React.FC<AntdTimePickerProps> & {
    RangePicker?: React.FC<TimeRangePickerProps>;
};
export declare const TimePicker: ComposedTimePicker;
export default TimePicker;
