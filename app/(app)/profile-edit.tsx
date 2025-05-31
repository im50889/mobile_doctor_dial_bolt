import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/hooks/useAuth';

export default function ProfileEditScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <>
      <Stack.Screen
        options={{
          title: t('edit_profile'),
          headerShadowVisible: false,
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          <Input
            label={t('first_name')}
            defaultValue={user?.firstName}
            containerStyle={styles.input}
          />
          <Input
            label={t('last_name')}
            defaultValue={user?.lastName}
            containerStyle={styles.input}
          />
          <Input
            label={t('email')}
            defaultValue={user?.email}
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.input}
          />
          <Input
            label={t('phone')}
            defaultValue={user?.phone}
            keyboardType="phone-pad"
            containerStyle={styles.input}
          />
          <Button
            title={t('save_changes')}
            onPress={() => {}}
            style={styles.button}
          />
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
  form: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.lg,
  },
  input: {
    marginBottom: Layout.spacing.md,
  },
  button: {
    marginTop: Layout.spacing.md,
  },
}); 