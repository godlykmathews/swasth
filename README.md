```markdown
# Swasth - AFTERLIFE AI

## Overview
Swasth is a frontend-first hackathon prototype for a premium digital legacy and executor system. It helps a person create a legacy profile, store important life details, receive a family activation code, and allow trusted family members to activate an executor workflow after death.

## Problem Statement
Families often struggle to find important documents, digital accounts, subscriptions, insurance information, property records, final wishes, and memories after a loved one passes away. The process is emotionally difficult, fragmented, and usually handled too late.

## Solution
Swasth  creates a peaceful digital legacy vault where users can prepare essential information in advance. After setup, the system generates a family activation code. When a trusted family member enters the code and confirms death, the backend marks the profile as deceased, stores the event, generates executor notifications, and sends service-specific emails.

## Features
- Legacy profile creation with personal, family, and trusted contact details
- Emergency family activation code generation
- Digital asset vault for subscriptions, social accounts, financial accounts, insurance, property, documents, final wishes, and memories
- Executor activation flow with death confirmation
- Real email delivery through Gmail SMTP for executor notifications
- Supabase-backed storage for legacy records and notification logs
- Cloudinary-ready upload support
- Optional OpenAI-generated estate notification emails
- Emotional, vintage memorial-inspired UI instead of a SaaS dashboard

## Tech Stack
- Frontend: Next.js 15, TypeScript, Tailwind CSS, Framer Motion, shadcn/ui
- Backend: FastAPI
- Database: Supabase Postgres
- APIs: OpenAI API, Cloudinary API, Gmail SMTP
- Hosting: Local prototype; frontend can be deployed to Vercel, backend to Render/Railway/Fly.io

## Codex / OpenAI Usage
Codex and OpenAI tools were used throughout the build for:
- Ideation and product flow planning
- Frontend architecture and UI generation
- Vintage memorial-inspired visual design
- FastAPI backend implementation
- Supabase integration
- Debugging database and frontend runtime issues
- Gmail SMTP email integration
- OpenAI estate email generation logic
- Testing, build verification, and documentation

## Demo
Add demo or pitch video link here.

## Screenshots
Add screenshots of the landing page, setup flow, activation code page, executor confirmation page, and notification results here.

## How to Run Locally

```bash
git clone <repo-url>
cd <project-folder>
npm install
npm run dev
```

Start the backend:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cd ..
npm run backend:dev
```

Create `backend/.env` with:

```bash
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-publishable-key
CLOUDINARY_URL=your-cloudinary-url
OPENAI_API_KEY=your-openai-api-key

EMAIL_DELIVERY_ENABLED=true
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-gmail-address
SMTP_PASSWORD=your-google-app-password
SMTP_FROM_EMAIL=your-gmail-address
SMTP_TEST_RECIPIENT=your-test-recipient
SMTP_FORCE_TEST_RECIPIENT=true
```

Run the Supabase SQL schema from:

```bash
backend/sql/schema.sql
```

Frontend runs at:

```bash
http://127.0.0.1:3000
```

Backend runs at:

```bash
http://127.0.0.1:8000
```
```
