# Social Affiliate Posting

Generate affiliate social content for Threads and Facebook from Shopee product links.

## Overview

This is a full-stack web application that generates multi-channel affiliate social media content using OpenAI and Tavily search. Users input a product name, link, target angle, and audience, and the system generates:

- **5 connected Threads posts** (short-form social content)
- **1 Facebook long-form post** (4-paragraph mini-article)

The generated content is logged to Google Sheets for tracking and can be edited before publishing.

## Tech Stack

- **Frontend**: Next.js 14+ with TypeScript, Tailwind CSS
- **Backend**: n8n workflow (OpenAI + Tavily API integration)
- **Data**: Google Sheets (for logging generated content)
- **Deployment**: Vercel

## Quick Start

### Development with Mock Mode

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Create environment file** (mock mode enabled by default):
   ```bash
   cp .env.local.example .env.local
   ```

3. **Run dev server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### With Live n8n Webhook

1. Update `.env.local` with your n8n webhook URL:
   ```env
   NEXT_PUBLIC_WEBHOOK_URL=https://your-n8n-instance.app.n8n.cloud/webhook/social-affiliate
   NEXT_PUBLIC_MOCK_MODE=false
   ```

2. Ensure the n8n workflow "Social Affiliate Posting" is deployed and active

3. Run `npm run dev`

## Features

### Frontend

- **Input Form**: Product name, link, content angle, target audience, tone
- **Tone Options**: problem-solution, soft-sell, hard-sell, casual-rojak, friendly-recommendation
- **Loading State**: Animated with cycling messages
- **Results Display**: 
  - Editable Threads post cards with character count
  - Editable Facebook paragraphs with preview
- **Action Buttons**: Copy all, copy by channel, generate again
- **Mock Mode**: Test without n8n
- **Responsive**: Mobile-friendly with Tailwind CSS

### Backend (n8n)

- Tavily search for product context
- OpenAI multi-channel content generation
- JSON validation and parsing
- Google Sheets logging
- Webhook intake and response

## n8n Workflow

**Workflow name**: Social Affiliate Posting  
**Node count**: 11 nodes

**Node flow**:
```
Webhook → Prepare Data → Tavily Search → Prepare Product Context → Prepare AI Prompt → AI Agent → Format Response → Send Response
                                                                            ↓
                                                                    OpenAI Chat Model
                                                        (connected as sub-node to AI Agent)

Send Response → Split for Sheets → Append to Google Sheets
```

**Webhook endpoint**: `POST /webhook/social-affiliate`

**Request payload**:
```json
{
  "productName": "Xiaomi Smart Desk Fan 30cm",
  "affiliateLink": "https://shopee.com/product/xxx",
  "angle": "bilik panas dan ruang kecil",
  "targetAudience": "student dan orang bujang",
  "tone": "problem-solution"
}
```

**Response structure**:
```json
{
  "sessionId": "sess_...",
  "createdAt": "2024-04-04T...",
  "productName": "...",
  "affiliateLink": "...",
  "angle": "...",
  "targetAudience": "...",
  "tone": "...",
  "threads": {
    "contentLabel": "...",
    "posts": [
      { "postNumber": 1, "title": "Hook", "content": "..." },
      { "postNumber": 2, "title": "Pain Expansion", "content": "..." },
      { "postNumber": 3, "title": "Solution + Features", "content": "..." },
      { "postNumber": 4, "title": "Product Recommendation", "content": "..." },
      { "postNumber": 5, "title": "CTA", "content": "..." }
    ]
  },
  "facebook": {
    "contentLabel": "...",
    "paragraphs": ["...", "...", "...", "..."],
    "fullText": "..."
  }
}
```

## Google Sheets Integration

Generated content is logged to the `Social_Affiliate_Posts` sheet with 22 columns:

| Column | Purpose |
|---|---|
| ID | Unique identifier (social_sessionId) |
| Session ID | Request session identifier |
| Date | Timestamp of generation |
| Product Name | From input |
| Product Link | Shopee affiliate link |
| Content Angle | From input |
| Target Audience | From input |
| Tone | Selected tone |
| Threads Content Label | Internal label |
| Thread Post 1–5 | Individual post contents |
| Facebook Content Label | Internal label |
| Facebook Paragraph 1–4 | Individual paragraphs |
| Facebook Full Text | Combined full text |
| Status | Default: Draft |
| Notes | For manual annotations |

## Building for Production

```bash
npm run build
npm run start
```

## Deploying to Vercel

1. Push to GitHub
2. Import repository in Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_WEBHOOK_URL=https://your-n8n-instance.app.n8n.cloud/webhook/social-affiliate`
   - `NEXT_PUBLIC_MOCK_MODE=false`
4. Deploy

## Project Structure

```
social-affiliate-posting/
├── app/
│   ├── page.tsx           # Main page (state machine)
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Tailwind CSS
├── components/
│   ├── InputForm.tsx      # User input form
│   ├── PostCard.tsx       # Threads post card
│   ├── ThreadsSection.tsx # Threads results
│   ├── FacebookSection.tsx # Facebook results
│   ├── ActionBar.tsx      # Copy/action buttons
│   ├── LoadingState.tsx   # Loading animation
│   └── ResultsMeta.tsx    # Input summary
├── lib/
│   ├── types.ts          # TypeScript interfaces
│   ├── api.ts            # Webhook API wrapper
│   └── mock.ts           # Mock data
├── public/               # Static assets
├── .env.local.example    # Environment template
├── package.json
└── README.md
```

## Troubleshooting

| Issue | Solution |
|---|---|
| "Webhook error: 404" | Verify NEXT_PUBLIC_WEBHOOK_URL is correct, ensure n8n workflow is active |
| "AI response parsing failed" | Check n8n logs for full AI response, verify OpenAI API quota |
| "Google Sheets write failed" | Verify OAuth2 credentials are valid, ensure Social_Affiliate_Posts sheet exists |
| Mock mode showing but shouldn't | Set NEXT_PUBLIC_MOCK_MODE=false in .env.local |

## Future Enhancements

- [ ] Direct posting to Threads and Facebook via APIs
- [ ] Instagram Reels captions
- [ ] TikTok video captions
- [ ] Email newsletter templates
- [ ] Bulk CSV import for batch generation
- [ ] A/B testing framework
- [ ] Analytics dashboard for content performance
- [ ] Linkedin post variants

## Related Workflows

This project is part of the n8n Builder suite:
- **[Workflow A] Content Studio — Generate Scripts**: TikTok video script generation
- **[Workflow B] Social Affiliate Posting**: This project (multi-channel social content)
