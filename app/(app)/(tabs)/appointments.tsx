import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Calendar } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import AppointmentCard from '@/components/AppointmentCard';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppointments } from '@/hooks/useAppointments';
import { Appointment } from '@/types/user';

// Mock data for doctors
const mockDoctors = [
  {
    id: '1',
    firstName: 'Dr. Anil',
    lastName: 'Kumar',
    specialization: 'Cardiologist',
    profilePicture: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg',
  },
  {
    id: '3',
    firstName: 'Dr. Sanjay',
    lastName: 'Gupta',
    specialization: 'Dermatologist',
    profilePicture: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
  },
  {
    id: '5',
    firstName: 'Dr. Neha',
    lastName: 'Sharma',
    specialization: 'Orthopedist',
    profilePicture: 'https://images.pexels.com/photos/5407036/pexels-photo-5407036.jpeg',
  }
];

// Mock data for patients
const mockPatients = [
  {
    id: '2',
    firstName: 'Priya',
    lastName: 'Sharma',
    profilePicture: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
  }
];

export default function AppointmentsScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { getUserAppointments, loading } = useAppointments();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  
  useEffect(() => {
    const fetchAppointments = async () => {
      const userAppointments = await getUserAppointments();
      setAppointments(userAppointments);
    };
    
    fetchAppointments();
  }, []);
  
  const handleAppointmentPress = (appointment: Appointment) => {
    router.push({
      pathname: '/(app)/appointment/[id]',
      params: { id: appointment.id }
    });
  };
  
  const getFilteredAppointments = () => {
    if (activeTab === 'upcoming') {
      return appointments.filter(appt => appt.status === 'scheduled');
    } else {
      return appointments.filter(appt => appt.status !== 'scheduled');
    }
  };
  
  const renderNoAppointments = () => {
    return (
      <View style={styles.noAppointmentsContainer}>
        <Calendar size={48} color={Colors.neutral[300]} />
        <Text style={styles.noAppointmentsText}>
          {activeTab === 'upcoming'
            ? t('no_upcoming_appointments')
            : t('no_past_appointments')}
        </Text>
        {activeTab === 'upcoming' && (
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => router.push('/(app)/(tabs)/find-doctors')}
          >
            <Text style={styles.bookButtonText}>{t('book_appointment')}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  
  const renderAppointmentItem = ({ item }: { item: Appointment }) => {
    const doctor = mockDoctors.find(d => d.id === item.doctorId);
    const patient = mockPatients.find(p => p.id === item.patientId);
    
    return (
      <AppointmentCard
        appointment={item}
        doctor={doctor as any}
        patient={patient as any}
        onPress={handleAppointmentPress}
        userRole={user?.role as 'doctor' | 'patient'}
      />
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('appointments')}</Text>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'upcoming' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'upcoming' && styles.activeTabText
            ]}
          >
            {t('upcoming')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'past' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('past')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'past' && styles.activeTabText
            ]}
          >
            {t('past')}
          </Text>
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{t('loading')}</Text>
        </View>
      ) : (
        <FlatList
          data={getFilteredAppointments()}
          renderItem={renderAppointmentItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderNoAppointments}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  header: {
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.xl,
    paddingBottom: Layout.spacing.md,
    backgroundColor: Colors.white,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.neutral[800],
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingHorizontal: Layout.spacing.lg,
    paddingBottom: Layout.spacing.md,
  },
  tabButton: {
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    marginRight: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
  },
  activeTabButton: {
    backgroundColor: Colors.primary[50],
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  activeTabText: {
    color: Colors.primary[500],
  },
  listContent: {
    padding: Layout.spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[600],
  },
  noAppointmentsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.xl,
    backgroundColor: Colors.neutral[50],
    borderRadius: Layout.borderRadius.md,
    marginVertical: Layout.spacing.xl,
  },
  noAppointmentsText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutral[600],
    marginVertical: Layout.spacing.md,
    textAlign: 'center',
  },
  bookButton: {
    backgroundColor: Colors.primary[500],
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.md,
  },
  bookButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.white,
  },
  upcoming: 'Upcoming',
  past: 'Past',
  no_upcoming_appointments: 'You have no upcoming appointments',
  no_past_appointments: 'You have no past appointments',
});