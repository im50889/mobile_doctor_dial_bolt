import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Upload, FileText, Camera } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';
import { useTranslation } from '@/hooks/useTranslation';

export default function AddMedicalRecordScreen() {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState<'prescription' | 'lab_report' | 'imaging' | 'other'>('prescription');

  const recordTypes = [
    { id: 'prescription', label: t('prescription'), icon: FileText },
    { id: 'lab_report', label: t('lab_report'), icon: FileText },
    { id: 'imaging', label: t('imaging'), icon: Camera },
    { id: 'other', label: t('other'), icon: FileText },
  ];

  const handleSave = () => {
    // In real app, save the record
    console.log('Saving record:', { title, description, type: selectedType });
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.neutral[800]} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('add_medical_record')}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.formCard}>
          <Text style={styles.sectionTitle}>{t('record_type')}</Text>
          <View style={styles.typeContainer}>
            {recordTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.typeButton,
                    selectedType === type.id && styles.selectedTypeButton
                  ]}
                  onPress={() => setSelectedType(type.id as any)}
                >
                  <IconComponent 
                    size={20} 
                    color={selectedType === type.id ? Colors.white : Colors.neutral[600]} 
                  />
                  <Text style={[
                    styles.typeText,
                    selectedType === type.id && styles.selectedTypeText
                  ]}>
                    {type.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionTitle}>{t('title')}</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder={t('enter_title')}
            placeholderTextColor={Colors.neutral[400]}
          />

          <Text style={styles.sectionTitle}>{t('description')}</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder={t('enter_description')}
            placeholderTextColor={Colors.neutral[400]}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <TouchableOpacity style={styles.uploadButton}>
            <Upload size={20} color={Colors.primary[500]} />
            <Text style={styles.uploadText}>{t('attach_file')}</Text>
          </TouchableOpacity>
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            title={t('save_record')}
            onPress={handleSave}
            disabled={!title.trim()}
            style={styles.saveButton}
          />
        </View>
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
    padding: Layout.spacing.sm,
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
  formCard: {
    padding: Layout.spacing.lg,
  },
  sectionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutral[800],
    marginBottom: Layout.spacing.sm,
    marginTop: Layout.spacing.md,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.spacing.sm,
    marginBottom: Layout.spacing.md,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    backgroundColor: Colors.white,
  },
  selectedTypeButton: {
    backgroundColor: Colors.primary[500],
    borderColor: Colors.primary[500],
  },
  typeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[600],
    marginLeft: Layout.spacing.xs,
  },
  selectedTypeText: {
    color: Colors.white,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: Layout.borderRadius.md,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[800],
    backgroundColor: Colors.white,
    marginBottom: Layout.spacing.md,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.md,
    borderWidth: 2,
    borderColor: Colors.primary[300],
    borderStyle: 'dashed',
    borderRadius: Layout.borderRadius.md,
    backgroundColor: Colors.primary[50],
    marginTop: Layout.spacing.md,
  },
  uploadText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.primary[500],
    marginLeft: Layout.spacing.sm,
  },
  buttonContainer: {
    marginTop: Layout.spacing.lg,
  },
  saveButton: {
    marginBottom: Layout.spacing.xl,
  },
}); 