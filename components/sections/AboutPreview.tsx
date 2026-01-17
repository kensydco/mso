import React from 'react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export function AboutPreview() {
  return (
    <Section background="white" padding="lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image/Graphic Side */}
        <div className="order-2 lg:order-1">
          <div className="relative h-96 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-accent)] rounded-2xl shadow-[var(--shadow-xl)] overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-6xl font-bold opacity-20">KENSYD</div>
            </div>
          </div>
        </div>

        {/* Content Side */}
        <div className="order-1 lg:order-2">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-6">
            About Kensyd Companies
          </h2>

          <div className="space-y-4 text-lg text-[var(--color-text-secondary)] mb-8">
            <p>
              Kensyd Companies is a diversified holding company headquartered in the Memphis metro area, dedicated to building and supporting exceptional brands across multiple industries.
            </p>
            <p>
              Our portfolio encompasses fitness studios, healthcare services, professional services, and innovative technology platforms. Through centralized management and operational expertise, we empower each brand to achieve sustainable growth while maintaining its unique identity.
            </p>
            <p>
              With a commitment to excellence and a focus on long-term value creation, we're building a portfolio of brands that make a meaningful impact in the communities they serve.
            </p>
          </div>

          <Button href="/about" variant="primary" size="lg">
            LEARN MORE →
          </Button>
        </div>
      </div>
    </Section>
  );
}
