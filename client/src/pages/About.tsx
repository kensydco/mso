/**
 * About Page - Corporate Monumentalism Design
 * Hero banner, mission statement, approach, values grid
 */

import { Link } from 'wouter';
import { ArrowRight, Target, Users, TrendingUp, Shield, Lightbulb, Heart } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const values = [
  {
    icon: Target,
    title: 'Operational Excellence',
    description: 'We pursue the highest standards in everything we do, continuously improving processes and outcomes.',
  },
  {
    icon: Users,
    title: 'People First',
    description: 'Our success is built on the talent and dedication of our team members across all portfolio companies.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Mindset',
    description: 'We embrace challenges as opportunities and invest in continuous learning and development.',
  },
  {
    icon: Shield,
    title: 'Integrity',
    description: 'We conduct business with honesty and transparency, building trust with all stakeholders.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We encourage creative thinking and embrace new technologies to stay ahead of the curve.',
  },
  {
    icon: Heart,
    title: 'Community Impact',
    description: 'We are committed to making a positive difference in the communities we serve.',
  },
];

function HeroSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#0F172A]">
      <div className="absolute inset-0 opacity-20">
        <img
          src="/images/about-team.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container relative z-10">
        <div className="max-w-3xl">
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 animate-fade-in-up">
            About Kensyd Companies
          </h1>
          <p className="text-xl text-[#CBD5E1] animate-fade-in-up-delay-1">
            A diversified holding company building brands that matter across 
            fitness, healthcare, service, and technology sectors.
          </p>
        </div>
      </div>
    </section>
  );
}

function MissionSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <div
          ref={ref}
          className={cn(
            'max-w-4xl mx-auto text-center transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="inline-block px-4 py-2 bg-[#3B82F6]/10 rounded-full mb-6">
            <span className="text-sm font-semibold text-[#3B82F6] uppercase tracking-wider">
              Our Mission
            </span>
          </div>
          <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl text-[#0F172A] leading-relaxed">
            "To build and nurture a portfolio of exceptional brands that deliver 
            value to customers, create opportunities for team members, and generate 
            sustainable growth for stakeholders."
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function ApproachSection() {
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-20 lg:py-28 bg-[#F8FAFC]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column */}
          <div
            ref={leftRef}
            className={cn(
              'transition-all duration-700',
              leftVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            )}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[#0F172A] mb-6">
              Our Approach
            </h2>
            <p className="text-lg text-[#64748B] mb-6 leading-relaxed">
              Kensyd Companies operates as a Management Services Organization (MSO), 
              providing centralized support and strategic guidance to our portfolio 
              of operating companies. This model allows each brand to maintain its 
              unique identity while benefiting from shared expertise and resources.
            </p>
            <p className="text-lg text-[#64748B] mb-6 leading-relaxed">
              We focus on acquiring and developing businesses with strong fundamentals, 
              dedicated leadership, and significant growth potential. Our hands-on 
              approach ensures that each portfolio company receives the support it 
              needs to thrive.
            </p>
          </div>

          {/* Right Column */}
          <div
            ref={rightRef}
            className={cn(
              'transition-all duration-700',
              rightVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            )}
          >
            <h3 className="font-display font-semibold text-xl text-[#0F172A] mb-4">
              What We Provide
            </h3>
            <ul className="space-y-4">
              {[
                'Strategic planning and business development',
                'Financial management and reporting',
                'Marketing and brand development',
                'Human resources and talent acquisition',
                'Technology and systems integration',
                'Operational best practices and training',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#3B82F6] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#64748B]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <div
          ref={ref}
          className={cn(
            'text-center mb-12 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[#0F172A] mb-4">
            Our Values
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            The principles that guide our decisions and define our culture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className={cn(
                  'bg-white rounded-xl p-8 border border-[#E2E8F0] hover:border-[#3B82F6]/30 hover:shadow-lg transition-all duration-300',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-[#3B82F6]" />
                </div>
                <h3 className="font-display font-semibold text-xl text-[#0F172A] mb-3">
                  {value.title}
                </h3>
                <p className="text-[#64748B] leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-20 bg-[#0F172A]">
      <div className="container">
        <div
          ref={ref}
          className={cn(
            'text-center max-w-3xl mx-auto transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
            Ready to Learn More?
          </h2>
          <p className="text-lg text-[#94A3B8] mb-8">
            Explore our portfolio of brands or get in touch with our team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200"
            >
              View Portfolio
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <Layout>
      <HeroSection />
      <MissionSection />
      <ApproachSection />
      <ValuesSection />
      <CTASection />
    </Layout>
  );
}
