export async function POST(request: Request) {
  try {
    const data = await request.json();
    const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;

    if (!webhookUrl) {
      return Response.json({ error: 'Webhook URL not configured' }, { status: 500 });
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.text();
      return Response.json({ error: `Webhook error: ${response.status}` }, { status: response.status });
    }

    let responseData: any = await response.json();

    // n8n webhook returns array, unwrap it
    if (Array.isArray(responseData)) {
      if (responseData.length === 0) {
        return Response.json({ error: 'Empty response from webhook' }, { status: 500 });
      }
      responseData = responseData[0];
    }

    return Response.json(responseData);
  } catch (error) {
    console.error('Generate error:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
