/**
 * Careers Page - Corporate Monumentalism Design
 * Job listings, culture section, benefits
 */

import { Link } from 'wouter';
import { MapPin, Briefcase, Clock, ArrowRight, Users, Heart, TrendingUp, Zap } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

// Placeholder job data
const jobs = [
  {
    id: 1,
    title: 'Studio Manager',
    brand: 'HOTWORX Collierville',
    location: 'Collierville, TN',
    type: 'Full-time',
    category: 'Management',
  },
  {
    id: 2,
    title: 'Fitness Consultant',
    brand: 'HOTWORX Ithaca',
    location: 'Ithaca, NY',
    type: 'Full-time',
    category: 'Sales',
  },
  {
    id: 3,
    title: 'Wound Care Specialist',
    brand: 'Precision Wound Management',
    location: 'Marion, AR',
    type: 'Full-time',
    category: 'Healthcare',
  },
  {
    id: 4,
    title: 'Operations Technician',
    brand: 'Rolling Suds',
    location: 'Collierville-Southaven',
    type: 'Full-time',
    category: 'Operations',
  },
  {
    id: 5,
    title: 'Marketing Coordinator',
    brand: 'Kensyd Companies',
    location: 'Memphis, TN',
    type: 'Full-time',
    category: 'Marketing',
  },
  {
    id: 6,
    title: 'Telehealth Nurse Practitioner',
    brand: 'OurHealth Rx',
    location: 'Remote',
    type: 'Full-time',
    category: 'Healthcare',
  },
];

const benefits = [
  {
    icon: Heart,
    title: 'Health & Wellness',
    description: 'Comprehensive medical, dental, and vision coverage for you and your family.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Opportunities',
    description: 'Career development programs and advancement opportunities across our portfolio.',
  },
  {
    icon: Users,
    title: 'Team Culture',
    description: 'Collaborative environment with regular team events and celebrations.',
  },
  {
    icon: Zap,
    title: 'Work-Life Balance',
    description: 'Flexible schedules and paid time off to help you recharge.',
  },
];

const categories = ['All Positions', 'Management', 'Sales', 'Healthcare', 'Operations', 'Marketing'];

export default function Careers() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: benefitsRef, isVisible: benefitsVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/careers-hero.jpg"
            alt="Team collaboration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/70 to-[#0F172A]/50" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 animate-fade-in-up">
              Join Our Team
            </h1>
            <p className="text-xl text-[#CBD5E1] mb-8 animate-fade-in-up-delay-1">
              Build your career with a company dedicated to growth, innovation, 
              and making a positive impact in our communities.
            </p>
            <a
              href="#open-positions"
              className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 animate-fade-in-up-delay-2"
            >
              View Open Positions
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="container">
          <div
            ref={benefitsRef}
            className={cn(
              'text-center mb-12 transition-all duration-700',
              benefitsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[#0F172A] mb-4">
              Why Work With Us
            </h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
              We invest in our people because they are the foundation of our success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className={cn(
                    'bg-white rounded-xl p-6 border border-[#E2E8F0] transition-all duration-500',
                    benefitsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#3B82F6]" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-[#0F172A] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-[#64748B]">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section id="open-positions" className="py-20">
        <div className="container">
          <div
            ref={ref}
            className={cn(
              'mb-12 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[#0F172A] mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-[#64748B]">
              Find your next opportunity across our portfolio of brands.
            </p>
          </div>

          {/* Category Filters */}
          <div
            className={cn(
              'flex flex-wrap gap-3 mb-8 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            {categories.map((category, index) => (
              <button
                key={category}
                className={cn(
                  'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200',
                  index === 0
                    ? 'bg-[#3B82F6] text-white'
                    : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#0F172A]'
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Job Cards */}
          <div className="space-y-4">
            {jobs.map((job, index) => (
              <Link key={job.id} href={`/careers/${job.id}`}>
                <div
                  className={cn(
                    'group bg-white rounded-xl p-6 border border-[#E2E8F0] hover:border-[#3B82F6]/30 hover:shadow-lg transition-all duration-300',
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  )}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-display font-semibold text-lg text-[#0F172A] group-hover:text-[#3B82F6] transition-colors mb-1">
                        {job.title}
                      </h3>
                      <p className="text-[#64748B] text-sm mb-3">
                        {job.brand}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-[#94A3B8]">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-4 h-4" />
                          {job.category}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[#3B82F6] font-medium">
                      Apply Now
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* No Jobs CTA */}
          <div className="mt-12 text-center p-8 bg-[#F8FAFC] rounded-2xl">
            <h3 className="font-display font-semibold text-xl text-[#0F172A] mb-2">
              Don't see the right fit?
            </h3>
            <p className="text-[#64748B] mb-4">
              We're always looking for talented individuals. Send us your resume.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[#3B82F6] hover:text-[#2563EB] font-medium transition-colors"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
