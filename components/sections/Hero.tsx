'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-secondary)]">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up opacity-0 [animation-delay:0ms] [animation-fill-mode:forwards]">
          KENSYD COMPANIES
        </h1>

        <h2 className="text-2xl md:text-4xl font-medium mb-8 animate-fade-in-up opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
          Building Brands That Matter
        </h2>

        <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-12 animate-fade-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
          A diversified holding company managing fitness, healthcare, service, and technology brands across the Mid-South.
        </p>

        <div className="animate-fade-in-up opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards]">
          <Button href="/portfolio" size="lg" variant="secondary">
            EXPLORE OUR PORTFOLIO
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
