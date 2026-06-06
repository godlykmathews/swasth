# AFTERLIFE AI

A full-stack hackathon prototype for a digital estate workflow, built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, FastAPI, Supabase Postgres, Cloudinary uploads, and optional OpenAI-generated notification drafts.

## Run

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` or the port printed by Next.js.

## FastAPI Backend

The backend lives in `backend/` and uses Supabase Postgres.

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Set `SUPABASE_URL`, `SUPABASE_KEY`, `SUPABASE_DB_PASSWORD`, `CLOUDINARY_URL`, and optionally `OPENAI_API_KEY` in `backend/.env`, then run:

```bash
npm run backend:dev
```

The frontend reads `NEXT_PUBLIC_API_URL`, defaulting to `http://127.0.0.1:8000`.

If `db.<project-ref>.supabase.co` does not resolve, copy the Supabase dashboard's database pooler URI into `DATABASE_URL` in `backend/.env`.

## Workflow

- `/` quiet entry page
- `/setup` create the legacy record in Supabase
- `/activation-code` display the generated family activation code
- `/executor` enter the code, mark the person deceased, and generate separate dummy notification emails for subscriptions, social accounts, financial accounts, and insurance policies

Older concept pages are still present for reference, but the primary flow is `/`, `/setup`, `/activation-code`, and `/executor`.

## Included Assets

Generated project assets live in `public/images`:

- `legacy-portrait.png`
- `sky-garden.png`
- `memory-album.png`
