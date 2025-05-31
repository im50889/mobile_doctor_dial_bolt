import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { CreditCard, Plus } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { useTranslation } from '@/hooks/useTranslation';

export default function PaymentMethodsScreen() {
  const { t } = useTranslation();

  const renderPaymentMethod = (
    last4: string,
    expiryMonth: string,
    expiryYear: string,
    isDefault: boolean
  ) => (
    <View style={styles.paymentMethod}>
      <View style={styles.cardInfo}>
        <CreditCard size={24} color={Colors.primary[500]} />
        <View style={styles.cardDetails}>
          <Text style={styles.cardNumber}>•••• {last4}</Text>
          <Text style={styles.cardExpiry}>
            {expiryMonth}/{expiryYear}
          </Text>
        </View>
      </View>
      {isDefault && (
        <View style={styles.defaultBadge}>
          <Text style={styles.defaultText}>{t('default')}</Text>
        </View>
      )}
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: t('payment_methods'),
          headerShadowVisible: false,
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          {renderPaymentMethod('4242', '12', '2025', true)}
          {renderPaymentMethod('5555', '03', '2026', false)}
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color={Colors.primary[500]} />
          <Text style={styles.addButtonText}>{t('add_payment_method')}</Text>
        </TouchableOpacity>
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
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardDetails: {
    marginLeft: Layout.spacing.md,
  },
  cardNumber: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutral[800],
    marginBottom: 2,
  },
  cardExpiry: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  defaultBadge: {
    backgroundColor: Colors.primary[100],
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 4,
    borderRadius: Layout.borderRadius.sm,
  },
  defaultText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.primary[700],
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    borderWidth: 1,
    borderColor: Colors.primary[300],
    borderStyle: 'dashed',
  },
  addButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.primary[500],
    marginLeft: Layout.spacing.sm,
  },
}); 