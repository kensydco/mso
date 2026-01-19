/**
 * Header Component - Corporate Monumentalism Design
 * Fixed/sticky header with mega menu for Portfolio
 * Typography: Outfit for logo, Inter for nav items
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronDown } from 'lucide-react';
import { brands, categories } from '@/data/brands';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsPortfolioOpen(false);
  }, [location]);

  const navItems = [
    { href: '/about', label: 'About' },
    { href: '/portfolio', label: 'Portfolio', hasDropdown: true },
    { href: '/news', label: 'News' },
    { href: '/careers', label: 'Careers' },
    { href: '/contact', label: 'Contact' },
  ];

  const activeBrands = brands.filter(b => b.status === 'active').slice(0, 6);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-md'
          : 'bg-white'
      )}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-xl lg:text-2xl font-bold text-[#0F172A]">
              KENSYD
            </span>
            <span className="hidden sm:inline font-display text-xl lg:text-2xl font-light text-[#64748B]">
              Companies
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setIsPortfolioOpen(true)}
                onMouseLeave={() => item.hasDropdown && setIsPortfolioOpen(false)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1 text-sm font-medium transition-colors',
                    location === item.href
                      ? 'text-[#3B82F6]'
                      : 'text-[#0F172A] hover:text-[#3B82F6]'
                  )}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 transition-transform',
                        isPortfolioOpen && 'rotate-180'
                      )}
                    />
                  )}
                </Link>

                {/* Mega Menu for Portfolio */}
                {item.hasDropdown && isPortfolioOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                    <div className="bg-white rounded-lg shadow-xl border border-[#E2E8F0] p-6 min-w-[600px]">
                      <div className="grid grid-cols-3 gap-6">
                        {/* Categories */}
                        <div className="col-span-1 border-r border-[#E2E8F0] pr-6">
                          <h4 className="font-display font-semibold text-[#0F172A] mb-3">
                            Categories
                          </h4>
                          <div className="space-y-2">
                            {categories.slice(0, 5).map((cat) => (
                              <Link
                                key={cat.value}
                                href={`/portfolio${cat.value !== 'all' ? `?category=${cat.value}` : ''}`}
                                className="block text-sm text-[#64748B] hover:text-[#3B82F6] transition-colors"
                              >
                                {cat.label}
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Featured Brands */}
                        <div className="col-span-2">
                          <h4 className="font-display font-semibold text-[#0F172A] mb-3">
                            Our Brands
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            {activeBrands.map((brand) => (
                              <Link
                                key={brand.slug}
                                href={`/portfolio/${brand.slug}`}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors group"
                              >
                                <div className="w-10 h-10 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center overflow-hidden">
                                  <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    className="w-8 h-8 object-contain"
                                  />
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-[#0F172A] group-hover:text-[#3B82F6] transition-colors">
                                    {brand.name.split(' ').slice(0, 2).join(' ')}
                                  </span>
                                  <span className="block text-xs text-[#64748B] capitalize">
                                    {brand.category}
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>
                          <Link
                            href="/portfolio"
                            className="inline-block mt-4 text-sm font-medium text-[#3B82F6] hover:text-[#2563EB] transition-colors"
                          >
                            View All Brands →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#0F172A]"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E2E8F0] py-4">
            <div className="space-y-4">
              {navItems.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'block text-base font-medium py-2',
                      location === item.href
                        ? 'text-[#3B82F6]'
                        : 'text-[#0F172A]'
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.hasDropdown && (
                    <div className="pl-4 mt-2 space-y-2 border-l-2 border-[#E2E8F0]">
                      {activeBrands.slice(0, 4).map((brand) => (
                        <Link
                          key={brand.slug}
                          href={`/portfolio/${brand.slug}`}
                          className="block text-sm text-[#64748B] py-1"
                        >
                          {brand.name}
                        </Link>
                      ))}
                      <Link
                        href="/portfolio"
                        className="block text-sm text-[#3B82F6] py-1 font-medium"
                      >
                        View All →
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
