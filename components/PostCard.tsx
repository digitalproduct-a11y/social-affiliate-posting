'use client';

import { ThreadPost } from '@/lib/types';
import { useState } from 'react';

interface PostCardProps {
  post: ThreadPost;
  onContentChange?: (content: string) => void;
  showCopyButton?: boolean;
}

export function PostCard({
  post,
  onContentChange,
  showCopyButton = true,
}: PostCardProps) {
  const [content, setContent] = useState(post.content);
  const [copied, setCopied] = useState(false);
  const charCount = content.length;
  const isWarning = charCount > 500;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    onContentChange?.(newContent);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Failed to copy');
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 font-bold text-sm rounded-full">
            {post.postNumber}
          </span>
          <h3 className="font-semibold text-gray-900">{post.title}</h3>
        </div>
        <span
          className={`text-xs font-medium px-2 py-1 rounded ${
            isWarning
              ? 'bg-orange-100 text-orange-700'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {charCount} chars
        </span>
      </div>

      <textarea
        value={content}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        rows={4}
      />

      {showCopyButton && (
        <button
          onClick={handleCopy}
          className={`w-full py-2 px-3 rounded-lg font-medium text-sm transition ${
            copied
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          {copied ? '✓ Copied!' : 'Copy Post'}
        </button>
      )}
    </div>
  );
}
