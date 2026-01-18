// NativeOnlyAnimatedView.tsx
import React from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export function NativeOnlyAnimatedView(props: any) {
  return (
    <Animated.View 
      {...props} 
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(150)} 
    />
  );
}