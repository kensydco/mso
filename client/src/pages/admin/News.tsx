import { useState, useRef } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Plus, Edit, Trash2, ImageIcon, Upload, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';

interface NewsForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  isFeatured: boolean;
  isPublished: boolean;
}

const DEFAULT_FORM: NewsForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  image: '',
  category: '',
  isFeatured: false,
  isPublished: false,
};

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

interface NewsArticle {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  image?: string;
  category?: string;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string | Date;
}

export default function AdminNews() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<NewsForm>(DEFAULT_FORM);
  const [isUploading, setIsUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const utils = trpc.useUtils();
  const { data: articles, isLoading } = trpc.news.listAll.useQuery();

  const createMutation = trpc.news.create.useMutation({
    onSuccess: () => {
      utils.news.listAll.invalidate();
      utils.news.list.invalidate();
      utils.news.categories.invalidate();
      setIsDialogOpen(false);
      setForm(DEFAULT_FORM);
      toast.success('Article created successfully');
    },
    onError: (err) => toast.error(err.message),
  });

  const updateMutation = trpc.news.update.useMutation({
    onSuccess: () => {
      utils.news.listAll.invalidate();
      utils.news.list.invalidate();
      utils.news.categories.invalidate();
      setIsDialogOpen(false);
      setEditingId(null);
      setForm(DEFAULT_FORM);
      toast.success('Article updated successfully');
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteMutation = trpc.news.delete.useMutation({
    onSuccess: () => {
      utils.news.listAll.invalidate();
      utils.news.list.invalidate();
      utils.news.categories.invalidate();
      setDeleteId(null);
      toast.success('Article deleted successfully');
    },
    onError: (err) => toast.error(err.message),
  });

  const uploadMutation = trpc.upload.logo.useMutation({
    onSuccess: (data: { url: string }) => {
      setForm((f) => ({ ...f, image: data.url }));
      setIsUploading(false);
    },
    onError: (err) => {
      toast.error(err.message);
      setIsUploading(false);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const fileData = (reader.result as string).split(',')[1];
      uploadMutation.mutate({ fileName: file.name, fileData, contentType: file.type, folder: 'news' });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.title || !form.slug) {
      toast.error('Title and slug are required');
      return;
    }
    const payload = {
      ...form,
      publishedAt: form.isPublished ? new Date() : undefined,
    };
    if (editingId) {
      updateMutation.mutate({ id: editingId, ...payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleEdit = (article: NewsArticle) => {
    setEditingId(article.id);
    setForm({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt || '',
      content: article.content || '',
      image: article.image || '',
      category: article.category || '',
      isFeatured: article.isFeatured,
      isPublished: article.isPublished,
    });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingId(null);
    setForm(DEFAULT_FORM);
    setIsDialogOpen(true);
  };

  const handleTitleChange = (title: string) => {
    setForm((f) => ({ ...f, title, slug: editingId ? f.slug : slugify(title) }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A]">News</h1>
            <p className="text-[#64748B] mt-1">Manage news articles and announcements</p>
          </div>
          <Button onClick={handleAdd} className="bg-[#3B82F6] hover:bg-[#2563EB]">
            <Plus className="w-4 h-4 mr-2" />
            Add Article
          </Button>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-8 text-center text-[#64748B]">Loading...</div>
            ) : articles?.length === 0 ? (
              <div className="p-8 text-center">
                <Newspaper className="w-12 h-12 mx-auto text-[#CBD5E1] mb-4" />
                <p className="text-[#64748B]">No articles yet</p>
                <Button onClick={handleAdd} variant="link" className="text-[#3B82F6]">
                  Create your first article
                </Button>
              </div>
            ) : (
              <div className="divide-y">
                {articles?.map((article: NewsArticle) => (
                  <div
                    key={article.id}
                    className="p-4 flex items-center justify-between hover:bg-[#F8FAFC]"
                  >
                    <div className="flex items-center gap-4">
                      {article.image ? (
                        <img
                          src={article.image}
                          alt=""
                          className="w-16 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-12 bg-[#F1F5F9] rounded flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-[#94A3B8]" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-[#0F172A]">{article.title}</h3>
                          {article.isFeatured && (
                            <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-700">
                              Featured
                            </span>
                          )}
                          <span className={`px-2 py-0.5 text-xs rounded-full ${
                            article.isPublished
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {article.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-[#64748B]">
                          {article.category && <span>{article.category}</span>}
                          <span>• {new Date(article.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(article)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteId(article.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Create / Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Article' : 'Add Article'}</DialogTitle>
              <DialogDescription>
                {editingId ? 'Update the article details' : 'Create a new news article'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Article title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="article-url-slug"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="e.g., Company News, Brand Updates, Industry"
                />
              </div>
              <div className="space-y-2">
                <Label>Featured Image</Label>
                <div className="border-2 border-dashed border-[#E2E8F0] rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    {form.image ? (
                      <div className="relative">
                        <img
                          src={form.image}
                          alt="Article image"
                          className="w-32 h-20 object-cover rounded-lg"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
                          onClick={() => setForm({ ...form, image: '' })}
                        >
                          ×
                        </Button>
                      </div>
                    ) : (
                      <div className="w-32 h-20 rounded-lg bg-[#F1F5F9] flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-[#94A3B8]" />
                      </div>
                    )}
                    <div className="flex-1">
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileRef.current?.click()}
                        disabled={isUploading}
                        className="mb-2"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {isUploading ? 'Uploading...' : 'Upload Image'}
                      </Button>
                      <p className="text-xs text-[#64748B]">
                        Recommended: 1200×630px (16:9 aspect ratio)
                      </p>
                      <p className="text-xs text-[#94A3B8] mt-1">
                        Max file size: 5MB • JPG, PNG, or WebP
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Label htmlFor="imageUrl" className="text-xs text-[#64748B]">
                      Or enter URL directly:
                    </Label>
                    <Input
                      id="imageUrl"
                      value={form.image}
                      onChange={(e) => setForm({ ...form, image: e.target.value })}
                      placeholder="https://..."
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="Brief summary of the article..."
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Full article content (supports Markdown)"
                  rows={8}
                />
                <p className="text-xs text-[#94A3B8]">
                  Supports Markdown formatting: **bold**, *italic*, [links](url), etc.
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    id="isFeatured"
                    checked={form.isFeatured}
                    onCheckedChange={(v) => setForm({ ...form, isFeatured: v })}
                  />
                  <Label htmlFor="isFeatured">Featured</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="isPublished"
                    checked={form.isPublished}
                    onCheckedChange={(v) => setForm({ ...form, isPublished: v })}
                  />
                  <Label htmlFor="isPublished">Published</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-[#3B82F6] hover:bg-[#2563EB]"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {editingId ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Article</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this article? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => deleteId && deleteMutation.mutate({ id: deleteId })}
                disabled={deleteMutation.isPending}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
