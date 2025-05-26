import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Button from '@/components/UI/Button';
import { useTranslation } from '@/hooks/useTranslation';

const { width } = Dimensions.get('window');

interface OnboardingItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export default function OnboardingScreen() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  
  const onboardingData: OnboardingItem[] = [
    {
      id: '1',
      title: t('onboarding_title_1'),
      description: t('onboarding_desc_1'),
      image: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg',
    },
    {
      id: '2',
      title: t('onboarding_title_2'),
      description: t('onboarding_desc_2'),
      image: 'https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg',
    },
    {
      id: '3',
      title: t('onboarding_title_3'),
      description: t('onboarding_desc_3'),
      image: 'https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg',
    },
  ];
  
  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace('/(auth)/login');
    }
  };
  
  const handleSkip = () => {
    router.replace('/(auth)/login');
  };
  
  const renderItem = ({ item }: { item: OnboardingItem }) => {
    return (
      <View style={styles.slide}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };
  
  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === currentIndex ? Colors.primary[500] : Colors.neutral[300] }
            ]}
          />
        ))}
      </View>
    );
  };
  
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>{t('app_name')}</Text>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>{currentIndex === onboardingData.length - 1 ? '' : t('login')}</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      />
      
      {renderDots()}
      
      <View style={styles.footer}>
        <Button
          title={currentIndex === onboardingData.length - 1 ? t('continue') : t('continue')}
          onPress={handleNext}
          icon={<ArrowRight size={20} color={Colors.white} />}
          iconPosition="right"
          style={styles.nextButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.xl,
    paddingBottom: Layout.spacing.md,
  },
  appName: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.primary[500],
  },
  skipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.primary[500],
  },
  slide: {
    width,
    alignItems: 'center',
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    resizeMode: 'cover',
    marginTop: Layout.spacing.xl,
    borderRadius: Layout.borderRadius.xl,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.xl,
    marginTop: Layout.spacing.xl,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.neutral[800],
    textAlign: 'center',
    marginBottom: Layout.spacing.md,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[600],
    textAlign: 'center',
    lineHeight: 24,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Layout.spacing.xl,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  footer: {
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.xl,
    marginTop: 'auto',
  },
  nextButton: {
    width: '100%',
  },
});