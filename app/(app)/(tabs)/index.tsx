import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Search, Calendar, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Input from '@/components/UI/Input';
import DoctorCard from '@/components/DoctorCard';
import AppointmentCard from '@/components/AppointmentCard';
import SpecializationCard from '@/components/SpecializationCard';
import Avatar from '@/components/UI/Avatar';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppointments } from '@/hooks/useAppointments';
import { Appointment, Doctor } from '@/types/user';
import specializations from '@/constants/Specializations';

// Mock data for top doctors
const topDoctors: Doctor[] = [
  {
    id: '1',
    email: 'dr.anil@example.com',
    phone: '+919876543210',
    role: 'doctor',
    firstName: 'Dr. Anil',
    lastName: 'Kumar',
    profilePicture: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg',
    specialization: 'Cardiologist',
    experience: 12,
    qualifications: ['MBBS', 'MD', 'DM Cardiology'],
    licenseNumber: 'MCI-123456',
    hospital: 'Apollo Hospitals',
    consultationFees: {
      video: 800,
      chat: 500
    },
    languages: ['English', 'Hindi', 'Tamil'],
    about: 'Dr. Anil Kumar is an experienced cardiologist with over 12 years of practice. He specializes in interventional cardiology and has performed over 1000 angioplasties.',
    availability: [],
    rating: 4.8,
    reviewCount: 256,
    isVerified: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'dr.meera@example.com',
    phone: '+919876543211',
    role: 'doctor',
    firstName: 'Dr. Meera',
    lastName: 'Patel',
    profilePicture: 'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg',
    specialization: 'Pediatrician',
    experience: 8,
    qualifications: ['MBBS', 'MD Pediatrics'],
    licenseNumber: 'MCI-789012',
    hospital: 'Rainbow Children\'s Hospital',
    consultationFees: {
      video: 700,
      chat: 400
    },
    languages: ['English', 'Hindi', 'Gujarati'],
    about: 'Dr. Meera Patel is a compassionate pediatrician who specializes in pediatric care, vaccinations, and developmental assessments. She has a special interest in childhood nutrition.',
    availability: [],
    rating: 4.9,
    reviewCount: 189,
    isVerified: true,
    createdAt: '2023-02-15T00:00:00Z',
    updatedAt: '2023-02-15T00:00:00Z'
  }
];

export default function HomeScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { getUserAppointments, loading } = useAppointments();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const fetchAppointments = async () => {
      const userAppointments = await getUserAppointments();
      // Get only upcoming appointments
      const upcomingAppointments = userAppointments.filter(
        appt => appt.status === 'scheduled'
      );
      setAppointments(upcomingAppointments);
    };
    
    fetchAppointments();
  }, []);
  
  const handleDoctorPress = (doctor: Doctor) => {
    // Navigate to doctor profile
    router.push({
      pathname: '/(app)/doctor/[id]',
      params: { id: doctor.id }
    });
  };
  
  const handleAppointmentPress = (appointment: Appointment) => {
    // Navigate to appointment details
    router.push({
      pathname: '/(app)/appointment/[id]',
      params: { id: appointment.id }
    });
  };
  
  const handleSpecializationPress = (specialization: any) => {
    // Navigate to doctors list filtered by specialization
    router.push({
      pathname: '/(app)/(tabs)/find-doctors',
      params: { specialization: specialization.id }
    });
  };
  
  const renderWelcomeSection = () => {
    return (
      <View style={styles.welcomeSection}>
        <View style={styles.welcomeHeader}>
          <View>
            <Text style={styles.welcomeText}>{t('welcome')}</Text>
            <Text style={styles.userName}>
              {user?.firstName} {user?.lastName}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/(app)/(tabs)/settings')}
          >
            <Avatar
              uri={user?.profilePicture}
              name={`${user?.firstName} ${user?.lastName}`}
              size={50}
              borderColor={Colors.primary[100]}
              borderWidth={2}
            />
          </TouchableOpacity>
        </View>
        
        <Input
          placeholder={t('search')}
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Search size={20} color={Colors.neutral[400]} />}
          containerStyle={styles.searchContainer}
        />
      </View>
    );
  };
  
  const renderBanner = () => {
    return (
      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/6941883/pexels-photo-6941883.jpeg' }}
          style={styles.bannerImage}
        />
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>
            {user?.role === 'patient' 
              ? 'Get access to top doctors anytime, anywhere'
              : 'Manage your practice more efficiently'}
          </Text>
          <TouchableOpacity
            style={styles.bannerButton}
            onPress={() => router.push('/(app)/(tabs)/find-doctors')}
          >
            <Text style={styles.bannerButtonText}>
              {user?.role === 'patient' ? 'Find a Doctor' : 'View Schedule'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  const renderUpcomingAppointments = () => {
    if (appointments.length === 0) {
      return (
        <View style={styles.noAppointmentsContainer}>
          <Calendar size={40} color={Colors.neutral[300]} />
          <Text style={styles.noAppointmentsText}>
            {t('no_upcoming_appointments')}
          </Text>
          <TouchableOpacity
            style={styles.bookAppointmentButton}
            onPress={() => router.push('/(app)/(tabs)/find-doctors')}
          >
            <Text style={styles.bookAppointmentButtonText}>
              {t('book_appointment')}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    return (
      <>
        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            doctor={topDoctors.find(d => d.id === appointment.doctorId)}
            onPress={handleAppointmentPress}
            userRole={user?.role as 'doctor' | 'patient'}
          />
        ))}
      </>
    );
  };
  
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {renderWelcomeSection()}
      {renderBanner()}
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('upcoming_appointments')}</Text>
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => router.push('/(app)/(tabs)/appointments')}
          >
            <Text style={styles.viewAllText}>{t('view_all')}</Text>
            <ChevronRight size={16} color={Colors.primary[500]} />
          </TouchableOpacity>
        </View>
        
        {loading ? (
          <Text style={styles.loadingText}>{t('loading')}</Text>
        ) : (
          renderUpcomingAppointments()
        )}
      </View>
      
      {user?.role === 'patient' && (
        <>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t('specializations')}</Text>
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() => router.push('/(app)/(tabs)/find-doctors')}
              >
                <Text style={styles.viewAllText}>{t('view_all')}</Text>
                <ChevronRight size={16} color={Colors.primary[500]} />
              </TouchableOpacity>
            </View>
            
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.specializationsContainer}
            >
              {specializations.slice(0, 6).map((specialization) => (
                <SpecializationCard
                  key={specialization.id}
                  specialization={specialization}
                  onPress={handleSpecializationPress}
                />
              ))}
            </ScrollView>
          </View>
          
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t('top_doctors')}</Text>
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() => router.push('/(app)/(tabs)/find-doctors')}
              >
                <Text style={styles.viewAllText}>{t('view_all')}</Text>
                <ChevronRight size={16} color={Colors.primary[500]} />
              </TouchableOpacity>
            </View>
            
            {topDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onPress={handleDoctorPress}
              />
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  contentContainer: {
    paddingBottom: Layout.spacing.xl,
  },
  welcomeSection: {
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.xl,
    paddingBottom: Layout.spacing.lg,
    backgroundColor: Colors.white,
  },
  welcomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  welcomeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  userName: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.neutral[800],
  },
  searchContainer: {
    marginBottom: 0,
  },
  bannerContainer: {
    margin: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.lg,
    overflow: 'hidden',
    height: 160,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  bannerOverlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: Layout.spacing.lg,
    height: '100%',
    justifyContent: 'center',
  },
  bannerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.white,
    marginBottom: Layout.spacing.md,
    maxWidth: '70%',
  },
  bannerButton: {
    backgroundColor: Colors.white,
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary[500],
  },
  section: {
    paddingHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.neutral[800],
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary[500],
    marginRight: 4,
  },
  loadingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[500],
    textAlign: 'center',
    marginVertical: Layout.spacing.lg,
  },
  noAppointmentsContainer: {
    alignItems: 'center',
    padding: Layout.spacing.xl,
    backgroundColor: Colors.neutral[50],
    borderRadius: Layout.borderRadius.md,
  },
  noAppointmentsText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutral[600],
    marginVertical: Layout.spacing.md,
    textAlign: 'center',
  },
  bookAppointmentButton: {
    backgroundColor: Colors.primary[500],
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.md,
  },
  bookAppointmentButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.white,
  },
  specializationsContainer: {
    paddingVertical: Layout.spacing.sm,
  },
});