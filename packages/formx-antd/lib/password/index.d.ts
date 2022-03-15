import React from 'react';
import { PasswordProps } from 'antd/lib/input';
export interface IPasswordProps extends PasswordProps {
    checkStrength: boolean;
}
export declare const Password: React.FC<any>;
export default Password;
