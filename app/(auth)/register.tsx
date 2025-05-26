import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Platform, 
  KeyboardAvoidingView, 
  ScrollView,
  Image
} from 'react-native';
import { router } from 'expo-router';
import { Mail, Lock, ArrowLeft, User, UserRound, Phone } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from '@/hooks/useTranslation';

export default function RegisterScreen() {
  const { t } = useTranslation();
  const { signUp, isLoading } = useAuth();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [userType, setUserType] = useState<'patient' | 'doctor'>('patient');
  
  const handleRegister = async () => {
    // Basic validation
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setError('');
    
    try {
      const success = await signUp(
        {
          firstName,
          lastName,
          email,
          phone,
          role: userType,
        },
        password
      );
      
      if (success) {
        router.replace('/(app)/(tabs)');
      } else {
        setError(t('error_signup'));
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
            onPress={() => router.back()}
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
        
        <Text style={styles.title}>{t('signup')}</Text>
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
        
        <View style={styles.nameContainer}>
          <Input
            label={t('first_name')}
            placeholder={t('first_name')}
            value={firstName}
            onChangeText={setFirstName}
            containerStyle={styles.nameInput}
          />
          
          <Input
            label={t('last_name')}
            placeholder={t('last_name')}
            value={lastName}
            onChangeText={setLastName}
            containerStyle={styles.nameInput}
          />
        </View>
        
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
          label={t('phone')}
          placeholder={t('phone')}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          leftIcon={<Phone size={20} color={Colors.neutral[400]} />}
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
        
        <Input
          label={t('confirm_password')}
          placeholder={t('confirm_password')}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          showPasswordToggle
          leftIcon={<Lock size={20} color={Colors.neutral[400]} />}
        />
        
        <Button
          title={t('signup')}
          onPress={handleRegister}
          style={styles.registerButton}
          loading={isLoading}
          disabled={isLoading}
          fullWidth
        />
        
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>{t('have_account')} </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text style={styles.loginLink}>{t('login')}</Text>
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
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameInput: {
    flex: 1,
    marginRight: Layout.spacing.md,
  },
  registerButton: {
    marginVertical: Layout.spacing.xl,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  loginLink: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary[500],
  },
  first_name: 'First Name',
  last_name: 'Last Name',
});