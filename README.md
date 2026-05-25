# Knihovna filmu

Webova aplikace v Next.js App Routeru pro spravu filmove knihovny. Data se ukladaji do Supabase tabulky `movies`.

## Spusteni

1. Nainstaluj zavislosti:

```bash
npm install
```

2. V Supabase vytvor tabulku pomoci SQL ze souboru `supabase/schema.sql`.

3. Vytvor `.env.local` podle `.env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL= tvoje_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY= tvuj_supabase_anon_key
```

4. Spust vyvojovy server:

```bash
npm run dev
```

5. Otevri `http://localhost:3000`.

## Funkce

- Seznam filmu
- Detail filmu
- Pridani filmu
- Uprava filmu
- Smazani filmu
- Filtrovani podle zanru
- Validace formulare pres `react-hook-form` a `Zod`
