export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await fetch('https://astroproduct.app.n8n.cloud/webhook/social-affiliate-thumbnail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return Response.json(data, { status: response.ok ? 200 : response.status });
  } catch (error) {
    return Response.json({ error: 'Failed to generate thumbnail' }, { status: 500 });
  }
}
