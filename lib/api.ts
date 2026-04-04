import { FormData, GenerationResult } from './types';

export async function generateContent(data: FormData): Promise<GenerationResult> {
  const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error('NEXT_PUBLIC_WEBHOOK_URL not configured');
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Webhook error: ${response.status} - ${error}`);
  }

  let responseData: any = await response.json();

  // n8n webhook returns array, unwrap it
  if (Array.isArray(responseData)) {
    if (responseData.length === 0) {
      throw new Error('Empty response from webhook');
    }
    responseData = responseData[0];
  }

  const result: GenerationResult = responseData;
  return result;
}
