import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import Colors from '@/constants/Colors';

interface DividerProps {
  style?: StyleProp<ViewStyle>;
  direction?: 'horizontal' | 'vertical';
  thickness?: number;
  color?: string;
  length?: string | number;
  margin?: number;
}

export default function Divider({
  style,
  direction = 'horizontal',
  thickness = 1,
  color = Colors.divider,
  length,
  margin = 0,
}: DividerProps) {
  const dividerStyle: StyleProp<ViewStyle> = {
    backgroundColor: color,
    ...(direction === 'horizontal'
      ? {
          height: thickness,
          width: length || '100%',
          marginVertical: margin,
        }
      : {
          width: thickness,
          height: length || '100%',
          marginHorizontal: margin,
        }),
  };

  return <View style={[dividerStyle, style]} />;
}