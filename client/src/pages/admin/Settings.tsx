/**
 * Admin Settings - Site configuration and settings
 */

import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminSettings() {
  const [siteName, setSiteName] = useState('Kensyd Companies');
  const [siteDescription, setSiteDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [address, setAddress] = useState('');

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Settings</h1>
          <p className="text-[#64748B] mt-1">Manage site configuration and settings</p>
        </div>

        <Card className="border border-[#E2E8F0]">
          <CardHeader className="border-b border-[#E2E8F0]">
            <CardTitle className="text-base font-semibold text-[#0F172A]">General Information</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName" className="text-sm font-medium text-[#374151]">Site Name</Label>
              <Input
                id="siteName"
                value={siteName}
                onChange={e => setSiteName(e.target.value)}
                placeholder="Site name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteDescription" className="text-sm font-medium text-[#374151]">Site Description</Label>
              <Textarea
                id="siteDescription"
                value={siteDescription}
                onChange={e => setSiteDescription(e.target.value)}
                placeholder="Brief description of your site"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#E2E8F0]">
          <CardHeader className="border-b border-[#E2E8F0]">
            <CardTitle className="text-base font-semibold text-[#0F172A]">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contactEmail" className="text-sm font-medium text-[#374151]">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
                placeholder="contact@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone" className="text-sm font-medium text-[#374151]">Phone Number</Label>
              <Input
                id="contactPhone"
                value={contactPhone}
                onChange={e => setContactPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium text-[#374151]">Address</Label>
              <Textarea
                id="address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Street address, City, State, ZIP"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button className="bg-[#3B82F6] hover:bg-[#2563EB] gap-2">
            <Save className="w-4 h-4" />
            Save Settings
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
