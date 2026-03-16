/**
 * Apply Page - Job Application Form
 * Accepts positionId from query params and shows application form
 */

import { useState, useRef } from 'react';
import { Link, useSearch } from 'wouter';
import { ArrowLeft, CheckCircle, FileText, Upload, Loader2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedIn: string;
  coverLetter: string;
}

export default function Apply() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const positionId = params.get('positionId');

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedIn: '',
    coverLetter: '',
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }
    if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
      alert('Please upload a PDF or Word document');
      return;
    }
    setResumeFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }
    if (!positionId) {
      alert('No position selected');
      return;
    }
    setIsSubmitting(true);
    try {
      // Submit application logic would go here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center py-20">
          <Card className="max-w-lg w-full text-center border-0 shadow-lg">
            <CardContent className="pt-12 pb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Application Submitted!</h2>
              <p className="text-[#64748B] mb-8">
                Thank you for your application. We&apos;ll review it and get back to you soon.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/careers">
                  <Button variant="outline">View More Positions</Button>
                </Link>
                <Link href="/">
                  <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">Back to Home</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12 lg:py-20">
        <div className="container max-w-2xl">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-[#64748B] hover:text-[#3B82F6] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Careers
          </Link>

          {!positionId && (
            <div className="mb-8 p-6 bg-red-50 rounded-xl">
              <p className="text-red-800">
                No position selected. Please go back to the careers page and select a position.
              </p>
              <Link href="/careers">
                <Button variant="link" className="text-red-600 p-0 mt-2">
                  Go to Careers
                </Button>
              </Link>
            </div>
          )}

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
              <CardDescription>Please fill out the form below to apply</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(901) 555-0123"
                    />
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="space-y-2">
                  <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                  <Input
                    id="linkedIn"
                    value={formData.linkedIn}
                    onChange={e => setFormData({ ...formData, linkedIn: e.target.value })}
                    placeholder="https://linkedin.com/in/johndoe"
                  />
                </div>

                {/* Resume Upload */}
                <div className="space-y-2">
                  <Label>Resume</Label>
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                      resumeFile
                        ? 'border-green-300 bg-green-50'
                        : 'border-[#CBD5E1] hover:border-[#3B82F6]'
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    {resumeFile ? (
                      <div className="flex items-center justify-center gap-3">
                        <FileText className="w-8 h-8 text-green-600" />
                        <div className="text-left">
                          <p className="font-medium text-[#0F172A]">{resumeFile.name}</p>
                          <p className="text-sm text-[#64748B]">
                            {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={e => {
                            e.stopPropagation();
                            setResumeFile(null);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-[#CBD5E1] mx-auto mb-3" />
                        <p className="text-[#64748B]">
                          <span className="text-[#3B82F6] font-medium">Click to upload</span>
                          {' '}or drag and drop
                        </p>
                        <p className="text-sm text-[#94A3B8] mt-1">PDF or Word (max 5MB)</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Cover Letter */}
                <div className="space-y-2">
                  <Label htmlFor="coverLetter">Cover Letter</Label>
                  <Textarea
                    id="coverLetter"
                    value={formData.coverLetter}
                    onChange={e => setFormData({ ...formData, coverLetter: e.target.value })}
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    rows={6}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#3B82F6] hover:bg-[#2563EB] h-12 text-lg"
                  disabled={isSubmitting || !positionId}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
