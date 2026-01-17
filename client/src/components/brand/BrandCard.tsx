/**
 * BrandCard Component - Corporate Monumentalism Design
 * Floating cards with pronounced shadows and hover effects
 * Scale up 1.03, shadow intensifies, border color shifts to brand color
 */

import { Link } from 'wouter';
import { Brand } from '@/data/brands';
import { cn } from '@/lib/utils';

interface BrandCardProps {
  brand: Brand;
  className?: string;
}

export default function BrandCard({ brand, className }: BrandCardProps) {
  const isComingSoon = brand.status === 'coming-soon';

  return (
    <Link href={`/portfolio/${brand.slug}`}>
      <div
        className={cn(
          'group relative bg-white rounded-xl overflow-hidden transition-all duration-300',
          'border border-[#E2E8F0] hover:border-transparent',
          'shadow-md hover:shadow-xl',
          'transform hover:-translate-y-2 hover:scale-[1.02]',
          isComingSoon && 'opacity-75',
          className
        )}
        style={{
          '--brand-color': brand.colors.primary,
        } as React.CSSProperties}
      >
        {/* Coming Soon Badge */}
        {isComingSoon && (
          <div className="absolute top-4 right-4 z-10 bg-[#64748B] text-white text-xs font-medium px-3 py-1 rounded-full">
            Coming Soon
          </div>
        )}

        {/* Logo Container */}
        <div className="aspect-[4/3] flex items-center justify-center p-8 bg-[#F8FAFC] group-hover:bg-white transition-colors">
          <img
            src={brand.logo}
            alt={`${brand.name} logo`}
            className={cn(
              'max-w-[180px] max-h-[100px] object-contain transition-transform duration-300',
              'group-hover:scale-105',
              isComingSoon && 'grayscale'
            )}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="font-display font-semibold text-lg text-[#0F172A] group-hover:text-[var(--brand-color)] transition-colors">
              {brand.name}
            </h3>
          </div>

          {/* Category Pill */}
          <span
            className="inline-block text-xs font-medium px-3 py-1 rounded-full capitalize"
            style={{
              backgroundColor: `${brand.colors.primary}15`,
              color: brand.colors.primary,
            }}
          >
            {brand.category}
          </span>

          {/* Description Overlay on Hover */}
          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-20 overflow-hidden">
            <p className="text-sm text-[#64748B] line-clamp-2">
              {brand.tagline}
            </p>
          </div>

          {/* Location */}
          {brand.location && (
            <p className="mt-3 text-xs text-[#94A3B8]">
              {brand.location.city}, {brand.location.state}
            </p>
          )}
        </div>

        {/* Bottom Border Accent */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
          style={{ backgroundColor: brand.colors.primary }}
        />
      </div>
    </Link>
  );
}
