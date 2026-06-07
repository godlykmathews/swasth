# Swasth AI

## Overview

Swasth AI is a digital legacy and executor platform that helps people organize everything their family may need after they pass away.

Instead of leaving loved ones searching through emails, documents, subscriptions, insurance policies, social media accounts, property records, and final wishes, users can securely prepare a complete digital legacy in advance.

The platform acts as a personal digital executor. It stores important life information, trusted family contacts, legal documents, insurance details, digital assets, memories, and final instructions in one place. When a verified death event is reported using a secure family activation code, the system initiates an executor workflow that guides the family through the next steps.

---

## The Problem

Families often struggle to locate important documents, insurance policies, property records, subscriptions, online accounts, and final wishes after a loved one passes away. This information is usually scattered across devices, emails, folders, and various online services, creating confusion and stress during an already difficult time. The lack of a centralized and accessible legacy management system makes the process of handling a person's digital and personal estate unnecessarily challenging.


---

## The Solution

Swasth AI provides a secure digital legacy vault where users can prepare their digital estate before it is needed.

Users can:

* Create a complete legacy profile
* Add trusted family contacts
* Store insurance and property records
* Track subscriptions and online accounts
* Upload wills and legal documents
* Preserve memories, photos, and messages
* Record final wishes and instructions

After setup, the platform generates a unique Family Activation Code that can be stored with important documents or shared with trusted relatives.

When a verified family member reports a death and submits the activation code, the system activates the Executor Workflow.

---

## Executor Workflow

Once activated, Swasth AI:

1. Marks the profile as deceased
2. Notifies designated family members
3. Generates executor guidance and checklists
4. Prepares insurance and document retrieval information
5. Organizes digital assets and subscriptions
6. Preserves memories and final messages
7. Creates a complete legacy summary for the family

Future versions may support AI-assisted document verification, memorial account requests, subscription management, and estate administration workflows.

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

---

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

## Video Demo
<a href="https://www.youtube.com/watch?v=7o7zXwC6R-k" target="_blank">
  <img src="https://img.youtube.com/vi/7o7zXwC6R-k/maxresdefault.jpg" alt="Swasth AI | Godly K Mathews | Codex Community Hackathon" width="600" />
</a>
<br>
https://www.youtube.com/watch?v=7o7zXwC6R-k

## Screenshots
<img width="3420" height="1850" alt="Screenshot 2026-06-07 at 07-22-13 Swasth AI A Digital Memorial Garden" src="https://github.com/user-attachments/assets/38014cae-b726-4bcc-bb67-3dbdc5d64546" />
<img width="3420" height="3846" alt="image" src="https://github.com/user-attachments/assets/a46c7da0-2aa5-4d5f-8866-6d44c6f4c3d0" />
<img width="1422" height="898" alt="image" src="https://github.com/user-attachments/assets/b0eb6d88-61f3-41eb-87a9-f7d9b42ac611" />
<img width="3420" height="2856" alt="Screenshot 2026-06-07 at 07-22-30 Swasth AI A Digital Memorial Garden" src="https://github.com/user-attachments/assets/3e9b859d-151d-44dc-af80-9e52e8c84e86" />
<img width="3420" height="2941" alt="604014600-7dffd385-2099-46e7-9ec2-8dadc46f8a01" src="https://github.com/user-attachments/assets/a5491bbc-5433-40fe-b453-a9ee9186e647" />


## How to Run Locally

```bash
git clone <repo-url>
cd frontend
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

https://swasth-rose.vercel.app/

Backend runs at:

```bash
http://127.0.0.1:8000
```
