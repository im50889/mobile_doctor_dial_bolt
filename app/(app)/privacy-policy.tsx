import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { useTranslation } from '@/hooks/useTranslation';

export default function PrivacyPolicyScreen() {
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
          title: t('privacy_policy'),
          headerShadowVisible: false,
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.lastUpdated}>
          {t('last_updated')}: {new Date().toLocaleDateString()}
        </Text>

        {renderSection(
          t('information_collection'),
          t('information_collection_content')
        )}
        {renderSection(
          t('information_usage'),
          t('information_usage_content')
        )}
        {renderSection(
          t('information_sharing'),
          t('information_sharing_content')
        )}
        {renderSection(
          t('data_security'),
          t('data_security_content')
        )}
        {renderSection(
          t('your_rights'),
          t('your_rights_content')
        )}
        {renderSection(
          t('contact_us'),
          t('contact_us_content')
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
  lastUpdated: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    marginBottom: Layout.spacing.xl,
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