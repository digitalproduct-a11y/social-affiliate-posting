'use client';

import { FormData } from '@/lib/types';
import { useState } from 'react';
import { CustomTextarea } from './CustomTextarea';
import { CustomInput } from './CustomInput';
import { CustomSelect } from './CustomSelect';

interface InputFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
  initialData?: Partial<FormData>;
}

const TONE_OPTIONS = [
  { value: 'problem-solution', label: 'Problem–Solution' },
  { value: 'soft-sell', label: 'Soft Sell' },
  { value: 'hard-sell', label: 'Hard Sell' },
  { value: 'casual-rojak', label: 'Casual / Rojak' },
  { value: 'friendly-recommendation', label: 'Friendly Recommendation' },
];

export function InputForm({
  onSubmit,
  isLoading,
  initialData,
}: InputFormProps) {
  const [formData, setFormData] = useState<FormData>({
    productName: initialData?.productName || '',
    affiliateLink: initialData?.affiliateLink || '',
    angle: initialData?.angle || '',
    targetAudience: initialData?.targetAudience || '',
    tone: initialData?.tone || '',
  });

  const isValid =
    formData.productName.trim() &&
    formData.affiliateLink.trim() &&
    formData.angle.trim() &&
    formData.targetAudience.trim() &&
    formData.tone.trim();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(formData);
    }
  };

  const handleClear = () => {
    setFormData({
      productName: '',
      affiliateLink: '',
      angle: '',
      targetAudience: '',
      tone: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '6px' }}>Social Affiliate Posting</h2>
      <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '24px' }}>Fill in the product details below — we'll generate content for Threads and Facebook.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          label="Product Name"
          value={formData.productName}
          onChange={(value) => setFormData({ ...formData, productName: value })}
          placeholder="e.g., Xiaomi Smart Desk Fan 30cm"
          type="text"
        />

        <CustomInput
          label="Shopee Product Link"
          value={formData.affiliateLink}
          onChange={(value) => setFormData({ ...formData, affiliateLink: value })}
          placeholder="https://shopee.com/..."
          type="url"
        />

        <CustomTextarea
          label="Content Angle"
          value={formData.angle}
          onChange={(value) => setFormData({ ...formData, angle: value })}
          placeholder="e.g., bilik panas dan ruang kecil"
          rows={2}
        />

        <CustomTextarea
          label="Target Audience"
          value={formData.targetAudience}
          onChange={(value) => setFormData({ ...formData, targetAudience: value })}
          placeholder="e.g., student dan orang bujang"
          rows={2}
        />

        <div className="md:col-span-2">
          <CustomSelect
            label="Tone"
            value={formData.tone}
            onChange={(value) => setFormData({ ...formData, tone: value })}
            placeholder="Select Tone"
            options={TONE_OPTIONS}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-8">
        {/* Clear Form - Left */}
        <button
          type="button"
          onClick={handleClear}
          disabled={isLoading}
          style={{
            flex: 1,
            padding: '10px 16px',
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
            background: isLoading ? '#F3F4F6' : '#FFFFFF',
            color: isLoading ? '#9CA3AF' : '#374151',
            fontSize: '13px',
            fontWeight: '600',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.background = '#F9FAFB';
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              e.currentTarget.style.background = '#FFFFFF';
            }
          }}
        >
          Clear Form
        </button>

        {/* Generate Content - Right */}
        <button
          type="submit"
          disabled={!isValid || isLoading}
          style={{
            flex: 1,
            padding: '10px 16px',
            borderRadius: '8px',
            border: 'none',
            background: !isValid || isLoading ? '#D1D5DB' : '#3B82F6',
            color: '#FFFFFF',
            fontSize: '13px',
            fontWeight: '600',
            cursor: !isValid || isLoading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            opacity: !isValid || isLoading ? 0.6 : 1,
          }}
          onMouseEnter={(e) => {
            if (isValid && !isLoading) {
              e.currentTarget.style.background = '#2563EB';
            }
          }}
          onMouseLeave={(e) => {
            if (isValid && !isLoading) {
              e.currentTarget.style.background = '#3B82F6';
            }
          }}
        >
          {isLoading ? 'Generating...' : 'Generate Content'}
        </button>
      </div>
    </form>
  );
}
