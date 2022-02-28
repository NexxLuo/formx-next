import React from 'react';
declare type ReactRenderPropsChildren<T = any> = React.ReactNode | ((props: T) => React.ReactElement);
interface IPasswordStrengthProps {
    value?: React.ReactText;
    children?: ReactRenderPropsChildren<number>;
}
export declare const PasswordStrength: React.FC<IPasswordStrengthProps>;
export {};
