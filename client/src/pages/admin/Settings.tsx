import { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Save, Upload, ImageIcon, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, FileUser, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';

const SETTINGS_KEYS = [
  'contact_email',
  'contact_phone',
  'contact_address',
  'notification_email',
  'social_linkedin',
  'social_twitter',
  'social_facebook',
  'social_instagram',
  'company_name',
  'company_tagline',
  'company_description',
  'company_logo',
  'company_favicon',
  'email_confirmation_enabled',
  'email_confirmation_subject',
  'email_confirmation_body',
  'email_from_name',
];

const DEFAULT_EMAIL_SUBJECT = 'Thank you for your application - {{position_title}}';
const DEFAULT_EMAIL_BODY = `Dear {{first_name}},

Thank you for applying for the {{position_title}} position at {{company_name}}.

We have received your application and our team will review it carefully. If your qualifications match our requirements, we will contact you to discuss next steps.

Best regards,
The {{company_name}} Team`;

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [isLogoUploading, setIsLogoUploading] = useState(false);
  const [isFaviconUploading, setIsFaviconUploading] = useState(false);
  const logoRef = useRef<HTMLInputElement>(null);
  const faviconRef = useRef<HTMLInputElement>(null);

  const utils = trpc.useUtils();
  const { data: settingsData, isLoading } = trpc.settings.getMultiple.useQuery(
    { keys: SETTINGS_KEYS },
    { placeholderData: (prev) => prev || {} }
  );

  const setSettingMutation = trpc.settings.set.useMutation({
    onError: (err) => toast.error(err.message),
  });

  const uploadMutation = trpc.upload.logo.useMutation({
    onError: (err) => toast.error(err.message),
  });

  const sendTestEmailMutation = trpc.settings.sendTestEmail.useMutation({
    onSuccess: () => toast.success(`Test email sent`),
    onError: (err) => toast.error(err.message),
  });

  useEffect(() => {
    if (settingsData) {
      setSettings(settingsData as Record<string, string>);
      setIsDirty(false);
    }
  }, [settingsData]);

  const updateSetting = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    try {
      const saves = Object.entries(settings).map(([key, value]) => {
        if (value !== ((settingsData as Record<string, string>)?.[key] || '')) {
          return setSettingMutation.mutateAsync({ key, value });
        }
        return Promise.resolve();
      });
      await Promise.all(saves);
      setIsDirty(false);
      toast.success('Settings saved successfully');
    } catch {
      toast.error('Failed to save settings');
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Logo must be less than 5MB');
      return;
    }
    setIsLogoUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const fileData = (reader.result as string).split(',')[1];
        const result = await uploadMutation.mutateAsync({
          fileName: file.name,
          fileData,
          contentType: file.type,
          folder: 'company',
        });
        updateSetting('company_logo', result.url);
        toast.success('Logo uploaded successfully');
      } catch {
        toast.error('Failed to upload logo');
      } finally {
        setIsLogoUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1 * 1024 * 1024) {
      toast.error('Favicon must be less than 1MB');
      return;
    }
    setIsFaviconUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const fileData = (reader.result as string).split(',')[1];
        const result = await uploadMutation.mutateAsync({
          fileName: file.name,
          fileData,
          contentType: file.type,
          folder: 'company',
        });
        updateSetting('company_favicon', result.url);
        toast.success('Favicon uploaded successfully');
      } catch {
        toast.error('Failed to upload favicon');
      } finally {
        setIsFaviconUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSendTestEmail = async () => {
    const toEmail = settings.notification_email || settings.contact_email;
    if (!toEmail) {
      toast.error('Please configure a notification or contact email first');
      return;
    }
    try {
      await sendTestEmailMutation.mutateAsync({
        toEmail,
        subject: settings.email_confirmation_subject || DEFAULT_EMAIL_SUBJECT,
        body: settings.email_confirmation_body || DEFAULT_EMAIL_BODY,
        fromName: settings.email_from_name || 'Kensyd Companies',
      });
    } catch {
      toast.error('Failed to send test email');
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-[#64748B]">Loading settings...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A]">Settings</h1>
            <p className="text-[#64748B] mt-1">Configure site settings and contact information</p>
          </div>
          <Button
            onClick={handleSave}
            className="bg-[#3B82F6] hover:bg-[#2563EB]"
            disabled={!isDirty || setSettingMutation.isPending}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>

        {/* Company Branding */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Company Branding</CardTitle>
            <CardDescription>Logo and favicon displayed across the website</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Logo */}
            <div className="space-y-2">
              <Label>Company Logo</Label>
              <div className="border-2 border-dashed border-[#E2E8F0] rounded-lg p-4">
                <div className="flex items-start gap-4">
                  {settings.company_logo ? (
                    <div className="relative">
                      <img
                        src={settings.company_logo}
                        alt="Company logo"
                        className="h-16 max-w-[200px] object-contain rounded-lg bg-gray-100 p-2"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
                        onClick={() => updateSetting('company_logo', '')}
                      >
                        ×
                      </Button>
                    </div>
                  ) : (
                    <div className="h-16 w-32 rounded-lg bg-[#F1F5F9] flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-[#94A3B8]" />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      ref={logoRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => logoRef.current?.click()}
                      disabled={isLogoUploading}
                      className="mb-2"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {isLogoUploading ? 'Uploading...' : 'Upload Logo'}
                    </Button>
                    <p className="text-xs text-[#64748B]">
                      Recommended: 400×100px (horizontal) or 200×200px (square)
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-1">
                      PNG or SVG with transparent background • Max 5MB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Favicon */}
            <div className="space-y-2">
              <Label>Favicon</Label>
              <div className="border-2 border-dashed border-[#E2E8F0] rounded-lg p-4">
                <div className="flex items-start gap-4">
                  {settings.company_favicon ? (
                    <div className="relative">
                      <img
                        src={settings.company_favicon}
                        alt="Favicon"
                        className="w-12 h-12 object-contain rounded bg-gray-100 p-1"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
                        onClick={() => updateSetting('company_favicon', '')}
                      >
                        ×
                      </Button>
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded bg-[#F1F5F9] flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-[#94A3B8]" />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      ref={faviconRef}
                      type="file"
                      accept="image/png,image/x-icon,image/svg+xml"
                      onChange={handleFaviconUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => faviconRef.current?.click()}
                      disabled={isFaviconUploading}
                      className="mb-2"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {isFaviconUploading ? 'Uploading...' : 'Upload Favicon'}
                    </Button>
                    <p className="text-xs text-[#64748B]">
                      Recommended: 32×32px or 64×64px (square)
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-1">
                      ICO, PNG, or SVG • Max 1MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Information */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Company Information</CardTitle>
            <CardDescription>Basic company details displayed on the website</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                value={settings.company_name || ''}
                onChange={(e) => updateSetting('company_name', e.target.value)}
                placeholder="Kensyd Companies"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company_tagline">Tagline</Label>
              <Input
                id="company_tagline"
                value={settings.company_tagline || ''}
                onChange={(e) => updateSetting('company_tagline', e.target.value)}
                placeholder="Building Brands That Matter"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company_description">Description</Label>
              <Textarea
                id="company_description"
                value={settings.company_description || ''}
                onChange={(e) => updateSetting('company_description', e.target.value)}
                placeholder="Brief company description..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
            <CardDescription>Public contact details for the website</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact_email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#64748B]" />
                Contact Email
              </Label>
              <Input
                id="contact_email"
                type="email"
                value={settings.contact_email || ''}
                onChange={(e) => updateSetting('contact_email', e.target.value)}
                placeholder="info@kensydcompanies.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#64748B]" />
                Phone Number
              </Label>
              <Input
                id="contact_phone"
                value={settings.contact_phone || ''}
                onChange={(e) => updateSetting('contact_phone', e.target.value)}
                placeholder="(901) 555-0123"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_address" className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#64748B]" />
                Address
              </Label>
              <Textarea
                id="contact_address"
                value={settings.contact_address || ''}
                onChange={(e) => updateSetting('contact_address', e.target.value)}
                placeholder="123 Main Street, Memphis, TN 38103"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Notification Settings</CardTitle>
            <CardDescription>
              Email address for receiving job applications and contact form submissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notification_email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#64748B]" />
                Notification Email
              </Label>
              <Input
                id="notification_email"
                type="email"
                value={settings.notification_email || ''}
                onChange={(e) => updateSetting('notification_email', e.target.value)}
                placeholder="hr@kensydcompanies.com"
              />
              <p className="text-xs text-[#94A3B8]">
                Job applications and contact form submissions will be sent to this email address.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Application Confirmation Email */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileUser className="w-5 h-5 text-[#3B82F6]" />
              Application Confirmation Email
            </CardTitle>
            <CardDescription>
              Customize the automatic confirmation email sent to applicants after they submit their application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email_confirmation_enabled">Enable Confirmation Emails</Label>
                <p className="text-xs text-[#94A3B8]">
                  Send automatic confirmation emails to applicants
                </p>
              </div>
              <Switch
                id="email_confirmation_enabled"
                checked={settings.email_confirmation_enabled === 'true'}
                onCheckedChange={(v) => updateSetting('email_confirmation_enabled', v ? 'true' : 'false')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email_from_name">From Name</Label>
              <Input
                id="email_from_name"
                value={settings.email_from_name || ''}
                onChange={(e) => updateSetting('email_from_name', e.target.value)}
                placeholder="Kensyd Companies"
              />
              <p className="text-xs text-[#94A3B8]">
                The name that appears as the sender of the email
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email_confirmation_subject">Email Subject</Label>
              <Input
                id="email_confirmation_subject"
                value={settings.email_confirmation_subject || ''}
                onChange={(e) => updateSetting('email_confirmation_subject', e.target.value)}
                placeholder={DEFAULT_EMAIL_SUBJECT}
              />
              <p className="text-xs text-[#94A3B8]">
                Available variables: {'{{position_title}}'}, {'{{first_name}}'}, {'{{last_name}}'}, {'{{company_name}}'}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email_confirmation_body">Email Body</Label>
              <Textarea
                id="email_confirmation_body"
                value={settings.email_confirmation_body || ''}
                onChange={(e) => updateSetting('email_confirmation_body', e.target.value)}
                placeholder={DEFAULT_EMAIL_BODY}
                rows={12}
                className="font-mono text-sm"
              />
              <p className="text-xs text-[#94A3B8]">
                Available variables: {'{{position_title}}'}, {'{{first_name}}'}, {'{{last_name}}'}, {'{{company_name}}'}, {'{{brand_name}}'}, {'{{brand_logo}}'}
              </p>
            </div>
            <div className="pt-2">
              <Button
                variant="outline"
                onClick={handleSendTestEmail}
                disabled={sendTestEmailMutation.isPending}
                className="w-full sm:w-auto"
              >
                <Send className="w-4 h-4 mr-2" />
                {sendTestEmailMutation.isPending ? 'Sending...' : 'Send Test Email'}
              </Button>
              <p className="text-xs text-[#94A3B8] mt-2">
                Sends a test email to the notification email address with sample data
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Social Media</CardTitle>
            <CardDescription>Social media profile links</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="social_linkedin" className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-[#64748B]" />
                LinkedIn
              </Label>
              <Input
                id="social_linkedin"
                value={settings.social_linkedin || ''}
                onChange={(e) => updateSetting('social_linkedin', e.target.value)}
                placeholder="https://linkedin.com/company/kensyd-companies"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="social_twitter" className="flex items-center gap-2">
                <Twitter className="w-4 h-4 text-[#64748B]" />
                Twitter / X
              </Label>
              <Input
                id="social_twitter"
                value={settings.social_twitter || ''}
                onChange={(e) => updateSetting('social_twitter', e.target.value)}
                placeholder="https://twitter.com/kensydcompanies"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="social_facebook" className="flex items-center gap-2">
                <Facebook className="w-4 h-4 text-[#64748B]" />
                Facebook
              </Label>
              <Input
                id="social_facebook"
                value={settings.social_facebook || ''}
                onChange={(e) => updateSetting('social_facebook', e.target.value)}
                placeholder="https://facebook.com/kensydcompanies"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="social_instagram" className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-[#64748B]" />
                Instagram
              </Label>
              <Input
                id="social_instagram"
                value={settings.social_instagram || ''}
                onChange={(e) => updateSetting('social_instagram', e.target.value)}
                placeholder="https://instagram.com/kensydcompanies"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
