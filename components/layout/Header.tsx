'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { brands, getBrandsByCategory } from '@/data/brands';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '/about' },
    { label: 'Portfolio', href: '/portfolio', hasDropdown: true },
    { label: 'News', href: '/news' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white shadow-[var(--shadow-md)]'
          : 'bg-white/95 backdrop-blur-sm'
      )}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors"
          >
            KENSYD
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsPortfolioOpen(true)}
                    onMouseLeave={() => setIsPortfolioOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center font-semibold transition-colors',
                        isActive(item.href)
                          ? 'text-[var(--color-secondary)]'
                          : 'text-[var(--color-text-primary)] hover:text-[var(--color-secondary)]'
                      )}
                    >
                      {item.label}
                      <svg
                        className="ml-1 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </Link>

                    {/* Portfolio Dropdown */}
                    {isPortfolioOpen && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-[var(--shadow-xl)] py-4 animate-fade-in">
                        <Link
                          href="/portfolio"
                          className="block px-6 py-2 text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-secondary)] transition-colors font-medium"
                        >
                          All Brands
                        </Link>
                        <div className="border-t border-[var(--color-border)] my-2" />
                        <div className="px-6 py-1 text-xs font-semibold text-[var(--color-text-muted)] uppercase">
                          By Category
                        </div>
                        <Link
                          href="/portfolio?category=fitness"
                          className="block px-6 py-2 text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-secondary)] transition-colors"
                        >
                          Fitness
                        </Link>
                        <Link
                          href="/portfolio?category=healthcare"
                          className="block px-6 py-2 text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-secondary)] transition-colors"
                        >
                          Healthcare
                        </Link>
                        <Link
                          href="/portfolio?category=service"
                          className="block px-6 py-2 text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-secondary)] transition-colors"
                        >
                          Service
                        </Link>
                        <Link
                          href="/portfolio?category=telehealth"
                          className="block px-6 py-2 text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-secondary)] transition-colors"
                        >
                          Telehealth
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'font-semibold transition-colors',
                      isActive(item.href)
                        ? 'text-[var(--color-secondary)]'
                        : 'text-[var(--color-text-primary)] hover:text-[var(--color-secondary)]'
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-[var(--color-text-primary)] hover:text-[var(--color-secondary)] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-[var(--color-border)] animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'block py-3 font-semibold transition-colors',
                  isActive(item.href)
                    ? 'text-[var(--color-secondary)]'
                    : 'text-[var(--color-text-primary)] hover:text-[var(--color-secondary)]'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
