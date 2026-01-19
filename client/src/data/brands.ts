/**
 * Brand Portfolio Data
 * Corporate Monumentalism Design System
 * Each brand has its own color scheme for dynamic theming
 */

export type BrandCategory = 'fitness' | 'healthcare' | 'service' | 'telehealth' | 'marketplace' | 'education';
export type BrandStatus = 'active' | 'coming-soon';

export interface Brand {
  slug: string;
  name: string;
  tagline: string;
  category: BrandCategory;
  status: BrandStatus;
  logo: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  description: string;
  services: string[];
  contact: {
    address?: string;
    phone?: string;
    email?: string;
    website?: string;
  };
  location?: {
    city: string;
    state: string;
  };
}

export const brands: Brand[] = [
  {
    slug: 'hotworx-collierville',
    name: 'HOTWORX Collierville',
    tagline: '24-Hour Infrared Fitness Studio',
    category: 'fitness',
    status: 'active',
    logo: '/logos/hotworx.png',
    colors: {
      primary: '#FF6B00',
      secondary: '#1A1A1A',
      accent: '#FFE5D0',
    },
    description: 'HOTWORX is a 24-hour infrared fitness studio that provides members with access to a variety of virtually instructed infrared sauna and hot yoga workouts. Experience the benefits of infrared energy and heat through 15-minute High-Intensity Interval Training sessions or 30-minute isometric workouts.',
    services: [
      'Hot Yoga',
      'Hot Pilates',
      'Hot Core',
      'Hot Cycle',
      'Hot Blast HIIT',
      'Hot Buns',
      'Hot Warrior',
    ],
    contact: {
      address: '875 W Poplar Ave, Suite 27, Collierville, TN 38017',
      phone: '(877) 468-9791',
      website: 'https://www.hotworx.net/studio/collierville',
    },
    location: {
      city: 'Collierville',
      state: 'TN',
    },
  },
  {
    slug: 'hotworx-ithaca',
    name: 'HOTWORX Ithaca',
    tagline: '24-Hour Infrared Fitness Studio',
    category: 'fitness',
    status: 'active',
    logo: '/logos/hotworx.png',
    colors: {
      primary: '#FF6B00',
      secondary: '#1A1A1A',
      accent: '#FFE5D0',
    },
    description: 'HOTWORX Ithaca brings the revolutionary infrared fitness experience to New York. Our 24-hour studio offers virtually instructed workouts in infrared saunas, combining the benefits of heat therapy with effective exercise routines.',
    services: [
      'Hot Yoga',
      'Hot Pilates',
      'Hot Core',
      'Hot Cycle',
      'Hot Blast HIIT',
      'Hot Buns',
      'Hot Warrior',
    ],
    contact: {
      phone: '(877) 468-9791',
      website: 'https://www.hotworx.net/studio/ithaca',
    },
    location: {
      city: 'Ithaca',
      state: 'NY',
    },
  },
  {
    slug: 'rolling-suds',
    name: 'Rolling Suds of Collierville-Southaven',
    tagline: 'The Power Washing Professionals',
    category: 'service',
    status: 'active',
    logo: '/logos/rolling-suds.png',
    colors: {
      primary: '#0066CC',
      secondary: '#4DA6FF',
      accent: '#E6F2FF',
    },
    description: 'Rolling Suds provides professional power washing services for residential and commercial properties. Our team delivers exceptional results using state-of-the-art equipment and eco-friendly cleaning solutions.',
    services: [
      'House Washing',
      'Driveway & Sidewalk Cleaning',
      'Deck & Patio Restoration',
      'Commercial Property Cleaning',
      'Roof Cleaning',
      'Gutter Cleaning',
    ],
    contact: {
      website: 'https://www.rollingsudspowerwashing.com/collierville-southaven',
    },
    location: {
      city: 'Collierville-Southaven',
      state: 'TN/MS',
    },
  },
  {
    slug: 'precision-wound-management',
    name: 'Precision Wound Management',
    tagline: 'Expert Wound Care Solutions',
    category: 'healthcare',
    status: 'active',
    logo: '/logos/precision-wound.png',
    colors: {
      primary: '#1E3A5F',
      secondary: '#2A9D8F',
      accent: '#E8F4F2',
    },
    description: 'Precision Wound Management provides specialized wound care services with a focus on advanced treatment protocols and patient-centered care. Our experienced team delivers comprehensive wound management solutions.',
    services: [
      'Chronic Wound Care',
      'Diabetic Wound Treatment',
      'Surgical Wound Management',
      'Pressure Ulcer Care',
      'Venous Ulcer Treatment',
      'Wound Assessment & Consultation',
    ],
    contact: {
      website: 'https://www.pwmcare.com',
    },
    location: {
      city: 'Marion',
      state: 'AR',
    },
  },
  {
    slug: 'master-fit-club',
    name: 'Master Fit Club',
    tagline: 'Fitness Loves Company',
    category: 'fitness',
    status: 'active',
    logo: '/logos/master-fit-club.jpg',
    colors: {
      primary: '#D4AF37',
      secondary: '#1A1A1A',
      accent: '#FFF8E7',
    },
    description: 'Master Fit Club is a comprehensive fitness platform designed to help individuals achieve their health and wellness goals. Our innovative approach combines personalized training with community support.',
    services: [
      'Personal Training',
      'Group Fitness Classes',
      'Nutrition Coaching',
      'Fitness Assessments',
      'Mobile App Training',
      'Community Challenges',
    ],
    contact: {
      website: 'https://www.masterfitclub.com',
    },
  },
  {
    slug: 'ourhealth-rx',
    name: 'OurHealth Rx',
    tagline: 'Healthcare Made Accessible',
    category: 'telehealth',
    status: 'active',
    logo: '/logos/ourhealth-rx.jpg',
    colors: {
      primary: '#4A90D9',
      secondary: '#34C759',
      accent: '#E8F5E9',
    },
    description: 'OurHealth Rx provides accessible telehealth services, connecting patients with healthcare professionals from the comfort of their homes. We make quality healthcare convenient and affordable.',
    services: [
      'Virtual Consultations',
      'Prescription Management',
      'Chronic Care Management',
      'Mental Health Services',
      'Preventive Care',
      'Health Monitoring',
    ],
    contact: {
      website: 'https://www.ourhealthrx.com',
    },
  },
  {
    slug: 'campusfam',
    name: 'CampusFam',
    tagline: 'Connecting Campus Communities',
    category: 'marketplace',
    status: 'coming-soon',
    logo: '/logos/campusfam.svg',
    colors: {
      primary: '#6B46C1',
      secondary: '#F97316',
      accent: '#F3E8FF',
    },
    description: 'CampusFam is an innovative marketplace platform designed to connect college students with resources, services, and community. Coming soon to campuses nationwide.',
    services: [
      'Student Marketplace',
      'Campus Services',
      'Community Networking',
      'Event Discovery',
    ],
    contact: {},
  },
  {
    slug: 'trezevant-alumni',
    name: 'Trezevant Alumni Network',
    tagline: 'Connecting Generations of Excellence',
    category: 'education',
    status: 'coming-soon',
    logo: '/logos/trezevant-alumni.svg',
    colors: {
      primary: '#800020',
      secondary: '#D4AF37',
      accent: '#FDF2F4',
    },
    description: 'The Trezevant Alumni Network connects graduates across generations, fostering mentorship, networking, and community engagement. Coming soon.',
    services: [
      'Alumni Directory',
      'Mentorship Programs',
      'Networking Events',
      'Scholarship Opportunities',
    ],
    contact: {},
  },
];

export const categories: { value: BrandCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Brands' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'telehealth', label: 'Telehealth' },
  { value: 'service', label: 'Service' },
  { value: 'marketplace', label: 'Technology' },
  { value: 'education', label: 'Education' },
];

export const getBrandBySlug = (slug: string): Brand | undefined => {
  return brands.find(brand => brand.slug === slug);
};

export const getBrandsByCategory = (category: BrandCategory | 'all'): Brand[] => {
  if (category === 'all') return brands;
  return brands.filter(brand => brand.category === category);
};

export const getActiveBrands = (): Brand[] => {
  return brands.filter(brand => brand.status === 'active');
};

export const getComingSoonBrands = (): Brand[] => {
  return brands.filter(brand => brand.status === 'coming-soon');
};
