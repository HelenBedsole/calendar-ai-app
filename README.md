This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## n8n Workflow (AI Google Calendar Assistant)

### What it is  
This workflow (file: `AI Google Calendar Assistant (Fixed).json`) is a ready-to-use automation for [describe briefly what it does: e.g. “sync events, generate summaries/descriptions with AI, integrate with Google Calendar,” etc.].

### Quick Start (Minimal-effort)

1. Make sure you have an n8n instance (self-hosted or cloud).  
2. Download or copy the JSON file from this repo.  
3. In n8n → Workflows → Import → **Import from File**, or open a new workflow and paste the JSON.  
4. Update credentials and settings (replace placeholders with real API keys / calendar IDs / config values).  
5. Save and trigger the workflow to test.  

### Detailed Setup & Configuration  

| Step | What you need to do |
|------|---------------------|
| Credentials | Create/select credentials for any external services used (Google APIs, AI APIs, HTTP nodes, etc.) in n8n. |
| Configuration | Replace placeholder values (IDs, URLs, keys) inside the workflow with your own. |
| Optional tweaks | Update trigger type, AI prompts, calendar settings, etc., to fit your needs. |

### Troubleshooting & Tips  

- If paste-import doesn’t work: try “Import from File.”  
- Always check each node for required credentials before running.  
- If using webhooks or external APIs, make sure they are reachable / authorized by your n8n instance.

