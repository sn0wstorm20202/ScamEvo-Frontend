# ScamEvo Frontend (Next.js)

Minimal UI to demo the ScamEvo FastAPI backend.

## Setup

1) Create env file

- Copy `.env.example` to `.env` and set:
  - `NEXT_PUBLIC_BACKEND_URL` (default `http://127.0.0.1:8000`)

2) Install deps

```powershell
npm install
```

3) Run

```powershell
npm run dev
```

Open:

- http://localhost:3000

## Notes

- This UI calls the backend directly from the browser.
- For generator/adversarial endpoints, your backend must have:
  - `SCAMEVO_RESEARCH_MODE=1`
  - `SCAMEVO_DO_NOT_DEPLOY=1`
