import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>Next.js + Supabase</p>
          <h1>Knihovna filmu</h1>
          <p>
            Jednoducha aplikace pro evidenci filmu. Umi pridavat, zobrazovat,
            upravovat, mazat a filtrovat zaznamy ulozene v Supabase databazi.
          </p>
          <div className={styles.actions}>
            <Link className="button" href="/movies">
              Otevrit knihovnu
            </Link>
            <Link className="ghost-button" href="/movies/new">
              Pridat film
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
