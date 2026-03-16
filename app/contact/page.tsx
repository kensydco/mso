import React from 'react';
import { Section } from '@/components/ui/Section';
import { ContactForm } from '@/components/ui/ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Kensyd Companies',
  description: 'Get in touch with Kensyd Companies or one of our portfolio brands.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-32 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white overflow-hidden">
        {/* Dot grid background */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        {/* Contact graphic: envelope + speech bubbles + signal waves */}
        <div className="absolute right-0 inset-y-0 flex items-center pr-4 lg:pr-12 opacity-[0.12] pointer-events-none hidden md:flex" aria-hidden="true">
          <svg width="320" height="300" viewBox="0 0 320 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Main envelope */}
            <rect x="55" y="80" width="210" height="145" rx="8" stroke="white" strokeWidth="2.5" fill="none"/>
            <polyline points="55,80 160,165 265,80" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="55" y1="225" x2="115" y2="168" stroke="white" strokeWidth="1.5"/>
            <line x1="265" y1="225" x2="205" y2="168" stroke="white" strokeWidth="1.5"/>
            {/* Top-left speech bubble */}
            <rect x="20" y="18" width="90" height="52" rx="12" stroke="white" strokeWidth="2" fill="none"/>
            <path d="M38 70 L30 84 L52 70" stroke="white" strokeWidth="2" strokeLinejoin="round" fill="none"/>
            <line x1="34" y1="34" x2="92" y2="34" stroke="white" strokeWidth="1.5"/>
            <line x1="34" y1="48" x2="78" y2="48" stroke="white" strokeWidth="1.5"/>
            {/* Top-right speech bubble */}
            <rect x="210" y="18" width="90" height="52" rx="12" stroke="white" strokeWidth="2" fill="none"/>
            <path d="M282 70 L290 84 L268 70" stroke="white" strokeWidth="2" strokeLinejoin="round" fill="none"/>
            <line x1="224" y1="34" x2="282" y2="34" stroke="white" strokeWidth="1.5"/>
            <line x1="224" y1="48" x2="268" y2="48" stroke="white" strokeWidth="1.5"/>
            {/* Signal/wifi waves below */}
            <circle cx="160" cy="252" r="6" stroke="white" strokeWidth="2" fill="none"/>
            <path d="M138 268 Q160 256 182 268" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M120 282 Q160 264 200 282" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M102 296 Q160 272 218 296" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Left accent */}
        <div className="absolute left-0 inset-y-0 flex items-center pl-4 lg:pl-12 opacity-[0.07] pointer-events-none hidden lg:flex" aria-hidden="true">
          <svg width="150" height="260" viewBox="0 0 150 260" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Phone outline */}
            <rect x="35" y="20" width="80" height="140" rx="12" stroke="white" strokeWidth="2" fill="none"/>
            <line x1="55" y1="40" x2="95" y2="40" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="75" cy="145" r="8" stroke="white" strokeWidth="1.5" fill="none"/>
            {/* Small dots to suggest messages */}
            <circle cx="30" cy="200" r="5" fill="white" fillOpacity="0.6"/>
            <circle cx="50" cy="215" r="5" fill="white" fillOpacity="0.6"/>
            <circle cx="70" cy="225" r="5" fill="white" fillOpacity="0.6"/>
            <circle cx="100" cy="215" r="5" fill="white" fillOpacity="0.6"/>
            <circle cx="120" cy="200" r="5" fill="white" fillOpacity="0.6"/>
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Have a question or want to learn more? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <Section background="white" padding="lg">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-8">
            {/* Headquarters */}
            <div className="bg-[var(--color-surface)] rounded-xl p-6">
              <h3 className="text-xl font-bold text-[var(--color-primary)] mb-4">
                Headquarters
              </h3>
              <div className="space-y-3 text-[var(--color-text-secondary)]">
                <div className="flex items-start">
                  <span className="mr-3 text-xl">🏢</span>
                  <div>
                    <p className="font-semibold text-[var(--color-text-primary)]">
                      Kensyd Companies, LLC
                    </p>
                    <p>Memphis Metro Area</p>
                    <p>Tennessee</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="mr-3 text-xl">📧</span>
                  <a
                    href="mailto:info@kensydcompanies.com"
                    className="hover:text-[var(--color-secondary)] transition-colors"
                  >
                    info@kensydcompanies.com
                  </a>
                </div>
                <div className="flex items-start">
                  <span className="mr-3 text-xl">📞</span>
                  <a
                    href="tel:+1234567890"
                    className="hover:text-[var(--color-secondary)] transition-colors"
                  >
                    (XXX) XXX-XXXX
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-[var(--color-surface)] rounded-xl p-6">
              <h3 className="text-xl font-bold text-[var(--color-primary)] mb-4">
                Business Hours
              </h3>
              <div className="space-y-2 text-[var(--color-text-secondary)]">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-semibold">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday - Sunday:</span>
                  <span className="font-semibold">Closed</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-[var(--color-surface)] rounded-xl p-6">
              <h3 className="text-xl font-bold text-[var(--color-primary)] mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] flex items-center justify-center text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] flex items-center justify-center text-white transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Additional Info */}
      <Section background="gray" padding="md">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6">
            Looking for a Specific Brand?
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] mb-8">
            Each of our portfolio brands has dedicated contact information.
            Visit their individual pages to get in touch directly.
          </p>
          <a
            href="/portfolio"
            className="inline-block bg-[var(--color-secondary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[var(--color-secondary-hover)] transition-colors"
          >
            VIEW OUR BRANDS
          </a>
        </div>
      </Section>
    </>
  );
}
