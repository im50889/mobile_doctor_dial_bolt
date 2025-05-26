import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Stethoscope, Baby, ScanFace, Bone, HeartPulse, Brain, Female, Eye, Ear, Tooth, Apple } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Specialization } from '@/constants/Specializations';

interface SpecializationCardProps {
  specialization: Specialization;
  onPress: (specialization: Specialization) => void;
}

export default function SpecializationCard({ specialization, onPress }: SpecializationCardProps) {
  const getIcon = () => {
    const iconProps = {
      size: 24,
      color: Colors.primary[500],
    };
    
    switch (specialization.icon) {
      case 'stethoscope':
        return <Stethoscope {...iconProps} />;
      case 'baby':
        return <Baby {...iconProps} />;
      case 'scan-face':
        return <ScanFace {...iconProps} />;
      case 'bone':
        return <Bone {...iconProps} />;
      case 'heart-pulse':
        return <HeartPulse {...iconProps} />;
      case 'brain':
        return <Brain {...iconProps} />;
      case 'female':
        return <Female {...iconProps} />;
      case 'brain-circuit':
        return <Brain {...iconProps} />;
      case 'eye':
        return <Eye {...iconProps} />;
      case 'ear':
        return <Ear {...iconProps} />;
      case 'tooth':
        return <Tooth {...iconProps} />;
      case 'apple':
        return <Apple {...iconProps} />;
      default:
        return <Stethoscope {...iconProps} />;
    }
  };
  
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(specialization)}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>{getIcon()}</View>
      <Text style={styles.name} numberOfLines={2}>{specialization.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    alignItems: 'center',
    marginRight: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.spacing.sm,
  },
  name: {
    fontSize: 14,
    color: Colors.neutral[800],
    textAlign: 'center',
    fontWeight: '500',
  },
});