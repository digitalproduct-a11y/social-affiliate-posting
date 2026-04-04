'use client';

import { GenerationResult } from '@/lib/types';

interface ResultsMetaProps {
  data: GenerationResult;
}

export function ResultsMeta({ data }: ResultsMetaProps) {
  const TONE_LABELS: Record<string, string> = {
    'problem-solution': 'Problem–Solution',
    'soft-sell': 'Soft Sell',
    'hard-sell': 'Hard Sell',
    'casual-rojak': 'Casual / Rojak',
    'friendly-recommendation': 'Friendly Recommendation',
  };

  const metaItems = [
    { label: 'Product Name', value: data.productName },
    { label: 'Shopee Link', value: data.affiliateLink },
    { label: 'Content Angle', value: data.angle },
    { label: 'Target Audience', value: data.targetAudience },
    { label: 'Tone', value: TONE_LABELS[data.tone] || data.tone },
  ];

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {metaItems.map((item) => (
        <div key={item.label}>
          <p className="text-xs font-semibold text-blue-900 mb-1">
            {item.label}
          </p>
          <p className="text-sm text-blue-700 break-words">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
