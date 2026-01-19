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
      <section className="relative py-32 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
        <div className="container mx-auto px-4 text-center">
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
