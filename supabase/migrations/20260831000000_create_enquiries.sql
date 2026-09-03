create extension if not exists pgcrypto;

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  enquiry_type text not null
    check (enquiry_type in ('callback', 'destination', 'journey-plan')),
  name text,
  email text,
  phone text,
  preferred_contact text
    check (
      preferred_contact is null
      or preferred_contact in ('phone', 'whatsapp', 'email', 'call')
    ),
  destination text,
  experience_labels text[],
  budget_label text,
  payload jsonb not null default '{}'::jsonb,
  email_status text not null default 'pending'
    check (email_status in ('pending', 'sent', 'failed')),
  email_provider_id text,
  email_error text,
  email_attempted_at timestamptz,
  email_sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index enquiries_created_at_idx
  on public.enquiries (created_at desc);

create index enquiries_type_created_at_idx
  on public.enquiries (enquiry_type, created_at desc);

create index enquiries_email_status_idx
  on public.enquiries (email_status)
  where email_status <> 'sent';

create function public.set_enquiries_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger enquiries_set_updated_at
before update on public.enquiries
for each row execute function public.set_enquiries_updated_at();

alter table public.enquiries enable row level security;

revoke all on table public.enquiries from anon, authenticated;
grant insert, select, update on table public.enquiries to service_role;

comment on table public.enquiries is
  'Server-created customer enquiries and their internal email delivery state.';
