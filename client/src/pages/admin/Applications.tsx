import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Eye, ExternalLink, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  reviewing: 'bg-yellow-100 text-yellow-700',
  interviewed: 'bg-purple-100 text-purple-700',
  offered: 'bg-indigo-100 text-indigo-700',
  hired: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

interface Application {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  positionId?: number;
  positionTitle?: string;
  resumeUrl?: string;
  linkedIn?: string;
  coverLetter?: string;
  notes?: string;
  status: string;
  createdAt: string | Date;
}

export default function AdminApplications() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const utils = trpc.useUtils();
  const { data: applications, isLoading } = trpc.applications.list.useQuery();
  const { data: selectedApp } = trpc.applications.getById.useQuery(
    { id: selectedId! },
    { enabled: selectedId !== null }
  );

  const updateStatusMutation = trpc.applications.updateStatus.useMutation({
    onSuccess: () => {
      utils.applications.list.invalidate();
      utils.applications.getById.invalidate({ id: selectedId! });
      toast.success('Status updated successfully');
    },
    onError: (err) => toast.error(err.message),
  });

  const filtered = applications?.filter(
    (a: Application) => statusFilter === 'all' || a.status === statusFilter
  );

  const handleStatusChange = (status: string) => {
    if (selectedId) {
      updateStatusMutation.mutate({ id: selectedId, status });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A]">Applications</h1>
            <p className="text-[#64748B] mt-1">Review and manage job applications</p>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="reviewing">Reviewing</SelectItem>
              <SelectItem value="interviewed">Interviewed</SelectItem>
              <SelectItem value="offered">Offered</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-8 text-center text-[#64748B]">Loading...</div>
            ) : filtered?.length === 0 ? (
              <div className="p-8 text-center">
                <Users className="w-12 h-12 mx-auto text-[#CBD5E1] mb-4" />
                <p className="text-[#64748B]">No applications found</p>
              </div>
            ) : (
              <div className="divide-y">
                {filtered?.map((app: Application) => (
                  <div key={app.id} className="p-4 flex items-center justify-between hover:bg-[#F8FAFC]">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-[#0F172A]">
                          {app.firstName} {app.lastName}
                        </h3>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${STATUS_COLORS[app.status] || 'bg-gray-100 text-gray-700'}`}>
                          {app.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-[#64748B]">
                        <span>{app.email}</span>
                        {app.positionTitle && <span>• {app.positionTitle}</span>}
                        <span>• {new Date(app.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {app.resumeUrl && (
                        <Button variant="ghost" size="sm" asChild>
                          <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedId(app.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Application Detail Dialog */}
        <Dialog open={selectedId !== null} onOpenChange={() => setSelectedId(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Application Details</DialogTitle>
              <DialogDescription>
                Review application from {selectedApp?.firstName} {selectedApp?.lastName}
              </DialogDescription>
            </DialogHeader>
            {selectedApp && (
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-[#64748B]">Name</Label>
                    <p className="font-medium">{selectedApp.firstName} {selectedApp.lastName}</p>
                  </div>
                  <div>
                    <Label className="text-[#64748B]">Email</Label>
                    <p className="font-medium">{selectedApp.email}</p>
                  </div>
                  <div>
                    <Label className="text-[#64748B]">Phone</Label>
                    <p className="font-medium">{selectedApp.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <Label className="text-[#64748B]">Position</Label>
                    <p className="font-medium">
                      {selectedApp.positionTitle || `Position #${selectedApp.positionId}`}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  {selectedApp.resumeUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={selectedApp.resumeUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Resume
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </a>
                    </Button>
                  )}
                  {selectedApp.linkedIn && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={selectedApp.linkedIn} target="_blank" rel="noopener noreferrer">
                        LinkedIn
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </a>
                    </Button>
                  )}
                </div>

                {selectedApp.coverLetter && (
                  <div>
                    <Label className="text-[#64748B]">Cover Letter</Label>
                    <div className="mt-2 p-4 bg-[#F8FAFC] rounded-lg text-sm whitespace-pre-wrap">
                      {selectedApp.coverLetter}
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <Label>Update Status</Label>
                  <div className="flex gap-4 mt-2">
                    <Select value={selectedApp.status} onValueChange={handleStatusChange}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="reviewing">Reviewing</SelectItem>
                        <SelectItem value="interviewed">Interviewed</SelectItem>
                        <SelectItem value="offered">Offered</SelectItem>
                        <SelectItem value="hired">Hired</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {selectedApp.notes && (
                  <div>
                    <Label className="text-[#64748B]">Notes</Label>
                    <div className="mt-2 p-4 bg-[#F8FAFC] rounded-lg text-sm whitespace-pre-wrap">
                      {selectedApp.notes}
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
