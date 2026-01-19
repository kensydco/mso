/**
 * News Page - Corporate Monumentalism Design
 * News listing with featured post and grid layout
 * Placeholder content until GHL integration
 */

import { Link } from 'wouter';
import { Calendar, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

// Placeholder news data
const newsItems = [
  {
    id: 1,
    title: 'Kensyd Companies Expands Portfolio with New Healthcare Venture',
    excerpt: 'We are excited to announce the addition of a new healthcare brand to our growing portfolio, strengthening our presence in the Mid-South region.',
    date: '2026-01-15',
    category: 'Company News',
    image: '/images/healthcare-hero.jpg',
    featured: true,
  },
  {
    id: 2,
    title: 'HOTWORX Collierville Celebrates One Year Anniversary',
    excerpt: 'Our Collierville location marks its first year of bringing infrared fitness to the community with special member appreciation events.',
    date: '2026-01-10',
    category: 'Brand Updates',
    image: '/images/fitness-hero.jpg',
    featured: false,
  },
  {
    id: 3,
    title: 'Rolling Suds Launches Eco-Friendly Cleaning Initiative',
    excerpt: 'Our power washing brand introduces new environmentally conscious cleaning solutions across all service areas.',
    date: '2026-01-05',
    category: 'Brand Updates',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=60',
    featured: false,
  },
  {
    id: 4,
    title: 'Precision Wound Management Receives Industry Recognition',
    excerpt: 'Our healthcare brand has been recognized for excellence in patient care and innovative treatment protocols.',
    date: '2025-12-28',
    category: 'Industry',
    image: '/images/healthcare-hero.jpg',
    featured: false,
  },
  {
    id: 5,
    title: 'OurHealth Rx Expands Telehealth Services',
    excerpt: 'New virtual care options now available to patients across multiple states, making healthcare more accessible than ever.',
    date: '2025-12-20',
    category: 'Brand Updates',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60',
    featured: false,
  },
  {
    id: 6,
    title: 'Kensyd Companies Named Top Employer in Memphis Metro',
    excerpt: 'Our commitment to employee growth and development has earned recognition as a leading employer in the region.',
    date: '2025-12-15',
    category: 'Company News',
    image: '/images/careers-hero.jpg',
    featured: false,
  },
];

const categories = ['All', 'Company News', 'Brand Updates', 'Industry'];

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function News() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const featuredPost = newsItems.find(item => item.featured);
  const regularPosts = newsItems.filter(item => !item.featured);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 lg:py-28 bg-[#0F172A]">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 animate-fade-in-up">
              News & Press
            </h1>
            <p className="text-xl text-[#CBD5E1] animate-fade-in-up-delay-1">
              Stay updated with the latest news from Kensyd Companies and our portfolio brands.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-20">
        <div className="container">
          {/* Category Filters */}
          <div
            ref={ref}
            className={cn(
              'flex flex-wrap gap-3 mb-12 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            {categories.map((category, index) => (
              <button
                key={category}
                className={cn(
                  'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200',
                  index === 0
                    ? 'bg-[#3B82F6] text-white'
                    : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#0F172A]'
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div
              className={cn(
                'mb-12 transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <Link href={`/news/${featuredPost.id}`}>
                <div className="group relative bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] hover:shadow-xl transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="aspect-video lg:aspect-auto lg:h-full overflow-hidden">
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <span className="inline-block bg-[#3B82F6]/10 text-[#3B82F6] text-sm font-medium px-3 py-1 rounded-full mb-4 w-fit">
                        Featured
                      </span>
                      <h2 className="font-display font-bold text-2xl lg:text-3xl text-[#0F172A] mb-4 group-hover:text-[#3B82F6] transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-[#64748B] mb-6 line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                          <Calendar className="w-4 h-4" />
                          {formatDate(featuredPost.date)}
                        </div>
                        <span className="inline-flex items-center gap-2 text-[#3B82F6] font-medium">
                          Read More
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <Link key={post.id} href={`/news/${post.id}`}>
                <div
                  className={cn(
                    'group bg-white rounded-xl overflow-hidden border border-[#E2E8F0] hover:shadow-lg transition-all duration-300',
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block text-xs font-medium text-[#3B82F6] mb-2">
                      {post.category}
                    </span>
                    <h3 className="font-display font-semibold text-lg text-[#0F172A] mb-3 group-hover:text-[#3B82F6] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[#64748B] mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.date)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 bg-[#F8FAFC] hover:bg-[#E2E8F0] text-[#0F172A] font-medium px-8 py-3 rounded-lg transition-colors">
              Load More
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
