# Freelon Property Inspections

Two-sided web application for Freelon Property Inspections LLC.  
Built with Next.js, Supabase, Tailwind CSS, and Resend.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Frontend + Backend | Next.js 14 (App Router) |
| Database + Auth | Supabase |
| Styling | Tailwind CSS |
| Email | Resend |
| Deployment | Vercel |

---

## Setup

### 1. Clone and install

```bash
git clone <repo-url>
cd freelon-property-inspections
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API (keep secret!) |
| `RESEND_API_KEY` | resend.com → API Keys |
| `NEXT_PUBLIC_SITE_URL` | Your production URL (no trailing slash) |

### 3. Supabase setup

Run the following SQL in your Supabase SQL editor:

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Bookings table
create table public.bookings (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now(),
  client_name text not null,
  client_email text not null,
  client_phone text not null,
  property_address text not null,
  service_type text not null check (service_type in (
    'home_inspection', 'condo_inspection', 'radon_testing',
    'wdi_termite', 'water_sampling', 'commercial_inspection'
  )),
  preferred_date date not null,
  preferred_time text not null check (preferred_time in ('morning', 'afternoon', 'evening')),
  notes text,
  status text not null default 'pending' check (status in (
    'pending', 'scheduled', 'in_progress', 'completed', 'cancelled'
  )),
  report_url text
);

-- Row Level Security
alter table public.bookings enable row level security;

-- Public can INSERT (booking form)
create policy "Public can create bookings"
  on public.bookings for insert
  with check (true);

-- Authenticated admin users can read and update
create policy "Admins can read bookings"
  on public.bookings for select
  using (auth.role() = 'authenticated');

create policy "Admins can update bookings"
  on public.bookings for update
  using (auth.role() = 'authenticated');
```

### 4. Supabase Storage

Create a storage bucket for report PDFs:

1. Go to Supabase → Storage → New bucket
2. Name it `reports`
3. Set to **Public**
4. Upload PDFs from the admin booking detail page, then paste the public URL

### 5. Create admin user

In Supabase → Authentication → Users → Add user:
- Enter Todd's email and a strong password
- This is the account used to log into `/admin/login`

### 6. Run locally

```bash
npm run dev
```

### 7. Deploy to Vercel

1. Push to GitHub
2. Import repo in Vercel
3. Add all env vars in Vercel project settings
4. Deploy

---

## Routes

### Client (public)

| Route | Description |
|---|---|
| `/` | Home page |
| `/services` | Service descriptions |
| `/book` | Booking form |
| `/confirmation?id=...` | Post-booking confirmation |
| `/report-lookup` | Client report download portal |

### Admin (requires login)

| Route | Description |
|---|---|
| `/admin/login` | Admin sign in |
| `/admin/dashboard` | Stats + recent bookings |
| `/admin/bookings` | All bookings with status filter |
| `/admin/bookings/[id]` | Booking detail — update status, upload report, add notes |
| `/admin/settings` | Settings (placeholder) |

---

Built by FlowOps Improvements · flowopsimprovements.com
