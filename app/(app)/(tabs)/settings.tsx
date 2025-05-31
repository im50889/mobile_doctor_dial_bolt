import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Alert, Platform, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { router } from 'expo-router';
import { 
  User, 
  Bell, 
  Globe, 
  Shield, 
  FileText, 
  HelpCircle, 
  Info, 
  LogOut,
  ChevronRight,
  CreditCard
} from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Avatar from '@/components/UI/Avatar';
import Divider from '@/components/UI/Divider';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from '@/hooks/useTranslation';

type Styles = {
  container: ViewStyle;
  contentContainer: ViewStyle;
  header: ViewStyle;
  title: TextStyle;
  profileSection: ViewStyle;
  avatar: ViewStyle;
  profileInfo: ViewStyle;
  profileName: TextStyle;
  profileSubtitle: TextStyle;
  viewProfileText: TextStyle;
  settingsCard: ViewStyle;
  sectionTitle: TextStyle;
  settingItem: ViewStyle;
  settingIconContainer: ViewStyle;
  settingText: TextStyle;
  divider: ViewStyle;
  logoutButton: ViewStyle;
  logoutText: TextStyle;
  footer: ViewStyle;
  footerLogo: ImageStyle;
  footerText: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  contentContainer: {
    paddingBottom: Layout.spacing.xl,
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Layout.spacing.lg,
    marginBottom: Layout.spacing.md,
  },
  avatar: {
    marginRight: Layout.spacing.lg,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  profileSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    marginBottom: 8,
  },
  viewProfileText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary[500],
  },
  settingsCard: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.md,
    marginHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.md,
    padding: Layout.spacing.md,
  },
  sectionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutral[700],
    marginBottom: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.sm,
  },
  settingIconContainer: {
    width: 32,
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  settingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[800],
    flex: 1,
  },
  divider: {
    marginVertical: 0,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.error[50],
    marginHorizontal: Layout.spacing.lg,
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.xl,
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.error[500],
    marginLeft: Layout.spacing.sm,
  },
  footer: {
    alignItems: 'center',
  },
  footerLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: Layout.spacing.sm,
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[500],
  },
});

export default function SettingsScreen() {
  const { t, locale, setLocale } = useTranslation();
  const { user, signOut } = useAuth();
  
  const handleSignOut = async () => {
    if (Platform.OS === 'web') {
      await signOut();
      router.replace('/(auth)/login');
    } else {
      Alert.alert(
        t('logout'),
        t('logout_confirm'),
        [
          {
            text: t('cancel'),
            style: 'cancel',
          },
          {
            text: t('logout'),
            onPress: async () => {
              await signOut();
              router.replace('/(auth)/login');
            },
          },
        ]
      );
    }
  };
  
  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'hi' : 'en');
  };
  
  const renderSettingItem = (
    icon: React.ReactNode,
    title: string,
    onPress: () => void,
    showBorder = true
  ) => {
    return (
      <>
        <TouchableOpacity style={styles.settingItem} onPress={onPress}>
          <View style={styles.settingIconContainer}>{icon}</View>
          <Text style={styles.settingText}>{title}</Text>
          <ChevronRight size={20} color={Colors.neutral[400]} />
        </TouchableOpacity>
        {showBorder && <Divider style={styles.divider} />}
      </>
    );
  };
  
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{t('settings')}</Text>
      </View>
      
      <TouchableOpacity
        style={styles.profileSection}
        onPress={() => router.push('/(app)/profile-edit')}
      >
        <Avatar
          uri={user?.profilePicture}
          name={`${user?.firstName} ${user?.lastName}`}
          size={70}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text style={styles.profileSubtitle}>
            {user?.role === 'doctor' ? t('doctor') : t('patient')}
          </Text>
          <Text style={styles.viewProfileText}>{t('view_profile')}</Text>
        </View>
      </TouchableOpacity>
      
      <View style={styles.settingsCard}>
        <Text style={styles.sectionTitle}>{t('account_settings')}</Text>
        
        {renderSettingItem(
          <User size={20} color={Colors.primary[500]} />,
          t('personal_details'),
          () => router.push('/(app)/profile-edit')
        )}
        
        {renderSettingItem(
          <Bell size={20} color={Colors.primary[500]} />,
          t('notifications'),
          () => router.push('/(app)/notifications')
        )}
        
        {renderSettingItem(
          <Globe size={20} color={Colors.primary[500]} />,
          `${t('language')}: ${locale === 'en' ? t('english') : t('hindi')}`,
          toggleLanguage
        )}
        
        {renderSettingItem(
          <CreditCard size={20} color={Colors.primary[500]} />,
          t('payment_methods'),
          () => router.push('/(app)/payment-methods'),
          false
        )}
      </View>
      
      <View style={styles.settingsCard}>
        <Text style={styles.sectionTitle}>{t('more')}</Text>
        
        {renderSettingItem(
          <Shield size={20} color={Colors.primary[500]} />,
          t('privacy_policy'),
          () => router.push('/(app)/privacy-policy')
        )}
        
        {renderSettingItem(
          <FileText size={20} color={Colors.primary[500]} />,
          t('terms_of_service'),
          () => router.push('/(app)/terms')
        )}
        
        {renderSettingItem(
          <HelpCircle size={20} color={Colors.primary[500]} />,
          t('help_support'),
          () => router.push('/(app)/help')
        )}
        
        {renderSettingItem(
          <Info size={20} color={Colors.primary[500]} />,
          t('about_us'),
          () => router.push('/(app)/about'),
          false
        )}
      </View>
      
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleSignOut}
      >
        <LogOut size={20} color={Colors.error[500]} />
        <Text style={styles.logoutText}>{t('logout')}</Text>
      </TouchableOpacity>
      
      <View style={styles.footer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg' }}
          style={styles.footerLogo}
        />
        <Text style={styles.footerText}>Doctor Dial v1.0.0</Text>
      </View>
    </ScrollView>
  );
}