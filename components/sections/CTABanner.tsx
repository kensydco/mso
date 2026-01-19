import React from 'react';
import { Button } from '@/components/ui/Button';

export function CTABanner() {
  return (
    <section className="relative py-24 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '30px 30px',
        }} />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Join Our Growing Team
        </h2>
        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10">
          Explore career opportunities across our portfolio of exceptional brands.
        </p>
        <Button href="/careers" variant="secondary" size="lg">
          VIEW OPEN POSITIONS
        </Button>
      </div>
    </section>
  );
}
