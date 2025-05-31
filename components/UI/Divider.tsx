import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle, DimensionValue } from 'react-native';
import Colors from '@/constants/Colors';

interface DividerProps {
  style?: StyleProp<ViewStyle>;
  direction?: 'horizontal' | 'vertical';
  thickness?: number;
  color?: string;
  length?: DimensionValue;
  margin?: number;
}

export default function Divider({
  style,
  direction = 'horizontal',
  thickness = 1,
  color = Colors.divider,
  length = '100%',
  margin = 0,
}: DividerProps) {
  const dividerStyle = {
    backgroundColor: color,
    ...(direction === 'horizontal'
      ? {
          height: thickness,
          width: length,
          marginVertical: margin,
        }
      : {
          width: thickness,
          height: length,
          marginHorizontal: margin,
        }),
  } as const;

  return <View style={[dividerStyle, style]} />;
}