import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { useTranslation } from '@/hooks/useTranslation';

export default function TermsScreen() {
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
          title: t('terms_of_service'),
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
          t('acceptance_of_terms'),
          t('acceptance_of_terms_content')
        )}
        {renderSection(
          t('description_of_service'),
          t('description_of_service_content')
        )}
        {renderSection(
          t('user_obligations'),
          t('user_obligations_content')
        )}
        {renderSection(
          t('medical_disclaimer'),
          t('medical_disclaimer_content')
        )}
        {renderSection(
          t('payment_terms'),
          t('payment_terms_content')
        )}
        {renderSection(
          t('termination'),
          t('termination_content')
        )}
        {renderSection(
          t('changes_to_terms'),
          t('changes_to_terms_content')
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