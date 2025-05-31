import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { ArrowLeft, Calendar, Clock, MapPin, User, Phone, Video } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';
import { useTranslation } from '@/hooks/useTranslation';

export default function AppointmentDetailScreen() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams();

  // Mock data - in real app, fetch based on id
  const appointment = {
    id: id as string,
    doctorName: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    date: '2025-06-15',
    time: '10:30 AM',
    type: 'video_call',
    status: 'confirmed',
    location: 'Online Consultation',
    notes: 'Follow-up consultation for blood pressure monitoring'
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleJoinCall = () => {
    // In real app, join video call
    console.log('Joining video call...');
  };

  const handleReschedule = () => {
    // In real app, navigate to reschedule screen
    console.log('Reschedule appointment...');
  };

  const handleCancel = () => {
    // In real app, cancel appointment
    console.log('Cancel appointment...');
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: t('appointment_details'),
          headerShown: true,
          headerBackTitle: t('back')
        }} 
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Card style={styles.appointmentCard}>
          <View style={styles.header}>
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{appointment.doctorName}</Text>
              <Text style={styles.specialization}>{appointment.specialization}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: Colors.success[100] }]}>
              <Text style={[styles.statusText, { color: Colors.success[700] }]}>
                {t('confirmed')}
              </Text>
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Calendar size={20} color={Colors.primary[500]} />
              <Text style={styles.detailText}>{formatDate(appointment.date)}</Text>
            </View>

            <View style={styles.detailRow}>
              <Clock size={20} color={Colors.primary[500]} />
              <Text style={styles.detailText}>{appointment.time}</Text>
            </View>

            <View style={styles.detailRow}>
              {appointment.type === 'video_call' ? (
                <Video size={20} color={Colors.primary[500]} />
              ) : (
                <MapPin size={20} color={Colors.primary[500]} />
              )}
              <Text style={styles.detailText}>{appointment.location}</Text>
            </View>
          </View>

          {appointment.notes && (
            <View style={styles.notesContainer}>
              <Text style={styles.notesTitle}>{t('notes')}</Text>
              <Text style={styles.notesText}>{appointment.notes}</Text>
            </View>
          )}
        </Card>

        <View style={styles.actionsContainer}>
          {appointment.type === 'video_call' && (
            <Button
              title={t('join_video_call')}
              onPress={handleJoinCall}
              style={styles.primaryButton}
              fullWidth
            />
          )}

          <Button
            title={t('reschedule')}
            onPress={handleReschedule}
            variant="outline"
            style={styles.secondaryButton}
            fullWidth
          />

          <Button
            title={t('cancel_appointment')}
            onPress={handleCancel}
            variant="ghost"
            style={styles.cancelButton}
            fullWidth
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
  appointmentCard: {
    marginBottom: Layout.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Layout.spacing.lg,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  specialization: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  statusBadge: {
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.sm,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  detailsContainer: {
    marginBottom: Layout.spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[700],
    marginLeft: Layout.spacing.md,
  },
  notesContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    paddingTop: Layout.spacing.md,
  },
  notesTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[700],
    marginBottom: Layout.spacing.sm,
  },
  notesText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    lineHeight: 20,
  },
  actionsContainer: {
    gap: Layout.spacing.md,
  },
  primaryButton: {
    backgroundColor: Colors.primary[500],
  },
  secondaryButton: {
    borderColor: Colors.neutral[300],
  },
  cancelButton: {
    backgroundColor: 'transparent',
  },
}); 