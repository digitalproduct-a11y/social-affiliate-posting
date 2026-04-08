export interface FormData {
  productName: string;
  affiliateLink: string;
  angle: string;
  targetAudience: string;
  tone: string;
  brand: string;
}

export interface ThreadPost {
  postNumber: number;
  title: string;
  content: string;
}

export interface ThreadsResult {
  contentLabel: string;
  posts: ThreadPost[];
}

export interface FacebookResult {
  contentLabel: string;
  paragraphs: string[];
  fullText: string;
}

export interface GenerationResult {
  sessionId: string;
  createdAt: string;
  productName: string;
  affiliateLink: string;
  affiliateLinkGenerated: string;
  angle: string;
  targetAudience: string;
  tone: string;
  threads: ThreadsResult;
  facebook: FacebookResult;
  thumbnailUrl?: string;
}

export type AppState = 'idle' | 'loading' | 'success' | 'error';
