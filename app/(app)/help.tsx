import React from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { MessageCircle, Phone, Mail, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { useTranslation } from '@/hooks/useTranslation';

export default function HelpScreen() {
  const { t } = useTranslation();

  const renderContactItem = (
    icon: React.ReactNode,
    title: string,
    subtitle: string,
    onPress: () => void
  ) => (
    <TouchableOpacity style={styles.contactItem} onPress={onPress}>
      <View style={styles.contactIcon}>{icon}</View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactTitle}>{title}</Text>
        <Text style={styles.contactSubtitle}>{subtitle}</Text>
      </View>
      <ChevronRight size={20} color={Colors.neutral[400]} />
    </TouchableOpacity>
  );

  const renderFAQItem = (question: string, answer: string) => (
    <View style={styles.faqItem}>
      <Text style={styles.faqQuestion}>{question}</Text>
      <Text style={styles.faqAnswer}>{answer}</Text>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: t('help_support'),
          headerShadowVisible: false,
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('contact_us')}</Text>
          {renderContactItem(
            <MessageCircle size={24} color={Colors.primary[500]} />,
            t('live_chat'),
            t('available_24_7'),
            () => {}
          )}
          {renderContactItem(
            <Phone size={24} color={Colors.primary[500]} />,
            t('phone_support'),
            '+1 (555) 123-4567',
            () => {}
          )}
          {renderContactItem(
            <Mail size={24} color={Colors.primary[500]} />,
            t('email_support'),
            'support@doctordial.com',
            () => {}
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('frequently_asked_questions')}</Text>
          {renderFAQItem(
            t('how_to_book_appointment'),
            t('how_to_book_appointment_answer')
          )}
          {renderFAQItem(
            t('how_to_cancel_appointment'),
            t('how_to_cancel_appointment_answer')
          )}
          {renderFAQItem(
            t('payment_methods'),
            t('payment_methods_answer')
          )}
          {renderFAQItem(
            t('privacy_security'),
            t('privacy_security_answer')
          )}
        </View>
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
  section: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.lg,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.neutral[800],
    marginBottom: Layout.spacing.md,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Layout.spacing.md,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutral[800],
    marginBottom: 2,
  },
  contactSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  faqItem: {
    paddingVertical: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  faqQuestion: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutral[800],
    marginBottom: Layout.spacing.xs,
  },
  faqAnswer: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    lineHeight: 20,
  },
}); 