# AI Google Calendar Assistant

An AI-powered Google Calendar automation system built using n8n and a Next.js frontend, packaged in a fully reproducible Docker environment.

## 1) Executive Summary

### Problem
Busy students and professionals rely heavily on digital calendars, yet the process of manually adding events, writing descriptions, and keeping entries organized is slow and error-prone. Many people want an automated assistant that handles repetitive scheduling tasks for them without needing to learn complicated tools.

### Solution
This project provides an AI-driven Google Calendar Assistant built on n8n agentic workflows. The workflow automatically generates and adds calendar events using natural language inputs, with optional summarization and enhancement by an LLM. A lightweight Next.js interface supports interaction and testing, while Docker guarantees reproducible builds and deployment. The result is a fully automated, containerized system for intelligent calendar management.

## 2) System Overview

### Course Concepts Used
- N8N Agentic Workflows: Used to orchestrate multi-step tasks: LLM prompting, Google Calendar API calls, credential handling, and error recovery.
- Cloud Services / APIs / Containers: Ensures the entire application builds and runs identically on any machine, fulfilling the reproducibility requirement.

### Architecture Diagram
![](/assets/workflow.png).

### Data / Models / Services
| Component | Description |
|----------|-------------|
| Google Calendar API | Reads/writes events through OAuth-authenticated operations |
| AI Model | Transforms user inputs into structured event data |
| n8n Workflow | Core automation pipeline: receives inputs, generates event metadata, writes to calendar |
| Next.js App | Provides optional UI for triggering or testing workflow behavior |
| Docker Container | Reproducible environment that runs Next.js in production mode |

## 3) How to Run (Local)

### Next.js App
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

### n8n Workflow Setup

#### What It Is
The workflow imports directly into n8n and handles:
- Natural-language event creation
- Event summarization (WIP)
- Event update syncing (WIP)

#### Quick Start (Minimal Setup)
1. Launch n8n (cloud or self-hosted).
2. Import `My_workflow.json`: Workflows → Import → Import from File
3. Add required credentials: Google Calendar API, AI API (OpenAI, Gemini, etc.)
4. Replace placeholder calendar IDs / keys.
5. Run manually or attach a trigger (webhook, schedule, etc.).

### Docker (Reproducible One-Command Run)
This project includes a production Dockerfile.

#### Environment Setup
This project includes a .env.example file with placeholder values.
Before running the project, create your actual environment file:

```bash
cp .env.example .env
```
Then edit .env and fill in your real credentials (Google OAuth + AI API keys).

#### One Command Build + Run

```bash
docker build -t calendar-ai:latest . && docker run --rm -p 3000:3000 --env-file .env calendar-ai:latest
```

## 4) Design Decisions
#### Why n8n?
n8n enables low-code orchestration of multi-step workflows involving API calls, authentication, error handling, and LLM processing. This aligns directly with the Workflow Automation competency from the course and reduces backend complexity.

Alternatives Considered
- Custom Node backend: more control, but significantly more boilerplate for OAuth, scheduling, and retries.
- Google Apps Script: limited flexibility and harder to integrate with LLM APIs.
- Direct client-side API calls: insecure for OAuth tokens.

Tradeoffs
- n8n introduces overhead compared to hand-written scripts.
- Workflow debugging is sometimes slower than code-level debugging.
- LLM steps add cost and latency.

Security & Privacy
- No secrets committed to the repository; .env handles all sensitive variables.
- OAuth tokens remain inside n8n’s encrypted credential layer.
- AI receives only minimal metadata required for summarization.
- Because events may include sensitive information, users should avoid sending full private descriptions to the AI model unless using a provider they trust.

Ops Considerations
- n8n provides built-in logs for each workflow execution.
- Failures trigger retry logic where needed (e.g., Google Calendar rate limits).
- Docker ensures consistent Node.js versioning and build output with Next.js.
- Application can scale horizontally by running multiple containers behind a load balancer.

## 5) Results & Evaluation

### What Works

✔ Natural-language event creation

✔ Reproducible workflow import

✔ Successful Google Calendar writes

✔ Fully Dockerized Next.js frontend

✔ Build success across clean environments (verified via Docker)


### Example Output

```json
{
  "eventCreated": true,
  "title": "Lunch with John",
  "start": "2025-01-05T13:00:00",
  "description": "Lunch meeting generated by AI Assistant."
}
```

### Validation & Testing

- Smoke tests performed by importing workflow into a clean n8n instance and triggering event generation.
- Verified correct OAuth handling and Google Calendar write access.
- Tested failure cases including missing scopes and invalid time formats.

### What's Next

Planned improvements:

- Add event update/delete functionality
- Real-time event syncing via webhooks
- Daily automated digest emails

## 7) Links
GitHub Repo: [LINK](https://github.com/HelenBedsole/calendar-ai-app)
Varcel Cloud Deployment: [LINK](https://calendar-ai-app-seven.vercel.app)

Note: n8n Cloud services used during deployment.
