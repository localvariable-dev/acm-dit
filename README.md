# ACM Student Chapter Recruitment Website

Premium, responsive Vite + React recruitment website for an ACM Student Chapter.

## 1. Install

```bash
npm install
npm run dev
```

## 2. Configure real application submissions

Create a Supabase project, then run `supabase.sql` in **Supabase → SQL Editor**.

Create `.env` in the project root:

```env
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
```

Then restart Vite. The multi-step JOIN ACM form will insert into `acm_applications`.

## 3. Customize before launch

Edit `src/main.jsx` and replace:

- `YOUR COLLEGE`
- chapter application status / deadline
- FAQ answers
- any opportunity that your real chapter does not provide
- gallery placeholders with real chapter images

Do not publish claims, deadlines, statistics, testimonials or partnerships until they are confirmed.

## 4. Build for deployment

```bash
npm run build
```

The production output is created in `dist/` and can be deployed to Vercel, Netlify or any static host.

## Recommended Supabase production hardening

For a live chapter rollout, consider adding server-side validation, rate limiting / bot protection, duplicate-email handling, a reviewer/admin interface, and stricter storage rules if you later add file uploads.
