import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { PlusCircle, File, FileText, ImageIcon, Plus } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Card from '@/components/UI/Card';
import { useTranslation } from '@/hooks/useTranslation';
import { MedicalRecord } from '@/types/user';

// Mock data for medical records
const mockMedicalRecords: MedicalRecord[] = [
  {
    id: '1',
    patientId: '2',
    type: 'prescription',
    title: 'Prescription for Hypertension',
    description: 'Medications for blood pressure management',
    createdAt: '2025-06-15T10:30:00Z',
    updatedAt: '2025-06-15T10:30:00Z'
  },
  {
    id: '2',
    patientId: '2',
    type: 'lab_report',
    title: 'Blood Test Results',
    description: 'Complete blood count and lipid profile',
    fileUrl: 'https://example.com/reports/blood-test.pdf',
    createdAt: '2025-06-10T14:45:00Z',
    updatedAt: '2025-06-10T14:45:00Z'
  },
  {
    id: '3',
    patientId: '2',
    type: 'imaging',
    title: 'Chest X-Ray',
    description: 'Routine chest examination',
    fileUrl: 'https://example.com/images/chest-xray.jpg',
    createdAt: '2025-05-22T09:15:00Z',
    updatedAt: '2025-05-22T09:15:00Z'
  },
  {
    id: '4',
    patientId: '2',
    type: 'other',
    title: 'Vaccination Certificate',
    description: 'COVID-19 vaccination record',
    fileUrl: 'https://example.com/documents/vaccination.pdf',
    createdAt: '2025-04-05T11:20:00Z',
    updatedAt: '2025-04-05T11:20:00Z'
  }
];

export default function MedicalRecordsScreen() {
  const { t } = useTranslation();
  const [records, setRecords] = useState<MedicalRecord[]>(mockMedicalRecords);
  const [activeTab, setActiveTab] = useState<'all' | 'prescriptions' | 'lab_reports' | 'imaging'>('all');
  
  const handleRecordPress = (record: MedicalRecord) => {
    router.push({
      pathname: '/(app)/medical-record/[id]',
      params: { id: record.id }
    });
  };
  
  const handleAddRecord = () => {
    router.push('/(app)/add-medical-record');
  };
  
  const getFilteredRecords = () => {
    if (activeTab === 'all') {
      return records;
    }
    
    if (activeTab === 'prescriptions') {
      return records.filter(record => record.type === 'prescription');
    }
    
    if (activeTab === 'lab_reports') {
      return records.filter(record => record.type === 'lab_report');
    }
    
    if (activeTab === 'imaging') {
      return records.filter(record => record.type === 'imaging');
    }
    
    return records;
  };
  
  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'prescription':
        return <FileText size={24} color={Colors.primary[500]} />;
      case 'lab_report':
        return <File size={24} color={Colors.secondary[500]} />;
      case 'imaging':
        return <ImageIcon size={24} color={Colors.accent[500]} />;
      default:
        return <File size={24} color={Colors.neutral[500]} />;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const renderRecordItem = ({ item }: { item: MedicalRecord }) => {
    return (
      <Card style={styles.recordCard} onPress={() => handleRecordPress(item)}>
        <View style={[
          styles.recordHeader,
          { marginBottom: item.description ? Layout.spacing.sm : 0 }
        ]}>
          <View style={styles.iconContainer}>{getRecordIcon(item.type)}</View>
          <View style={styles.recordInfo}>
            <Text style={styles.recordTitle}>{item.title}</Text>
            <Text style={styles.recordDate}>{formatDate(item.createdAt)}</Text>
          </View>
        </View>
        {item.description && (
          <Text style={styles.recordDescription}>{item.description}</Text>
        )}
      </Card>
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('medical_records')}</Text>
      </View>
      
      <View style={styles.tabContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScrollContent}
        >
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'all' && styles.activeTabButton
            ]}
            onPress={() => setActiveTab('all')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'all' && styles.activeTabText
              ]}
            >
              {t('all')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'prescriptions' && styles.activeTabButton
            ]}
            onPress={() => setActiveTab('prescriptions')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'prescriptions' && styles.activeTabText
              ]}
            >
              {t('prescriptions')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'lab_reports' && styles.activeTabButton
            ]}
            onPress={() => setActiveTab('lab_reports')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'lab_reports' && styles.activeTabText
              ]}
            >
              {t('lab_reports')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'imaging' && styles.activeTabButton
            ]}
            onPress={() => setActiveTab('imaging')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'imaging' && styles.activeTabText
              ]}
            >
              {t('imaging')}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      <FlatList
        data={getFilteredRecords()}
        renderItem={renderRecordItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{t('no_records_found')}</Text>
          </View>
        }
      />
      
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddRecord}
      >
        <Plus size={24} color={Colors.white} />
      </TouchableOpacity>
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
    backgroundColor: Colors.white,
    paddingBottom: Layout.spacing.md,
  },
  tabScrollContent: {
    paddingHorizontal: Layout.spacing.lg,
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
    paddingBottom: Layout.spacing.xxl + 60, // Extra padding for FAB
  },
  recordCard: {
    marginBottom: Layout.spacing.md,
  },
  recordHeader: {
    flexDirection: 'row',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Layout.spacing.md,
  },
  recordInfo: {
    flex: 1,
  },
  recordTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutral[800],
    marginBottom: 2,
  },
  recordDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[500],
  },
  recordDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    marginTop: Layout.spacing.sm,
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
  addButton: {
    position: 'absolute',
    bottom: Layout.spacing.lg,
    right: Layout.spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});