import React from 'react';
import { Section } from '@/components/ui/Section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Kensyd Companies',
  description: 'Learn about Kensyd Companies, our mission, values, and approach to building exceptional brands.',
};

export default function AboutPage() {
  const values = [
    {
      icon: '🎯',
      title: 'Excellence',
      description: 'We strive for operational excellence in everything we do, from brand management to customer service.',
    },
    {
      icon: '🤝',
      title: 'Partnership',
      description: 'We build strong partnerships with our brands, supporting their growth while respecting their unique identities.',
    },
    {
      icon: '📈',
      title: 'Growth',
      description: 'We focus on sustainable, long-term growth that creates value for all stakeholders.',
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'We embrace innovation and encourage our brands to adopt new technologies and best practices.',
    },
    {
      icon: '🌟',
      title: 'Impact',
      description: 'We believe in building brands that make a meaningful impact in the communities they serve.',
    },
    {
      icon: '🔄',
      title: 'Sustainability',
      description: 'We are committed to sustainable business practices that benefit our brands, communities, and environment.',
    },
  ];

  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-32 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white overflow-hidden">
        {/* Dot grid background */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        {/* About graphic: corporate building with portfolio network */}
        <div className="absolute right-0 inset-y-0 flex items-center pr-4 lg:pr-12 opacity-[0.12] pointer-events-none hidden md:flex" aria-hidden="true">
          <svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Main building / HQ */}
            <rect x="110" y="75" width="100" height="185" stroke="white" strokeWidth="2" fill="none"/>
            {/* Roof */}
            <polygon points="110,75 160,35 210,75" stroke="white" strokeWidth="2" fill="none"/>
            {/* Door */}
            <rect x="138" y="210" width="44" height="50" rx="2" stroke="white" strokeWidth="1.5" fill="none"/>
            {/* Windows row 1 */}
            <rect x="125" y="95" width="22" height="22" rx="2" stroke="white" strokeWidth="1.5" fill="none"/>
            <rect x="173" y="95" width="22" height="22" rx="2" stroke="white" strokeWidth="1.5" fill="none"/>
            {/* Windows row 2 */}
            <rect x="125" y="133" width="22" height="22" rx="2" stroke="white" strokeWidth="1.5" fill="none"/>
            <rect x="173" y="133" width="22" height="22" rx="2" stroke="white" strokeWidth="1.5" fill="none"/>
            {/* Windows row 3 */}
            <rect x="125" y="171" width="22" height="22" rx="2" stroke="white" strokeWidth="1.5" fill="none"/>
            <rect x="173" y="171" width="22" height="22" rx="2" stroke="white" strokeWidth="1.5" fill="none"/>
            {/* Portfolio brand nodes */}
            <circle cx="42" cy="120" r="18" stroke="white" strokeWidth="1.5" fill="none"/>
            <line x1="60" y1="120" x2="110" y2="130" stroke="white" strokeWidth="1.5" strokeDasharray="5 3"/>
            <circle cx="278" cy="120" r="18" stroke="white" strokeWidth="1.5" fill="none"/>
            <line x1="210" y1="130" x2="260" y2="120" stroke="white" strokeWidth="1.5" strokeDasharray="5 3"/>
            <circle cx="42" cy="220" r="14" stroke="white" strokeWidth="1.5" fill="none"/>
            <line x1="110" y1="230" x2="56" y2="224" stroke="white" strokeWidth="1.5" strokeDasharray="5 3"/>
            <circle cx="278" cy="220" r="14" stroke="white" strokeWidth="1.5" fill="none"/>
            <line x1="210" y1="230" x2="264" y2="224" stroke="white" strokeWidth="1.5" strokeDasharray="5 3"/>
            <circle cx="160" cy="308" r="14" stroke="white" strokeWidth="1.5" fill="none"/>
            <line x1="160" y1="260" x2="160" y2="294" stroke="white" strokeWidth="1.5" strokeDasharray="5 3"/>
            {/* Small dots inside nodes */}
            <circle cx="42" cy="120" r="4" fill="white" fillOpacity="0.6"/>
            <circle cx="278" cy="120" r="4" fill="white" fillOpacity="0.6"/>
            <circle cx="42" cy="220" r="4" fill="white" fillOpacity="0.6"/>
            <circle cx="278" cy="220" r="4" fill="white" fillOpacity="0.6"/>
            <circle cx="160" cy="308" r="4" fill="white" fillOpacity="0.6"/>
          </svg>
        </div>

        {/* Left accent */}
        <div className="absolute left-0 inset-y-0 flex items-center pl-4 lg:pl-12 opacity-[0.07] pointer-events-none hidden lg:flex" aria-hidden="true">
          <svg width="160" height="280" viewBox="0 0 160 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="80" cy="50" r="20" stroke="white" strokeWidth="1.5" fill="none"/>
            <line x1="80" y1="70" x2="80" y2="100" stroke="white" strokeWidth="1.5"/>
            <line x1="80" y1="100" x2="30" y2="140" stroke="white" strokeWidth="1.5"/>
            <line x1="80" y1="100" x2="130" y2="140" stroke="white" strokeWidth="1.5"/>
            <circle cx="30" cy="155" r="15" stroke="white" strokeWidth="1.5" fill="none"/>
            <circle cx="130" cy="155" r="15" stroke="white" strokeWidth="1.5" fill="none"/>
            <line x1="30" y1="170" x2="20" y2="210" stroke="white" strokeWidth="1.5"/>
            <line x1="30" y1="170" x2="60" y2="210" stroke="white" strokeWidth="1.5"/>
            <line x1="130" y1="170" x2="100" y2="210" stroke="white" strokeWidth="1.5"/>
            <line x1="130" y1="170" x2="140" y2="210" stroke="white" strokeWidth="1.5"/>
            <circle cx="20" cy="220" r="10" stroke="white" strokeWidth="1.5" fill="none"/>
            <circle cx="60" cy="220" r="10" stroke="white" strokeWidth="1.5" fill="none"/>
            <circle cx="100" cy="220" r="10" stroke="white" strokeWidth="1.5" fill="none"/>
            <circle cx="140" cy="220" r="10" stroke="white" strokeWidth="1.5" fill="none"/>
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Kensyd Companies</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Building a portfolio of exceptional brands through operational excellence and strategic support.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <Section background="white" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-3xl md:text-4xl font-medium text-[var(--color-primary)] leading-relaxed">
            "Our mission is to identify, acquire, and support high-potential brands across diverse industries,
            providing them with the resources, expertise, and operational infrastructure needed to achieve sustainable growth."
          </blockquote>
        </div>
      </Section>

      {/* Our Approach */}
      <Section background="gray" padding="lg">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-[var(--color-primary)] mb-12 text-center">
            Our Approach
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
                Centralized Management
              </h3>
              <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
                We provide centralized administrative, financial, and operational support across our portfolio,
                allowing each brand to focus on what they do best while benefiting from shared resources and expertise.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
                Brand Autonomy
              </h3>
              <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
                While we provide strategic guidance and operational support, we believe each brand should maintain
                its unique identity and culture. We empower our brands to make decisions that best serve their customers.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
                Strategic Growth
              </h3>
              <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
                We take a long-term view of growth, focusing on sustainable expansion through organic development,
                strategic partnerships, and selective acquisitions that complement our existing portfolio.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
                Operational Excellence
              </h3>
              <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
                We implement best-in-class systems, processes, and technologies across our portfolio,
                driving efficiency, consistency, and quality in every aspect of operations.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Core Values */}
      <Section background="white" padding="lg">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[var(--color-primary)] mb-4">
            Our Core Values
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            The principles that guide our decisions and actions every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="bg-[var(--color-surface)] rounded-xl p-8 text-center hover:shadow-[var(--shadow-lg)] transition-shadow duration-300"
            >
              <div className="text-6xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-3">
                {value.title}
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="gray" padding="md">
        <div className="bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)] rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Interested in Partnering With Us?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            We're always looking for exceptional brands to add to our portfolio.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-[var(--color-primary)] px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-colors"
          >
            GET IN TOUCH
          </a>
        </div>
      </Section>
    </>
  );
}
