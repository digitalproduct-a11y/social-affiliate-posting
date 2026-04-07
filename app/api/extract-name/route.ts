export async function POST(request: Request) {
  try {
    const { affiliateLink } = await request.json();

    if (!affiliateLink) {
      return Response.json({ error: 'Missing affiliateLink' }, { status: 400 });
    }

    const webhookUrl = 'https://astroproduct.app.n8n.cloud/webhook/extract-product-name';

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ affiliateLink }),
    });

    if (!response.ok) {
      return Response.json({ error: 'Failed to extract name' }, { status: response.status });
    }

    let data: any = await response.json();

    // n8n webhook returns array, unwrap it
    if (Array.isArray(data)) {
      if (data.length === 0) {
        return Response.json({ error: 'Empty response from webhook' }, { status: 500 });
      }
      data = data[0];
    }

    return Response.json(data);
  } catch (error) {
    console.error('Extract name error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
