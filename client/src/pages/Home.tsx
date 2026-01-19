/**
 * Home Page - Corporate Monumentalism Design
 * Full-viewport hero with scroll animations
 * Portfolio preview, stats, about section, CTA banner
 */

import { Link } from 'wouter';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import BrandCard from '@/components/brand/BrandCard';
import StatCounter from '@/components/sections/StatCounter';
import { brands } from '@/data/brands';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const stats = [
  { value: 8, label: 'Brands', description: 'Under active management' },
  { value: 3, label: 'Industries', description: 'Fitness, Healthcare, Service' },
  { value: 5, suffix: '+', label: 'States', description: 'Regional presence' },
  { value: 100, suffix: '%', label: 'Dedication', description: 'To operational excellence' },
];

function HeroSection() {
  const scrollToContent = () => {
    const element = document.getElementById('portfolio-preview');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-corporate.jpg"
          alt="Modern corporate building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/70 to-[#0F172A]/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-3xl">
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 animate-fade-in-up">
            Building Brands<br />
            <span className="text-[#3B82F6]">That Matter</span>
          </h1>
          <p className="text-lg md:text-xl text-[#CBD5E1] mb-8 max-w-2xl animate-fade-in-up-delay-1">
            A diversified holding company managing fitness, healthcare, service, 
            and technology brands across the Mid-South region.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in-up-delay-2">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore Our Portfolio
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg backdrop-blur-sm transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll to content"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}

function PortfolioPreview() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const featuredBrands = brands.filter(b => b.status === 'active').slice(0, 4);

  return (
    <section id="portfolio-preview" className="py-20 lg:py-28">
      <div className="container">
        <div
          ref={ref}
          className={cn(
            'text-center mb-12 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[#0F172A] mb-4">
            Our Portfolio
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            A diverse collection of brands delivering excellence across multiple industries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredBrands.map((brand, index) => (
            <div
              key={brand.slug}
              className={cn(
                'transition-all duration-700',
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <BrandCard brand={brand} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[#3B82F6] hover:text-[#2563EB] font-semibold transition-colors"
          >
            View All Brands
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function AboutPreview() {
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            ref={leftRef}
            className={cn(
              'transition-all duration-700',
              leftVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            )}
          >
            <div className="relative">
              <img
                src="/images/about-team.jpg"
                alt="Kensyd Companies network"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#3B82F6] rounded-2xl -z-10" />
            </div>
          </div>

          {/* Content */}
          <div
            ref={rightRef}
            className={cn(
              'transition-all duration-700',
              rightVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            )}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[#0F172A] mb-6">
              About Kensyd Companies
            </h2>
            <p className="text-lg text-[#64748B] mb-6 leading-relaxed">
              Kensyd Companies is a diversified holding company headquartered in the 
              Memphis metro area. We provide centralized management services to a 
              growing portfolio of brands across fitness, healthcare, service, and 
              technology sectors.
            </p>
            <p className="text-lg text-[#64748B] mb-8 leading-relaxed">
              Our approach combines operational expertise with strategic growth 
              initiatives, enabling each brand to thrive while benefiting from 
              shared resources and best practices.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
            >
              Learn More
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Diagonal Background */}
      <div className="absolute inset-0 bg-[#3B82F6] diagonal-top" style={{ marginTop: '-5rem', paddingTop: '8rem' }} />
      
      <div className="container relative z-10">
        <div
          ref={ref}
          className={cn(
            'text-center max-w-3xl mx-auto transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6">
            Join Our Growing Team
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Explore career opportunities across our portfolio of brands. 
            Build your future with a company dedicated to growth and excellence.
          </p>
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 bg-white hover:bg-[#F8FAFC] text-[#3B82F6] font-semibold px-8 py-4 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            View Open Positions
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <PortfolioPreview />
      <StatCounter stats={stats} />
      <AboutPreview />
      <CTABanner />
    </Layout>
  );
}
