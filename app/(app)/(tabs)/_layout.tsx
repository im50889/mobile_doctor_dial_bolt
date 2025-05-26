import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Calendar, Search, ClipboardList, Settings } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from '@/hooks/useTranslation';

export default function TabLayout() {
  const { user } = useAuth();
  const { t } = useTranslation();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary[500],
        tabBarInactiveTintColor: Colors.neutral[400],
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: Colors.neutral[200],
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('home'),
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="appointments"
        options={{
          title: t('appointments'),
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="find-doctors"
        options={{
          title: t('find_doctors'),
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
        }}
      />
      
      {user?.role === 'patient' ? (
        <Tabs.Screen
          name="medical-records"
          options={{
            title: t('medical_records'),
            tabBarIcon: ({ color, size }) => <ClipboardList size={size} color={color} />,
          }}
        />
      ) : (
        <Tabs.Screen
          name="patients"
          options={{
            title: t('patients'),
            tabBarIcon: ({ color, size }) => <ClipboardList size={size} color={color} />,
          }}
        />
      )}
      
      <Tabs.Screen
        name="settings"
        options={{
          title: t('settings'),
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}