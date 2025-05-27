import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, FileText, Download, Share } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';
import { useTranslation } from '@/hooks/useTranslation';

export default function MedicalRecordDetailScreen() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams();

  // Mock data - in real app, fetch based on id
  const record = {
    id: id as string,
    title: 'Blood Test Results',
    description: 'Complete blood count and lipid profile',
    type: 'lab_report',
    createdAt: '2025-06-10T14:45:00Z',
    fileUrl: 'https://example.com/reports/blood-test.pdf'
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          title=""
          onPress={() => router.back()}
          variant="ghost"
          icon={<ArrowLeft size={24} color={Colors.neutral[800]} />}
          style={styles.backButton}
        />
        <Text style={styles.title}>{t('medical_record')}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.recordCard}>
          <View style={styles.recordHeader}>
            <FileText size={32} color={Colors.primary[500]} />
            <View style={styles.recordInfo}>
              <Text style={styles.recordTitle}>{record.title}</Text>
              <Text style={styles.recordDate}>{formatDate(record.createdAt)}</Text>
            </View>
          </View>
          
          {record.description && (
            <Text style={styles.recordDescription}>{record.description}</Text>
          )}
          
          <View style={styles.actionButtons}>
            <Button
              title={t('download')}
              onPress={() => {}}
              variant="outline"
              icon={<Download size={20} color={Colors.primary[500]} />}
              style={styles.actionButton}
            />
            <Button
              title={t('share')}
              onPress={() => {}}
              variant="outline"
              icon={<Share size={20} color={Colors.primary[500]} />}
              style={styles.actionButton}
            />
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.xl,
    paddingBottom: Layout.spacing.md,
    backgroundColor: Colors.white,
  },
  backButton: {
    marginRight: Layout.spacing.md,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.neutral[800],
  },
  content: {
    flex: 1,
    padding: Layout.spacing.lg,
  },
  recordCard: {
    padding: Layout.spacing.lg,
  },
  recordHeader: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.md,
  },
  recordInfo: {
    flex: 1,
    marginLeft: Layout.spacing.md,
  },
  recordTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  recordDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[500],
  },
  recordDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[700],
    lineHeight: 24,
    marginBottom: Layout.spacing.lg,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Layout.spacing.md,
  },
  actionButton: {
    flex: 1,
  },
}); 