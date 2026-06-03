import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className={styles.hero}>
        <div>
          <h1>Knihovna filmů</h1>
          <div className={styles.actions}>
            <Link className="button" href="/movies">
              Otevřít knihovnu
            </Link>
            <Link className="ghost-button" href="/movies/new">
              Přidat film
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
