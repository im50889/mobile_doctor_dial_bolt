import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Search, Filter } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Input from '@/components/UI/Input';
import DoctorCard from '@/components/DoctorCard';
import SpecializationCard from '@/components/SpecializationCard';
import { useTranslation } from '@/hooks/useTranslation';
import { Doctor } from '@/types/user';
import specializations from '@/constants/Specializations';

// Mock data for doctors
const mockDoctors: Doctor[] = [
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
  },
  {
    id: '3',
    email: 'dr.sanjay@example.com',
    phone: '+919876543212',
    role: 'doctor',
    firstName: 'Dr. Sanjay',
    lastName: 'Gupta',
    profilePicture: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
    specialization: 'Dermatologist',
    experience: 10,
    qualifications: ['MBBS', 'MD Dermatology'],
    licenseNumber: 'MCI-456789',
    hospital: 'Max Healthcare',
    consultationFees: {
      video: 900,
      chat: 600
    },
    languages: ['English', 'Hindi'],
    about: 'Dr. Sanjay Gupta is a board-certified dermatologist specializing in cosmetic dermatology, skin cancer treatment, and general skin conditions. He is known for his patient-centered approach.',
    availability: [],
    rating: 4.7,
    reviewCount: 210,
    isVerified: true,
    createdAt: '2023-03-10T00:00:00Z',
    updatedAt: '2023-03-10T00:00:00Z'
  },
  {
    id: '4',
    email: 'dr.priya@example.com',
    phone: '+919876543213',
    role: 'doctor',
    firstName: 'Dr. Priya',
    lastName: 'Singh',
    profilePicture: 'https://images.pexels.com/photos/5407038/pexels-photo-5407038.jpeg',
    specialization: 'Gynecologist',
    experience: 14,
    qualifications: ['MBBS', 'MS Obstetrics & Gynecology'],
    licenseNumber: 'MCI-234567',
    hospital: 'Fortis Healthcare',
    consultationFees: {
      video: 1000,
      chat: 700
    },
    languages: ['English', 'Hindi', 'Bengali'],
    about: 'Dr. Priya Singh is an experienced gynecologist with expertise in women\'s health, prenatal care, and gynecological surgeries. She is committed to providing compassionate care to women of all ages.',
    availability: [],
    rating: 4.9,
    reviewCount: 345,
    isVerified: true,
    createdAt: '2023-01-20T00:00:00Z',
    updatedAt: '2023-01-20T00:00:00Z'
  },
  {
    id: '5',
    email: 'dr.neha@example.com',
    phone: '+919876543214',
    role: 'doctor',
    firstName: 'Dr. Neha',
    lastName: 'Sharma',
    profilePicture: 'https://images.pexels.com/photos/5407036/pexels-photo-5407036.jpeg',
    specialization: 'Orthopedist',
    experience: 9,
    qualifications: ['MBBS', 'MS Orthopedics'],
    licenseNumber: 'MCI-345678',
    hospital: 'AIIMS Delhi',
    consultationFees: {
      video: 850,
      chat: 550
    },
    languages: ['English', 'Hindi'],
    about: 'Dr. Neha Sharma is an orthopedic specialist focusing on sports injuries, joint replacements, and spine disorders. She employs the latest techniques for minimally invasive surgeries.',
    availability: [],
    rating: 4.6,
    reviewCount: 178,
    isVerified: true,
    createdAt: '2023-04-05T00:00:00Z',
    updatedAt: '2023-04-05T00:00:00Z'
  }
];

export default function FindDoctorsScreen() {
  const { t } = useTranslation();
  const params = useLocalSearchParams();
  const { specialization: selectedSpecId } = params;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(
    selectedSpecId as string || null
  );
  const [showFilters, setShowFilters] = useState(false);
  
  const handleDoctorPress = (doctor: Doctor) => {
    router.push({
      pathname: '/(app)/doctor/[id]',
      params: { id: doctor.id }
    });
  };
  
  const handleSpecializationPress = (specialization: any) => {
    setSelectedSpecialization(
      selectedSpecialization === specialization.id ? null : specialization.id
    );
  };
  
  const filterDoctors = () => {
    let filteredDoctors = [...mockDoctors];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredDoctors = filteredDoctors.filter(
        doctor =>
          doctor.firstName.toLowerCase().includes(query) ||
          doctor.lastName.toLowerCase().includes(query) ||
          doctor.specialization.toLowerCase().includes(query)
      );
    }
    
    // Filter by specialization
    if (selectedSpecialization) {
      const spec = specializations.find(s => s.id === selectedSpecialization);
      if (spec) {
        filteredDoctors = filteredDoctors.filter(
          doctor => doctor.specialization.toLowerCase() === spec.name.toLowerCase()
        );
      }
    }
    
    return filteredDoctors;
  };
  
  const renderDoctorItem = ({ item }: { item: Doctor }) => {
    return (
      <DoctorCard
        doctor={item}
        onPress={handleDoctorPress}
        showDetails={true}
      />
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('find_doctors')}</Text>
        
        <View style={styles.searchContainer}>
          <Input
            placeholder={t('search_doctor_name_specialization')}
            value={searchQuery}
            onChangeText={setSearchQuery}
            leftIcon={<Search size={20} color={Colors.neutral[400]} />}
            containerStyle={styles.searchInput}
          />
          
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter size={24} color={Colors.neutral[700]} />
          </TouchableOpacity>
        </View>
      </View>
      
      {showFilters && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.specializationsContainer}
        >
          {specializations.map((spec) => (
            <TouchableOpacity
              key={spec.id}
              style={[
                styles.specializationChip,
                selectedSpecialization === spec.id && styles.selectedSpecialization
              ]}
              onPress={() => handleSpecializationPress(spec)}
            >
              <Text
                style={[
                  styles.specializationText,
                  selectedSpecialization === spec.id && styles.selectedSpecializationText
                ]}
              >
                {spec.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      
      <FlatList
        data={filterDoctors()}
        renderItem={renderDoctorItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{t('no_doctors_found')}</Text>
          </View>
        }
      />
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
    marginBottom: Layout.spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    marginBottom: 0,
  },
  filterButton: {
    marginLeft: Layout.spacing.md,
    padding: Layout.spacing.xs,
    backgroundColor: Colors.neutral[100],
    borderRadius: Layout.borderRadius.md,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  specializationsContainer: {
    padding: Layout.spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  specializationChip: {
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    marginRight: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
    backgroundColor: Colors.neutral[100],
  },
  selectedSpecialization: {
    backgroundColor: Colors.primary[500],
  },
  specializationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[700],
  },
  selectedSpecializationText: {
    color: Colors.white,
  },
  listContent: {
    padding: Layout.spacing.lg,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.xl,
    backgroundColor: Colors.neutral[50],
    borderRadius: Layout.borderRadius.md,
    marginVertical: Layout.spacing.xl,
  },
  emptyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutral[600],
    textAlign: 'center',
  },
  search_doctor_name_specialization: 'Search doctor name, specialization',
  no_doctors_found: 'No doctors found matching your criteria',
});