import { useState } from 'react';
import { Appointment } from '@/types/user';
import { useAuth } from './useAuth';

// Sample mock data for appointments
const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '2',
    doctorId: '1',
    date: '2025-07-15',
    timeSlot: {
      startTime: '10:00',
      endTime: '10:30'
    },
    type: 'video',
    status: 'scheduled',
    symptoms: 'Persistent headache and mild fever',
    paymentStatus: 'completed',
    createdAt: '2025-07-10T08:30:00Z',
    updatedAt: '2025-07-10T08:30:00Z'
  },
  {
    id: '2',
    patientId: '2',
    doctorId: '3',
    date: '2025-07-18',
    timeSlot: {
      startTime: '14:00',
      endTime: '14:30'
    },
    type: 'chat',
    status: 'scheduled',
    symptoms: 'Skin rash and itching',
    paymentStatus: 'pending',
    createdAt: '2025-07-11T15:45:00Z',
    updatedAt: '2025-07-11T15:45:00Z'
  },
  {
    id: '3',
    patientId: '2',
    doctorId: '5',
    date: '2025-07-05',
    timeSlot: {
      startTime: '11:30',
      endTime: '12:00'
    },
    type: 'video',
    status: 'completed',
    symptoms: 'Lower back pain',
    prescription: {
      id: 'p1',
      appointmentId: '3',
      doctorId: '5',
      patientId: '2',
      medications: [
        {
          name: 'Ibuprofen',
          dosage: '400mg',
          frequency: 'Twice daily',
          duration: '5 days',
          notes: 'Take after meals'
        },
        {
          name: 'Muscle relaxant',
          dosage: '5mg',
          frequency: 'Once daily',
          duration: '3 days',
          notes: 'Take before bedtime'
        }
      ],
      instructions: 'Apply heat pack to affected area. Avoid heavy lifting for a week.',
      followUpDate: '2025-07-19',
      createdAt: '2025-07-05T12:15:00Z'
    },
    paymentStatus: 'completed',
    createdAt: '2025-07-01T09:20:00Z',
    updatedAt: '2025-07-05T12:15:00Z'
  }
];

export function useAppointments() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get user appointments
  const getUserAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be an API call
      // For now, we're filtering the mock data based on user role
      if (!user) {
        return [];
      }
      
      if (user.role === 'patient') {
        return mockAppointments.filter(appt => appt.patientId === user.id);
      } else if (user.role === 'doctor') {
        return mockAppointments.filter(appt => appt.doctorId === user.id);
      }
      
      return [];
    } catch (err) {
      setError('Failed to load appointments');
      return [];
    } finally {
      setLoading(false);
    }
  };
  
  // Book a new appointment
  const bookAppointment = async (appointmentData: Partial<Appointment>): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be an API call to create an appointment
      console.log('Booking appointment:', appointmentData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return true;
    } catch (err) {
      setError('Failed to book appointment');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Cancel an appointment
  const cancelAppointment = async (appointmentId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be an API call to cancel an appointment
      console.log('Cancelling appointment:', appointmentId);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return true;
    } catch (err) {
      setError('Failed to cancel appointment');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    getUserAppointments,
    bookAppointment,
    cancelAppointment,
    loading,
    error
  };
}