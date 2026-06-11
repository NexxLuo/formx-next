import React from 'react';
import './styles.less';
export declare const FoldItem: React.FC<React.PropsWithChildren<Record<string, any>>> & {
    Base?: React.FC<{
        children?: React.ReactNode;
    }>;
    Extra?: React.FC<{
        children?: React.ReactNode;
    }>;
};
