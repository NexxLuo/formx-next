import React from 'react';
import { UploadProps as AntdUploadProps, DraggerProps as AntdDraggerProps } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
export declare type UploadProps = Omit<AntdUploadProps, 'onChange'> & {
    textContent?: React.ReactNode;
    onChange?: (fileList: UploadFile[]) => void;
    serviceErrorMessage?: string;
};
export declare type DraggerProps = Omit<AntdDraggerProps, 'onChange'> & {
    textContent?: React.ReactNode;
    onChange?: (fileList: UploadFile[]) => void;
    serviceErrorMessage?: string;
};
declare type ComposedUpload = React.FC<UploadProps> & {
    Dragger?: React.FC<DraggerProps>;
};
export declare const Upload: ComposedUpload;
export default Upload;
