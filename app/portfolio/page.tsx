'use client';

import React, { useState } from 'react';
import { BrandCard } from '@/components/ui/BrandCard';
import { brands, Brand } from '@/data/brands';
import { cn } from '@/lib/utils';

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'service', label: 'Service' },
    { value: 'telehealth', label: 'Telehealth' },
    { value: 'technology', label: 'Technology' },
    { value: 'education', label: 'Education' },
  ];

  const filteredBrands =
    activeFilter === 'all'
      ? brands
      : brands.filter((brand) => brand.category === activeFilter);

  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-32 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Portfolio</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Discover the diverse brands we manage across fitness, healthcare, service, and technology.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setActiveFilter(category.value)}
                className={cn(
                  'px-6 py-3 rounded-lg font-semibold transition-all duration-200',
                  activeFilter === category.value
                    ? 'bg-[var(--color-secondary)] text-white shadow-[var(--shadow-md)]'
                    : 'bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-border)]'
                )}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Brand Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredBrands.map((brand) => (
              <BrandCard key={brand.slug} brand={brand} />
            ))}
          </div>

          {/* Empty State */}
          {filteredBrands.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-[var(--color-text-secondary)]">
                No brands found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
