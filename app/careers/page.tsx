import React from 'react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers | Kensyd Companies',
  description: 'Join the Kensyd Companies team. Explore career opportunities across our portfolio of exceptional brands.',
};

export default function CareersPage() {
  const benefits = [
    {
      icon: '📈',
      title: 'Growth Opportunities',
      description: 'Advance your career across multiple brands and industries with diverse growth pathways.',
    },
    {
      icon: '🌈',
      title: 'Diverse Portfolio',
      description: 'Work with a variety of brands across fitness, healthcare, service, and technology sectors.',
    },
    {
      icon: '🤝',
      title: 'Collaborative Culture',
      description: 'Join a supportive team that values innovation, excellence, and continuous improvement.',
    },
    {
      icon: '💼',
      title: 'Competitive Benefits',
      description: 'Enjoy comprehensive benefits packages designed to support your health and well-being.',
    },
  ];

  // Mock job listings - replace with actual GHL integration
  const jobListings = [
    {
      id: 1,
      title: 'Marketing Manager',
      brand: 'HOTWORX Collierville',
      location: 'Collierville, TN',
      type: 'Full-time',
      description: 'Lead marketing initiatives for our infrared fitness studio, developing campaigns that drive membership growth.',
    },
    {
      id: 2,
      title: 'Wound Care Specialist',
      brand: 'Precision Wound Management',
      location: 'Marion, AR',
      type: 'Full-time',
      description: 'Provide expert wound care treatment and management for patients with chronic and complex wounds.',
    },
    {
      id: 3,
      title: 'Customer Success Manager',
      brand: 'OurHealth Rx',
      location: 'Remote',
      type: 'Full-time',
      description: 'Ensure excellent patient experiences with our telehealth platform and drive customer satisfaction.',
    },
    {
      id: 4,
      title: 'Operations Coordinator',
      brand: 'Kensyd Companies HQ',
      location: 'Memphis, TN',
      type: 'Full-time',
      description: 'Support operational excellence across our portfolio brands with process improvements and coordination.',
    },
  ];

  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-32 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white overflow-hidden">
        {/* Dot grid background */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        {/* Careers graphic: team + growth chart */}
        <div className="absolute right-0 inset-y-0 flex items-center pr-4 lg:pr-12 opacity-[0.12] pointer-events-none hidden md:flex" aria-hidden="true">
          <svg width="340" height="320" viewBox="0 0 340 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Three people representing team */}
            <circle cx="80" cy="65" r="22" stroke="white" strokeWidth="2"/>
            <path d="M46 130C46 104 114 104 114 130V158H46V130Z" stroke="white" strokeWidth="2" fill="none"/>
            <circle cx="170" cy="45" r="28" stroke="white" strokeWidth="2.5"/>
            <path d="M130 118C130 89 210 89 210 118V150H130V118Z" stroke="white" strokeWidth="2.5" fill="none"/>
            <circle cx="260" cy="65" r="22" stroke="white" strokeWidth="2"/>
            <path d="M226 130C226 104 294 104 294 130V158H226V130Z" stroke="white" strokeWidth="2" fill="none"/>
            {/* Connector lines between people */}
            <line x1="114" y1="95" x2="142" y2="73" stroke="white" strokeWidth="1.5" strokeDasharray="5 3"/>
            <line x1="198" y1="73" x2="226" y2="95" stroke="white" strokeWidth="1.5" strokeDasharray="5 3"/>
            {/* Growth chart axes */}
            <line x1="30" y1="298" x2="315" y2="298" stroke="white" strokeWidth="2"/>
            <line x1="30" y1="298" x2="30" y2="178" stroke="white" strokeWidth="2"/>
            {/* Growth trend line */}
            <polyline points="30,285 80,268 135,250 195,228 260,205 315,178" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            {/* Arrow tip */}
            <path d="M306,170 L315,178 L308,188" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            {/* Small sparkle top-right */}
            <path d="M310 40 L313 50 L323 50 L315 57 L318 67 L310 60 L302 67 L305 57 L297 50 L307 50 Z" stroke="white" strokeWidth="1.5" fill="none"/>
          </svg>
        </div>

        {/* Left accent graphic */}
        <div className="absolute left-0 inset-y-0 flex items-center pl-4 lg:pl-12 opacity-[0.07] pointer-events-none hidden lg:flex" aria-hidden="true">
          <svg width="180" height="320" viewBox="0 0 180 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="90" cy="60" r="35" stroke="white" strokeWidth="2"/>
            <path d="M40 145C40 112 140 112 140 145V180H40V145Z" stroke="white" strokeWidth="2" fill="none"/>
            <circle cx="90" cy="240" r="20" stroke="white" strokeWidth="1.5"/>
            <line x1="90" y1="180" x2="90" y2="220" stroke="white" strokeWidth="1.5" strokeDasharray="4 3"/>
            <line x1="30" y1="290" x2="150" y2="290" stroke="white" strokeWidth="1.5"/>
            <line x1="90" y1="260" x2="90" y2="290" stroke="white" strokeWidth="1.5" strokeDasharray="4 3"/>
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Join Our Team</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Build your career with a growing portfolio of exceptional brands.
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <Section background="white" padding="lg">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[var(--color-primary)] mb-4">
            Why Work With Us
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Join a dynamic organization that values growth, innovation, and excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="text-center p-6 rounded-xl bg-[var(--color-surface)] hover:shadow-[var(--shadow-lg)] transition-shadow duration-300"
            >
              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-3">
                {benefit.title}
              </h3>
              <p className="text-[var(--color-text-secondary)]">{benefit.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Open Positions */}
      <Section background="gray" padding="lg">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[var(--color-primary)] mb-4">
            Open Positions
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Explore current opportunities across our portfolio.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {jobListings.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl p-8 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-[var(--color-primary)] mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 mb-3">
                    <span className="text-[var(--color-text-secondary)]">
                      🏢 {job.brand}
                    </span>
                    <span className="text-[var(--color-text-secondary)]">
                      📍 {job.location}
                    </span>
                    <span className="text-[var(--color-text-secondary)]">
                      ⏰ {job.type}
                    </span>
                  </div>
                  <p className="text-[var(--color-text-secondary)]">{job.description}</p>
                </div>
                <div className="md:ml-6">
                  <Button variant="primary" size="md">
                    APPLY NOW →
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* General Application */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)] rounded-xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Don't see the right fit?</h3>
            <p className="text-lg mb-6 text-white/90">
              We're always looking for talented individuals. Submit a general application and we'll keep you in mind for future opportunities.
            </p>
            <Button variant="secondary" size="lg">
              GENERAL APPLICATION
            </Button>
          </div>
        </div>
      </Section>

      {/* Culture Section */}
      <Section background="white" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[var(--color-primary)] mb-8">
            Our Culture
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed mb-6">
            At Kensyd Companies, we believe in creating an environment where talented individuals can thrive.
            Our culture emphasizes collaboration, continuous learning, and the pursuit of excellence.
          </p>
          <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed">
            Whether you're passionate about fitness, healthcare, service, or technology, you'll find opportunities
            to make a meaningful impact while building a rewarding career with us.
          </p>
        </div>
      </Section>
    </>
  );
}
