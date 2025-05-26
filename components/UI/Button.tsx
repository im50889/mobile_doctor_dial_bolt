import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
  View
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  fullWidth?: boolean;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
  fullWidth = false,
}: ButtonProps) {
  const getButtonStyles = () => {
    const baseStyles: StyleProp<ViewStyle>[] = [styles.button, styles[`${size}Button`]];
    
    if (fullWidth) {
      baseStyles.push(styles.fullWidth);
    }
    
    if (disabled) {
      baseStyles.push(styles.disabled);
    }
    
    if (variant === 'primary') {
      // No additional styles needed as LinearGradient will be used
    } else if (variant === 'secondary') {
      baseStyles.push(styles.secondaryButton);
    } else if (variant === 'outline') {
      baseStyles.push(styles.outlineButton);
    } else if (variant === 'text') {
      baseStyles.push(styles.textButton);
    }
    
    return baseStyles;
  };
  
  const getTextStyles = () => {
    const baseStyles: StyleProp<TextStyle>[] = [styles.text, styles[`${size}Text`]];
    
    if (variant === 'primary') {
      baseStyles.push(styles.primaryText);
    } else if (variant === 'secondary') {
      baseStyles.push(styles.secondaryText);
    } else if (variant === 'outline') {
      baseStyles.push(styles.outlineText);
    } else if (variant === 'text') {
      baseStyles.push(styles.textButtonText);
    }
    
    if (disabled) {
      baseStyles.push(styles.disabledText);
    }
    
    return baseStyles;
  };
  
  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? Colors.white : Colors.primary[500]} 
        />
      );
    }
    
    const textComponent = (
      <Text style={[getTextStyles(), textStyle]}>{title}</Text>
    );
    
    if (!icon) {
      return textComponent;
    }
    
    return (
      <View style={styles.contentContainer}>
        {iconPosition === 'left' && <View style={styles.iconLeft}>{icon}</View>}
        {textComponent}
        {iconPosition === 'right' && <View style={styles.iconRight}>{icon}</View>}
      </View>
    );
  };
  
  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[getButtonStyles(), style]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[Colors.primary[400], Colors.primary[600]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientContainer}
          borderRadius={Layout.borderRadius.md}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }
  
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[getButtonStyles(), style]}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: Layout.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  gradientContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: Layout.spacing.sm,
  },
  iconRight: {
    marginLeft: Layout.spacing.sm,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  // Size variants
  smButton: {
    paddingVertical: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.md,
    height: 36,
  },
  mdButton: {
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.lg,
    height: 48,
  },
  lgButton: {
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.xl,
    height: 56,
  },
  smText: {
    fontSize: 14,
  },
  mdText: {
    fontSize: 16,
  },
  lgText: {
    fontSize: 18,
  },
  // Variant styles
  secondaryButton: {
    backgroundColor: Colors.secondary[50],
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary[500],
  },
  textButton: {
    backgroundColor: 'transparent',
    paddingVertical: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.sm,
  },
  // Text styles
  primaryText: {
    color: Colors.white,
  },
  secondaryText: {
    color: Colors.secondary[800],
  },
  outlineText: {
    color: Colors.primary[500],
  },
  textButtonText: {
    color: Colors.primary[500],
  },
  // Disabled styles
  disabled: {
    opacity: 0.6,
  },
  disabledText: {
    color: Colors.neutral[500],
  },
});