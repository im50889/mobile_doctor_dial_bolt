import React from 'react';
import { StyleSheet, ScrollView, Text, View, Image } from 'react-native';
import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { useTranslation } from '@/hooks/useTranslation';

export default function AboutScreen() {
  const { t } = useTranslation();

  const renderSection = (title: string, content: string) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionContent}>{content}</Text>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: t('about_us'),
          headerShadowVisible: false,
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg' }}
            style={styles.logo}
          />
          <Text style={styles.appName}>Doctor Dial</Text>
          <Text style={styles.version}>v1.0.0</Text>
        </View>

        {renderSection(
          t('our_mission'),
          t('our_mission_content')
        )}
        {renderSection(
          t('our_vision'),
          t('our_vision_content')
        )}
        {renderSection(
          t('our_values'),
          t('our_values_content')
        )}
        {renderSection(
          t('our_team'),
          t('our_team_content')
        )}
        {renderSection(
          t('our_achievements'),
          t('our_achievements_content')
        )}
        {renderSection(
          t('contact_info'),
          t('contact_info_content')
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  contentContainer: {
    padding: Layout.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: Layout.spacing.md,
  },
  appName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.neutral[800],
    marginBottom: Layout.spacing.xs,
  },
  version: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[600],
  },
  section: {
    marginBottom: Layout.spacing.xl,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.neutral[800],
    marginBottom: Layout.spacing.md,
  },
  sectionContent: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[700],
    lineHeight: 24,
  },
}); 