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

const BRAND_OPTIONS = [
  { value: 'stadiumastro', label: 'Stadium Astro' },
  { value: 'astroarena', label: 'Astro Arena' },
  { value: 'astroawani', label: 'Astro Awani' },
  { value: 'astroulagam', label: 'Astro Ulagam' },
  { value: 'sinar', label: 'Sinar' },
  { value: 'era', label: 'Era' },
  { value: 'hitz', label: 'Hitz' },
  { value: 'mix', label: 'Mix' },
  { value: 'raaga', label: 'Raaga' },
  { value: 'meletop', label: 'Meletop' },
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
    brand: initialData?.brand || 'stadiumastro',
  });
  const [fetchingName, setFetchingName] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const isValid =
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
      brand: 'kult',
    });
  };

  const handleFetchName = async () => {
    if (!formData.affiliateLink.trim()) {
      setFetchError('Please paste a product link first');
      return;
    }

    setFetchingName(true);
    setFetchError(null);

    try {
      const webhookUrl = 'https://astroproduct.app.n8n.cloud/webhook/extract-product-name-shopee';

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ affiliateLink: formData.affiliateLink }),
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product name');
      }

      const data = await response.json();
      const productName = data[0]?.productName || data.productName || '';

      if (productName) {
        setFormData({ ...formData, productName });
        setFetchError(null);
      } else {
        setFetchError('Could not extract product name from link');
      }
    } catch (err) {
      setFetchError(
        err instanceof Error ? err.message : 'Failed to fetch product name'
      );
    } finally {
      setFetchingName(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '6px' }}>Social Affiliate Posting</h2>
      <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '24px' }}>Fill in the product details below — we'll generate content for Threads and Facebook.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Product Link + Fetch Button */}
        <div className="md:col-span-2">
          <div className="flex gap-2">
            <div style={{ flex: 1 }}>
              <CustomInput
                label="Shopee Product Link"
                value={formData.affiliateLink}
                onChange={(value) => setFormData({ ...formData, affiliateLink: value })}
                placeholder="https://shopee.com/..."
                type="url"
              />
            </div>
            <button
              type="button"
              onClick={handleFetchName}
              disabled={fetchingName || !formData.affiliateLink.trim()}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                background: fetchingName || !formData.affiliateLink.trim() ? '#F3F4F6' : '#FFFFFF',
                color: fetchingName || !formData.affiliateLink.trim() ? '#9CA3AF' : '#374151',
                fontSize: '13px',
                fontWeight: '600',
                cursor: fetchingName || !formData.affiliateLink.trim() ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                alignSelf: 'flex-end',
                whiteSpace: 'nowrap',
              }}
            >
              {fetchingName ? 'Fetching...' : 'Fetch Name'}
            </button>
          </div>
          {fetchError && (
            <p style={{ fontSize: '12px', color: '#DC2626', marginTop: '4px' }}>
              {fetchError}
            </p>
          )}
        </div>

        {/* Product Name */}
        <div className="md:col-span-2">
          <CustomInput
            label="Product Name"
            value={formData.productName}
            onChange={(value) => setFormData({ ...formData, productName: value })}
            placeholder="e.g., Xiaomi Smart Desk Fan 30cm"
            type="text"
          />
          <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
            (Auto-extracted or edit manually)
          </p>
        </div>

        {/* Content Angle */}
        <CustomTextarea
          label="Content Angle"
          value={formData.angle}
          onChange={(value) => setFormData({ ...formData, angle: value })}
          placeholder="e.g., bilik panas dan ruang kecil"
          rows={2}
        />

        {/* Target Audience */}
        <CustomTextarea
          label="Target Audience"
          value={formData.targetAudience}
          onChange={(value) => setFormData({ ...formData, targetAudience: value })}
          placeholder="e.g., student dan orang bujang"
          rows={2}
        />

        {/* Tone */}
        <CustomSelect
          label="Tone"
          value={formData.tone}
          onChange={(value) => setFormData({ ...formData, tone: value })}
          placeholder="Select Tone"
          options={TONE_OPTIONS}
        />

        {/* Brand */}
        <CustomSelect
          label="Brand"
          value={formData.brand}
          onChange={(value) => setFormData({ ...formData, brand: value })}
          placeholder="Select Brand"
          options={BRAND_OPTIONS}
        />
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
