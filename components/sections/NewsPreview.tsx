import React from 'react';
import { Section } from '@/components/ui/Section';
import { NewsCard } from '@/components/ui/NewsCard';
import { Button } from '@/components/ui/Button';
import { getBlogPosts } from '@/lib/ghl';

export async function NewsPreview() {
  const posts = await getBlogPosts(3);

  return (
    <Section background="gray" padding="lg">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-4">
          Latest News
        </h2>
        <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          Stay updated with the latest developments from Kensyd Companies and our portfolio brands.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {posts.map((post) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </div>

      <div className="text-center">
        <Button href="/news" variant="outline" size="lg">
          VIEW ALL NEWS →
        </Button>
      </div>
    </Section>
  );
}
