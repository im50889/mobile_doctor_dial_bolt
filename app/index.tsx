import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function Index() {
  const { user, isLoading } = useAuth();
  
  // If loading, you might want to show a splash screen or loading indicator
  if (isLoading) {
    return null;
  }
  
  // If the user is logged in, redirect to the main app
  if (user) {
    return <Redirect href="/(app)/(tabs)" />;
  }
  
  // If the user is not logged in, redirect to the auth flow
  return <Redirect href="/(auth)/onboarding" />;
}