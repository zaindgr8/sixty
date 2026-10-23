-- =====================================================================
-- Sixty by DevMate: email campaign database (UK + USA outreach, sender: Elvira)
-- Supabase project: fsopwsygsnuufwfylaiv
-- Run once in Supabase -> SQL Editor. Safe to re-run (idempotent).
-- Does not touch the existing app_state table.
-- =====================================================================

create extension if not exists pgcrypto with schema extensions;

-- ---------------------------------------------------------------------
-- Leads
-- ---------------------------------------------------------------------
create table if not exists public.sixty_leads (
  id                     bigint generated always as identity primary key,
  email                  text not null,
  first_name             text,
  last_name              text,
  full_name              text,
  job_title              text,
  company                text,
  company_website        text,
  industry               text,          -- free text from the list, e.g. "Real Estate", "Dental clinic"
  company_size           text,
  city                   text,
  state                  text,          -- US state / UK region; used for the US send-time zone
  country                text,          -- "United Kingdom", "United States", "UK", "US"...
  linkedin_url           text,
  phone                  text,
  lead_sources           text,          -- how THEY get leads, if known (Zillow, Rightmove, Meta ads...)
  personalization        text,          -- optional hand-written icebreaker / fact the AI may use
  source                 text,          -- where WE got the lead (apollo, clay, manual, csv...)
  tags                   text[] not null default '{}',
  notes                  text,

  status                 text not null default 'new',      -- new, contacted, replied, interested, demo_booked, won, not_interested, lost
  email_status           text not null default 'pending',  -- pending, sent, failed, invalid, bounced, complained, unsubscribed
  unsubscribed           boolean not null default false,

  campaign_name          text,
  custom_campaign        text,
  custom_campaigns_sent  text[] not null default '{}',
  email_subject          text,
  last_email_body        text,
  email_sequence_step    integer not null default 0,
  last_emailed_at        timestamptz,
  last_email_error       text,
  brevo_message_id       text,

  open_count             integer not null default 0,
  click_count            integer not null default 0,
  first_opened_at        timestamptz,
  last_opened_at         timestamptz,
  last_clicked_at        timestamptz,
  replied_at             timestamptz,

  n8n_execution_id       text,
  n8n_workflow_id        text,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);
create unique index if not exists sixty_leads_email_uq on public.sixty_leads (lower(email));
create index if not exists sixty_leads_status_idx on public.sixty_leads (status);
create index if not exists sixty_leads_email_status_idx on public.sixty_leads (email_status);
create index if not exists sixty_leads_country_idx on public.sixty_leads (country);
create index if not exists sixty_leads_last_emailed_idx on public.sixty_leads (last_emailed_at desc);

-- ---------------------------------------------------------------------
-- Email events from the Brevo webhook (delivered, opened, click, bounces...)
-- ---------------------------------------------------------------------
create table if not exists public.sixty_email_events (
  id          bigint generated always as identity primary key,
  lead_id     bigint references public.sixty_leads(id) on delete cascade,
  email       text not null,
  event       text not null,
  campaign    text,
  subject     text,
  link        text,
  message_id  text,
  reason      text,
  event_at    timestamptz not null default now(),
  raw         jsonb,
  created_at  timestamptz not null default now()
);
create index if not exists sixty_events_lead_idx on public.sixty_email_events (lead_id, event_at desc);
create index if not exists sixty_events_event_idx on public.sixty_email_events (event, event_at desc);
create index if not exists sixty_events_campaign_idx on public.sixty_email_events (campaign);
-- Brevo retries webhooks; ignore exact repeats
create unique index if not exists sixty_events_dedupe_uq on public.sixty_email_events (coalesce(message_id, ''), event, event_at, coalesce(link, ''));

-- ---------------------------------------------------------------------
-- One row per campaign run (written by n8n at the end of every run)
-- ---------------------------------------------------------------------
create table if not exists public.sixty_campaign_runs (
  id                bigint generated always as identity primary key,
  campaign_key      text not null,
  brief             text,
  audience          text,
  test_mode         boolean not null default false,
  queued            integer not null default 0,
  sent              integer not null default 0,
  failed            integer not null default 0,
  skipped_ai        integer not null default 0,
  held              integer not null default 0,
  stopped_early     boolean not null default false,
  stop_reason       text,
  n8n_execution_id  text,
  status            text not null default 'running',   -- running, finished
  started_at        timestamptz not null default now(),
  finished_at       timestamptz
);
create index if not exists sixty_runs_campaign_idx on public.sixty_campaign_runs (campaign_key, started_at desc);
create index if not exists sixty_runs_exec_idx on public.sixty_campaign_runs (n8n_execution_id);

-- ---------------------------------------------------------------------
-- Dashboard login (single fixed user, bcrypt hash, server-side sessions)
-- ---------------------------------------------------------------------
create table if not exists public.dashboard_users (
  username       text primary key,
  password_hash  text not null,
  created_at     timestamptz not null default now()
);
create table if not exists public.dashboard_sessions (
  token       uuid primary key default gen_random_uuid(),
  username    text not null references public.dashboard_users(username) on delete cascade,
  created_at  timestamptz not null default now(),
  expires_at  timestamptz not null default now() + interval '7 days'
);
create table if not exists public.dashboard_login_attempts (
  id          bigint generated always as identity primary key,
  username    text,
  success     boolean not null,
  created_at  timestamptz not null default now()
);

-- bcrypt hash of the dashboard password (plain text is never stored)
insert into public.dashboard_users (username, password_hash)
values ('zaindgr8', '$2a$10$Uv057eT/BexGr8Kl8iNCPe61THyg5lMRmhNUix5jDNPAy7nF7oLmO')
on conflict (username) do update set password_hash = excluded.password_hash;

-- ---------------------------------------------------------------------
-- Lock everything down: browsers (publishable key) get NO table access.
-- n8n uses the secret key (service_role) which bypasses RLS.
-- The dashboard only talks to the dash_* functions below.
-- ---------------------------------------------------------------------
alter table public.sixty_leads              enable row level security;
alter table public.sixty_email_events       enable row level security;
alter table public.sixty_campaign_runs      enable row level security;
alter table public.dashboard_users          enable row level security;
alter table public.dashboard_sessions       enable row level security;
alter table public.dashboard_login_attempts enable row level security;
revoke all on public.sixty_leads, public.sixty_email_events, public.sixty_campaign_runs,
              public.dashboard_users, public.dashboard_sessions, public.dashboard_login_attempts
  from anon, authenticated;

-- ---------------------------------------------------------------------
-- Triggers
-- ---------------------------------------------------------------------
create or replace function public.sixty_touch_updated_at() returns trigger
language plpgsql set search_path = public as $$
begin
  new.updated_at := now();
  if new.email is not null then new.email := lower(trim(new.email)); end if;
  return new;
end $$;
drop trigger if exists sixty_leads_touch on public.sixty_leads;
create trigger sixty_leads_touch before insert or update on public.sixty_leads
  for each row execute function public.sixty_touch_updated_at();

-- Every Brevo event: link it to the lead, keep counters and statuses current.
-- Events for addresses that are not Sixty leads are dropped (Brevo webhooks are account-wide).
create or replace function public.sixty_apply_event() returns trigger
language plpgsql set search_path = public as $$
declare v_lead public.sixty_leads%rowtype;
begin
  new.email := lower(trim(new.email));
  new.event := lower(new.event);
  select * into v_lead from public.sixty_leads where lower(email) = new.email limit 1;
  if not found then return null; end if;
  new.lead_id := v_lead.id;

  if new.event in ('opened', 'unique_opened', 'proxy_open', 'unique_proxy_open') then
    update public.sixty_leads set
      open_count = open_count + case when new.event in ('unique_opened', 'unique_proxy_open') then 0 else 1 end,
      first_opened_at = coalesce(first_opened_at, new.event_at),
      last_opened_at = greatest(coalesce(last_opened_at, new.event_at), new.event_at)
    where id = v_lead.id;
  elsif new.event = 'click' then
    update public.sixty_leads set click_count = click_count + 1,
      last_clicked_at = greatest(coalesce(last_clicked_at, new.event_at), new.event_at)
    where id = v_lead.id;
  elsif new.event in ('hard_bounce', 'blocked') then
    update public.sixty_leads set email_status = 'bounced', last_email_error = coalesce(new.reason, new.event) where id = v_lead.id;
  elsif new.event in ('invalid_email', 'invalid') then
    update public.sixty_leads set email_status = 'invalid', last_email_error = coalesce(new.reason, new.event) where id = v_lead.id;
  elsif new.event in ('spam', 'complaint') then
    update public.sixty_leads set email_status = 'complained', unsubscribed = true where id = v_lead.id;
  elsif new.event in ('unsubscribed', 'unsubscribe') then
    update public.sixty_leads set email_status = 'unsubscribed', unsubscribed = true where id = v_lead.id;
  end if;
  return new;
end $$;
drop trigger if exists sixty_events_apply on public.sixty_email_events;
create trigger sixty_events_apply before insert on public.sixty_email_events
  for each row execute function public.sixty_apply_event();

-- ---------------------------------------------------------------------
-- Dashboard API (called from the browser with the publishable key)
-- ---------------------------------------------------------------------
create or replace function public.dash_login(p_username text, p_password text) returns json
language plpgsql security definer set search_path = public, extensions as $$
declare v_hash text; v_token uuid; v_exp timestamptz;
begin
  if (select count(*) from dashboard_login_attempts
      where not success and created_at > now() - interval '15 minutes') >= 10 then
    raise exception 'Too many failed attempts. Try again in 15 minutes.' using errcode = '28000';
  end if;
  select password_hash into v_hash from dashboard_users where username = lower(trim(p_username));
  if v_hash is null or crypt(p_password, v_hash) <> v_hash then
    insert into dashboard_login_attempts (username, success) values (left(p_username, 64), false);
    raise exception 'Wrong username or password' using errcode = '28000';
  end if;
  insert into dashboard_login_attempts (username, success) values (lower(trim(p_username)), true);
  delete from dashboard_sessions where expires_at < now();
  insert into dashboard_sessions (username) values (lower(trim(p_username)))
    returning token, expires_at into v_token, v_exp;
  return json_build_object('token', v_token, 'expires_at', v_exp, 'username', lower(trim(p_username)));
end $$;

create or replace function public.dash_auth(p_token uuid) returns text
language plpgsql security definer set search_path = public as $$
declare v_user text;
begin
  select username into v_user from dashboard_sessions where token = p_token and expires_at > now();
  if v_user is null then raise exception 'Session expired. Please log in again.' using errcode = '28000'; end if;
  return v_user;
end $$;

create or replace function public.dash_logout(p_token uuid) returns void
language sql security definer set search_path = public as $$
  delete from dashboard_sessions where token = p_token;
$$;

create or replace function public.dash_overview(p_token uuid, p_days int default 30) returns json
language plpgsql security definer set search_path = public as $$
declare v_since timestamptz := now() - make_interval(days => greatest(1, least(coalesce(p_days, 30), 365)));
        v json;
begin
  perform dash_auth(p_token);
  select json_build_object(
    'totals', (select json_build_object(
        'leads', count(*),
        'pending', count(*) filter (where email_status = 'pending' and not unsubscribed),
        'emailed', count(*) filter (where last_emailed_at is not null),
        'opened', count(*) filter (where open_count > 0),
        'clicked', count(*) filter (where click_count > 0),
        'replied', count(*) filter (where status in ('replied', 'interested', 'demo_booked', 'won')),
        'interested', count(*) filter (where status in ('interested', 'demo_booked', 'won')),
        'demo_booked', count(*) filter (where status in ('demo_booked', 'won')),
        'won', count(*) filter (where status = 'won'),
        'bounced', count(*) filter (where email_status in ('bounced', 'invalid')),
        'unsubscribed', count(*) filter (where unsubscribed or email_status in ('unsubscribed', 'complained'))
      ) from sixty_leads),
    'period', (select json_build_object(
        'sent', count(*) filter (where last_emailed_at >= v_since)
      ) from sixty_leads),
    'events', (select coalesce(json_object_agg(event, n), '{}'::json) from (
        select event, count(*) n from sixty_email_events where event_at >= v_since group by event) e),
    'by_country', (select coalesce(json_agg(r order by r.leads desc), '[]'::json) from (
        select coalesce(nullif(country, ''), 'Unknown') as label, count(*) leads,
               count(*) filter (where last_emailed_at is not null) emailed,
               count(*) filter (where open_count > 0) opened,
               count(*) filter (where status in ('replied', 'interested', 'demo_booked', 'won')) replied
        from sixty_leads group by 1) r),
    'by_industry', (select coalesce(json_agg(r order by r.leads desc), '[]'::json) from (
        select coalesce(nullif(industry, ''), 'Unknown') as label, count(*) leads,
               count(*) filter (where last_emailed_at is not null) emailed,
               count(*) filter (where open_count > 0) opened,
               count(*) filter (where status in ('replied', 'interested', 'demo_booked', 'won')) replied
        from sixty_leads group by 1 order by 2 desc limit 12) r),
    'by_status', (select coalesce(json_object_agg(status, n), '{}'::json) from (
        select status, count(*) n from sixty_leads group by status) s),
    'daily', (select coalesce(json_agg(d order by d.day), '[]'::json) from (
        select g::date as day,
          (select count(*) from sixty_leads l where l.last_emailed_at >= g and l.last_emailed_at < g + interval '1 day') as sent,
          (select count(distinct e.lead_id) from sixty_email_events e where e.event in ('opened','unique_opened','proxy_open','unique_proxy_open') and e.event_at >= g and e.event_at < g + interval '1 day') as opened,
          (select count(distinct e.lead_id) from sixty_email_events e where e.event = 'click' and e.event_at >= g and e.event_at < g + interval '1 day') as clicked
        from generate_series(date_trunc('day', v_since), date_trunc('day', now()), interval '1 day') g) d),
    'campaigns', (select coalesce(json_agg(c order by c.last_sent desc nulls last), '[]'::json) from (
        select k as campaign, count(*) recipients,
               count(*) filter (where l.open_count > 0) opened,
               count(*) filter (where l.click_count > 0) clicked,
               count(*) filter (where l.status in ('replied', 'interested', 'demo_booked', 'won')) replied,
               max(l.last_emailed_at) last_sent
        from sixty_leads l, unnest(l.custom_campaigns_sent) k group by k) c),
    'runs', (select coalesce(json_agg(r order by r.started_at desc), '[]'::json) from (
        select campaign_key, audience, brief, test_mode, status, queued, sent, failed, skipped_ai, held, stopped_early, stop_reason, started_at, finished_at
        from sixty_campaign_runs order by started_at desc limit 20) r)
  ) into v;
  return v;
end $$;

create or replace function public.dash_leads(
  p_token uuid, p_search text default null, p_country text default null, p_status text default null,
  p_email_status text default null, p_campaign text default null, p_engagement text default null,
  p_limit int default 50, p_offset int default 0
) returns json
language plpgsql security definer set search_path = public as $$
declare v json; q text := nullif(trim(coalesce(p_search, '')), '');
begin
  perform dash_auth(p_token);
  with f as (
    select * from sixty_leads l
    where (q is null or l.email ilike '%' || q || '%' or l.full_name ilike '%' || q || '%'
           or l.first_name ilike '%' || q || '%' or l.last_name ilike '%' || q || '%'
           or l.company ilike '%' || q || '%' or l.job_title ilike '%' || q || '%' or l.industry ilike '%' || q || '%')
      and (p_country is null or p_country = '' or
           case p_country
             when 'UK' then lower(coalesce(l.country, '')) in ('uk', 'gb', 'united kingdom', 'great britain', 'england', 'scotland', 'wales', 'northern ireland')
             when 'USA' then lower(coalesce(l.country, '')) in ('us', 'usa', 'united states', 'united states of america', 'america')
             else true end)
      and (p_status is null or p_status = '' or l.status = p_status)
      and (p_email_status is null or p_email_status = '' or l.email_status = p_email_status)
      and (p_campaign is null or p_campaign = '' or p_campaign = any(l.custom_campaigns_sent))
      and (p_engagement is null or p_engagement = '' or
           case p_engagement when 'opened' then l.open_count > 0 when 'clicked' then l.click_count > 0
                             when 'not_opened' then l.last_emailed_at is not null and l.open_count = 0 else true end)
  )
  select json_build_object(
    'total', (select count(*) from f),
    'rows', coalesce((select json_agg(r) from (
      select id, email, first_name, last_name, full_name, job_title, company, company_website, industry, city, state, country,
             linkedin_url, phone, personalization, source, tags, notes, status, email_status, unsubscribed,
             custom_campaigns_sent, email_subject, last_email_body, email_sequence_step, last_emailed_at, last_email_error,
             open_count, click_count, last_opened_at, last_clicked_at, replied_at, created_at, updated_at
      from f order by coalesce(f.last_emailed_at, f.created_at) desc, f.id desc
      limit greatest(1, least(coalesce(p_limit, 50), 500)) offset greatest(0, coalesce(p_offset, 0))) r), '[]'::json)
  ) into v;
  return v;
end $$;

create or replace function public.dash_lead_events(p_token uuid, p_lead_id bigint) returns json
language plpgsql security definer set search_path = public as $$
begin
  perform dash_auth(p_token);
  return coalesce((select json_agg(e order by e.event_at desc) from (
    select event, campaign, subject, link, reason, event_at from sixty_email_events where lead_id = p_lead_id order by event_at desc limit 100) e), '[]'::json);
end $$;

create or replace function public.dash_update_lead(p_token uuid, p_id bigint, p_patch jsonb) returns json
language plpgsql security definer set search_path = public as $$
declare v sixty_leads%rowtype;
begin
  perform dash_auth(p_token);
  if p_patch ? 'status' and not (p_patch->>'status' in ('new','contacted','replied','interested','demo_booked','won','not_interested','lost')) then
    raise exception 'Unknown status %', p_patch->>'status';
  end if;
  update sixty_leads set
    status          = coalesce(p_patch->>'status', status),
    replied_at      = case when p_patch->>'status' in ('replied','interested','demo_booked','won') then coalesce(replied_at, now()) else replied_at end,
    notes           = case when p_patch ? 'notes' then p_patch->>'notes' else notes end,
    personalization = case when p_patch ? 'personalization' then p_patch->>'personalization' else personalization end,
    first_name      = case when p_patch ? 'first_name' then p_patch->>'first_name' else first_name end,
    job_title       = case when p_patch ? 'job_title' then p_patch->>'job_title' else job_title end,
    company         = case when p_patch ? 'company' then p_patch->>'company' else company end,
    industry        = case when p_patch ? 'industry' then p_patch->>'industry' else industry end,
    country         = case when p_patch ? 'country' then p_patch->>'country' else country end,
    unsubscribed    = case when (p_patch->>'do_not_email')::boolean is true then true else unsubscribed end,
    email_status    = case when (p_patch->>'do_not_email')::boolean is true then 'unsubscribed' else email_status end
  where id = p_id returning * into v;
  if not found then raise exception 'Lead not found'; end if;
  return row_to_json(v);
end $$;

-- Import / upsert leads from a CSV (parsed in the browser). Existing leads keep their
-- campaign history and status; empty cells never overwrite existing data.
create or replace function public.dash_import_leads(p_token uuid, p_rows jsonb, p_source text default 'csv', p_tags text[] default '{}') returns json
language plpgsql security definer set search_path = public as $$
declare r jsonb; v_email text; v_inserted int := 0; v_updated int := 0; v_skipped int := 0; v_id bigint; v_new boolean;
begin
  perform dash_auth(p_token);
  if jsonb_typeof(p_rows) <> 'array' then raise exception 'rows must be an array'; end if;
  if jsonb_array_length(p_rows) > 5000 then raise exception 'Max 5000 rows per import'; end if;
  for r in select * from jsonb_array_elements(p_rows) loop
    v_email := lower(trim(coalesce(r->>'email', '')));
    if v_email !~ '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$' then v_skipped := v_skipped + 1; continue; end if;
    insert into sixty_leads as t (email, first_name, last_name, full_name, job_title, company, company_website, industry,
                                  company_size, city, state, country, linkedin_url, phone, lead_sources, personalization, source, tags, notes)
    values (v_email, nullif(r->>'first_name',''), nullif(r->>'last_name',''),
            coalesce(nullif(r->>'full_name',''), nullif(trim(concat_ws(' ', r->>'first_name', r->>'last_name')), '')),
            nullif(r->>'job_title',''), nullif(r->>'company',''), nullif(r->>'company_website',''), nullif(r->>'industry',''),
            nullif(r->>'company_size',''), nullif(r->>'city',''), nullif(r->>'state',''), nullif(r->>'country',''),
            nullif(r->>'linkedin_url',''), nullif(r->>'phone',''), nullif(r->>'lead_sources',''), nullif(r->>'personalization',''),
            coalesce(nullif(p_source,''), 'csv'), coalesce(p_tags, '{}'), nullif(r->>'notes',''))
    on conflict (lower(email)) do update set
      first_name      = coalesce(t.first_name, excluded.first_name),
      last_name       = coalesce(t.last_name, excluded.last_name),
      full_name       = coalesce(t.full_name, excluded.full_name),
      job_title       = coalesce(excluded.job_title, t.job_title),
      company         = coalesce(excluded.company, t.company),
      company_website = coalesce(excluded.company_website, t.company_website),
      industry        = coalesce(excluded.industry, t.industry),
      company_size    = coalesce(excluded.company_size, t.company_size),
      city            = coalesce(excluded.city, t.city),
      state           = coalesce(excluded.state, t.state),
      country         = coalesce(excluded.country, t.country),
      linkedin_url    = coalesce(excluded.linkedin_url, t.linkedin_url),
      phone           = coalesce(excluded.phone, t.phone),
      lead_sources    = coalesce(excluded.lead_sources, t.lead_sources),
      personalization = coalesce(excluded.personalization, t.personalization),
      tags            = (select array(select distinct unnest(t.tags || excluded.tags))),
      notes           = coalesce(t.notes, excluded.notes)
    returning id, (xmax = 0) into v_id, v_new;
    if v_new then v_inserted := v_inserted + 1; else v_updated := v_updated + 1; end if;
  end loop;
  return json_build_object('inserted', v_inserted, 'updated', v_updated, 'skipped_invalid_email', v_skipped);
end $$;

-- Only the dash_* functions are callable from the browser
revoke execute on function public.dash_login(text, text), public.dash_auth(uuid), public.dash_logout(uuid),
  public.dash_overview(uuid, int), public.dash_leads(uuid, text, text, text, text, text, text, int, int),
  public.dash_lead_events(uuid, bigint), public.dash_update_lead(uuid, bigint, jsonb),
  public.dash_import_leads(uuid, jsonb, text, text[]),
  public.sixty_apply_event(), public.sixty_touch_updated_at()
  from public, anon, authenticated;
grant execute on function public.dash_login(text, text), public.dash_logout(uuid),
  public.dash_overview(uuid, int), public.dash_leads(uuid, text, text, text, text, text, text, int, int),
  public.dash_lead_events(uuid, bigint), public.dash_update_lead(uuid, bigint, jsonb),
  public.dash_import_leads(uuid, jsonb, text, text[])
  to anon, authenticated;

notify pgrst, 'reload schema';
