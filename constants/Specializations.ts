export interface Specialization {
  id: string;
  name: string;
  icon: string; // Icon name from Lucide
  description: string;
}

const specializations: Specialization[] = [
  {
    id: 'general-physician',
    name: 'General Physician',
    icon: 'stethoscope',
    description: 'Doctors who diagnose and treat a wide range of health conditions',
  },
  {
    id: 'pediatrician',
    name: 'Pediatrician',
    icon: 'baby',
    description: 'Specialists in child health and development',
  },
  {
    id: 'dermatologist',
    name: 'Dermatologist',
    icon: 'scan-face',
    description: 'Experts in skin, hair, and nail conditions',
  },
  {
    id: 'orthopedist',
    name: 'Orthopedist',
    icon: 'bone',
    description: 'Specialists in bones, joints, and muscles',
  },
  {
    id: 'cardiologist',
    name: 'Cardiologist',
    icon: 'heart-pulse',
    description: 'Experts in heart and cardiovascular health',
  },
  {
    id: 'neurologist',
    name: 'Neurologist',
    icon: 'brain',
    description: 'Specialists in brain and nervous system disorders',
  },
  {
    id: 'gynecologist',
    name: 'Gynecologist',
    icon: 'female',
    description: 'Experts in women reproductive health',
  },
  {
    id: 'psychiatrist',
    name: 'Psychiatrist',
    icon: 'brain-circuit',
    description: 'Specialists in mental health and behavioral disorders',
  },
  {
    id: 'ophthalmologist',
    name: 'Ophthalmologist',
    icon: 'eye',
    description: 'Experts in eye health and vision care',
  },
  {
    id: 'ent-specialist',
    name: 'ENT Specialist',
    icon: 'ear',
    description: 'Specialists in ear, nose, and throat conditions',
  },
  {
    id: 'dentist',
    name: 'Dentist',
    icon: 'tooth',
    description: 'Experts in oral health and dental care',
  },
  {
    id: 'nutritionist',
    name: 'Nutritionist',
    icon: 'apple',
    description: 'Specialists in diet, nutrition, and healthy eating',
  }
];

export default specializations;