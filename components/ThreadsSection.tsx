'use client';

import { ThreadsResult } from '@/lib/types';
import { PostCard } from './PostCard';
import { useState } from 'react';

interface ThreadsSectionProps {
  data: ThreadsResult;
  onPostsChange?: (posts: typeof data.posts) => void;
  hideTitle?: boolean;
}

export function ThreadsSection({
  data,
  onPostsChange,
  hideTitle = false,
}: ThreadsSectionProps) {
  const [posts, setPosts] = useState(data?.posts || []);
  const [copied, setCopied] = useState(false);

  if (!data || !data.posts || data.posts.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">No Threads posts available.</p>
      </div>
    );
  }

  const handlePostChange = (postNumber: number, newContent: string) => {
    const updated = posts.map((p) =>
      p.postNumber === postNumber ? { ...p, content: newContent } : p
    );
    setPosts(updated);
    onPostsChange?.(updated);
  };

  const handleCopyAll = async () => {
    const combined = posts.map((p) => p.content).join('\n\n---\n\n');
    try {
      await navigator.clipboard.writeText(combined);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Failed to copy');
    }
  };

  return (
    <div className="space-y-4">
      {!hideTitle && (
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Threads Posts</h2>
            {data.contentLabel && (
              <p className="text-sm text-gray-600 mt-1">{data.contentLabel}</p>
            )}
          </div>
          <button
            onClick={handleCopyAll}
            className={`py-2 px-4 rounded-lg font-medium text-sm transition ${
              copied
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
            }`}
          >
            {copied ? '✓ Copied!' : 'Copy All Threads'}
          </button>
        </div>
      )}
      {hideTitle && (
        <button
          onClick={handleCopyAll}
          className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition ${
            copied
              ? 'bg-green-100 text-green-700'
              : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
          }`}
        >
          {copied ? '✓ Copied!' : 'Copy All Threads'}
        </button>
      )}

      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard
            key={post.postNumber}
            post={post}
            onContentChange={(content) =>
              handlePostChange(post.postNumber, content)
            }
            showCopyButton={true}
          />
        ))}
      </div>
    </div>
  );
}
