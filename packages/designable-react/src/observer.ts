import { observer as _observer } from '@formily/reactive-react';
import React from 'react';

// React 19 compatible observer wrapper.
// The @formily/reactive-react observer wraps P with ReactPropsWithChildren
// in its type signature, causing Omit<> errors with React 19's React.FC
// (which no longer has implicit children).
// This wrapper uses plain function types to avoid the conflict.
export function observer<P extends object>(
  component: (props: P) => React.ReactElement | null,
  options?: Record<string, any>
): React.MemoExoticComponent<(props: P) => React.ReactElement | null> {
  return _observer(component as any, options) as any;
}
