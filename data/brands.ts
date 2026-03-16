export interface Brand {
  slug: string;
  name: string;
  tagline: string;
  category: 'fitness' | 'healthcare' | 'service' | 'technology' | 'education' | 'telehealth';
  status: 'active' | 'coming-soon';
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
    logo: '/logos/hotworx.svg',
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
    logo: '/logos/hotworx.svg',
    colors: {
      primary: '#FF6B00',
      secondary: '#1A1A1A',
      accent: '#FFE5D0',
    },
    description: 'HOTWORX Ithaca brings the revolutionary infrared fitness experience to upstate New York. Our 24-hour studio offers the same cutting-edge virtually instructed infrared sauna and hot yoga workouts, combining heat, infrared energy, and exercise for maximum results.',
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
    tagline: 'Professional Power Washing & Exterior Cleaning',
    category: 'service',
    status: 'active',
    logo: '/logos/rolling-suds.svg',
    colors: {
      primary: '#0066CC',
      secondary: '#4DA6FF',
      accent: '#E6F2FF',
    },
    description: 'Rolling Suds provides professional power washing and exterior cleaning services for residential and commercial properties. Our expert team uses state-of-the-art equipment and eco-friendly solutions to restore and maintain the beauty of your property.',
    services: [
      'House Washing',
      'Roof Cleaning',
      'Concrete Cleaning',
      'Deck & Fence Restoration',
      'Commercial Pressure Washing',
      'Gutter Cleaning',
    ],
    contact: {
      website: 'https://rollingsudspowerwashing.com/collierville-southaven',
    },
    location: {
      city: 'Collierville',
      state: 'TN',
    },
  },
  {
    slug: 'precision-wound-management',
    name: 'Precision Wound Management',
    tagline: 'Advanced Wound Care Solutions',
    category: 'healthcare',
    status: 'active',
    logo: '/logos/pwm.svg',
    colors: {
      primary: '#1E3A5F',
      secondary: '#2A9D8F',
      accent: '#E8F4F2',
    },
    description: 'Precision Wound Management specializes in advanced wound care treatment and management. Our experienced healthcare professionals provide comprehensive care for chronic and complex wounds, utilizing the latest evidence-based practices and technologies.',
    services: [
      'Chronic Wound Care',
      'Diabetic Wound Treatment',
      'Surgical Wound Management',
      'Pressure Ulcer Treatment',
      'Vascular Wound Care',
      'Advanced Wound Therapies',
    ],
    contact: {
      website: 'https://pwmcare.com',
    },
    location: {
      city: 'Marion',
      state: 'AR',
    },
  },
  {
    slug: 'master-fit-club',
    name: 'Master Fit Club',
    tagline: 'Premium Fitness & Wellness',
    category: 'fitness',
    status: 'active',
    logo: '/logos/masterfit.svg',
    colors: {
      primary: '#D4AF37',
      secondary: '#1A1A1A',
      accent: '#FAF3E0',
    },
    description: 'Master Fit Club offers a premium fitness experience with state-of-the-art equipment, expert personal training, and a supportive community. Our holistic approach to health and wellness helps members achieve their fitness goals and maintain a balanced lifestyle.',
    services: [
      'Personal Training',
      'Group Fitness Classes',
      'Strength & Conditioning',
      'Cardio Training',
      'Nutrition Coaching',
      'Wellness Programs',
    ],
    contact: {
      website: 'https://masterfitclub.com',
    },
  },
  {
    slug: 'ourhealth-rx',
    name: 'OurHealth Rx',
    tagline: 'Digital-First Telehealth Solutions',
    category: 'telehealth',
    status: 'active',
    logo: '/logos/ourhealth.svg',
    colors: {
      primary: '#4A90D9',
      secondary: '#34C759',
      accent: '#E8F4F9',
    },
    description: 'OurHealth Rx provides convenient, accessible telehealth services that bring quality healthcare to your fingertips. Our platform connects patients with licensed healthcare providers for virtual consultations, prescriptions, and ongoing care management.',
    services: [
      'Virtual Consultations',
      'Online Prescriptions',
      'Chronic Care Management',
      'Mental Health Support',
      'Preventive Care',
      'Health Monitoring',
    ],
    contact: {
      website: 'https://ourhealthrx.com',
    },
  },
  {
    slug: 'campusfam',
    name: 'CampusFam',
    tagline: 'College Student Marketplace & Community',
    category: 'technology',
    status: 'coming-soon',
    logo: '/logos/campusfam.svg',
    colors: {
      primary: '#6B46C1',
      secondary: '#F97316',
      accent: '#F3F0FF',
    },
    description: 'CampusFam is a revolutionary marketplace platform designed exclusively for college students. Buy, sell, and trade textbooks, furniture, and other essentials within your campus community. Connect with fellow students and make campus life more affordable and sustainable.',
    services: [
      'Student Marketplace',
      'Textbook Exchange',
      'Campus Community',
      'Secure Transactions',
      'Campus Events',
      'Student Services Directory',
    ],
    contact: {},
  },
  {
    slug: 'trezevant-alumni',
    name: 'Trezevant Alumni Network',
    tagline: 'Connecting Generations of Bears',
    category: 'education',
    status: 'coming-soon',
    logo: '/logos/trezevant.svg',
    colors: {
      primary: '#800020',
      secondary: '#D4AF37',
      accent: '#FEF5E7',
    },
    description: 'The Trezevant Alumni Network brings together graduates from all generations to celebrate our shared heritage, support current students, and strengthen the Trezevant community. Join us in preserving our legacy and creating new opportunities for future Bears.',
    services: [
      'Alumni Directory',
      'Networking Events',
      'Mentorship Programs',
      'Scholarship Fund',
      'Career Support',
      'Community Outreach',
    ],
    contact: {},
  },
];

export const getBrandBySlug = (slug: string): Brand | undefined => {
  return brands.find((brand) => brand.slug === slug);
};

export const getBrandsByCategory = (category: Brand['category']): Brand[] => {
  return brands.filter((brand) => brand.category === category);
};

export const getActiveBrands = (): Brand[] => {
  return brands.filter((brand) => brand.status === 'active');
};

export const getComingSoonBrands = (): Brand[] => {
  return brands.filter((brand) => brand.status === 'coming-soon');
};
