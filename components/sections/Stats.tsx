'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Section } from '@/components/ui/Section';

interface Stat {
  number: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  {
    number: '8',
    label: 'BRANDS',
    description: 'Under active management',
  },
  {
    number: '4',
    label: 'INDUSTRIES',
    description: 'Fitness, Healthcare, Service, Technology',
  },
  {
    number: '3+',
    label: 'STATES',
    description: 'Regional presence',
  },
  {
    number: '100%',
    label: 'DEDICATION',
    description: 'To operational excellence',
  },
];

export function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <Section background="gray" padding="lg">
      <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`transform transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="text-5xl md:text-6xl font-bold text-[var(--color-secondary)] mb-4">
              {stat.number}
            </div>
            <div className="text-sm font-semibold text-[var(--color-primary)] mb-2 tracking-wider">
              {stat.label}
            </div>
            <div className="text-[var(--color-text-secondary)] text-sm">
              {stat.description}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
