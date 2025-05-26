import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  StyleProp,
  ViewStyle,
  Text
} from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface AvatarProps {
  uri?: string | null;
  name?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  borderColor?: string;
  borderWidth?: number;
}

export default function Avatar({
  uri,
  name,
  size = 48,
  style,
  borderColor = Colors.white,
  borderWidth = 0
}: AvatarProps) {
  const initials = React.useMemo(() => {
    if (!name) return '';
    
    const nameParts = name.split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    
    return (
      nameParts[0].charAt(0).toUpperCase() +
      nameParts[nameParts.length - 1].charAt(0).toUpperCase()
    );
  }, [name]);
  
  const containerStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderColor,
    borderWidth
  };
  
  const textSize = size * 0.4;
  
  if (uri) {
    return (
      <View style={[styles.container, containerStyle, style]}>
        <Image 
          source={{ uri }} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    );
  }
  
  return (
    <View style={[styles.container, styles.placeholderContainer, containerStyle, style]}>
      <Text style={[styles.initials, { fontSize: textSize }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    backgroundColor: Colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: Colors.primary[700],
    fontWeight: '600',
  },
});