import React from 'react';
import { TableProps, ColumnProps } from 'antd/lib/table';
import { ArrayBaseMixins } from '../array-base';
declare type ComposedArrayTable = React.FC<TableProps<any>> & ArrayBaseMixins & {
    Column?: React.FC<ColumnProps<any>>;
};
export declare const ArrayTable: ComposedArrayTable;
export default ArrayTable;
