# Knihovna filmu

Webova aplikace v Next.js pro spravu filmove knihovny. Aplikace umi zobrazit seznam filmu, vyhledavat a filtrovat filmy, otevrit detail filmu, pridat novy film, upravit existujici zaznam a film smazat.

Data se ukladaji do Supabase databaze do tabulky `movies`.

## Pouzite technologie

- Next.js
- React
- Supabase
- React Hook Form
- Zod

## Pozadavky

Pred spustenim projektu je potreba mit nainstalovane:

- Node.js
- npm
- Git
- ucet na Supabase

## Stazeni projektu

Projekt si stahni z GitHubu:

```bash
git clone https://github.com/Ales458/Projekt_Weby.git
```

Potom prejdi do slozky projektu:

```bash
cd Projekt_Weby
```

## Instalace zavislosti

V korenove slozce projektu spust:

```bash
npm install
```

## Nastaveni Supabase

### 1. Vytvoreni projektu

1. Otevri https://supabase.com/.
2. Prihlas se nebo si vytvor ucet.
3. Klikni na `New project`.
4. Vyber organizaci.
5. Zadej nazev projektu, napriklad `knihovna-filmu`.
6. Zadej heslo k databazi.
7. Vyber region.
8. Klikni na `Create new project`.

Po vytvoreni projektu pockej, nez se databaze inicializuje.

### 2. Vytvoreni tabulky `movies`

V Supabase projektu otevri:

```text
SQL Editor -> New query
```

Do SQL editoru vloz tento SQL kod a spust ho tlacitkem `Run`:

```sql
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
```

Stejny SQL kod je ulozeny i v projektu v souboru:

```text
supabase/schema.sql
```

### 3. Kontrola tabulky

Po spusteni SQL prikazu otevri v Supabase:

```text
Table Editor -> movies
```

Tabulka musi obsahovat tyto sloupce:

- `id`
- `title`
- `director`
- `year`
- `genre`
- `rating`
- `created_at`

## Nastaveni environment promennych

V korenove slozce projektu vytvor soubor:

```text
.env.local
```

Do souboru vloz:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Hodnoty najdes v Supabase:

```text
Project Settings -> API
```

Pouzij:

- `Project URL` pro `NEXT_PUBLIC_SUPABASE_URL`
- `anon public` key pro `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Priklad:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tvuj_anon_public_klic
```

Soubor `.env.local` se neposila na GitHub, protoze obsahuje konfiguraci konkretni databaze.

## Spusteni projektu

Vyvojovy server spust prikazem:

```bash
npm run dev
```

Po spusteni otevri v prohlizeci:

```text
http://localhost:3000
```

## Produkcni build

Pro kontrolu produkcni verze spust:

```bash
npm run build
```

Po uspesnem buildu muzes aplikaci spustit prikazem:

```bash
npm run start
```

## Funkce aplikace

- zobrazeni seznamu filmu
- vyhledavani filmu
- filtrovani podle zanru
- razeni filmu
- detail filmu
- pridani noveho filmu
- uprava filmu
- smazani filmu

## Struktura projektu

```text
app/
  components/          sdilene komponenty
  lib/                 Supabase klient a validacni schema
  movies/              stranky pro seznam, detail, pridani a upravu filmu
supabase/
  schema.sql           SQL pro vytvoreni tabulky a RLS policies
.env.example           ukazka potrebnych environment promennych
README.md              navod ke spusteni projektu
```

## Nejbeznejsi problemy

### Aplikace nezobrazuje data

Zkontroluj, ze mas vytvoreny soubor `.env.local` a ze obsahuje spravne hodnoty ze Supabase.

### Nejde pridat, upravit nebo smazat film

Zkontroluj, ze jsi v Supabase spustil cely SQL kod ze souboru `supabase/schema.sql`. Dulezite jsou hlavne RLS policies pro `insert`, `update` a `delete`.

### Po zmene `.env.local` se nic nezmenilo

Zastav vyvojovy server a spust ho znovu:

```bash
npm run dev
```

### Port 3000 je obsazeny

Next.js muze nabidnout jiny port, napr. `3001`. V tom pripade otevri adresu, kterou terminal vypise.

## Autor

Projekt: Knihovna filmu
