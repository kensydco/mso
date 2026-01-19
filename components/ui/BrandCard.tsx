'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Brand } from '@/data/brands';
import { cn } from '@/lib/utils';

interface BrandCardProps {
  brand: Brand;
  className?: string;
}

export function BrandCard({ brand, className }: BrandCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isComingSoon = brand.status === 'coming-soon';

  return (
    <Link
      href={isComingSoon ? '#' : `/portfolio/${brand.slug}`}
      className={cn(
        'group relative block bg-white rounded-xl shadow-[var(--shadow-md)] overflow-hidden transition-all duration-300',
        !isComingSoon && 'hover:shadow-[var(--shadow-xl)] hover:-translate-y-2 hover:scale-[1.02]',
        isComingSoon && 'opacity-75 cursor-not-allowed',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => isComingSoon && e.preventDefault()}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{ backgroundColor: brand.colors.primary }}
      />

      <div className="relative p-8 flex flex-col items-center text-center min-h-[320px]">
        {/* Logo Placeholder */}
        <div className="w-full h-20 flex items-center justify-center mb-4">
          <div
            className="text-3xl font-bold"
            style={{ color: brand.colors.primary }}
          >
            {brand.name}
          </div>
        </div>

        {/* Category Pill */}
        <span
          className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4"
          style={{
            backgroundColor: brand.colors.accent,
            color: brand.colors.primary,
          }}
        >
          {brand.category.charAt(0).toUpperCase() + brand.category.slice(1)}
        </span>

        {/* Tagline */}
        <p className="text-[var(--color-text-secondary)] text-sm mb-4">
          {brand.tagline}
        </p>

        {/* Location (if available) */}
        {brand.location && (
          <p className="text-[var(--color-text-muted)] text-xs">
            {brand.location.city}, {brand.location.state}
          </p>
        )}

        {/* Coming Soon Badge */}
        {isComingSoon && (
          <div className="absolute top-4 right-4 bg-[var(--color-text-secondary)] text-white px-3 py-1 rounded-full text-xs font-semibold">
            Coming Soon
          </div>
        )}

        {/* Hover Description Overlay */}
        {!isComingSoon && (
          <div
            className={cn(
              'absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-6 transform transition-all duration-300',
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            )}
            style={{
              borderTop: `2px solid ${brand.colors.primary}`,
            }}
          >
            <p className="text-sm text-[var(--color-text-primary)] line-clamp-3">
              {brand.description.substring(0, 120)}...
            </p>
            <div
              className="mt-2 text-sm font-semibold flex items-center justify-center"
              style={{ color: brand.colors.primary }}
            >
              Learn More →
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
