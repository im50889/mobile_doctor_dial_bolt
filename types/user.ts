export type UserRole = 'patient' | 'doctor' | 'admin';

export interface User {
  id: string;
  email: string;
  phone: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  bloodGroup?: string;
  allergies?: string[];
  chronicConditions?: string[];
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface Doctor extends User {
  role: 'doctor';
  specialization: string;
  experience: number;
  qualifications: string[];
  licenseNumber: string;
  hospital?: string;
  clinicAddress?: string;
  consultationFees: {
    video: number;
    chat: number;
  };
  languages: string[];
  about: string;
  availability: Availability[];
  rating: number;
  reviewCount: number;
  isVerified: boolean;
}

export interface Availability {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  slots: TimeSlot[];
}

export interface TimeSlot {
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  isBooked: boolean;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  timeSlot: {
    startTime: string;
    endTime: string;
  };
  type: 'video' | 'chat';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  symptoms?: string;
  notes?: string;
  prescription?: Prescription;
  paymentStatus: 'pending' | 'completed' | 'refunded';
  createdAt: string;
  updatedAt: string;
}

export interface Prescription {
  id: string;
  appointmentId: string;
  doctorId: string;
  patientId: string;
  medications: Medication[];
  instructions: string;
  followUpDate?: string;
  createdAt: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  type: 'prescription' | 'lab_report' | 'imaging' | 'other';
  title: string;
  description?: string;
  fileUrl?: string;
  createdAt: string;
  updatedAt: string;
}