import { useState, useEffect, createContext, useContext, useRef } from 'react';
import { Platform } from 'react-native';
import { User, Doctor, Patient } from '@/types/user';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  signUp: (userData: Partial<User>, password: string) => Promise<boolean>;
  updateUser: (userData: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: async () => false,
  signOut: async () => {},
  signUp: async () => false,
  updateUser: async () => false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user && isMounted.current) {
        await loadUserProfile(session.user.id);
      } else if (isMounted.current) {
        setUser(null);
      }
      if (isMounted.current) {
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      // First check the profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;

      // Check if the user is a doctor
      const { data: doctor, error: doctorError } = await supabase
        .from('doctors')
        .select('*')
        .eq('auth_user_id', userId)
        .single();

      if (!doctorError && doctor) {
        const doctorUser: Doctor = {
          id: userId,
          email: profile.email,
          phone: doctor.phone_no || '',
          role: 'doctor',
          firstName: doctor.name.split(' ')[0],
          lastName: doctor.name.split(' ').slice(1).join(' '),
          profilePicture: doctor.image_url,
          specialization: doctor.specialty,
          experience: doctor.experience,
          qualifications: [],
          licenseNumber: doctor.rmp_registration_number || '',
          hospital: doctor.hospital_clinic,
          consultationFees: {
            video: doctor.consultation_fee,
            chat: Math.floor(doctor.consultation_fee * 0.7),
          },
          languages: doctor.languages || [],
          about: doctor.about,
          availability: [],
          rating: doctor.rating || 0,
          reviewCount: 0,
          isVerified: true,
          createdAt: profile.created_at,
          updatedAt: profile.updated_at,
        };
        if (isMounted.current) {
          setUser(doctorUser);
        }
      } else {
        // User is a patient
        const patientUser: Patient = {
          id: userId,
          email: profile.email || '',
          phone: profile.phone || '',
          role: 'patient',
          firstName: profile.name.split(' ')[0],
          lastName: profile.name.split(' ').slice(1).join(' '),
          profilePicture: profile.profile_picture,
          dateOfBirth: profile.date_of_birth,
          gender: profile.gender,
          bloodGroup: profile.blood_group,
          allergies: profile.allergies,
          chronicConditions: profile.chronic_conditions,
          createdAt: profile.created_at,
          updatedAt: profile.updated_at,
        };
        if (isMounted.current) {
          setUser(patientUser);
        }
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      if (isMounted.current) {
        setUser(null);
      }
    }
  };

  const value = {
    user,
    isLoading,
    signIn: async (email: string, password: string) => {
      try {
        if (isMounted.current) {
          setIsLoading(true);
        }
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        await loadUserProfile(data.user.id);
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
        if (isMounted.current) {
          setIsLoading(true);
        }
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
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
        if (isMounted.current) {
          setIsLoading(true);
        }

        // Register user with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: userData.email!,
          password: password,
        });

        if (authError) throw authError;

        // Create profile record
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user!.id,
            name: `${userData.firstName} ${userData.lastName}`,
            email: userData.email,
            phone: userData.phone,
          });

        if (profileError) throw profileError;

        // If registering as a doctor, create doctor record
        if (userData.role === 'doctor') {
          const { error: doctorError } = await supabase
            .from('doctors')
            .insert({
              auth_user_id: authData.user!.id,
              name: `${userData.firstName} ${userData.lastName}`,
              email: userData.email,
              phone_no: userData.phone,
              status: 'inactive', // Requires approval
            });

          if (doctorError) throw doctorError;
        }

        await loadUserProfile(authData.user!.id);
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

        const updates = {
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          phone: userData.phone,
          updated_at: new Date().toISOString(),
        };

        const { error: profileError } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', user.id);

        if (profileError) throw profileError;

        if (user.role === 'doctor') {
          const { error: doctorError } = await supabase
            .from('doctors')
            .update({
              name: `${userData.firstName} ${userData.lastName}`,
              email: userData.email,
              phone_no: userData.phone,
              updated_at: new Date().toISOString(),
            })
            .eq('auth_user_id', user.id);

          if (doctorError) throw doctorError;
        }

        await loadUserProfile(user.id);
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

export const useAuth = () => useContext(AuthContext);