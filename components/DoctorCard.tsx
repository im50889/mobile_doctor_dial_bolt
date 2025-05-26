import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Star } from 'lucide-react-native';
import Card from './UI/Card';
import Avatar from './UI/Avatar';
import Badge from './UI/Badge';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Doctor } from '@/types/user';
import { useTranslation } from '@/hooks/useTranslation';

interface DoctorCardProps {
  doctor: Doctor;
  onPress: (doctor: Doctor) => void;
  showDetails?: boolean;
}

export default function DoctorCard({ doctor, onPress, showDetails = true }: DoctorCardProps) {
  const { t } = useTranslation();
  
  return (
    <Card
      style={styles.card}
      onPress={() => onPress(doctor)}
      elevation="low"
    >
      <View style={styles.header}>
        <Avatar
          uri={doctor.profilePicture}
          name={`${doctor.firstName} ${doctor.lastName}`}
          size={60}
          style={styles.avatar}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>
            {doctor.firstName} {doctor.lastName}
          </Text>
          <Text style={styles.specialization}>{doctor.specialization}</Text>
          <View style={styles.ratingContainer}>
            <Star size={16} color={Colors.warning[500]} fill={Colors.warning[500]} />
            <Text style={styles.rating}>{doctor.rating.toFixed(1)}</Text>
            <Text style={styles.reviewCount}>
              ({doctor.reviewCount} {t('reviews')})
            </Text>
          </View>
        </View>
      </View>
      
      {showDetails && (
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{t('experience')}:</Text>
            <Text style={styles.detailValue}>
              {t('experience_years', { years: doctor.experience })}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{t('consultation_fee')}:</Text>
            <View style={styles.feesContainer}>
              <Badge
                text={`₹${doctor.consultationFees.video} (${t('video_consultation')})`}
                variant="info"
                style={styles.feeBadge}
              />
              <Badge
                text={`₹${doctor.consultationFees.chat} (${t('chat_consultation')})`}
                variant="info"
                style={styles.feeBadge}
              />
            </View>
          </View>
        </View>
      )}
      
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => onPress(doctor)}
      >
        <Text style={styles.bookButtonText}>{t('book_appointment')}</Text>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Layout.spacing.md,
    padding: Layout.spacing.md,
  },
  header: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.md,
  },
  avatar: {
    marginRight: Layout.spacing.md,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginBottom: 2,
  },
  specialization: {
    fontSize: 14,
    color: Colors.neutral[600],
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.neutral[700],
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: Colors.neutral[500],
    marginLeft: 4,
  },
  details: {
    marginBottom: Layout.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.sm,
    flexWrap: 'wrap',
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.neutral[600],
    width: 100,
  },
  detailValue: {
    fontSize: 14,
    color: Colors.neutral[800],
    fontWeight: '500',
    flex: 1,
  },
  feesContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  feeBadge: {
    marginRight: Layout.spacing.sm,
    marginBottom: Layout.spacing.xs,
  },
  bookButton: {
    backgroundColor: Colors.primary[500],
    borderRadius: Layout.borderRadius.sm,
    paddingVertical: Layout.spacing.sm,
    alignItems: 'center',
  },
  bookButtonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
});