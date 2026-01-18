// NativeOnlyAnimatedView.web.tsx
import React from 'react';

/**
 * Web Version: Just a pass-through component. 
 * Next.js will use this file instead of the other one.
 */
export function NativeOnlyAnimatedView({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}