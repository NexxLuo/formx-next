// Module augmentation: patch @formily/reactive-react observer for React 19 compatibility
// The observer HOC internally uses ReactFC = React.FC<ReactPropsWithChildren<P>>,
// which causes Omit<{ children?: ReactNode; }, never> errors with React 19 types
// because React.FC no longer includes implicit children.

declare module '@formily/reactive-react' {
  import React from 'react';
  
  // Override observer's return type to use React.FC without PropsWithChildren wrapping.
  // This matches React 19's React.FC behavior.
  export function observer<P extends object>(
    component: React.FC<P>,
    options?: any
  ): React.MemoExoticComponent<React.FC<P>>;
}
