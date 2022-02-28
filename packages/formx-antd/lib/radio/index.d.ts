/// <reference types="react" />
import { RadioProps, RadioGroupProps } from 'antd/lib/radio';
declare type ComposedRadio = React.FC<RadioProps> & {
    Group?: React.FC<RadioGroupProps>;
    __ANT_RADIO?: boolean;
};
export declare const Radio: ComposedRadio;
export default Radio;
