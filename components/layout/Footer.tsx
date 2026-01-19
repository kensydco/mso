import React from 'react';
import Link from 'next/link';
import { brands, getActiveBrands } from '@/data/brands';

export function Footer() {
  const activeBrands = getActiveBrands();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-primary-light)] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Logo */}
        <div className="mb-12">
          <Link
            href="/"
            className="text-3xl font-bold hover:text-[var(--color-accent)] transition-colors"
          >
            KENSYD
          </Link>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Portfolio Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Portfolio</h3>
            <ul className="space-y-3">
              {activeBrands.slice(0, 6).map((brand) => (
                <li key={brand.slug}>
                  <Link
                    href={`/portfolio/${brand.slug}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2">📧</span>
                <a
                  href="mailto:info@kensydcompanies.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  info@kensydcompanies.com
                </a>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📞</span>
                <a
                  href="tel:+1234567890"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  (XXX) XXX-XXXX
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-6">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Newsletter Column (Optional) */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 text-sm mb-4">
              Get the latest news and updates from Kensyd Companies.
            </p>
            <Link
              href="/news"
              className="inline-block bg-[var(--color-accent)] text-[var(--color-primary)] px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              View News
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© {currentYear} Kensyd Companies, LLC. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
