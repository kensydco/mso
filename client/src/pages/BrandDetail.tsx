/**
 * Brand Detail Page - Corporate Monumentalism Design
 * Dynamic theming based on brand colors
 * Hero with logo, about section, services, contact info
 */

import { useParams, Link } from 'wouter';
import { ArrowLeft, MapPin, Phone, Globe, Mail, ExternalLink } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { getBrandBySlug, brands } from '@/data/brands';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

export default function BrandDetail() {
  const { slug } = useParams<{ slug: string }>();
  const brand = getBrandBySlug(slug || '');
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  if (!brand) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display font-bold text-3xl text-[#0F172A] mb-4">
              Brand Not Found
            </h1>
            <p className="text-[#64748B] mb-6">
              The brand you're looking for doesn't exist.
            </p>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-[#3B82F6] hover:text-[#2563EB] font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const isComingSoon = brand.status === 'coming-soon';

  // Get related brands (same category, excluding current)
  const relatedBrands = brands
    .filter(b => b.category === brand.category && b.slug !== brand.slug && b.status === 'active')
    .slice(0, 3);

  return (
    <Layout>
      {/* Hero Section with Brand Colors */}
      <section
        className="relative py-20 lg:py-28"
        style={{
          background: `linear-gradient(135deg, ${brand.colors.primary}15 0%, ${brand.colors.accent} 100%)`,
        }}
      >
        <div className="container">
          {/* Back Link */}
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[#64748B] hover:text-[#0F172A] font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            {/* Logo */}
            <div
              className="w-32 h-32 lg:w-40 lg:h-40 bg-white rounded-2xl shadow-xl flex items-center justify-center p-6"
              style={{ borderColor: brand.colors.primary, borderWidth: '2px' }}
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className={cn(
                  'max-w-full max-h-full object-contain',
                  isComingSoon && 'grayscale opacity-50'
                )}
              />
            </div>

            {/* Brand Info */}
            <div className="flex-1">
              {isComingSoon && (
                <span className="inline-block bg-[#64748B] text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                  Coming Soon
                </span>
              )}
              <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[#0F172A] mb-3">
                {brand.name}
              </h1>
              <p className="text-xl text-[#64748B] mb-4">
                {brand.tagline}
              </p>
              <div className="flex flex-wrap gap-3">
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium capitalize"
                  style={{
                    backgroundColor: `${brand.colors.primary}20`,
                    color: brand.colors.primary,
                  }}
                >
                  {brand.category}
                </span>
                {brand.location && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white text-[#64748B]">
                    <MapPin className="w-4 h-4" />
                    {brand.location.city}, {brand.location.state}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div
            ref={ref}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          >
            {/* Main Content */}
            <div
              className={cn(
                'lg:col-span-2 transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              {/* About */}
              <div className="mb-12">
                <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                  About {brand.name.split(' ')[0]}
                </h2>
                <p className="text-lg text-[#64748B] leading-relaxed">
                  {brand.description}
                </p>
              </div>

              {/* Services */}
              {brand.services.length > 0 && (
                <div>
                  <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                    Services & Offerings
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {brand.services.map((service, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 bg-[#F8FAFC] rounded-lg"
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: brand.colors.primary }}
                        />
                        <span className="text-[#0F172A]">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Contact Info */}
            <div
              className={cn(
                'transition-all duration-700 delay-200',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <div
                className="bg-white rounded-2xl border-2 p-6 sticky top-24"
                style={{ borderColor: `${brand.colors.primary}30` }}
              >
                <h3 className="font-display font-semibold text-lg text-[#0F172A] mb-6">
                  Contact Information
                </h3>

                <div className="space-y-4">
                  {brand.contact.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#64748B] mt-0.5" />
                      <span className="text-[#64748B] text-sm">
                        {brand.contact.address}
                      </span>
                    </div>
                  )}

                  {brand.contact.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-[#64748B]" />
                      <a
                        href={`tel:${brand.contact.phone}`}
                        className="text-[#64748B] text-sm hover:text-[#0F172A] transition-colors"
                      >
                        {brand.contact.phone}
                      </a>
                    </div>
                  )}

                  {brand.contact.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-[#64748B]" />
                      <a
                        href={`mailto:${brand.contact.email}`}
                        className="text-[#64748B] text-sm hover:text-[#0F172A] transition-colors"
                      >
                        {brand.contact.email}
                      </a>
                    </div>
                  )}

                  {brand.contact.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-[#64748B]" />
                      <a
                        href={brand.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#64748B] text-sm hover:text-[#0F172A] transition-colors truncate"
                      >
                        {brand.contact.website.replace('https://', '').replace('www.', '')}
                      </a>
                    </div>
                  )}
                </div>

                {brand.contact.website && !isComingSoon && (
                  <a
                    href={brand.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: brand.colors.primary }}
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Brands */}
      {relatedBrands.length > 0 && (
        <section className="py-16 bg-[#F8FAFC]">
          <div className="container">
            <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-8">
              Related Brands
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBrands.map((relatedBrand) => (
                <Link
                  key={relatedBrand.slug}
                  href={`/portfolio/${relatedBrand.slug}`}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-[#E2E8F0] hover:border-[#3B82F6]/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-[#F8FAFC] rounded-lg flex items-center justify-center p-2">
                    <img
                      src={relatedBrand.logo}
                      alt={relatedBrand.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-[#0F172A]">
                      {relatedBrand.name}
                    </h3>
                    <p className="text-sm text-[#64748B]">
                      {relatedBrand.tagline}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
