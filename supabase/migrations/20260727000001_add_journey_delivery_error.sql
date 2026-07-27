begin;

alter table public.journey_leads
  add column if not exists email_delivery_error text;

commit;
