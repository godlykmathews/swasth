# AFTERLIFE AI Backend

FastAPI backend backed by Supabase Postgres.

## Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Put the Supabase project values and database password in `backend/.env`:

```bash
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_KEY=your-publishable-key
SUPABASE_DB_PASSWORD=your-database-password
DATABASE_URL=postgresql://...
CLOUDINARY_URL=cloudinary://your-api-key:your-api-secret@your-cloud-name
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4.1-mini
```

`SUPABASE_DB_HOST` can be left blank. The backend derives `db.<project-ref>.supabase.co` from `SUPABASE_URL`.
If that direct host does not resolve on your network/project, paste the Supabase dashboard pooler connection string into `DATABASE_URL`.

When `DATABASE_URL` is not set and the direct database host is unavailable, FastAPI still starts. `/health` will show `schema_ready: false` and include the startup error.

## Run

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

The API will auto-create the `legacy_plans` and `executor_activations` tables when `AUTO_MIGRATE=true`.

## Key Endpoints

- `GET /health`
- `POST /api/register`
- `GET /api/activation-code?email=mathews.joseph@example.com`
- `GET /api/profile/{legacy_id}`
- `PUT /api/profile/{legacy_id}`
- `GET /api/digital-assets/{legacy_id}`
- `PUT /api/digital-assets/{legacy_id}`
- `GET /api/insurance-property/{legacy_id}`
- `PUT /api/insurance-property/{legacy_id}`
- `GET /api/will-final-wishes/{legacy_id}`
- `PUT /api/will-final-wishes/{legacy_id}`
- `GET /api/memory-vault/{legacy_id}`
- `PUT /api/memory-vault/{legacy_id}`
- `GET /api/executor/{legacy_id}`
- `POST /api/executor/activate`
- `POST /api/death/declare`
- `GET /api/notifications/{legacy_id}`
- `POST /api/uploads/{legacy_id}` multipart upload with `file` and `category`
- `GET /api/uploads/{legacy_id}?category=memory-photo`
