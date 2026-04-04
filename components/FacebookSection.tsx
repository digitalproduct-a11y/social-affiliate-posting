'use client';

import { FacebookResult } from '@/lib/types';
import { useState } from 'react';

interface FacebookSectionProps {
  data: FacebookResult;
  onContentChange?: (paragraphs: string[], fullText: string) => void;
  hideTitle?: boolean;
}

export function FacebookSection({
  data,
  onContentChange,
  hideTitle = false,
}: FacebookSectionProps) {
  const [paragraphs, setParagraphs] = useState(data?.paragraphs || []);
  const [fullText, setFullText] = useState(data?.fullText || '');
  const [copied, setCopied] = useState(false);

  if (!data || !data.paragraphs || data.paragraphs.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">No Facebook content available.</p>
      </div>
    );
  }

  const handleParagraphChange = (index: number, newContent: string) => {
    const updated = [...paragraphs];
    updated[index] = newContent;
    const newFullText = updated.join('\n\n');
    setParagraphs(updated);
    setFullText(newFullText);
    onContentChange?.(updated, newFullText);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Failed to copy');
    }
  };

  const charCount = fullText.length;

  return (
    <div className="space-y-4">
      {!hideTitle && (
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Facebook Post</h2>
            {data.contentLabel && (
              <p className="text-sm text-gray-600 mt-1">{data.contentLabel}</p>
            )}
          </div>
          <button
            onClick={handleCopy}
            className={`py-2 px-4 rounded-lg font-medium text-sm transition ${
              copied
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
            }`}
          >
            {copied ? '✓ Copied!' : 'Copy Facebook Post'}
          </button>
        </div>
      )}
      {hideTitle && (
        <button
          onClick={handleCopy}
          className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition ${
            copied
              ? 'bg-green-100 text-green-700'
              : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
          }`}
        >
          {copied ? '✓ Copied!' : 'Copy Facebook Post'}
        </button>
      )}

      <div className="space-y-4">
        {paragraphs.map((paragraph, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">
                Paragraph {index + 1}
              </h3>
              <span className="text-xs font-medium px-2 py-1 rounded bg-gray-100 text-gray-600">
                {paragraph.length} chars
              </span>
            </div>
            <textarea
              value={paragraph}
              onChange={(e) => handleParagraphChange(index, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>
        ))}
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Full Text Preview</h3>
          <span className="text-xs font-medium px-2 py-1 rounded bg-gray-200 text-gray-700">
            {charCount} chars
          </span>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap font-mono">
          {fullText}
        </div>
      </div>
    </div>
  );
}
