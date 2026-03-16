/**
 * Admin Applications - Review and manage job applications
 */

import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Search, Eye, Download, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type ApplicationStatus = 'new' | 'reviewing' | 'interview' | 'accepted' | 'rejected';

interface Application {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  positionTitle: string;
  status: ApplicationStatus;
  createdAt: string;
}

const statusColors: Record<ApplicationStatus, string> = {
  new: 'bg-blue-50 text-blue-700',
  reviewing: 'bg-yellow-50 text-yellow-700',
  interview: 'bg-purple-50 text-purple-700',
  accepted: 'bg-green-50 text-green-700',
  rejected: 'bg-red-50 text-red-700',
};

export default function AdminApplications() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const applications: Application[] = [];

  const filtered = applications.filter(app => {
    const matchesSearch = `${app.firstName} ${app.lastName} ${app.email} ${app.positionTitle}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Applications</h1>
          <p className="text-[#64748B] mt-1">Review and manage job applications</p>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <Input
              className="pl-9"
              placeholder="Search applications..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="reviewing">Reviewing</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="border border-[#E2E8F0]">
          <CardContent className="p-0">
            {filtered.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-[#64748B]">No applications found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E2E8F0]">
                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#64748B]">Applicant</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#64748B]">Position</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#64748B]">Status</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#64748B]">Date</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#64748B]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(app => (
                      <tr key={app.id} className="border-b border-[#E2E8F0] last:border-0 hover:bg-[#F8FAFC]">
                        <td className="px-6 py-4">
                          <p className="font-medium text-[#0F172A] text-sm">{app.firstName} {app.lastName}</p>
                          <p className="text-xs text-[#94A3B8]">{app.email}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#64748B]">{app.positionTitle}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${statusColors[app.status]}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#64748B]">{app.createdAt}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" className="text-green-600">
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500">
                              <X className="w-4 h-4" />
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
