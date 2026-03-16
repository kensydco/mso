/**
 * Admin Contact - Review contact form submissions
 */

import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Search, Eye, Trash2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type ContactStatus = 'unread' | 'read' | 'replied';

interface ContactSubmission {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
}

const statusColors: Record<ContactStatus, string> = {
  unread: 'bg-blue-50 text-blue-700',
  read: 'bg-gray-50 text-gray-700',
  replied: 'bg-green-50 text-green-700',
};

export default function AdminContact() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const submissions: ContactSubmission[] = [];

  const filtered = submissions.filter(sub => {
    const matchesSearch = `${sub.firstName} ${sub.lastName} ${sub.email} ${sub.subject}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Contact Submissions</h1>
          <p className="text-[#64748B] mt-1">Review and respond to contact form submissions</p>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <Input
              className="pl-9"
              placeholder="Search submissions..."
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
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="replied">Replied</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="border border-[#E2E8F0]">
          <CardContent className="p-0">
            {filtered.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-[#64748B]">No contact submissions found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E2E8F0]">
                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#64748B]">Sender</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#64748B]">Subject</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#64748B]">Status</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#64748B]">Date</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#64748B]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(sub => (
                      <tr key={sub.id} className="border-b border-[#E2E8F0] last:border-0 hover:bg-[#F8FAFC]">
                        <td className="px-6 py-4">
                          <p className="font-medium text-[#0F172A] text-sm">{sub.firstName} {sub.lastName}</p>
                          <p className="text-xs text-[#94A3B8]">{sub.email}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#64748B]">{sub.subject}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${statusColors[sub.status]}`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#64748B]">{sub.createdAt}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" className="text-blue-500">
                              <Mail className="w-4 h-4" />
                            </Button>
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
