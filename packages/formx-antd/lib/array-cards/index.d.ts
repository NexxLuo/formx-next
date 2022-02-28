import React from 'react';
import { CardProps } from 'antd/lib/card';
import { ArrayBaseMixins } from '../array-base';
declare type ComposedArrayCards = React.FC<CardProps> & ArrayBaseMixins;
export declare const ArrayCards: ComposedArrayCards;
export default ArrayCards;
