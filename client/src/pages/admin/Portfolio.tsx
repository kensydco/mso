import { useState, useRef } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Plus, Edit, Trash2, GripVertical, ImageIcon, Upload, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

interface BrandForm {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  status: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  description: string;
  services: string[];
  city: string;
  state: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  sortOrder: number;
}

const DEFAULT_FORM: BrandForm = {
  slug: '',
  name: '',
  tagline: '',
  category: 'service',
  status: 'active',
  logo: '',
  primaryColor: '#3B82F6',
  secondaryColor: '#1E3A5F',
  accentColor: '#60A5FA',
  description: '',
  services: [],
  city: '',
  state: '',
  address: '',
  phone: '',
  email: '',
  website: '',
  sortOrder: 0,
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const CATEGORY_LABELS: Record<string, string> = {
  fitness: 'Fitness',
  healthcare: 'Healthcare',
  service: 'Service',
  telehealth: 'Telehealth',
  marketplace: 'Marketplace',
  education: 'Education',
};

export default function AdminPortfolio() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<BrandForm>(DEFAULT_FORM);
  const [isUploading, setIsUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const utils = trpc.useUtils();
  const { data: brands, isLoading } = trpc.brands.list.useQuery();

  const createMutation = trpc.brands.create.useMutation({
    onSuccess: () => {
      utils.brands.list.invalidate();
      setIsDialogOpen(false);
      setForm(DEFAULT_FORM);
      toast.success('Brand created successfully');
    },
    onError: (err) => toast.error(err.message),
  });

  const updateMutation = trpc.brands.update.useMutation({
    onSuccess: () => {
      utils.brands.list.invalidate();
      setIsDialogOpen(false);
      setEditingId(null);
      setForm(DEFAULT_FORM);
      toast.success('Brand updated successfully');
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteMutation = trpc.brands.delete.useMutation({
    onSuccess: () => {
      utils.brands.list.invalidate();
      setDeleteId(null);
      toast.success('Brand deleted successfully');
    },
    onError: (err) => toast.error(err.message),
  });

  const uploadMutation = trpc.upload.logo.useMutation({
    onSuccess: (data: { url: string }) => {
      setForm((f) => ({ ...f, logo: data.url }));
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
      uploadMutation.mutate({ fileName: file.name, fileData, contentType: file.type, folder: 'brands' });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.name || !form.slug) {
      toast.error('Name and slug are required');
      return;
    }
    if (editingId) {
      updateMutation.mutate({ id: editingId, ...form });
    } else {
      createMutation.mutate(form);
    }
  };

  const handleEdit = (brand: BrandForm & { id: number }) => {
    setEditingId(brand.id);
    setForm({
      slug: brand.slug,
      name: brand.name,
      tagline: brand.tagline || '',
      category: brand.category,
      status: brand.status,
      logo: brand.logo || '',
      primaryColor: brand.primaryColor || '#3B82F6',
      secondaryColor: brand.secondaryColor || '#1E3A5F',
      accentColor: brand.accentColor || '#60A5FA',
      description: brand.description || '',
      services: Array.isArray(brand.services) ? brand.services : [],
      city: brand.city || '',
      state: brand.state || '',
      address: brand.address || '',
      phone: brand.phone || '',
      email: brand.email || '',
      website: brand.website || '',
      sortOrder: brand.sortOrder || 0,
    });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingId(null);
    setForm(DEFAULT_FORM);
    setIsDialogOpen(true);
  };

  const handleNameChange = (name: string) => {
    setForm((f) => ({ ...f, name, slug: editingId ? f.slug : slugify(name) }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A]">Portfolio</h1>
            <p className="text-[#64748B] mt-1">Manage your portfolio brands</p>
          </div>
          <Button onClick={handleAdd} className="bg-[#3B82F6] hover:bg-[#2563EB]">
            <Plus className="w-4 h-4 mr-2" />
            Add Brand
          </Button>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-8 text-center text-[#64748B]">Loading...</div>
            ) : brands?.length === 0 ? (
              <div className="p-8 text-center">
                <Briefcase className="w-12 h-12 mx-auto text-[#CBD5E1] mb-4" />
                <p className="text-[#64748B]">No brands yet</p>
                <Button onClick={handleAdd} variant="link" className="text-[#3B82F6]">
                  Add your first brand
                </Button>
              </div>
            ) : (
              <div className="divide-y">
                {brands?.map((brand: BrandForm & { id: number }, idx: number) => (
                  <div
                    key={brand.id}
                    className="p-4 flex items-center justify-between hover:bg-[#F8FAFC]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-[#CBD5E1] cursor-grab" />
                        <span className="text-sm text-[#94A3B8] w-6">
                          {brand.sortOrder || idx + 1}
                        </span>
                      </div>
                      {brand.logo ? (
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="w-12 h-12 object-contain rounded-lg bg-gray-100 p-1"
                        />
                      ) : (
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: brand.primaryColor || '#3B82F6' }}
                        >
                          {brand.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-[#0F172A]">{brand.name}</h3>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${
                            brand.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {brand.status === 'active' ? 'Active' : 'Coming Soon'}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-[#64748B]">
                          <span>{CATEGORY_LABELS[brand.category] || brand.category}</span>
                          {brand.city && brand.state && (
                            <span>• {brand.city}, {brand.state}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(brand)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteId(brand.id)}
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

        {/* Edit / Create Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Brand' : 'Add Brand'}</DialogTitle>
              <DialogDescription>
                {editingId ? 'Update brand details' : 'Add a new brand to your portfolio'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Brand name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="brand-slug"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  placeholder="Short tagline"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fitness">Fitness</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                      <SelectItem value="telehealth">Telehealth</SelectItem>
                      <SelectItem value="marketplace">Marketplace</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="coming-soon">Coming Soon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="border-2 border-dashed border-[#E2E8F0] rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    {form.logo ? (
                      <div className="relative">
                        <img
                          src={form.logo}
                          alt="Brand logo"
                          className="w-24 h-24 object-contain rounded-lg bg-gray-100 p-2"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
                          onClick={() => setForm({ ...form, logo: '' })}
                        >
                          ×
                        </Button>
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-lg bg-[#F1F5F9] flex items-center justify-center">
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
                        {isUploading ? 'Uploading...' : 'Upload Logo'}
                      </Button>
                      <p className="text-xs text-[#64748B]">
                        Recommended: 400×400px, PNG or SVG with transparent background
                      </p>
                      <p className="text-xs text-[#94A3B8] mt-1">Max file size: 5MB</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Label htmlFor="logoUrl" className="text-xs text-[#64748B]">
                      Or enter URL directly:
                    </Label>
                    <Input
                      id="logoUrl"
                      value={form.logo}
                      onChange={(e) => setForm({ ...form, logo: e.target.value })}
                      placeholder="https://..."
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={form.primaryColor}
                      onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={form.primaryColor}
                      onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
                      placeholder="#3B82F6"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={form.secondaryColor}
                      onChange={(e) => setForm({ ...form, secondaryColor: e.target.value })}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={form.secondaryColor}
                      onChange={(e) => setForm({ ...form, secondaryColor: e.target.value })}
                      placeholder="#1E3A5F"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={form.accentColor}
                      onChange={(e) => setForm({ ...form, accentColor: e.target.value })}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={form.accentColor}
                      onChange={(e) => setForm({ ...form, accentColor: e.target.value })}
                      placeholder="#60A5FA"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Brand description..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="Memphis"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    placeholder="TN"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="(901) 555-0123"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="info@brand.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  placeholder="https://brand.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sortOrder">Sort Order</Label>
                <Input
                  id="sortOrder"
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
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

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Brand</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this brand? This action cannot be undone.
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
