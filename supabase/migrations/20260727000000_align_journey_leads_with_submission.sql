begin;

alter table public.journey_leads
  add column if not exists destination_name text,
  add column if not exists destination_type text,
  add column if not exists departure_date date,
  add column if not exists return_date date,
  add column if not exists number_of_days integer,
  add column if not exists number_of_nights integer,
  add column if not exists adults integer,
  add column if not exists children integer,
  add column if not exists infants integer,
  add column if not exists senior_citizens integer,
  add column if not exists experiences text[] default array[]::text[],
  add column if not exists budget_tier text,
  add column if not exists budget_range text,
  add column if not exists dream_journey_notes text,
  add column if not exists inspirations text[] default array[]::text[],
  add column if not exists full_name text,
  add column if not exists email text,
  add column if not exists country_code text,
  add column if not exists mobile text,
  add column if not exists city text,
  add column if not exists preferred_contact text,
  add column if not exists preferred_contact_time text,
  add column if not exists consent_to_contact boolean default false,
  add column if not exists marketing_consent boolean default false,
  add column if not exists email_delivery_status text default 'pending',
  add column if not exists raw_submission jsonb;

update public.journey_leads
set
  experiences = coalesce(experiences, array[]::text[]),
  inspirations = coalesce(inspirations, array[]::text[]),
  consent_to_contact = coalesce(consent_to_contact, false),
  marketing_consent = coalesce(marketing_consent, false),
  email_delivery_status = coalesce(email_delivery_status, 'pending');

alter table public.journey_leads
  alter column experiences set default array[]::text[],
  alter column inspirations set default array[]::text[],
  alter column consent_to_contact set default false,
  alter column marketing_consent set default false,
  alter column email_delivery_status set default 'pending';

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'journey_leads'
      and column_name = 'phone'
      and is_nullable = 'NO'
  ) then
    alter table public.journey_leads
      alter column phone drop not null;
  end if;
end
$$;

commit;
