import React from 'react';
import { BrandCard } from '@/components/ui/BrandCard';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { getActiveBrands } from '@/data/brands';

export function PortfolioPreview() {
  const activeBrands = getActiveBrands();
  const featuredBrands = activeBrands.slice(0, 4);

  return (
    <Section background="white" padding="lg">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-4">
          Our Portfolio
        </h2>
        <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          Discover the diverse brands we manage across fitness, healthcare, service, and technology.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {featuredBrands.map((brand, index) => (
          <div
            key={brand.slug}
            className="animate-on-scroll opacity-0"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <BrandCard brand={brand} />
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button href="/portfolio" variant="outline" size="lg">
          VIEW ALL BRANDS →
        </Button>
      </div>
    </Section>
  );
}
