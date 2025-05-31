import { useState, useEffect, createContext, useContext, useRef } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { User, Doctor, Patient } from '@/types/user';

// Mock storage for web platform
const webStorage = new Map<string, string>();

// Interface for the auth context
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  signUp: (userData: Partial<User>, password: string) => Promise<boolean>;
  updateUser: (userData: Partial<User>) => Promise<boolean>;
}

// Create the context
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: async () => false,
  signOut: async () => {},
  signUp: async () => false,
  updateUser: async () => false,
});

// Storage key
const USER_STORAGE_KEY = 'doctor_dial_user';
const TOKEN_STORAGE_KEY = 'doctor_dial_token';

// Helper function for storage operations
const saveToStorage = async (key: string, value: string) => {
  if (Platform.OS === 'web') {
    webStorage.set(key, value);
    return;
  }
  await SecureStore.setItemAsync(key, value);
};

const getFromStorage = async (key: string) => {
  if (Platform.OS === 'web') {
    return webStorage.get(key) || null;
  }
  return await SecureStore.getItemAsync(key);
};

const removeFromStorage = async (key: string) => {
  if (Platform.OS === 'web') {
    webStorage.delete(key);
    return;
  }
  await SecureStore.deleteItemAsync(key);
};

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Check if user is logged in on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getFromStorage(USER_STORAGE_KEY);
        if (userData && isMounted.current) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        if (isMounted.current) {
          setIsLoading(false);
        }
      }
    };

    loadUser();
  }, []);

  const value = {
    user,
    isLoading,
    signIn: async (email: string, password: string) => {
      try {
        setIsLoading(true);
        
        // Mock API call - Replace with actual API integration
        // Simulating successful login with mock data based on email
        const isDoctor = email.includes('doctor');
        
        let mockUser: User;
        
        if (isDoctor) {
          mockUser = {
            id: '1',
            email: email,
            phone: '+919876543210',
            role: 'doctor',
            firstName: 'Dr. Anil',
            lastName: 'Kumar',
            profilePicture: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          } as Doctor;
        } else {
          mockUser = {
            id: '2',
            email: email,
            phone: '+919876543211',
            role: 'patient',
            firstName: 'Priya',
            lastName: 'Sharma',
            profilePicture: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          } as Patient;
        }
        
        // Save user to storage
        await saveToStorage(USER_STORAGE_KEY, JSON.stringify(mockUser));
        // Save token (mock)
        await saveToStorage(TOKEN_STORAGE_KEY, 'mock_token_' + Date.now());
        
        if (isMounted.current) {
          setUser(mockUser);
        }
        return true;
      } catch (error) {
        console.error('Login failed:', error);
        return false;
      } finally {
        if (isMounted.current) {
          setIsLoading(false);
        }
      }
    },
    signOut: async () => {
      try {
        setIsLoading(true);
        await removeFromStorage(USER_STORAGE_KEY);
        await removeFromStorage(TOKEN_STORAGE_KEY);
        if (isMounted.current) {
          setUser(null);
        }
      } catch (error) {
        console.error('Sign out failed:', error);
      } finally {
        if (isMounted.current) {
          setIsLoading(false);
        }
      }
    },
    signUp: async (userData: Partial<User>, password: string) => {
      try {
        setIsLoading(true);
        
        // Mock API call - Replace with actual API integration
        const mockUser: User = {
          id: Date.now().toString(),
          email: userData.email || '',
          phone: userData.phone || '',
          role: userData.role || 'patient',
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...userData
        };
        
        // Save user to storage
        await saveToStorage(USER_STORAGE_KEY, JSON.stringify(mockUser));
        // Save token (mock)
        await saveToStorage(TOKEN_STORAGE_KEY, 'mock_token_' + Date.now());
        
        if (isMounted.current) {
          setUser(mockUser);
        }
        return true;
      } catch (error) {
        console.error('Sign up failed:', error);
        return false;
      } finally {
        if (isMounted.current) {
          setIsLoading(false);
        }
      }
    },
    updateUser: async (userData: Partial<User>) => {
      try {
        if (!user) return false;
        
        const updatedUser = { ...user, ...userData, updatedAt: new Date().toISOString() };
        
        // Save updated user to storage
        await saveToStorage(USER_STORAGE_KEY, JSON.stringify(updatedUser));
        
        if (isMounted.current) {
          setUser(updatedUser);
        }
        return true;
      } catch (error) {
        console.error('Update user failed:', error);
        return false;
      }
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);