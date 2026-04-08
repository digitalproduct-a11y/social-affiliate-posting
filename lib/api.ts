import { FormData, GenerationResult } from './types';

export async function generateAffiliateLink(data: FormData): Promise<string> {
  const response = await fetch('/api/affiliate-link', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      affiliateLink: data.affiliateLink,
      brand: data.brand,
      productName: data.productName,
    }),
  });

  const result = await response.json();
  return result.shortLink || '';
}

export async function generateThumbnail(data: FormData): Promise<string> {
  const response = await fetch('/api/thumbnail', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      brand: data.brand,
      productName: data.productName,
    }),
  });

  const result = await response.json();
  return result.thumbnailUrl || '';
}

export async function generateContent(data: FormData): Promise<GenerationResult> {
  const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error('NEXT_PUBLIC_WEBHOOK_URL not configured');
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Webhook error: ${response.status}`);
    }

    let responseData: any = await response.json();

    // n8n webhook returns array, unwrap it
    if (Array.isArray(responseData)) {
      if (responseData.length === 0) {
        throw new Error('Empty response from webhook');
      }
      responseData = responseData[0];
    }

    return responseData;
  } catch (err) {
    if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
      throw new Error('CORS error on localhost. This works in production. Try building: npm run build && npm run start');
    }
    throw err;
  }
}
