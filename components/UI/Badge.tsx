import React from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
}

export default function Badge({
  text,
  variant = 'primary',
  style,
  textStyle,
  icon
}: BadgeProps) {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return Colors.primary[100];
      case 'secondary':
        return Colors.secondary[100];
      case 'success':
        return Colors.success[100];
      case 'warning':
        return Colors.warning[100];
      case 'error':
        return Colors.error[100];
      case 'info':
        return Colors.neutral[100];
      default:
        return Colors.primary[100];
    }
  };
  
  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return Colors.primary[700];
      case 'secondary':
        return Colors.secondary[700];
      case 'success':
        return Colors.success[700];
      case 'warning':
        return Colors.warning[700];
      case 'error':
        return Colors.error[700];
      case 'info':
        return Colors.neutral[700];
      default:
        return Colors.primary[700];
    }
  };
  
  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: getBackgroundColor() },
        style
      ]}
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text
        style={[
          styles.text,
          { color: getTextColor() },
          textStyle
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.sm,
  },
  icon: {
    marginRight: Layout.spacing.xs,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
});