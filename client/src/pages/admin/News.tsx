/**
 * Admin News Management - CRUD for news articles
 */

import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface NewsArticle {
  id: number;
  title: string;
  category: string;
  publishedAt: string;
  isPublished: boolean;
}

const articles: NewsArticle[] = [];

export default function AdminNews() {
  const [search, setSearch] = useState('');

  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A]">News</h1>
            <p className="text-[#64748B] mt-1">Manage news articles and announcements</p>
          </div>
          <Button className="bg-[#3B82F6] hover:bg-[#2563EB] gap-2">
            <Plus className="w-4 h-4" />
            New Article
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
          <Input
            className="pl-9"
            placeholder="Search articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <Card className="border border-[#E2E8F0]">
          <CardContent className="p-0">
            {filtered.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-[#64748B]">No news articles found.</p>
                <Button className="mt-4 bg-[#3B82F6] hover:bg-[#2563EB] gap-2">
                  <Plus className="w-4 h-4" />
                  Create Your First Article
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E2E8F0]">
                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#64748B]">Title</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#64748B]">Category</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#64748B]">Published</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#64748B]">Status</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#64748B]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(article => (
                      <tr key={article.id} className="border-b border-[#E2E8F0] last:border-0 hover:bg-[#F8FAFC]">
                        <td className="px-6 py-4 font-medium text-[#0F172A] text-sm">{article.title}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-[#F1F5F9] text-[#64748B] rounded text-xs">
                            {article.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#64748B]">{article.publishedAt}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            article.isPublished
                              ? 'bg-green-50 text-green-700'
                              : 'bg-yellow-50 text-yellow-700'
                          }`}>
                            {article.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
