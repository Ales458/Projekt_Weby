# Knihovna filmu

Jednoducha webova aplikace v Next.js pro spravu filmove knihovny. Data se ukladaji do Supabase tabulky `movies`.

## Funkce

- seznam filmu
- vyhledavani a filtrovani filmu
- detail filmu
- pridani filmu
- uprava filmu
- smazani filmu

## Instalace

Stahni projekt a nainstaluj zavislosti:

```bash
git clone https://github.com/Ales458/Projekt_Weby.git
cd Projekt_Weby
npm install
```

## Supabase

1. Vytvor projekt na https://supabase.com/.
2. Otevri `SQL Editor`.
3. Spust SQL ze souboru:

```text
supabase/schema.sql
```

SQL vytvori tabulku `movies` a nastavi prava pro cteni, pridani, upravu a mazani filmu.

Tabulka `movies` obsahuje:

- `id`
- `title`
- `director`
- `year`
- `genre`
- `rating`
- `created_at`

## Environment promenne

V koreni projektu vytvor soubor `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Hodnoty najdes v Supabase v:

```text
Project Settings -> API
```

Pouzij:

- `Project URL` jako `NEXT_PUBLIC_SUPABASE_URL`
- `anon public` key jako `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Spusteni

```bash
npm run dev
```

Potom otevri:

```text
http://localhost:3000
```

## Build

```bash
npm run build
npm run start
```
