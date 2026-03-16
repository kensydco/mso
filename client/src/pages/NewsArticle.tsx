/**
 * News Article Page - Individual news article view
 * Fetches article by slug from URL params
 */

import { Link, useParams } from 'wouter';
import { ArrowLeft, Tag, Calendar } from 'lucide-react';
import Layout from '@/components/layout/Layout';

function formatDate(date: string | Date | undefined): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function NewsArticle() {
  const params = useParams<{ slug?: string }>();
  const slug = params.slug || '';

  // Loading state
  const isLoading = false;
  // Error/not found state — shown when no article matches
  const article = null as null | {
    title: string;
    category?: string;
    publishedAt?: string | Date;
    image?: string;
    excerpt?: string;
    content?: string;
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="py-20 lg:py-28 bg-[#0F172A]">
          <div className="container">
            <div className="max-w-3xl">
              <div className="h-12 w-3/4 bg-white/10 rounded animate-pulse mb-6" />
              <div className="h-6 w-1/2 bg-white/10 rounded animate-pulse" />
            </div>
          </div>
        </div>
        <section className="py-16 lg:py-20">
          <div className="container max-w-4xl">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="py-20 lg:py-28 bg-[#0F172A]">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-6">
                Article Not Found
              </h1>
              <p className="text-xl text-[#CBD5E1]">
                The article you&apos;re looking for doesn&apos;t exist or has been removed.
              </p>
            </div>
          </div>
        </div>
        <section className="py-16 lg:py-20">
          <div className="container">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-[#3B82F6] hover:text-[#2563EB] font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to News
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 lg:py-28 bg-[#0F172A]">
        <div className="container">
          <div className="max-w-4xl">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to News
            </Link>

            {article.category && (
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-[#3B82F6]" />
                <span className="text-[#3B82F6] text-sm font-medium">{article.category}</span>
              </div>
            )}

            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6 animate-fade-in-up">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 lg:py-20">
        <div className="container max-w-4xl">
          {article.image && (
            <div className="mb-12 -mt-20 relative z-10">
              <img
                src={article.image}
                alt={article.title}
                className="w-full rounded-2xl shadow-2xl object-cover max-h-[500px]"
              />
              <p className="text-xs text-[#94A3B8] mt-2 text-center">
                Recommended image size: 1200×630px (16:9 aspect ratio)
              </p>
            </div>
          )}

          {article.excerpt && (
            <p className="text-xl text-[#64748B] mb-8 leading-relaxed font-medium">
              {article.excerpt}
            </p>
          )}

          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-[#0F172A] prose-p:text-[#475569] prose-a:text-[#3B82F6] prose-a:no-underline hover:prose-a:underline">
            {article.content ? (
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            ) : (
              <p className="text-[#64748B]">No content available for this article.</p>
            )}
          </div>

          <div className="mt-12 pt-8 border-t border-[#E2E8F0]">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-[#3B82F6] hover:text-[#2563EB] font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All News
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
