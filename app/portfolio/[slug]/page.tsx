import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBrandBySlug, brands } from '@/data/brands';
import { Button } from '@/components/ui/Button';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return brands.map((brand) => ({
    slug: brand.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const brand = getBrandBySlug(params.slug);

  if (!brand) {
    return {
      title: 'Brand Not Found | Kensyd Companies',
    };
  }

  return {
    title: `${brand.name} | Kensyd Companies`,
    description: brand.description,
  };
}

export default function BrandPage({ params }: { params: { slug: string } }) {
  const brand = getBrandBySlug(params.slug);

  if (!brand) {
    notFound();
  }

  const isComingSoon = brand.status === 'coming-soon';

  return (
    <div
      data-brand={params.slug.split('-')[0]}
      style={{
        '--brand-primary': brand.colors.primary,
        '--brand-secondary': brand.colors.secondary,
        '--brand-accent': brand.colors.accent,
      } as React.CSSProperties}
    >
      {/* Hero Section */}
      <section
        className="relative py-32 text-white"
        style={{
          background: `linear-gradient(135deg, ${brand.colors.primary} 0%, ${brand.colors.secondary} 100%)`,
        }}
      >
        <div className="container mx-auto px-4 text-center">
          {/* Logo Placeholder */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold">{brand.name}</h1>
          </div>

          <p className="text-2xl md:text-3xl text-white/90 mb-6">{brand.tagline}</p>

          <div className="flex flex-wrap justify-center gap-4 text-lg">
            <span
              className="px-6 py-2 rounded-full font-semibold"
              style={{ backgroundColor: brand.colors.accent, color: brand.colors.primary }}
            >
              {brand.category.charAt(0).toUpperCase() + brand.category.slice(1)}
            </span>
            {brand.location && (
              <span className="px-6 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                📍 {brand.location.city}, {brand.location.state}
              </span>
            )}
            {isComingSoon && (
              <span className="px-6 py-2 rounded-full bg-yellow-500 text-yellow-900 font-semibold">
                Coming Soon
              </span>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2
            className="text-4xl font-bold mb-8"
            style={{ color: brand.colors.primary }}
          >
            About This Brand
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-6">
              {brand.description}
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      {brand.services.length > 0 && (
        <section className="py-24 bg-[var(--color-surface)]">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2
              className="text-4xl font-bold mb-12"
              style={{ color: brand.colors.primary }}
            >
              {isComingSoon ? 'Planned Offerings' : 'Services & Offerings'}
            </h2>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {brand.services.map((service, index) => (
                <li
                  key={index}
                  className="flex items-center text-lg text-[var(--color-text-primary)]"
                >
                  <span
                    className="w-2 h-2 rounded-full mr-4"
                    style={{ backgroundColor: brand.colors.primary }}
                  />
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {!isComingSoon && Object.keys(brand.contact).length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div
              className="rounded-2xl p-12"
              style={{
                backgroundColor: brand.colors.accent,
                borderLeft: `6px solid ${brand.colors.primary}`,
              }}
            >
              <h2
                className="text-3xl font-bold mb-8"
                style={{ color: brand.colors.primary }}
              >
                Contact Information
              </h2>

              <div className="space-y-4 mb-8">
                {brand.contact.address && (
                  <div className="flex items-start">
                    <span className="mr-4 text-2xl">📍</span>
                    <div>
                      <p className="font-semibold" style={{ color: brand.colors.primary }}>
                        Address
                      </p>
                      <p className="text-[var(--color-text-primary)]">{brand.contact.address}</p>
                    </div>
                  </div>
                )}

                {brand.contact.phone && (
                  <div className="flex items-start">
                    <span className="mr-4 text-2xl">📞</span>
                    <div>
                      <p className="font-semibold" style={{ color: brand.colors.primary }}>
                        Phone
                      </p>
                      <a
                        href={`tel:${brand.contact.phone}`}
                        className="text-[var(--color-text-primary)] hover:underline"
                      >
                        {brand.contact.phone}
                      </a>
                    </div>
                  </div>
                )}

                {brand.contact.email && (
                  <div className="flex items-start">
                    <span className="mr-4 text-2xl">📧</span>
                    <div>
                      <p className="font-semibold" style={{ color: brand.colors.primary }}>
                        Email
                      </p>
                      <a
                        href={`mailto:${brand.contact.email}`}
                        className="text-[var(--color-text-primary)] hover:underline"
                      >
                        {brand.contact.email}
                      </a>
                    </div>
                  </div>
                )}

                {brand.contact.website && (
                  <div className="flex items-start">
                    <span className="mr-4 text-2xl">🌐</span>
                    <div>
                      <p className="font-semibold" style={{ color: brand.colors.primary }}>
                        Website
                      </p>
                      <a
                        href={brand.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-text-primary)] hover:underline"
                      >
                        {brand.contact.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {brand.contact.website && (
                <Button
                  href={brand.contact.website}
                  external
                  variant="brand"
                  size="lg"
                >
                  VISIT WEBSITE →
                </Button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Back to Portfolio */}
      <section className="py-12 bg-[var(--color-surface)]">
        <div className="container mx-auto px-4 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] font-semibold transition-colors"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </section>
    </div>
  );
}
