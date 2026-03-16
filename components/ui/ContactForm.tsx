'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { brands } from '@/data/brands';

export function ContactForm() {
  const [formData, setFormData] = useState({
    brand: '',
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          brand: '',
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border-2 border-green-500 rounded-xl p-12 text-center">
        <div className="text-6xl mb-4">✓</div>
        <h3 className="text-2xl font-bold text-green-900 mb-4">Message Sent Successfully!</h3>
        <p className="text-green-800 mb-6">
          Thank you for contacting us. We'll get back to you as soon as possible.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-green-700 hover:text-green-900 font-semibold"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-[var(--shadow-lg)] p-8">
      <div className="space-y-6">
        {/* Brand Selection */}
        <div>
          <label htmlFor="brand" className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
            I'd like to contact: <span className="text-red-500">*</span>
          </label>
          <select
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-[var(--color-border)] rounded-lg focus:border-[var(--color-secondary)] focus:outline-none transition-colors"
          >
            <option value="">Select a brand or Kensyd HQ</option>
            <option value="kensyd-hq">Kensyd Companies HQ</option>
            {brands.map((brand) => (
              <option key={brand.slug} value={brand.slug}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-[var(--color-border)] rounded-lg focus:border-[var(--color-secondary)] focus:outline-none transition-colors"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-[var(--color-border)] rounded-lg focus:border-[var(--color-secondary)] focus:outline-none transition-colors"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
            Phone (optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-[var(--color-border)] rounded-lg focus:border-[var(--color-secondary)] focus:outline-none transition-colors"
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
            Subject <span className="text-red-500">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-[var(--color-border)] rounded-lg focus:border-[var(--color-secondary)] focus:outline-none transition-colors"
          >
            <option value="">Select a subject</option>
            <option value="general">General Inquiry</option>
            <option value="partnership">Partnership Opportunity</option>
            <option value="careers">Careers</option>
            <option value="press">Press/Media</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 border-2 border-[var(--color-border)] rounded-lg focus:border-[var(--color-secondary)] focus:outline-none transition-colors resize-none"
          />
        </div>

        {/* Error Message */}
        {status === 'error' && (
          <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 text-red-800">
            There was an error submitting your message. Please try again.
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
        >
          {status === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
        </Button>
      </div>
    </form>
  );
}
