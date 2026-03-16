/**
 * Admin Positions Management - CRUD for job positions
 */

import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Plus, Search, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface Position {
  id: number;
  title: string;
  brandName: string;
  location: string;
  type: string;
  isActive: boolean;
}

// Placeholder data
const samplePositions: Position[] = [];

export default function AdminPositions() {
  const [search, setSearch] = useState('');

  const filtered = samplePositions.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.brandName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A]">Job Positions</h1>
            <p className="text-[#64748B] mt-1">Manage open positions across your brands</p>
          </div>
          <Button className="bg-[#3B82F6] hover:bg-[#2563EB] gap-2">
            <Plus className="w-4 h-4" />
            Add Position
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
          <Input
            className="pl-9"
            placeholder="Search positions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <Card className="border border-[#E2E8F0]">
          <CardContent className="p-0">
            {filtered.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-[#64748B]">No positions found.</p>
                <Button className="mt-4 bg-[#3B82F6] hover:bg-[#2563EB] gap-2">
                  <Plus className="w-4 h-4" />
                  Add Your First Position
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E2E8F0]">
                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#64748B]">Title</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#64748B]">Brand</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#64748B]">Location</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#64748B]">Type</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#64748B]">Status</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#64748B]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(pos => (
                      <tr key={pos.id} className="border-b border-[#E2E8F0] last:border-0 hover:bg-[#F8FAFC]">
                        <td className="px-6 py-4 font-medium text-[#0F172A] text-sm">{pos.title}</td>
                        <td className="px-6 py-4 text-sm text-[#64748B]">{pos.brandName}</td>
                        <td className="px-6 py-4 text-sm text-[#64748B]">{pos.location}</td>
                        <td className="px-6 py-4 text-sm text-[#64748B] capitalize">{pos.type}</td>
                        <td className="px-6 py-4">
                          <button className="flex items-center gap-1 text-sm">
                            {pos.isActive ? (
                              <><ToggleRight className="w-5 h-5 text-green-500" /><span className="text-green-600">Active</span></>
                            ) : (
                              <><ToggleLeft className="w-5 h-5 text-[#94A3B8]" /><span className="text-[#94A3B8]">Inactive</span></>
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
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
