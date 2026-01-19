import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/lib/ghl';
import { formatDate } from '@/lib/utils';

interface NewsCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function NewsCard({ post, featured = false }: NewsCardProps) {
  if (featured) {
    return (
      <Link
        href={`/news/${post.slug}`}
        className="block group relative overflow-hidden rounded-xl shadow-[var(--shadow-lg)] hover:shadow-[var(--shadow-xl)] transition-all duration-300"
      >
        {/* Thumbnail Placeholder */}
        <div className="w-full h-96 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-accent)] relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-8 text-white">
          <span className="inline-block px-3 py-1 bg-[var(--color-accent)] text-[var(--color-primary)] rounded-full text-xs font-semibold mb-3">
            FEATURED
          </span>
          <h3 className="text-3xl font-bold mb-2 group-hover:text-[var(--color-accent)] transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-gray-300 mb-3">
            {formatDate(post.publishedAt)} | {post.category}
          </p>
          <p className="text-base text-gray-200 line-clamp-2">{post.excerpt}</p>
          <div className="mt-4 text-[var(--color-accent)] font-semibold flex items-center">
            READ MORE →
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/news/${post.slug}`}
      className="block group bg-white rounded-xl shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] overflow-hidden transition-all duration-300 hover:-translate-y-1"
    >
      {/* Thumbnail Placeholder */}
      <div className="w-full h-48 bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-border)] overflow-hidden">
        <div className="w-full h-full group-hover:scale-110 transition-transform duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h4 className="text-xl font-semibold mb-2 text-[var(--color-text-primary)] group-hover:text-[var(--color-secondary)] transition-colors line-clamp-2">
          {post.title}
        </h4>
        <p className="text-sm text-[var(--color-text-secondary)] mb-3">
          {formatDate(post.publishedAt)}
        </p>
        <p className="text-[var(--color-text-secondary)] text-sm line-clamp-3 mb-4">
          {post.excerpt}
        </p>
        <div className="text-[var(--color-secondary)] font-semibold text-sm flex items-center group-hover:underline">
          Read More →
        </div>
      </div>
    </Link>
  );
}
