'use client';

import { useState } from 'react';
import { FormData, GenerationResult, AppState } from '@/lib/types';
import { generateContent, generateAffiliateLink, generateThumbnail } from '@/lib/api';
import { MOCK_RESULT } from '@/lib/mock';
import { InputForm } from '@/components/InputForm';
import { LoadingState } from '@/components/LoadingState';
import { ResultsMeta } from '@/components/ResultsMeta';
import { ThreadsSection } from '@/components/ThreadsSection';
import { FacebookSection } from '@/components/FacebookSection';
import { CustomTextarea } from '@/components/CustomTextarea';

export default function Home() {
  const [state, setState] = useState<AppState>('idle');
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);

  const isMockMode = process.env.NEXT_PUBLIC_MOCK_MODE === 'true';

  const handleGenerate = async (data: FormData) => {
    setFormData(data);
    setState('loading');
    setError(null);

    try {
      let result: GenerationResult;

      if (isMockMode) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        result = MOCK_RESULT;
      } else {
        const [contentResult, shortLinkResult, thumbnailResult] = await Promise.allSettled([
          generateContent(data),
          generateAffiliateLink(data),
          generateThumbnail(data),
        ]);

        if (contentResult.status === 'rejected') throw contentResult.reason;

        result = contentResult.value;
        if (shortLinkResult.status === 'fulfilled' && shortLinkResult.value) {
          const shortLink = shortLinkResult.value;
          result = { ...result, affiliateLinkGenerated: shortLink };

          // Replace original link with affiliate shortlink in content
          const originalLink = data.affiliateLink;
          const escapedLink = originalLink.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const linkRegex = new RegExp(escapedLink, 'g');

          if (result.threads?.posts) {
            result.threads.posts = result.threads.posts.map((post) => ({
              ...post,
              content: post.content.replace(linkRegex, shortLink),
            }));
          }
          if (result.facebook) {
            result.facebook = {
              ...result.facebook,
              paragraphs: result.facebook.paragraphs.map((para) => para.replace(linkRegex, shortLink)),
              fullText: result.facebook.fullText.replace(linkRegex, shortLink),
            };
          }
        }
        if (thumbnailResult.status === 'fulfilled' && thumbnailResult.value) {
          result = { ...result, thumbnailUrl: thumbnailResult.value };
        }
      }

      console.log('API Response:', result);
      setResult(result);
      setState('success');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setState('error');
    }
  };

  const handleReset = () => {
    setState('idle');
    setResult(null);
    setError(null);
    setFormData(null);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto p-4">
          <h1 className="text-[20px] font-bold text-black tracking-tight">
            Social Affiliate Posting
          </h1>
          {isMockMode && (
            <div className="mt-3 inline-block bg-yellow-100 border border-yellow-300 text-yellow-800 px-3 py-1 rounded text-sm">
              Mock Mode - Using sample data
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {state === 'idle' && (
          <div className="max-w-2xl mx-auto">
            <InputForm onSubmit={handleGenerate} isLoading={false} />
          </div>
        )}

        {state === 'loading' && (
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <LoadingState />
          </div>
        )}

        {state === 'error' && (
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-red-900 mb-2">
                Error
              </h2>
              <p className="text-red-700 mb-4">{error}</p>
              <button
                onClick={handleReset}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition"
              >
                Try Again
              </button>
            </div>

            <div className="max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Retry with different values
              </h3>
              <InputForm
                onSubmit={handleGenerate}
                isLoading={false}
                initialData={formData || undefined}
              />
            </div>
          </div>
        )}

        {state === 'success' && result && formData && (
          <div className="space-y-6 pb-32">
            <ResultsMeta data={result} />

            {/* Two-column layout: Threads left, Facebook right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Threads Section */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-black px-6 py-4 flex items-center gap-3">
                  <img src="/threads logo white.png" alt="Threads" className="w-6 h-6" />
                  <h2 className="text-xl font-bold text-white">Threads</h2>
                </div>
                <div className="p-6">
                  <ThreadsSection data={result.threads} hideTitle={true} />
                </div>
              </div>

              {/* Facebook Section */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <h2 className="text-xl font-bold text-white">Facebook</h2>
                </div>
                <div className="p-6">
                  <FacebookSection data={result.facebook} hideTitle={true} />
                </div>
              </div>
            </div>

            {/* Affiliate Link Section */}
            {result.affiliateLinkGenerated && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-3">
                  Your Affiliate Link
                </h3>
                <div className="flex items-center gap-3">
                  <input
                    id="affiliate-link-input"
                    type="text"
                    value={result.affiliateLinkGenerated}
                    readOnly
                    className="flex-1 px-4 py-2 border border-green-300 rounded-lg bg-white text-green-900 font-mono text-sm"
                  />
                  <button
                    onClick={(e) => {
                      const btn = e.currentTarget as HTMLButtonElement;
                      const input = document.getElementById('affiliate-link-input') as HTMLInputElement;
                      const text = input?.value || result.affiliateLinkGenerated;
                      const originalText = btn.textContent;
                      const showCopied = () => {
                        btn.textContent = '✓ Copied!';
                        setTimeout(() => { btn.textContent = originalText; }, 2000);
                      };
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(text).then(showCopied).catch(() => {
                          input.select();
                          document.execCommand('copy');
                          showCopied();
                        });
                      } else {
                        input.select();
                        document.execCommand('copy');
                        showCopied();
                      }
                    }}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition whitespace-nowrap"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}

            {/* AI Thumbnail Section */}
            {result.thumbnailUrl && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  🎨 AI-Generated Thumbnail
                </h3>
                <img
                  src={result.thumbnailUrl}
                  alt={result.productName}
                  className="w-full rounded-lg shadow-md mb-4"
                />
                <a
                  href={result.thumbnailUrl}
                  download={`${result.productName}-thumbnail.png`}
                  className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
                >
                  ⬇ Download Thumbnail
                </a>
              </div>
            )}

            {/* Quick Regenerate Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                🔄 Quick Regenerate
              </h3>
              <p className="text-sm text-blue-800 mb-4">
                Ubah angle, audience, atau tone tanpa perlu isi product details lagi:
              </p>
              <div className="space-y-3">
                <CustomTextarea
                  label="Content Angle"
                  value={formData.angle}
                  onChange={(value) => {
                    formData.angle = value;
                  }}
                  onBlur={(value) => {
                    formData.angle = value;
                  }}
                  placeholder="e.g., bilik panas dan ruang kecil"
                  rows={2}
                />
                <CustomTextarea
                  label="Target Audience"
                  value={formData.targetAudience}
                  onChange={(value) => {
                    formData.targetAudience = value;
                  }}
                  onBlur={(value) => {
                    formData.targetAudience = value;
                  }}
                  placeholder="e.g., student dan orang bujang"
                  rows={2}
                />
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">
                    Tone
                  </label>
                  <select
                    defaultValue={formData.tone}
                    onChange={(e) => {
                      formData.tone = e.target.value;
                    }}
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="problem-solution">Problem–Solution</option>
                    <option value="soft-sell">Soft Sell</option>
                    <option value="hard-sell">Hard Sell</option>
                    <option value="casual-rojak">Casual / Rojak</option>
                    <option value="friendly-recommendation">
                      Friendly Recommendation
                    </option>
                  </select>
                </div>
                <button
                  onClick={() => handleGenerate(formData)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                >
                  Regenerate Content
                </button>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition"
            >
              Generate New Content
            </button>

          </div>
        )}
      </div>

    </main>
  );
}
