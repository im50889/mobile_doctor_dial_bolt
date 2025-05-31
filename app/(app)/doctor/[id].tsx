import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { Star, MapPin, Clock, Calendar, Phone, Video } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';
import Avatar from '@/components/UI/Avatar';
import { useTranslation } from '@/hooks/useTranslation';

export default function DoctorDetailScreen() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams();

  // Mock data - in real app, fetch based on id
  const doctor = {
    id: id as string,
    firstName: 'Dr. Sarah',
    lastName: 'Johnson',
    specialization: 'Cardiologist',
    rating: 4.8,
    reviewCount: 127,
    experience: '15 years',
    location: 'New York, NY',
    about: 'Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating heart conditions. She specializes in preventive cardiology and has helped thousands of patients improve their heart health.',
    education: 'MD from Harvard Medical School',
    languages: ['English', 'Spanish'],
    consultationFee: 150,
    availability: 'Available today',
    profilePicture: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg'
  };

  const handleBookAppointment = () => {
    // In real app, navigate to booking screen
    console.log('Book appointment with doctor:', doctor.id);
  };

  const handleVideoCall = () => {
    // In real app, start video call
    console.log('Start video call with doctor:', doctor.id);
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: t('doctor_profile'),
          headerShown: true,
          headerBackTitle: t('back')
        }} 
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Card style={styles.profileCard}>
          <View style={styles.header}>
            <Avatar
              uri={doctor.profilePicture}
              name={`${doctor.firstName} ${doctor.lastName}`}
              size={80}
              style={styles.avatar}
            />
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>
                {doctor.firstName} {doctor.lastName}
              </Text>
              <Text style={styles.specialization}>{doctor.specialization}</Text>
              
              <View style={styles.ratingContainer}>
                <Star size={16} color={Colors.warning[500]} fill={Colors.warning[500]} />
                <Text style={styles.rating}>{doctor.rating}</Text>
                <Text style={styles.reviewCount}>({doctor.reviewCount} reviews)</Text>
              </View>

              <View style={styles.detailRow}>
                <MapPin size={16} color={Colors.neutral[500]} />
                <Text style={styles.detailText}>{doctor.location}</Text>
              </View>

              <View style={styles.detailRow}>
                <Clock size={16} color={Colors.neutral[500]} />
                <Text style={styles.detailText}>{doctor.experience} experience</Text>
              </View>
            </View>
          </View>

          <View style={styles.availabilityContainer}>
            <View style={styles.availabilityBadge}>
              <Text style={styles.availabilityText}>{doctor.availability}</Text>
            </View>
            <Text style={styles.consultationFee}>
              ${doctor.consultationFee} consultation fee
            </Text>
          </View>
        </Card>

        <Card style={styles.aboutCard}>
          <Text style={styles.sectionTitle}>{t('about')}</Text>
          <Text style={styles.aboutText}>{doctor.about}</Text>
        </Card>

        <Card style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>{t('details')}</Text>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>{t('education')}</Text>
            <Text style={styles.detailValue}>{doctor.education}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>{t('languages')}</Text>
            <Text style={styles.detailValue}>{doctor.languages.join(', ')}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>{t('experience')}</Text>
            <Text style={styles.detailValue}>{doctor.experience}</Text>
          </View>
        </Card>

        <View style={styles.actionsContainer}>
          <Button
            title={t('book_appointment')}
            onPress={handleBookAppointment}
            style={styles.primaryButton}
            fullWidth
          />

          <Button
            title={t('video_consultation')}
            onPress={handleVideoCall}
            variant="outline"
            style={styles.secondaryButton}
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
  profileCard: {
    marginBottom: Layout.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.lg,
  },
  avatar: {
    marginRight: Layout.spacing.lg,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  specialization: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[600],
    marginBottom: Layout.spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  rating: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[700],
    marginLeft: 4,
  },
  reviewCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[500],
    marginLeft: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    marginLeft: 6,
  },
  availabilityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    paddingTop: Layout.spacing.md,
  },
  availabilityBadge: {
    backgroundColor: Colors.success[100],
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.sm,
  },
  availabilityText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.success[700],
  },
  consultationFee: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[700],
  },
  aboutCard: {
    marginBottom: Layout.spacing.lg,
  },
  detailsCard: {
    marginBottom: Layout.spacing.lg,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.neutral[800],
    marginBottom: Layout.spacing.md,
  },
  aboutText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    lineHeight: 20,
  },
  detailItem: {
    marginBottom: Layout.spacing.md,
  },
  detailLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[700],
    marginBottom: 4,
  },
  detailValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  actionsContainer: {
    gap: Layout.spacing.md,
  },
  primaryButton: {
    backgroundColor: Colors.primary[500],
  },
  secondaryButton: {
    borderColor: Colors.primary[500],
  },
}); 