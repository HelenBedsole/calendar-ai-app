# AI Google Calendar Assistant

This is a Next.js project bootstrapped with create-next-app.

## 1) Executive Summary

### Problem
Managing calendars is tedious: writing descriptions, keeping events organized, and syncing information across tools takes time.

### Solution
This project provides an AI-powered Google Calendar automation system built on n8n, paired with a lightweight Next.js frontend. The workflow adds events to your Google Calendar automatically using an LLM.

## 2) System Overview

### Course Concepts Used
- N8N Agentic Workflows
- Cloud Services / APIs / Containers

### Architecture Diagram
`/assets/architecture.png`.

### Data / Models / Services
| Component | Description |
|----------|-------------|
| Google Calendar Events | Titles, times, descriptions |
| AI Model | Generates summaries |
| n8n Workflow | Orchestrates automation |
| Next.js App | Optional UI |

## 3) How to Run (Local)

### Next.js App
```bash
npm install
npm run dev
```

### n8n Workflow

#### What It Is
This workflow automates Google Calendar tasks such as:
- Generating new calendar events
- Summarizing event details (WIP)
- Syncing updates back into Google Calendar (WIP)

#### Quick Start (Minimal Setup)
1. Launch n8n (cloud or self-hosted).
2. Import `AI Google Calendar Assistant (Fixed).json`: Workflows → Import → Import from File
3. Add required credentials: Google Calendar API, AI API (OpenAI, Gemini, etc.)
4. Replace placeholder calendar IDs and config values.
5. Run manually or connect triggers.

## 4) Design Decisions
#### Why n8n?
n8n offers a clean, visual, modular way to build automation pipelines. It integrates seamlessly with Google’s APIs and AI models without writing a heavy backend service.

Tradeoffs
- n8n adds some overhead compared to a raw script.
- Requires external AI API calls (rate-limits, latency).
- Debugging workflows can be slower than code-based logging.

Security & Privacy
- No secrets stored in the repo; .env handles API keys.
- OAuth credentials stored securely within n8n.
- AI receives only necessary event metadata (no sensitive PII).

## 5) Results & Evaluation
### What Works

- Natural-language event creation (“Schedule lunch with John tomorrow at 1 PM”)
- UI interaction via Next.js
- Import-and-run reproducible workflow JSON

### What's Next

- Event fetching & updating with Google Calendar API
- Event deletion and reomval process 

Validation & Testing

Smoke tests confirm workflow import and execution.

Manual tests performed with sample calendars.

Verified proper authentication and event update behavior.

## 7) Links
GitHub Repo: <INSERT URL>
