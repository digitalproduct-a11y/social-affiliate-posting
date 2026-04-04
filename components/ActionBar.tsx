'use client';

import { GenerationResult, FormData } from '@/lib/types';
import { useState } from 'react';

interface ActionBarProps {
  result: GenerationResult;
  formData: FormData;
  onGenerateAgain: (data: FormData) => void;
  isLoading: boolean;
}

export function ActionBar({
  result,
  formData,
  onGenerateAgain,
  isLoading,
}: ActionBarProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      console.error('Failed to copy');
    }
  };

  const threadsText = result.threads.posts
    .map((p) => p.content)
    .join('\n\n---\n\n');

  const facebookText = result.facebook.fullText;

  const everythingText = `THREADS:\n\n${threadsText}\n\n===\n\nFACEBOOK:\n\n${facebookText}`;

  const buttonClass = (isActive: boolean) =>
    `py-2 px-4 rounded-lg font-medium text-sm transition ${
      isActive
        ? 'bg-green-100 text-green-700'
        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
    }`;

  return (
    <div className="bg-gray-50 border-t border-gray-200 p-4 sticky bottom-0">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-3">
        <button
          onClick={() => copyToClipboard(threadsText, 'threads')}
          className={buttonClass(copied === 'threads')}
        >
          {copied === 'threads' ? '✓ Threads' : 'Copy Threads'}
        </button>

        <button
          onClick={() => copyToClipboard(facebookText, 'facebook')}
          className={buttonClass(copied === 'facebook')}
        >
          {copied === 'facebook' ? '✓ Facebook' : 'Copy Facebook'}
        </button>

        <button
          onClick={() => copyToClipboard(everythingText, 'all')}
          className={buttonClass(copied === 'all')}
        >
          {copied === 'all' ? '✓ All' : 'Copy All'}
        </button>

        <button
          onClick={() => onGenerateAgain(formData)}
          disabled={isLoading}
          className="py-2 px-4 rounded-lg font-medium text-sm transition bg-blue-100 hover:bg-blue-200 disabled:bg-gray-100 text-blue-700 disabled:text-gray-500"
        >
          Generate Again
        </button>

        <button
          disabled
          title="Coming soon"
          className="py-2 px-4 rounded-lg font-medium text-sm transition bg-gray-100 text-gray-400 cursor-not-allowed"
        >
          Post to Threads
        </button>

        <button
          disabled
          title="Coming soon"
          className="py-2 px-4 rounded-lg font-medium text-sm transition bg-gray-100 text-gray-400 cursor-not-allowed"
        >
          Post to Facebook
        </button>
      </div>

      <p className="text-xs text-gray-500">
        Session ID: {result.sessionId.slice(0, 20)}...
      </p>
    </div>
  );
}
