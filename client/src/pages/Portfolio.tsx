/**
 * Portfolio Page - Corporate Monumentalism Design
 * Full brand gallery with category filtering
 * Responsive grid: 4-col → 2-col → 1-col
 */

import { useState, useEffect } from 'react';
import { useSearch } from 'wouter';
import Layout from '@/components/layout/Layout';
import BrandCard from '@/components/brand/BrandCard';
import { brands, categories, BrandCategory } from '@/data/brands';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

export default function Portfolio() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const initialCategory = (params.get('category') as BrandCategory | 'all') || 'all';
  
  const [activeCategory, setActiveCategory] = useState<BrandCategory | 'all'>(initialCategory);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  useEffect(() => {
    const category = params.get('category') as BrandCategory | 'all';
    if (category) {
      setActiveCategory(category);
    }
  }, [searchString]);

  const filteredBrands = activeCategory === 'all'
    ? brands
    : brands.filter(brand => brand.category === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 lg:py-28 bg-[#0F172A]">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 animate-fade-in-up">
              Our Portfolio
            </h1>
            <p className="text-xl text-[#CBD5E1] animate-fade-in-up-delay-1">
              Discover our diverse collection of brands delivering excellence 
              across fitness, healthcare, service, and technology sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Grid Section */}
      <section className="py-16 lg:py-20">
        <div className="container">
          {/* Category Filters */}
          <div
            ref={ref}
            className={cn(
              'flex flex-wrap gap-3 mb-12 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={cn(
                  'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200',
                  activeCategory === category.value
                    ? 'bg-[#3B82F6] text-white'
                    : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#0F172A]'
                )}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Brand Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredBrands.map((brand, index) => (
              <div
                key={brand.slug}
                className={cn(
                  'transition-all duration-500',
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: `${Math.min(index * 50, 400)}ms` }}
              >
                <BrandCard brand={brand} />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredBrands.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-[#64748B]">
                No brands found in this category.
              </p>
              <button
                onClick={() => setActiveCategory('all')}
                className="mt-4 text-[#3B82F6] hover:text-[#2563EB] font-medium"
              >
                View all brands
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
