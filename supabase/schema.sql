create table if not exists public.movies (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  director text not null,
  year int,
  genre text,
  rating numeric,
  created_at timestamp with time zone default now()
);

alter table public.movies enable row level security;

drop policy if exists "Movies are publicly readable" on public.movies;
create policy "Movies are publicly readable"
on public.movies
for select
to anon
using (true);

drop policy if exists "Movies can be publicly inserted" on public.movies;
create policy "Movies can be publicly inserted"
on public.movies
for insert
to anon
with check (true);

drop policy if exists "Movies can be publicly updated" on public.movies;
create policy "Movies can be publicly updated"
on public.movies
for update
to anon
using (true)
with check (true);

drop policy if exists "Movies can be publicly deleted" on public.movies;
create policy "Movies can be publicly deleted"
on public.movies
for delete
to anon
using (true);
