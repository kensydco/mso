/**
 * Footer Component - Corporate Monumentalism Design
 * Dark slate background (#1E293B) with 3-column layout
 * Typography: Outfit for headings, Inter for body
 */

import { Link } from 'wouter';
import { Linkedin, Facebook, Mail, Phone } from 'lucide-react';
import { brands } from '@/data/brands';

export default function Footer() {
  const activeBrands = brands.filter(b => b.status === 'active');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1E293B] text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-display text-2xl font-bold text-white">
                KENSYD
              </span>
              <span className="font-display text-2xl font-light text-[#94A3B8] ml-2">
                Companies
              </span>
            </Link>
            <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
              A diversified holding company managing fitness, healthcare, service, 
              and technology brands across the Mid-South region.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#334155] flex items-center justify-center hover:bg-[#3B82F6] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#334155] flex items-center justify-center hover:bg-[#3B82F6] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-[#94A3B8] hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-[#94A3B8] hover:text-white transition-colors text-sm">
                  News & Press
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-[#94A3B8] hover:text-white transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#94A3B8] hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Portfolio Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">
              Portfolio
            </h4>
            <ul className="space-y-3">
              {activeBrands.map((brand) => (
                <li key={brand.slug}>
                  <Link
                    href={`/portfolio/${brand.slug}`}
                    className="text-[#94A3B8] hover:text-white transition-colors text-sm"
                  >
                    {brand.name.split(' ').slice(0, 2).join(' ')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">
              Connect
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:info@kensydcompanies.com"
                  className="flex items-center gap-3 text-[#94A3B8] hover:text-white transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  info@kensydcompanies.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+19015551234"
                  className="flex items-center gap-3 text-[#94A3B8] hover:text-white transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  (901) 555-1234
                </a>
              </li>
              <li className="text-[#94A3B8] text-sm">
                Memphis Metro Area<br />
                Tennessee, USA
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#334155] mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#64748B] text-sm">
            © {currentYear} Kensyd Companies, LLC. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-[#64748B] hover:text-white transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[#64748B] hover:text-white transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
