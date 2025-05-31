import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { Mail, Lock, ArrowLeft, User, UserRound } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from '@/hooks/useTranslation';

export default function LoginScreen() {
  const { t } = useTranslation();
  const { signIn, isLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userType, setUserType] = useState<'patient' | 'doctor'>('patient');
  
  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setError('');
    
    try {
      // For demo purposes, we'll use the email to determine user type
      // In a real app, the user type would be determined by the API
      const mockEmail = userType === 'doctor' ? 'doctor@example.com' : 'patient@example.com';
      
      const success = await signIn(mockEmail, password);
      
      if (success) {
        router.replace('/(app)/(tabs)');
      } else {
        setError(t('error_login'));
      }
    } catch (err) {
      setError(t('error_generic'));
    }
  };
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push('/(app)/(tabs)')}
          >
            <ArrowLeft size={24} color={Colors.neutral[700]} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg' }} 
            style={styles.logo} 
          />
        </View>
        
        <Text style={styles.title}>{t('login')}</Text>
        <Text style={styles.subtitle}>{t('welcome')}</Text>
        
        <View style={styles.userTypeContainer}>
          <TouchableOpacity
            style={[
              styles.userTypeButton,
              userType === 'patient' && styles.activeUserType
            ]}
            onPress={() => setUserType('patient')}
          >
            <User 
              size={20} 
              color={userType === 'patient' ? Colors.white : Colors.neutral[600]} 
            />
            <Text
              style={[
                styles.userTypeText,
                userType === 'patient' && styles.activeUserTypeText
              ]}
            >
              {t('as_patient')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.userTypeButton,
              userType === 'doctor' && styles.activeUserType
            ]}
            onPress={() => setUserType('doctor')}
          >
            <UserRound 
              size={20} 
              color={userType === 'doctor' ? Colors.white : Colors.neutral[600]} 
            />
            <Text
              style={[
                styles.userTypeText,
                userType === 'doctor' && styles.activeUserTypeText
              ]}
            >
              {t('as_doctor')}
            </Text>
          </TouchableOpacity>
        </View>
        
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}
        
        <Input
          label={t('email')}
          placeholder={t('email')}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={<Mail size={20} color={Colors.neutral[400]} />}
        />
        
        <Input
          label={t('password')}
          placeholder={t('password')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          showPasswordToggle
          leftIcon={<Lock size={20} color={Colors.neutral[400]} />}
        />
        
        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>{t('forgot_password')}</Text>
        </TouchableOpacity>
        
        <Button
          title={t('login')}
          onPress={handleLogin}
          style={styles.loginButton}
          loading={isLoading}
          disabled={isLoading}
          fullWidth
        />
        
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>{t('no_account')} </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
            <Text style={styles.signupLink}>{t('signup')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Layout.spacing.lg,
    paddingBottom: Layout.spacing.xl,
  },
  header: {
    marginTop: Layout.spacing.xl,
    marginBottom: Layout.spacing.lg,
  },
  backButton: {
    padding: Layout.spacing.xs,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: Colors.neutral[800],
    marginBottom: Layout.spacing.sm,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[600],
    marginBottom: Layout.spacing.xl,
  },
  userTypeContainer: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.lg,
  },
  userTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.md,
    marginHorizontal: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.md,
    backgroundColor: Colors.neutral[100],
  },
  activeUserType: {
    backgroundColor: Colors.primary[500],
  },
  userTypeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[600],
    marginLeft: Layout.spacing.sm,
  },
  activeUserTypeText: {
    color: Colors.white,
  },
  errorText: {
    color: Colors.error[500],
    marginBottom: Layout.spacing.md,
    fontSize: 14,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: Layout.spacing.xl,
  },
  forgotPasswordText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary[500],
  },
  loginButton: {
    marginBottom: Layout.spacing.xl,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  signupLink: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary[500],
  },
});