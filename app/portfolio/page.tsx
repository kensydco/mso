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
      <section className="relative py-32 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white overflow-hidden">
        {/* Dot grid background */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        {/* Portfolio graphic: grid of brand cards with category icons */}
        <div className="absolute right-0 inset-y-0 flex items-center pr-4 lg:pr-12 opacity-[0.12] pointer-events-none hidden md:flex" aria-hidden="true">
          <svg width="330" height="310" viewBox="0 0 330 310" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Grid of brand cards — 3 columns × 2 rows */}
            {/* Row 1 */}
            <rect x="18" y="30" width="85" height="95" rx="8" stroke="white" strokeWidth="2" fill="none"/>
            <rect x="123" y="30" width="85" height="95" rx="8" stroke="white" strokeWidth="2" fill="none"/>
            <rect x="228" y="30" width="85" height="95" rx="8" stroke="white" strokeWidth="2" fill="none"/>
            {/* Row 2 */}
            <rect x="18" y="145" width="85" height="95" rx="8" stroke="white" strokeWidth="2" fill="none"/>
            <rect x="123" y="145" width="85" height="95" rx="8" stroke="white" strokeWidth="2" fill="none"/>
            <rect x="228" y="145" width="85" height="95" rx="8" stroke="white" strokeWidth="2" fill="none"/>
            {/* Card 1: Fitness — lightning bolt */}
            <path d="M68 55 L55 78 L65 78 L53 100 L68 73 L58 73 Z" stroke="white" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
            {/* Card 2: Healthcare — cross */}
            <line x1="165" y1="62" x2="165" y2="92" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="150" y1="77" x2="180" y2="77" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            {/* Card 3: Service — wrench */}
            <path d="M255 60 Q265 50 275 60 L280 75 L270 85 L255 75 Z" stroke="white" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
            <line x1="263" y1="83" x2="252" y2="98" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            {/* Card 4: Technology — circuit/chip */}
            <rect x="46" y="170" width="30" height="30" rx="3" stroke="white" strokeWidth="1.5" fill="none"/>
            <line x1="46" y1="178" x2="38" y2="178" stroke="white" strokeWidth="1.5"/>
            <line x1="46" y1="190" x2="38" y2="190" stroke="white" strokeWidth="1.5"/>
            <line x1="76" y1="178" x2="84" y2="178" stroke="white" strokeWidth="1.5"/>
            <line x1="76" y1="190" x2="84" y2="190" stroke="white" strokeWidth="1.5"/>
            <line x1="54" y1="170" x2="54" y2="162" stroke="white" strokeWidth="1.5"/>
            <line x1="66" y1="170" x2="66" y2="162" stroke="white" strokeWidth="1.5"/>
            <line x1="54" y1="200" x2="54" y2="208" stroke="white" strokeWidth="1.5"/>
            <line x1="66" y1="200" x2="66" y2="208" stroke="white" strokeWidth="1.5"/>
            {/* Card 5: Education — graduation cap */}
            <polygon points="165,167 140,182 165,197 190,182" stroke="white" strokeWidth="1.5" fill="none"/>
            <line x1="165" y1="197" x2="165" y2="215" stroke="white" strokeWidth="1.5"/>
            <path d="M155 215 Q165 220 175 215" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <line x1="190" y1="182" x2="190" y2="198" stroke="white" strokeWidth="1.5"/>
            <circle cx="190" cy="201" r="3" fill="white" fillOpacity="0.8"/>
            {/* Card 6: Telehealth — heart pulse */}
            <path d="M246 192 L246 172 L256 172 L261 162 L266 182 L271 175 L281 175 L281 192 Z" stroke="white" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
            {/* Briefcase icon at top center (portfolio concept) */}
            <rect x="133" y="4" width="65" height="20" rx="4" stroke="white" strokeWidth="1.5" fill="none"/>
            <path d="M148 4 L148 0" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M183 4 L183 0" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="148" y1="0" x2="183" y2="0" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            {/* Bottom label lines */}
            <line x1="18" y1="260" x2="103" y2="260" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
            <line x1="123" y1="260" x2="208" y2="260" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
            <line x1="228" y1="260" x2="313" y2="260" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
          </svg>
        </div>

        {/* Left accent */}
        <div className="absolute left-0 inset-y-0 flex items-center pl-4 lg:pl-12 opacity-[0.07] pointer-events-none hidden lg:flex" aria-hidden="true">
          <svg width="130" height="250" viewBox="0 0 130 250" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Stacked cards suggesting portfolio depth */}
            <rect x="25" y="50" width="80" height="100" rx="8" stroke="white" strokeWidth="1.5" fill="none"/>
            <rect x="15" y="40" width="80" height="100" rx="8" stroke="white" strokeWidth="1.5" fill="none"/>
            <rect x="5" y="30" width="80" height="100" rx="8" stroke="white" strokeWidth="2" fill="none"/>
            {/* Star / award icon inside top card */}
            <path d="M45 55 L49 67 L61 67 L51 75 L55 87 L45 79 L35 87 L39 75 L29 67 L41 67 Z" stroke="white" strokeWidth="1.5" fill="none"/>
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
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
