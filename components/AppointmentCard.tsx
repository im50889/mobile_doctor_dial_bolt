import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Calendar, Video, MessageSquare } from 'lucide-react-native';
import Card from './UI/Card';
import Badge from './UI/Badge';
import Avatar from './UI/Avatar';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Appointment, Doctor, Patient } from '@/types/user';
import { useTranslation } from '@/hooks/useTranslation';

interface AppointmentCardProps {
  appointment: Appointment;
  doctor?: Doctor;
  patient?: Patient;
  onPress: (appointment: Appointment) => void;
  userRole: 'doctor' | 'patient';
}

export default function AppointmentCard({
  appointment,
  doctor,
  patient,
  onPress,
  userRole
}: AppointmentCardProps) {
  const { t } = useTranslation();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  const formatTime = (timeString: string) => {
    // Convert "HH:MM" to display format
    const [hours, minutes] = timeString.split(':');
    const hourNum = parseInt(hours, 10);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minutes} ${period}`;
  };
  
  const getStatusBadge = () => {
    let variant: 'primary' | 'success' | 'warning' | 'error' = 'primary';
    
    switch (appointment.status) {
      case 'scheduled':
        variant = 'primary';
        break;
      case 'completed':
        variant = 'success';
        break;
      case 'cancelled':
        variant = 'error';
        break;
      case 'no-show':
        variant = 'warning';
        break;
    }
    
    return (
      <Badge
        text={appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
        variant={variant}
        style={styles.statusBadge}
      />
    );
  };
  
  const getConsultationTypeIcon = () => {
    if (appointment.type === 'video') {
      return <Video size={16} color={Colors.primary[500]} />;
    } else {
      return <MessageSquare size={16} color={Colors.primary[500]} />;
    }
  };
  
  return (
    <Card style={styles.card} onPress={() => onPress(appointment)} elevation="low">
      <View style={styles.header}>
        {userRole === 'doctor' && patient && (
          <View style={styles.personInfo}>
            <Avatar
              uri={patient.profilePicture}
              name={`${patient.firstName} ${patient.lastName}`}
              size={40}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.name}>
                {patient.firstName} {patient.lastName}
              </Text>
              <Text style={styles.personType}>{t('patient')}</Text>
            </View>
          </View>
        )}
        
        {userRole === 'patient' && doctor && (
          <View style={styles.personInfo}>
            <Avatar
              uri={doctor.profilePicture}
              name={`${doctor.firstName} ${doctor.lastName}`}
              size={40}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.name}>
                {doctor.firstName} {doctor.lastName}
              </Text>
              <Text style={styles.personType}>{doctor.specialization}</Text>
            </View>
          </View>
        )}
        
        {getStatusBadge()}
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <View style={styles.iconContainer}>
            <Calendar size={16} color={Colors.primary[500]} />
          </View>
          <Text style={styles.detailText}>
            {formatDate(appointment.date)} | {formatTime(appointment.timeSlot.startTime)} - {formatTime(appointment.timeSlot.endTime)}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <View style={styles.iconContainer}>
            {getConsultationTypeIcon()}
          </View>
          <Text style={styles.detailText}>
            {appointment.type === 'video' ? t('video_consultation') : t('chat_consultation')}
          </Text>
        </View>
      </View>
      
      {appointment.status === 'scheduled' && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.primaryButton]}
            onPress={() => onPress(appointment)}
          >
            <Text style={styles.primaryButtonText}>
              {appointment.status === 'scheduled' 
                ? t('start_consultation') 
                : t('view_details')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Layout.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Layout.spacing.md,
  },
  personInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: Layout.spacing.md,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral[800],
  },
  personType: {
    fontSize: 14,
    color: Colors.neutral[600],
  },
  statusBadge: {
    alignSelf: 'flex-start',
  },
  details: {
    marginBottom: Layout.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  iconContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: Layout.spacing.sm,
  },
  detailText: {
    fontSize: 14,
    color: Colors.neutral[700],
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    flex: 1,
    paddingVertical: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.sm,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: Colors.primary[500],
  },
  primaryButtonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
});