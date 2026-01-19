// GoHighLevel API Client

const GHL_API_BASE = 'https://rest.gohighlevel.com/v1';
const GHL_API_KEY = process.env.GHL_API_KEY;

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  thumbnail?: string;
  category?: string;
  publishedAt: string;
  author?: string;
}

export async function getBlogPosts(limit = 10, offset = 0): Promise<BlogPost[]> {
  // Mock data for development - replace with actual API call when GHL credentials are available
  if (!GHL_API_KEY) {
    return mockBlogPosts.slice(offset, offset + limit);
  }

  try {
    const response = await fetch(
      `${GHL_API_BASE}/blogs/posts?limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${GHL_API_KEY}`,
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return mockBlogPosts.slice(offset, offset + limit);
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // Mock data for development
  if (!GHL_API_KEY) {
    return mockBlogPosts.find((post) => post.slug === slug) || null;
  }

  try {
    const response = await fetch(`${GHL_API_BASE}/blogs/posts/${slug}`, {
      headers: {
        Authorization: `Bearer ${GHL_API_KEY}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return mockBlogPosts.find((post) => post.slug === slug) || null;
  }
}

// Mock data for development
const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'kensyd-announces-expansion',
    title: 'Kensyd Companies Announces Strategic Expansion into New Markets',
    excerpt: 'We are excited to announce our continued growth with the addition of two new brands to our portfolio.',
    content: '<p>Full article content here...</p>',
    category: 'Company News',
    publishedAt: '2026-01-15T00:00:00Z',
    author: 'Kensyd Companies',
  },
  {
    id: '2',
    slug: 'hotworx-ithaca-opening',
    title: 'HOTWORX Ithaca Opens to Enthusiastic Community Response',
    excerpt: 'The newest HOTWORX location in upstate New York has been welcomed with open arms by the Ithaca community.',
    content: '<p>Full article content here...</p>',
    category: 'Brand Updates',
    publishedAt: '2026-01-10T00:00:00Z',
    author: 'Kensyd Companies',
  },
  {
    id: '3',
    slug: 'precision-wound-care-innovation',
    title: 'Precision Wound Management Introduces New Treatment Protocol',
    excerpt: 'Our healthcare team has developed an innovative approach to chronic wound care.',
    content: '<p>Full article content here...</p>',
    category: 'Industry',
    publishedAt: '2026-01-05T00:00:00Z',
    author: 'Kensyd Companies',
  },
];
