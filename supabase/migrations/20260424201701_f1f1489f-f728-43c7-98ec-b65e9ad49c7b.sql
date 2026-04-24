-- Roles enum + table (separate from profile to prevent privilege escalation)
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null default 'user',
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users view own roles" on public.user_roles
  for select to authenticated using (auth.uid() = user_id);

create policy "Admins view all roles" on public.user_roles
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));

create policy "Admins manage roles" on public.user_roles
  for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  date_of_birth date,
  biological_sex text,
  height_cm numeric,
  weight_kg numeric,
  country text,
  city text,
  household_income_band text,
  household_size integer,
  dependents integer,
  life_goal text,
  primary_motivation text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users view own profile" on public.profiles
  for select to authenticated using (auth.uid() = id);
create policy "Users insert own profile" on public.profiles
  for insert to authenticated with check (auth.uid() = id);
create policy "Users update own profile" on public.profiles
  for update to authenticated using (auth.uid() = id);

-- Onboarding state
create table public.onboarding_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  current_step integer not null default 1,
  completed boolean not null default false,
  facial_scan_completed boolean not null default false,
  body_age numeric,
  life_score integer,
  life_score_low integer,
  life_score_high integer,
  projected_lifespan numeric,
  projected_healthspan numeric,
  retirement_gap numeric,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.onboarding_state enable row level security;

create policy "Users view own onboarding" on public.onboarding_state
  for select to authenticated using (auth.uid() = user_id);
create policy "Users insert own onboarding" on public.onboarding_state
  for insert to authenticated with check (auth.uid() = user_id);
create policy "Users update own onboarding" on public.onboarding_state
  for update to authenticated using (auth.uid() = user_id);

-- Connections
create table public.connections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  category text not null, -- 'bank' | 'investment' | 'retirement' | 'wearable' | 'biomarker' | 'calendar'
  provider text not null,
  status text not null default 'connected',
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.connections enable row level security;

create policy "Users view own connections" on public.connections
  for select to authenticated using (auth.uid() = user_id);
create policy "Users insert own connections" on public.connections
  for insert to authenticated with check (auth.uid() = user_id);
create policy "Users delete own connections" on public.connections
  for delete to authenticated using (auth.uid() = user_id);

-- Auto-create profile + onboarding row + default role on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''));

  insert into public.onboarding_state (user_id) values (new.id);

  insert into public.user_roles (user_id, role) values (new.id, 'user');

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Updated_at triggers
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger profiles_touch before update on public.profiles
  for each row execute function public.touch_updated_at();
create trigger onboarding_touch before update on public.onboarding_state
  for each row execute function public.touch_updated_at();