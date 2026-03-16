import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Plus, Edit, Trash2, FileUser } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

interface PositionForm {
  title: string;
  brandName: string;
  location: string;
  type: string;
  category: string;
  description: string;
  requirements: string;
  responsibilities: string;
  benefits: string;
  salaryRange: string;
  isActive: boolean;
}

const DEFAULT_FORM: PositionForm = {
  title: '',
  brandName: '',
  location: '',
  type: 'full-time',
  category: '',
  description: '',
  requirements: '',
  responsibilities: '',
  benefits: '',
  salaryRange: '',
  isActive: true,
};

export default function AdminPositions() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<PositionForm>(DEFAULT_FORM);

  const utils = trpc.useUtils();
  const { data: positions, isLoading } = trpc.positions.listAll.useQuery();
  const { data: brands } = trpc.brands.listActive.useQuery();

  const createMutation = trpc.positions.create.useMutation({
    onSuccess: () => {
      utils.positions.listAll.invalidate();
      setIsDialogOpen(false);
      setForm(DEFAULT_FORM);
      toast.success('Position created successfully');
    },
    onError: (err) => toast.error(err.message),
  });

  const updateMutation = trpc.positions.update.useMutation({
    onSuccess: () => {
      utils.positions.listAll.invalidate();
      setIsDialogOpen(false);
      setEditingId(null);
      setForm(DEFAULT_FORM);
      toast.success('Position updated successfully');
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteMutation = trpc.positions.delete.useMutation({
    onSuccess: () => {
      utils.positions.listAll.invalidate();
      setDeleteId(null);
      toast.success('Position deleted successfully');
    },
    onError: (err) => toast.error(err.message),
  });

  const handleSave = () => {
    if (!form.title) {
      toast.error('Title is required');
      return;
    }
    if (editingId) {
      updateMutation.mutate({ id: editingId, ...form });
    } else {
      createMutation.mutate(form);
    }
  };

  const handleEdit = (position: PositionForm & { id: number }) => {
    setEditingId(position.id);
    setForm({
      title: position.title,
      brandName: position.brandName || '',
      location: position.location || '',
      type: position.type,
      category: position.category || '',
      description: position.description || '',
      requirements: position.requirements || '',
      responsibilities: position.responsibilities || '',
      benefits: position.benefits || '',
      salaryRange: position.salaryRange || '',
      isActive: position.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingId(null);
    setForm(DEFAULT_FORM);
    setIsDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A]">Positions</h1>
            <p className="text-[#64748B] mt-1">Manage job openings across your portfolio</p>
          </div>
          <Button onClick={handleAdd} className="bg-[#3B82F6] hover:bg-[#2563EB]">
            <Plus className="w-4 h-4 mr-2" />
            Add Position
          </Button>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-8 text-center text-[#64748B]">Loading...</div>
            ) : positions?.length === 0 ? (
              <div className="p-8 text-center">
                <FileUser className="w-12 h-12 mx-auto text-[#CBD5E1] mb-4" />
                <p className="text-[#64748B]">No positions yet</p>
                <Button onClick={handleAdd} variant="link" className="text-[#3B82F6]">
                  Create your first position
                </Button>
              </div>
            ) : (
              <div className="divide-y">
                {positions?.map((position: PositionForm & { id: number }) => (
                  <div
                    key={position.id}
                    className="p-4 flex items-center justify-between hover:bg-[#F8FAFC]"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-[#0F172A]">{position.title}</h3>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          position.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {position.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-[#64748B]">
                        {position.brandName && <span>{position.brandName}</span>}
                        {position.location && <span>• {position.location}</span>}
                        <span>• {position.type}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(position)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteId(position.id)}
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
              <DialogTitle>{editingId ? 'Edit Position' : 'Create Position'}</DialogTitle>
              <DialogDescription>
                {editingId ? 'Update the position details' : 'Add a new job opening'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g., Studio Manager"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brandName">Brand</Label>
                  <Select value={form.brandName} onValueChange={(v) => setForm({ ...form, brandName: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kensyd Companies">Kensyd Companies</SelectItem>
                      {brands?.map((b: { id: number; name: string }) => (
                        <SelectItem key={b.id} value={b.name}>{b.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g., Memphis, TN"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Employment Type</Label>
                  <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="e.g., Operations, Sales"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salaryRange">Salary Range</Label>
                  <Input
                    id="salaryRange"
                    value={form.salaryRange}
                    onChange={(e) => setForm({ ...form, salaryRange: e.target.value })}
                    placeholder="e.g., $50,000 - $70,000"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Job description..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  value={form.requirements}
                  onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                  placeholder="List requirements (one per line)"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="responsibilities">Responsibilities</Label>
                <Textarea
                  id="responsibilities"
                  value={form.responsibilities}
                  onChange={(e) => setForm({ ...form, responsibilities: e.target.value })}
                  placeholder="List responsibilities (one per line)"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="benefits">Benefits</Label>
                <Textarea
                  id="benefits"
                  value={form.benefits}
                  onChange={(e) => setForm({ ...form, benefits: e.target.value })}
                  placeholder="List benefits (one per line)"
                  rows={2}
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="isActive"
                  checked={form.isActive}
                  onCheckedChange={(v) => setForm({ ...form, isActive: v })}
                />
                <Label htmlFor="isActive">Active (visible on careers page)</Label>
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
              <DialogTitle>Delete Position</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this position? This action cannot be undone.
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
