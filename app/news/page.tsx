import React from 'react';
import { NewsCard } from '@/components/ui/NewsCard';
import { getBlogPosts } from '@/lib/ghl';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News & Press | Kensyd Companies',
  description: 'Stay updated with the latest news and developments from Kensyd Companies and our portfolio brands.',
};

export default async function NewsPage() {
  const posts = await getBlogPosts(12);
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-32 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white overflow-hidden">
        {/* Dot grid background */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        {/* News graphic: newspaper + broadcast megaphone */}
        <div className="absolute right-0 inset-y-0 flex items-center pr-4 lg:pr-12 opacity-[0.12] pointer-events-none hidden md:flex" aria-hidden="true">
          <svg width="320" height="310" viewBox="0 0 320 310" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Newspaper body */}
            <rect x="50" y="40" width="185" height="230" rx="5" stroke="white" strokeWidth="2" fill="none"/>
            {/* Fold strip on left */}
            <line x1="80" y1="40" x2="80" y2="270" stroke="white" strokeWidth="1.5"/>
            {/* Headline bar */}
            <rect x="92" y="58" width="127" height="24" rx="3" stroke="white" strokeWidth="1.5" fill="none"/>
            {/* Featured image placeholder */}
            <rect x="92" y="96" width="127" height="75" rx="3" stroke="white" strokeWidth="1.5" fill="none"/>
            {/* Image diagonal lines */}
            <line x1="92" y1="96" x2="219" y2="171" stroke="white" strokeWidth="1" opacity="0.5"/>
            <line x1="219" y1="96" x2="92" y2="171" stroke="white" strokeWidth="1" opacity="0.5"/>
            {/* Article text lines */}
            <line x1="92" y1="188" x2="219" y2="188" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="92" y1="203" x2="205" y2="203" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="92" y1="218" x2="215" y2="218" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="92" y1="233" x2="190" y2="233" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="92" y1="248" x2="210" y2="248" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            {/* Megaphone / broadcast */}
            <path d="M248 55 L290 30 L290 95 L248 70 Z" stroke="white" strokeWidth="2" fill="none" strokeLinejoin="round"/>
            <rect x="234" y="55" width="14" height="15" rx="2" stroke="white" strokeWidth="2" fill="none"/>
            {/* Sound waves */}
            <path d="M296 45 Q310 62 296 80" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M296 36 Q317 62 296 88" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            {/* Broadcast signal circles */}
            <circle cx="175" cy="285" r="8" stroke="white" strokeWidth="1.5" fill="none"/>
            <path d="M153 295 Q175 280 197 295" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M137 305 Q175 285 213 305" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Left accent */}
        <div className="absolute left-0 inset-y-0 flex items-center pl-4 lg:pl-12 opacity-[0.07] pointer-events-none hidden lg:flex" aria-hidden="true">
          <svg width="140" height="260" viewBox="0 0 140 260" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Small stacked articles */}
            <rect x="15" y="20" width="110" height="65" rx="4" stroke="white" strokeWidth="1.5" fill="none"/>
            <line x1="25" y1="38" x2="115" y2="38" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="25" y1="52" x2="100" y2="52" stroke="white" strokeWidth="1" strokeLinecap="round"/>
            <line x1="25" y1="65" x2="105" y2="65" stroke="white" strokeWidth="1" strokeLinecap="round"/>
            <rect x="15" y="100" width="110" height="65" rx="4" stroke="white" strokeWidth="1.5" fill="none"/>
            <line x1="25" y1="118" x2="115" y2="118" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="25" y1="132" x2="100" y2="132" stroke="white" strokeWidth="1" strokeLinecap="round"/>
            <line x1="25" y1="145" x2="105" y2="145" stroke="white" strokeWidth="1" strokeLinecap="round"/>
            <rect x="15" y="180" width="110" height="65" rx="4" stroke="white" strokeWidth="1.5" fill="none"/>
            <line x1="25" y1="198" x2="115" y2="198" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="25" y1="212" x2="100" y2="212" stroke="white" strokeWidth="1" strokeLinecap="round"/>
            <line x1="25" y1="225" x2="105" y2="225" stroke="white" strokeWidth="1" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">News & Press</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Stay updated with the latest developments from Kensyd Companies and our portfolio brands.
          </p>
        </div>
      </section>

      {/* News Content */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16">
              <NewsCard post={featuredPost} featured />
            </div>
          )}

          {/* Remaining Posts Grid */}
          {remainingPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingPosts.map((post) => (
                <NewsCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {posts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-[var(--color-text-secondary)]">
                No news articles available at this time.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
