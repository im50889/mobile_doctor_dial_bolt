import React from 'react';
import { StyleSheet, View, ScrollView, Text, Switch } from 'react-native';
import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { useTranslation } from '@/hooks/useTranslation';

export default function NotificationsScreen() {
  const { t } = useTranslation();
  const [notifications, setNotifications] = React.useState({
    appointmentReminders: true,
    newMessages: true,
    marketingUpdates: false,
    systemUpdates: true,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderNotificationItem = (
    title: string,
    description: string,
    key: keyof typeof notifications
  ) => (
    <View style={styles.notificationItem}>
      <View style={styles.notificationInfo}>
        <Text style={styles.notificationTitle}>{title}</Text>
        <Text style={styles.notificationDescription}>{description}</Text>
      </View>
      <Switch
        value={notifications[key]}
        onValueChange={() => toggleNotification(key)}
        trackColor={{ false: Colors.neutral[300], true: Colors.primary[300] }}
        thumbColor={notifications[key] ? Colors.primary[500] : Colors.neutral[400]}
      />
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: t('notifications'),
          headerShadowVisible: false,
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          {renderNotificationItem(
            t('appointment_reminders'),
            t('appointment_reminders_desc'),
            'appointmentReminders'
          )}
          {renderNotificationItem(
            t('new_messages'),
            t('new_messages_desc'),
            'newMessages'
          )}
          {renderNotificationItem(
            t('marketing_updates'),
            t('marketing_updates_desc'),
            'marketingUpdates'
          )}
          {renderNotificationItem(
            t('system_updates'),
            t('system_updates_desc'),
            'systemUpdates'
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
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  notificationInfo: {
    flex: 1,
    marginRight: Layout.spacing.md,
  },
  notificationTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  notificationDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
  },
}); 